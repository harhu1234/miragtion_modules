from odoo import api, fields, models
# from odoo.osv.orm import except_orm
from odoo.tools.translate import _
from datetime import datetime
import logging
_logger = logging.getLogger(__name__)

class ProjectTask(models.Model):
    _inherit = "project.task"
    _order = "priority desc, date_deadline, sequence, id desc"

    date_deadline = fields.Date(string='Deadline', index=True, copy=False, track_visibility='always')

    def _track_subtype(self, init_values):
        self.ensure_one()
        if ('date_deadline' in init_values and self.date_deadline) or ('user_id' in init_values and self.user_id):
            if self.user_id and self.date_deadline and fields.Datetime.from_string(self.date_deadline) <= datetime.now():
                return 'project_task_notifications_zorg.mt_task_assigned_deadline'
            elif 'user_id' in init_values and self.user_id:
                return 'project_task_notifications_zorg.m_task_assigned'
        return '' #super(ProjectTask, self)._track_subtype(init_values)

    def _message_auto_subscribe_notify(self, partner_ids):
        # Do not notify user it has been marked as follower of its employee.
        return

    def message_track(self, tracked_fields, initial_values):
        """ Track updated values. Comparing the initial and current values of
        the fields given in tracked_fields, it generates a message containing
        the updated values. This message can be linked to a mail.message.subtype
        given by the ``_track_subtype`` method. """
        if not tracked_fields:
            return True

        tracking = self._message_track_get_changes(tracked_fields, initial_values)
        for record in self:
            changes, tracking_value_ids = tracking[record.id]
            if not changes:
                continue

            # find subtypes and post messages or log if no subtype found
            subtype_xmlid = False
            # By passing this key, that allows to let the subtype empty and so don't sent email because partners_to_notify from mail_message._notify will be empty
            if not self._context.get('mail_track_log_only'):
                subtype_xmlid = record._track_subtype(
                    dict((col_name, initial_values[record.id][col_name]) for col_name in changes))

            if subtype_xmlid:
                subtype_rec = self.env.ref(subtype_xmlid)  # TDE FIXME check for raise if not found
                if not (subtype_rec and subtype_rec.exists()):
                    _logger.debug('subtype %s not found' % subtype_xmlid)
                    continue
                if subtype_xmlid in ('project_task_notifications_zorg.mt_task_assigned_deadline', 'project_task_notifications_zorg.m_task_assigned'):
                    just_assigned = record and record.user_id and record.user_id.partner_id and record.user_id.partner_id.id or False
                    just_assigned = [just_assigned]

                    u_name = record and record.user_id and record.user_id.partner_id and record.user_id.partner_id.name or ''
                    p_name = record and record.project_id and record.project_id.name or ''
                    if subtype_xmlid == 'project_task_notifications_zorg.mt_task_assigned_deadline':
                        subject = 'Er is een taak verlopen'
                        body= """Hi """ + u_name + """,
<br/>
                        Taak is verlopen.
<br/>
			- Project: """ + p_name + """
<br/>
                        """
                    else:
                        subject = 'Binnen het project ' + p_name + ' is er een nieuwe taak voor je!'
                        body= """Hi """ + u_name + """

                        In deze e-mail staat een nieuwe taak voor je klaar. Zou je deze willen oppakken? De deadline staat in de taak. Mocht de taak volgens jou niet bij jou horen, laat het me dan weten. Je kan gewoon deze mail beantwoorden.
                        """

                    record.with_context({'mail_post_autofollow_partner_ids': []}).message_post(subtype=subtype_xmlid, tracking_value_ids=tracking_value_ids, partner_ids=just_assigned, needaction_partner_ids=just_assigned, subject=subject, body=body)
                else:
                    record.message_post(subtype=subtype_xmlid, tracking_value_ids=tracking_value_ids)
            elif tracking_value_ids:
                record.message_post(tracking_value_ids=tracking_value_ids)

        self._message_track_post_template(tracking)

        return True

