# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import route, request

class About(http.Controller):
    @http.route('/about',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('theme_ht_loan.about_page')

class Services(http.Controller):
    @http.route('/services',auth='public',website=True)
    def services(self, **kw):
        return http.request.render('theme_ht_loan.services_page')

class Contact(http.Controller):
    @http.route('/contact',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('theme_ht_loan.contact_page')

class ThankYou(http.Controller):
    @http.route('/thank-you',auth='public',website=True)
    def thankyou(self, **kw):
        return http.request.render('theme_ht_loan.thank_you')
