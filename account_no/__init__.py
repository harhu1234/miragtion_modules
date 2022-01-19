# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from . import models

from .models.account_journal import sanitize_communication
from odoo import api, SUPERUSER_ID
from odoo.exceptions import Warning

def init_initiating_party_names(cr, registry):
    """ Sets the company name as the default value for the initiating
    party name on all existing companies once the module is installed. """
    env = api.Environment(cr, SUPERUSER_ID, {})
    for company in env['res.company'].search([]):
        company.norway_initiating_party_name = sanitize_communication(company.name)

def pre_init_check(cr):
    env = api.Environment(cr, SUPERUSER_ID, {})
    for module in env['ir.module.module'].search([]):
        if module.name == 'account_sepa' and module.state == 'installed':
            raise Warning('First Uninstall Account SEPA Module')