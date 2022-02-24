# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import route, request

class About(http.Controller):
    @http.route('/about',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('theme_ht_ds.about_page')

class Coursedetails(http.Controller):
    @http.route('/course-details',auth='public',website=True)
    def coursedetails(self, **kw):
        return http.request.render('theme_ht_ds.course_details_page')

class Courses(http.Controller):
    @http.route('/courses',auth='public',website=True)
    def courses(self, **kw):
        return http.request.render('theme_ht_ds.courses_page')

class Contact(http.Controller):
    @http.route('/contact',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('theme_ht_ds.contact_page')

class Pricing(http.Controller):
    @http.route('/pricing',auth='public',website=True)
    def pricing(self, **kw):
        return http.request.render('theme_ht_ds.pricing_page')
