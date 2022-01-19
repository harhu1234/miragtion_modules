# -*- coding: utf-8 -*-

{
    'name': 'Create Contacts On Out Lead',
    'version': '14.0.0.1.0',
    'summary': 'Create contacts form lead',
    'author': 'Harhu Technologies Pvt. Ltd.',
    'website': 'http://www.harhutech.com',
    'license': 'AGPL-3',
    'depends': ['crm'],
    'data': [
             'security/ir.model.access.csv',
             'views/crm_lead_view.xml',
             'views/res_partner_views.xml',
             'wizard/questions_export_wiz_view.xml'
             ],
	'qweb': [],
    'demo': [],
    'test': [],
    'installable': True,
    'auto_install': False,
}