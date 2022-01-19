# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models,api,_
from odoo.exceptions import Warning


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    norway_orgid_id = fields.Char(related='company_id.norway_orgid_id', string="Identification", readonly=False,
        help="Identification assigned by an institution (eg. VAT number).")
    norway_orgid_issr = fields.Char(related='company_id.norway_orgid_issr', string="Issuer", readonly=False,
        help="Will appear in Norway payments as the name of the party initiating the payment. Limited to 70 characters.")
    norway_initiating_party_name = fields.Char(related='company_id.norway_initiating_party_name', string="Your Company Name", help="Name of the Creditor Reference Party. Usage Rule: Limited to 70 characters in length.", readonly=False)
    norway_pain_version = fields.Selection(related='company_id.norway_pain_version', string="Norway Pain Version", readonly=False,
                            help='Norway may be a generic format, some countries differ from the Norway recommandations made by the NPC (Norway Payment Councile) and thus the XML created need some tweakenings.')
    module_account_no = fields.Boolean(string='Norway Credit Transfer (NCT)')


    @api.onchange('module_account_sepa')
    def checker_sepa(self):
        if self.module_account_sepa:
            for module in self.env['ir.module.module'].search([]):
                if module.name == 'account_no' and module.state == 'installed':
                    raise Warning('First Uninstall Account No Module')


