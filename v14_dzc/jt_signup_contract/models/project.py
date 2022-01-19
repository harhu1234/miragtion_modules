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

# from odoo import fields, models, api
#
# class ProjectTask(models.Model):
#
#     _inherit = 'project.task'
#
#     @api.model
#     def search_read(self, domain=None, fields=None, offset=0, limit=None, order=None):
#         domain = domain or []
#         if self.env.user.has_group('jt_signup_contract.group_application_user'):
#             domain.append(('user_id', '=', self.env.user.id))
#         res = super(ProjectTask, self).search_read(domain=domain, fields=fields, offset=offset,
#                                                       limit=limit, order=order)
#         return res
#
# class Project(models.Model):
#
#     _inherit = 'project.project'
#
#     def _compute_task_count(self):
#         if self.env.user.has_group('jt_signup_contract.group_application_user'):
#             task_data = self.env['project.task'].read_group(
#                 [('project_id', 'in', self.ids), ('user_id', '=', self.env.user.id), '|', ('stage_id.fold', '=', False),
#                  ('stage_id', '=', False)], ['project_id'], ['project_id'])
#         else:
#             task_data = self.env['project.task'].read_group(
#                 [('project_id', 'in', self.ids), '|', ('stage_id.fold', '=', False), ('stage_id', '=', False)],
#                 ['project_id'], ['project_id'])
#         result = dict((data['project_id'][0], data['project_id_count']) for data in task_data)
#         for project in self:
#             project.task_count = result.get(project.id, 0)
#
# class RESPartner(models.Model):
#
#     _inherit = 'res.partner'
#
#     def _compute_task_count(self):
#         if self.env.user.has_group('jt_signup_contract.group_application_user'):
#             fetch_data = self.env['project.task'].read_group([('partner_id', 'in', self.ids),
#                                 ('user_id', '=', self.env.user.id)], ['partner_id'], ['partner_id'])
#         else:
#             fetch_data = self.env['project.task'].read_group([('partner_id', 'in', self.ids)], ['partner_id'],
#                                                              ['partner_id'])
#         result = dict((data['partner_id'][0], data['partner_id_count']) for data in fetch_data)
#         for partner in self:
#             partner.task_count = result.get(partner.id, 0)