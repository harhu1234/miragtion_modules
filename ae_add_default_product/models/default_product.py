from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class DefaultProduct(models.Model):

    _inherit = "res.partner"

    product_id = fields.One2many("customer.quatation", "customer_id", string="Product Details")


class CustomerProduct(models.Model):

    _inherit = "sale.order"

    @api.onchange('partner_id')
    def _partner_to_product(self):
        if self.partner_id:
            customer_product = self.env['res.partner'].search([('id', '=', self.partner_id.id)])
            sale_product = self.env['sale.order']
            cust_product = []
            for product in customer_product.product_id:
                line_val = {
                    'product_id': product.product_id,
                    'name': product.description,
                    'product_uom_qty': product.product_qty,
                    'price_unit': product.price_unit,
                    'product_uom': product.product_uom,
                }
                cust_product.append((0, 0, line_val))
            self.write({'order_line': cust_product})


class CustomerQuatation(models.Model):
    _name = "customer.quatation"
    _description = "Customer quatation"

    product_id = fields.Many2one("product.product", string="Product")
    description = fields.Char(related="product_id.product_tmpl_id.name", string="Description")
    product_qty = fields.Float(string="Quantity", default=1)
    product_uom = fields.Many2one("uom.uom", string="Uom", related="product_id.product_tmpl_id.uom_id")
    price_unit = fields.Float(related="product_id.product_tmpl_id.list_price", string="Unit Price")

    customer_id = fields.Many2one("res.partner", string="Customer")
