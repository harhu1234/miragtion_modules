# -*- coding: utf-8 -*-
{
    'name': 'Product Sale Price History',

    'author': 'Softhealer Technologies',

    'website': 'https://www.softhealer.com',

    "support": "info@softhealer.com",

    'version': '14.0.0',

    'category': 'Sales',

    'summary': 'This module useful to show history of sale price for product, you can also track history of sale price of product for different customers. Easy to find rates you given to that customer in past for that product.',

    'description': """This module useful to show history of sale price for product, you can also track history of sale price of product for different customers. Easy to find rates you given to that customer in past for that product.

Features:

Easy to specify no of items you want to keep as previous history.
Easy to filter records by status of sale order (confirmed, done or both).
Useful to get sales price given in past for that product with customer, sales person, qty, etc important details.""",

    'depends': ['sale_management'],

    'data': [
    
        'security/ir.model.access.csv',
        'views/res_config_settings.xml',
        'views/sale_price_history.xml',
    ],

    'auto_install': False,
    'installable': True,
    'application': True,
}
