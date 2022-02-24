# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import route, request

class About(http.Controller):
    @http.route('/about',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('theme_ht_swimming.about_page')

class Instructor(http.Controller):
    @http.route('/instructor',auth='public',website=True)
    def instructor(self, **kw):
        return http.request.render('theme_ht_swimming.instructor_page')

class Courses(http.Controller):
    @http.route('/courses',auth='public',website=True)
    def courses(self, **kw):
        return http.request.render('theme_ht_swimming.courses_page')

class Contact(http.Controller):
    @http.route('/contact',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('theme_ht_swimming.contact_page')
