from odoo import models,fields, api, _ 
from odoo.exceptions import ValidationError

class College(models.Model):

    _name = 'college.details'

    name = fields.Char(string="College Name")
    desc = fields.Char(string="Description")
    address = fields.Char(string="Address")
    clg_code =fields.Char(string="College Code")
    department_ids = fields.One2many("department.details","college_id",string="Department Name")
    city = fields.Char(string="City" ,defualt="Rajkot")
    state = fields.Char(string="State")
    contry = fields.Char(string="Contry")


    @api.model
    def create(self, vals):
        res = super(College,self).create(vals)
        res.clg_code = self.env['ir.sequence'].next_by_code('clg.seq')
        return res
