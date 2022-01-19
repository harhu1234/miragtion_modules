from odoo import models,fields, api, _ 
from odoo.exceptions import ValidationError
import re
from datetime import datetime

class Student(models.Model):
    
    _name = 'student.details'
    
    name = fields.Char(string="First Name")
    department_id = fields.Many2one("department.details",string="Department")
    college_id = fields.Many2one("college.details",string="College", required="1")
    # project_id     = fields.Many2one("project.info",string="Project")
    mname = fields.Char(string="Middel Name")
    lname = fields.Char(string="Last Name")
    email = fields.Char(string="E-Mail",default="hello@gmail.com")

    document = fields.Binary(string="Documents")
    document_name = fields.Char(string="File Name")

    student_img = fields.Image(string="Upload Student Image",max_height=100,max_width=100,help="This is student Image",required=True)
    # std = fields.Selection([('1','1'),('2','2'),('3','3'),('4','4'),('5','5'),('6','6'),('7','7'),
    #                         ('8','8'),('9','9'),('10','10'),('11','11'),('12','12')],string="Standard")
    semester = fields.Selection([('1','1'),('2','2'),('3','3'),('4','4'),('5','5'),('6','6')],string="Semester")
    brith_date = fields.Date(string="Birth Date")
    contact = fields.Char(string="Mobile No")
    # city = fields.Selection([('rajkot','Rajkot'),('jamnagar','Jamnagar'),('porbandar','Porbandar')],string="Home Town")
    hometown = fields.Char(string="Home Town")
    # state = fields.Selection([('gujrat','Gujrat')],string="State")
    state1 = fields.Char(string="State")
    # contry = fields.Selection([('india','India')],string="Contry")
    contry1 = fields.Char(string="Contry")
    age = fields.Integer(string="Age")
    gender = fields.Selection([('male','Male'),
                                ('female','Female')], string="Gender")
    education = fields.Selection([('be','Bachelor of Engineering'),
                                        ('diploma','Diploma')],string="Education Level")
    student_code = fields.Char(string="Student Code")
    # barcode = fields.Char(String="Barcode")


    _sql_constraints = [
        ('name_uniq', 'unique (name,email)', "Student Name already exist...!"),
        # ('email_uniq', 'unique (email)', "The Email must be unique...!"),
    ]
        
    @api.model
    def create(self, vals):
        res = super(Student,self).create(vals)
        res.student_code = self.env['ir.sequence'].next_by_code('stud.seq')
        return res
    
    def write(self, vals):
        res = super(Student,self).write(vals)
        return res
    
    # def unlink(self):
    #     account_id = ""
    #     res = ""
        
    #     for record in self:
    #         account_id = self.env['course.course'].search([('name.id', '=', self.id)])
    #     if account_id:
    #         raise ValidationError(_("Subject is already used in other reference."))
    #     else:
    #         models.Model.unlink(self)

    # @api.constrains('email')
    # def validate_email(self):
    #     for obj in self:
    #         if re.match("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$", obj.email) == None:
    #             raise ValidationError("Please Provide valid Email Address: %s" % obj.email)

    def browse_method(self):
        student_data = self.env['student.details'].browse([110,111,114,3]) 

        for stud in student_data:
            if stud.exists():
                print("student id was {0} to access code of {1}".format(stud.id,stud.student_code))
            else:
                print("Student data not found {0}".format(stud.id))


    def search_method(self):
        stud = self.env['student.details']
        data = stud.search(['|',('hometown','=','Rajkot'),('name','=','Aashish')])
        

        for std in data:
            if std.exists():
                print("Name : {0} and Home Town : {1}".format(std.name,std.hometown))
        

    @api.model 
    def default_get(self,field_list=[]):
        rtn = super(Student,self).default_get(field_list)
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