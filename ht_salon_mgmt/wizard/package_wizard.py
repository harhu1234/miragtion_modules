# -*- coding: utf-8 -*-

from odoo import models,fields,api


class PackageWizard(models.TransientModel):

	_name = 'package.service.wizard'
	_description = 'Pacakge Service wizard'

	name = fields.Char(string="Name")
	package_service = fields.Selection([('all_package','All Package'),('select_package','Select Package')],string="Package Service")
	package = fields.Many2one('pacakge.package',string="Package")


	def package_service_report(self):
		if self.package_service == 'all_package':
			packages = self.env['pacakge.package'].search([])
			datas = {
				'ids': packages.ids,
				'model': 'pacakge.package'
			}
			return self.env.ref('ht_salon_mgmt.action_package_report').report_action(packages, data=datas)
		if self.package_service == 'select_package':
			if self.package:
				packages = self.env['pacakge.package'].search([('id','=',self.package.id)])
				datas = {
						'ids':packages.ids,
						'model':'pacakge.package'
						}
				return self.env.ref('ht_salon_mgmt.action_package_report').report_action(packages, data=datas)

