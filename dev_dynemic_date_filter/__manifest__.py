# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2015 DevIntelle Consulting Service Pvt.Ltd (<http://www.devintellecs.com>).
#
#    For Module Support : devintelle@gmail.com  or Skype : devintelle 
#
##############################################################################

{
	'name': 'Dynamic Date Filter for all Application',
	'version': '12.0.1.0',
	'category': 'Generic Modules/Sales Management',
	'sequence': 1,
	'description': """
		Odoo app will add Dynamic Date Filter for all application.
		
		Dynamic Date Filter
		odoo Dynamic Date Filter

		 odoo app will Add filter Yesterday, Today, Last 7 Days, Last 30 Days, This Year Filter and Group by Filter with Week, Month, Year in Sale Order, Purchase Order, Account Invoice, Stock Picking, Account Payment, Journal Items , Journal Entries and Inventory Adjustment
		
		Today Date filter, Date filter, Yesterday date filter, week filter, last 7 days filter, month date filter, last 30 dayes date filter,
		whole year date filter, this year date filter , current date filter, 
		
		Current day group by date filter, Today date group by filter, last 7 days date group by filter, last month group by date filter, last 30 days month filter, last year group by date filter, last 365 days group by date filter
		
Advance date filter
Advance date filter odoo
Create advance date filter 
Easily create advance date filter
Create advance date filter in odoo
Easily create advance date filter
Advance date filter and date group by
Date filtering
Date filtering odoo
Sales order date filtering
Purchase order date filtering
Date filter
Date filter odoo
Point of Sale filter by Today, Yesterday, Current Week, Previous Week, Current Month, Previous Month, Current Year, Previous Year.
Group By Day, Week, Month, Year
Date filtration
Odoo date filtration
Odoo advance date filter
Easily create advance date filter and dte group by
Easily create sales advance date filter   
Dynamic date filter 
Odoo dynamic date filter 
Dynamic date filter for all application 
Odoo dynamic date filter for all application 
Date filter for application 
Odoo date filter for application 
odoo Dynamic Date Filter for all Application will help to add dynamic date filter in any model like sale order
User can add and remove date filter in any model any application in odoo.
Add date filter 
Odoo date filter 
Date filter in search 
Odoo date filter in search 
Manage date filter 
Odoo manage date filter 
		
		
	""",
	'summary':"Odoo app will add Dynamic Date Filter for all application",
	'depends': ['sale_management','purchase','sale_stock'],
	'data': [
		'security/security.xml',
		'security/ir.model.access.csv',
		'views/set_filter_views.xml',
	],
	'demo': [],
	'test': [],
	'css': [],
	'qweb': [],
	'js': [],
	'installable': True,
	'application': True,
	'auto_install': False,
	
	# author and support Details =============#
	'author': 'DevIntelle Consulting Service Pvt.Ltd',
	'website': 'http://www.devintellecs.com',    
	'maintainer': 'DevIntelle Consulting Service Pvt.Ltd', 
	'support': 'devintelle@gmail.com',
}
# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:

