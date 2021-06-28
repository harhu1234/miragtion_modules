    # -*- coding: utf-8 -*-
{
    "name": "Default product of customer",
    "summary": """Add Default product of customer on sale order""",
    "category": "Sale",
    "version": "13.0.0",
    "depends": ['sale_management'],
    "data": [
            'security/ir.model.access.csv',
            'views/customer_product.xml',
    ],
    "application": True,
    "installable": True,
    "auto_install": False,
}
