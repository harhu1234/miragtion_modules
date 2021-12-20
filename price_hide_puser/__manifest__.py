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
    'name': 'Hide products prices for public users',
    'summary': 'Hide prices from specific website for public user configurable',
    'version': '14.0.0.1.0',
    'category': 'website',
    'author': "AtharvERP Business solution",
    'maintainer': 'AtharvERP Business solution',
    'website': "http://www.atharverp.com",
    'depends': ['website_sale', 'website_sale_wishlist', 'website_sale_comparison'],
    'data': [
        'views/asserts.xml',
        'views/website_view.xml',
        'views/website_template.xml',
    ],
    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
}
