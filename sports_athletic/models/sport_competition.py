# -*- coding: utf-8 -*-

from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
from datetime import datetime


# origin


class SportsOrigine(models.Model):
    _name = "sports.origine"
    _description = "sports origine"

    name = fields.Char(string='Designation')
    description = fields.Text(string='Description')

# event


class SportsEvent(models.Model):
    _name = "sports.event"
    _description = "sports event"

    name = fields.Char(string='Designation')
    description = fields.Text(string='Description')
    start_date = fields.Date(string='Date debut')
    end_date = fields.Date(string='Date fin')

    @api.onchange('start_date','end_date')
    def date_change(self):
        if self.end_date and self.start_date:
            if self.end_date < self.start_date:
                raise ValidationError(_('please Enter valide Date fin'))


class SportsCategory_poids_garcons(models.Model):

    _name = "sports.category.poids.garcons"
    _description = "sports poids garcons"

    name = fields.Char(string="Categorie de poids Garcons")

class SportsCategory_poids_filles(models.Model):

    _name = "sports.category.poids.filles"
    _description = "sports poids filles"

    name = fields.Char(string="Categorie de poids Filles")
