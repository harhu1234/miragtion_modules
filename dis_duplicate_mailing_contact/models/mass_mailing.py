# -*- coding: utf-8 -*-

from odoo import models

class MassMailingContact(models.Model):

    _inherit = 'mailing.contact'

    _sql_constraints = [('mailing_email_uniqe', 'unique (email)', "Email already exists!")]
