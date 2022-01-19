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

class AccountMove(models.Model):
    _inherit = 'account.move'
   
    can_be_sold = fields.Boolean('Can be sold')
    can_be_rent = fields.Boolean('Can be rent')
    landlord_id = fields.Many2one('res.partner',string='Landlord',domain=[('is_customer','=',True)])
    agreement_id = fields.Many2one('tenancy.agreement',string='tenancy agreement')    
    
    # @api.onchange('property_id')
    # def onchange_property_id(self):

    #     for record in self:
    #         record.partner_id = record.property_id.landlord_id
    #         record.landlord_id = record.property_id.landlord_id.name

    
        

class AccountMoveLine(models.Model):
    _inherit = 'account.move.line'

    property_id = fields.Many2one('property.mgmt', string='Property')

    @api.onchange('property_id','move_id')
    @api.depends('property_id','move_id')
    def onchange_property_id(self):

        desc = ''
        desc += str(self.property_id.layout_id and self.property_id.layout_id.name or '')
        desc += ','
        desc += '(Rooms:'
        desc += str(self.property_id and self.property_id.rooms or '')
        desc += 'Balconis:'
        desc += str(self.property_id.balconi and self.property_id.balconi or '')
        desc += ')'
        desc += '\n'
        desc += str(self.property_id.furnished and self.property_id.furnished or '')
        if self.property_id.furnished:
            desc +='Furnished'
        desc += ','
        desc+=str(self.property_id.total_project_area and self.property_id.total_project_area or '')
        self.name = desc
        self.price_unit = self.property_id.price
