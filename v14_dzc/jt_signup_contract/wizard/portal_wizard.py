from odoo import api, fields, models, _
from odoo.exceptions import UserError
import logging
from odoo.addons.portal.wizard.portal_wizard import extract_email

_logger = logging.getLogger(__name__)

class PortalWizard(models.TransientModel):

    _inherit = 'portal.wizard'

    emp_id = fields.Many2one('hr.employee')

    @api.onchange('portal_id')
    def onchange_portal_id(self):
        # for each partner, determine corresponding portal.wizard.user records
        if not self._context.get('active_model') == 'hr.applicant':
            partner_ids = self.env.context.get('active_ids', [])
            contact_ids = set()
            user_changes = []
            for partner in self.env['res.partner'].sudo().browse(partner_ids):
                contact_partners = partner.child_ids or [partner]
                for contact in contact_partners:
                    # make sure that each contact appears at most once in the list
                    if contact.id not in contact_ids:
                        contact_ids.add(contact.id)
                        in_portal = False
                        if contact.user_ids:
                            in_portal = self.portal_id in contact.user_ids[0].groups_id
                        user_changes.append((0, 0, {
                            'partner_id': contact.id,
                            'email': contact.email,
                            'in_portal': in_portal,
                        }))
            self.user_ids = user_changes


class PortalWizardUser(models.TransientModel):

    _inherit = 'portal.wizard.user'

    def _send_email(self):
        """ send notification email to a new portal user """
        if not self.env.user.email:
            raise UserError(_('You must have an email address in your User Preferences to send emails.'))

        # determine subject and body in the portal user's language
        template = self.env.ref('portal.mail_template_data_portal_welcome')
        for wizard_line in self:
            lang = wizard_line.user_id.lang
            partner = wizard_line.user_id.partner_id

            portal_url = partner.with_context(signup_force_type_in_url='', lang=lang)._get_signup_url_for_action()[
                partner.id]
            partner.signup_prepare()

            if template:
                if self._context.get('active_model') == 'hr.applicant':
                    emp_id = wizard_line.wizard_id.emp_id and wizard_line.wizard_id.emp_id.id or False
                    wizard_line.user_id.signup_url = wizard_line.user_id.signup_url + '&emp_id=' + str(emp_id)
                    template = self.env.ref('jt_signup_contract.mail_template_application_portal_welcome')
                template.with_context(dbname=self._cr.dbname, portal_url=portal_url, lang=lang).send_mail(
                    wizard_line.user_id.id, force_send=True)
            else:
                _logger.warning("No email template found for sending email to the portal user")

        return True

    def _create_user(self):
        """ create a new user for wizard_user.partner_id
            :returns record of res.users
        """
        if self._context.get('active_model') == 'hr.applicant':
            company_id = self.env.context.get('company_id')
            # proj_user_group = self.env.ref('project.group_project_user').id
            # timesheet_group = self.env.ref('hr_timesheet.group_hr_timesheet_user').id
            app_user_group = self.env.ref('jt_signup_contract.group_application_user').id
            emp_group = self.env.ref('base.group_user').id
            user = self.env['res.users'].with_context(no_reset_password=True).create({
                'email': extract_email(self.email),
                'login': extract_email(self.email),
                'partner_id': self.partner_id.id,
                'company_id': company_id,
                'company_ids': [(6, 0, [company_id])],
                'groups_id': [(6, 0, [emp_group, app_user_group])],
            })
            app = self.env['hr.applicant'].browse(self._context.get('active_id'))
            # if user.has_group('base.group_portal'):
            #     print("inside if portal group ----")
            #     portal_group = self.env.ref('base.group_portal').id
            #     user.group_ids = [(3, portal_group)]
            return user
        else:
            company_id = self.env.context.get('company_id')
            return self.env['res.users'].with_context(no_reset_password=True).create({
                'email': extract_email(self.email),
                'login': extract_email(self.email),
                'partner_id': self.partner_id.id,
                'company_id': company_id,
                'company_ids': [(6, 0, [company_id])],
                'groups_id': [(6, 0, [])],
            })

    def action_apply(self):
        self.env['res.partner'].check_access_rights('write')
        """ From selected partners, add corresponding users to chosen portal group. It either granted
            existing user, or create new one (and add it to the group).
        """
        error_msg = self.get_error_messages()
        if error_msg:
            raise UserError("\n\n".join(error_msg))

        for wizard_user in self.sudo().with_context(active_test=False):
            group_portal = wizard_user.wizard_id.portal_id
            if not group_portal.is_portal:
                raise UserError(_('Group %s is not a portal') % group_portal.name)
            user = wizard_user.partner_id.user_ids[0] if wizard_user.partner_id.user_ids else None
            # update partner email, if a new one was introduced
            if wizard_user.partner_id.email != wizard_user.email:
                wizard_user.partner_id.write({'email': wizard_user.email})
            # add portal group to relative user of selected partners
            if wizard_user.in_portal:
                user_portal = None
                # create a user if necessary, and make sure it is in the portal group
                if not user:
                    if wizard_user.partner_id.company_id:
                        company_id = wizard_user.partner_id.company_id.id
                    else:
                        company_id = self.env['res.company']._company_default_get('res.users').id
                    user_portal = wizard_user.sudo().with_context(company_id=company_id)._create_user()
                else:
                    user_portal = user
                wizard_user.write({'user_id': user_portal.id})
                if not wizard_user.user_id.active or group_portal not in wizard_user.user_id.groups_id:
                    if not self._context.get('active_model') == 'hr.applicant':
                        wizard_user.user_id.write({'active': True, 'groups_id': [(4, group_portal.id)]})
                    else:
                        wizard_user.user_id.write({'active': True})
                    # prepare for the signup process
                    wizard_user.user_id.partner_id.signup_prepare()
                    wizard_user.with_context(active_test=True)._send_email()
                wizard_user.refresh()
            else:
                # remove the user (if it exists) from the portal group
                if user and group_portal in user.groups_id:
                    # if user belongs to portal only, deactivate it
                    if len(user.groups_id) <= 1:
                        user.write({'groups_id': [(3, group_portal.id)], 'active': False})
                    else:
                        user.write({'groups_id': [(3, group_portal.id)]})
