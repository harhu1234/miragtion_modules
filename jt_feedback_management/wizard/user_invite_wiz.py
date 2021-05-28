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

from odoo import fields, models, api


class SurveyInvite(models.TransientModel):

    _inherit = 'survey.invite'

    template_id = fields.Many2one(
        'mail.template', 'Use template', index=True)
    model_id = fields.Many2one('ir.model', string='Document Model')

    @api.onchange('survey_id')
    def _onchange_model_id(self):
        if self.survey_id.model_id:
            domain = [('model', '=', 'survey.user_input'), '|', ('survey_model_id', '=', self.survey_id.model_id.id), '|', ('id', 'in', (self.env.ref(
                'survey.mail_template_user_input_invite').id, self.env.ref('survey.mail_template_certification').id)), ('survey_model_id', '=', False)]
            return {
                'domain': {
                    'template_id': domain
                }
            }
        else:
            return {
                'domain': {
                    'template_id': [('model', '=', 'survey.user_input')]
                }
            }
