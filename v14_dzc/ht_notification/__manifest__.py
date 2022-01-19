# -*- coding: utf-8 -*-
###################################################################################
#
#    Harhu IT Solutions
#    Copyright (C) 2019-TODAY Harhu IT Solutions (http://harhutech.com).
#    Author: Harhu IT Solutions (http://harhutech.com)
#
#    you can modify it under the terms of the GNU Affero General Public License (AGPL) as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#
###################################################################################
{
    'name': 'Crm Notification',
    'version': '14.0.0.1',
    'summary': 'CRM Notification',
    'category': 'CRM',
    'author': 'Harhu IT Solutions',
    'maintainer': 'Harhu IT Solutions',
    'website': 'http://harhutech.com',

    'depends': [
        'crm',
    ],
    'data': [
        'security/ir.model.access.csv',
        'views/notification_view.xml',
        'data/cron.xml',
    ],
    'license': 'LGPL-3',
    'auto_install': False,
}