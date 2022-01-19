# -*- coding: utf-8 -*-

from odoo import models,fields,api,_

class SaleOrder(models.Model):

	_inherit = 'sale.order'

	invoice_policy_change = fields.Boolean(string="Invoice Policy")

	@api.onchange('invoice_policy_change')
	def product_invoice_policy_exchange(self):
		if self.invoice_policy_change == True:
			for line in self.order_line:
				if line.invoice_status == 'no':
					line.invoice_status = 'to invoice'
		elif self.invoice_policy_change == False:
			for line in self.order_line:
				if line.invoice_status == 'to invoice':
					line.invoice_status = 'no'