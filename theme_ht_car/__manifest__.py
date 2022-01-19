# -*- coding: utf-8 -*-
{
    "name": "Car Theme Management",
    "summary": "Car Website Theme",
    'description': '',
    'version': '15.0.0.1',
    'category': 'Theme/Corporate',
    'author': 'Harhu Technologies Pvt. Ltd.',
    'maintainer': 'Harhu Technologies Pvt. Ltd.',
    "website": "www.harhu.com",
    "depends": ['website','crm','website_blog'],
    'data': [
            'template/layout.xml',
            'template/home_page.xml',
            'template/about_page.xml',
            'template/furnitures_page.xml',
            'template/testimonial_page.xml',
            'template/contact_page.xml',
            'template/snippets.xml',
    ],
    'images': [
        'static/src/images/img4.png',
        'static/src/images/img4.png',],
    'assets': {'web.assets_frontend':['/theme_ht_car/static/src/css/bootstrap.min.css',
                                        '/theme_ht_car/static/src/css/style.css',
                                        '/theme_ht_car/static/src/css/responsive.css',
                                        '/theme_ht_car/static/src/css/jquery.mCustomScrollbar.min.css',
                                        '/theme_ht_car/static/src/js/jquery-migrate-3.0.1.min.js',
                                        '/theme_ht_car/static/src/js/bootstrap.bundle.min.js',
                                        '/theme_ht_car/static/src/js/popper.min.js',
                                        '/theme_ht_car/static/src/js/jquery.mCustomScrollbar.concat.min.js',
                                        '/theme_ht_car/static/src/js/custom.js']
    },
    'installable': True,
    'auto_install': False,

}
