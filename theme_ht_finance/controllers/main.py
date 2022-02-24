# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import route, request

class About(http.Controller):
    @http.route('/about',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('theme_ht_finance.about_page')

class Services(http.Controller):
    @http.route('/services',auth='public',website=True)
    def services(self, **kw):
        return http.request.render('theme_ht_finance.services_page')

class Cases(http.Controller):
    @http.route('/cases',auth='public',website=True)
    def cases(self, **kw):
        return http.request.render('theme_ht_finance.cases_page')

class Contact(http.Controller):
    @http.route('/contact',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('theme_ht_finance.contact_page')

class ThankYou(http.Controller):
    @http.route('/thank-you',auth='public',website=True)
    def thankyou(self, **kw):
        return http.request.render('theme_ht_finance.thank_you')
