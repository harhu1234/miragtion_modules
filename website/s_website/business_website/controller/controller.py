from odoo import http
from odoo.http import request, route


class Contact(http.Controller):
    @http.route('/contact', auth='public', website=True)
    def contact(self, **kw):
        return http.request.render('business_website.contact_theme')


class About(http.Controller):
    @http.route('/about', auth='public', website=True)
    def about(self, **kw):
        return http.request.render('business_website.about_us_theme')
