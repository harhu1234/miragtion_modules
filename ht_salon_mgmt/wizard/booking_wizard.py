# -*- coding: utf-8 -*-

from odoo import models, api, fields, _
from odoo.exceptions import UserError, ValidationError
import calendar
from datetime import date

class BookingWizard(models.TransientModel):

    _name = "booking.wizard"
    _description = "Booking Wizard"

    name = fields.Char(string="Name")
    appointment_by = fields.Selection([('day','Day'),('month','Month'),('date_range','Date Range')],string="Appointment By")
    appointment_day = fields.Date(string="Appointment Day")
    appointment_month = fields.Selection([('01','January'),('02','February'),('03','March'),('04','April'),('05','May'),
                                          ('06','June'),('07','July'),('08','August'),('09','September'),('10','October'),('11','November'),('12','December')],string=" Appointment Month")
    start_date = fields.Date(string="Start Date")
    end_date = fields.Date(string="End Date")


    def booking_report(self):
        if self.appointment_month:
            start_date = str(date.today().year) + '-' + self.appointment_month + '-01'
            end_date = str(date.today().year) + '-' + self.appointment_month + '-' + str(calendar.monthrange(date.today().year, int(self.appointment_month))[1])
            appointments = self.env['customer.appointment'].search([('schedue_time','>=',start_date),('schedue_time','<=',end_date)])
            if not appointments:
                raise ValidationError(_("We Don't have Any Booking Appointment on this Month"))
            self.ensure_one()
            data = {'appointment_ids': appointments.ids}
            datas = {
                'ids': appointments.ids,
                'model': 'customer.appointment',
                'form': data
            }
            return self.env.ref('ht_salon_mgmt.action_booking_report').report_action(appointments, data=datas)

        if self.start_date and self.end_date:
            appointments = self.env['customer.appointment'].search([('schedue_time','>=',self.start_date),('schedue_time','<=',self.end_date)])
            if not appointments:
                raise ValidationError(_("We Don't have Any Booking Appointment on this Date Range"))
            self.ensure_one()
            data = {'appointment_ids': appointments.ids}
            datas = {
                'ids': appointments.ids,
                'model': 'customer.appointment',
                'form': data
            }
            return self.env.ref('ht_salon_mgmt.action_booking_report').report_action(appointments, data=datas)

        if self.appointment_day:
            appointments = self.env['customer.appointment'].search([('schedue_time','=',self.appointment_day)])
            if not appointments:
                raise ValidationError(_("We Don't have Any Booking Appointment on this Date"))
            self.ensure_one()
            data = {'appointment_ids': appointments.ids}
            datas = {
                'ids': appointments.ids,
                'model': 'customer.appointment',
                'form': data
            }
            return self.env.ref('ht_salon_mgmt.action_booking_report').report_action(appointments, data = datas)