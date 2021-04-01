# -*- coding: utf-8 -*-

from odoo import api, models, fields, tools, _
from odoo.addons import decimal_precision as dp
from odoo.exceptions import UserError
import datetime

class StockPickingType(models.Model):
    
    _inherit = "stock.picking.type"

    @api.multi
    def open_quick_transfer_wizard(self):
    	self.ensure_one()
    	context = {
    		'default_source_location_id' : self.default_location_src_id and self.default_location_src_id.id,
    	}
    	return {
            'name': _('Stock Move'),
            'view_type': 'form',
            'view_mode': 'form',
            'view_id':self.env.ref('easy_stock_move.view_easy_transfer_product_quantity_picking_type').id,
            'res_model': 'easy.move.product.wizard',
            'type': 'ir.actions.act_window',
            'target': 'new'
        }