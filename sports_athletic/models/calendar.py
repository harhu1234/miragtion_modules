# -*- coding: utf-8 -*-
##############################################################################
#
#    odoo, Open Source Management Solution
#    Copyright (C) 2004-2010 Tiny SPRL (<http://tiny.be>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

import logging
from datetime import datetime
from dateutil.relativedelta import relativedelta
from operator import itemgetter
import time

import odoo
from odoo import SUPERUSER_ID, api
from odoo import tools
from odoo.osv import osv, expression
from odoo import api, fields, tools, models, _
from odoo.tools.translate import _
from odoo.tools.float_utils import float_round as round
from odoo.tools.safe_eval import safe_eval as eval

import odoo.addons.decimal_precision as dp

_logger = logging.getLogger(__name__)


class calendar_type(osv.osv):
    _name = "calendar.type"
    _columns = {
        'name': fields.Char('Type de calandrier', size=256)
    }


class athletic_athlete_wkf_annual_calendar(osv.osv):
    _name = "athletic.athlete.wkf.annual.calendar"
    _description = "Workflow calendrier annuel"

    num_calendar = fields.Char('N° Calendrier', size=256)
    season_id = fields.Many2one('sports.saison', 'Saison Sportive')
    date_start_season = fields.Date('Date de début planification', required=True)
    date_end_season = fields.Date('Date de Fin planification', required=True)

    date_start_organisation = fields.Date('Date de début organisation')
    date_end_organisation = fields.Date('Date de Fin organisation')
    # 'type': fields.selection([('International','International'),('Cross','Cross/Athletisme'),('Autre','Autre')], 'Type', required=True)
    typee = fields.Many2one('calendar.type', 'Type')
    metier = fields.Selection([('club', 'Club'), ('ligue', 'Ligue'), ('Frma', 'Frma'), ('Autre', 'Autre')], 'Organisé Par', required=True)
    description = fields.Char('Description', size=256)
    state = fields.Selection([('calen_cours_prep', 'Calendrier Annuel en cours de Préparation'), ('circ_att_val', 'Circulaire en attente de validation'), ('circ_att_diff', 'Circulaire en Attente de Diffusion'), ('att_coll_cal_reg', 'Attente de Collecte des Calendriers Régionaux'), ('cal_att_val', 'Calendrier Annuel en Attente de Validation'), ('cal_att_rem_fed', 'Attente de Remise du Calendrier au Bureau Fédéral'), ('cal_att_val_bur', 'Calendrier en Attente de Validation par le Bureau Fédéral'), ('cal_att_maj', 'Calendrier en Attente de MAJ'), ('cal_att_pub', 'Calendrier en Attente de Publication'), ('cal_valide_pub', 'Calendrier Validé et Publié')], 'Statut', readonly=True)
    date_butoir_rec = fields.Date('Date Butoire pour la Récéption des Propositions')
    date_val_circ = fields.Date('Date de Validation du Circulaire')
    date_env_circ_l_c = fields.Date('Date Envoi du Circulaire aux Ligues et Clubs')
    date_rem_cal_bur_fed = fields.Date('Date de Remise du Calendrier au Bureau Fédéral')
    date_val_cal = fields.Date('Date de Validation du Calendrier Annuel')
    user_calen_cours_prep = fields.Many2one('res.users', 'Par', readonly=True)
    date_calen_cours_prep = fields.Datetime('Préparation du Calendrier Le', readonly=True)
    user_circ_att_val = fields.Many2one('res.users', 'Par', readonly=True)
    date_circ_att_val = fields.Datetime('Validation du Circulaire Le', readonly=True)
    user_circ_att_diff = fields.Many2one('res.users', 'Par', readonly=True)
    date_circ_att_diff = fields.Datetime('Diffusion du Circulaire Le', readonly=True)
    user_att_coll_cal_reg = fields.Many2one('res.users', 'Par', readonly=True)
    date_att_coll_cal_reg = fields.Datetime('Collecte des Calendriers Régionaux Le', readonly=True)
    user_cal_att_val = fields.Many2one('res.users', 'Par', readonly=True)
    date_cal_att_val = fields.Datetime('Validation des Calendriers Régionaux Le', readonly=True)
    user_cal_att_rem_fed = fields.Many2one('res.users', 'Par', readonly=True)
    date_cal_att_rem_fed = fields.Datetime('Remise du Calendrier à la Fédération Le', readonly=True)
    user_cal_att_val_bur = fields.Many2one('res.users', 'Par', readonly=True)
    date_cal_att_val_bur = fields.Datetime('Validation du Calendrier par le Bureau Le', readonly=True)
    user_cal_att_maj = fields.Many2one('res.users', 'Par', readonly=True)
    date_cal_att_maj = fields.Datetime('Mise à Jour du Calendrier Le', readonly=True)
    user_cal_att_pub = fields.Many2one('res.users', 'Par', readonly=True)
    date_cal_att_pub = fields.Datetime('Publication du Calendrier Le', readonly=True)


