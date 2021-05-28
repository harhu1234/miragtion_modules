# -*- coding: utf-8 -*-
{
    "name": "Odoo Facebook Messenger Chat",
    "summary": """The Facebook Messenger chat widget will be visible in the odoo website.""",
    "category": "Website",
    "version": "13.0.0",
    "sequence": 1,
    "depends": ['website'],
    "data": [
        'views/res_config_views.xml',
        'views/templates.xml',
    ],
    "demo": [],
    "application": True,
    "installable": True,
    "auto_install": False,
    "pre_init_hook": "pre_init_check",
}
