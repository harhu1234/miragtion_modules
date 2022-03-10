# -*- coding: utf-8 -*-
{
    "name": "Competitions Management",
    "version": "14.0.0.3.6",
    "category": "Competitions Management",
    "summary": "Competitions",
    "description": """ """,
    "depends": ["sports_athletic"],
    "data": ["security/ir.model.access.csv",
                "sequence/competition_seq.xml",
                "sequence/passage_seq.xml",
                "wizard/charger_result.xml",
                "views/sports_competitions_view.xml",
    ],
    "installable": True,
    "auto_install": False,
    "application": True,
}
