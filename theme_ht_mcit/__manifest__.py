# -*- coding: utf-8 -*-
{
    "name": "MCIT",
    "summary": "MCIT Website",
    'description': '',
    'version': '15.0.0.1',
    'category': 'Theme/Corporate',
    'author': 'Harhu Technologies Pvt. Ltd.',
    'maintainer': 'Harhu Technologies Pvt. Ltd.',
    "website": "www.harhu.com",
    "depends": ['website_sale'],
    'data': [
            'template/layout.xml',
            'template/home_page.xml',
    ],
    'images': [
        'static/src/tes.jpg',
        'static/src/tes.jpg',],

    'assets': {'web.assets_frontend':['/theme_ht_mcit/static/src/intl/in/index_html.css',
                                        '/theme_ht_mcit/static/src/tr/css/vendor-fx__rev883.css',
                                        '/theme_ht_mcit/static/src/tr/css/style-fx__rev883.css',
                                        # '/theme_ht_mcit/static/src/script/vendor__rev2135.js',
                                        # '/theme_ht_mcit/static/src/script/thoapp__rev3180.js'
                                        ],
    },
    'installable': True,
    'auto_install': False,

}
