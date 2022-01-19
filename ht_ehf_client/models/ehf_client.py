# -*- coding: utf-8 -*-

from odoo import models, fields


class ResPartnerInherit(models.Model):
    _inherit = "res.partner"

    ehf_client = fields.Boolean("EHF Client")


class AccountMoveInherit(models.Model):
    _inherit = "account.move"

    invoice_status = fields.Selection([('sent','Sent'),
                                       ('tobesend','To be send')],string="Status")
    is_ehf_customer = fields.Boolean("EHF Customer",related="partner_id.ehf_client")

    def action_sent_invoice_ehf(self):
        if self.is_ehf_customer:
            self.invoice_status = 'tobesend'