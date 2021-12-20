# -*- coding: utf-8 -*-
##############################################################################
#
#    AtharvERP Business Solutions
#    Copyright (C) 2020-TODAY AtharvERP Business Solutions(<http://www.atharverp.com>).
#    Author: AtharvERP Business Solutions(<http://www.atharverp.com>)
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

from odoo import models, fields, api, _

class ir_ui_menu(models.Model):
    _inherit = 'ir.ui.menu'

    @api.model
    def search(self, args, offset=0, limit=None, order=None, count=False):
        context = self._context or {}
        if args is None:
            args = []
        group_ids = self.env['res.groups'].search([('users', 'in', [self._uid])])
        ima_ids = self.env['ir.menu.access'].search(['|', ('group_ids', 'in', [group_id.id for group_id in group_ids]),
                                                          ('user_ids', 'in', [self._uid])])
        if ima_ids:
            menu_ids = []
            for ima in ima_ids:
                menu_ids += map(lambda a: a.id, ima.menu_ids)
            args += [('id', 'not in', menu_ids)]
        return super(ir_ui_menu, self).search(args, offset, limit,
                                              order, count=count)