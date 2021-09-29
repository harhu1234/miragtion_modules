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

from odoo import models, fields


class ImportOrderMaster(models.Model):

    _name = 'import.order.master'
    _description = "Import Order Status"
    _rec_name = 'file'

    file = fields.Binary('File')
    filename = fields.Char('File Name')
    user_id = fields.Many2one("res.users", "Imported by")
    cron_id = fields.Many2one('ir.cron', "Running Cron")
    file_updated = fields.Boolean("File Updated?")
    status = fields.Selection([('in_process', 'In Progress'),
                               ("imported", "Imported"), ("failed", "Failed")],
                              default='in_process')
    type = fields.Selection([("csv", "CSV"), ("xlsx", "XLSX")],
                            default="csv", string="File type.")
    operation = fields.Selection(
        [('create', 'Create Record'), ('update', 'Update Record')],
        default='create')
    import_type = fields.Selection([('order', 'Import Orders'),
                                    ('line', 'Import Sales Lines'),
                                    ('attachment', 'Import Sales Attachment')],
                                   default='order')
