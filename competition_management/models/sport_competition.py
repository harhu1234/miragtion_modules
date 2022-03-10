# -*- coding: utf-8 -*-

from odoo import models,fields, api, _ 
from odoo.exceptions import ValidationError
from datetime import datetime, date, timedelta
from dateutil.relativedelta import relativedelta


class SportsCompetitions(models.Model):
	_name = "sports.competitions"
	_description = "Sports Compititions"

	@api.model
	def _get_default_saison(self):
		return self.env['sports.saison'].search([('state', '=', 'active')])

	name = fields.Char(string='N Compétition')
	state = fields.Selection([('brouillon', 'Brouillon'),('ouverte', 'Ouverte'),('confirmee','Confirmee'),('resultats','Resultats')],
								string='Statut', default="brouillon")
	resultats_ids = fields.One2many('sports.result', 'competition_id', string='Resultats')
	participants_ids = fields.One2many('sports.competition.participants', 'competitions_id', string='Participants')
	object_co = fields.Char(string="Object")
	date_de_compitition = fields.Date(string="Date De Compitition")
	saison_id = fields.Many2one('sports.saison', string='Saison sportive', default=_get_default_saison)
	famille = fields.Selection([('tournoi','Tournoi'),('master','Master'),
		('championnat','Championnat'),('stage','Stage')],string="Familles")
	type_co = fields.Selection([('combat','Combat'),('kata','Kata')],string="Type")
	nivea_se = fields.Selection([('national','National'),('regional','Regional'),('international','International')],string="Niveau")
	evenement_co = fields.Many2one("sports.event",string="Evenement")
	discipline_id = fields.Many2one("sports.discipline",string='Discipline')
	lieu = fields.Char(string='Lieu')
	category_age_idss = fields.Many2many('sports.category_age',string="Category d'age") 
	delal_dengagement = fields.Integer(string="Delal D'engagement(J)")
	date_limit_declaration  = fields.Date(string="Date Limit de Declaration")
	ligues_ids = fields.Many2many('sports.ligue', string='Ligues')
	genre_athletes = fields.Selection([('tous','Tous'),('masculin','Masculin'),
		('feminin','Feminin')],string="Genre Athletes")
	grades_ids = fields.Many2many('sports.grade',string="Grades")
	cotisation_comp = fields.Float(string="Cotisation compitition")
	description = fields.Text(string="Description")
	conditions_de_part = fields.Text(string="Conditions de Participation")
	droits_de_part = fields.Text(string="Droits de Participation")
	pesee = fields.Text(string="Pesee")
	enagement_inscrip_accre = fields.Text(string="Enagements-Inscription-Accreditation")
	reglement = fields.Text(string="Reglement")
	program_de_levenement = fields.Text(string="Programme de Levenement")
	tirage_au_sort = fields.Text(string="Tirage au sort")
	judogi = fields.Text(string="Judogi")
	secretaire_general = fields.Many2one("res.partner",string="Secretaire General")
	heure_reun_arbitres = fields.Float(string="Heure Reunion des Aarbitres")
	heure_reun_comp = fields.Float(string="Heure Reunion des Competitions")

	@api.model
	def create(self, vals):
		res = super(SportsCompetitions,self).create(vals)
		res.name = self.env['ir.sequence'].next_by_code('comp.seq')
		return res

	def write(self, vals):
		"""
		This function is override
		"""
		not_valid = False
		date_today = datetime.today().date()
		if 'participants_ids' in vals:
			for competition in self:
				if competition.state in ('brouillon','ouverte'):                    
					for part_info in vals.get('participants_ids'):
						if len(part_info) == 3:                           
							#1 - line write
							if isinstance(part_info[0],int) and isinstance(part_info[1],int) and isinstance(part_info[2], dict):
								updated_info = part_info[2].keys()
								if 'etat_se' not in  updated_info and 'commentaire' not in updated_info:
									if competition.date_limit_declaration:
										if date_today > competition.date_limit_declaration:
											not_valid = True
							#2- #3 Stop creation of line and delete line when today date is greater then record date
							if isinstance(part_info[0],int) and isinstance(part_info[1],str) and isinstance(part_info[2], dict) or isinstance(part_info[2], bool) :
								if competition.date_limit_declaration:
									if date_today > competition.date_limit_declaration:
										not_valid = True
		if not_valid:
			raise ValidationError(_('This operation is not possible at this moment.'))
		res = super(SportsCompetitions,self).write(vals)            
		return res         


	@api.onchange('delal_dengagement')
	def compute_date_limit(self):
		if self.date_de_compitition:
			self.date_limit_declaration = self.date_de_compitition - timedelta(days=self.delal_dengagement)

	def communique(self):
		pass

	def tirage_ijf(self):
		# pass
		self.state = 'ouverte'

	def diffuser(self):
		if self.state:
			self.state = 'ouverte'

	def confirmer(self):
		if self.state:
			self.state = 'confirmee'

	def resultats(self):
		self.ensure_one()        
		self.state = 'resultats'            
		result_obj = self.env['sports.result']
		for participant in self.participants_ids:
			data = {   
						'competition_id':self.id,
						'athletes_id':participant.athletes_id and participant.athletes_id.id or False,
						'athletes_nom': participant.athletes_nom,
						'athletes_pre_nom': participant.athletes_pre_nom,
						'clubs_id':participant.clubs_id and participant.clubs_id.id or False,
						'ligues_id':participant.ligues_id and participant.ligues_id.id or False,
						'grade_id':participant.grade_id and participant.grade_id.id or False,
						'genre_athletes':participant.genre_athletes,
						'categorie_de_age':participant.categorie_de_age,
						'origin_id':participant.origin_id and participant.origin_id.id or False,
						'etat_se':participant.etat_se,
						'commentaire':participant.commentaire,
						'cotisation_payee':participant.cotisation_payee
					}
			result_obj.create(data)

	def remettre_en_brouillon(self):
		if self.state:
			self.state = "brouillon"

