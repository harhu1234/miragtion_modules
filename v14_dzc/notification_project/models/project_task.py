# -*- coding: utf-8 -*-

from datetime import datetime, timedelta, date
from odoo import SUPERUSER_ID
from odoo import models, fields, api, _


class project_task(models.Model):
    _inherit = 'project.task'

    # @api.model
    # def cron_notify(self):
    #     """
    #     Find all overdue tasks in stages with is_notify attribute in True and notify responsible.
    #
    #     Methods:
    #      * build_email from 'ir.mail_server'
    #      * send_email from 'ir.mail_server'
    #     """
    #     context = self.env.context.copy()
    #     context.update({
    #         'datetime': datetime,
    #         'company': self.env.user.company_id.name,
    #         'only_user_sign': True,
    #     })
    #
    #     stage_ids = self.env['project.task.type'].search([('is_notify', '=', True)])
    #     today_date = fields.Datetime.now()
    #     task_ids = self.search([
    #         ('date_deadline', '<=', today_date),
    #         ('stage_id', 'in', stage_ids.ids),
    #     ])
    #
    #     user_tasks = {}
    #     for task in task_ids:
    #         if task.user_id:
    #             if task.user_id not in user_tasks.keys():
    #                 user_tasks[task.user_id] = [task]
    #             else:
    #                 user_tasks[task.user_id] += task
    #
    #     for (user, tasks) in user_tasks.items():
    #         template = self.with_context(lang=user.partner_id.lang).env.ref(
    #             'notification_project.project_task_notification_template'
    #         )
    #         context.update({
    #             'task_ids': tasks,
    #         })
    #
    #         body_html = template.with_context(context).render_template(
    #             template.body_html,
    #             'res.users',
    #             user and user.id or SUPERUSER_ID,
    #         )
    #
    #         mail_server = self.env['ir.mail_server']
    #         message = mail_server.with_context(context).build_email(
    #             email_from=self.sudo().env.user.email,
    #             subject=_(u'Overdue Tasks'),
    #             body=body_html,
    #             subtype='html',
    #             email_to=[user.partner_id.email],
    #         )
    #         mail_server.with_context(context).send_email(message)

    def get_task_url(self, obj):
        """
        Get url of overdue task.
        Args:
         * obj - 'project.task' object

        Methods:
         * _get_signup_url_for_action from res.partner
        """
        if not obj:
            return False
        self.ensure_one()
        if obj._name == 'project.task':
            url = self.env.user.partner_id.sudo().with_context(
                signup_valid=True,
            )._get_signup_url_for_action(
                view_type="form",
                model=obj._name,
                res_id=obj.id,
                action='project.action_view_task',
            )[self.env.user.partner_id.id]
        else:
            url = self.env.user.partner_id.sudo().with_context(
                signup_valid=True,
            )._get_signup_url_for_action(
                view_type="form",
                model='project.task',
                res_id=obj.res_id,
                action='project.action_view_task',
            )[self.env.user.partner_id.id]
        url = url.replace('res_id', 'id')
        return url
