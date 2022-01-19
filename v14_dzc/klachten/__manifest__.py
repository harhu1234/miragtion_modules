# -*- coding: utf-8 -*-
{
    'name': "Klachten",
    'version': "14.0.1.0.0",
    'author': "N-dev",
    'category': "Tools",
    'support': "golubev@svami.in.ua",
    'summary': "A klachten / support ticket system",
    'description': """
        Easy to use klachten system
        with teams and website portal
    """,
    'license':'LGPL-3',
    'data': [
        'security/klachten_security.xml',
        'security/ir.model.access.csv',
        'views/klachten_tickets.xml',
        'views/klachten_team_views.xml',
        'views/klachten_stage_views.xml',
        'views/klachten_data.xml',
        'views/res_config_views.xml',
        'views/klachten_templates.xml',
        'views/klachten_tag_views.xml',

    ],
    'demo': [
        'demo/klachten_demo.xml',
    ],
    'images': ['static/description/banner.jpg'],
    'depends': ['base', 'mail', 'portal',],
    'application': True,
}
