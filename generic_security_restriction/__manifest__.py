{
    "name": "Generic Security Restriction",
    "version": "11.0.0.1.14",
    "author": "Center of Research and Development",
    "website": "https://crnd.pro",
    "summary": """
        Hide Menu / Restrict Menu /
        Hide Field On The View / Make Field Readonly /
        Hide Stat Button / Change Parameters of M2o Fields:
        ('no_open', 'no_create', 'no_quick_create', 'no_create_edit')
    """,
    'category': 'Technical Settings',
    'depends': [
        'base',
        'web',
    ],
    'data': [
        'security/ir.model.access.csv',
        'views/ir_ui_menu_view.xml',
        'views/res_groups_view.xml',
        'views/res_users_view.xml',
        'views/ir_model_view.xml',
    ],
    'demo': [],
    'installable': True,
    'auto_install': False,
    'application': False,
}
