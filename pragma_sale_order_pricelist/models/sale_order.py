# -*- coding: utf-8 -*-

#
#    odoo extensions
#
#    © 2017-now Josef Kaser (<http://www.pragmasoft.de>).
#
#   See the LICENSE file in the toplevel directory for copyright
#   and license details.
#


from odoo import models, fields, api, _
from odoo.exceptions import UserError, ValidationError

import logging

_logger = logging.getLogger(__name__)

class SaleOrder(models.Model):
    _inherit = 'sale.order'
    _name = _inherit

    @api.onchange('pricelist_id')
    def _set_pricelist(self):
        for sale_order in self:
            if sale_order.pricelist_id:
                sale_order.currency_id = sale_order.pricelist_id.currency_id

            if sale_order.order_line:
                self._calculate_order_lines(sale_order.order_line)

    def _calculate_order_lines(self, order_lines):
        for order_line in order_lines:
            if order_line.order_id.pricelist_id:
                order_line.price_unit = order_line.order_id.pricelist_id.get_product_price(
                    order_line.product_id, 1, order_line.order_id.partner_id, uom_id=order_line.product_uom.id)
