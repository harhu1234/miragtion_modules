import logging
from odoo import fields, models, api, _
from datetime import datetime
from datetime import timedelta
from openerp.tools import DEFAULT_SERVER_DATETIME_FORMAT
from odoo.exceptions import UserError
from odoo.tools import DEFAULT_SERVER_DATETIME_FORMAT as DF

_logger = logging.getLogger(__name__)


class CRMLead(models.Model):

    _inherit = "crm.lead"

    documents_count = fields.Integer(compute='_compute_document_ids', string="Documents")
    first_meeting_date = fields.Date(string="Date Introductory Conversation")
    
    coach_id = fields.Many2one("hr.employee",string="Coach Name")
    coach_email = fields.Char("Coach Email")
    coach_phone = fields.Char("Clientnumber ONS")
    end_date_indication = fields.Date(string="End Date Indication")

    first_name = fields.Char("First Name")
    last_name = fields.Char("Last Name")
    initial = fields.Char("Initial")
    lead_name = fields.Char("Name", compute='_get_first_last_name')

    preference = fields.Selection([('man','Man'),
                                        ('woman','Woman'),
                                        ('other','No Preference')],string="Preference")
    is_dutch = fields.Boolean("Dutch?")
    other_language = fields.Char("Language")
    pets= fields.Char("Pets")

    phase_days = fields.Integer("Phase")
    total_phase_days= fields.Integer("Total")
    stage_updated_date = fields.Datetime()

    @api.depends('first_name','last_name')
    def _get_first_last_name(self):
        for record in self:
            name=" "
            if record.first_name:
                name=record.first_name
            if record.last_name:
                name+=" "+record.last_name

            record.lead_name = name


    def name_get(self):
        res = []
        for record in self:
            name =""
            if record.first_name:
                name =record.first_name

            if record.last_name:
                name+=" " + record.last_name
            res.append((record.id, "%s" % (name)))
        return res


    def write(self, vals):
        mail_activity_obj = self.env['mail.activity']
        ir_crm_model_rec = self.env['ir.model'].search([('model', '=', 'crm.lead')], limit=1)
        if 'stage_id' in vals:
            for lead in self:
                for activity in self.env['mail.activity'].search(
                        [('res_id', '=', self.id), ('is_mandatory', '=', True)]):
                    if activity.stage_id == lead.stage_id:
                        if self.env.user.lang == 'en_US':
                            raise UserError(_("Please close this %s activity first before moving to next stage" % activity.summary))
                        elif self.env.user.lang == 'nl_NL':
                            raise UserError(_("Rond eerst deze taak %s voordat je verder gaat " % activity.summary))
                if vals.get('stage_id') != self.stage_id.id:
                    lead.stage_updated_date = datetime.now()
                    lead.phase_days = 0 

            for lead in self:
                for activity_scheduled in self.env['schedule.auto.activity'].search(
                        [('stage_id', '=', vals.get('stage_id'))]):
                    if activity_scheduled:
                        if isinstance(lead.write_date, str):
                            date = datetime.strptime(lead.write_date, DEFAULT_SERVER_DATETIME_FORMAT)
                            date = date + timedelta(days=activity_scheduled.due_day)
                            date = lead.get_next_date_schedule_activit(date)
                        else:
                            date = lead.write_date + timedelta(days=activity_scheduled.due_day)
                            date = lead.get_next_date_schedule_activit(date)

                        mail_activity_info = {'activity_type_id': activity_scheduled.activity_type_id and activity_scheduled.activity_type_id.id or False,
                                              'user_id': self._uid,
                                              'summary': activity_scheduled.name or "",
                                              'is_mandatory': activity_scheduled.is_mandatory or "",
                                              'date_deadline': date,
                                              'note': activity_scheduled.description or "",
                                              'res_id': lead and lead.id or False,
                                              'res_model_id': ir_crm_model_rec and ir_crm_model_rec.id or False,
                                              'stage_id': activity_scheduled.stage_id and activity_scheduled.stage_id.id
                                              or False
                                              }
                        mail_activity_obj.create(mail_activity_info)

        res = super(CRMLead, self).write(vals)

        return res


    
    # Functionality How many days in a phase
    def count_lead_phase_day(self):
        for lead in self.search([]):
            if lead.stage_updated_date:
                stage_date = datetime.strptime(lead.stage_updated_date,DF)
                stage_days_diff = (datetime.now() - stage_date).days
                lead.phase_days = stage_days_diff
                
            create_date = datetime.strptime(lead.create_date, DF)
            total_days_diff = (datetime.now() - create_date).days
            lead.total_phase_days = total_days_diff




    def get_next_date_schedule_activit(self, date):
        print("date====", date.weekday())
        if date.weekday() == 6:
            date = date + timedelta(days=1)
        elif date.weekday() == 5:
            date = date + timedelta(days=2)
        return date

    @api.model
    def create(self, vals):

        # Stage = Terugbelverzoeken if lead from Incoming mail Server
       
        _logger.info("Values: {}".format(vals))
        _logger.info("context:: {}".format(self.env.context))
       
        # is_from_email = context_value.get('fetchmail_cron_running')
        fetchmail_server_id = self.env.context.get('fetchmail_server_id')
        if fetchmail_server_id:
            mail_server = self.env['fetchmail.server'].search([('id','=',fetchmail_server_id)])
            if mail_server:                   
                if mail_server.user == 'terugbel@de-zorgcoach.nl':
                    stage_obj = self.env['crm.stage']
                    stage_id = stage_obj.search([('name','=','Terugbelverzoeken')])
                    if not stage_id:
                        stage_id = stage_obj.create({'name':'Terugbelverzoeken'})

                    _logger.info("Stage ID: {}".format(stage_id.id))
                    stage_dict ={'stage_id':stage_id.id}
                    vals.update(stage_dict)        
                    _logger.info("Stage ID: {}".format(stage_id.name)) 

        result = super(CRMLead, self).create(vals)
        if result.campaign_id and result.campaign_id.name == 'ehealth':
            ehealth_stage = self.env['crm.stage'].search([('name', '=', 'eHealth')], limit=1)
            if ehealth_stage:
                result.stage_id = ehealth_stage.id
        if result and result.stage_id.name != "eHealth":
            mail_activity_obj = self.env['mail.activity']
            ir_crm_model_rec = self.env['ir.model'].search([('model', '=', 'crm.lead')], limit=1)
            for  activity_scheduled in self.env['schedule.auto.activity'].search([('stage_id', '=', result.stage_id.id)]):
                if activity_scheduled:
                    if isinstance(result.create_date, str):
                        date = datetime.strptime(result.create_date, DEFAULT_SERVER_DATETIME_FORMAT)
                        date = date + timedelta(days=activity_scheduled.due_day)
                        date = result.get_next_date_schedule_activit(date)
                    else:
                        date = result.create_date + timedelta(days=activity_scheduled.due_day)
                        date = result.get_next_date_schedule_activit(date)

                    mail_activity_info = {'activity_type_id': activity_scheduled.activity_type_id and
                                          activity_scheduled.activity_type_id.id or False,
                                          'user_id': self._uid,
                                          'summary': activity_scheduled.name or "",
                                          'is_mandatory': activity_scheduled.is_mandatory or "",
                                          'date_deadline': date,
                                          'note': activity_scheduled.description or "",
                                          'res_id': result and result.id or False,
                                          'res_model_id': ir_crm_model_rec and ir_crm_model_rec.id or False,
                                          'stage_id': activity_scheduled.stage_id and activity_scheduled.stage_id.id
                                          or False
                                          }
                    mail_activity_obj.create(mail_activity_info)
        

        result.stage_updated_date = result.create_date

        return result

    def action_get_attachment_tree_view(self):
        action = self.env.ref('base.action_attachment').read()[0]
        action['context'] = {
            'default_res_model': self._name,
            'default_res_id': self.ids[0]
        }
        action['domain'] = [('res_model', '=', 'crm.lead'), ('res_id', 'in', self.ids)]
        return action

    def _compute_document_ids(self):

        attachments = self.env['ir.attachment'].search([
            ('res_model', '=', 'crm.lead'), ('res_id', 'in', self.ids),
        ])
        if attachments:
            self.documents_count = len(attachments)
        else:
            self.documents_count = 0