class SportsCompetitionParticipants(models.Model):
	_inherit = "sports.competition.participants"

	competitions_id = fields.Many2one('sports.competitions', string='Compétition')
	athletes_nom = fields.Char(string='Nom',related="athletes_id.name_at")
	athletes_pre_nom = fields.Char(string='Prénom',related="athletes_id.prenom")
	clubs_id= fields.Many2one(string='Club',related="athletes_id.club_id")
	ligues_id = fields.Many2one(string='Ligue',related="athletes_id.ligue_id")
	grade_id = fields.Many2one(string="Grade",related="athletes_id.grade_id")
	genre_athletes = fields.Selection(related="athletes_id.sexe",string="Genre Athletes")
	categorie_de_age = fields.Many2one(string="Categorie d'age",related="athletes_id.category_age_id")
	origin_id = fields.Many2one('sports.origine',string="Origine")
	etat_se = fields.Selection([('confirme','Confirme'),('desiste','Desiste')],string="Etat")
	commentaire = fields.Char(string="Commentaire")
	cotisation_payee = fields.Boolean(string="Cotisation Payee ?")

	_sql_constraints = [('unique_nom','unique(competitions_id,athletes_id)','Athletes Must be unique')]

	@api.constrains('etat_se')
	def change_etat(self):
		for record in self:
			if record.etat_se == 'desiste':
				if not record.commentaire:
					raise ValidationError(_('Please Enter Commentarire for Etat'))

# Resultats

