# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import route, request

class About(http.Controller):
    @http.route('/about',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('theme_ht_mitech.about_page')

class WhyChooseUs(http.Controller):
    @http.route('/why-choose-us',auth='public',website=True)
    def whychooseus(self, **kw):
        return http.request.render('theme_ht_mitech.whychooseus_page')

class Careers(http.Controller):
    @http.route('/careers',auth='public',website=True)
    def careers(self, **kw):
        return http.request.render('theme_ht_mitech.careers_page')

class ITSolution(http.Controller):
    @http.route('/it-solutions',auth='public',website=True)
    def itsolution(self, **kw):
        return http.request.render('theme_ht_mitech.itsolution_page')

class Faqs(http.Controller):
    @http.route('/faqs',auth='public',website=True)
    def faqs(self, **kw):
        return http.request.render('theme_ht_mitech.faqs_page')

class OurHistory(http.Controller):
    @http.route('/our-history',auth='public',website=True)
    def ourhistory(self, **kw):
        return http.request.render('theme_ht_mitech.ourhistory_page')

class Leadership(http.Controller):
    @http.route('/leadership',auth='public',website=True)
    def leadership(self, **kw):
        return http.request.render('theme_ht_mitech.leadership_page')

class Contact(http.Controller):
    @http.route('/contact',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('theme_ht_mitech.contact_page')

class Pricing(http.Controller):
    @http.route('/pricing',auth='public',website=True)
    def pricing(self, **kw):
        return http.request.render('theme_ht_mitech.pricing_page')