class Message(models.Model):

    _inherit = 'mail.message'

    def _notify(self, force_send=False, send_after_commit=True, user_signature=True):
        """ Compute recipients to notify based on specified recipients and document
        followers. Delegate notification to partners to send emails and bus notifications
        and to channels to broadcast messages on channels """
        group_user = self.env.ref('base.group_user')
        # have a sudoed copy to manipulate partners (public can go here with website modules like forum / blog / ... )
        self_sudo = self.sudo()

        self.ensure_one()
        partners_sudo = self_sudo.partner_ids
        channels_sudo = self_sudo.channel_ids

        # all followers of the mail.message document have to be added as partners and notified
        # and filter to employees only if the subtype is internal
        if self_sudo.subtype_id and self.model and self.res_id and (self_sudo.subtype_id not in [self.env.ref('project_task_notifications_zorg.mt_task_assigned_deadline'), self.env.ref('project_task_notifications_zorg.m_task_assigned')]):
            followers = self_sudo.env['mail.followers'].search([
                ('res_model', '=', self.model),
                ('res_id', '=', self.res_id),
                ('subtype_ids', 'in', self_sudo.subtype_id.id),
            ])
            if self_sudo.subtype_id.internal:
                followers = followers.filtered(lambda fol: fol.channel_id or (
                            fol.partner_id.user_ids and group_user in fol.partner_id.user_ids[0].mapped('groups_id')))
            channels_sudo |= followers.mapped('channel_id')
            partners_sudo |= followers.mapped('partner_id')

        # remove author from notified partners
        if not self._context.get('mail_notify_author', False) and self_sudo.author_id:
            partners_sudo = partners_sudo - self_sudo.author_id

        # update message, with maybe custom values
        message_values = {}
        if channels_sudo:
            message_values['channel_ids'] = [(6, 0, channels_sudo.ids)]
        if partners_sudo:
            message_values['needaction_partner_ids'] = [(6, 0, partners_sudo.ids)]
        if self.model and self.res_id and hasattr(self.env[self.model], 'message_get_message_notify_values'):
            message_values.update(
                self.env[self.model].browse(self.res_id).message_get_message_notify_values(self, message_values))
        if message_values:
            self.write(message_values)

        # notify partners and channels
        # those methods are called as SUPERUSER because portal users posting messages
        # have no access to partner model. Maybe propagating a real uid could be necessary.
        email_channels = channels_sudo.filtered(lambda channel: channel.email_send)
        notif_partners = partners_sudo.filtered(lambda partner: 'inbox' in partner.mapped('user_ids.notification_type'))
        if email_channels or partners_sudo - notif_partners:
            partners_sudo.search([
                '|',
                ('id', 'in', (partners_sudo - notif_partners).ids),
                ('channel_ids', 'in', email_channels.ids),
                ('email', '!=', self_sudo.author_id.email or self_sudo.email_from),
            ])._notify(self, force_send=force_send, send_after_commit=send_after_commit, user_signature=user_signature)

        notif_partners._notify_by_chat(self)

        channels_sudo._notify(self)

        # Discard cache, because child / parent allow reading and therefore
        # change access rights.
        if self.parent_id:
            self.parent_id.invalidate_cache()

        return True


class MailActivity(models.Model):

    _inherit = 'mail.activity'

    def action_close_dialog(self):

        if self.res_model == 'project.task' and self.res_id:
            task = self.env['project.task'].browse(self.res_id)
            if task:
                just_assigned = self and self.user_id and self.user_id.partner_id and self.user_id.partner_id.id or False
                just_assigned = [just_assigned]

                u_name = self and self.user_id and self.user_id.partner_id and self.user_id.partner_id.name or ''
                #p_name = self and self.summary or ''
                p_name = task.project_id and task.project_id.name or ''
                p_name = p_name + ', ' + (self.summary or '')
                subject = 'Binnen het project ' + p_name + ' - is er een nieuwe taak voor je!'
                body = """Hi """ + u_name + """
                        <br/>
                        In deze e-mail staat een nieuwe taak voor je klaar. Zou je deze willen oppakken? De deadline staat in de taak. Mocht de taak volgens jou niet bij jou horen, laat het me dan weten. Je kan gewoon deze mail beantwoorden.
                        """

                task.with_context({'mail_post_autofollow_partner_ids': []}).message_post(
                                                                                       partner_ids=just_assigned,
                                                                                       needaction_partner_ids=just_assigned,
                                                                                       subject=subject, body=body)

        return {'type': 'ir.actions.act_window_close'}
