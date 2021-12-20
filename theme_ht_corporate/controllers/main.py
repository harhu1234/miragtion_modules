# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import route, request

class About(http.Controller):
    @http.route('/about',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('theme_ht_corporate.about_page')

class Pricing(http.Controller):
    @http.route('/pricing',auth='public',website=True)
    def pricing(self, **kw):
        return http.request.render('theme_ht_corporate.pricing_page')

class Counselor(http.Controller):
    @http.route('/counselor',auth='public',website=True)
    def counselor(self, **kw):
        return http.request.render('theme_ht_corporate.counselor_page')

class Services(http.Controller):
    @http.route('/services',auth='public',website=True)
    def counselor(self, **kw):
        return http.request.render('theme_ht_corporate.services_page')

class Contact(http.Controller):
    @http.route('/contact',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('theme_ht_corporate.contact_page')

# class ThankYou(http.Controller):
#     @http.route('/thank-you',auth='public',website=True)
#     def thankyou(self, **kw):
#         return http.request.render('theme_ht_corporate_gym.thank_you')
