# -*- coding: utf-8 -*-

from odoo import models,fields,api,_
from odoo.exceptions import UserError, ValidationError

class StockLocation(models.Model):

	_inherit = 'stock.location'
	_order = 'priority'

	priority = fields.Char(string="Priority")
	

class StockRule(models.Model):

	_inherit = 'stock.rule'

	def get_priority_location(self,vals):
		all_stock_location = self.env['stock.location'].search([('usage','=','internal'),('priority','!=',False)])
		for location in all_stock_location:
			if vals.get('product_id',False):
				product_id = self.env['product.product'].browse(vals.get('product_id'))
				stock_qty =product_id.with_context(location=location.id).free_qty
				if stock_qty >= vals.get('product_uom_qty',0):
					vals.update({'location_id':location.id})
					break
		return vals
	
	
	def _get_stock_move_values(self, product_id, product_qty, product_uom, location_id, name, origin, company_id, values):
		move_vals = super(StockRule,self)._get_stock_move_values(product_id, product_qty, product_uom, location_id, name, origin, company_id, values)
		if move_vals.get('sale_line_id',False):
			move_vals = self.get_priority_location(move_vals)
		return move_vals
	 
	