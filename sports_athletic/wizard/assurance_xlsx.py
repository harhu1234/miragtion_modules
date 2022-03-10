from odoo import models,fields, api, _
import xlwt
import io
import base64
from xlwt import Workbook
from xlwt import easyxf

class AssuranceExcelExport(models.TransientModel):

	_name = 'assurance.excel.export.wizard'
	_description = 'Assurance Excel Export'

	excel_file = fields.Binary(string='File')
	filename = fields.Char(string='Filename',size=64)

	def assurance_xlsx(self):
	   
		wb = Workbook()
		sheet = wb.add_sheet('Assurances',cell_overwrite_ok=True)
		header1 = easyxf('font:bold 1;font:height 180;align : horiz center;')
		active_id = self._context.get('active_id')
		assurances_id = self.env['sports.excel.assurances'].browse(active_id)
		filename = str(assurances_id.name or 'assurances_report') + '.xls'
		row = 0
		col = 0
		sheet.write_merge(row,row,0,11,'Assurances Excel Report',header1)
		row = row + 2
		header = ['N Licence','Date Assurances','Assurances','Nom','Prenom','Ligue','Club']
		length1 = len(header)
		for res in range(0,length1):
			sheet.write(row,col,header[res])
			col = col + 1
		for assurance in assurances_id.assurances_ids:
			data = [assurance.athletes_id.name or '','','',assurance.athletes_id.name_at or '',assurance.athletes_id.prenom or '',assurance.athletes_id.club_id.name or '',assurance.athletes_id.ligue_id.name or '']
			row = row + 1
			col = 0
			for rec in range(0,len(data)):
				sheet.write(row,col,data[rec])
				col = col + 1
		fp = io.BytesIO()
		wb.save(fp)
		export_wizard = self.env['assurance.excel.export.wizard'].create({
			'excel_file':base64.encodebytes(fp.getvalue()),
			'filename':filename,
			})

		return {
				'type':'ir.actions.act_window',
				'res_id':export_wizard.id,
				'res_model':'assurance.excel.export.wizard',
				'view_mode':'form',
				'target':'new',
				'context':self._context
		}
