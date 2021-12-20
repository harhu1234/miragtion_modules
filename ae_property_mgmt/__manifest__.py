# -*- coding: utf-8 -*-
##############################################################################
#
#    AtharvERP Business Solutions
#    Copyright (C) 2020-TODAY AtharvERP Business Solutions(<http://www.atharverp.com>).
#    Author: AtharvERP Business Solutions(<http://www.atharverp.com>)
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
    'name': "Property Management",
    'version': '14.0.0.1.0',
    'summary': 'Property Management System',
    'category': 'Account',
    'author': 'AtharvERP Business solution',
    'maintainer': 'AtharvERP Business solution',
    'website': 'http://atharverp.com',
    'live_test_url': 'http://atharverp.com/contactus',
    'depends': ['account','base'],
    'demo': [
        'data/demo_data.xml'],
    'data': [
        'security/ir.model.access.csv',
        'data/sequence_data.xml',
        'wizard/create_tenancy_wizard.xml',
        'wizard/create_payment_wizard.xml',
        'wizard/buy_property_view.xml',
        'views/property_view.xml',
        'views/account_move_view.xml',
        'views/facility_service.xml',
        'views/tenancy_agreement_view.xml',
        'views/res_partner_view.xml',
        
    ],
    'license': 'AGPL-3',
    "application":  True,
    "installable":  True,
    "auto_install":  False,
}
