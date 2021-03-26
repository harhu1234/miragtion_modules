# -*- coding: utf-8 -*-
##########################################################################
# Author      : Webkul Software Pvt. Ltd. (<https://webkul.com/>)
# Copyright(c): 2017-Present Webkul Software Pvt. Ltd.
# All Rights Reserved.
#
#
#
# This program is copyright property of the author mentioned above.
# You can`t redistribute it and/or modify it.
#
#
# You should have received a copy of the License along with this program.
# If not, see <https://store.webkul.com/license.html/>
##########################################################################


{
    'name': 'ODOO Email CC and BCC',
    'summary': 'Add CC and BCC feature in mail',
    'category': 'Marketing',
    'version': '13.0.0.0',
    'sequence': 1,
    'author': "Webkul Software Pvt. Ltd.",
    'website': 'https://store.webkul.com',
    'description': """Add CC and BCC feature in mail""",
    'depends': ['mail'],
    'data': [
        'views/compose_view.xml',

    ],
    "application":  True,
    "installable":  True,
    "auto_install":  False,
    "pre_init_hook":  "pre_init_check",
}
