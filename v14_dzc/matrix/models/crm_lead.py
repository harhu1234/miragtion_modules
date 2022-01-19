# -*- coding: utf-8 -*-

##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2016 - now Bytebrand Outsourcing AG (<https://www.bytebrand.net>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Lesser General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Lesser General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################


from odoo import _, models, fields, api
from odoo import api, fields, models
from odoo.tools.translate import _
from odoo.exceptions import UserError
from datetime import datetime

class Crm(models.Model):
    _inherit = 'crm.lead'

    age = fields.Integer('Age')
    place = fields.Char('Place')
    correct_age_town = fields.Boolean(default=False, invisible=True)
    customer_gender = fields.Selection([('man', _('Man')),
                                        ('woman', _('Woman')),
                                        ("other", _("Other"))],
                                        string='Gender')
    customer_BSN = fields.Char('Customer BSN')

    contact_address = fields.Char('Adres')
    contact_email = fields.Char('Contact Email')
    contact_phone = fields.Char('Contact Phone')
    contact_postcode = fields.Char("Postcode")
    contact_location = fields.Char("Location")
    contact_residence = fields.Char("Residence")

    register_by = fields.Char("Aanmelding door")


    township = fields.Char("Township")

    


    # @api.multi
    # @api.depends('tag_ids')
    # def _set_preference(self):
    #     print("function Called")
    #     preference = ['Voorkeur voor vrouw','Voorkeur voor man','Anderstalig',
    #                  'nederlandstalig','Heeft ander huisdier']
    #     for record in self:
    #         if record.tag_ids:
    #             for tag in record.tag_ids:
    #                 if tag.name in preference:
    #                     record.preference_ids = [(4,tag.id)]
                        

    def add_place_age_tag(self):
        for lead in self:
            if lead.age and lead.place:
                matrix = self.env['crm.matrix'].search([('age', '=', lead.age),
                                                        ('place', '=', lead.place)],limit=1)
                if matrix:
                    for tag in matrix.tag_ids:
                        lead.tag_ids = [(4, tag.id)]

    @api.onchange('age', 'place')
    def onchange_age_or_place(self):
        if self.age and self.place:
            matrix = self.env['crm.matrix'].search([('age', '=', self.age),
                                                    ('place', '=', self.place)],limit=1)
            if matrix:
                self.tag_ids = [(6, 0, matrix.tag_ids.ids)]


    # Done migrated
    @api.model
    def mark_opportunity_won(self):
        opportunities = self.env['crm.lead'].search(
                                    [('stage_id', '!=', False)])
        stage_id = self.env['crm.stage'].search(
                                    [('stage_type_action', '=', 'won_stage')]).id
        for opportunity in opportunities:
            print("Vipul :",opportunity)
            if opportunity \
                    and opportunity.stage_id.stage_type_action == 'pre_won_stage' \
                    and not opportunity.activity_ids:
                print('Lead Name',opportunity.name)
                opportunity.write({'stage_id': stage_id})
                print('opportunity.stage_id.name', opportunity.stage_id.name)

    @api.model
    def create(self, vals):

        context = self._context
        # if 'age' in vals.keys():
        #     vals['name'] = vals.get('name') + ' ' + str(vals.get("age")) + 'jr'
        res = super(Crm, self.with_context(context, mail_create_nolog=True)).create(vals)
        if res and res.age and res.place:
            matrix = self.env['crm.matrix'].search([('age', '=', res.age),
                                                    ('place', '=', res.place)],limit=1)
            if matrix:
                res.tag_ids = [(6, 0, matrix.tag_ids.ids)]

        return res

    def write(self, vals):
        if vals.get('age') or vals.get('place'):
            for lead in self:
                age = vals.get('age') if vals.get('age') else lead.age
                place = vals.get('place') if vals.get('place') else lead.place
                matrix = self.env['crm.matrix'].search([('age', '=', age),
                                                        ('place', '=', place)],limit=1)
                if matrix:
                    lead_tags = []
                    if lead.tag_ids:
                        lead_tags = lead.tag_ids.ids
                    for tag in matrix.tag_ids:
                        if tag.id not in lead_tags:
                            lead.tag_ids = [(6, 0, [tag.id])]
        # if 'age' in vals.keys():
        #     if self.age:
        #         if vals.get("age"):
        #             name = self.name.replace(' %sjr' % self.age, '')
        #             name = '%s %sjr' % (name, str(vals.get("age")))
        #         else:
        #             name = self.name.replace(' %sjr' % self.age, '')
        #     else:
        #         name = '%s %sjr' % (self.name, str(vals.get("age")))
        #     vals.update(name=name)
        if self.env.context.get('from_matrix'):
            return super(Crm, self).write(vals)
        stage_for_creation_activity_id = self.env['crm.stage'].search(
            [('stage_type_action', '=', 'auto_create_activity')]).id
        if vals.get('stage_id') == stage_for_creation_activity_id:
            self.auto_create_activity(vals)
        stage_won_id = self.env['crm.stage'].search(
            [('stage_type_action', '=', 'won_stage')]).id
        if vals.get('stage_id') and vals.get('stage_id') == stage_won_id \
                and self.activity_ids:
            raise UserError(_(
                "You cannot change the status to “Won” if there are pending actions"))
        return super(Crm, self).write(vals)

    def auto_create_activity(self, vals, *args):
        config = self.env['ir.config_parameter'].sudo().get_param('auto_crm_activity')
        if not config:
            raise UserError(_(
                "Need set System Parameters with key 'auto_crm_activity',\n this is a one-time action."))
        notes_text = config.split(',')
        activity_type_id = 4
        user_id = self.user_id.id
        res_id = self.id
        res_model_id = self.env['ir.model'].sudo().search(
            [('model', '=', self._name)], limit=1).id
        values = {
                    'activity_type_id': activity_type_id,
                    'user_id': user_id,
                    'res_id': res_id,
                    'res_model_id': res_model_id,
                    }
        for note in notes_text:
            if note:
                note.strip("\n ,")
                values.update(note=note)
                self.env['mail.activity'].with_context({'from_matrix': True}).create(values)


class Stage(models.Model):
    _inherit = "crm.stage"

    stage_type_action = fields.Selection([
                            ('pre_won_stage', "Pre-Won Stage"),
                            ('auto_create_activity', "Auto Create Activity for '1st introductory meeting' "),
                            ('won_stage', "Won Stage")], sring="Type of action",
                help="Set True if this stage will be used as Pre Won State.")
