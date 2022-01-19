from odoo import fields, models, _

class ScheduleCrm(models.Model):

	_name = "schedule.auto.activity"

	name = fields.Char("Name")
	description = fields.Text("Description")
	due_day = fields.Integer("Due Day")
	code = fields.Char("Code")
	activity_type_id = fields.Many2one("mail.activity.type")
	activity_name = fields.Char(related="activity_type_id.name", store=True, string="Activity Name")
	how = fields.Selection([('manual','Manual'), ('automatic','Automatic')], default="manual", string="How?")
	stage_id = fields.Many2one("crm.stage", string="Status")
	is_mandatory = fields.Boolean("Is Mandatory?")

class MailActivity(models.Model):

	_inherit = 'mail.activity'

	is_mandatory = fields.Boolean("Is Mandatory?")
	stage_id = fields.Many2one("crm.stage", string="Status")



