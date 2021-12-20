# -*- coding: utf-8 -*-

##############################################################################
#
#    Harhu Technologies Pvt. Ltd.
#    Copyright (C) 2019-Today Harhu Technologies Pvt. Ltd.(<http://www.harhu.com>).
#    Author: Harhu Technologies Pvt. Ltd. (<http://www.harhu.com>) Contact: <hello@harhu.com>
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
    'name': 'Salon Management Theme',
    'summary': 'Webiste salon Management Theme',
    'description': '',
    'version': '14.0.0.1',
    'category': 'Theme/salon',
    'author': 'Harhu IT Solutions',
    'maintainer': 'Harhu IT Solutions',
    'contributors': ["Harhu IT Solutions"],
    'website': 'http://www.harhu.com',
    'live_test_url': 'https://www.harhu.com/contactus',
    'depends': ['website','website_crm','crm','website_blog'],
    'data': [
            'template/assets.xml',
            'template/layout.xml',
            'template/home_page.xml',
            'template/service_page.xml',
            'template/gallery_page.xml',
            'template/about_page.xml',
            'template/blog_page.xml',
            'template/contact_page.xml',
            'template/snippets.xml',
            'template/contact_thank_you_page.xml',
    ],
    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
}
