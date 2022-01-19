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

from odoo import fields, models, api
from datetime import datetime


class ProjectCustomChecklist(models.Model):
    _name = "project.custom.checklist"

    name = fields.Char("Name", required=True)
    description = fields.Char("Description")


class ProjectCustomChecklistLine(models.Model):
    _name = "project.custom.checklist.line"

    name = fields.Many2one("project.custom.checklist", "Name", required=True)
    description = fields.Char("Description")
    updated_date = fields.Date("Date", readonly=True, default=datetime.now().strftime('%Y-%m-%d'))
    state = fields.Selection([('new', 'New'), ('completed', 'Completed'), ('cancelled', 'Cancelled')], string="State", default='new', readonly=True, index=True)

    project_id = fields.Many2one("project.project")

    def btn_check(self):
        self.write({'state': 'completed'})

    def btn_close(self):
        self.write({'state': 'cancelled'})

    @api.onchange('name')
    def onchange_custom_chacklist_name(self):
        self.description = self.name.description


class ProjectProject(models.Model):
    _inherit = 'project.project'

    custom_checklist_ids = fields.One2many("project.custom.checklist.line", "project_id", "Checklist")
    custom_checklist = fields.Float("Checklist Completed", compute="_compute_custom_checklist",readonly=True)
    
    @api.depends('custom_checklist_ids')
    def _compute_custom_checklist(self):
        for record in self:
            total_cnt = self.env['project.custom.checklist.line'].search_count([('project_id', '=', record.id), ('state', '!=', 'cancelled')])
            compl_cnt = self.env['project.custom.checklist.line'].search_count([('project_id', '=', record.id), ('state', '=', 'completed')])

            if total_cnt > 0:
                record.custom_checklist = (100.0 * compl_cnt) / total_cnt
            else:
                record.custom_checklist = 0
