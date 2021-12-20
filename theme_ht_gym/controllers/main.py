# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import route, request

class About(http.Controller):
    @http.route('/about',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('theme_ht_gym.about_page')

class Pricing(http.Controller):
    @http.route('/pricing',auth='public',website=True)
    def pricing(self, **kw):
        return http.request.render('theme_ht_gym.pricing_page')

class Gallery(http.Controller):
    @http.route('/gallery',auth='public',website=True)
    def gallery(self, **kw):
        return http.request.render('theme_ht_gym.gallery_page')

class Contact(http.Controller):
    @http.route('/contact',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('theme_ht_gym.contact_page')

class ThankYou(http.Controller):
    @http.route('/thank-you',auth='public',website=True)
    def thankyou(self, **kw):
        return http.request.render('theme_ht_gym.thank_you')
