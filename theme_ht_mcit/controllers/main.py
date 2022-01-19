# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import route, request

class About(http.Controller):
    @http.route('/about',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('theme_ht_car.about_page')

class Furnitures(http.Controller):
    @http.route('/furnitures',auth='public',website=True)
    def furnitures(self, **kw):
        return http.request.render('theme_ht_car.furnitures_page')

class Testimonial(http.Controller):
    @http.route('/testimonial',auth='public',website=True)
    def testimonial(self, **kw):
        return http.request.render('theme_ht_car.testimonial_page')

class Contact(http.Controller):
    @http.route('/contact',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('theme_ht_car.contact_page')

# class ThankYou(http.Controller):
#     @http.route('/thank-you',auth='public',website=True)
#     def thankyou(self, **kw):
#         return http.request.render('theme_ht_car_gym.thank_you')
