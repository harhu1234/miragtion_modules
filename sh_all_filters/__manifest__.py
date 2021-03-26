# -*- coding: utf-8 -*-
# Part of Softhealer Technologies.
{
    "name": "All in One Filters and Group By - Point of Sale, Sales, Purchase, Inventory, Invoice",
    "author": "Softhealer Technologies",
    "website": "http://www.softhealer.com",
    "category": "Extra Tools",
    "summary": "All in One Filters - Point of Sale, Sales, Purchase, Inventory, Invoice",
    "description": """
    
This module allow user to filter Point of Sale, Sales, Purchase, Invoice, Inventory
User can filter by Today, Yesterday, Current Week, Previous Week, Current Month, Previous Month, Current Year, Previous Year, Expire Yesterday, Expire Tomorrow. Advance Date Filter & Date Group by 
    
                    """,
    "version": "13.0",
    "depends": ["base", "sale", "sale_management", "purchase", "stock", "account"],
    "application": True,
    "data": [
              "views/sale_order_view.xml",
              "views/purchase_view.xml",
              "views/account_view.xml",
              "views/stock_picking_view.xml",
              "views/stock_move_view.xml",
              # "views/pos_view.xml",
    ],
    "auto_install": False,
    "installable": True,
}
