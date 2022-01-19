# -#- coding: utf-8 -*-

from odoo import models, api


class res_users(models.Model):
    _inherit = "res.users"


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
        elif obj._name == 'mail.activity':
            url = self.env.user.partner_id.sudo().with_context(
                signup_valid=True,
            )._get_signup_url_for_action(
                view_type="form",
                model='mail.activity',
                res_id=obj.id,
                action='notification_project.mail_activity_action',
            )[self.env.user.partner_id.id]
        url = url.replace('res_id', 'id')
        return url