# -*- coding: utf-8 -*-

from odoo import api, models, fields, tools, _
from odoo.addons import decimal_precision as dp
from odoo.exceptions import UserError
import datetime

class EasyMoveProduct(models.TransientModel):
    
    _name = "easy.move.product.wizard"
    _description = "Easy Stock Move"

    product_id = fields.Many2one('product.product', 'Product', required=True)
    product_tmpl_id = fields.Many2one('product.template', 'Template', required=True)
    product_variant_count = fields.Integer('Variant Count', related='product_tmpl_id.product_variant_count')
    quantity_to_transfer = fields.Float(
        'Quantity to Move', default=1,
        digits=dp.get_precision('Product Unit of Measure'), required=True,
        help='This quantity is expressed in the Default Unit of Measure of the product.')
    
    lot_id = fields.Many2one('stock.production.lot', 'Lot/Serial Number', domain="[('product_id','=',product_id)]")
    has_tracking=fields.Selection(related='product_id.tracking', readonly=True)
    source_location_id = fields.Many2one('stock.location', 'Source Location', required=True)
    dest_location_id = fields.Many2one('stock.location', 'Destination Location', required=True)
    qunatity_at_source_location = fields.Float("Quantity at source Location",compute='_get_quantity_at_source_location')
    
    @api.multi
    @api.onchange('product_id','source_location_id')
    def _get_quantity_at_source_location(self):
        for record in self:
            if not record.product_id:
                record.qunatity_at_source_location = 0 
            else:
                record.qunatity_at_source_location = record.product_id.with_context({'location':record.source_location_id.id}).qty_available
                
    @api.model
    def default_get(self, fields):
        res = super(EasyMoveProduct, self).default_get(fields)
        if not res.get('product_id') and self.env.context.get('active_id') and self.env.context.get('active_model') == 'product.template' and self.env.context.get('active_id'):
            res['product_id'] = self.env['product.product'].search([('product_tmpl_id', '=', self.env.context['active_id'])], limit=1).id
        elif not res.get('product_id') and self.env.context.get('active_id') and self.env.context.get('active_model') == 'product.product' and self.env.context.get('active_id'):
            res['product_id'] = self.env['product.product'].browse(self.env.context['active_id']).id
        res['source_location_id'] = self.env.ref('stock.stock_location_stock').id
        #res['dest_location_id'] = self.env.ref('stock.stock_location_scrapped').id
        return res
    
    def onchange_product_id_dict(self, product_id):
        return {
            'product_tmpl_id': self.env['product.product'].browse(product_id).product_tmpl_id.id,
        }


    @api.onchange('product_id')
    def onchange_product_id(self):
        if self.product_id:
            self.product_tmpl_id = self.onchange_product_id_dict(self.product_id.id)['product_tmpl_id']

    @api.model
    def create(self, values):
        if values.get('product_id'):
            values.update(self.onchange_product_id_dict(values['product_id']))
        return super(EasyMoveProduct, self).create(values)

    @api.constrains('quantity_to_transfer')
    def check_quantity(self):
        if any(wizard.quantity_to_transfer < 0 for wizard in self):
            raise UserError(_('Quantity cannot be negative.'))

    @api.multi
    def transfer_product_qty(self):

        vals = {
            'product_id':self.product_id.id,
            'product_uom_qty':self.quantity_to_transfer,
            'product_uom': self.product_id.uom_id.id,
            'scrapped': True,
            'date_expected':datetime.datetime.now(),
            'origin':'Move to Scrap Transfer',
            'product_uom':self.product_id.uom_id.id,
            'date':datetime.datetime.now(),
            'location_id':self.source_location_id.id,
            'name' : 'Move to Scrap Transfer - %s'%(self.product_id.name),
            'location_dest_id':self.dest_location_id.id,
            'move_line_ids': [(0, 0, {'product_id': self.product_id.id,
                                           'product_uom_id': self.product_id.uom_id.id, 
                                           'qty_done': self.quantity_to_transfer,
                                           'location_id': self.source_location_id.id,
                                           'location_dest_id': self.dest_location_id.id,
                                           'lot_id': self.lot_id.id, })],
            
        }
        if self.lot_id:
            vals.update({'lot_ids':[(6,0,[self.lot_id.id])]})
            
        stock_move = self.env['stock.move'].create(vals)
        
        #Action confirm for V10
        #stock_move.action_confirm()
        stock_move._action_confirm()
        stock_move._action_assign()
        stock_move._action_done()
        return {'type': 'ir.actions.act_window_close'}
