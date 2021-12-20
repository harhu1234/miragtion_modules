# -*- coding: utf-8 -*-

from odoo import models,fields,api,_
from odoo.exceptions import UserError, ValidationError
import calendar
from datetime import date

class SelectAttendee(models.TransientModel):

    _name = "select.attendee.wizard"
    _description = "Select Attendee"

    name = fields.Char('Name')
    attendee_id = fields.Many2one('res.users',string="Attendee")
    appointment_by = fields.Selection([('day', 'Day'), ('month', 'Month'), ('date_range', 'Date Range')],
                                      string="Appointment By")
    appointment_day = fields.Date(string="Appointment Day")
    appointment_month = fields.Selection(
        [('01', 'January'), ('02', 'February'), ('03', 'March'), ('04', 'April'), ('05', 'May'),
         ('06', 'June'), ('07', 'July'), ('08', 'August'), ('09', 'September'), ('10', 'October'), ('11', 'November'),
         ('12', 'December')], string="Appointment Month")
    start_date = fields.Date(string="Start Date")
    end_date = fields.Date(string="End Date")

    def select_attendee_report(self):
        if self.appointment_month and self.attendee_id:
            start_date = str(date.today().year) + '-' + self.appointment_month + '-01'
            end_date = str(date.today().year) + '-' + self.appointment_month + '-' + str(calendar.monthrange(date.today().year, int(self.appointment_month))[1])
            appointments = self.env['customer.appointment'].search([('schedue_time','>=',start_date),('schedue_time','<=',end_date),('attendee_id','=',self.attendee_id.id)])
            if not appointments:
                raise ValidationError(_("We Don't have Any Select Attendee Appointment on this Month"))
            self.ensure_one()
            datas = {
                'ids': appointments.ids,
                'model': 'customer.appointment',
            }
            return self.env.ref('ht_salon_mgmt.action_select_attendee_report').report_action(appointments, data=datas)

        if self.start_date and self.end_date and self.attendee_id:
            appointments = self.env['customer.appointment'].search([('attendee_id','=',self.attendee_id.id),('schedue_time','>=',self.start_date),('schedue_time','<=',self.end_date)])
            if not appointments:
                raise ValidationError(_("We Don't have Any Select Attendee Appointment on this Date Range"))
            self.ensure_one()
            datas = {
                'ids': appointments.ids,
                'model': 'customer.appointment',
            }
            return self.env.ref('ht_salon_mgmt.action_select_attendee_report').report_action(appointments, data=datas)

        if self.appointment_day and self.attendee_id:
            appointments = self.env['customer.appointment'].search([('attendee_id','=',self.attendee_id.id),('schedue_time', '=', self.appointment_day)])
            if not appointments:
                raise ValidationError(_("We Don't have Any Select Attendee Appointment on this Date"))
            self.ensure_one()
            datas = {
                'ids': appointments.ids,
                'model': 'customer.appointment',
            }
            return self.env.ref('ht_salon_mgmt.action_select_attendee_report').report_action(appointments, data=datas)