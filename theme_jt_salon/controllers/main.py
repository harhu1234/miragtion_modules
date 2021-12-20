# -*- coding: utf-8 -*-


from odoo import http
from odoo.http import route, request

class About(http.Controller):
    @http.route('/about',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('theme_jt_salon.about_page')
        
class Services(http.Controller):
    @http.route('/services',auth='public',website=True)
    def services(self, **kw):
        return http.request.render('theme_jt_salon.services_page')

class Barbershop(http.Controller):
    @http.route('/barber-shop',auth='public',website=True)
    def barbershop(self, **kw):
        return http.request.render('theme_jt_salon.barbershop_page')

class Contact(http.Controller):
    @http.route('/contact',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('theme_jt_salon.contact_page')

class ThankYou(http.Controller):
    @http.route('/thank-you',auth='public',website=True)
    def thankyou(self, **kw):
        return http.request.render('theme_jt_salon.thank_you')
