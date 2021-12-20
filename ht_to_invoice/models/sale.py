# -*- encoding: utf-8 -*-

from odoo import models,fields, api, _ 

class SaleOrder(models.Model):

	_inherit = "sale.order"

	total_delivery = fields.Float(string="Total Delivery",
		compute="_update_price", store=True)
	total_invoice = fields.Float(string="Total Invoice", compute="_update_price", store=True)
	to_invoice = fields.Float(string="To Invoice", compute="_update_price", store=True)

	def _get_tax_percentgae(self, line):
		tax_percentage = 0
		for tax in line.tax_id:
			tax_percentage += tax.amount
		return tax_percentage

	@api.depends('picking_ids','invoice_ids','picking_ids.state','invoice_ids.state')
	def _update_price(self):		
		for order in self:
			delivery_total= 0
			invoice_total=0
			for line in order.order_line:
				line_total = line.qty_delivered * (line.price_unit + (line.price_unit*(self._get_tax_percentgae(line)/100)))
				delivery_total+= line_total
			for invoice in order.invoice_ids:
				if invoice.state == 'posted':
					invoice_total+= invoice.amount_total
			order.total_delivery = delivery_total
			order.total_invoice = invoice_total
			order.to_invoice = delivery_total - invoice_total
