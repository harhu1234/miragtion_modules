# -*- coding: utf-8 -*-

##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2016 - now Bytebrand Outsourcing AG (<https://www.bytebrand.net>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Lesser General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Lesser General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################


from odoo import _, models, fields, api
import json

try:
    import xlrd

    try:
        from xlrd import xlsx
    except ImportError:
        xlsx = None
except ImportError:
    xlrd = xlsx = None

try:
    from cStringIO import StringIO
except ImportError:
    from io import StringIO

import csv, logging, base64
from io import BytesIO
from odoo.tools import DEFAULT_SERVER_DATE_FORMAT, \
    DEFAULT_SERVER_DATETIME_FORMAT, pycompat
import datetime
from datetime import date

_logger = logging.getLogger(__name__)


class MatrixFileParserWizard(models.TransientModel):
    _name = 'matrix.file.parser.wizard'

    product_file = fields.Binary(string='File')
    file_parse = fields.Boolean(string='File parsed')
    matrix_file_parser_line_wizard_ids = fields.One2many(
        'matrix.file.parser.line.wizard',
        'matrix_file_parser_wizard_id')

    def read_xls_book(self, book):
        sheet = book.sheet_by_index(0)
        # emulate Sheet.get_rows for pre-0.9.4
        for row in map(sheet.row, range(sheet.nrows)):
            values = []
            for cell in row:
                if cell.ctype is xlrd.XL_CELL_NUMBER:
                    is_float = cell.value % 1 != 0.0
                    if cell.xf_index:
                        format = book.xf_list[cell.xf_index]
                        if format.format_key:
                            format = book.format_map[format.format_key]
                        else:
                            format = None
                    else:
                        format = None
                    value_string = str(
                        cell.value) if is_float else str(
                        int(cell.value))
                    # if format and format.format_str:
                    #     if 'USD' in format.format_str:
                    #         value_string += ' USD'
                    #     if 'EUR' in format.format_str:
                    #         value_string += ' EUR'
                    values.append(value_string)
                elif cell.ctype is xlrd.XL_CELL_DATE:
                    is_datetime = cell.value % 1 != 0.0
                    # emulate xldate_as_datetime for pre-0.9.3
                    try:
                        dt = datetime.datetime(
                            *xlrd.xldate.xldate_as_tuple(cell.value,
                                                         book.datemode))
                        values.append(
                            dt.strftime(DEFAULT_SERVER_DATETIME_FORMAT)
                            if is_datetime
                            else dt.strftime(DEFAULT_SERVER_DATE_FORMAT)
                        )
                    except:
                        values.append('')
                elif cell.ctype is xlrd.XL_CELL_BOOLEAN:
                    values.append(u'True' if cell.value else u'False')
                elif cell.ctype is xlrd.XL_CELL_ERROR:
                    _logger.error('Error in row: %s' % row)
                    raise ValueError(
                        _("Error cell found while reading XLS/XLSX file: %s") %
                        xlrd.error_text_from_code.get(
                            cell.value, "unknown error code %s" % cell.value)
                    )
                else:
                    values.append(cell.value)
            yield values

    def pre_parse_file(self):
        if self.product_file:
            self.matrix_file_parser_line_wizard_ids.unlink()
            value = BytesIO(self.product_file).getvalue()
            file_data = base64.decodebytes(value)
            book_data = xlrd.open_workbook(file_contents=file_data)


            xls_data = self.read_xls_book(book_data)
            xls_values = []
            print("xls data",xls_data)
            if xls_data:
                for value in xls_data:
                    xls_values.append(value)
            if xls_values:
                keys = xls_values[1]

            len_keys = len(keys)
            value_dicts = []
            for value in xls_values[2:]:
                i = 0
                value_dict = {}
                while i <= len_keys - 1:
                    value_dict.update({keys[i]: value[i]})
                    i += 1
                value_dicts.append(value_dict)
            value_keys = keys[1:]
            tags_pool = self.env['crm.tag']
            for value_dict in value_dicts:

                place = value_dict.get(keys[0])
                for value_key in value_keys:
                    matrix_line_value = {
                        'matrix_file_parser_wizard_id': self.id,
                        'age': int(value_key),
                        'place': place.strip()
                    }
                    tags_str = value_dict.get(value_key)
                    tags_dict = tags_str.split(',')
                    tags = []
                    for tag_name in tags_dict:
                        if tag_name:
                            tag = tags_pool.search(
                                [('name', '=', tag_name.strip())])
                            if not tag:
                                tag = tags_pool.create(
                                    {'name': tag_name.strip()})
                            tags.append(tag.id)
                    matrix_line_value.update(tag_ids=[(6, 0, tags)])
                    self.env['matrix.file.parser.line.wizard'].create(
                        matrix_line_value)

        self.file_parse = True
        view = self.env.ref('matrix.view_matrix_file_parser_wizard_form')
        return {
            'type': 'ir.actions.act_window',
            'view_mode': 'form',
            'res_id': self.id,
            'res_model': 'matrix.file.parser.wizard',
            'view_id': view.id,
            'target': 'new',
        }

    def parse_file(self):
        matrix_obj = self.env['crm.matrix']
        for line in self.matrix_file_parser_line_wizard_ids:
            matrixes = matrix_obj.search([('age', '=', line.age),
                                                        ('place', '=', line.place)])
            if matrixes:
                for matrix in matrixes:
                    matrix.tag_ids = [(6, 0, line.tag_ids.ids)]
            else:
                matrix_value = {'age': line.age,
                                'place': line.place,
                                'tag_ids': [(6, 0, line.tag_ids.ids)]}
                matrix_obj.create(matrix_value)


class MatrixFileParserLineWizard(models.TransientModel):
    _name = 'matrix.file.parser.line.wizard'

    matrix_file_parser_wizard_id = fields.Many2one('matrix.file.parser.wizard')

    age = fields.Integer('Age', required=True)
    place = fields.Char('Place', required=True)
    tag_ids = fields.Many2many('crm.tag', 'wizard_matrix_crm_tag_rel',
                               'wizard_id', 'tag_id')
