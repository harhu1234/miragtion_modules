# -*- coding: utf-8 -*-
##############################################################################
#
#    Jupical Technologies Pvt. Ltd.
#    Copyright (C) 2018-Today Jupical Technologies Pvt. Ltd.(<http://www.jupical.com>).
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
    'name': 'Yogaflex Theme',
    'summary': 'Yogaflex multi page responsive theme',
    'version': '15.0.0.1.0',
    'category': 'Theme/Services',
    'author': 'Jupical Technologies Pvt. Ltd.',
    'maintainer': 'Jupical Technologies Pvt. Ltd.',
    'contributors' : ['Anil Kesariya <anil.r.kesariya@gmail.com>'],
    'website': 'http://www.jupical.com',
    'depends': ['website_crm','web','web_editor'],
    'data': [
        'templates/layout.xml',
        'templates/home.xml',
        'templates/about.xml',
        'templates/trainers.xml',
        'templates/blog_home.xml',
        'templates/blog_single.xml',
        'templates/schedule.xml',
        'templates/courses.xml',
        'templates/contact.xml',
        'templates/snippets.xml',
    ],
    'images': [
        'static/description/img.png',
        'static/description/img.png',],

    'assets':{'web.assets_frontend':
                                    [ '/jt_yogaflex_theme/static/src/css/linearicons.css',
                                    '/jt_yogaflex_theme/static/src/css/bootstrap.css',
                                    '/jt_yogaflex_theme/static/src/css/magnific-popup.css',
                                    '/jt_yogaflex_theme/static/src/css/nice-select.css',
                                    '/jt_yogaflex_theme/static/src/css/animate.min.css',
                                    '/jt_yogaflex_theme/static/src/css/owl.carousel.css',
                                    '/jt_yogaflex_theme/static/src/css/jquery-ui.css',
                                    '/jt_yogaflex_theme/static/src/css/main.css',
                                    '/jt_yogaflex_theme/static/src/js/jquery-migrate-3.0.1.min.js',
                                    '/jt_yogaflex_theme/static/src/js/vendor/bootstrap.min.js',
                                    '/jt_yogaflex_theme/static/src/js/easing.min.js',
                                    '/jt_yogaflex_theme/static/src/js/hoverIntent.js',
                                    '/jt_yogaflex_theme/static/src/js/superfish.min.js',
                                    '/jt_yogaflex_theme/static/src/js/jquery.ajaxchimp.min.js',
                                    '/jt_yogaflex_theme/static/src/js/jquery.magnific-popup.min.js',
                                    '/jt_yogaflex_theme/static/src/js/jquery.tabs.min.js',
                                    '/jt_yogaflex_theme/static/src/js/jquery.nice-select.min.js',
                                    '/jt_yogaflex_theme/static/src/js/owl.carousel.min.js',
                                    '/jt_yogaflex_theme/static/src/js/mail-script.js',
                                    '/jt_yogaflex_theme/static/src/js/main.js']

    },
    'license': 'AGPL-3',
    'installable': True,
    'application': True,
    'auto_install': False,
}
