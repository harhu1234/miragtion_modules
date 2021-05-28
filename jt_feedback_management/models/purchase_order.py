# -*- coding: utf-8 -*-
##############################################################################
#
#    Jupical Technologies Pvt. Ltd.
#    Copyright (C) 2018-TODAY Jupical Technologies(<http://www.jupical.com>).
#    Author: Jupical Technologies Pvt. Ltd.(<http://www.jupical.com>)
#    you can modify it under the terms of the GNU LESSER
#    GENERAL PUBLIC LICENSE (LGPL v3), Version 3.
#
#    It is forbidden to publish, distribute, sublicense, or sell copies
#    of the Software or modified copies of the Software.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU LESSER GENERAL PUBLIC LICENSE (LGPL v3) for more details.
#
#    You should have received a copy of the GNU LESSER GENERAL PUBLIC LICENSE
#    GENERAL PUBLIC LICENSE (LGPL v3) along with this program.
#    If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

from odoo import fields, models


class PurchaseOrder(models.Model):

    _inherit = 'purchase.order'

    def _compute_count_survey(self):
        for order in self:
            order.count_survey = len(order.survey_input_ids.ids)

    count_survey = fields.Integer(string='Feedbacks', compute="_compute_count_survey")
    survey_input_ids = fields.One2many(
        'survey.user_input', 'purchase_id', string='Answers')

    def send_feedback_link(self):
        # Selecting default invite template
        template = self.env.ref(
            'survey.mail_template_user_input_invite', raise_if_not_found=False)

        config = self.env['ir.config_parameter'].sudo()
        purchase_template_id = int(config.get_param(
            'jt_feedback_management.purchase_template_id'))
        if purchase_template_id:
            template = self.env['mail.template'].sudo().browse(purchase_template_id)

        # Selecting default survey form
        survey = self.env.ref('jt_feedback_management.survey_survey_2',
                              raise_if_not_found=False)

        config = self.env['ir.config_parameter'].sudo()
        purchase_survey_id = int(config.get_param(
            'jt_feedback_management.purchase_survey_id'))
        if purchase_survey_id:
            survey = self.env['survey.survey'].sudo().browse(purchase_survey_id)

        local_context = dict(
            self.env.context,
            default_survey_id=survey and survey.id or False,
            default_model_id=self.env.ref('purchase.model_purchase_order').id,
            default_use_template=bool(template),
            default_template_id=template and template.id or False,
            default_partner_ids=[(6, 0, [self.partner_id and self.partner_id.id or 0])],
            notif_layout='mail.mail_notification_light',
        )
        return {
            'type': 'ir.actions.act_window',
            'view_mode': 'form',
            'res_model': 'survey.invite',
            'target': 'new',
            'context': local_context,
        }
