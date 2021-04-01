from odoo import api,fields,models,_
from odoo.exceptions import Warning

class ProductTemplate(models.Model):
    
    _inherit = "product.template"
    

    @api.multi
    def action_view_stock_move_reservation_lines(self):
        self.ensure_one()
        moves = self.env['stock.move'].search([
                ('product_id','in',self.product_variant_ids.ids),
                ('state','not in',['draft','cancel','done'])
            ])
        return {
            'name': _('Manage Stock Reservation'),
            'type': 'ir.actions.act_window',
            'view_mode': 'tree',
            'res_model': 'stock.move',
            'view_id': self.env.ref('stock_reservation_management.view_move_tree_stock_reservation').id,
            'domain': [('id', 'in', moves.ids)],
            'context': {
                'default_product_id': self.env.context.get('default_product_id'),
                'search_default_outgoing':1,
                }
        }