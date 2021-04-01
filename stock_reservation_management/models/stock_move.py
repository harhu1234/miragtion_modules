from odoo import api,fields,models,_
from odoo.exceptions import Warning

class StockMove(models.Model):
    
    _inherit = "stock.move"

    def action_unreserve_stock(self):
        for move in self:
            if move.state in ['draft','cancel','done']:
                continue
            move._do_unreserve()
        self.mapped('picking_id')._compute_state()
        return True

    def action_reserve_stock(self):
        for move in self:
            if move.state in ['draft','cancel','done']:
                continue
            move._action_assign()
        self.mapped('picking_id')._compute_state()
        return True