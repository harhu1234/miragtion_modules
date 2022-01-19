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

from odoo import models, fields,api
from io import BytesIO
import xlwt
import base64


class AssetsAnalysisReport(models.TransientModel):

    _name = "assets.report"
    _description = "Model to generate report for assets"

    # File purpose var
    file_formats = fields.Selection([
        ('xls', 'XLS'),
        ('pdf', 'PDF'),
    ], default='xls')

    report = fields.Binary('Prepared file', readonly=True)
    name = fields.Char('File Name', size=100)

    def generate_report_xls(self):
        fp = BytesIO()

        # Add Sheet
        wb1 = xlwt.Workbook(encoding='utf-8')
        ws1 = wb1.add_sheet('Assets Analysis Report ')

        # Set formating style for xls report
        first_header_content_style = xlwt.easyxf("font: name Helvetica size 100 px, bold 1, height 270; "
                                                 "align: horiz center")
        sub_header_style = xlwt.easyxf('pattern: pattern solid, fore_colour white;' 'font: name Helvetica size 12 px, '
                                       'bold 1, height 170;' 'borders: top thin, right thin, bottom thin, left thin;' "alignment: wrap 0;")
        sub_header_content_style = xlwt.easyxf(
            "font: name Helvetica size 10 px, height 170;" "alignment: wrap 0;")

        # Set height for report
        row = 1
        col = 0
        ws1.row(row).height = 500

        # Header labels
        labels = ['Asset Name', 'Acquisition Date', 'Orignal Value', 'Salvage Value', 'Residual Value', 'Computation Method', 'Prorata Temporis','Prorata Date','Number of Depreciations','Number of Months in a Period','Status']
        length = len(labels)

        ws1.write_merge(row, row, 0, length - 1,
                        "Assets Analysis Report", first_header_content_style)
        row += 1
        ws1.row(row).height = 300

        for rec in range(0, length):
            ws1.write(row, col + rec, labels[rec], sub_header_style)
        row += 1
        col = 0

        assets = self.env['account.asset'].sudo().get_assets_to_print()

        # customer/partners loop
        for asset in assets:
            date = ''
            if asset.acquisition_date:
                acquisition_date = asset.acquisition_date.strftime('%d/%m/%y')
            
            data = [
                asset.name,
                asset.acquisition_date,
                asset.original_value,
                asset.salvage_value,
                asset.value_residual,
                asset.method,
                asset.prorata,
                asset.prorata_date,
                asset.method_number,
                asset.method_period,
                asset.state
            ]
            # Put data in XLS file
            for rec in range(0, len(data)):
                ws1.write(row, col + rec, data[rec], sub_header_content_style)
            row += 1
        wb1.save(fp)

        context = {}
        out = base64.encodebytes(fp.getvalue())
        context['name'] = 'Assets_Analysis_Report.xls'

        context['file'] = out
        record = self.create({})
        record.write({'report': out, 'name': context['name']})
        return record.id

    def generate_report(self):
        # Get report
        report = self.env.ref(
            'jt_assets_analysis_osr.assets_analysis_report')

        # Set Context
        ctx = self.env.context.copy()
        ctx['all_assets'] = True

        # Call report with context
        file = None

        if ctx.get('type') == 'view':
            file = report.with_context(
                ctx)._render_qweb_html([])
            return file
        elif ctx.get('type') == 'download_pdf':
            file = report.with_context(
                ctx)._render_qweb_pdf()
        elif ctx.get('type') == 'download_xls':
            record = self.generate_report_xls()
            return record

        # Store report as PDF so user can download
        context = {}
        out = base64.b64encode(file[0])
        context['name'] = 'Assets_Analysis_Report.pdf'

        context['file'] = out
        record = self.create({})
        record.write({'report': out, 'name': context['name']})

        return record.id

    def load_report_js(self):
        ctx = {}
        return {
            'type': 'ir.actions.client',
            'tag': 'AssetsAnalysisReport',
            'context': ctx,
        }
