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
{
    'name': 'Website Signup Contract',
    'summary': 'Application to sign contract for website signup',
    'version': '14.0.0.1.0',
    'category': 'auth signup',
    'author': 'Jupical Technologies Pvt. Ltd.',
    'maintainer': 'Jupical Technologies Pvt. Ltd.',
    'website': 'http://www.jupical.com',
    'license': 'AGPL-3',
    'depends': [
        'fl_auth_signup',
        'hr_recruitment',
        'web_digital_sign',
        'website',
        'portal',
        'hr_timesheet',
        'project',
        'contacts',
        'calendar',
        'sale_timesheet',
        'hr_contract'
    ],
    'data': [
        'security/security.xml',
        'security/ir.model.access.csv',
        'data/data.xml',
        'data/portal_data.xml',
        'data/cron_email_view.xml',
        'views/signup_contract_template_view.xml',
        'templates/assets.xml',
        'templates/contract_template.xml',
        'views/hr_applicant_view.xml'
    ],
    'qweb': [
        "static/src/xml/base.xml",
    ]
}
