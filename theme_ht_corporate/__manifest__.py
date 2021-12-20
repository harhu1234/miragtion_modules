# -*- coding: utf-8 -*-
{
    "name": "Harhu Theme Management",
    "summary": "Harhu Website Theme",
    'description': '',
    'version': '15.0.0.1',
    'category': 'Theme/Corporate',
    'author': 'Harhu Technologies Pvt. Ltd.',
    'maintainer': 'Harhu Technologies Pvt. Ltd.',
    "website": "www.harhu.com",
    "depends": ['website','crm'],
    'data': [
            'template/layout.xml',
            'template/home_page.xml',
            'template/about_page.xml',
            'template/counselor_page.xml',
            'template/services_page.xml',
            'template/pricing_page.xml',
            'template/contact_page.xml',
            'template/snippets.xml',
    ],
    'images': [
        'static/src/images/staff-2.jpg',
        'static/src/images/staff-2.jpg',],
    'assets':{'web.assets_frontend':[
                                        '/theme_ht_corporate/static/src/css/animate.css',
                                        '/theme_ht_corporate/static/src/css/owl.carousel.min.css',
                                        '/theme_ht_corporate/static/src/css/owl.theme.default.min.css',
                                        '/theme_ht_corporate/static/src/css/magnific-popup.css',
                                        '/theme_ht_corporate/static/src/css/flaticon.css',
                                        '/theme_ht_corporate/static/src/css/style.css',
                                        '/theme_ht_corporate/static/src/js/jquery-migrate-3.0.1.min.js',
                                        '/theme_ht_corporate/static/src/js/popper.min.js',
                                        '/theme_ht_corporate/static/src/js/bootstrap.min.js',
                                        '/theme_ht_corporate/static/src/js/jquery.easing.1.3.js',
                                        '/theme_ht_corporate/static/src/js/jquery.waypoints.min.js',
                                        '/theme_ht_corporate/static/src/js/jquery.stellar.min.js',
                                        '/theme_ht_corporate/static/src/js/owl.carousel.min.js',
                                        '/theme_ht_corporate/static/src/js/jquery.magnific-popup.min.js',
                                        '/theme_ht_corporate/static/src/js/jquery.animateNumber.min.js',
                                        '/theme_ht_corporate/static/src/js/scrollax.min.js',
                                        '/theme_ht_corporate/static/src/js/main.js'
                                    ]
            },
    'installable': True,
    'auto_install': False,

}
