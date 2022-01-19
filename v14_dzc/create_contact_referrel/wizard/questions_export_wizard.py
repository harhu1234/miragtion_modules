from odoo import models, fields, api
from io import BytesIO
import xlwt
import base64

class QuestionsExport(models.TransientModel):

    _name = "questions.export.wizard"
    _description = "Partner Export XLS Report"

    state = fields.Selection(
        [('choose', 'choose'), ('get', 'get')], default='choose')
    report = fields.Binary('Prepared file', filters='.xls', readonly=True)
    name = fields.Char('File Name', size=32)

    # Method to prepare export data
    def export_data(self):
        self.ensure_one()
        active_ids = self._context.get('active_ids')
        wb1 = xlwt.Workbook(encoding='utf-8')
        ws1 = wb1.add_sheet('Partners')

        fp = BytesIO()
        # Set formating style for xls report
        first_header_content_style = xlwt.easyxf("font: name Helvetica size 150 px, bold 1, height 270; "
                                                 "align: horiz center")
        header_content_style = xlwt.easyxf(
            "font: name Helvetica size 50 px, bold 1, height 225; align: horiz center")
        sub_header_style = xlwt.easyxf('pattern: pattern solid, fore_colour white;' 'font: name Helvetica size 12 px, '
                                       'bold 1, height 170;' 'borders: top thin, right thin, bottom thin, left thin;' "alignment: wrap 0;")
        sub_header_content_style = xlwt.easyxf(
            "font: name Helvetica size 10 px, height 170;" "alignment: wrap 0;")
        row = 1
        col = 0
        # Generate table (row/column)
        # Set column Header
        ws1.write(row, col, 'Oppertunity', sub_header_style)
        ws1.write(row, col + 1, 'Wij willen graag weten hoe je bij ons terecht bent gekomen:', sub_header_style)
        ws1.write(row, col + 2, 'Waarom kies je voor De Zorgcoach?', sub_header_style)

        row += 1
        col = 0

        # Fill data row wise
        for app in self.env['crm.lead'].browse(active_ids):
            if app.description and ('Waarom kies je voor De Zorgcoach?' in app.description or \
                'Wij willen graag weten hoe je bij ons terecht bent gekomen:' in app.description):
                des = app.description
                ans_1 = ''
                ans_2 = ''
                if 'Wij willen graag weten hoe je bij ons terecht bent gekomen::' in des:
                    ans_1 = des.split('Wij willen graag weten hoe je bij ons terecht bent gekomen::')[1].strip()
                    if '\n' in ans_1:
                        ans_1 = ans_1.split('\n')[0].strip()
                    if ans_1 == 'Anders, namelijk:':
                        ans_1 = des.split("\n")
                        if 'Anders, namelijk...:' in ans_1:
                            index = ans_1.index('Anders, namelijk...:')
                            if len(ans_1) > index:
                                ans_1 = ans_1[index + 1].strip()
                                ans_1 = 'Anders, namelijk:' + ans_1
                if 'Waarom kies je voor De Zorgcoach?:\n' in des:
                    ans_2 = des.split('Waarom kies je voor De Zorgcoach?:\n')[1]
                ws1.write(row, col, app.name,  sub_header_content_style)
                ws1.write(row, col + 1, ans_1, sub_header_content_style)
                ws1.write(row, col + 2, ans_2.strip(), sub_header_content_style)
                row += 1

        # Set file standard
        wb1.save(fp)
        context = {}
        out = base64.encodestring(fp.getvalue())
        context['name'] = 'report_last_two_questions.xls'
        context['file'] = out
        self.write({'state': 'get', 'report': out,
                    'name': 'report_last_two_questions.xls'})
        # Return to wizard
        return {
            'type': 'ir.actions.act_window',
            'res_model': 'questions.export.wizard',
            'view_mode': 'form',
            'view_type': 'form',
            'res_id': self.id,
            'views': [(False, 'form')],
            'target': 'new',
        }
