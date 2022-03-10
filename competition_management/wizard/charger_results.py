# -*- coding: utf-8 -*-

from odoo.exceptions import Warning
from odoo import api, exceptions,fields, models, _
import io
import logging
_logger = logging.getLogger(__name__)

try:
    import csv
except ImportError:
    _logger.debug('Cannot `import csv`.')
try:
    import base64
except ImportError:
    _logger.debug('Cannot `import base64`.')

class StockQuantityHistory(models.TransientModel):
    _name = 'charger.result.wizard'
    _description = 'Charger Result Wizard'

    name = fields.Char(string="Aashish")
    upload_file = fields.Binary(string="Upload File")

    def upload_result(self):
        self.ensure_one()
        csv_data = base64.b64decode(self.upload_file)
        data_file = io.StringIO(csv_data.decode("utf-8"))
        result_obj = self.env['sports.result']
        athletic_obj = self.env['sports.athletes']
        data_file.seek(0)
        file_reader = []
        csv_reader = csv.reader(data_file, delimiter=',')     
        sport_compitition = self.env['sports.competitions'].browse(self._context.get('active_id'))
        try:
            file_reader.extend(csv_reader)
        except Exception:
            raise exceptions.Warning(_("Invalid file!"))            
        header_row = file_reader[0]
        final_data = []
        for info in file_reader[1:]:
            athletic_line = dict(zip(header_row, info))
            found = False
            for result_line in sport_compitition.resultats_ids:
                if result_line.athletes_id.name == athletic_line.get('name'):
                    result_line.note = athletic_line.get('note')
                    result_line.remark = athletic_line.get('remark')
                    found = True

            if not found:
                athalets_rec = athletic_obj.search([('name','=',athletic_line.get('name'))], limit=1)
                if athalets_rec:
                    data_result = { 'competition_id':sport_compitition.id,     
                                    'athletes_id': athalets_rec and athalets_rec.id or False,
                                    'note':athletic_line.get('note'),
                                    'remark':athletic_line.get('remark'),
                                            }
                    result_obj.create(data_result)

