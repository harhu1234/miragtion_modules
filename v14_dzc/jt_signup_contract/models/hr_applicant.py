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

from odoo import fields, models, api, _
from datetime import datetime
from dateutil.relativedelta import relativedelta
import re
import base64
from odoo.addons.portal.wizard.portal_wizard import extract_email
from odoo.tools import DEFAULT_SERVER_DATE_FORMAT

class HRApplicant(models.Model):

    _inherit = 'hr.applicant'

    sign = fields.Binary(string='Digital Sign')
    contract_content = fields.Text(string="Signed Contract", copy=False)
    contract_content_pdf = fields.Binary(string="Signed Contract PDF", copy=False)
    signed_contract = fields.Boolean(string='Contract Signed?', copy=False)
    timesheet_cost = fields.Float(string="Timesheet Cost", copy=False)

    @api.model
    def search_read(self, domain=None, fields=None, offset=0, limit=None, order=None):
        domain = domain or []
        if self.env.user.has_group('jt_signup_contract.group_application_user'):
            emp = self.env['hr.employee'].search([('user_id', '=', self.env.user.id)], limit=1)
            if emp:
                apps = self.sudo().search([('emp_id', '=', emp.id)]).ids
                domain.append(('id', 'in', apps))
        res = super(HRApplicant, self).search_read(domain=domain, fields=fields, offset=offset,
                                                      limit=limit, order=order)
        return res


    def get_current_root_url(self):
        return self.env["ir.config_parameter"].sudo().get_param("web.base.url")

    def update_contract_content_in_pdf(self):
        for record in self:
            pdf = self.env.ref('jt_signup_contract.contract_detail').sudo()._render_qweb_pdf([record.id])[0]
            b64_pdf = base64.b64encode(pdf)
            record.contract_content_pdf = b64_pdf

    def resend_contract_link(self):
        if not self.signed_contract:
            config_obj = self.env["ir.config_parameter"].sudo()
            url = ''
            base_url = config_obj.get_param("web.base.url")
            url += base_url + '/web/signup?db=' + self.env.cr.dbname + '&token='
            user_obj = self.env['res.users']
            user = False
            if self.emp_id and self.emp_id.user_id:
                user = self.emp_id.user_id
            elif self.emp_id and not self.emp_id.user_id and self.email_from:
                if '<' in self.email_from:
                    email = re.search('<(.*)>', self.email_from)
                    email = email.group(0)
                    email = email[1:-1]
                else:
                    email = self.email_from
                user = user_obj.search([('login', '=', email)], limit=1)
            if not user:
                company_id = self.env.user.company_id.id
                # proj_user_group = self.env.ref('project.group_project_user').id
                # timesheet_group = self.env.ref('hr_timesheet.group_hr_timesheet_user').id
                emp_group = self.env.ref('base.group_user').id
                app_user_group = self.env.ref('jt_signup_contract.group_application_user').id
                # portal_group = self.env.ref('base.group_portal').id
                user = self.env['res.users'].with_context(no_reset_password=True).create({
                    'email': extract_email(self.email_from),
                    'login': extract_email(self.email_from),
                    'partner_id': self.emp_id.address_home_id.id if self.emp_id.address_home_id else False,
                    'company_id': company_id,
                    'company_ids': [(6, 0, [company_id])],
                    'groups_id': [(6, 0, [emp_group, app_user_group])],
                })
            if user:
                partner = user.partner_id
                lang = user.lang if user.lang else False
                expiration = datetime.now() + relativedelta(days=7)
                partner.signup_prepare(expiration=expiration)
                portal_url = url + partner.signup_token
                # portal_url = partner.with_context(signup_force_type_in_url='', lang=lang)._get_signup_url_for_action()[
                    # partner.id]
                portal_url += '&emp_id=' + str(self.emp_id.id)
                
                template = self.env.ref('jt_signup_contract.mail_template_application_portal_welcome')
                if template:
                    emp_id = self.emp_id.id
                    user.signup_url = portal_url
                    template.with_context(dbname=self._cr.dbname, portal_url=portal_url, lang=lang).send_mail(
                    user.id, force_send=True)                   

    def create_employee_from_applicant(self):
        self.ensure_one()
        res = super(HRApplicant, self).create_employee_from_applicant()
        emp_id = res.get('res_id')
        partner_id = False
        email = False
        if emp_id:
            emp = self.env['hr.employee'].browse(emp_id)
            emp.timesheet_cost = self.timesheet_cost
            partner_id = emp.address_home_id and emp.address_home_id.id or False
        if not self.signed_contract:
            action = self.env.ref(
                'portal.partner_wizard_action', raise_if_not_found=False)
            if action and partner_id:
                result = action.read([])[0]
                result['active_id'] = partner_id
                result['active_ids'] = [partner_id]
                result['context'] = {'default_emp_id': emp_id or False,
                                     'default_user_ids': [(0, 0, {
                                         'partner_id': partner_id,
                                         'email': self.email_from,
                                         'in_portal': False,
                                     })]}
                return result
        return res


class HREmployee(models.Model):

    _inherit = 'hr.employee'

    coach = fields.Selection([('junior', 'Junior'),
                              ('senior', 'Senior')], string="Coach", default='junior')

    @api.model
    def default_get(self, fields):
        res = super(HREmployee, self).default_get(fields)
        res.update({
            'marital': ''
        })
        return res

class HRContract(models.Model):

    _inherit = 'hr.contract'

    step = fields.Integer('Step Layout')
    salary_increase = fields.Selection([('month', 'Month'),
                                        ('year', 'Year'),
                                        ('week', 'Week')], string="Periodic Salary Increase per",
                                                    default='month')
    def contract_due_notify(self):
        contract_due = datetime.today() + relativedelta(days=90)
        mail_server = self.env['ir.mail_server']
        for contract in self.env['hr.contract'].search([]):
            end_date = datetime.strptime(contract.date_end, DEFAULT_SERVER_DATE_FORMAT)
            if end_date == contract_due:
                employee_name = contract.employee_id and contract.employee_id.name
                body_html = "Beste collega,"
                body_html += "\n\n"
                body_html += "Het contract van ….  %s zal verlopen op (%s)."%(employee_name, contract.date_end)
                body_html += "\n"
                body_html += "Graag bij verlenging tijdig een nieuw getekende arbeidsovereenkomst aan leveren bij de Back-office."
                body_html += "\n"
                body_html += "Bij geen verlenging ontvangen wij graag een getekende ontslagbrief."
                body_html += "\n"
                body_html += "Met vriendelijke groeten,"
                body_html += "\n\n"
                body_html += "De Back-Office,"
                message = mail_server.sudo().build_email(
                    email_from=self.sudo().env.user.email,
                    subject=_(u'Contract due reminder'),
                    body=body_html,
                    subtype='html',
                    email_to=['ai@de-zorgcoach.nl'],
                    email_bcc=['back-office@de-zorgcoach.nl'],
                )
                mail_server.sudo().send_email(message)