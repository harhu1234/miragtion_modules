# -*- coding: utf-8 -*-
{
    'name': 'Easy/Quick Stock Movement',
    'version': '1.0',
    'category': 'Inventory',
    'summary': 'Move product stock to any location with easy interface without creating any transfer.',
    'sequence': 1,
    'depends': [
        'product','stock'
    ],
    'data': [
       'wizards/stock_change_product_qty_views.xml'
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
    'author': 'Craftsync Technologies',
    'website': 'https://www.craftsync.com',
    'maintainer': 'Craftsync Technologies',
}
