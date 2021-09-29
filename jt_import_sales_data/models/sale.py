# -*- coding: utf-8 -*-
##############################################################################
#
#    Jupical Technologies Pvt. Ltd.
#    Copyright (C) 2018-TODAY Jupical Technologies(<http://www.jupical.com>).
#    Author: Jupical Technologies Pvt. Ltd.(<http://www.jupical.com>)
#    you can modify it under the terms of the GNU LESSER
#    GENERAL PUBLIC LICENSE (LGPL v3), Version 3.
#
#    It is forbidden to publish, distribute, sublicense, or sell copies
#    of the Software or modified copies of the Software.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU LESSER GENERAL PUBLIC LICENSE (LGPL v3) for more details.
#
#    You should have received a copy of the GNU LESSER GENERAL PUBLIC LICENSE
#    GENERAL PUBLIC LICENSE (LGPL v3) along with this program.
#    If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

from odoo import api, fields, models
import logging
import base64
from datetime import datetime
from odoo.tools import DEFAULT_SERVER_DATETIME_FORMAT
import pytz
from xlrd import open_workbook
import tempfile
import csv
import requests
_logger = logging.getLogger(__name__)


class SaleOrder(models.Model):

    _inherit = 'sale.order'

    def remove_finish_import_crons(self):
        master_loans = self.env['import.order.master'].search(
            ['|', ('status', '=', 'imported'), ('status', '=', 'failed')])
        # Remove completed crons
        for master_bill in master_loans:
            if master_bill.cron_id:
                master_bill.cron_id.unlink()
        # Remove the Import status lines
        imported_master_bills = self.env['import.order.master'].search(
            [('status', '=', 'imported')])
        imported_master_bills.unlink()

    def import_data(self, order_master_id=False):
        if order_master_id:
            order_master = self.env[
                'import.order.master'].browse(order_master_id)
            total_success_import_record = 0
            total_failed_record = 0
            list_of_failed_record = ''
            datafile = order_master.file
            file_name = str(order_master.filename)
            sale_order_obj = self.env['sale.order']
            lot_obj = self.env['stock.production.lot']
            partner_obj = self.env['res.partner']
            try:
                if not datafile or not \
                        file_name.lower().endswith(('.xls', '.xlsx', '.csv')):
                    list_of_failed_record += "Please Select an .xls or .csv or its compatible file to Import."
                    _logger.error(
                        "Please Select an .xls or .csv or its compatible file to Import.")
                if order_master.type == 'csv':
                    if not datafile or not file_name.lower().endswith(('.csv')):
                        list_of_failed_record += "Please Select an .csv or its compatible file to Import."
                        _logger.error(
                            "Please Select an .csv or its compatible file to Import.")
                    file_path = tempfile.gettempdir() + '/import.csv'
                    f = open(file_path, 'wb+')
                    f.write(base64.decodestring(order_master.file))
                    f.close()

                    archive = csv.DictReader(open(file_path))
                    archive_lines = [line for line in archive]
                    count = 1
                    customer = False
                    order_id = False
                    for line in archive_lines:
                        try:
                            count += 1
                            if line.get('Customer'):
                                customer = partner_obj.search(
                                    [('name', '=', line.get('Customer'))], limit=1).id
                                if not customer:
                                    customer = partner_obj.create({'name': line.get(
                                        'Customer'), 'ref': line.get('Customer Internal Reference', '')})
                                    customer = customer.id
                            else:
                                pass

                            consumer = partner_obj.search(
                                [('name', '=', line.get('User'))], limit=1)
                            if not consumer:
                                consumer = partner_obj.create(
                                    {'name': line.get('User')})

                            serial_no = lot_obj.search(
                                [('name', '=', line.get('Serial Number'))], limit=1)
                            # if not serial_no:
                            #     serial_no = lot_obj.create({'name': line.get('Serial Number'),
                            #                                 'product_id': product.id if product else False})

                            order_date = line.get('Order Date', False)
                            if line.get('Customer'):
                                try:
                                    order_id = False
                                    order_vals = {
                                        'partner_id': customer if customer else False,
                                        'date_order': order_date or fields.datetime.now(),
                                        # 'consumer_id': consumer.id if consumer else False,
                                        # 'serial_number_id': serial_no.id if serial_no else False,
                                    }
                                    if order_master.operation == 'create':
                                        order_id = sale_order_obj.create(
                                            order_vals)
                                    else:
                                        order_id = self.env['sale.order'].search(
                                            [('name', '=', line.get('Order Number', ''))], limit=1)
                                        if not order_id:
                                            order_id = sale_order_obj.create(
                                                order_vals)
                                        else:
                                            order_id.write(order_vals)

                                    total_success_import_record += 1
                                except Exception as e:
                                    _logger.error("Error at %s" % str(line))
                            else:
                                _logger.error("Error at %s" % str(line))
                        except Exception as e:
                            total_failed_record += 1
                            list_of_failed_record += line
                            _logger.error("Error at %s" % str(line))
                else:
                    if not datafile or not file_name.lower().endswith(('.xls', '.xlsx',)):
                        list_of_failed_record += "Please Select an .xls or its compatible file to Import."
                        _logger.error(
                            "Please Select an .xls or its compatible file to Import.")

                    temp_path = tempfile.gettempdir()
                    file_data = base64.decodestring(datafile)
                    fp = open(temp_path + '/xsl_file.xls', 'wb+')
                    fp.write(file_data)
                    fp.close()
                    wb = open_workbook(temp_path + '/xsl_file.xls')
                    data_list = []
                    header_list = []
                    headers_dict = {}
                    for sheet in wb.sheets():
                        # Sales data xlsx
                        for rownum in range(sheet.nrows):
                            if rownum == 0:
                                header_list = [
                                    x for x in sheet.row_values(rownum)]
                                headers_dict = {
                                    'customer': header_list.index('Customer'),
                                    'ref': header_list.index('Customer Internal Reference'),
                                    'name': header_list.index('Order Number'),
                                    'order_date': header_list.index('Order Date'),
                                    'serial_number_id': header_list.index('Serial Number'),
                                    'consumer_id': header_list.index('User'),
                                }
                            if rownum >= 1:
                                data_list.append(sheet.row_values(rownum))
                        count = 1
                        customer = False
                        order_id = False
                        for row in data_list:
                            try:
                                count += 1
                                if row[headers_dict['customer']]:
                                    customer = partner_obj.search([('name', '=', row[headers_dict['customer']])],
                                                                  limit=1)
                                    if not customer:
                                        customer = partner_obj.create(
                                            {'name': row[headers_dict['customer']], 'ref': row[headers_dict['ref']]})
                                        customer = customer
                                else:
                                    pass

                                consumer = partner_obj.search([('name', '=', row[headers_dict['consumer_id']])],
                                                              limit=1)
                                if not consumer:
                                    consumer = partner_obj.create(
                                        {'name': row[headers_dict['consumer_id']]})

                                serial_no = lot_obj.search([('name', '=', row[headers_dict['serial_number_id']])],
                                                           limit=1)

                                order_date = row[headers_dict['order_date']]
                                if row[headers_dict['customer']]:
                                    try:
                                        order_id = False
                                        order_vals = {
                                            'partner_id': customer and customer.id or False,
                                            'date_order': order_date or fields.datetime.now(),
                                            # 'user_id': consumer.id if consumer else False,
                                            # 'serial_number_id': serial_no.id if serial_no else False,
                                            'state': 'sale',
                                        }
                                        if order_master.operation == 'create':
                                            order_id = sale_order_obj.create(
                                                order_vals)
                                        else:
                                            order_id = self.env['sale.order'].search(
                                                [('name', '=', row[headers_dict['name']])], limit=1)
                                            if not order_id:
                                                order_id = sale_order_obj.create(
                                                    order_vals)
                                            else:
                                                order_id.write(order_vals)
                                        total_success_import_record += 1
                                    except Exception as e:
                                        _logger.error("Error at %s" % str(row))
                                else:
                                    _logger.error("Error at %s" % str(row))
                            except Exception as e:
                                total_failed_record += 1
                                list_of_failed_record += row
                                _logger.error("Error at %s" % str(row))
            except Exception as e:
                list_of_failed_record += str(e)
            try:
                file_data = base64.b64encode(
                    list_of_failed_record.encode('utf-8'))
                order_master.status = 'imported'
                start_date = datetime.strftime(
                    order_master.create_date, DEFAULT_SERVER_DATETIME_FORMAT)
                self._cr.commit()
                now_time = datetime.now()
                user_tz = self.env.user.tz or str(pytz.utc)
                local = pytz.timezone(user_tz)
                start_date_in_user_tz = datetime.strftime(pytz.utc.localize(datetime.strptime(start_date,
                                                                                              DEFAULT_SERVER_DATETIME_FORMAT)).astimezone(
                    local), DEFAULT_SERVER_DATETIME_FORMAT)
                end_date_in_user_tz = datetime.strftime(pytz.utc.localize(now_time).astimezone(local),
                                                        DEFAULT_SERVER_DATETIME_FORMAT)
                self.env['import.order.history'].create({
                    'total_success_count': total_success_import_record,
                    'total_failed_count': total_failed_record,
                    'file': file_data,
                    'file_name': 'report_importazione.txt',
                    'type': order_master.type,
                    'import_file_name': order_master.filename,
                    'start_date': start_date_in_user_tz,
                    'end_date': end_date_in_user_tz,
                    'operation': order_master.operation,
                    'import_type': order_master.import_type,
                })
                if order_master.user_id:
                    message = "Import process is completed. Check in Imported Loan History if all the orders have" \
                              "been imported correctly. </br></br> Imported File: %s </br>" \
                              "Imported by: %s" % (
                                  order_master.filename, order_master.user_id.name)
                    order_master.user_id.notify_partner_info(
                        message, order_master.user_id, sticky=True)
                self._cr.commit()
            except Exception as e:
                order_master.status = 'failed'
                _logger.error(e)
                self._cr.commit()

    def import_data_line(self, order_master_id=False):
        if order_master_id:
            order_master = self.env[
                'import.order.master'].browse(order_master_id)
            total_success_import_record = 0
            total_failed_record = 0
            list_of_failed_record = ''
            datafile = order_master.file
            file_name = str(order_master.filename)
            sale_order_obj = self.env['sale.order']
            sale_order_line_obj = self.env['sale.order.line']
            product_obj = self.env['product.product']
            lot_obj = self.env['stock.production.lot']
            partner_obj = self.env['res.partner']
            tax_obj = self.env['account.tax']
            try:
                if not datafile or not \
                        file_name.lower().endswith(('.xls', '.xlsx', '.csv')):
                    list_of_failed_record += "Please Select an .xls or .csv or its compatible file to Import."
                    _logger.error(
                        "Please Select an .xls or .csv or its compatible file to Import.")
                if order_master.type == 'csv':
                    if not datafile or not file_name.lower().endswith(('.csv')):
                        list_of_failed_record += "Please Select an .csv or its compatible file to Import."
                        _logger.error(
                            "Please Select an .csv or its compatible file to Import.")
                    file_path = tempfile.gettempdir() + '/import.csv'
                    f = open(file_path, 'wb+')
                    f.write(base64.decodestring(order_master.file))
                    f.close()

                    archive = csv.DictReader(open(file_path))
                    archive_lines = [line for line in archive]
                    count = 1
                    customer = False
                    order_id = False
                    for line in archive_lines:
                        try:
                            count += 1

                            product = line.get('Product', False)
                            product = product_obj.search(
                                [('name', '=', line.get('Product'))], limit=1)
                            if not product:
                                product = product_obj.create({
                                    'name': line.get('Product'),
                                    'default_code': line.get('Product Internal Code', '')
                                })
                                product = product
                            else:
                                product.write(
                                    {'default_code': line.get('Product Internal Code', '')})

                            quantity = line.get('Quantity', 0)
                            price_unit = line.get('Price', "")
                            desc = line.get('Description', False)
                            taxe_ids = []
                            if line.get('Tax', False):
                                taxes = line['Tax'].split(';')
                                for tax_name in taxes:
                                    tax = tax_obj.search(
                                        [('name', '=', tax_name), ('company_id', '=', self.env.user.company_id.id),
                                         ('type_tax_use', '=', 'sale')], limit=1)
                                    if tax:
                                        taxe_ids.append(tax.id)
                                    else:
                                        _logger.error(
                                            "%s Tax not found" % tax_name)
                            line_vals = {
                                'product_id': product.id if product else False,
                                'name': desc if desc else product.name + product.description_sale if product else '',
                                'product_uom_qty': quantity,
                                'price_unit': price_unit,
                                'tax_id': [(4, tax) for tax in taxe_ids]
                            }
                            if line.get('Order Number'):
                                try:
                                    order_id = False
                                    order_id = self.env['sale.order'].search(
                                        [('name', '=', line.get('Order Number', ''))], limit=1)
                                    if order_id:
                                        line_vals.update(
                                            {'order_id': order_id.id})

                                        if order_master.operation == 'create':
                                            sale_order_line_obj.create(
                                                line_vals)
                                        else:
                                            line = sale_order_line_obj.search(
                                                [('order_id', '=', order_id.id), ('product_id', '=', line_vals.get('product_id'))], limit=1)
                                            if line:
                                                line.write(line_vals)
                                            else:
                                                sale_order_line_obj.create(
                                                    line_vals)

                                        total_success_import_record += 1
                                    else:
                                        _logger.error("Error: Order not found:" % str(
                                            line.get('Order Number', '')))
                                except Exception as e:
                                    _logger.error("Error at %s" % str(line))
                            else:
                                try:
                                    line_vals.update({'order_id': order_id.id})

                                    if order_master.operation == 'create':
                                        sale_order_line_obj.create(line_vals)
                                    else:
                                        line = sale_order_line_obj.search(
                                            [('order_id', '=', order_id.id), ('product_id', '=', line_vals.get('product_id'))], limit=1)
                                        if line:
                                            line.write(line_vals)
                                        else:
                                            sale_order_line_obj.create(
                                                line_vals)
                                    total_success_import_record += 1
                                except Exception as e:
                                    _logger.error("Error at %s" % str(line))
                        except Exception as e:
                            total_failed_record += 1
                            list_of_failed_record += line
                            _logger.error("Error at %s" % str(line))
                else:
                    if not datafile or not file_name.lower().endswith(('.xls', '.xlsx',)):
                        list_of_failed_record += "Please Select an .xls or its compatible file to Import."
                        _logger.error(
                            "Please Select an .xls or its compatible file to Import.")

                    temp_path = tempfile.gettempdir()
                    file_data = base64.decodestring(datafile)
                    fp = open(temp_path + '/xsl_file.xls', 'wb+')
                    fp.write(file_data)
                    fp.close()
                    wb = open_workbook(temp_path + '/xsl_file.xls')
                    data_list = []
                    header_list = []
                    headers_dict = {}
                    for sheet in wb.sheets():
                        # Sales data xlsx
                        for rownum in range(sheet.nrows):
                            if rownum == 0:
                                header_list = [
                                    x for x in sheet.row_values(rownum)]
                                headers_dict = {
                                    'name': header_list.index('Order Number'),
                                    'product': header_list.index('Product'),
                                    'code': header_list.index('Product Internal Code'),
                                    'desc': header_list.index('Description'),
                                    'qty': header_list.index('Quantity'),
                                    'price': header_list.index('Price'),
                                    'tax': header_list.index('Tax'),
                                }
                            if rownum >= 1:
                                data_list.append(sheet.row_values(rownum))
                        count = 1
                        customer = False
                        order_id = False
                        for row in data_list:
                            try:
                                count += 1
                                product = product_obj.search(
                                    [('name', '=', row[headers_dict['product']])], limit=1)
                                if not product:
                                    product = product_obj.create({
                                        'name': row[headers_dict['product']],
                                        'default_code': row[headers_dict['code']],
                                    })
                                    product = product

                                quantity = row[headers_dict['qty']]
                                price_unit = row[headers_dict['price']]
                                desc = row[headers_dict['desc']]

                                taxe_ids = []
                                if row[headers_dict['tax']]:
                                    taxes = str(
                                        row[headers_dict['tax']]).split(';')
                                    for tax_name in taxes:
                                        tax = tax_obj.search(
                                            [('name', '=', tax_name), ('company_id', '=', self.env.user.company_id.id),
                                             ('type_tax_use', '=', 'sale')], limit=1)
                                        if tax:
                                            taxe_ids.append(tax.id)
                                        else:
                                            _logger.error(
                                                "%s Tax not found" % tax_name)

                                line_vals = {
                                    'product_id': product.id if product else False,
                                    'name': desc if desc else product.name + '\n' + product.description_sale if product else '',
                                    'product_uom_qty': quantity,
                                    'price_unit': price_unit,
                                    'tax_id': [(4, tax) for tax in taxe_ids]
                                }

                                if row[headers_dict['name']]:
                                    try:
                                        order_id = self.env['sale.order'].search(
                                            [('name', '=', row[headers_dict['name']])], limit=1)
                                        if order_id:
                                            line_vals.update(
                                                {'order_id': order_id.id})

                                            if order_master.operation == 'create':
                                                sale_order_line_obj.create(
                                                    line_vals)
                                            else:
                                                line = sale_order_line_obj.search(
                                                    [('order_id', '=', order_id.id), ('product_id', '=', line_vals.get('product_id'))], limit=1)
                                                if line:
                                                    line.write(line_vals)
                                                else:
                                                    sale_order_line_obj.create(
                                                        line_vals)
                                            total_success_import_record += 1
                                        else:
                                            _logger.error("Error: Order not found %s" % str(
                                                row[headers_dict['name']]))
                                    except Exception as e:
                                        _logger.error("Error at %s" % str(row))
                                else:
                                    try:
                                        line_vals.update(
                                            {'order_id': order_id.id})

                                        if order_master.operation == 'create':
                                            sale_order_line_obj.create(
                                                line_vals)
                                        else:
                                            line = sale_order_line_obj.search(
                                                [('order_id', '=', order_id.id), ('product_id', '=', line_vals.get('product_id'))], limit=1)
                                            if line:
                                                line.write(line_vals)
                                            else:
                                                sale_order_line_obj.create(
                                                    line_vals)
                                        total_success_import_record += 1
                                    except Exception as e:
                                        _logger.error("Error at %s" % str(row))
                            except Exception as e:
                                total_failed_record += 1
                                list_of_failed_record += row
                                _logger.error("Error at %s" % str(row))
            except Exception as e:
                list_of_failed_record += str(e)
            try:
                file_data = base64.b64encode(
                    list_of_failed_record.encode('utf-8'))
                order_master.status = 'imported'
                start_date = datetime.strftime(
                    order_master.create_date, DEFAULT_SERVER_DATETIME_FORMAT)
                self._cr.commit()
                now_time = datetime.now()
                user_tz = self.env.user.tz or str(pytz.utc)
                local = pytz.timezone(user_tz)
                start_date_in_user_tz = datetime.strftime(pytz.utc.localize(datetime.strptime(start_date,
                                                                                              DEFAULT_SERVER_DATETIME_FORMAT)).astimezone(
                    local), DEFAULT_SERVER_DATETIME_FORMAT)
                end_date_in_user_tz = datetime.strftime(pytz.utc.localize(now_time).astimezone(local),
                                                        DEFAULT_SERVER_DATETIME_FORMAT)
                self.env['import.order.history'].create({
                    'total_success_count': total_success_import_record,
                    'total_failed_count': total_failed_record,
                    'file': file_data,
                    'file_name': 'report_importazione.txt',
                    'type': order_master.type,
                    'import_file_name': order_master.filename,
                    'start_date': start_date_in_user_tz,
                    'end_date': end_date_in_user_tz,
                    'operation': order_master.operation,
                    'import_type': order_master.import_type,
                })
                if order_master.user_id:
                    message = "Import process is completed. Check in Imported Line History if all the orders have" \
                              "been imported correctly. </br></br> Imported File: %s </br>" \
                              "Imported by: %s" % (
                                  order_master.filename, order_master.user_id.name)
                    order_master.user_id.notify_partner_info(
                        message, order_master.user_id, sticky=True)
                self._cr.commit()
            except Exception as e:
                order_master.status = 'failed'
                _logger.error(e)
                self._cr.commit()

    def import_attachment(self, order_master_id=False):
        if order_master_id:
            order_master = self.env[
                'import.order.master'].browse(order_master_id)
            total_success_import_record = 0
            total_failed_record = 0
            list_of_failed_record = ''
            datafile = order_master.file
            file_name = str(order_master.filename)
            try:
                if not datafile or not \
                        file_name.lower().endswith(('.xls', '.xlsx', '.csv')):
                    list_of_failed_record += "Please Select an .xls or .csv or its compatible file to Import."
                    _logger.error(
                        "Please Select an .xls or .csv or its compatible file to Import.")
                if order_master.type == 'csv':
                    if not datafile or not file_name.lower().endswith(('.csv')):
                        list_of_failed_record += "Please Select an .csv or its compatible file to Import."
                        _logger.error(
                            "Please Select an .csv or its compatible file to Import.")
                    file_path = tempfile.gettempdir() + '/import.csv'
                    f = open(file_path, 'wb+')
                    f.write(base64.decodestring(order_master.file))
                    f.close()

                    archive = csv.DictReader(open(file_path))
                    archive_lines = [line for line in archive]
                    count = 1
                    order_id = False
                    for line in archive_lines:
                        try:
                            count += 1
                            attachment_url = line.get('URL', '')
                            attachment_data = False
                            attachment = False
                            if attachment_url and attachment_url != '':
                                attachment_data = base64.b64encode(
                                    requests.get(attachment_url).content)
                                attachment = self.env['ir.attachment'].sudo().create({
                                    'res_model': 'sale.order',
                                    'datas': attachment_data,
                                    'name': "Uploaded File",
                                    'type': 'binary',
                                })

                            if line.get('Order Number'):
                                try:
                                    order_id = self.env['sale.order'].search(
                                        [('name', '=', line.get('Order Number', ''))], limit=1)

                                    if attachment and order_id:
                                        attachment.res_id = order_id.id

                                    total_success_import_record += 1
                                except Exception as e:
                                    _logger.error("Error at %s" % str(line))
                            else:
                                _logger.error("Error at %s" % str(line))
                        except Exception as e:
                            total_failed_record += 1
                            list_of_failed_record += line
                            _logger.error("Error at %s" % str(line))
                else:
                    if not datafile or not file_name.lower().endswith(('.xls', '.xlsx',)):
                        list_of_failed_record += "Please Select an .xls or its compatible file to Import."
                        _logger.error(
                            "Please Select an .xls or its compatible file to Import.")

                    temp_path = tempfile.gettempdir()
                    file_data = base64.decodestring(datafile)
                    fp = open(temp_path + '/xsl_file.xls', 'wb+')
                    fp.write(file_data)
                    fp.close()
                    wb = open_workbook(temp_path + '/xsl_file.xls')
                    data_list = []
                    header_list = []
                    headers_dict = {}
                    for sheet in wb.sheets():
                        # Sales data xlsx
                        for rownum in range(sheet.nrows):
                            if rownum == 0:
                                header_list = [
                                    x for x in sheet.row_values(rownum)]
                                headers_dict = {
                                    'name': header_list.index('Order Number'),
                                    'URL': header_list.index('URL'),
                                }
                            if rownum >= 1:
                                data_list.append(sheet.row_values(rownum))
                        count = 1
                        order_id = False
                        for row in data_list:
                            try:
                                count += 1
                                attachment_url = row[headers_dict['URL']]
                                attachment_data = False
                                attachment = False
                                if attachment_url:
                                    attachment_data = base64.b64encode(
                                        requests.get(attachment_url).content)
                                    attachment = self.env['ir.attachment'].sudo().create({
                                        'res_model': 'sale.order',
                                        'datas': attachment_data,
                                        'name': "Uploaded File",
                                        'type': 'binary',
                                    })
                                if row[headers_dict['name']]:
                                    try:
                                        order_id = self.env['sale.order'].search(
                                            [('name', '=', row[headers_dict['name']])], limit=1)

                                        if attachment and order_id:
                                            attachment.res_id = order_id.id
                                        total_success_import_record += 1
                                    except Exception as e:
                                        _logger.error("Error at %s" % str(row))
                                else:
                                    _logger.error("Error at %s" % str(row))
                            except Exception as e:
                                total_failed_record += 1
                                list_of_failed_record += row
                                _logger.error("Error at %s" % str(row))
            except Exception as e:
                list_of_failed_record += str(e)
            try:
                file_data = base64.b64encode(
                    list_of_failed_record.encode('utf-8'))
                order_master.status = 'imported'
                start_date = datetime.strftime(
                    order_master.create_date, DEFAULT_SERVER_DATETIME_FORMAT)
                self._cr.commit()
                now_time = datetime.now()
                user_tz = self.env.user.tz or str(pytz.utc)
                local = pytz.timezone(user_tz)
                start_date_in_user_tz = datetime.strftime(pytz.utc.localize(datetime.strptime(start_date,
                                                                                              DEFAULT_SERVER_DATETIME_FORMAT)).astimezone(
                    local), DEFAULT_SERVER_DATETIME_FORMAT)
                end_date_in_user_tz = datetime.strftime(pytz.utc.localize(now_time).astimezone(local),
                                                        DEFAULT_SERVER_DATETIME_FORMAT)
                self.env['import.order.history'].create({
                    'total_success_count': total_success_import_record,
                    'total_failed_count': total_failed_record,
                    'file': file_data,
                    'file_name': 'report_importazione.txt',
                    'type': order_master.type,
                    'import_file_name': order_master.filename,
                    'start_date': start_date_in_user_tz,
                    'end_date': end_date_in_user_tz,
                    'operation': order_master.operation,
                    'import_type': order_master.import_type,
                })
                if order_master.user_id:
                    message = "Import process is completed. Check in Imported Imported Attachment History if all the orders have" \
                              "been imported correctly. </br></br> Imported File: %s </br>" \
                              "Imported by: %s" % (
                                  order_master.filename, order_master.user_id.name)
                    order_master.user_id.notify_partner_info(
                        message, order_master.user_id, sticky=True)
                self._cr.commit()
            except Exception as e:
                order_master.status = 'failed'
                _logger.error(e)
                self._cr.commit()
