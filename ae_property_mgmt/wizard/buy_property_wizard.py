# -*- coding: utf-8 -*-
##############################################################################
#
#    AtharvERP Business Solutions
#    Copyright (C) 2020-TODAY AtharvERP Business Solutions(<http://www.atharverp.com>).
#    Author: AtharvERP Business Solutions(<http://www.atharverp.com>)
#    you can modify it under the terms of the GNU LESSER
#    GENERAL PUBLIC LICENSE (LGPL v3), Version 3.
#
#    It is forbidden to publish, distribute, sublicense, or sell copies
#    of the Software or modified copies of the Software.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU LESSER GENERAL PUBLIC LICENSE (LGPL v3) for more details.
#
#    You should have received a copy of the GNU LESSER GENERAL PUBLIC LICENSE
#    GENERAL PUBLIC LICENSE (LGPL v3) along with this program.
#    If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

from odoo import api, fields, models, _ 
class BuyPropertyWizard(models.TransientModel):
    _name = 'buy.property'
    _description = 'Buy Property'


    folio = fields.Char('Folio',copy=False, default=lambda self: self.env['ir.sequence'].next_by_code('buy.property'))
    property_id = fields.Many2one('property.mgmt',string="Property",default = lambda self:self._context.get('active_id'))
    payment = fields.Float('Payment',related='property_id.price')
    payment_date = fields.Date('Payment Date',default=fields.Date.context_today)
    buyer_id = fields.Many2one('res.partner',string='Vendee')
    
    def create_invoice(self):
      invoice_line_vals = []

      line_vals = {
                'property_id':self.property_id and self.property_id.id or False,
                'name' : self._get_desc(),
                'quantity' :1,
                'price_unit' : self.payment and self.payment or 0.00
              }
      invoice_line_vals.append((0,0,line_vals))
      vals = {
        'name':self.folio and self.folio or '',
        'can_be_sold':True,
        'partner_id' :self.buyer_id and self.buyer_id.id or False,
        'landlord_id':self.property_id and self.property_id.landlord_id or False ,
        'move_type' : 'out_invoice',
        'invoice_date' : self.payment_date,
        'invoice_line_ids':invoice_line_vals,
        
        }
      cols = self.env['account.move'].create(vals)
      self.property_id.availablity = 'sold'
      self.property_id.availaible_for = 'sale'
      self.property_id.state = 'sold'

    def _get_desc(self):

        desc = ''
        desc += str(self.property_id.layout_id and self.property_id.layout_id.name or '')
        desc += ','
        if self.property_id.rooms:
          desc += '(Rooms:'
          desc += str(self.property_id and self.property_id.rooms or '')
        if self.property_id.balconi:
          desc += 'Balconis:'
          desc += str(self.property_id.balconi and self.property_id.balconi or '')
          desc += ')'
          desc += '\n'
        desc += str(self.property_id.furnished and self.property_id.furnished or '')
        if self.property_id.furnished:
            desc +='Furnished'
        desc += ','
        desc+=str(self.property_id.total_project_area and self.property_id.total_project_area or '')
        return desc