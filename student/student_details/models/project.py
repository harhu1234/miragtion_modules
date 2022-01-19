from odoo import models,fields, api, _ 
from odoo.exceptions import ValidationError

class Project(models.Model):
    
    _name = 'project.info'

    
    name = fields.Char(string="Project Name")
    desc = fields.Char(string="Description")
    college_id = fields.Many2one("college.details",string="College", required="1")
    department_id = fields.Many2one("department.details",string="Department", required="1")
    dep_desc = fields.Char(string="Department Name", related='department_id.desc')
    sequence = fields.Integer("sequence")