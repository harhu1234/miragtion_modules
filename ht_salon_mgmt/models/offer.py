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

from odoo import fields, models, api, _
from odoo.exceptions import ValidationError
from datetime import datetime

class OfferService(models.Model):

    _name = 'offer.service'
    _inherit = 'mail.thread'
    _description = 'Offer Service'

    name = fields.Char(string="Name")
    image = fields.Binary(string="offer Image")
    start_date = fields.Date(string="Start Date")
    end_date = fields.Date(string="End Date")
    state = fields.Selection([('draft','Draft'),('in_progess','In Progess'),('close','Close')],string="Status",default='draft')
    service_price = fields.Float(string="Service Price")
    offer_price = fields.Float(string="Offer Price")
    type = fields.Selection([('fixed','Fixed'),('percentage','Percentage')],string="Type")
    service_count = fields.Integer(string='Service Count',compute="_compute_service_count")
    service_ids = fields.Many2many('service.service','offer_relation_service','offer_id','service_id',string="Services")

    @api.depends('service_ids')
    def _compute_service_count(self):
        self.service_count = len(self.service_ids)

    @api.onchange('service_ids')
    def _total_price_service(self):
        price_list = []
        for record in self.service_ids:
            price_list.append(record.price)
        if price_list:
            self.service_price = sum(price_list)
        else:
            self.service_price = 0

    def send_offer_email(self):
        customer_rec = self.env['customer.appointment'].search([])
        for customer in customer_rec:
            mail_template = customer.env.ref('ht_salon_mgmt.template_offers_email')
            mail_template.send_mail(customer.id, force_send=True)

    def cron_offer_state(self):
        offer_data = self.env['offer.service'].search([('end_date','=',datetime.today())])
        for ofr in offer_data:
            ofr.state = 'close'

    def action_count_service(self):
        return {
                'name':'Services',
                'view_mode' : 'tree,form',
                'view_id' : False,
                'res_model' : 'service.service',
                'type'      : 'ir.actions.act_window',
                'domain' : [('id','in',self.service_ids.ids)]
                }


