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

class PropertyManagement(models.Model):
    _name = 'property.mgmt'
    _rec_name = 'name'

    name = fields.Char(string="Property Name")
    p_image = fields.Binary('Property Image')
    address = fields.Text(string="Property Location")
    country_id = fields.Many2one('res.country', string='Country',required=True)
    country_code = fields.Char(related='country_id.code')
    email = fields.Char('Email')
    phone = fields.Char('Phone No.')
    state_id = fields.Many2one('res.country.state', string='State', domain="[('country_id', '=?', country_id)]")
    state_code = fields.Char(related='state_id.code')
    city = fields.Char('City', required=True)
    zip = fields.Char('ZIP', required=True)
    address2 = fields.Char('address2', required=True)
    address1 = fields.Char('address1', required=True)

    landlord_id = fields.Many2one('res.partner',string="Property Owner",domain=[('is_landlord','=',True)])
    layout_id = fields.Many2one('building.layout',string="Layout")
    facility = fields.Many2many('facility.services',string="Facility And Services")
    

    #property type
    property_type = fields.Selection([('com','Commercial Project'),('res','Residential Project')],string='Project Type')
    res_type = fields.Selection([('apart','Apartment'),('res_land','Residential Land'),('in_house','Independent House/Villa'),('farm','Farm House'),('other','Other')],string="Residential Type")
    com_type = fields.Selection([('industrial_land','Industrial Land/Plot'),('factory','Factory'),('ware','Warehouse'),('hotel','Hotel/Resorts'),('com_land','Commercial Land'),('retail','Retail Shop/Showroom'),('other','Other')],string="Commercial Type")
    # about = fields.Char('About',compute='compute_owner_name')
    desc = fields.Text('Description')
    other = fields.Char('Other')
    availablity = fields.Selection([('available','Available'),('sold','Sold'),('rented','Rented')],string="Available",default='available')
    availaible_for = fields.Selection([('sale','Available For Sale'),('rent','Available For Rent')],string="Available For")
    state = fields.Selection([('available','Available'),('sold','Sold'),('rented','Rented')],default='available',string='State')
    u_image = fields.Many2many('ir.attachment', string="Image")
    open_space = fields.Char('Open Space')

    #layout 
    carpet_area = fields.Char('Carpet Area')
    total_project_area = fields.Char('Total Project Area')
    rooms = fields.Char('Number of Rooms')
    balconi = fields.Char('Balconi')
    price = fields.Float('Property Price')
    plot = fields.Char('Plot Area')
    number_floors = fields.Char('Number Of Floors')
    tower = fields.Char('Tower')
    units = fields.Char('Units')
    furnished = fields.Selection([('semi','Semi Furnished'),('fully','Fully Furnished')],string="Furnished")
    #tenany agreement
    tenancy_ids = fields.One2many('tenancy.agreement','property_id',string="Tenancy")     

    @api.onchange('availablity')
    def onchanged_availability(self):

        for record in self:
           
            if record.availablity == 'sold':
                record.state = 'sold'
            elif record.availablity == 'rented':
                record.state = 'rented'
            else:
                record.state = 'available'


        


    # @api.depends('owner')
    # def compute_owner_name(self):

    #     own = ''
    #     own += str(self.owner) and str(self.owner.name) or False
    #     self.about = own

class FacilityAndServices(models.Model):

    _name = 'facility.services'
    _description = 'Facility And Services'
    _rec_name = 'name'

    name = fields.Char('Facility And service')


class BuildingLayout(models.Model):

    _name = 'building.layout'
    _description = 'Building Layout'

    name = fields.Char('Layouts')
