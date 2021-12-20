# -*- coding:utf-8 -*-

from odoo import models,fields,api,_
import io
import base64
from odoo.tools.misc import xlsxwriter

class ExcelOffers(models.TransientModel):

     _name = 'export.excel.offers'
     _description = 'Excel Offers'

     excel_file = fields.Binary(string='File')
     filename = fields.Char(string='File name')

     def print_offers_excel(self):

          output = io.BytesIO()

          workbook = xlsxwriter.Workbook(output,{'in_memory':True})
          sheet = workbook.add_worksheet('Offers')
          header_style = workbook.add_format({'bold': True, 'font_color': 'white', 'bg_color': '#808080','align':'center'})
          data_style = workbook.add_format({'align':'center','text_wrap': True})
          price_style = workbook.add_format({'bg_color': '#F0F0F0', 'font_color': '#808080'})
          report_style = workbook.add_format({'bold': True})
          report_style.set_align('center')
          report_style.set_align('vcenter')
          filename_1 = "offers.xls"
          row = 0
          col = 0

          sheet.merge_range(row, col, 7, 1,'')
          if self.env.user and self.env.user.company_id and self.env.user.company_id.logo:
               filename = 'logo.png'
               image_data = io.BytesIO(base64.standard_b64decode(self.env.user.company_id.logo))
               sheet.insert_image(0, 0, filename,
                                  {'image_data': image_data, 'x_offset': 7, 'y_offset': 3, 'x_scale': 0.9,
                                   'y_scale': 1})

          company = self.env.user.company_id
          if company:
               address = ""
               address += company.name + "\n"
               address += company.street + "\n"
               if company.street2:
                    address += company.street2 + "\n"
               address += company.city + "-" + company.state_id.name + "-" + company.zip + "\n"
               if company.country_id:
                    address += company.country_id.name + "\n"
               if company.email:
                    address += company.email + "\n"
               if company.website:
                    address += company.website + "\n"
               if company.country_id.name == 'India' and company.vat:
                    address += "GST IN" + "-" + company.vat + "\n"
               elif company.country_id and company.vat:
                    address += "Tax ID" + "-" + company.vat + "\n"
               if company.company_registry:
                    address += "Company Registry" + "-" + company.company_registry or "" + "\n"

          sheet.merge_range(row, col, 7, col + 6, address,report_style)

          row += 9
          col = 0

          sheet.set_column(col,col,17)
          sheet.write(row, col, _('Offer'), header_style)
          col += 1
          sheet.write(row, col, _('Type'), header_style)
          col += 1
          sheet.set_column(col, col, 15)
          sheet.write(row,col,_('Service'),header_style)
          col += 1
          sheet.set_column(col,col,15)
          sheet.write(row, col, _('Start Date'), header_style)
          col += 1
          sheet.set_column(col, col, 15)
          sheet.write(row, col, _('End Date'), header_style)
          col += 1
          sheet.set_column(col, col, 15)
          sheet.write(row, col, _('Service Price'), header_style)
          col += 1
          sheet.set_column(col, col, 15)
          sheet.write(row, col, _('Offer Price'), header_style)

          row += 1
          col = 0

          offers_ids = self.env['offer.service'].browse(self.env.context.get('active_ids'))
          for offer in offers_ids:

               sheet.write(row,col,offer.name,data_style)
               col +=1
               sheet.write(row,col,offer.type,data_style)
               col += 1
               name_list = []
               for service in offer.service_ids:
                    name_list.append(service.name)
               sheet.write(row,col,','.join(name_list),data_style)
               col += 1
               sheet.write(row,col,str(offer.start_date),data_style)
               col += 1
               sheet.write(row,col,str(offer.end_date),data_style)
               col += 1
               sheet.write(row,col,offer.service_price)
               col += 1
               sheet.write(row,col,offer.offer_price,price_style)
               row += 1
               col = 0

          workbook.close()
          xls_data = base64.encodebytes(output.getvalue())

          res_id = self.env['export.excel.offers'].create({'excel_file':xls_data,'filename':filename_1})

          return {
               'name':'Offers File',
               'view_mode':'form',
               'view_id':False,
               'res_model':'export.excel.offers',
               'domain': [],
               'type':'ir.actions.act_window',
               'target':'new',
               'res_id': res_id.id,
               'context': {'active_ids':self.env.context.get('active_ids')}
          }