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


class ResConfigSettings(models.TransientModel):

    _inherit = 'res.config.settings'

    # Default Invite Template
    sale_template_id = fields.Many2one('mail.template', domain=lambda self: [
                                       '|', ('model', '=', 'survey.user_input'), ('survey_model_id', '=', self.env.ref('sale.model_sale_order').id)])
    purchase_template_id = fields.Many2one('mail.template', domain=lambda self: [
                                           '|', ('model', '=', 'survey.user_input'), ('survey_model_id', '=', self.env.ref('purchase.model_purchase_order').id)])
    invoice_template_id = fields.Many2one('mail.template', domain=lambda self: [
                                          '|', ('model', '=', 'survey.user_input'), ('survey_model_id', '=', self.env.ref('account.model_account_move').id)])
    stock_template_id = fields.Many2one('mail.template', domain=lambda self: [
                                        '|', ('model', '=', 'survey.user_input'), ('survey_model_id', '=', self.env.ref('stock.model_stock_picking').id)])
    # Default Survey Form
    sale_survey_id = fields.Many2one('survey.survey', domain=lambda self: [
                                     ('model_id', '=', self.env.ref('sale.model_sale_order').id)])
    purchase_survey_id = fields.Many2one('survey.survey', domain=lambda self: [(
        'model_id', '=', self.env.ref('purchase.model_purchase_order').id)])
    invoice_survey_id = fields.Many2one('survey.survey', domain=lambda self: [(
        'model_id', '=', self.env.ref('account.model_account_move').id)])
    stock_survey_id = fields.Many2one('survey.survey', domain=lambda self: [(
        'model_id', '=', self.env.ref('stock.model_stock_picking').id)])

    @api.model
    def get_values(self):
        res = super(ResConfigSettings, self).get_values()
        config = self.env['ir.config_parameter'].sudo()
        res.update(
            sale_template_id=int(config.get_param(
                'jt_feedback_management.sale_template_id')),
            purchase_template_id=int(config.get_param(
                'jt_feedback_management.purchase_template_id')),
            invoice_template_id=int(config.get_param(
                'jt_feedback_management.invoice_template_id')),
            stock_template_id=int(config.get_param(
                'jt_feedback_management.stock_template_id')),

            sale_survey_id=int(config.get_param(
                'jt_feedback_management.sale_survey_id')),
            purchase_survey_id=int(config.get_param(
                'jt_feedback_management.purchase_survey_id')),
            invoice_survey_id=int(config.get_param(
                'jt_feedback_management.invoice_survey_id')),
            stock_survey_id=int(config.get_param(
                'jt_feedback_management.stock_survey_id')),
        )
        return res

    def set_values(self):
        super(ResConfigSettings, self).set_values()
        param = self.env['ir.config_parameter'].sudo()

        param.set_param(
            'jt_feedback_management.sale_template_id', self.sale_template_id and self.sale_template_id.id or False)
        param.set_param(
            'jt_feedback_management.purchase_template_id', self.purchase_template_id and self.purchase_template_id.id or False)
        param.set_param(
            'jt_feedback_management.invoice_template_id', self.invoice_template_id and self.invoice_template_id.id or False)
        param.set_param(
            'jt_feedback_management.stock_template_id', self.stock_template_id and self.stock_template_id.id or False)

        param.set_param(
            'jt_feedback_management.sale_survey_id', self.sale_survey_id and self.sale_survey_id.id or False)
        param.set_param(
            'jt_feedback_management.purchase_survey_id', self.purchase_survey_id and self.purchase_survey_id.id or False)
        param.set_param(
            'jt_feedback_management.invoice_survey_id', self.invoice_survey_id and self.invoice_survey_id.id or False)
        param.set_param(
            'jt_feedback_management.stock_survey_id', self.stock_survey_id and self.stock_survey_id.id or False)
