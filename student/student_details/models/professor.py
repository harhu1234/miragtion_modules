from odoo import models,fields, api, _ 
from odoo.exceptions import ValidationError
import re
from datetime import datetime

class Professor(models.Model):
    
    _name = 'professor.details'
    
    name = fields.Char(string="First Name")
    department_id = fields.Many2one("department.details",string="Department")
    college_id = fields.Many2one("college.details",string="College", required="1")
    # project_id     = fields.Many2one("project.info",string="Project")
    mname = fields.Char(string="Middel Name")
    lname = fields.Char(string="Last Name")
    email = fields.Char(string="E-Mail",default="hello@gmail.com")

    brith_date = fields.Date(string="Birth Date")
    contact = fields.Char(string="Mobile No")

    hometown = fields.Char(string="Home Town")
    state = fields.Char(string="State")
    contry = fields.Char(string="Contry")
    age = fields.Integer(string="Age")
    gender = fields.Selection([('male','Male'),
                                ('female','Female')], string="Gender")


    _sql_constraints = [
        ('name_uniq', 'unique (name)', "Professor Name already exist...!"),
        ('email_uniq', 'unique (email)', "The Email must be unique...!"),
    ]
        
    # @api.model
    # def create(self, vals):
    #     res = super(Student,self).create(vals)
    #     res.student_code = self.env['ir.sequence'].next_by_code('stud.seq')
    #     return res
        

    @api.model 
    def default_get(self,field_list=[]):
        rtn = super(Professor,self).default_get(field_list)
        rtn['email'] = "hoe@gmail.com"
        return rtn

    @api.constrains('name')
    def valid_name(self):
        if self.name:
            if str(self.name).isnumeric():
                raise ValidationError("Enter String Value Name")


    @api.constrains('email')   
    def _validate_email(self):
        self.email.replace(" ","")        
        if not re.match(r"[^@]+@[^@]+\.[^@]+", self.email):
            raise ValidationError("Please enter valid email address: %s" % self.email)

    @api.onchange('age')
    def change_age(self):
        if self.age:
            if self.age < 5:
                raise ValidationError(_("Student age cannot be less than 5"))


    @api.constrains('age')
    def check_age(self):
        if self.age > 60:
            raise ValidationError(_("Student should not be more than 60 years of Age"))
        elif self.age == 0:
            raise ValidationError(_("Enter valide Age"))