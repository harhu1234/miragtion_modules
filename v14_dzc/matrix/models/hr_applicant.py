# -*- coding: utf-8 -*-

##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2016 - now Bytebrand Outsourcing AG (<https://www.bytebrand.net>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Lesser General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Lesser General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################


from odoo import api, fields, models
from odoo.tools.translate import _
from odoo.exceptions import UserError
from datetime import date, datetime, timedelta

import logging
import re

_logger = logging.getLogger(__name__)

class HrApplicant(models.Model):
    _inherit = "hr.applicant"

    correct_email = fields.Boolean(default=False, invisible=True)
    date_stop_recr_stage = fields.Datetime(invisible=True)

    def write(self, vals):
        date_stop_stg = fields.Datetime.now()
        if vals.get('stage_id'):
            stage_for_creation_activity_ids = self.env['hr.recruitment.stage'].search(
                [('recruitment_auto_activity', '=', 'auto_create_activity')]).ids
            print("TEST ::: ", vals.get('stage_id'))
            finish_stage = self.env['hr.recruitment.stage'].search(
                [('finish_stage', '=', True)]).ids
            if len(stage_for_creation_activity_ids) != 1:
                raise UserError(_(
                    "Warning, need configure stages for creation activity or there "
                    "are already 2 stages with set 'Recruitment Auto Activity' stage parameter."))
            if stage_for_creation_activity_ids[0] and \
                    vals.get('stage_id') == stage_for_creation_activity_ids[0]:
                self.auto_create_activity(vals)
            if len(finish_stage) != 1:
                raise UserError(_(
                    "Warning, need configure stages like Finish Stage or there "
                    "are already 2 stages with set 'Finish Stage' stage parameter."))
            if finish_stage and vals.get('stage_id') == finish_stage[0]:
                date_finish = datetime.strptime(str(date_stop_stg), "%Y-%m-%d %H:%M:%S")
                vals.update({'date_stop_recr_stage': date_finish})
        return super(HrApplicant, self).write(vals)


    #create activity (migration done)
    def auto_create_activity(self, vals, *args):

        config = self.env['ir.config_parameter'].sudo().get_param('recruitment_auto_activity')
        if not config:
            raise UserError(_(
                "Need set System Parameters with key 'recruitment_auto_activity',\n this is a one-time action."))
        notes_text = config.split(',')
        activity_type_id = 4
        user_id = self._context.get('uid')
        res_id = self.id
        res_model_id = self.env['ir.model'].sudo().search(
            [('model', '=', self._name)], limit=1).id
        values = {
                    'activity_type_id': activity_type_id,
                    'user_id': user_id,
                    'res_id': res_id,
                    'res_model_id': res_model_id,
                    }
        for note in notes_text:
            if note:
                note.strip("\n ,")
                values.update(note=note)
                self.env['mail.activity'].with_context({'from_matrix': True}).create(values)

    @api.model
    def change_applicants_email_cron(self):
        applicants = self.env['hr.applicant'].search([('correct_email', '=', False)])
        for applic in applicants:
            messages = self.env['mail.message'].search([('model', '=', 'hr.applicant'),
                                                        ('res_id', '=', applic.id),
                                                        ('message_type', '=', 'email')])
            for message in messages:
                index_start = message.body.find('E-mailadres') or 0
                if index_start != -1:
                    index_end = message.body.find('Telefoon', index_start)
                    basic_str = message.body[index_start + 11:index_end]
                    if basic_str:
                        pattern = r"mailto:[\w\.-]+@[\w\.-]+"
                        res = re.findall(pattern, basic_str)
                        if res:
                            mail = res[0].replace('mailto:', '')
                            applic.write({'email_from': mail,
                                          'correct_email': True})
            applic.write({'correct_email': True})
        #update leads age
        leads = self.env['crm.lead'].search([('correct_age_town', '=', False)])
        for lead in leads:
            messages = self.env['mail.message'].search([('model', '=', 'crm.lead'),
                                                        ('res_id', '=', lead.id),
                                                        ('message_type', '=', 'email')])
            for message in messages:
                index_start = message.body.find('Woonplaats') or 0
                if index_start != -1:
                    index_end = message.body.find('BSN', index_start)
                    basic_str = message.body[index_start:index_end]
                    if basic_str:
                        pattern = "\d{1,2}\-\d{1,2}\-\d{1,4}"
                        res = re.findall(pattern, basic_str)
                        res_town = []
                        condition = ''
                        if "</font>" in basic_str:
                            res_town = basic_str.split('</font>')
                            condition = '>'
                        elif "&lt;/font&gt;" in basic_str:
                            res_town = basic_str.split('&lt;/font&gt;')
                            condition = '&gt;'
                        if res_town:
                            town = res_town[1].split(condition)[-1]
                            print("town", town)
                            if town:
                                lead.write({'place': town})
                        if res:
                            dob = res[0]
                            dob_dt = datetime.strptime(dob, "%d-%m-%Y")
                            today = datetime.today()
                            res_age = today.year - dob_dt.year - \
                                      ((today.month, today.day) < (dob_dt.month, dob_dt.day))
                            if res_age:
                                lead.write({'age': res_age, 'correct_age_town': True})
            lead.write({'correct_age_town': True})

    @api.model
    def message_get_reply_to(self, ids, default=None):
        result = super(HrApplicant, self).message_get_reply_to(ids,
                                                               default=default)
        new_email_for_repl = self.env['ir.config_parameter'].sudo().get_param(
            'new_email_for')
        if result and new_email_for_repl:
            for r in result:
                result[r] = new_email_for_repl
        return result


    #migration done
    @api.model
    def auto_delete_applic(self):
        datetime_now = datetime.strptime(str(fields.Datetime.now()),
                                         "%Y-%m-%d %H:%M:%S")
        f_stage = False
        finish_stage = self.env['hr.recruitment.stage'].search(
            [('finish_stage', '=', True)]).ids
        print("Finish Stage ::",finish_stage)
        if len(finish_stage) != 1:
            print("stage truble for cron", len(finish_stage))
            _logger.warning("stage truble for cron")
        else:
            f_stage = finish_stage[0]
        applic_pool = self.env['hr.applicant'].search(
            [('stage_id', '=', f_stage)])
        if applic_pool:
            for applic in applic_pool:
                if applic.date_stop_recr_stage:
                    date_stop_recr_stage = datetime.strptime(
                        str(applic.date_stop_recr_stage), "%Y-%m-%d %H:%M:%S")
                    if date_stop_recr_stage < (
                            datetime_now - timedelta(days=365)):
                        query = """DELETE FROM "hr_applicant"  
                                   WHERE id = %s """
                        try:
                            self.env.cr.execute(query, (applic.id,))
                        except Exception as e:
                            _logger.warning(
                                "Error during deleting applicant with id: %s with error %s",
                                applic.id, e)
                        _logger.info("deleted applicant wit id: %s", applic.id)

class RecruitmentStage(models.Model):
    _inherit = "hr.recruitment.stage"

    recruitment_auto_activity = fields.Selection([
        ('auto_create_activity',
         "Auto Create Activity for '1e gesprek' "),
    ], sring="Type of action",
        help="Please select type of action for this stage.")
    finish_stage = fields.Boolean(default=False, sring="Finish Stage",
                                  help="Please select True if its finish stage.")
