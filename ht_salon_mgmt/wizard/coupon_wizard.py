# -*- coding: utf-8 -*-

from odoo import models,fields,api,_
from odoo.exceptions import UserError, ValidationError
import calendar
from datetime import date

class CouponWizard(models.TransientModel):

    _name = 'coupon.wizard'
    _description = 'Coupon Wizard'

    name = fields.Char(string='Name')
    coupon_sel = fields.Selection([('list_coupon','All Coupon'),('discount_coupon','Discount Coupon')],string="Coupons")
    coupon_discount = fields.Selection([('day','Day'),('month','Month'),('date_range','Date Range')],string="Coupon Discount")
    coupon_day = fields.Date(string='Date')
    coupon_month = fields.Selection([('01', 'January'), ('02', 'February'), ('03', 'March'), ('04', 'April'), ('05', 'May'),
                                          ('06', 'June'), ('07', 'July'), ('08', 'August'), ('09', 'September'), ('10', 'October'), ('11', 'November'),
                                          ('12', 'December')], string="Appointment Month")
    start_date = fields.Date(string="Start Date")
    end_date = fields.Date(string="End Date")


    def coupon_service_report(self):
        if self.coupon_sel == 'list_coupon':
            coupons = self.env['coupon.code'].search([])
            datas = {
                'ids': coupons.ids,
                'model': 'coupon.code',
            }
            return self.env.ref('ht_salon_mgmt.action_coupon_report').report_action(coupons, data=datas)
        elif self.coupon_sel == 'discount_coupon':
            if self.coupon_day:
                coupons = self.env['coupon.code'].search([])
                customers = []
                for coupon in coupons:
                    customer = self.env['customer.appointment'].search([('schedue_time','=',self.coupon_day),('services_ids.coupon_code','=',coupon.name)])
                    customers.append(customer.id)
                customer_ids = list(set(customers))
                if customer_ids[0] == False:
                    raise ValidationError(_("We Don't have Any Coupon Discount on this Date."))
                datas = {
                    'ids': coupons.ids,
                    'model': 'coupon.code',
                    'customers':customer_ids,
                }
                return self.env.ref('ht_salon_mgmt.action_coupon_service_report').report_action(coupons, data=datas)
            elif self.coupon_month:
                coupons = self.env['coupon.code'].search([])
                start_date = str(date.today().year) + '-' + self.coupon_month + '-01'
                end_date = str(date.today().year) + '-' + self.coupon_month + '-' + str(calendar.monthrange(date.today().year, int(self.coupon_month))[1])
                customers = []
                for coupon in coupons:
                    customer = self.env['customer.appointment'].search([('schedue_time','>=',start_date),('schedue_time','<=',end_date),('services_ids.coupon_code','=',coupon.name)])
                    for cust in customer:
                        customers.append(cust.id)
                customer_ids = list(set(customers))
                if not customer_ids:
                    raise ValidationError(_("We Don't have Any Coupon Discount on this Month."))
                datas = {
                    'ids':coupons.ids,
                    'model':'coupon.code',
                    'customers':customer_ids,
                }
                return self.env.ref('ht_salon_mgmt.action_coupon_service_report').report_action(coupons, data=datas)
            elif self.start_date and self.end_date:
                coupons = self.env['coupon.code'].search([])
                customers = []
                for coupon in coupons:
                    customer = self.env['customer.appointment'].search([('schedue_time','>=',self.start_date),('schedue_time','<=',self.end_date),('services_ids.coupon_code','=',coupon.name)])
                    for cust in customer:
                        customers.append(cust.id)
                customer_ids = list(set(customers))
                if not customer_ids:
                    raise ValidationError(_("We Don't have Any Coupon Discount on this Date Range."))
                datas = {
                    'ids': coupons.ids,
                    'model': 'coupon.code',
                    'customers': customer_ids,
                }
                return self.env.ref('ht_salon_mgmt.action_coupon_service_report').report_action(coupons, data=datas)

