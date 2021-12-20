# -*- coding : utf-8 -*-

from odoo import models,fields,api,_
import io
from odoo.tools.misc import xlsxwriter
import base64


class ExcelServices(models.TransientModel):

    _name = 'export.excel.services'
    _description = 'Excel Services'

    excel_file = fields.Binary(string='File')
    filename = fields.Char(string='File Name')

    def print_services_excel(self):

        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output,{'in_memory':True})
        sheet = workbook.add_worksheet(_('Services'))
        header_style = workbook.add_format({'bold':True,'font_color':'white','bg_color':'#808080','align':'center'})
        data_style = workbook.add_format({'align':'center','text_wrap':True})
        header_style1 = workbook.add_format({'bg_color':'#F0F0F0','font_color':'#808080'})
        header_report = workbook.add_format({'bold': True})
        header_report.set_align('center')
        header_report.set_align('vcenter')
        filename_1 = "Services.xls"
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

        sheet.merge_range(row, col, 7, col + 4, address, header_report)

        row += 9
        col = 0
        sheet.set_column(col,col,15)
        sheet.write(row, col, ('Service'), header_style)
        col += 1
        sheet.write(row, col, ('Gender'), header_style)
        col += 1
        sheet.set_column(col,col,15)
        sheet.write(row, col, ('Category'), header_style)
        col += 1
        sheet.set_column(col,col,17)
        sheet.write(row, col, ('Product'), header_style)
        col += 1
        sheet.set_column(col, col, 15)
        sheet.write(row, col, ('Price'), header_style)

        services_ids = self.env['service.service'].browse(self.env.context.get('active_ids'))
        row += 1
        col = 0
        total_price = []
        for services in services_ids:
            sheet.write(row,col,services.name,data_style)
            col += 1
            sheet.write(row,col,services.service_to,data_style)
            col += 1
            sheet.write(row,col,services.category,data_style)
            col += 1
            sheet.write(row,col,services.product_id.name,data_style)
            col += 1
            sheet.write(row,col,services.price,header_style1)
            total_price.append(services.price)
            row += 1
            col = 0
        total = sum(total_price)
        row += 1
        col = 3
        sheet.write(row,col,_('Total'),header_style)
        col += 1
        sheet.write(row,col,total)



        workbook.close()
        xls_data = base64.encodebytes(output.getvalue())

        res_id = self.env['export.excel.services'].create({'excel_file':xls_data,'filename':filename_1})

        return {
            'name':'Services Files',
            'view_mode':'form',
            'view_id':False,
            'res_model': 'export.excel.services',
            'domain':[],
            'type':'ir.actions.act_window',
            'target':'new',
            'res_id':res_id.id,
            'context': {'active_ids':self.env.context.get('active_ids')}
        }



