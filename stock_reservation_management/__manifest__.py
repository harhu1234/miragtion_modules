{
  
  # App information
   
    'name': 'Easy Stock Reservation Management',
    'version': '12.0',
    'category': 'stock',
    'summary': """Manage Stock Reservation and Release of stock easily.""",
    
   # Dependencies
   
   'depends': ['sale','sale_stock'],
   
    # Views
   
    'data': [
          'views/product_product.xml'
	],
   
   
    # Technical 
    
    'installable': True,
    'auto_install': False,
    'application': True,
          
    
}
