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

class Membership(models.Model):

    _name = "membership.membership"
    _inherit = "mail.thread"
    _description = "Membership"

    name = fields.Many2one('res.partner',string="Name")
    description = fields.Text(string="Description")
    type = fields.Selection([('bronze','Bronze'),('silver','Silver'),('gold','Gold'),('platinum','Platinum')])
    fees = fields.Float(string="Fees")
    discount = fields.Float(string="Discount")
    start_date = fields.Date(string="Start Date")
    end_date = fields.Date(string="End Date")
    total = fields.Float(string='Membership Total',compute='total_membership_disc')
    image = fields.Binary(string="Image")
    service_ids = fields.Many2many('service.service', 'membership_relation_service', 'membership_id', 'service_id',string="Services")
    service_count = fields.Integer(string='Service Count',compute="_compute_service_count")
    
    def action_count_service(self):
        return {
                'name': 'Services',
                'view_mode' : 'tree,form',
                'view_id'   : False,
                'res_model' : 'service.service',
                'type'      : 'ir.actions.act_window',
                'domain'   : [('id','in',self.service_ids.ids)]
            }


    @api.depends('service_ids')
    def _compute_service_count(self):
        self.service_count = len(self.service_ids)

    @api.depends('discount')
    def total_membership_disc(self):
        for member_total in self:
            member_total.total = member_total.fees - member_total.discount