class SportsResult(models.Model):
	_name = "sports.result"
	_description = "Sports Result"

	competition_id = fields.Many2one('sports.competitions', string='Compétition')
	athletes_id = fields.Many2one('sports.athletes', string='Num Licence')
	athletes_nom = fields.Char(string='Nom',related="athletes_id.name_at",store=True)
	athletes_pre_nom = fields.Char(string='Prénom',related="athletes_id.prenom")
	clubs_id= fields.Many2one(string='Club', related="athletes_id.club_id", store=True)
	ligues_id = fields.Many2one(string='Ligue',related="athletes_id.ligue_id")
	grade_id = fields.Many2one(string="Grade",related="athletes_id.grade_id")
	genre_athletes = fields.Selection(related="athletes_id.sexe",string="Genre Athletes")
	categorie_de_age = fields.Many2one(string="Categorie d'age",related="athletes_id.category_age_id")
	origin_id = fields.Many2one('sports.origine',string="Origine")
	etat_se = fields.Selection([('confirme','Confirme'),('desiste','Desiste')],string="Etat")
	commentaire = fields.Char(string="Commentaire")
	cotisation_payee = fields.Boolean(string="Cotisation Payee ?")
	note = fields.Integer(string="Note")
	remark = fields.Char(string="Remarque")
	state = fields.Selection([('brouillon', 'Brouillon'),('ouverte', 'Ouverte'),('confirmee','Confirmee'),('resultats','Resultats')],
								string='Statut', related='competition_id.state')


#PassageDeGrade

