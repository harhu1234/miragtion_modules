# -*- coding: utf-8 -*-
from odoo import api, fields, models, tools, SUPERUSER_ID, _
import re
from odoo.exceptions import AccessError

AVAILABLE_PRIORITIES = [
    ('0', 'Low'),
    ('1', 'Normal'),
    ('2', 'High'),
    ('3', 'Urgent'),
]


class klachtenTicket(models.Model):
    _name = "klachten.ticket"
    _description = "klachten Tickets"
    _inherit = ['mail.thread', 'mail.activity.mixin', 'portal.mixin']
    _order = "priority desc, create_date desc"
    _mail_post_access = 'read'

    @api.model
    def _get_default_stage_id(self):
        return self.env['klachten.stage'].search([], order='sequence', limit=1)

    name = fields.Char(string='Ticket', required=True)
    description = fields.Text('Private Note')
    partner_id = fields.Many2one('res.partner', string='Customer', index=True)
    contact_name = fields.Char('Contact Name')
    email_from = fields.Char('Email', help="Email address of the contact", index=True)
    user_id = fields.Many2one('res.users', string='Assigned to', index=True, default=False)
    team_id = fields.Many2one('klachten.team', string='Support Team',
        default=lambda self: self.env['klachten.team'].sudo()._get_default_team_id(user_id=self.env.uid),
        index=True, help='When sending mails, the default email address is taken from the support team.')
    date_deadline = fields.Datetime(string='Deadline')
    date_done = fields.Datetime(string='Done')

    stage_id = fields.Many2one('klachten.stage', string='Stage', index=True,
                               domain="[]",
                               copy=False,
                               group_expand='_read_group_stage_ids',
                               default=_get_default_stage_id)
    tag_ids = fields.Many2many('klachten.tag', 'rel_klachten_tag', 'klachten_id', 'tag_id', string="Tags")
    priority = fields.Selection(AVAILABLE_PRIORITIES, 'Priority', index=True, default='1')
    kanban_state = fields.Selection([('normal', 'Normal'), ('blocked', 'Blocked'), ('done', 'Ready for next stage')],
                                    string='Kanban State',
                                    required=True, default='normal',
                                    help="""A Ticket's kanban state indicates special situations affecting it:\n
                                           * Normal is the default situation\n
                                           * Blocked indicates something is preventing the progress of this ticket\n
                                           * Ready for next stage indicates the ticket is ready to go to next stage""")

    color = fields.Integer('Color Index')
    legend_blocked = fields.Char(related="stage_id.legend_blocked", readonly=True)
    legend_done = fields.Char(related="stage_id.legend_done", readonly=True)
    legend_normal = fields.Char(related="stage_id.legend_normal", readonly=True)

    active = fields.Boolean(default=True)
    company_id = fields.Many2one('res.company', string='Company', default=lambda self: self.env.user.company_id)


    @api.onchange('partner_id')
    def _onchange_partner_id(self):
        """ This function sets partner email address based on partner
        """
        self.email_from = self.partner_id.email

    
    def copy(self, default=None):
        if default is None:
            default = {}
        default.update(name=_('%s (copy)') % (self.name))
        return super(klachtenTicket, self).copy(default=default)

    
    def message_get_suggested_recipients(self):
        recipients = super(klachtenTicket, self).message_get_suggested_recipients()
        try:
            for tic in self:
                if tic.partner_id:
                    tic._message_add_suggested_recipient(recipients, partner=tic.partner_id,
                                                         reason=_('Customer'))
                elif tic.email_from:
                    tic._message_add_suggested_recipient(recipients, email=tic.email_from,
                                                         reason=_('Customer Email'))
        except AccessError:  # no read access rights -> just ignore suggested recipients because this imply modifying followers
            pass
        return recipients

    def _email_parse(self, email):
        match = re.match(r"(.*) *<(.*)>", email)
        if match:
            contact_name, email_from =  match.group(1,2)
        else:
            match = re.match(r"(.*)@.*", email)
            contact_name =  match.group(1)
            email_from = email
        return contact_name, email_from

    @api.model
    def message_new(self, msg, custom_values=None):
        """ Overrides mail_thread message_new that is called by the mailgateway
            through message_process.
            This override updates the document according to the email.
        """
        # remove default author when going through the mail gateway. Indeed we
        # do not want to explicitly set user_id to False; however we do not
        # want the gateway user to be responsible if no other responsible is
        # found.
        match = re.match(r"(.*) *<(.*)>", msg.get('from'))
        if match:
            contact_name, email_from =  match.group(1,2)
        else:
            match = re.match(r"(.*)@.*", msg.get('from'))
            contact_name =  match.group(1)
            email_from = msg.get('from')

        body = tools.html2plaintext(msg.get('body'))
        bre = re.match(r"(.*)^-- *$", body, re.MULTILINE|re.DOTALL|re.UNICODE)
        desc = bre.group(1) if bre else None

        defaults = {
            'name':  msg.get('subject') or _("No Subject"),
            'email_from': email_from,
            'description':  desc or body,
        }

        partner = self.env['res.partner'].sudo().search([('email', '=ilike', email_from)], limit=1)
        if partner:
            defaults.update({
                'partner_id': partner.id,
            })
        else:
            defaults.update({
                'contact_name': contact_name,
            })

        create_context = dict(self.env.context or {})
        # create_context['default_user_id'] = False
        # create_context.update({
        #     'mail_create_nolog': True,
        # })

        company_id = False
        if custom_values:
            defaults.update(custom_values)
            team_id = custom_values.get('team_id')
            if team_id:
                team = self.env['klachten.team'].sudo().browse(team_id)
                if team.company_id:
                    company_id = team.company_id.id
        if not company_id and partner.company_id:
            company_id = partner.company_id.id
        defaults.update({'company_id': company_id})

        return super(klachtenTicket, self.with_context(create_context)).message_new(msg, custom_values=defaults)

    @api.model
    def create(self, vals):

        # if partner_id:
        #     vals.update({
        #         'message_follower_ids': [(4, partner_id)]
        #         })

        context = dict(self.env.context)
        context.update({
            'mail_create_nosubscribe': True,
        })
        # self.message_subscribe([partner_id])
        res = super(klachtenTicket, self.with_context(context)).create(vals)

        mail_server = self.env['ir.mail_server']
        base_url = self.env['ir.config_parameter'].sudo().get_param('web.base.url')
        action_id = self.env.ref('klachten.klachten_ticket_categ_act0').id
        menu_id = self.env.ref('klachten.menu_tickets_act').id
        link_ticket = base_url + '/web#id=' + str(res.id) + '&view_type=form&model=klachten.ticket&menu_id=' + \
                      str(menu_id) + '&action=' + str(action_id)
        body_html = "Goedendag, er is een nieuwe klacht binnengekomen, klik hier voor de ticket "
        body_html += "\n"
        body_html += "<a href='" + str(link_ticket) + "'>" + vals.get('name') + "</a>"
        message = mail_server.sudo().build_email(
            email_from=self.sudo().env.user.email,
            subject=_(u'Er is een nieuwe klacht binnengekomen'),
            body=body_html,
            subtype='html',
            email_to=['kenb@dezorgcoach.nl'],
        )
        mail_server.sudo().send_email(message)

        return res


    
    def write(self, vals):
        # stage change: update date_last_stage_update
        if 'stage_id' in vals:
            if 'kanban_state' not in vals:
                vals['kanban_state'] = 'normal'
            stage = self.env['klachten.stage'].browse(vals['stage_id'])
            if stage.last:
                vals.update({'date_done': fields.Datetime.now()})
            else:
                vals.update({'date_done': False})

        return super(klachtenTicket, self).write(vals)

    @api.model
    def _read_group_stage_ids(self, stages, domain, order):

        search_domain = []

        # perform search
        stage_ids = stages._search(search_domain, order=order, access_rights_uid=SUPERUSER_ID)
        return stages.browse(stage_ids)

    
    def takeit(self):
        self.ensure_one()
        vals = {
            'user_id' : self.env.uid,
            # 'team_id': self.env['klachten.team'].sudo()._get_default_team_id(user_id=self.env.uid).id
        }
        return super(klachtenTicket, self).write(vals)
