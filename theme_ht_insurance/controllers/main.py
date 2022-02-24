# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import route, request

class About(http.Controller):
    @http.route('/about',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('theme_ht_insurance.about_page')

class Services(http.Controller):
    @http.route('/services',auth='public',website=True)
    def services(self, **kw):
        return http.request.render('theme_ht_insurance.services_page')

class Insurance(http.Controller):
    @http.route('/insurance',auth='public',website=True)
    def insurance(self, **kw):
        return http.request.render('theme_ht_insurance.insaurance_page')

class Contact(http.Controller):
    @http.route('/contact',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('theme_ht_insurance.contact_page')

class ThankYou(http.Controller):
    @http.route('/thank-you',auth='public',website=True)
    def thankyou(self, **kw):
        return http.request.render('theme_ht_insurance.thank_you')
