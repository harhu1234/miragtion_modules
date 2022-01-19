# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models, tools, SUPERUSER_ID, _


class Partner(models.Model):
    _inherit = "res.partner"

    date_of_birth = fields.Date(index=True)
    customer = fields.Boolean(string='Is a Customer', default=False,
                               help="Check this box if this contact is a customer.")