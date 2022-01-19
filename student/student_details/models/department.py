from odoo import models,fields, api, _ 
from odoo.exceptions import ValidationError

class Department(models.Model):
    
    _name = 'department.details'
    
    name = fields.Char(string="Department Name")
    desc = fields.Char(string="Description")
    college_id = fields.Many2one("college.details",string="College", required="1") 
    # department_id = fields.Many2one("college.details",string="Department Name")
    project_ids = fields.One2many("project.info","department_id",string="project Name")

    def name_get(self):
        dpt = []
        for dep in self:
            name = dep.name
            if dep.desc:
                name += "({})".format(dep.desc)
                dpt.append((dep.id,name))
        return dpt


            