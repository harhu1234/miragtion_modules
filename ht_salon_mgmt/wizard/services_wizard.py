# -*- coding: utf-8 -*-

from odoo import models, api, fields, _

class ServiceReport(models.TransientModel):

    _name = 'service.wizard'
    _description = 'Service Wizard'

    name = fields.Char(string="Name")
    services = fields.Selection([('all_service','All Services'),('top_services','Top Services')],string="Services")


    def service_report(self):
        if self.services == 'all_service':
            services = self.env['service.service'].search([])
            datas = {
                    'ids':services.ids,
                    'model':'service.service'
            }
            return self.env.ref('ht_salon_mgmt.action_service_report').report_action(services,data=datas)
        if self.services == 'top_services':
            services = self.env['customer.appointment'].search([('services_ids.services_id','=',1)])
            for service in services:
                print('==aashhh',service.services_ids.services_id)
