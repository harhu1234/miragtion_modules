# -*- coding: utf-8 -*-
##############################################################################
#
#    AtharvERP Business Solutions
#    Copyright (C) 2020-TODAY AtharvERP Business Solutions(<http://www.atharverp.com>).
#    Author: AtharvERP Business Solutions(<http://www.atharverp.com>)
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

from odoo import api, fields, models, _, http


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    sale_popover = fields.Boolean(string="Sale Order Product Details Popover")
    purchase_popover = fields.Boolean(string="Purchase Product Details Popover")
    stock_popover = fields.Boolean(string="Stock Product Details Popover")
    invoice_popover = fields.Boolean(string="Invoice Product Details Popover")

    @api.model
    def get_values(self):
        res = super(ResConfigSettings, self).get_values()
        config_param_obj = self.env['ir.config_parameter']
        res.update(
            sale_popover=self.env['ir.config_parameter'].sudo().get_param('sale_popover'),
            purchase_popover=config_param_obj.sudo().get_param('purchase_popover'),
            stock_popover=config_param_obj.sudo().get_param('stock_popover'),
            invoice_popover=config_param_obj.sudo().get_param('invoice_popover'),
        )
        return res

    def set_values(self):
        super(ResConfigSettings, self).set_values()
        config_param_obj = self.env['ir.config_parameter'].sudo()
        config_param_obj.set_param("sale_popover", self.sale_popover)
        config_param_obj.set_param("purchase_popover", self.purchase_popover)
        config_param_obj.set_param("stock_popover", self.stock_popover)
        config_param_obj.set_param("invoice_popover", self.invoice_popover)


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    def get_product_detail_popover(self, id, model):
        if id and model:
            dict = {
                'sale.order.line': 'sale_popover',
                'purchase.order.line': 'purchase_popover',
                'account.move.line': 'invoice_popover',
                'stock.move': 'stock_popover'
            }
            popover = self.env['ir.config_parameter'].sudo().get_param(dict.get(model))
            if popover and id:
                product_id = self.env['product.product'].sudo().browse([int(id)])
                if product_id:
                    value = {
                        'html': self.env['ir.ui.view'].render_template(
                            "ae_product_web_over.aspl_product_popover_template", {
                                'product': product_id,
                            })
                    }
                    return value
        else:
            return {}