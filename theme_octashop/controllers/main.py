# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import route, request

class About(http.Controller):
    @http.route('/about',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('theme_octashop.about_page')

class Products(http.Controller):
    @http.route('/products',auth='public',website=True)
    def products(self, **kw):
        return http.request.render('theme_octashop.product_page')

class SingleProduct(http.Controller):
    @http.route('/single-product',auth='public',website=True)
    def singleproduct(self, **kw):
        return http.request.render('theme_octashop.single_product_page')

class Contact(http.Controller):
    @http.route('/contact',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('theme_octashop.contact_page')

class ThankYou(http.Controller):
    @http.route('/thank-you',auth='public',website=True)
    def thankyou(self, **kw):
        return http.request.render('theme_octashop.thank_you')
