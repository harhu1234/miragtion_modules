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
#    but WITHOUT ANY WARRANTY; with
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU LESSER GENERAL PUBLIC LICENSE (LGPL v3) for more details.
#
#    You should have received a copy of the GNU LESSER GENERAL PUBLIC LICENSE
#    GENERAL PUBLIC LICENSE (LGPL v3) along with this program.
#    If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

from odoo import models,fields, api, _
from odoo.exceptions import UserError, ValidationError
from datetime import date

class CustomerAppointment(models.Model):

    _name = "customer.appointment"
    _inherit = "mail.thread"
    _description = "Customer Appointment"
    _rec_name = "customer_id"

    customer_id = fields.Many2one('res.partner',string="Customer")
    cust_img = fields.Binary(related="customer_id.image_1920",string="Customer Image")
    schedue_time = fields.Date(string="Appointment Date",default=date.today(),tracking=True)
    customer_type =fields.Selection([('regular','Regular'),('bride','Bride'),('groom','Grooms')],string="Customer Type")
    attendee_id = fields.Many2one('res.users',string="Attendee")
    state = fields.Selection([('draft','New'),('confirm','Confirm'), ('progress','In Progress') , ('done','Done'),('cancel','Cancelled')]
                             ,default='draft',string="Status")
    amount = fields.Float(string="Amount",compute='_total_service_amount')
    services_ids = fields.One2many('customer.service','appointment_id',string="Services")
    floor_no = fields.Selection([('1','1'),('2','2'),('3','3'),('4','4'),('5','5')],string="Floor No")
    seat_no = fields.Integer(string="Seat No")
    count_service = fields.Integer(string="Count",compute="count_services")

    def action_send_mail(self):
        mail_template = self.env.ref('ht_salon_mgmt.template_appointment_email')
        mail_template.send_mail(self.id,force_send=True)

    def action_followup_mail(self):
        mail_template = self.env.ref('ht_salon_mgmt.template_followup_email')
        mail_template.send_mail(self.id,force_send=True)

    #generate Report of Appointment
    def generate_appoinment(self):
        return self.env.ref('ht_salon_mgmt.report_appointment_info').report_action(self)

    @api.depends('services_ids')
    def count_services(self):
        self.count_service = len(self.services_ids)
        
    #check wrong date validation in appointment
    @api.onchange('schedue_time')
    def date_check(self):
        if self.schedue_time < date.today():
            raise ValidationError(_('Enter Valide Date'))

    #total amount to calculate in appointment
    @api.depends('services_ids')
    def _total_service_amount(self):
        membership_id = self.env['membership.membership'].search([('name.id','=',self.customer_id.id)])
        for total_rec in self:
            price_list = 0
            for service in total_rec.services_ids:
                price_list += service.sum
            if membership_id and total_rec.schedue_time >= membership_id.start_date and total_rec.schedue_time <= membership_id.end_date:
                mbr_src_price = 0
                for src_price in membership_id.service_ids:
                    mbr_src_price += src_price.price
                total_rec.amount = price_list - mbr_src_price
            else:
                total_rec.amount = price_list

class CouponCode(models.Model):

    _name = "coupon.code"
    _inherit = "mail.thread"
    _description = "Coupon Code"

    name = fields.Char(string="Code")
    description = fields.Text(string="Description")
    discount_type = fields.Selection([('fixed','Fixed'),('percentage','Percentage')],string="Type")
    discount_value = fields.Float(string="Discount")

    #check vlidation of numeric code
    @api.constrains('name')
    def check_code_name(self):
        if len(self.name) > 6:
            raise ValidationError(_('Enter Code Number of characters must 6'))

class CustomerService(models.Model):

    _name = "customer.service"
    _description = "Customer Service"

    appointment_id = fields.Many2one('customer.appointment',string="Appointment")
    services_id = fields.Many2one('service.service',string="Service")
    product_id = fields.Many2one(related='services_id.product_id',string="Product")
    description = fields.Text(related='services_id.description',string="Description")
    coupon_code = fields.Char(string="Code")
    price = fields.Float(related="services_id.price",string="Price")
    offer_price = fields.Float(string="Offer Price")
    sum = fields.Float(string="Total",compute="total_member_price")
    service_type = fields.Selection([('regular','Regular'),('package','Package')],string="Type")
    package_id = fields.Many2one('pacakge.package',string="Package")
    package_desc = fields.Text(related='package_id.description',string='Package Description')

    #Reguler price apply to total of service price
    @api.onchange('service_type')
    def _reguler_service_price(self):
        for record in self:
            if record.service_type == 'regular':
                record.sum = record.price

    #Package price apply to total of service price
    @api.onchange('package_id')
    def package_total_sum(self):
        if self.service_type == 'package':
            self.sum = self.package_id.package_price
            
    #coupon code not exits then raise error
    @api.constrains('coupon_code')
    def check_coupon_code(self):
        for record in self:
            if record.coupon_code:
                service_code = self.env['customer.service'].search([('coupon_code', '=', record.coupon_code), ('id', '!=', record.id)])
                if service_code:
                    raise ValidationError(_('This Coupon code is already Exists.'))
                coupon_obj = self.env['coupon.code'].search([('name', '=', record.coupon_code)])
                if not coupon_obj:
                    raise ValidationError(_('Enter Valide Coupon Code.'))

    #check package validation
    @api.constrains('package_id')
    def check_package(self):
        for record in self:
            if record.service_type == 'package':
                if not record.package_id:
                    raise ValidationError(_('Please Enter Your Package'))

    # coupon code to change total price
    @api.depends('coupon_code','services_id')
    def total_member_price(self):
        for record in self:
            offer_id = self.env['offer.service'].search([('start_date', '<=', record.appointment_id.schedue_time),
                                                         ('end_date', '>=', record.appointment_id.schedue_time)],limit=1)
            offer_amount = 0
            coupon_amout = 0
            line_amount = record.price
            ofr_service = []
            for offer_service in offer_id.service_ids:
                ofr_service.append(offer_service.id)
            for src_id in record.services_id:
                if src_id.id in ofr_service:
                    if offer_id.type == 'fixed':
                        record.offer_price = offer_id.offer_price
                        offer_amount = record.offer_price
                    elif offer_id.type == 'percentage':
                        record.offer_price = offer_id.offer_price
                        offer_amount = (record.offer_price * record.price) / 100

            if record.coupon_code:
                coupon_ids = self.env['coupon.code'].search([('name', '=', record.coupon_code)])
                if not coupon_ids:
                    raise ValidationError(_('Enter Valide Coupon Code'))
                for line in coupon_ids:
                    if line.discount_type == 'fixed':
                        coupon_amout = line.discount_value
                    elif line.discount_type == 'percentage':
                        coupon_amout = (line.discount_value * record.price)/100
            
            # if offer_amount:
            #     line_amount -=  offer_amount
            # if coupon_amout:
            #     line_amount -= coupon_amout

            if offer_amount >= coupon_amout:
                line_amount -=  offer_amount
            else:
                line_amount -= coupon_amout
                record.offer_price = 0

            if line_amount and line_amount < 0:
                raise ValidationError(_('Your Coupon Amount is Grater of Price Amount'))
            record.sum = line_amount

