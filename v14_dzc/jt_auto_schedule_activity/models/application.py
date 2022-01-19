from odoo import fields, models, api
from datetime import datetime
from datetime import timedelta
from openerp.tools import DEFAULT_SERVER_DATETIME_FORMAT

class ScheduleApplication(models.Model):

    _name = "schedule.activity.application"

    name = fields.Char("Name")
    due_day = fields.Integer("Due Day")
    stage_id = fields.Many2one('hr.recruitment.stage')


class Applicant(models.Model):

    _inherit = "hr.applicant"

    @api.model
    def create(self, vals):
        res = super(Applicant, self).create(vals)
        desc = res.description
        
        email = ''
        phone = ''

        if desc:
            if 'E-mailadres:' in desc:
                start = 'E-mailadres:'
                end = 'Telefoon:'
                email = desc[desc.find(start) + len(start):desc.find(end)].strip()
                res.email_from = email
            if 'Telefoon' in desc:
                start = 'Telefoon:'
                end = 'Woonplaats:'
                phone = desc[desc.find(start) + len(start):desc.find(end)].strip()
                res.partner_phone = phone

            if 'Hoe heb je van deze vacature gehoord?:':
                start = 'Hoe heb je van deze vacature gehoord?:'
                end = ''
                source = desc[desc.find(start) + len(start):].strip()
                if source:
                    source_obj = self.env['utm.source']
                    print("Source ::", source)
                    source_id = source_obj.search([('name', '=', source)], limit=1)
                    if not source_id:
                        print("Not exist")
                        source_id = source_obj.create({'name': source})

                res.source_id = source_id.id
        if res.partner_name:
            name = res.partner_name
            contact_obj = self.env['res.partner']
            contact_id = contact_obj.search([('name', '=', name)], limit=1)

            if not contact_id:
                contact_id = contact_obj.create({'name': name,
                                                 'email': email,
                                                 'phone': phone})

            res.partner_id = contact_id.id

        return res

    # @api.model
    # def create(self, vals):
    #   result = super(Applicant, self).create(vals)
    #
    #   mail_activity_obj= self.env['mail.activity']
    #   mail_activity_type = self.env['mail.activity.type'].search([], limit=1)
    #   ir_crm_model_rec = self.env['ir.model'].search([('model','=','hr.applicant')], limit=1)
    #
    #   for schedule_activity in self.env['schedule.activity.application'].search([]):
    #       if isinstance(result.create_date, str):
    #           date = datetime.strptime(result.create_date, DEFAULT_SERVER_DATETIME_FORMAT)
    #           date = date + timedelta(days=schedule_activity.due_day)
    #       else:
    #           date = result.create_date + timedelta(days=schedule_activity.due_day)
    #
    #       mail_activity_info = {'activity_type_id':mail_activity_type and \
    #                   mail_activity_type.id or False,
    #       'user_id': self._uid,
    #       'summary': schedule_activity.name or "",
    #       'date_deadline': date,
    #       'note': schedule_activity.name or "",
    #       'res_id': result and result.id or False,
    #       'res_model_id': ir_crm_model_rec and ir_crm_model_rec.id or False
    #       }
    #       mail_activity_obj.create(mail_activity_info)
    #
    #   return result

    def write(self, vals):
        result = super(Applicant, self).write(vals)
        mail_activity_obj = self.env['mail.activity']
        mail_activity_type = self.env['mail.activity.type'].search([('name', '=', 'Todo'), ('res_model_id', '=', False)], limit=1)
        if not mail_activity_type:
            mail_activity_type = self.env['mail.activity.type'].search([], limit=1)
        sch_act_obj = self.env['schedule.activity.application']
        ir_crm_model_rec = self.env['ir.model'].search([('model', '=', 'hr.applicant')], limit=1)
        currt_time = datetime.now()
        if vals.get('stage_id'):
            for app in self:
                for schedule_activity in sch_act_obj.search([('stage_id', '=', vals.get('stage_id'))]):
                    if isinstance(currt_time, str):
                        date = datetime.strptime(currt_time, DEFAULT_SERVER_DATETIME_FORMAT)
                        date = date + timedelta(days=schedule_activity.due_day)
                    else:
                        date = currt_time + timedelta(days=schedule_activity.due_day)

                    mail_activity_info = {'activity_type_id': mail_activity_type and
                                          mail_activity_type.id or False,
                                          'user_id': self._uid,
                                          'summary': schedule_activity.name or "",
                                          'date_deadline': date,
                                          'note': schedule_activity.name or "",
                                          'res_id': app and app.id or False,
                                          'res_model_id': ir_crm_model_rec and ir_crm_model_rec.id or False
                                          }
                    mail_activity_obj.create(mail_activity_info)
        return result





