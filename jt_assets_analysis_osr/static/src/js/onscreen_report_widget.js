odoo.define('jt_assets_analysis_osr.assets_analysis_widget', function(require) {
"use strict";
    var Widget = require('web.Widget');
    var core = require('web.core');
    var session = require('web.session');
    var AbstractAction = require('web.AbstractAction');

    var _t = core._t;
    var QWeb = core.qweb;

    var active_id;
    var ReportWidget = AbstractAction.extend({
        'template' : "assets_report_template",
        events: {
            'click .view_asset': '_onClickViewAssets',
            'click .asset_print_pdf': '_onClickPrintPDF',
            'click .asset_print_xls': '_onClickPrintXLS',
        },

        // To Open asset record
        _onClickViewAssets: function(ev){
            var action_view_asset = {
                name: "Asset",
                type: 'ir.actions.act_window',
                res_model: 'account.asset.asset',
                res_id: parseInt($(ev.target).data('asset_id')),
                target: 'new',
                views: [[false, 'form']],
                flags: {mode:'readonly'},
            }
            return this.do_action(action_view_asset)
        },

        // To Download Asset Data In PDF File
        _onClickPrintPDF: function(){
            var self = this;
            return this._rpc({
                model: 'assets.report',
                method: 'generate_report',
                args: [active_id],
                context: {'type': 'download_pdf'},
            }).then(function (record) {
                var action_download_assets = {
                    name: "Download Report",
                    type: 'ir.actions.act_window',
                    res_model: 'assets.report',
                    res_id: parseInt(record),
                    target: 'new',
                    views: [[false, 'form']],
                    flags: {mode:'readonly'},
                }
                return self.do_action(action_download_assets)
            });
        },

        // To Download Asset Data In XLS File
        _onClickPrintXLS: function(){
            var self = this;
            return this._rpc({
                model: 'assets.report',
                method: 'generate_report',
                args: [active_id],
                context: {'type': 'download_xls'},
            }).then(function (record) {
                var action_download_assets = {
                    name: "Download Report",
                    type: 'ir.actions.act_window',
                    res_model: 'assets.report',
                    res_id: parseInt(record),
                    target: 'new',
                    views: [[false, 'form']],
                    flags: {mode:'readonly'},
                }
                return self.do_action(action_download_assets)
            });
        },

        // Fetch data from report
        init: function (parent, options) {
            this._super.apply(this, arguments);
            this._rpc({
                model: 'assets.report',
                method: 'generate_report',
                args: [active_id],
                context: {'type': 'view'},
            }).then(function (report) {
                $('.o_account_reports_body').html(report)
            });
        },
    });

    core.action_registry.add('AssetsAnalysisReport', ReportWidget);
    return ReportWidget;
});
