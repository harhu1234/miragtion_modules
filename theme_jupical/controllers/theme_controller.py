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

class About(http.Controller):
    @http.route('/about',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('theme_jupical.about_page')

class Team(http.Controller):
    @http.route('/team',auth='public',website=True)
    def team(self, **kw):
        return http.request.render('theme_jupical.team_page')

class Project(http.Controller):
    @http.route('/project',auth='public',website=True)
    def project(self, **kw):
        return http.request.render('theme_jupical.project_page')

class Services(http.Controller):
    @http.route('/services',auth='public',website=True)
    def services(self, **kw):
        return http.request.render('theme_jupical.services_page')

# class Jtblog(http.Controller):
#     @http.route('/jt-blog',auth='public',website=True)
#     def jtblog(self, **kw):
#         return http.request.render('theme_jupical.blog_page')

class Contact(http.Controller):
    @http.route('/contact',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('theme_jupical.contact_page')