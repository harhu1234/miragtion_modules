# -*- coding: utf-8 -*-
##############################################################################
#
#    Jupical Technologies Pvt. Ltd.
#    Copyright (C) 2018-TODAY Jupical Technologies(<http://www.jupical.com>).
#    Author: Jupical Technologies Pvt. Ltd.(<http://www.jupical.com>)
#    you can modify it under the terms of the GNU LESSER
#    GENERAL PUBLIC LICENSE (LGPL v3), Version 3.
#
#    It is forbidden to publish, distribute, sublicense, or sell copies
#    of the Software or modified copies of the Software.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU LESSER GENERAL PUBLIC LICENSE (LGPL v3) for more details.
#
#    You should have received a copy of the GNU LESSER GENERAL PUBLIC LICENSE
#    GENERAL PUBLIC LICENSE (LGPL v3) along with this program.
#    If not, see <http://www.gnu.org/licenses/>.
{
    'name': 'Salon Management',
    'summary': "Salon Management Details",
    'description': "Salon Management Detail",
    'version': '15.0.0.3.0',
    'category': 'Base',
    'author': 'Jupical Technologies Pvt. Ltd.',
    'maintainer': 'Jupical Technologies Pvt. Ltd.',
    'website': 'http://jupical.com/',
    'depends': ['product','contacts','mail'],
    'data': [
            'security/ir.model.access.csv',
            'data/cron_offer.xml',
            'data/appointment_email.xml',
            'data/followup_email.xml',
            'data/offer_email.xml',
            'wizard/booking_wizard.xml',
            'wizard/select_attendee_wizard.xml',
            'wizard/attendee_report_wizard.xml',
            'wizard/services_wizard.xml',
            'wizard/package_wizard.xml',
            'wizard/offer_wizard.xml',
            'wizard/coupon_wizard.xml',
            'wizard/excel_appointment.xml',
            'wizard/excel_services.xml',
            'wizard/excel_membership.xml',
            'wizard/excel_package.xml',
            'wizard/excel_offers.xml',
            'wizard/excel_coupon.xml',
            'views/customer_appointment.xml',
            'views/service_service.xml',
            'views/membership.xml',
            'views/package.xml',
            'views/offer_service.xml',
            'views/reporting.xml',
            'views/configuration.xml',
            'report/report_serivce.xml',
            'report/report_action.xml',
            'report/report_appointment.xml',
            'report/booking_report.xml',
            'report/attendee_report.xml',
            'report/select_attendee_report.xml',
            'report/package_report.xml',
            'report/offer_report.xml',
            'report/offer_discount_report.xml',
            'report/coupon_report.xml',
            'report/coupon_service_report.xml',
            'report/membership_card.xml',
            'report/package_menu_report.xml',
    ],
    'license': 'AGPL-3',
}
#
##############################################################################