# ******************
    _defaults = {
        'state': lambda *a: 'calen_cours_prep',
        # 'season_id': organism.get_active_season,
        # 'metier': organism.get_active_metier,
    }

    def create(self, cr, uid, vals, context=None):
        if not vals.get('num_calendar'):
            vals['num_calendar'] = self.pool.get('ir.sequence').get(cr, uid, 'athlete.wkf.annual.calendar')
        return super(athletic_athlete_wkf_annual_calendar, self).create(cr, uid, vals, context)

    def action_circ_att_val(self, cr, uid, ids):
        self.write(cr, uid, ids, {'state': 'circ_att_val'})
        self.write(cr, uid, ids, {'date_calen_cours_prep': time.strftime('%Y-%m-%d %H:%M:%S'), 'user_calen_cours_prep': uid})
        #dispatcher.notify_set(self, cr, uid, 'athletic.athlete.wkf.annual.calendar', 'bt_circ_att_val', 'dir_org')
        return True

    def action_circ_att_diff(self, cr, uid, ids):
        self.write(cr, uid, ids, {'state': 'circ_att_diff'})
        self.write(cr, uid, ids, {'date_circ_att_val': time.strftime('%Y-%m-%d %H:%M:%S'), 'user_circ_att_val': uid})
        return True

    def action_att_coll_cal_reg(self, cr, uid, ids):
        self.write(cr, uid, ids, {'state': 'att_coll_cal_reg'})
        self.write(cr, uid, ids, {'date_circ_att_diff': time.strftime('%Y-%m-%d %H:%M:%S'), 'user_circ_att_diff': uid})
        return True

    def action_cal_att_val(self, cr, uid, ids):
        self.write(cr, uid, ids, {'state': 'cal_att_val'})
        self.write(cr, uid, ids, {'date_att_coll_cal_reg': time.strftime('%Y-%m-%d %H:%M:%S'), 'user_att_coll_cal_reg': uid})
        return True

    def action_cal_att_rem_fed(self, cr, uid, ids):
        self.write(cr, uid, ids, {'state': 'cal_att_rem_fed'})
        self.write(cr, uid, ids, {'date_cal_att_val': time.strftime('%Y-%m-%d %H:%M:%S'), 'user_cal_att_val': uid})
        return True

    def action_cal_att_val_bur(self, cr, uid, ids):
        self.write(cr, uid, ids, {'state': 'cal_att_val_bur'})
        self.write(cr, uid, ids, {'date_cal_att_rem_fed': time.strftime('%Y-%m-%d %H:%M:%S'), 'user_cal_att_rem_fed': uid})
        return True

    def action_cal_att_maj(self, cr, uid, ids):
        self.write(cr, uid, ids, {'state': 'cal_att_maj'})
        self.write(cr, uid, ids, {'date_cal_att_val_bur': time.strftime('%Y-%m-%d %H:%M:%S'), 'user_cal_att_val_bur': uid})
        return True

    def action_cal_att_pub(self, cr, uid, ids):
        self.write(cr, uid, ids, {'state': 'cal_att_pub'})
        self.write(cr, uid, ids, {'date_cal_att_maj': time.strftime('%Y-%m-%d %H:%M:%S'), 'user_cal_att_maj': uid})
        return True

    def action_cal_valide_pub(self, cr, uid, ids):
        self.write(cr, uid, ids, {'state': 'cal_valide_pub'})
        self.write(cr, uid, ids, {'date_cal_att_pub': time.strftime('%Y-%m-%d %H:%M:%S'), 'user_cal_att_pub': uid})
        return True

    # def bt_open_cal_competition(self, cr, uid, ids,context={}):

    # _rec_name = 'num_calendar'


athletic_athlete_wkf_annual_calendar()
