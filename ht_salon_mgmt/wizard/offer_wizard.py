# -*- coding: utf-8 -*-

from odoo import models,fields,api,_

class OfferWizard(models.TransientModel):

    _name = 'offer.wizard'
    _description = 'Offer Wizard'

    name = fields.Char(string='Name')
    offers_service = fields.Selection([('all_offer', 'All Offer'), ('discount_offer', 'Discount Offer')],string="Offer Service")


    def offer_service_report(self):
        if self.offers_service == 'all_offer':
            offers = self.env['offer.service'].search([])
            datas = {
                'ids': offers.ids,
                'model': 'offer.service'
            }
            return self.env.ref('ht_salon_mgmt.action_offer_report').report_action(offers, data=datas)

        elif self.offers_service == 'discount_offer':
            offers = self.env['offer.service'].search([])
            customer_obj = self.env['customer.appointment']
            for offer in offers:
                customer = customer_obj.search([('schedue_time','>=',offer.start_date),('schedue_time','<=',offer.end_date)])
            datas = {
                'ids': offers.ids,
                'model': 'offer.service',
                'customers': customer.ids,
            }
            return self.env.ref('ht_salon_mgmt.action_offer_discount_report').report_action(offers, data=datas)



