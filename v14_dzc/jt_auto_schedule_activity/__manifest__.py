{
    'name': 'Auto Schedule Activity',
    'summary': '',
    'version': '14.0.0.1.0',
    'category': '',
    'data': [
        'security/ir.model.access.csv',
        'views/auto_schedule_activity.xml',
        'views/crm_view.xml',
        'data/data.xml',
    ],
    'depends' : ['crm', 'hr_recruitment','web_notify'],
    'application' : True,
    'installable' : True,
    'auto_install' : False,
}
