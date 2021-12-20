# -*- coding: utf-8 -*-

from odoo import models,fields,api,_
import io
import base64
from odoo.tools.misc import xlsxwriter

class ExcelMembership(models.TransientModel):

    _name = 'export.excel.membership'
    _description = 'Excel Membership'

    excel_file = fields.Binary(string='File')
    filename = fields.Char(string='File Name')

    def print_membership_excel(self):
        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output,{'in_memory':True})
        sheet = workbook.add_worksheet('Membership')
        header_style = workbook.add_format({'bold': True, 'font_color': 'white', 'bg_color': '#808080','align':'center'})
        price_style = workbook.add_format({'bg_color':'#F0F0F0','font_color':'#808080'})
        data_style = workbook.add_format({'align':'center','text_wrap':True})
        excel_header = workbook.add_format({'bold': True})
        excel_header.set_align('center')
        excel_header.set_align('vcenter')
        filename_1 = ('Membership.xls')
        row = 0
        col = 0

        sheet.merge_range(row, col, 7, 1, '')
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

        sheet.merge_range(row, col, 7, col + 5, address, excel_header)

        row += 9
        col = 0
        sheet.set_column(col,col,15)
        sheet.write(row,col,_('Membership'),header_style)
        col += 1
        sheet.set_column(col, col, 15)
        sheet.write(row,col,_('Service'),header_style)
        col += 1
        sheet.set_column(col, col, 13)
        sheet.write(row,col,_('Type'),header_style)
        col += 1
        sheet.set_column(col, col, 15)
        sheet.write(row,col,_('Fees'),header_style)
        col += 1
        sheet.set_column(col, col, 15)
        sheet.write(row,col,_('Discount'),header_style)
        col += 1
        sheet.set_column(col, col, 15)
        sheet.write(row,col,_('Total'),header_style)

        membership_ids = self.env['membership.membership'].browse(self.env.context.get('active_ids'))
        row += 1
        col = 0
        for membership in membership_ids:
            sheet.write(row,col,membership.name,data_style)
            col += 1
            name_list = []
            for service in membership.service_ids:
                name_list.append(service.name)
            sheet.write(row,col,','.join(name_list),data_style)
            col += 1
            sheet.write(row,col,membership.type,data_style)
            col += 1
            sheet.write(row,col,membership.fees)
            col += 1
            sheet.write(row,col, membership.discount)
            col += 1
            sheet.write(row,col,membership.total,price_style)
            row += 1
            col = 0

        workbook.close()
        xls_data = base64.encodebytes(output.getvalue())

        res_id = self.env['export.excel.membership'].create({'excel_file':xls_data,'filename':filename_1})

        return {
                'name': 'Membership Files',
                'view_mode': 'form',
                'view_id': False,
                'res_model':'export.excel.membership',
                'domain': [],
                'type':'ir.actions.act_window',
                'target':'new',
                'res_id':res_id.id,
                'context': {'active_ids': self.env.context.get('active_ids')}
        }
