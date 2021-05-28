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

from odoo import models, fields, api,_
from io import BytesIO
import xlwt
import base64

class SaleExports(models.TransientModel):

    _name = "sale.export.wizard"

    name = fields.Char('File Name', size=32)
    report = fields.Binary('Prepared file', readonly=True)
    state = fields.Selection([('choose', 'choose'), ('get', 'get')], default='choose')
    start_date = fields.Datetime('Start Date')
    end_date = fields.Datetime('End Date')

    # Method to prepare export data
    # @api.multi
    def export_sale_data(self):
        # Set global variables
        self.ensure_one()
        active_ids = self._context.get('active_ids')
        wb1 = xlwt.Workbook(encoding='utf-8')
        # Sheet Name
        ws1 = wb1.add_sheet('Sales Summary Report')
        fp = BytesIO()

        # Set formating style for xls report
        first_header_content_style = xlwt.easyxf("font: name Helvetica size 150 px, bold 1, height 270; "
                                                 "align: horiz left")
        header_content_style = xlwt.easyxf("font: name Helvetica size 50 px, bold 1, height 225; align: horiz center")
        sub_header_style = xlwt.easyxf('pattern: pattern solid, fore_colour white;' 'font: name Helvetica size 12 px, '
                                       'bold 1, height 170;' 'borders: top thin, right thin, bottom thin, left thin;' "alignment: wrap 0;")
        sub_header_content_style = xlwt.easyxf("font: name Helvetica size 10 px, height 170;" "alignment: wrap 0;")

        row = 1
        col = 0

        header_lst = [
            'Reference',
            'Order Date & Time',
            'Customer Name',
            'Notitfication Email',
            'Notitfication Mobile',
            'Notitfication Phone',
            'Pay Mode',
            'Invoice Number',
            'Invoice Date',
            'Invoice Status',
            'Shipping Date',
            'Expected Shipping Date',
            'Shipping Status',
            'Shipping Reference',
            'Source Location',
            'Shipping Destination Reference',
            'Initial Demand',
            'Shipping Address Name',
            'Shipping Address Line 1',
            'Shipping Address Line 2',
            'Shipping Address City',
            'Shipping Address State',
            'Shipping Address Country',
            'Shipping Address Pincode',
            'Shipping Address Phone',
            'Shipping Address Mobile',
            'Shipping Address Email',
            'Billing Address Name',
            'Billing Address Line 1',
            'Billing Address Line 2',
            'Billing Address City',
            'Billing Address State',
            'Billing Address Country',
            'Billing Address Pincode',
            'Billing Address Phone',
            'Billing Address Mobile',
            'Billing Address Email',
            'Product SKU Code',
            'Product Type Name',
            'Product Type Size',
            'Qty',
            'Brand',
            'Category',
            'Channel Name',
            'Inward Price',
            'MRP',
            'Shipping Charges',
            'Selling Price',
            'Total Price',
            'Subtotal',
            'Discount',
            'Packing List date & time',
            'Sale Order Status',
            'Sale Order Item Status',
            'Confirmation Date',
            'Product Weight',
            'Product Volume',
        ]

        # Set height for report
        ws1.row(row).height = 500
        # Generate table (row/column)
        nm = 'Sales Summary Report for the dates between: '+ str(self.start_date) + ' - ' + str(self.end_date)
        ws1.write_merge(row, row, 0, len(header_lst)-1, nm, first_header_content_style)
        
        row += 1
        cnt = 0
        # Set column Header 
        for coll in header_lst:
            ws1.write(row, cnt, coll, sub_header_style)
            cnt += 1

        row += 1
        
        
        # Fill data row wise
        # loop of orders which are in sale state
        for order in self.env['sale.order'].search([('id','in',active_ids), ('state', '=', 'sale')]):
            # Condition for date range 
            if order.date_order >= self.start_date and order.date_order <= self.end_date: 
                partner = order.partner_id

                invoice_addrs = order.partner_invoice_id
                inv_state = invoice_addrs.state_id.name if invoice_addrs.state_id else ''
                inv_country = invoice_addrs.country_id.name if invoice_addrs.country_id else ''

                delivery_addrs = order.partner_shipping_id
                delivery_state = delivery_addrs.state_id.name if delivery_addrs.state_id else ''
                delivery_country = delivery_addrs.country_id.name if delivery_addrs.country_id else ''

                for line in order.order_line:
                    
                    if len(line.invoice_lines) == 0 and len(line.move_ids) == 0:
                        data_lst = []
                        product = line.product_id

                        data_lst.extend([
                            order.name,
                            str(order.date_order),
                            partner.name,
                            partner.email or '',
                            partner.mobile or '',
                            partner.phone or '',
                            order.payment_term_id.name or '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            delivery_addrs.name or '',
                            delivery_addrs.street or '',
                            delivery_addrs.street2 or '',
                            delivery_addrs.city or '',
                            delivery_state or '',
                            delivery_country or '',
                            delivery_addrs.zip or '',
                            delivery_addrs.phone or '',
                            delivery_addrs.mobile or '',
                            delivery_addrs.email or '',
                            invoice_addrs.name or '',
                            invoice_addrs.street or '',
                            invoice_addrs.street2 or '',
                            invoice_addrs.city or '',
                            inv_state or '',
                            inv_country or '',
                            invoice_addrs.zip or '',
                            invoice_addrs.phone or '',
                            invoice_addrs.mobile or '',
                            invoice_addrs.email or '',
                            product.default_code or '',
                            product.display_name,
                            product.qty_available,
                            line.product_uom_qty,
                            product.product_tmpl_id.name or '',
                            product.categ_id.complete_name,
                            line.salesman_id.sale_team_id.name or '',
                            product.standard_price,
                            product.list_price,
                            # order.delivery_price,
                            line.price_unit,
                            line.price_total,
                            line.price_subtotal,
                            str(line.discount) + ' %',
                            '',
                            order.state,
                            line.state,
                            str(order.date_order),
                            product.weight,
                            product.volume,
                        ])

                        cntt = 0
                        # Set column Data 
                        for data in data_lst:
                            ws1.write(row, cntt, data, sub_header_content_style)
                            cntt += 1
                        row += 1
                    else:
                        for invoice in line.invoice_lines:
                            data_lst = []
                            invoice = invoice.invoice_id
                            product = line.product_id

                            data_lst.extend([
                                order.name,
                                str(order.date_order),
                                partner.name,
                                partner.email or '',
                                partner.mobile or '',
                                partner.phone or '',
                                order.payment_term_id.name or '',
                                invoice.number if invoice else '',
                                str(invoice.date_invoice) if invoice else '',
                                invoice.state if invoice else '',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '',
                                delivery_addrs.name or '',
                                delivery_addrs.street or '',
                                delivery_addrs.street2 or '',
                                delivery_addrs.city or '',
                                delivery_state or '',
                                delivery_country or '',
                                delivery_addrs.zip or '',
                                delivery_addrs.phone or '',
                                delivery_addrs.mobile or '',
                                delivery_addrs.email or '',
                                invoice_addrs.name or '',
                                invoice_addrs.street or '',
                                invoice_addrs.street2 or '',
                                invoice_addrs.city or '',
                                inv_state or '',
                                inv_country or '',
                                invoice_addrs.zip or '',
                                invoice_addrs.phone or '',
                                invoice_addrs.mobile or '',
                                invoice_addrs.email or '',
                                product.default_code or '',
                                product.display_name,
                                product.qty_available,
                                line.product_uom_qty,
                                product.product_tmpl_id.name or '',
                                product.categ_id.complete_name,
                                line.salesman_id.sale_team_id.name or '',
                                product.standard_price,
                                product.list_price,
                                # order.delivery_price,
                                line.price_unit,
                                line.price_total,
                                line.price_subtotal,
                                str(line.discount) + ' %',
                                '',
                                order.state,
                                line.state,
                                str(order.date_order),
                                product.weight,
                                product.volume,
                            ])

                            cntt = 0
                            # Set column Data 
                            for data in data_lst:
                                ws1.write(row, cntt, data, sub_header_content_style)
                                cntt += 1
                            row += 1

                        for move in line.move_ids:
                            data_lst = []
                            invoice = None
                            product = line.product_id

                            data_lst.extend([
                                order.name,
                                str(order.date_order),
                                partner.name,
                                partner.email or '',
                                partner.mobile or '',
                                partner.phone or '',
                                order.payment_term_id.name or '',
                                '',
                                '',
                                '',
                                str(move.date),
                                str(move.date_deadline),
                                move.state,
                                move.reference,
                                move.location_id.complete_name,
                                move.location_dest_id.complete_name,
                                move.product_uom_qty,
                                delivery_addrs.name or '',
                                delivery_addrs.street or '',
                                delivery_addrs.street2 or '',
                                delivery_addrs.city or '',
                                delivery_state or '',
                                delivery_country or '',
                                delivery_addrs.zip or '',
                                delivery_addrs.phone or '',
                                delivery_addrs.mobile or '',
                                delivery_addrs.email or '',
                                invoice_addrs.name or '',
                                invoice_addrs.street or '',
                                invoice_addrs.street2 or '',
                                invoice_addrs.city or '',
                                inv_state or '',
                                inv_country or '',
                                invoice_addrs.zip or '',
                                invoice_addrs.phone or '',
                                invoice_addrs.mobile or '',
                                invoice_addrs.email or '',
                                product.default_code or '',
                                product.display_name,
                                product.qty_available,
                                line.product_uom_qty,
                                product.product_tmpl_id.name or '',
                                product.categ_id.complete_name,
                                line.salesman_id.sale_team_id.name or '',
                                product.standard_price,
                                product.list_price,
                                # order.delivery_price,
                                line.price_unit,
                                line.price_total,
                                line.price_subtotal,
                                str(line.discount) + ' %',
                                str(move.date) or '',
                                order.state,
                                line.state,
                                str(order.date_order),
                                product.weight,
                                product.volume,
                            ])

                            cntt = 0
                            # Set column Data 
                            for data in data_lst:
                                ws1.write(row, cntt, data, sub_header_content_style)
                                cntt += 1
                            row += 1

        # Set file standard
        wb1.save(fp)
        context = {}
        out = base64.encodestring(fp.getvalue())
        context['name'] = 'sales_summary_reports.xls'
        context['file'] = out
        self.write({'state': 'get', 'report': out, 'name': 'sales_summary_report.xls'})
        # Return to wizard
        return {
            'type': 'ir.actions.act_window',
            'res_model': 'sale.export.wizard',
            'view_mode': 'form',
            'view_type': 'form',
            'res_id': self.id,
            'views': [(False, 'form')],
            'target': 'new',
        }


