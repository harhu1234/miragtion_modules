# -*- coding: utf-8 -*-
# Copyright (C) Softhealer Technologies.

from odoo import fields,models,api
# from datetime import datetime

class TaskCustomChecklist(models.Model):
	_name= "task.custom.checklist"
	
	name = fields.Char("Name",required=True)
	description =fields.Char("Description")
		
class TaskCustomChecklistLine(models.Model):
	_name= "task.custom.checklist.line"
	
	name = fields.Many2one("task.custom.checklist","Name",required=True)
	description = fields.Char("Description")
	updated_date = fields.Date("Date",readonly=True,default=fields.Date.today())    
	state = fields.Selection([('new','New'),('completed','Completed'),('cancelled','Cancelled')],string="State",default='new',readonly=True,index=True)

	task_id =fields.Many2one("project.task")    
	
	#@api.model
	def btn_check(self):
		self.write({'state': 'completed'})
	
	#@api.model
	def btn_close(self):
		self.write({'state': 'cancelled'})

	@api.onchange('name')
	def onchange_custom_chacklist_name(self):
		self.description = self.name.description
		
class ProjectTask(models.Model):
	_inherit = 'project.task'

	@api.model
	@api.depends('custom_checklist_ids')
	def _compute_custom_checklist(self):

		for rec in self:
			total_cnt = self.env['task.custom.checklist.line'].search_count([('task_id','=',rec.id),('state','!=','cancelled')]) 
			compl_cnt = self.env['task.custom.checklist.line'].search_count([('task_id','=',rec.id),('state','=','completed')]) 
		
			if total_cnt > 0 :
				rec.custom_checklist = ( 100.0 * compl_cnt ) / total_cnt
			else: 
				rec.custom_checklist = 0
			
	custom_checklist_ids = fields.One2many("task.custom.checklist.line","task_id",string="Checklist")
	custom_checklist = fields.Float("Checklist Completed" ,compute="_compute_custom_checklist")
	
