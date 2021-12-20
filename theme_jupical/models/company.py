# -*- coding:utf-8 -*-

from odoo import models,api,fields

class Company(models.Model):

	_inherit = 'res.company'

	social_googleplus = fields.Char(string="Googleplus Account")