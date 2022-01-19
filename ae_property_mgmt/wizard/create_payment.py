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
class CreatePaymentWizrd(models.TransientModel):
    _name = 'create.payment.wizard'
    _description = 'Create Payment'


    folio = fields.Char('Folio',copy=False, default=lambda self: self.env['ir.sequence'].next_by_code('create.payment.wizard'))
    # name = fields.Char("Name")
    payment = fields.Float('Payment')
    payment_date = fields.Date('Payment Date',default=fields.Date.context_today)
    agreement_id = fields.Many2one('tenancy.agreement',string='tenancy agreement',default=lambda self: self._context.get('active_id'))
    buyer_id = fields.Many2one('res.partner','Rent to',domain=[('is_customer','=',True)])
    
    def create_tent_invoice(self):
      invoice_line_vals = []
      line_vals = {
                'property_id':self.agreement_id and self.agreement_id.property_id.id or False,
                'name' : self._get_desc(),
                'quantity' :1,
                'price_unit' : self.payment and self.payment or 0.00
              }
      invoice_line_vals.append((0,0,line_vals))
      vals = {
        'can_be_rent':True,
        'partner_id' :self.agreement_id and self.agreement_id.tenant_id.id or False,
        'move_type' : 'out_invoice',
        'agreement_id':self.agreement_id and self.agreement_id or False,
        'invoice_date' : self.payment_date,
        'landlord_id' : self.agreement_id and self.agreement_id.property_id.landlord_id.id or False,
        'invoice_line_ids':invoice_line_vals,
        'name': self.folio or '/',
        }
      cols = self.env['account.move'].create(vals)


    def _get_desc(self):

      desc = ''
      desc += str(self.agreement_id.property_id.layout_id and self.agreement_id.property_id.layout_id.name or '')
      desc += ','
      desc += '(Rooms:'
      desc += str(self.agreement_id.property_id and self.agreement_id.property_id.rooms or '')
      desc += 'Balconis:'
      desc += str(self.agreement_id.property_id.balconi and self.agreement_id.property_id.balconi or '')
      desc += ')'
      desc += '\n'
      desc += str(self.agreement_id.property_id.furnished and self.agreement_id.property_id.furnished or '')
      if self.agreement_id.property_id.furnished:
          desc +='Furnished'
      desc += ','
      desc+=str(self.agreement_id.property_id.total_project_area and self.agreement_id.property_id.total_project_area or '')
      return desc