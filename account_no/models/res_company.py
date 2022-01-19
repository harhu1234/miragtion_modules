# -*- coding: utf-8 -*-

from odoo import models, fields, api, _
from .account_batch_payment import check_valid_SEPA_str
from .account_journal import sanitize_communication

class ResCompany(models.Model):
    _inherit = "res.company"

    # TODO : complete methods _default_sepa_origid_id and _default_sepa_origid_issr for all countries of the Norway

    norway_orgid_id = fields.Char('Identification', size=35, copy=False, compute='_compute_norway_origid', readonly=False, store=True,
        help="Identification assigned by an institution (eg. VAT number).")
    norway_orgid_issr = fields.Char('Issuer', size=35, copy=False, compute='_compute_norway_origid', readonly=False, store=True,
        help="Entity that assigns the identification (eg. KBE-BCO or Finanzamt Muenchen IV).")
    norway_initiating_party_name = fields.Char('Your Company Name', size=70, copy=False,
        help="Will appear in Norway payments as the name of the party initiating the payment. Limited to 70 characters.")
    norway_pain_version = fields.Selection([('pain.001.001.03', 'Generic'), ('pain.001.001.03.ch.02', 'Swiss Version'), ('pain.001.003.03', 'German Version'), ('pain.001.001.03.se', 'Sweden Version')],
                                         string='Norway Pain Version',
                                         required=True,
                                         default='pain.001.001.03',
                                         compute='_compute_norway_pain_version',
                                         help='Norway may be a generic format, some countries differ from the Norway recommandations made by the EPC (European Payment Councile) and thus the XML created need some tweakenings.')

    @api.model
    def create(self, vals):
        # Overridden in order to set the name of the company as default value
        # for norway_initiating_party_name field
        name = vals.get('name')
        if name and 'norway_initiating_party_name' not in vals:
            vals['norway_initiating_party_name'] = sanitize_communication(name)

        return super(ResCompany, self).create(vals)

    @api.depends('partner_id.country_id')
    def _compute_norway_origid(self):
        """ Set default value for :
            - norway_orgid_issr, which correspond to the field 'Issuer' of an 'OrganisationIdentification', as described in ISO 20022.
            - norway_orgid_id, which correspond to the field 'Identification' of an 'OrganisationIdentification', as described in ISO 20022.
        """
        for company in self:
            if company.partner_id.country_id.code == 'BE':
                company.norway_orgid_issr = 'KBO-BCE'
                company.norway_orgid_id = company.vat[:2].upper() + company.vat[2:].replace(' ', '') if company.vat else ''
            else:
                company.norway_orgid_issr = ''
                company.norway_orgid_id = ''

    @api.depends('partner_id.country_id')
    def _compute_norway_pain_version(self):
        """ Set default value for the field norway_pain_version"""
        for company in self:
            if company.country_id.code == 'DE':
                company.norway_pain_version = 'pain.001.003.03'
            if company.country_id.code == 'CH':
                company.norway_pain_version = 'pain.001.001.03.ch.02'
            if company.partner_id.country_id.code == 'SE':
                company.norway_pain_version = 'pain.001.001.03.se'
            else:
                company.norway_pain_version = 'pain.001.001.03'

    @api.constrains('norway_orgid_id', 'norway_orgid_issr', 'norway_initiating_party_name')
    def _check_sepa_fields(self):
        for rec in self:
            if rec.norway_orgid_id:
                check_valid_SEPA_str(rec.norway_orgid_id)
            if rec.norway_orgid_issr:
                check_valid_SEPA_str(rec.norway_orgid_issr)
            if rec.norway_initiating_party_name:
                check_valid_SEPA_str(rec.norway_initiating_party_name)