class PassageDeGrade(models.Model):
	
	_name="passage.de.grade"
	_description = "Passage De Grade"
	_rec_name = "n_sequence"

	n_sequence = fields.Char(string="N")
	date_passage_grade = fields.Date(string="Date de Passage de Grade")
	saison_id = fields.Many2one('sports.saison', string='Saison sportive')
	competition_id = fields.Many2one('sports.competitions',string="Competition",domain = "[('state','=','resultats')]")
	grade_passage_line_ids = fields.One2many("grade.de.passage.line","passage_grade_id",string="Athlete Eligible",store=True)
	cotisation = fields.Float(string="Cotisation",compute="_compute_cotisation")
	state = fields.Selection([('brouillon','Brouillon'),
		('confirmee','Confirmee')],default="brouillon")

	def _compute_cotisation(self):
		for record in self:
			count = 0
			grade_quatation = 0
			if record.grade_passage_line_ids:
				for grade_line_rec in record.grade_passage_line_ids:
					if grade_line_rec.qualification == 'admis':
						athletes_rec = record.env['sports.athletes'].search([('id','=',grade_line_rec.athletes_id.id)],limit=1)
						grade_quatation+=int(athletes_rec.grade_id.cotisation_passage_de_grade)
						count+=1 
					record.cotisation = grade_quatation * count
			else:
				record.cotisation = 0

	def confirmer(self):
		self.ensure_one()
		if self.grade_passage_line_ids:
			for grade_line_rec in self.grade_passage_line_ids:
				if grade_line_rec.qualification:
					if grade_line_rec.qualification == 'admis':
						athletes_rec = self.env['sports.athletes'].search([('id','=',grade_line_rec.athletes_id.id)],limit=1)
						athletes_rec.write({'date_demier_pass':self.date_passage_grade})
						grade_line_rec.write({'grade_id':grade_line_rec.grade_id.grade_suiwant and grade_line_rec.grade_id.grade_suiwant.id or False,
												'cumul_points':0,})
						self.state = 'confirmee'
					else:
						result_rec = self.env['sports.result'].search([('athletes_id','=',grade_line_rec.athletes_id.id)],limit=1)
						grade_line_rec.write({'cumul_points':grade_line_rec.cumul_points + result_rec.note})
				else:
					raise ValidationError(_("vous devez qualifier tous les athletes"))

	def remettre_en_brouillon(self):
		self.state = "brouillon"

	def generer_athletes_eligi(self):
		self.ensure_one()
		result_competition = self.competition_id
		grade_line_obj = self.env['grade.de.passage.line']
		sys_date = date.today() - timedelta(days=1)
		if result_competition:
			for result_rec in result_competition.resultats_ids:
				athlete_rec = result_rec.athletes_id
				grade_rec = athlete_rec.grade_id

				# Comapre Date with System Date For Create passage Athletes type combat
				if grade_rec.month_year == 'mois':
					if athlete_rec.date_demier_pass:
						compare_comdate = athlete_rec.date_demier_pass + relativedelta(months=grade_rec.duries_passage)	
				elif grade_rec.month_year == 'ans':
					if athlete_rec.date_demier_pass: 
						compare_comdate = athlete_rec.date_demier_pass + relativedelta(years=grade_rec.duries_passage)

				# Comapre Date with system Date for Create passage Athletes type Kata
				if grade_rec.month_year1 == 'mois':
					if athlete_rec.date_demier_pass:
						compare_kata_date = athlete_rec.date_demier_pass + relativedelta(months=grade_rec.durees_da_passage)
				elif grade_rec.month_year1 == 'ans':
					if athlete_rec.date_demier_pass: 
						compare_kata_date = athlete_rec.date_demier_pass + relativedelta(years=grade_rec.durees_da_passage)
				
				if athlete_rec.age >= grade_rec.min_age:
					if result_competition.type_co == 'combat':
						if grade_rec.kata_obilget == False:
							if athlete_rec.date_demier_pass:
								if sys_date >= compare_comdate:
									if athlete_rec.cumul_points >= grade_rec.nbr_points_exg or result_rec.note >= grade_rec.points_passage_competion:
										obj_combat_data = {
													'passage_grade_id':self.id,
													'athletes_id':result_rec.athletes_id and result_rec.athletes_id.id or False,
													'athletes_nom': result_rec.athletes_nom,
													'athletes_pre_nom': result_rec.athletes_pre_nom,
													'clubs_id':result_rec.clubs_id and result_rec.clubs_id.id or False,
													'ligues_id':result_rec.ligues_id and result_rec.ligues_id.id or False,
													'grade_id':result_rec.grade_id and result_rec.grade_id.id or False,
													'genre_athletes':result_rec.genre_athletes,
													'categorie_de_age':result_rec.categorie_de_age and result_rec.categorie_de_age.id or False,
													'note':result_rec.note,
													'remarque':result_rec.remark,
													}
										grade_line_obj.create(obj_combat_data)
					elif result_competition.type_co == 'kata':
						if athlete_rec.date_demier_pass:
							if sys_date >= compare_kata_date:
								obj_kata_data = {
											'passage_grade_id':self.id,
											'athletes_id':result_rec.athletes_id and result_rec.athletes_id.id or False,
											'athletes_nom': result_rec.athletes_nom,
											'athletes_pre_nom': result_rec.athletes_pre_nom,
											'clubs_id':result_rec.clubs_id and result_rec.clubs_id.id or False,
											'ligues_id':result_rec.ligues_id and result_rec.ligues_id.id or False,
											'grade_id':result_rec.grade_id and result_rec.grade_id.id or False,
											'genre_athletes':result_rec.genre_athletes,
											'categorie_de_age':result_rec.categorie_de_age and result_rec.categorie_de_age.id or False,
											'note':result_rec.note,
											'remarque':result_rec.remark,
											}
								grade_line_obj.create(obj_kata_data)

		else:
			raise UserError(_('Veuillez selectionner une competition !'))

	@api.model
	def create(self,vals):
		result = super(PassageDeGrade, self).create(vals)
		result.n_sequence= self.env['ir.sequence'].next_by_code('passage.de.grade.seq')
		return result


class GradeDePassageLine(models.Model):

	_name = "grade.de.passage.line"
	_description = "Grade De Passage Line"

	passage_grade_id = fields.Many2one("passage.de.grade",string="Passage De Grade")
	athletes_id = fields.Many2one('sports.athletes', string='Num Licence')
	athletes_nom = fields.Char(string='Nom',related="athletes_id.name_at")
	athletes_pre_nom = fields.Char(string='Prénom',related="athletes_id.prenom")
	clubs_id= fields.Many2one(string='Club', related="athletes_id.club_id", store=True)
	ligues_id = fields.Many2one(string='Ligue',related="athletes_id.ligue_id")
	grade_id = fields.Many2one(string="Grade",related="athletes_id.grade_id",store=True)
	genre_athletes = fields.Selection(related="athletes_id.sexe",string="Genre Athletes")
	categorie_de_age = fields.Many2one(string="Categorie d'age",related="athletes_id.category_age_id")
	note = fields.Integer(string="Note")
	cumul_points = fields.Integer(string="Cumul Points")
	qualification = fields.Selection([('admis','Admis'),('nonadmis','Non Admis')],string="Qualification?")
	remarque = fields.Char(string="Remarque")
