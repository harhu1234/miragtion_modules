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
class TenantAgreementWizrd(models.TransientModel):
    _name = 'create.tenant.agreement'
    _description = 'Tentant Agreement'


    folio = fields.Char('Agreement Number',copy=False, default=lambda self: self.env['ir.sequence'].next_by_code('create.tenant.agreement'))
    property_id = fields.Many2one('property.mgmt',string="Property",default = lambda self:self._context.get('active_id'))
    tenant_id = fields.Many2one('res.partner','Tenant',domain=[
                              ('is_tentant', '=', True)])
    landlord_id = fields.Many2one('res.partner',related='property_id.landlord_id',string='Landlord',domain=[('is_landlord', '=', True)])
    tenancy_start_date = fields.Date('Agreement Start Date')
    agreement_date = fields.Date('Agreement Date')
    tenancy_end_date = fields.Date('Agreement End Date')
    deposite = fields.Float('Deposite')
    rent = fields.Float('Rent')

    def create_tenanancy_agreement(self):

      if self.property_id :
          
          tentant_record = {
            'folio' : self.folio and self.folio or '',
            'property_id':self.property_id and self.property_id.id or False,
            'tenant_id' : self.tenant_id and self.tenant_id.id or False,
            'landlord_id':self.landlord_id and self.landlord_id.id or False,
            'tenancy_start_date' : self.tenancy_start_date and self.tenancy_start_date or False,
            'tenancy_end_date' : self.tenancy_start_date and self.tenancy_start_date or False,
            'agreement_date' : self.agreement_date and self.agreement_date or False ,
            'rent' : self.rent and self.rent or 0.0,
            'deposite': self.deposite and self.deposite or 0.0
            }
          if tentant_record:
            property_id = self.env['property.mgmt'].browse(self._context.get('active_id'))
            property_id.availablity = 'rented'
            property_id.state = 'rented'
            self.env['tenancy.agreement'].create(tentant_record)




