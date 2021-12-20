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
from odoo.http import request, route


class About(http.Controller):
    @http.route('/about', auth='public', website=True)
    def about(self, **kw):
        return http.request.render('theme_jt_gym.about_page')

class ClassDetails(http.Controller):
    @http.route('/class-details', auth='public', website=True)
    def classdetails(self, **kw):
        return http.request.render('theme_jt_gym.class_details_page')

class Services(http.Controller):
    @http.route('/services', auth='public', website=True)
    def services(self, **kw):
        return http.request.render('theme_jt_gym.services_page')

class Team(http.Controller):
    @http.route('/team', auth='public', website=True)
    def team(self, **kw):
        return http.request.render('theme_jt_gym.team_page')

class BmiCalculater(http.Controller):
    @http.route('/bmi-calculator', auth='public', website=True)
    def bmicalculator(self, **kw):
        return http.request.render('theme_jt_gym.bmi_calculator_page')

class Gallery(http.Controller):
    @http.route('/gallery', auth='public', website=True)
    def gallery(self, **kw):
        return http.request.render('theme_jt_gym.gallery_page')

# class Blog(http.Controller):
#     @http.route('/blog', auth='public', website=True)
#     def blog(self, **kw):
#         return http.request.render('theme_jt_gym.blog_page')
class Contact(http.Controller):
    @http.route('/contact', auth='public', website=True)
    def contact(self, **kw):
        return http.request.render('theme_jt_gym.contact_page')

# class BlogDetails(http.Controller):
#     @http.route('/blog-details', auth='public', website=True)
#     def blogdetails(self, **kw):
#         return http.request.render('theme_jt_gym.blog_details_page')

class ThankYou(http.Controller):
    @http.route('/contact-thank-you', auth='public', website=True)
    def thankyou(self, **kw):
        return http.request.render('theme_jt_gym.contact_thank_you_page')
