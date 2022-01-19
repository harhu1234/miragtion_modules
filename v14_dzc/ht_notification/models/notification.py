# -*- coding: utf-8 -*-
###################################################################################
#
#    Harhu IT Solutions
#    Copyright (C) 2019-TODAY Harhu IT Solutions (http://harhutech.com).
#    Author: Harhu IT Solutions (http://harhutech.com)
#
#    you can modify it under the terms of the GNU Affero General Public License (AGPL) as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#
###################################################################################

from odoo import api, fields, models, _
from datetime import datetime 
from odoo.tools import DEFAULT_SERVER_DATETIME_FORMAT as DF

class Notification(models.Model):

	_name = "notification.notification"
	_description = "Notificaion"
	_rec_name = "subject"

	partner_ids = fields.Many2many('res.partner', string="Notify Partners")

	stage_ids = fields.Many2many('crm.stage', string="Stages")	
	duration = fields.Selection([('days', 'Days'),('week', 'Week')], default='days', string="Duration")
	value_duration = fields.Integer(string="Value of Duration")
	# email_from = fields.Char(string="Email From")
	mail_text = fields.Html(string='Custom Mail Message',
                                   translate=True, default="")
	subject =fields.Char("Subject")
	mail_option = fields.Selection([('lead','Lead'),
									 ('coach','Coach'),
									 ('referral','Referral')],default="lead",string="To")


	def get_email_body(self,leads,days):
		body = f"""

			Hi Dear Responsible team, <br/><br/>

			The following leads are in ideal state since {days} days <br/><br/>

			{leads} <br/><br/>


			Best Regards, <br/>
			Zorge Coach Team
			"""
		return body

	def get_crm_email_notification(self):
		# notification = self.search([])

		IrMailServer = self.env['ir.mail_server']
		mail_server_id =  IrMailServer.search([], limit=1)
		email_from ='vipul.harhu@gmail.com'
		date_format ="%m-%d-%Y"
		
		for configuration in self.search([]):
			leads = []
			
			if configuration.duration == 'days':
				days = configuration.value_duration
			elif configuration.duration == 'week':
				days = configuration.value_duration * 7

			for lead in self.env['crm.lead'].search([('stage_id','in',configuration.stage_ids.ids)]):
				# print("WRITE DATE :::",lead.write_date)
				# write_date = datetime.strptime(str(lead.write_date), DF)
				write_date = lead.write_date
				print("write_date............................",write_date)
				diff = (datetime.now() - lead.write_date).days
				print("diff................",diff)
				
				if diff >= days:
					leads.append(lead)
			var_mail_option=""
			var_subject =""
			
			if configuration.mail_option:
				var_mail_option = configuration.mail_option
			
			if configuration.subject:
				var_subject = configuration.subject
			else:
				var_subject ="Notification for ideal leads"


			print(var_mail_option,'\n',var_subject)
			if leads:
				ideal_leads = ""
				body = ""
				for lead in leads:
					email_to = []
					ideal_leads += lead.name
					ideal_leads += "\n"
					if var_mail_option:
						if var_mail_option == 'lead':
							if lead.partner_id and lead.partner_id.email:
								email_to.append(lead.partner_id.email)
						if var_mail_option == 'referral':
							if lead.referrel_email:
								email_to.append(lead.referrel_email)
						if var_mail_option == 'coach':
							if lead.coach_email:
								email_to.append(lead.coach_email)

					body=""
					# for message in configuration.mail_text:
					if email_to:
						if configuration.mail_text!='<p><br></p>' and configuration.mail_text!='<p> </p>':
							body = configuration.mail_text
							body +="<br/>" + lead.name
						else:
							body = self.get_email_body(lead.name,days)

						print("Body",body,email_to)
							
						msg = IrMailServer.build_email(
		                        email_from=email_from,
		                        email_to=email_to,
		                        email_cc='',
		                        subject=var_subject,
		                        body=body,                                            
		                        subtype='html',
		                        subtype_alternative='plain',
		                        headers={})
						
						res = IrMailServer.send_email(msg, mail_server_id=mail_server_id.id)	
				
				print("Body",body)
				email_to =[]
				for partner in configuration.partner_ids:
					if partner.email:
						email_to.append(partner.email)
				
				print("email_to",body)
				if email_to:		
					if configuration.mail_text!='<p><br></p>' and configuration.mail_text!='<p> </p>':
						body = configuration.mail_text
						body +="<br/>" + ideal_leads +"<br/>"
					else:
						body = self.get_email_body(ideal_leads,days)
						 
					print("All Lead ",body,)
					msg = IrMailServer.build_email(
	                        email_from=email_from,
	                        email_to=email_to,
	                        email_cc='',
	                        subject=var_subject,
	                        body=body,                                            
	                        subtype='html',
	                        subtype_alternative='plain',
	                        headers={})
						
					res = IrMailServer.send_email(msg, mail_server_id=mail_server_id.id)
