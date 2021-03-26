# -*- coding: utf-8 -*-
# Copyright (C) Softhealer Technologies.

from odoo import fields,models,api
from datetime import datetime

class  ProjectCustomChecklist(models.Model):
    _name= "project.custom.checklist"
    
    name = fields.Char("Name",required=True)
    description =fields.Char("Description")

class ProjectCustomChecklistLine(models.Model):
    _name= "project.custom.checklist.line"
    
    name = fields.Many2one("project.custom.checklist","Name",required=True)
    description = fields.Char("Description")
    updated_date = fields.Date("Date",readonly=True,default=datetime.now())    
    state = fields.Selection([('new','New'),('completed','Completed'),('cancelled','Cancelled')],string="State",default='new',readonly=True,index=True)

    project_id =fields.Many2one("project.project")    
    
    @api.multi
    def btn_check(self):
        self.write({'state': 'completed'})
    
    @api.multi
    def btn_close(self):
        self.write({'state': 'cancelled'})

    @api.onchange('name')
    def onchange_custom_chacklist_name(self):
        self.description = self.name.description
        
class ProjectProject(models.Model):
    _inherit = 'project.project'

    @api.one
    @api.depends('custom_checklist_ids')
    def _compute_custom_checklist(self):
        
        total_cnt = self.env['project.custom.checklist.line'].search_count([('project_id','=',self.id),('state','!=','cancelled')]) 
        compl_cnt = self.env['project.custom.checklist.line'].search_count([('project_id','=',self.id),('state','=','completed')]) 
        
        if total_cnt > 0 :
            self.custom_checklist =( 100.0 * compl_cnt ) / total_cnt
        else: 
            self.custom_checklist = 0
            
    custom_checklist_ids = fields.One2many("project.custom.checklist.line","project_id","Checklist")
    custom_checklist = fields.Float("Checklist Completed" ,compute="_compute_custom_checklist")
