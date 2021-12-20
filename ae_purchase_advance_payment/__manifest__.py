# -*- coding: utf-8 -*-
{
    'name': 'Purchase Advance Payment',
    'version': '14.0.1.0',
    'sequence': 1,
    'category': 'Purchases',
    'description':
        """
  This Module add below functionality into odoo

        1.Make Advance payment of purchase order\n

    Odoo vendor payment 
    Odoo vendor Advance payment 
    Odoo supplier Advance payment 
    Odoo vendor purchase Advance payment 
    Odoo supplier purchase Advance payment 
Purchase advance payment 
Odoo purchase advance payment 
Manage purchase advance payment 
Odoo manage purchase advance payment 
Configure Advance Payment Product into Purchase Settings
Odoo Configure Advance Payment Product into Purchase Settings
Advance payment manage 
Odoo advance payment manage 
Purchase payment 
Odoo purchase payment 
Manage purchase payment 
Odoo manage purchase payment 
Odoo application allows you to Make Advance Payment of vendor/supplier on Purchase Order by percentage/fixed.
Purchase down payment
Odoo purchase down payment 

    """,
    'summary': 'odoo app allow to generate purchase advance payment (Fixed/percentage) On purchase order,vendor Advance payment,supplier Advance payment,Purchase advance payment ,Advance Payment Product, Advance down payment purchase',
    'depends': ['purchase', 'account'],
    'data': [
        'security/ir.model.access.csv',
        'views/res_config_settings_views.xml',
        'wizard/purchase_down_payment_views.xml',
        'views/purchase_views.xml'
        ],
    'installable': True,
    'application': True,
    'auto_install': False,
}
    
