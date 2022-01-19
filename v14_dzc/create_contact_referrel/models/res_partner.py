from odoo import api, fields, models, _


class ResPartner(models.Model):

    _inherit = 'res.partner'

    referral = fields.Boolean("Referral")

    def create_contacts_mailing_list(self):        
        mass_mailing_obj = self.env['mail.mass_mailing.contact']
        for contact in self:            
            if contact.email:
                contact_exist = mass_mailing_obj.search([('email', '=', contact.email)])
                if not contact_exist:
                    contact_data = {
                        'name': contact.name,
                        'email': contact.email,
                    }
                    mass_mailing_obj.create(contact_data)
