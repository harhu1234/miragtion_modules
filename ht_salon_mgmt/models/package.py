# -*- coding: utf-8 -*-
##############################################################################
#
#    Jupical Technologies Pvt. Ltd.
#    Copyright (C) 2018-TODAY Jupical Technologies(<http://www.jupical.com>).
#    Author: Jupical Technologies Pvt. Ltd.(<http://www.jupical.com>)
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

from odoo import models,fields,api,_

class Package(models.Model):

    _name = "pacakge.package"
    _inherit = "mail.thread"
    _description = "Package"

    name = fields.Char(string="Name")
    description = fields.Text(string="Description")
    discount = fields.Float(string="Discount")
    line_ids = fields.One2many('pacakge.services','package_id',string="Services")
    regular_price = fields.Float(string="Regular Price",compute='_total_service_price')
    package_price = fields.Float(string="Prackage Price")
    package_type = fields.Selection([('silver','Silver'),('gold','Gold'),('dimond','Dimond'),('platanium','Platanium')],string="Type")

    @api.constrains('discount')
    def total_package_price(self):
        self.package_price = self.regular_price - self.discount

    @api.depends('line_ids')
    def _total_service_price(self):
        for service_rec in self:
            price_list = []
            count = 0
            for price_line in service_rec.line_ids:
                count += 1
                price_list.append(price_line.price)
            service_rec.regular_price = sum(price_list)

class PackageServices(models.Model):

    _name = "pacakge.services"
    _description = "Package Service"
    _rec_name = "package_id"

    package_id = fields.Many2one('pacakge.package',string="Package")
    service_id = fields.Many2one('service.service',string="Service")
    name = fields.Char(related='service_id.name',string="Name")
    description = fields.Text(related='service_id.description',string="Description")
    price = fields.Float(related='service_id.price',string="Price")
