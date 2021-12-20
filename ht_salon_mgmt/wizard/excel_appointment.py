# -*- coding: utf-8 -*-

from odoo import api,fields,models,_,tools
import base64
import io
from odoo.tools.misc import xlsxwriter

class ExcelAppointment(models.TransientModel):
    _name = 'export.excel.appointment'
    _description = 'Excel Appointment'

    excel_file = fields.Binary(string='File')
    filename = fields.Char(string='File name')

    def print_appointment_excel(self):

        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output, {'in_memory': True})
        sheet = workbook.add_worksheet(_('Appointment'))
        header_style = workbook.add_format({'bold':True,'font_color':'white','bg_color':'#808080','align':'center'})
        data_style = workbook.add_format({'align':'center','text_wrap':True})
        price_style = workbook.add_format({'bg_color':'#F0F0F0','font_color':'#808080'})
        header_style1 = workbook.add_format({'bold': True})
        header_style1.set_align('center')
        header_style1.set_align('vcenter')
        filename_1 = 'appointment.xls'
        row = 0
        col = 0

        sheet.merge_range(row,col,7,1,'')
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

        sheet.merge_range(row,col,7,col+6,address,header_style1)

        row += 9
        col = 0
        appointment_ids = self.env['customer.appointment'].browse(self.env.context.get('active_ids'))


        for appointment in appointment_ids:
            sheet.merge_range(row, col, row, col+ 1, '')
            sheet.write(row, col, _('Name'),header_style1)
            col += 2
            sheet.write(row,col,appointment.customer_id.name,header_style1)
            col += 2
            sheet.merge_range(row,col,row,col+1,'')
            sheet.write(row,col,_('Appointment Date'),header_style1)
            col += 2
            sheet.write(row,col,str(appointment.schedue_time))
            row += 2
            col = 0
            sheet.set_column(col, col, 10)
            sheet.write(row,col,_('Type'),header_style)
            col += 1
            sheet.set_column(col, col, 10)
            sheet.write(row,col,_('Service'),header_style)
            col += 1
            sheet.set_column(col, col, 10)
            sheet.write(row,col,_('Product'),header_style)
            col += 1
            sheet.set_column(col, col, 10)
            sheet.write(row, col, _('Code'), header_style)
            col += 1
            sheet.set_column(col, col, 10)
            sheet.write(row, col, _('Offer Price'), header_style)
            col += 1
            sheet.set_column(col, col, 10)
            sheet.write(row, col, _('Price'), header_style)
            col += 1
            sheet.set_column(col, col, 10)
            sheet.write(row, col, _('Total'), header_style)

            row += 1
            col = 0
            for service in appointment.services_ids:
                sheet.write(row,col,service.service_type,data_style)
                col += 1
                sheet.write(row,col,service.services_id.name,data_style)
                col += 1
                sheet.write(row,col,service.product_id.name,data_style)
                col += 1
                sheet.write(row,col,service.coupon_code,data_style)
                col += 1
                sheet.write(row,col,service.offer_price)
                col += 1
                sheet.write(row,col,service.price,price_style)
                col += 1
                sheet.write(row,col,service.sum,price_style)
                col = 0
                row += 1
            row += 1
            col += 4
            sheet.merge_range(row,col,row,col+1,'')
            sheet.write(row,col,_('Amount'),header_style)
            col += 2
            sheet.write(row,col,appointment.amount)
            row += 2
            col = 0

        workbook.close()
        xls_data = base64.encodebytes(output.getvalue())

        res_id = self.env['export.excel.appointment'].create({
            'excel_file':xls_data,'filename':filename_1})

        return {
            'name' : 'Appointment Files',
            'view_mode':'form',
            'view_id':False,
            'res_model':'export.excel.appointment',
            'domain' : [],
            'type' :'ir.actions.act_window',
            'target' : 'new',
            'res_id' : res_id.id,
            'context': {'active_ids':self.env.context.get('active_ids')}
        }
