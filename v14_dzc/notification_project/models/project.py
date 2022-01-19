# -*- coding: utf-8 -*-

from odoo import fields, models
from odoo.tools.translate import _


class project_task_type(models.Model):
    _name = "project.task.type"
    _inherit = "project.task.type"

    is_notify = fields.Boolean(
        string=_(u'Send notification'),
        help=_(u'Send notification for task in this stage'),
        default=False,
    )


class project_task(models.Model):
    _name = 'project.task'
    _inherit = 'project.task'

    notification_task_re_id = fields.Many2one(
        'notification.task',
        string=_(u'Send notification'),
    )
