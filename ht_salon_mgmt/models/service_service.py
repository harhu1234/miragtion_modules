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

from odoo import models,fields, api, _

class Service(models.Model):
    _name = "service.service"
    _inherit = "mail.thread"
    _description = "Service Service"

    name = fields.Char(string="Name")
    service_to = fields.Selection([('men','Men'),('women','Women')],string="Gender")
    description = fields.Text(string="Description")
    product_id = fields.Many2one('product.template',string="Product")
    price = fields.Float(string="Price")
    image = fields.Binary(string="Image")
    offer_id = fields.Many2one('offer.service',string='Offers')
    category = fields.Selection([('skin','skin'),('hair','Hair'),('makeup','makeup'),('handfeet','Hands & Feet')],string="Category")

class salonProduct(models.Model):

    _inherit = "product.template"

    salon_product = fields.Boolean(string="salon Product")

