# -*- coding: utf-8 -*-

{
    'name': 'Tasks Daily Reminder',
    'version': '14.3',
    'category': 'Project',
    'author': 'IT Libertas',
    'website': 'https://odootools.com/',
    'price': '49.0',
    'currency': 'EUR',
    'license': 'Other proprietary',
    'images': [
        'static/description/main.png',
    ],
    'application': True,
    'summary': 'Daily notification for project team members containing the list of tasks with exceeded deadline',
    'depends': [
        'project',
    ],
    'data': [
        'views/project_view.xml',
        'data/notification_task_data.xml'
    ],
    'update_xml': [

    ],
    'installable': True,
    'auto_install': False,
    'description': '''
Tasks combined in a single-email to-do list
===========================================
Keep your employees informed of overpassed and today tasks
----------------------------------------------------------
The app goal is to remind users about tasks to do them without broken deadlines:
* Notifications are configurable based on project tasks stages: only up-to-date tasks are sent
* Reminder template and style are editable via standard Odoo tools (Settings > Technical > Email > Templates > "Overdue Tasks"). It supports multi languages
* The time of each email dispatch may be changed in Odoo scheduled actions (Settings > Technical > Automation > Scheduled Actions > "Notify users about overdue tasks")
* Full compatibility with other Odoo apps
Example
-------
* John Brown is a project user and he is currently assigned to 4 tasks
* Tasks and deadlines are the following: 'task 1' - "Analysis: 15/11/23"; 'task 2' - "In progress: 15/11/29"; 'task 3' - 'Analysis: 15/11/30'; 'task 4' - 'Done: 15/10/11'
* You have configured task stages in order to send notifications with stages "Analysis", "In progress", "Testing". "Done" and "Canceled" stages are not included into the reminder
*  Today is 15/11/29. Thus, John Brown will get the single list containing 'task 1', 'task 2' with stated deadlines
'''
}
