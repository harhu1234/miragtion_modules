# -*- coding:utf-8 -*-

from odoo import models,fields,api

class ProductCategory(models.Model):

	_inherit = "product.public.category"


	def fetch_category(self):
		category_ids = self.search([('parent_id','=',False)])
		return category_ids