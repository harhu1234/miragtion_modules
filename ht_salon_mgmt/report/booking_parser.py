# -*- coding: utf-8 -*-

from odoo import api, fields, models, _

class Bookingsummary(models.AbstractModel):

    _name = 'report.ht_salon_mgmt.report_booking_appointment'
    _description = 'Booking summary'

    @api.model
    def _get_report_values(self, docids, data=None):
        return {
            'doc_ids': data.get('form').get('appointment_ids'),
            'doc_model': 'customer.appointment',
            'docs': self.env['customer.appointment'].browse(data.get('form').get('appointment_ids')),
        }

class SelectAttendeesummary(models.AbstractModel):

    _name = 'report.ht_salon_mgmt.report_select_attendee'
    _description = 'Attendee Summary'

    @api.model
    def _get_report_values(self,docids,data=None):
        return {
            'doc_ids': data.get('ids'),
            'doc_model': 'customer.appointment',
            'docs': self.env['customer.appointment'].browse(data.get('ids')),
        }

class Attendeesummary(models.AbstractModel):

    _name = 'report.ht_salon_mgmt.report_attendee'
    _description = 'Attendee'

    @api.model
    def _get_report_values(self,docids,data=None):
        return {
            'doc_ids': data.get('ids'),
            'doc_model': 'customer.appointment',
            'docs': self.env['customer.appointment'].browse(data.get('ids')),
        }

class Servicesummary(models.AbstractModel):

    _name = 'report.ht_salon_mgmt.report_service'
    _description = 'Services'

    @api.model
    def _get_report_values(self,docids,data=None):
        return {
            'doc_ids': data.get('ids'),
            'doc_model':'service.service',
            'docs':self.env['service.service'].browse(data.get('ids')),
        }

class PackageSummary(models.AbstractModel):

    _name = 'report.ht_salon_mgmt.report_package'
    _description = 'Packages'

    @api.model
    def _get_report_values(self,docids,data=None):
        return {
            'doc_ids': data.get('ids'),
            'doc_model':'pacakge.package',
            'docs':self.env['pacakge.package'].browse(data.get('ids')),
        }

class OfferSummary(models.AbstractModel):

    _name = 'report.ht_salon_mgmt.report_offer'
    _description = 'Offers'

    @api.model
    def _get_report_values(self,docids,data=None):
        return {
            'doc_ids': data.get('ids'),
            'doc_model': 'offer.service',
            'docs': self.env['offer.service'].browse(data.get('ids')),
        }

class OfferDiscount(models.AbstractModel):

    _name = 'report.ht_salon_mgmt.report_offer_discount'
    _description = 'Offers Discount'

    @api.model
    def _get_report_values(self, docids, data=None):
        return {
            'doc_ids': data.get('ids'),
            'doc_model': 'offer.service',
            'docs': self.env['offer.service'].browse(data.get('ids')),
            'customers': self.env['customer.appointment'].browse(data.get('customers'))
            }

class Coupon(models.AbstractModel):

    _name = 'report.ht_salon_mgmt.report_coupon'
    _description = 'Coupon'

    @api.model
    def _get_report_values(self, docids,data=None):
        return {
            'doc_ids': data.get('ids'),
            'doc_model': 'coupon.code',
            'docs': self.env['coupon.code'].browse(data.get('ids')),
        }

class CouponServices(models.AbstractModel):

    _name = 'report.ht_salon_mgmt.report_coupon_service'
    _description = 'Coupon Services'

    @api.model
    def _get_report_values(self,docids,data=None):
        return {
            'doc_ids':data.get('ids'),
            'doc_model':'coupon.code',
            'docs': self.env['coupon.code'].browse(data.get('ids')),
            'customers': self.env['customer.appointment'].browse(data.get('customers'))
        }