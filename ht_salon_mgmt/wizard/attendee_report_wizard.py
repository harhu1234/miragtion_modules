# -*- coding: utf-8 -*-

from odoo import models,fields,api,_
from odoo.exceptions import UserError, ValidationError
import calendar
from datetime import date

class AttendeeReport(models.TransientModel):

    _name = 'attendee.report.wizard'
    _description = 'Attendee Report'

    name = fields.Char(string="Name")
    attendee_by = fields.Selection([('day', 'Day'), ('month', 'Month'), ('date_range', 'Date Range')],
                                      string="Attendee By")
    attendee_day = fields.Date(string="Attendee Day")
    attendee_month = fields.Selection(
        [('01', 'January'), ('02', 'February'), ('03', 'March'), ('04', 'April'), ('05', 'May'),
         ('06', 'June'), ('07', 'July'), ('08', 'August'), ('09', 'September'), ('10', 'October'), ('11', 'November'),
         ('12', 'December')], string="Attendee Month")
    start_date = fields.Date(string="Start Date")
    end_date = fields.Date(string="End Date")

    def attendee_report_object(self):
        if self.attendee_day:
            appointments = self.env['customer.appointment'].search([('schedue_time', '=', self.attendee_day)])
            if not appointments:
                raise ValidationError(_("We Don't have Any Booking Appointment on this Date"))
            self.ensure_one()
            datas = {
                'ids': appointments.ids,
                'model': 'customer.appointment',
            }
            return self.env.ref('ht_salon_mgmt.action_attendee_report').report_action(appointments, data=datas)

        if self.attendee_month:
            start_date = str(date.today().year) + '-' + self.attendee_month + '-01'
            end_date = str(date.today().year) + '-' + self.attendee_month + '-' + str(calendar.monthrange(date.today().year, int(self.attendee_month))[1])
            appointments = self.env['customer.appointment'].search([('schedue_time','>=',start_date),('schedue_time','<=',end_date)])
            if not appointments:
                raise ValidationError(_("We Don't have Any Booking Appointment on this Month"))
            self.ensure_one()
            datas = {
                'ids': appointments.ids,
                'model': 'customer.appointment',
            }
            return self.env.ref('ht_salon_mgmt.action_attendee_report').report_action(appointments, data=datas)

        if self.start_date and self.end_date:
            appointments = self.env['customer.appointment'].search([('schedue_time','>=',self.start_date),('schedue_time','<=',self.end_date)])
            if not appointments:
                raise ValidationError(_("We Don't have Any Booking Appointment on this Date Range"))
            self.ensure_one()
            datas = {
                'ids': appointments.ids,
                'model': 'customer.appointment',
            }
            return self.env.ref('ht_salon_mgmt.action_attendee_report').report_action(appointments, data=datas)
