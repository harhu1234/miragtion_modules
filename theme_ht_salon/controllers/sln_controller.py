# -*- coding: utf-8 -*-
##############################################################################
#
#    Harhu IT Solutions
#    Copyright (C) 2020-TODAY Harhu IT Solutions(<https://www.harhu.com>).
#    Author: Harhu IT Solutions(<https://www.harhu.com>)
#    you can modify it under the terms of the GNU LESSER
#    GENERAL PUBLIC LICENSE (LGPL v3), Version 3.
#
#    It is forbidden to publish, distribute, sublicense, or sell copies
#    of the Software or modified copies of the Software.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU LESSER GENERAL PUBLIC LICENSE (LGPL v3) for more details.
#
#    You should have received a copy of the GNU LESSER GENERAL PUBLIC LICENSE
#    GENERAL PUBLIC LICENSE (LGPL v3) along with this program.
#    If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

from odoo import http
from odoo.http import route, request

class Service(http.Controller):
    @http.route('/service',auth='public',website=True)
    def service(self, **kw):
        return http.request.render('theme_ht_salon.service_page')

class Gallery(http.Controller):
    @http.route('/gallery',auth='public',website=True)
    def gallery(self, **kw):
        return http.request.render('theme_ht_salon.gallery_page')

class About(http.Controller):
    @http.route('/about',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('theme_ht_salon.about_page')

# class Blog(http.Controller):
#     @http.route('/blog',auth='public',website=True)
#     def blog(self, **kw):
#         return http.request.render('theme_ht_salon.blog_page')

class Contact(http.Controller):
    @http.route('/contact',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('theme_ht_salon.contact_page')

class ContactThankYou(http.Controller):
    @http.route('/contact-thank-you',auth='public',website=True)
    def contacthankyou(self):
        return http.request.render('theme_ht_salon.contact_thank_you_page')

