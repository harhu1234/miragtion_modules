# -*- coding: utf-8 -*-
##############################################################################
#
#    AtharvERP Business Solutions
#    Copyright (C) 2020-TODAY AtharvERP Business Solutions(<http://www.atharverp.com>).
#    Author: AtharvERP Business Solutions(<http://www.atharverp.com>)
#    you can modify it under the terms of the GNU LESSER
#    GENERAL PUBLIC LICENSE (LGPL v3), Version 3.
#
#    It is forbidden to publish, distribute, sublicense, or sell copies
#    of the Software or modified copies of the Software.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU LESSER GENERAL PUBLIC LICENSE (LGPL v3) for more details.
#
#    You should have received a copy of the GNU LESSER GENERAL PUBLIC LICENSE
#    GENERAL PUBLIC LICENSE (LGPL v3) along with this program.
#    If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

from odoo import api, models, fields, _
from odoo.exceptions import ValidationError


class set_filter(models.Model):
	_name = 'set.filter'
	_description = "Set Filter"
	
	
	name = fields.Char('Name', required="1")
	model_id = fields.Many2one('ir.model', string='Model', ondelete='set null')
	filter_field = fields.Many2one('ir.model.fields', string='Filter Field', ondelete="set null")
	state = fields.Selection([('draft','Draft'),('done','Done')], string='State', default='draft')
	view_id = fields.Many2one('ir.ui.view', string='Search View')
	
	today = fields.Boolean('Today')
	this_week = fields.Boolean('This Week')
	this_month = fields.Boolean('This Month') 
	this_year = fields.Boolean('This Year')
	
	
	yesterday = fields.Boolean('Yesterday')
	last_7_days = fields.Boolean('Last 7 Days')
	last_30_days = fields.Boolean('Last 30 Days')
	last_365_days = fields.Boolean('Last 365 Days')
	
	last_week = fields.Boolean('Last Week')
	last_month = fields.Boolean('Last Month') 
	last_year = fields.Boolean('Last Year')
	
	_sql_constraints = [
		('unique_model', 'unique(model_id)', "You can not create more then one record of same model !"),
	]
	
	#@api.model
	def action_done(self):
		search_id = self.env['ir.ui.view'].search([('model','=',self.model_id.model),('type','=','search')], order='priority, id', limit=1)
		if not search_id:
			raise ValidationError("Search View not found in %s model" % self.model_id.name)
		view_name = ''
		view_name += 'view.dev.auto.date.'
		view_name += str(self.model_id.model)
		view_name+= '.inherit.filter'

		vals={
			'name':view_name,
			'type':'search',
			'model':self.model_id.model,
			'priority':search_id.priority,
			'active':True,
			'inherit_id':search_id and search_id.id or False,
			'mode':'extension',
		}
		new_search_id = self.env['ir.ui.view'].create(vals)
		self.view_id = new_search_id.id
		
		arg ="<?xml version='1.0'?>\n"
		arg +="\t <xpath expr='//search' position='inside'>\n"
		
		#TODAY 
		if self.today:
			if self.filter_field.ttype == 'datetime':
				arg += '''\t\t<filter string='Today' name="today" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', datetime.date.today().strftime('%Y-%m-%d 00:00:00')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',datetime.date.today().strftime('%Y-%m-%d 23:23:59'))]"/>\n'''
			else:
				arg += '''\t\t<filter string='Today' name="today1" domain="[(''' +"'"+str(self.filter_field.name)+"'" +''','&gt;=', datetime.date.today().strftime('%Y-%m-%d')),('''+"'"+str(self.filter_field.name)+"'"+''','&lt;=',datetime.date.today().strftime('%Y-%m-%d'))]" />\n'''
				
		#YESTERDAY 
		if self.yesterday:
			if self.filter_field.ttype == 'datetime':
				arg += '''\t\t<filter name="yesterday" string='Yesterday' domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today()-datetime.timedelta(days=1)).strftime('%Y-%m-%d 00:00:00')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',(datetime.date.today()+datetime.timedelta(days=0)).strftime('%Y-%m-%d 00:00:00'))]"/>\n'''
			else:
				arg += '''\t\t<filter string='Yesterday' name="yesterday1" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today()-datetime.timedelta(days=1)).strftime('%Y-%m-%d')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',(datetime.date.today()+datetime.timedelta(days=0)).strftime('%Y-%m-%d'))]"/>\n'''
				
		
		# LAST 7 DAYS 
		if self.last_7_days:
			if self.filter_field.ttype == 'datetime':
				arg += '''\t\t<filter string='Last 7 Days' name="7days" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today()+datetime.timedelta(days=-7)).strftime('%Y-%m-%d 00:00:00')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',datetime.date.today().strftime('%Y-%m-%d 00:00:00'))]"/>\n'''
			else:
				arg += '''\t\t<filter string='Last 7 Days' name="7days1" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today()+datetime.timedelta(days=-7)).strftime('%Y-%m-%d')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',datetime.date.today().strftime('%Y-%m-%d'))]"/>\n'''
				
		
		# LAST 30 DAYS 
		if self.last_30_days:
			if self.filter_field.ttype == 'datetime':
				arg += '''\t\t<filter string='Last 30 Days' name='30days' domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', ((datetime.date.today()+datetime.timedelta(days=-30)).strftime('%Y-%m-%d 00:00:00'))),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',(datetime.date.today().strftime('%Y-%m-%d 00:00:00')))]"/>\n'''
			else:
				arg += '''\t\t<filter string='Last 30 Days' name="30days1" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today()+datetime.timedelta(days=-30)).strftime('%Y-%m-%d')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',datetime.date.today().strftime('%Y-%m-%d'))]"/>\n'''
		
		# LAST 30 DAYS 
		if self.last_365_days:
			if self.filter_field.ttype == 'datetime':
				arg += '''\t\t<filter string='Last 365 Days' name="365days" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today()+datetime.timedelta(days=-365)).strftime('%Y-%m-%d 00:00:00')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=', datetime.date.today().strftime('%Y-%m-%d 00:00:00'))]"/>\n'''
			else:
				arg += '''\t\t<filter string='Last 365 Days' name="365days1" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today()+datetime.timedelta(days=-365)).strftime('%Y-%m-%d')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=', datetime.date.today().strftime('%Y-%m-%d'))]"/>\n'''
				
		# This Week
		if self.this_week:
			if self.filter_field.ttype == 'datetime':
				arg += '''\t\t<filter string='This Week' name="this_week" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today()+relativedelta(weeks=-1,days=1,weekday=-1)).strftime('%Y-%m-%d 00:00:00')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',(datetime.date.today()+relativedelta(weeks=0, weekday=5)).strftime('%Y-%m-%d 23:59:59'))]"/>\n'''
			else:
				arg += '''\t\t<filter string='This Week' name="this_week1" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today()+relativedelta(weeks=-1,days=1,weekday=-1)).strftime('%Y-%m-%d')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',(datetime.date.today()+relativedelta(weeks=0, weekday=5)).strftime('%Y-%m-%d'))]"/>\n'''
		
		# This Month
		if self.this_month:
			if self.filter_field.ttype == 'datetime':
				arg += '''\t\t<filter string='This Month' name="this_month" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today()+relativedelta(day=1)).strftime('%Y-%m-%d 00:00:00')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',(datetime.date.today()+relativedelta(day=1, months=1, days=-1)).strftime('%Y-%m-%d 23:59:59'))]"/>\n'''
			else:
				arg += '''\t\t<filter string='This Month' name="this_month1" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today()+relativedelta(day=1)).strftime('%Y-%m-%d')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',(datetime.date.today()+relativedelta(day=1, months=1, days=-1)).strftime('%Y-%m-%d'))]"/>\n'''
				
		
		# This Year
		if self.this_year:
			if self.filter_field.ttype == 'datetime':
				arg += '''\t\t<filter string='This Year' name="this_year" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', time.strftime('%%Y-01-01 23:59:59')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',time.strftime('%%Y-12-31'))]"/>\n'''
			else:
				arg += '''\t\t<filter string='This Year' name="this_year1" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', time.strftime('%%Y-01-01 23:59:59')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',time.strftime('%%Y-12-31'))]"/>\n'''
				
		
		# Last Week
		if self.last_week:
			if self.filter_field.ttype == 'datetime':
				arg += '''\t\t<filter string='Last Week' name="last_week" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today()+relativedelta(weeks=-2,days=-1,weekday=-1)).strftime('%Y-%m-%d 00:00:00')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',(datetime.date.today()+relativedelta(weeks=-1, weekday=5)).strftime('%Y-%m-%d 23:59:59'))]"/>\n'''
			else:
				arg += '''\t\t<filter string='Last Week' name="last_week" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today()+relativedelta(weeks=-2,days=-1,weekday=-1)).strftime('%Y-%m-%d')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',(datetime.date.today()+relativedelta(weeks=-1, weekday=5)).strftime('%Y-%m-%d'))]"/>\n'''
				
		# Last Month 
		if self.last_month:
			if self.filter_field.ttype == 'datetime':
				arg += '''\t\t<filter string='Last Month' name="last_month" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today() - relativedelta(day=1,months=1)).strftime('%Y-%m-%d 00:00:00')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',(datetime.date.today() - relativedelta(day=31, months=1)).strftime('%Y-%m-%d 23:59:59'))]"/>\n'''
			else:
				arg += '''\t\t<filter string='Last Month' name="last_month1" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today() - relativedelta(day=1,months=1)).strftime('%Y-%m-%d')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',(datetime.date.today() - relativedelta(day=31, months=1)).strftime('%Y-%m-%d'))]"/>\n'''
				
		
		# Last Year
		if self.last_year:
			if self.filter_field.ttype == 'datetime':
				arg += '''\t\t<filter string='Last Year' name="last_year" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today() - relativedelta(day=1,month=1, years=1)).strftime('%Y-%m-%d 00:00:00')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',(datetime.date.today() - relativedelta(day=31, month=12, years=1)).strftime('%Y-%m-%d 23:59:59'))]"/>\n'''
			else:
				arg += '''\t\t<filter string='Last Year' name="last_year1" domain="[(''' +"'"+str(self.filter_field.name) +"'"+''','&gt;=', (datetime.date.today() - relativedelta(day=1,month=1, years=1)).strftime('%Y-%m-%d')),(''' + "'"+str(self.filter_field.name)+"'"+''','&lt;=',(datetime.date.today() - relativedelta(day=31, month=12, years=1)).strftime('%Y-%m-%d'))]"/>\n'''
					
		
		arg +="\t </xpath>"
		self.view_id.arch_base = arg
		self.state = 'done'
	
	#@api.model
	def action_draft(self):
		self.view_id.unlink()
		self.state = 'draft'