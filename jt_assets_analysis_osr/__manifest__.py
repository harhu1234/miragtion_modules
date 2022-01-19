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
    'name': 'Assets Analysis Report',
    'summary': 'Assets Analysis Report',
    'version': '14.0.0.1.0',
    'category': 'Accounting',
    'author': 'Jupical Technologies Pvt. Ltd.',
    'maintainer': 'Jupical Technologies Pvt. Ltd.',
    'website': 'http://www.jupical.com',
    'live_test_url': 'http://jupical.com/contactus',
    'depends': [
        'account_asset', 'account_accountant',
    ],
    'data': [
        'security/ir.model.access.csv',
        'data/data.xml',
        'views/assets.xml',
        'report/assets_analysis_report.xml',
        'views/assets_analysis_report.xml',
        'wizard/assets_report_wizard_view.xml',
    ],
    'qweb': [
        'static/src/xml/onscreen_report_template.xml',
    ],
    'application': False,
    'installable': True,
    'auto_install': False,
}
