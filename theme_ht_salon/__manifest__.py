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
    'version': '15.0.0.1',
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
    'images': [
        'static/description/1.jpg',
        'static/description/1.jpg',],
    'assets':{'theme_ht_salon.assets_wysiwyg':[
                                        '/theme_ht_salon/static/src/css/open-iconic-bootstrap.min.css',
                                        '/theme_ht_salon/static/src/css/animate.css',
                                        '/theme_ht_salon/static/src/css/owl.carousel.min.css',
                                        '/theme_ht_salon/static/src/css/owl.theme.default.min.css',
                                        '/theme_ht_salon/static/src/css/magnific-popup.css',
                                        '/theme_ht_salon/static/src/css/aos.css',
                                        '/theme_ht_salon/static/src/css/ionicons.min.css',
                                        '/theme_ht_salon/static/src/css/bootstrap-datepicker.css',
                                        '/theme_ht_salon/static/src/css/jquery.timepicker.css',
                                        '/theme_ht_salon/static/src/css/flaticon.css',
                                        '/theme_ht_salon/static/src/css/icomoon.css',
                                        '/theme_ht_salon/static/src/css/style.css',
                                        '/theme_ht_salon/static/src/js/jquery-migrate-3.0.1.min.js',
                                        '/theme_ht_salon/static/src/js/popper.min.js',
                                        '/theme_ht_salon/static/src/js/bootstrap.min.js',
                                        '/theme_ht_salon/static/src/js/jquery.easing.1.3.js',
                                        '/theme_ht_salon/static/src/js/jquery.waypoints.min.js',
                                        '/theme_ht_salon/static/src/js/jquery.stellar.min.js',
                                        '/theme_ht_salon/static/src/js/owl.carousel.min.js',
                                        '/theme_ht_salon/static/src/js/jquery.magnific-popup.min.js',
                                        '/theme_ht_salon/static/src/js/aos.js',
                                        '/theme_ht_salon/static/src/js/jquery.animateNumber.min.js',
                                        '/theme_ht_salon/static/src/js/bootstrap-datepicker.js',
                                        '/theme_ht_salon/static/src/js/jquery.timepicker.min.js',
                                        '/theme_ht_salon/static/src/js/scrollax.min.js',
                                        '/theme_ht_salon/static/src/js/main.js'
                                        ]
    },
    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
}
