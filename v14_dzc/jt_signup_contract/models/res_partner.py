# -*- coding: utf-8 -*-

from odoo import fields, models, api


class ResPartner(models.Model):
    _inherit = "res.partner"

    #birthday = fields.Date('Date of Birth')

    @api.model
    def signup_retrieve_info(self, token):
        """ retrieve the user info about the token
            :return: a dictionary with the user information:
                - 'db': the name of the database
                - 'token': the token, if token is valid
                - 'name': the name of the partner, if token is valid
                - 'login': the user login, if the user already exists
                - 'email': the partner email, if the user does not exist
        """
        partner = self._signup_retrieve_partner(token, raise_exception=True)
        res = {'db': self.env.cr.dbname}
        if partner.signup_valid:
            res['token'] = token
            res['name'] = partner.name
            res['bank'] = '4444'
            res['phone'] = partner.phone

            # added fields:
            res['street'] = partner.street
            res['zip'] = partner.zip
            res['city'] = partner.city
            res['countries'] = self.env['res.country'].sudo().search([])
            res['country_id'] = partner.country_id #and partner.country_id.id or False
            res['partner'] = partner
        if partner.user_ids:
            res['login'] = partner.user_ids[0].login
        else:
            res['email'] = res['login'] = partner.email or ''
        return res