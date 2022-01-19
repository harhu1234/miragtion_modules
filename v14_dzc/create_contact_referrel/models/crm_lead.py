# -*- coding: utf-8 -*-

from odoo import api, fields, models, _

class CRMLead(models.Model):

    _inherit = 'crm.lead'

    referrel_name = fields.Char('Naam')
    referrel_telephone = fields.Char('Telefoon')
    referrel_email = fields.Char('E-mailadres')
    referrel_adres = fields.Char('Adres')
    referrel_postcode = fields.Char('Postcode')
    referrel_plaats = fields.Char('Plaats')
    referrel_locatie = fields.Char('Locatie (vestiging)')

    #caretaker fields 
    cd_name = fields.Char('Name')
    cd_email = fields.Char('Email')
    cd_phone = fields.Char('Phone')

    # other contact fields
    oc_name = fields.Char('Name')
    oc_email = fields.Char('Email')
    oc_phone = fields.Char('Phone')



    


    @api.model
    def create(self, vals):
        print("Vals:::",vals)
        res = super(CRMLead, self).create(vals)

        Partner = self.env['res.partner']
        fname =""
        lname =""
        initial = ""
        if res.partner_name:
            partner_id = res.partner_id and res.partner_id.id or False
            exist_partner = Partner.search([('name', '=', res.partner_name)])
            if not exist_partner:
                partner_record = Partner.create(res._create_lead_partner_data(res.partner_name, False, partner_id))
                if not res.partner_id:
                    res.partner_id = partner_record.id

        print("Partner ID :::,",res.partner_id)
        if res.description:
            # if 'Betrokken (hulpverlenings-)instanties:' in res.description:
            #     des = res.description.split('Betrokken (hulpverlenings-)instanties:')[1]
            #     if 'Naam contactpersoon' in des:
            #         res.prepare_partner(des)
            description_data = res.description
            new_description = ''
            contact_data=[]

            contact_type = ''



            for data in description_data.split('|'):
                if data and len(data) > 0:

                    if 'Aanmelding door:' in data:
                         if len(data.split(':'))>1:
                            res.register_by = data.split(':')[1].strip()

                    if 'Contact opnemen met:' in data:

                        if len(data.split(':'))>1:
                            contact_type = data.split(':')[1].strip()
                            print("Contact Type :",contact_type)


                    if 'Voornaam:' in data:
                        if len(data.split(':'))>1:
                            res.first_name = fname = data.split(':')[1].strip()
                            for name in fname.split(' '):
                                print("fname", name)
                                initial += name[0] + '.' 

                    if 'Achternaam:' in data:
                        if len(data.split(':'))>1:
                            res.last_name = lname = data.split(':')[1].strip()
                            for name in lname.split(' '):
                                print("lname", name)
                                initial += name[0] + '.' 
                    
                    res.initial = initial

                    if 'Voorkeur coach:' in data:
                        if len(data.split(':'))>1:
                            coach_preference = data.split(':')[1].strip()
                            if coach_preference == "Man":
                                res.preference = 'man'
                            elif coach_preference == "Vrouw":
                                res.preference = 'woman'
                            elif coach_preference == "Geen voorkeur":
                                res.preference = 'other'


                    if 'Beheerst de hulpvragende de Nederlandse taal?:' in data:
                        if len(data.split(':'))>1:
                            is_dutch = data.split(':')[1].strip()
                            if is_dutch == 'Ja':
                                res.is_dutch = True
                    
                    if 'Anders, namelijk' in data:
                        if len(data.split(':'))>1:
                            res.other_language = data.split(':')[1].strip()

                    if 'Huisdieren:' in data:
                        if len(data.split(':'))>1:
                            pet_name = data.split(':')[1].strip()
                            if 'Heeft hond' in pet_name:
                                res.pets = 'Hond'
                            elif 'Heeft kat' in pet_name:
                                res.pets = 'Kat'

                    if  'Andere huisdieren:' in data:
                        if len(data.split(':'))>1:
                            res.pets = data.split(':')[1].strip()






                    #Self contact information stored 
                    if contact_type and contact_type == 'Hulpvrager zelf':
                        if 'Naam contactpersoon:' in data and not res.partner_name:
                            if len(data.split(':'))>1:
                                res.partner_name = data.split(':')[1].strip()

                        if 'Telefoon contactpersoon:' in data and not res.contact_phone:
                            if len(data.split(':'))>1:
                                res.contact_phone =data.split(':')[1].strip()

                        if 'E-mailadres contactpersoon:' in data and not res.contact_email:
                            if len(data.split(':'))>1:
                                res.contact_email = data.split(':')[1].strip()


                    #Parent and Caretaker Details 
                    if contact_type and contact_type == 'Ouder / verzorger':
                        if 'Naam contactpersoon:' in data and not res.partner_name:
                            if len(data.split(':'))>1:
                                res.cd_name = res.partner_name = data.split(':')[1].strip()

                        if 'Telefoon contactpersoon:' in data and not res.contact_phone:
                            if len(data.split(':'))>1:
                                res.cd_phone = res.contact_phone = data.split(':')[1].strip()

                        if 'E-mailadres contactpersoon:' in data and not res.contact_email:
                            if len(data.split(':'))>1:
                                res.cd_email = res.contact_email =  data.split(':')[1].strip()

                    #add other contact information 
                    if contact_type and contact_type == 'Anders':
                        if 'Naam contactpersoon:' in data and not res.partner_name:
                            if len(data.split(':'))>1:
                                res.oc_name = res.partner_name = data.split(':')[1].strip()

                        if 'Telefoon contactpersoon:' in data and not res.contact_phone:
                            if len(data.split(':'))>1:
                                res.oc_phone = res.contact_phone =data.split(':')[1].strip()

                        if 'E-mailadres contactpersoon:' in data and not res.contact_email:
                            if len(data.split(':'))>1:
                                res.oc_email = res.contact_email = data.split(':')[1].strip()


                    # Create contact refferal information  
                    if not "Betrokken (hulpverlenings-)instanties" in data:
                        if contact_type and contact_type =='Verwijzer':
                            if 'Naam:' in data:
                                if len(data.split(':'))>1:
                                    res.referrel_name = res.partner_name = data.split(':')[1].strip()

                            if 'Telefoon:' in data:
                                if len(data.split(':'))>1:
                                    res.referrel_telephone = res.contact_phone= data.split(':')[1].strip()
                                
                            if 'E-mailadres:' in data and not res.referrel_email:
                                if len(data.split(':'))>1:
                                    res.referrel_email =res.contact_email= data.split(':')[1].strip()
                                    print("REFEL EMAIL:", res.referrel_email)

                            if 'Adres:' in data and not res.referrel_adres:
                                if len(data.split(':'))>1:
                                    res.referrel_adres = res.contact_address = data.split(':')[1].strip()


                            if 'Postcode:' in data and not res.referrel_postcode:
                                if len(data.split(':'))>1:
                                    res.referrel_postcode = res.contact_postcode = data.split(':')[1].strip()
                                    
                            if 'Woonplaats:' in data:
                                if len(data.split(':'))>1:
                                    res.referrel_locatie = res.contact_location = data.split(':')[1].strip()

                            if 'Plaats:' in data:
                                if len(data.split(':'))>1:
                                    res.referrel_plaats = res.contact_residence = data.split(':')[1].strip()

                        # if 'Aanmelding door:' in data:
                        #     if len(data.split(':'))>1:
                        #         new_description = data.split(':')[1].strip()

                        # if 'Geslacht:' in data:
                        #     if len(data.split(':'))>1:
                        #         new_description += '\n' + data.split(':')[1].strip()

                        # create contact infomration for
                        if 'Voor- en achternaam:' in data and not res.partner_name:
                            if len(data.split(':'))>1:
                                    res.partner_name= data.split(':')[1].strip()

                        if 'E-mailadres:' in data and res.referrel_email:
                            if len(data.split(':'))>1:
                                res.email_from =  data.split(':')[1].strip()

                        # if 'Adres:' in data:
                        #     if len(data.split(':'))>1:
                        #         res.street = data.split(':')[1].strip()
                                    
                        # if 'Postcode:' in data:
                        #     if len(data.split(':'))>1:
                        #         res.contact_postcode = data.split(':')[1].strip()

                        # if 'Telefoonnummer:' in data and res.contact_phone == '':
                        #     if len(data.split(':'))>1:
                        #         res.contact_phone = data.split(':')[1].strip()

                        if 'Gemeente:' in data:
                            if len(data.split(':'))>1:
                                res.township = data.split(':')[1].strip()

                        if 'Woonplaats:' in data:
                                if len(data.split(':'))>1:
                                    res.place = data.split(':')[1].strip()

                    # if 'Betrokken (hulpverlenings-)instanties:' in data:
                    #     contact_data= data.split('\n')
                    #     res.prepare_partner(contact_data)
                        # parnter_name = res.partner_id and res.partner_id.name or ""
                        # if parnter_name:
                        #     names_info = parnter_name.split(' ')

                        #     if len(names_info) == 2:
                        #         res.first_name = names_info[0]
                        #         res.last_name = names_info[1]
                        #         res.initial = res.first_name[0] +'.'
                        #         res.initial += res.last_name[0]
            if res.partner_id: 
                res.partner_id.name = res.first_name + ' ' + res.last_name

            if res.name and res.first_name :
                if res.first_name not in res.name and res.first_name !='':
                    res.name = res.first_name + ' ' + res.name 

            
            # res.description = ''



            
        return res

            # if 'Voor- en achternaam:' in res.description:
            #     start = 'Voor- en achternaam:'
            #     end = 'BSN:'
            #     referrel_name = s[s.find(start) + len(start):].strip().split('|')[0]
            #     print("Referrel_name :", referrel_name)
                
            #     res.referrel_name = referrel_name
            # if 'Telefoonnummer:' in res.description:
            #     start = 'Telefoonnummer:'
            #     end = 'E-mailadres:'
            #     referrel_telephone = s[s.find(start) + len(start):].strip().split('|')[0]
            #     print("referrel_telephone :", referrel_telephone)
            #     res.referrel_telephone = referrel_telephone
                
            # if 'E-mailadres:' in res.description:
            #     start = 'E-mailadres:'
            #     end = 'Woont hulpvrager met meerdere personen?:'
            #     referrel_email = s[s.find(start) + len(start):].strip().split('|')[0]
            #     print("referrel_email :", referrel_email)
                
            #     res.referrel_email = referrel_email
            # if 'Adres:' in res.description:
            #     start = 'Adres:'
            #     end = 'Postcode:'
            #     referrel_adres = s[s.find(start) + len(start):].strip().split('|')[0]
            #     print("referrel_adres :", referrel_adres)
            #     res.referrel_adres = referrel_adres
            # if 'Postcode:' in res.description:
            #     start = 'Postcode:'
            #     end = 'Woonplaats:'
            #     referrel_postcode = s[s.find(start) + len(start):].strip().split('|')[0]
            #     print("referrel_postcode",referrel_postcode)
            #     res.referrel_postcode = referrel_postcode
            # if 'Plaats:' in res.description:
            #     start = 'Plaats:'
            #     end = ''
            #     if 'Locatie (vestiging):' in res.description:
            #         end = 'Locatie (vestiging):'
            #     elif 'Geslacht:' in res.description:
            #         end = 'Geslacht:'
            #     referrel_plaats = s[s.find(start) + len(start):s.find(end)].strip()
            #     res.referrel_plaats = referrel_plaats
            # if 'Woonplaats:' in res.description:
            #     start = 'Woonplaats:'
            #     end = 'Telefoonnummer:'
            #     referrel_locatie = s[s.find(start) + len(start):].strip().split('|')[0]
            #     print('referrel_locatie',referrel_locatie)
            #     res.referrel_locatie = referrel_locatie
            #     1/0
            # start = 'Aanmelding door:'
            # # end = 'Geslacht:'

            # new_description = s[s.find(start) + len(start):].strip().split('|')[0]
            # start = 'Geslacht:'
            # new_description += '\n' + s[s.find(start) + len(start):].strip().split('|')[0]
            # if new_description:
            #     res.description = new_description

    @api.onchange("partner_id")
    def onchange_partner_info(self):
        if self.partner_id:
            # name_list = self.partner_id.name.split(' ')
            # if len(name_list):
            #     self.first_name = name_list[0]
            #     self.initial = name_list[0][0]
            # if len(name_list)>1:
            #     self.last_name = name_list[1]
            #     self.initial += name_list[1][0]
            initial=""
            for name in self.partner_id.name.split(' '):
                initial += name[0] + '.' 

            self.initial=initial

    def action_update_crm_note(self):

        for lead in self.env['crm.lead'].search([]):
            if lead.description:
                start = 'Aanmelding door:'
                end = 'Geslacht:'
                new_description = lead.with_context(server_action=True).description[lead.description.find(start) + len(start):lead.description.find(end)].strip()
                if new_description:
                    lead.description = new_description

    def clear_lead_age(self):
        for lead in self.env['crm.lead'].search([]):
            if '0jr' in lead.name:
                lead.name = lead.name.replace('0jr','').strip()
            if lead.age:
                data = str(lead.age) +'jr'
                if data in lead.name:
                    lead.name = lead.name.replace(data,'').strip()


    # @api.multi
    # def write(self, vals):
    #     res = super(CRMLead, self).write(vals)

    #     if not self._context.get('server_action'):
    #         for lead in self:
    #             if lead.description and 'Betrokken (hulpverlenings-)instanties:' in lead.description:
    #                 des = lead.description.split('Betrokken (hulpverlenings-)instanties:')[1]
    #                 if 'Naam contactpersoon' in des:
    #                     lead.prepare_partner(des)
    #     return res

    def prepare_partner(self, description):
        partner_obj = self.env['res.partner']
        parent_name = ''
        email_address =''
        phone_no = ''
        job = ''
        partner_name = ''
        for data in description:
            if 'Naam instantie:' in data:
                name = data.split(':')
                print("parent_name", name[1])
                if len(name)>1:
                    parent_name = name[1].strip()



            if 'Naam contactpersoon:' in data:
                name = data.split(':')
                print("partner name",name)
                if len(name)>1:
                    partner_name = name[1].strip()
                    # if '-' in partner_name:
                        # name_list = self.partner_name.split('-')
                        # if len(name_list):
                        #     self.first_name = name_list[0]
                        #     self.initial = name_list[0][0]
                        # if len(name_list)>1:
                        #     self.last_name = name_list[1]
                        #     self.initial += name_list[1][0]
                    

            if 'E-mailadres:' in data:
                name = data.split(':')
                print("email", name)
                if len(name)>1:
                    email_address = name[1].strip()
                    
                    

            if 'Telefoonnummer:' in data:
                name = data.split(':')
                print("telephone", name)
                if len(name)>1:
                    phone_no = name[1].strip()

            if 'Functie/rol' in data: 
                name = data.split(':')
                print("job", name)
                if len(name)>1:
                    job = name[1].strip()
                    self.function=job


        partner = partner_obj.search([('name', '=', partner_name),
                                      ('email', '=', email_address)], limit=1)
        if partner:
            partner.referral = True
            if phone_no:
                partner.phone = phone_no
            if job:
                partner.function = job
        else:
            partner = partner_obj.create({'name': partner_name,
                                          'email': email_address,
                                          'referral': True,
                                          'type': 'contact', 
                                          'function': job,
                                          'phone': phone_no})
        self.partner_id = partner.id
        values = self._onchange_partner_id_values(partner.id)
        self.update(values)

        if partner and parent_name:
            parent_partner = partner_obj.search([('name', '=', parent_name)], limit=1)
            if parent_partner:
                partner.parent_id = parent_partner.id
                parent_partner.referral = True
            else:
                parent_partner = partner_obj.create({
                    'name': parent_name,
                    'company_type': 'company',
                    'referral': True,
                    'type': 'contact'
                })
                if parent_partner:
                    partner.parent_id = parent_partner
        

    def create_contacts_from_note(self):
        for lead in self:
            if lead.description and 'Betrokken (hulpverlenings-)instanties:' in lead.description:
                # des = lead.description.split('Betrokken (hulpverlenings-)instanties:')[1]
                # if 'Naam contactpersoon' in des:
                #     lead.prepare_partner(des)
                for data in description_data.split('|'):
                    if data and len(data) > 0:
                        if 'Betrokken (hulpverlenings-)instanties:' in data:
                            contact_data= data.split('\n')
                            lead.prepare_partner(contact_data)

                    
