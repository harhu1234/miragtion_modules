
# Copyright 2018 <AUTHOR(S)>
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

import odoo
import werkzeug

from odoo import _, exceptions, http
from odoo.http import request
from odoo.tools import consteq
from odoo.addons.mass_mailing.controllers.main import MassMailController

class Website(MassMailController):

    @http.route(['/mail/mailing/<int:mailing_id>/unsubscribe'], type='http', website=True, auth='public')
    def mailing(self, mailing_id, email=None, res_id=None, token="", **post):
        mailing = request.env['mail.mass_mailing'].sudo().browse(mailing_id)
        if mailing.exists():
            res_id = res_id and int(res_id)
            res_ids = []
            if mailing.mailing_model_name == 'mail.mass_mailing.list':
                contacts = request.env['mail.mass_mailing.contact'].sudo().search([
                    ('email', '=', email),
                    ('list_ids', 'in', [mailing_list.id for mailing_list in mailing.contact_list_ids])
                ])
                res_ids = contacts.ids
            else:
                res_ids = [res_id]

            right_token = mailing._unsubscribe_token(res_id, email)
            if not consteq(str(token), right_token):
                raise exceptions.AccessDenied()
            mailing.update_opt_out(email, res_ids, True)

            return werkzeug.utils.redirect('https://de-zorgcoach.nl/contact/succesvol-uitgeschreven/')
