from odoo import api, fields, models

class Tags(models.Model):

    _name = "klachten.tag"
    _description = "Tags of case"

    name = fields.Char('Tag Name', required=True, translate=True)