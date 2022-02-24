# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import route, request

class About(http.Controller):
    @http.route('/about',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('theme_ht_education.about_page')

class Courses(http.Controller):
    @http.route('/courses',auth='public',website=True)
    def courses(self, **kw):
        return http.request.render('theme_ht_education.courses_page')

class Team(http.Controller):
    @http.route('/team',auth='public',website=True)
    def team(self, **kw):
        return http.request.render('theme_ht_education.team_page')

class Testimonial(http.Controller):
    @http.route('/testimonial',auth='public',website=True)
    def testimonial(self, **kw):
        return http.request.render('theme_ht_education.testimonial_page')

class Contact(http.Controller):
    @http.route('/contact',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('theme_ht_education.contact_page')

class ThankYou(http.Controller):
    @http.route('/thank-you',auth='public',website=True)
    def thankyou(self, **kw):
        return http.request.render('theme_ht_education.thank_you')
