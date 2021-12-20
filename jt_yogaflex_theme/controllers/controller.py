# -*- coding: utf-8 -*-
##############################################################################
#
#    Jupical Technologies Pvt. Ltd.
#    Copyright (C) 2018-Today Jupical Technologies Pvt. Ltd.(<http://www.jupical.com>).
#    Author: Jupical Technologies Pvt. Ltd.(<http://www.jupical.com>)
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
# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request, route


class YogaFlex(http.Controller):
    @http.route('/home', auth='public', website=True)
    def index(self, **kw):
        return http.request.render('jt_yogaflex_theme.home_template_page')

class About(http.Controller):
    @http.route('/about', auth='public', website=True)
    def about(self, **kw):
        return http.request.render('jt_yogaflex_theme.about_template_page') 

class Trainers(http.Controller):
    @http.route('/trainers', auth='public', website=True)
    def trainer(self, **kw):
        return http.request.render('jt_yogaflex_theme.trainers_template_page') 

class Blog(http.Controller):
    @http.route('/blog-home', auth='public', website=True)
    def blog(self, **kw):
        return http.request.render('jt_yogaflex_theme.blog_home_template_page') 

class BlogSingle(http.Controller):
    @http.route('/blog-single', auth='public', website=True)
    def blogsingle(self, **kw):
        return http.request.render('jt_yogaflex_theme.blog_single_template_page')         

class Schedule(http.Controller):
    @http.route('/schedule', auth='public', website=True)
    def schedule(self, **kw):
        return http.request.render('jt_yogaflex_theme.schedule_template_page')              

class Courses(http.Controller):
    @http.route('/courses', auth='public', website=True)
    def courses(self, **kw):
        return http.request.render('jt_yogaflex_theme.courses_template_page')              

class Contact(http.Controller):
    @http.route('/contact', auth='public', website=True)
    def contact(self, **kw):
        return http.request.render('jt_yogaflex_theme.contact_template_page')              

