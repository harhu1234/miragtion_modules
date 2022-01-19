import string
from glob import glob

from odoo import models, fields, api, _
from odoo.service.db import dump_db, exp_drop, restore_db
from odoo.exceptions import AccessError
import os
import errno
import odoo
from os.path import expanduser

class klachtenConfig(models.TransientModel):
    _name = 'klachten.config.settings'
    _inherit = 'res.config.settings'
    _description ="Configuration Settings"

    default_name = fields.Char('Default ticket name', default_model='klachten.ticket')
    module_klachten_website = fields.Boolean("Publish on website", help='Installs module klachten_website')


