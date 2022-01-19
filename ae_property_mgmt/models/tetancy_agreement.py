# -*- coding: utf-8 -*-
##############################################################################
#
#    AtharvERP Business Solutions
#    Copyright (C) 2020-TODAY AtharvERP Business Solutions(<http://www.atharverp.com>).
#    Author: AtharvERP Business Solutions(<http://www.atharverp.com>)
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
from odoo import _, api, fields, models

class Tenancy_agreement(models.Model):
    _name = "tenancy.agreement"
    _description = 'Tenancy Agreement'
    _rec_name = 'folio'

    folio = fields.Char('Agreement Number')
    landlord_id = fields.Many2one('res.partner','Landlord',domain=[
                              ('is_landlord', '=', True)])
    apply_pricelist = fields.Boolean(
        string="Apply Pricelist",
        help="Indicates if agency pricelist is applied to his reservations",
    )
    tenant_id = fields.Many2one('res.partner','Tenant',domain=[
                              ('is_tentant', '=', True)])
    deposite = fields.Float('Deposite')
    property_id = fields.Many2one('property.mgmt', string='Property')
    tenancy_start_date = fields.Date('Agreement Start Date')
    agreement_date = fields.Date('Agreement Date')
    tenancy_end_date = fields.Date('Agreement End Date')
    paid_day = fields.Date('Payment day')
    landlord_payment_day = fields.Date('Landlord Payment Day')
    rent = fields.Float('Rent')
    move_ids = fields.One2many(
        'account.move', 'agreement_id', string="Invoices")


# class tenancyinstallment(models.Model):
#     _name = "installment"
#     _description = 'installment'

#     name = fields.Char('Installment',copy=False, default=lambda self: self.env['ir.sequence'].next_by_code('create.payment.wizard'))
#     payment = fields.Float('Payment')
#     payment_date = fields.Date('Payment Date')
#     agreement_id = fields.Many2one('tenancy.agreement',string='tenancy agreement')


