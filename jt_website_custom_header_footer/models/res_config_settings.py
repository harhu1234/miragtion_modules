# -*- coding: utf-8 -*-
##############################################################################
#
#    Jupical Technologies Pvt. Ltd.
#    Copyright (C) 2018-TODAY Jupical Technologies(<http://www.jupical.com>).
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

from odoo import api, fields, models


class ResCompany(models.Model):

    _inherit = 'res.company'

    google_app_store_link = fields.Char(string='Google Play Store App link')
    apple_app_store_link = fields.Char(string='Apple Store App Link')
    footer_image = fields.Binary(string='Footer Image')


class Website(models.Model):

    _inherit = 'website'

    def _default_google_app_store_link(self):
        return self.env.ref('base.main_company').google_app_store_link

    def _default_apple_app_store_link(self):
        return self.env.ref('base.main_company').apple_app_store_link

    google_app_store_link = fields.Char(
        string='Google Play Store App link', default=_default_google_app_store_link)
    apple_app_store_link = fields.Char(
        string='Apple Store App Link', default=_default_apple_app_store_link)


class ResConfigSettings(models.TransientModel):

    _inherit = 'res.config.settings'

    google_app_store_link = fields.Char(
        string='Google Play Store App link', related="website_id.google_app_store_link", readonly=False)
    apple_app_store_link = fields.Char(
        string='Apple Store App Link', related="website_id.apple_app_store_link", readonly=False)

    allow_custom_header = fields.Boolean('Website Header')
    allow_custom_footer = fields.Boolean('Website Footer')

    @api.model
    def get_values(self):
        res = super(ResConfigSettings, self).get_values()
        config = self.env['ir.config_parameter'].sudo()
        res.update(
            google_app_store_link=config.get_param(
                'jt_website_custom_header_footer.google_app_store_link'),
            apple_app_store_link=config.get_param(
                'jt_website_custom_header_footer.apple_app_store_link'),
            allow_custom_header=config.get_param(
                'jt_website_custom_header_footer.allow_custom_header'),
            allow_custom_footer=config.get_param(
                'jt_website_custom_header_footer.allow_custom_footer'),

        )
        return res

    def set_values(self):
        super(ResConfigSettings, self).set_values()
        param = self.env['ir.config_parameter'].sudo()

        param.set_param(
            'jt_website_custom_header_footer.google_app_store_link', self.google_app_store_link)
        param.set_param(
            'jt_website_custom_header_footer.apple_app_store_link', self.apple_app_store_link)
        param.set_param(
            'jt_website_custom_header_footer.allow_custom_header', self.allow_custom_header)
        param.set_param(
            'jt_website_custom_header_footer.allow_custom_footer', self.allow_custom_footer)
