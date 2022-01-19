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

from odoo import fields, models, api


class ResCompany(models.Model):
    _inherit = 'res.company'

    item_limit = fields.Integer("Item Limit", default='10')
    record_based_on  = fields.Selection([('sale','Confirm Order'),('done','Done Order'),('both','Both')],string="Product Sale Price History Based On",default="sale")


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    item_limit = fields.Integer(related="company_id.item_limit", string="Item Limit")
    record_based_on  = fields.Selection([('sale','Confirm Order'),('done','Done Order'),('both','Both')],string="Product Sale Price History Based On",default="sale")


class SalePriceHistory(models.Model):
    _name = 'sale.price.history'

    name = fields.Many2one("sale.order.line", string="Sale Order Line")
    tmpl_id = fields.Many2one("product.template", string="Template Id")

    partner_id = fields.Many2one("res.partner", related="name.order_partner_id", string="Customer")
    sales_person_id = fields.Many2one("res.users", related="name.salesman_id", string="Sales Person")
    variant_id = fields.Many2one("product.product", related="name.product_id", string="Product")
    sale_order_id = fields.Many2one("sale.order", related="name.order_id", string="Sale Order")
    order_date = fields.Datetime("Order Date", related="name.order_id.date_order")
    quantity = fields.Float("Quantity", related="name.product_uom_qty")
    sale_price = fields.Float("Sale Price", related="name.price_unit")
    currency_id = fields.Many2one("res.currency", string="Currency Id", related="name.currency_id")
    total_price = fields.Monetary(string="Total", related="name.price_subtotal")


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    price_history_line_ids = fields.Many2many("sale.price.history", string="Price History Lines", compute="get_product_customer_price")

    def get_product_customer_price(self):
        if self and self.id:
            if self.env.user.company_id:

                cond = self.env.user.company_id.record_based_on
                itm_limit = self.env.user.company_id.item_limit
                sale_price_line = []

                if cond == 'both':
                    sale_line_obj = self.env['sale.order.line'].search([('product_id', 'in', self.product_variant_ids.ids), ('state', 'in', ('sale', 'done'))], limit=itm_limit, order='create_date desc')
                else:
                    sale_line_obj = self.env['sale.order.line'].search([('product_id', 'in', self.product_variant_ids.ids), ('state', '=', str(cond))], limit=itm_limit, order='create_date desc')

                if sale_line_obj:
                    for record in sale_line_obj:

                        vals = {}
                        vals.update({'tmpl_id': self.id})
                        vals.update({'name': record.id})

                        if record.order_partner_id:
                            vals.update({'partner_id': record.order_partner_id.id})
                        if record.salesman_id:
                            vals.update({'sales_person_id': record.salesman_id.id})

                        if record.product_id:
                            vals.update({'variant_id': record.product_id.id})
                        if record.order_id:
                            vals.update({'sale_order_id': record.order_id.id})

                        if record.order_id.date_order:
                            vals.update({'order_date': record.order_id.date_order})
                        if record.product_uom_qty:
                            vals.update({'quantity': record.product_uom_qty})
                        if record.price_unit:
                            vals.update({'sale_price': record.price_unit})
                        if record.price_subtotal:
                            vals.update({'total_price': record.price_subtotal})

                        if vals:
                            sale_price_obj = self.env['sale.price.history'].create(vals)

                            if sale_price_obj:
                                sale_price_line.append(sale_price_obj.id)

                self.price_history_line_ids = sale_price_line


class ProductProduct(models.Model):
    _inherit = 'product.product'

    price_history_line_ids = fields.Many2many("sale.price.history", string="Price History Lines", compute="get_product_customer_price")

    def get_product_customer_price(self):
        if self and self.id:
            if self.env.user.company_id:

                cond = self.env.user.company_id.record_based_on
                itm_limit = self.env.user.company_id.item_limit
                sale_price_line = []

                if cond == 'both':
                    sale_line_obj = self.env['sale.order.line'].search([('product_id', 'in', [self.id]), ('state', 'in', ('sale', 'done'))], limit=itm_limit, order='create_date desc')
                else:
                    sale_line_obj = self.env['sale.order.line'].search([('product_id', 'in', [self.id]), ('state', '=', str(cond))], limit=itm_limit, order='create_date desc')

                if sale_line_obj:
                    for record in sale_line_obj:

                        vals = {}
                        vals.update({'tmpl_id': self.id})
                        vals.update({'name': record.id})

                        if record.order_partner_id:
                            vals.update({'partner_id': record.order_partner_id.id})
                        if record.salesman_id:
                            vals.update({'sales_person_id': record.salesman_id.id})

                        if record.product_id:
                            vals.update({'variant_id': record.product_id.id})
                        if record.order_id:
                            vals.update({'sale_order_id': record.order_id.id})

                        if record.order_id.date_order:
                            vals.update({'order_date': record.order_id.date_order})
                        if record.product_uom_qty:
                            vals.update({'quantity': record.product_uom_qty})
                        if record.price_unit:
                            vals.update({'sale_price': record.price_unit})
                        if record.price_subtotal:
                            vals.update({'total_price': record.price_subtotal})

                        if vals:
                            sale_price_obj = self.env['sale.price.history'].create(vals)

                            if sale_price_obj:
                                sale_price_line.append(sale_price_obj.id)

                self.price_history_line_ids = sale_price_line
