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

import logging
import werkzeug
from odoo import http, _
from odoo.http import request
from odoo.addons.auth_signup.models.res_users import SignupError
from odoo.exceptions import UserError
from odoo.addons.fl_auth_signup.controllers.main import AuthSignupHome
import base64
from datetime import datetime
from odoo.tools import DEFAULT_SERVER_DATE_FORMAT

_logger = logging.getLogger(__name__)


class AuthSignupHome(AuthSignupHome):

    @http.route('/web/signup', type='http', auth='public', website=True,
                sitemap=False)
    def web_auth_signup(self, *args, **kw):
        emp_obj = request.env['hr.employee'].sudo()
        qcontext = self.get_auth_signup_qcontext()
        if kw.get('emp'):
            emp = emp_obj.browse(int(kw.get('emp')))
            if kw.get('upload_file', False):
                file_name = kw.get('upload_file').filename
                file = kw.get('upload_file')
                attachment = base64.b64encode(file.read())

                request.env['ir.attachment'].sudo().create({
                    'name': file_name,
                    'type': 'binary',
                    'datas': attachment,
                    'res_model': 'hr.employee',
                    'res_id': emp.id,
                    'res_name': emp.name
                })

                file_plips_name = kw.get('upload_plips').filename
                file_plips = kw.get('upload_plips')
                plips_attachment = base64.b64encode(file_plips.read())

                request.env['ir.attachment'].sudo().create({
                    'name': file_plips_name,
                    'type': 'binary',
                    'datas': plips_attachment,
                    'res_model': 'hr.employee',
                    'res_id': emp.id,
                    'res_name': emp.name
                })

                file_reg_cc_name = kw.get('upload_reg_CC').filename
                file_reg_cc = kw.get('upload_reg_CC')
                reg_cc_attachment = base64.b64encode(file_reg_cc.read())

                request.env['ir.attachment'].sudo().create({
                    'name': file_reg_cc_name,
                    'type': 'binary',
                    'datas': reg_cc_attachment,
                    'res_model': 'hr.employee',
                    'res_id': emp.id,
                    'res_name': emp.name
                })

                file_car_ins_name = kw.get('upload_car_ins').filename
                file_car_ins = kw.get('upload_car_ins')
                car_ins_attachment = base64.b64encode(file_car_ins.read())

                request.env['ir.attachment'].sudo().create({
                    'name': file_car_ins_name,
                    'type': 'binary',
                    'datas': car_ins_attachment,
                    'res_model': 'hr.employee',
                    'res_id': emp.id,
                    'res_name': emp.name
                })

                file_vog_name = kw.get('upload_vog_3old').filename
                file_vog = kw.get('upload_vog_3old')
                vog_attachment = base64.b64encode(file_vog.read())

                request.env['ir.attachment'].sudo().create({
                    'name': file_vog_name,
                    'type': 'binary',
                    'datas': vog_attachment,
                    'res_model': 'hr.employee',
                    'res_id': emp.id,
                    'res_name': emp.name
                })

                file_license_name = kw.get('upload_licence_f').filename
                file_license = kw.get('upload_licence_f')
                license_attachment = base64.b64encode(file_license.read())

                request.env['ir.attachment'].sudo().create({
                    'name': file_license_name,
                    'type': 'binary',
                    'datas': license_attachment,
                    'res_model': 'hr.employee',
                    'res_id': emp.id,
                    'res_name': emp.name
                })

            if 'nationality' in kw:
                emp.country_id = kw.get('nationality')
            if 'passport_no' in kw:
                emp.passport_id = kw.get('passport_no')
            if 'birthday' in kw:
                emp.birthday = kw.get('birthday')
            if 'emp_id' in kw:
                emp.identification_id = kw.get('emp_id')
            if 'bank' in kw:
                bank_account_id = request.env['res.partner.bank'].sudo().search([('acc_number', '=', kw.get('bank'))])
                if not bank_account_id:
                    bank_account_id = request.env['res.partner.bank'].sudo().create({
                        'acc_number': kw.get('bank')
                    })
                emp.bank_account_id = bank_account_id and bank_account_id.id or False
            if 'gender' in kw:
                emp.gender = kw.get('gender')
            image = kw.get('image').read()
            emp.image = base64.encodestring(image)
        # qcontext['states'] = request.env['res.country.state'].sudo().search([])
        qcontext['countries'] = request.env['res.country'].sudo().search([])

        if not qcontext.get('token') and not qcontext.get('signup_enabled'):
            raise werkzeug.exceptions.NotFound()

        if 'error' not in qcontext and request.httprequest.method == 'POST':
            try:
                self.do_signup(qcontext)
                # Send an account creation confirmation email
                if qcontext.get('token'):
                    user_sudo = request.env['res.users'].sudo().search(
                        [('login', '=', qcontext.get('login'))])
                    template = request.env.ref(
                        'auth_signup.mail_template_user_signup_account_created',
                        raise_if_not_found=False)
                    if user_sudo and template:
                        template.sudo().with_context(
                            lang=user_sudo.lang,
                            auth_login=werkzeug.url_encode({
                                'auth_login': user_sudo.email
                            }),
                        ).send_mail(user_sudo.id, force_send=True)
                if kw.get('emp'):
                    emp = emp_obj.browse(int(kw.get('emp')))
                    domain = [('coach', '=', emp.coach)]
                    contract_template = request.env['signup.contract.template'].sudo().search(domain, limit=1)
                    content = ''
                    if contract_template:
                        content = contract_template.content
                    if content and emp:
                        if content.find('Alle voornamen van de medewerker'):
                            content = content.replace('Alle voornamen van de medewerker', emp.name)
                        if content.find('VOOR- & ACHTERNAAM MEDEWERKER'):
                            content = content.replace('VOOR- & ACHTERNAAM MEDEWERKER', emp.name)
                        if content.find('Adres medewerker') and emp.address_home_id:
                            emp_partner = emp.address_home_id
                            address = []
                            if emp_partner.street:
                                address.append(emp_partner.street)
                            if emp_partner.street2:
                                address.append(emp_partner.street2)
                            if emp_partner.city:
                                address.append(emp_partner.city)
                            if emp_partner.state_id:
                                address.append(emp_partner.state_id.name)
                            if emp_partner.zip:
                                address.append(emp_partner.zip)
                            if emp_partner.country_id:
                                address.append(emp_partner.country_id.name)
                            str_address = ', '.join(address)
                            content = content.replace('Adres medewerker', str_address)
                        if content.find(': DD-MM-JJJJ') and emp.birthday:
                            date_birth = emp.birthday
                            if isinstance(date_birth, str):
                                date_birth = datetime.strptime(date_birth, "%Y-%m-%d")
                            date_birth = date_birth.strftime("%d-%m-%Y")
                            content = content.replace(': DD-MM-JJJJ', ': ' + date_birth)
                        if content.find(': 000000000000') and emp.identification_id:
                            content = content.replace(': 000000000000', ': ' + emp.identification_id)
                        if content.find(': Plaats') and emp.place_of_birth:
                            content = content.replace(': Plaats', ': ' + emp.place_of_birth)
                        if content.find('00 uur per week') and emp.resource_calendar_id:
                            content = content.replace('00 uur per week', emp.resource_calendar_id.name)
                        if content.find(': NL') and emp.bank_account_id:
                            content = content.replace(': NL', emp.bank_account_id.acc_number if \
                                emp.bank_account_id.acc_number else '')
                        contract = request.env['hr.contract'].sudo().search([('employee_id', '=', emp.id)],
                                                                          limit=1)
                        if contract:
                            date_start = contract.date_start
                            date_end = contract.date_end
                            date_start_d = ''
                            date_end_d = ''
                            if isinstance(date_start, str):
                                date_start_d = datetime.strptime(date_start, "%Y-%m-%d")
                            if isinstance(date_end, str):
                                date_end_d = datetime.strptime(date_end, "%Y-%m-%d")
                            if content.find('- DD-MM-JJJJ') and date_start:
                                if date_start_d:
                                    date_start_d = date_start_d.strftime("%d-%m-%Y")
                                    content = content.replace('- DD-MM-JJJJ', str(date_start_d))
                                else:
                                    content = content.replace('- DD-MM-JJJJ', str(date_start))
                            if content.find('€ 0.000') and contract.wage:
                                content = content.replace('€ 0.000',  '€ ' + str(contract.wage))
                            if content.find(' per DD-MM-JJJJ') and date_end:
                                if date_end_d:
                                    date_end_d = date_end_d.strftime("%d-%m-%Y")
                                    content = content.replace(' per DD-MM-JJJJ', ' per ' + str(date_end_d))
                                else:
                                    content = content.replace(' per DD-MM-JJJJ', ' per ' + str(date_end))
                            if content.find('trede 0') and contract.step:
                                content = content.replace('trede 0', 'trede ' + str(contract.step) + ' ')
                            if content.find('01 MAAND') and contract.salary_increase:
                                sal_inc = ''
                                if contract.salary_increase == 'month':
                                    sal_inc = 'MAAND'
                                elif contract.salary_increase == 'week':
                                    sal_inc = 'Week'
                                elif contract.salary_increase == 'year':
                                    sal_inc = 'Jaar'
                                content = content.replace('01 MAAND', '01 ' + sal_inc)
                            if content.find(' 00 maanden') and date_start and date_end:
                                if isinstance(date_start, str):
                                    date_start = datetime.strptime(date_start, DEFAULT_SERVER_DATE_FORMAT)
                                if isinstance(date_end, str):
                                    date_end = datetime.strptime(date_end, DEFAULT_SERVER_DATE_FORMAT)
                                num_months = (date_end.year - date_start.year) * 12 + (
                                            date_end.month - date_start.month)
                                content = content.replace(' 00 maanden', ' ' + str(num_months) + ' maanden')

                return request.render('jt_signup_contract.website_contract_template', {'contract': contract_template,
                                                                                       'content': content})
                # return super(AuthSignupHome, self).web_login(*args, **kw)
            except UserError as e:
                qcontext['error'] = e.name or e.value
            except (SignupError, AssertionError) as e:
                if request.env["res.users"].sudo().search(
                        [("login", "=", qcontext.get("login"))]):
                    qcontext["error"] = _(
                        "Another user is already registered using this email address.")
                else:
                    _logger.error("%s", e)
                    qcontext['error'] = _("Could not create a new account.")

        full_path = http.request.httprequest.full_path
        if 'emp_id' in full_path:
            if 'emp_id=' in full_path:
                emp_id = full_path.partition("emp_id=")[2]
                employee = request.env['hr.employee'].sudo().browse(int(emp_id))
                if employee:
                    qcontext['employee'] = employee
                    if employee.address_home_id:
                        partner = employee.address_home_id
                        qcontext['partner'] = partner

        response = request.render('auth_signup.signup', qcontext)
        response.headers['X-Frame-Options'] = 'DENY'
        return response

    @http.route('/contract_sign_controller', type='http', website=True, auth='public', csrf=False)
    def open_popup_wizard(self, **kw):
        user = request.env.user
        applicant_id = None
        if user:
            # Give access rights
            user.sudo().write({
                'groups_id': [
                    (4, request.env.ref('hr_recruitment.group_hr_recruitment_user').id),
                    (4, request.env.ref('hr.group_hr_user').id),
                ],
            })

            # Get HR Application
            applicant_id = False
            emp = request.env['hr.employee'].sudo().search([('address_home_id', '=', user.partner_id.id)],
                                                           limit=1)
            if emp:
                applicant_id = request.env['hr.applicant'].sudo().search([('emp_id', '=', emp.id)], limit=1)
            if applicant_id and emp:
                # content = kw.get('info')
                content = ''
                domain = [('coach', '=', emp.coach)]
                contract_template = request.env['signup.contract.template'].sudo().search(domain, limit=1)
                if contract_template:
                    content = contract_template.content
                if content and emp:
                    if content.find('Alle voornamen van de medewerker'):
                        content = content.replace('Alle voornamen van de medewerker', emp.name)
                    if content.find('VOOR- & ACHTERNAAM MEDEWERKER'):
                        content = content.replace('VOOR- & ACHTERNAAM MEDEWERKER', emp.name)
                    if content.find('Adres medewerker') and emp.address_home_id:
                        emp_partner = emp.address_home_id
                        address = []
                        if emp_partner.street:
                            address.append(emp_partner.street)
                        if emp_partner.street2:
                            address.append(emp_partner.street2)
                        if emp_partner.city:
                            address.append(emp_partner.city)
                        if emp_partner.state_id:
                            address.append(emp_partner.state_id.name)
                        if emp_partner.zip:
                            address.append(emp_partner.zip)
                        if emp_partner.country_id:
                            address.append(emp_partner.country_id.name)
                        str_address = ', '.join(address)
                        content = content.replace('Adres medewerker', str_address)
                    if content.find(': DD-MM-JJJJ') and emp.birthday:
                        date_birth = emp.birthday
                        if isinstance(date_birth, str):
                            date_birth = datetime.strptime(date_birth, "%Y-%m-%d")
                        date_birth = date_birth.strftime("%d-%m-%Y")
                        content = content.replace(': DD-MM-JJJJ', ': ' + date_birth)
                    if content.find(': 000000000000') and emp.identification_id:
                        content = content.replace(': 000000000000', ': ' + emp.identification_id)
                    if content.find(': Plaats') and emp.place_of_birth:
                        content = content.replace(': Plaats', ': ' + emp.place_of_birth)
                    if content.find('00 uur per week') and emp.resource_calendar_id:
                        content = content.replace('00 uur per week', emp.resource_calendar_id.name)
                    if content.find(': NL') and emp.bank_account_id:
                        content = content.replace(': NL', emp.bank_account_id.acc_number if \
                            emp.bank_account_id.acc_number else '')
                    contract = request.env['hr.contract'].sudo().search([('employee_id', '=', emp.id)],
                                                                        limit=1)
                    if contract:
                        date_start = contract.date_start
                        date_end = contract.date_end
                        date_start_d = ''
                        date_end_d = ''
                        if isinstance(date_start, str):
                            date_start_d = datetime.strptime(date_start, "%Y-%m-%d")
                        if isinstance(date_end, str):
                            date_end_d = datetime.strptime(date_end, "%Y-%m-%d")
                        if content.find('- DD-MM-JJJJ') and date_start:
                            if date_start_d:
                                date_start_d = date_start_d.strftime("%d-%m-%Y")
                                content = content.replace('- DD-MM-JJJJ', str(date_start_d))
                            else:
                                content = content.replace('- DD-MM-JJJJ', str(date_start))
                        if content.find('€ 0.000') and contract.wage:
                            content = content.replace('€ 0.000', '€ ' + str(contract.wage))
                        if content.find(' per DD-MM-JJJJ') and date_end:
                            if date_end_d:
                                date_end_d = date_end_d.strftime("%d-%m-%Y")
                                content = content.replace(' per DD-MM-JJJJ', ' per ' + str(date_end_d))
                            else:
                                content = content.replace(' per DD-MM-JJJJ', ' per ' + str(date_end))
                        if content.find('trede 0') and contract.step:
                            content = content.replace('trede 0', 'trede ' + str(contract.step) + ' ')
                        if content.find('01 MAAND') and contract.salary_increase:
                            sal_inc = ''
                            if contract.salary_increase == 'month':
                                sal_inc = 'MAAND'
                            elif contract.salary_increase == 'week':
                                sal_inc = 'Week'
                            elif contract.salary_increase == 'year':
                                sal_inc = 'Jaar'
                            content = content.replace('01 MAAND', '01 ' + sal_inc)
                        if content.find(' 00 maanden') and date_start and date_end:
                            if isinstance(date_start, str):
                                date_start = datetime.strptime(date_start, DEFAULT_SERVER_DATE_FORMAT)
                            if isinstance(date_end, str):
                                date_end = datetime.strptime(date_end, DEFAULT_SERVER_DATE_FORMAT)
                            num_months = (date_end.year - date_start.year) * 12 + (
                                    date_end.month - date_start.month)
                            content = content.replace(' 00 maanden', ' ' + str(num_months) + ' maanden')

                applicant_id.write({
                    'contract_content': content,
                    'signed_contract': True,
                })
                pdf = request.env.ref('jt_signup_contract.contract_detail').sudo().render_qweb_pdf([applicant_id.id])[0]
                b64_pdf = base64.b64encode(pdf)
                applicant_id.write({
                    'contract_content_pdf': b64_pdf
                })
            else:
                applicant_id = request.env['hr.applicant'].sudo().create({
                    'name': "New User Registration",
                    'partner_name': user.partner_id.name,
                    'email_from': user.partner_id.email,
                    'contract_content': kw.get('info'),
                    'signed_contract': True,
                })

            # Link user to employee
            if applicant_id.emp_id:
                employee = applicant_id.emp_id
                employee.user_id = user.id

        # Set Final Value of Application
        if not applicant_id:
            applicant_id = ''
        else:
            applicant_id = applicant_id

        if applicant_id and applicant_id.emp_id:
            # Redirect to Employee Form (?enable_editor=1 not working)
            url = '/web#id={0}&view_type={1}&model={2}'.format(
                applicant_id.emp_id.id, 'form', 'hr.employee')
            return werkzeug.utils.redirect(url)
        elif applicant_id:
            # Redirect to HR Application Form (?enable_editor=1 not working)
            url = '/web#id={0}&view_type={1}&model={2}'.format(
                applicant_id.id, 'form', 'hr.applicant')
            return werkzeug.utils.redirect(url)
        else:
            # Redirect to HR Application Form (?enable_editor=1 not working)
            url = '/web#id={0}&view_type={1}&model={2}'.format(
                applicant_id, 'form', 'hr.applicant')
            return werkzeug.uti.ls.redirect(url)
