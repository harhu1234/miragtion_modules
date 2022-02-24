# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import route, request

class HTAbout(http.Controller):
    @http.route('/aboutus',auth='public',website=True)
    def about(self, **kw):
        return http.request.render('ht_restly.about_page')

class HTService(http.Controller):
    @http.route('/service',auth='public',website=True)
    def services(self, **kw):
        return http.request.render('ht_restly.service_page')

class HTPortfolio(http.Controller):
    @http.route('/portfolio',auth='public',website=True)
    def portfolio(self, **kw):
        return http.request.render('ht_restly.portfolio_page')

class HTTeam(http.Controller):
    @http.route('/team',auth='public',website=True)
    def team(self, **kw):
        return http.request.render('ht_restly.team_page')

class HTTeam(http.Controller):
    @http.route('/contactus',auth='public',website=True)
    def contact(self, **kw):
        return http.request.render('ht_restly.contact_page')        