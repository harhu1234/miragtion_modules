# -*- coding: utf-8 -*-
{
    'name': "Norway Credit Transfer",
    'summary': """Export payments as Norway Credit Transfer files""",
    'category': 'Accounting/Accounting',
    'description': """
        Generate payment orders as recommended by the Norway norm, thanks to pain.001 messages. Supported pain version (countries) are pain.001.001.03 (generic), pain.001.001.03.ch.02 (Switzerland) and pain.001.003.03 (Germany). The generated XML file can then be uploaded to your bank.

        This module follow the implementation guidelines issued by the Norway Payment Council.
        For more informations about the Norway standards : http://www.iso20022.org/ and http://www.europeanpaymentscouncil.eu/
    """,
    'category': 'Accounting/Accounting',
    'version': '14.0',
    'depends': ['account_batch_payment', 'base_iban'],
    'data': [
        'data/norway.xml',
        'views/account_journal_dashboard_view.xml',
        'views/res_config_settings_views.xml',
        'views/account_payment.xml',
        'views/account_batch_payment_views.xml',
    ],
    'post_init_hook': 'init_initiating_party_names',
    'pre_init_hook' : 'pre_init_check',
    'license': 'OEEL-1',
}
