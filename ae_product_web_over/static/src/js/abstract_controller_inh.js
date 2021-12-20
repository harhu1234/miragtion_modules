odoo.define('ae_product_web_over.abstract_controller_inh', function(require) {
    'use strict';

    var AbstractController = require('web.AbstractController');

    AbstractController.include({
        events: {
            'click a[type="action"]': '_onActionClicked',
            'mouseenter tbody tr td.product_class': '_onProductHover',
        },

        _onProductHover: function(event) {
            var self = this;
            if (!this.editable) {
                var product_details_link_counter;
                var id = $(event.currentTarget).parents('tr').data('id');
                var record = self.model.get(id, {
                    raw: true
                });
                if (record && record.data.product_id && (record.model == 'sale.order.line' || record.model == 'sale.order' || record.model == 'purchase.order.line' || record.model == 'account.move.line' || record.model == 'stock.move')) {
                    var params = {
                        model: 'product.template',
                        method: 'get_product_detail_popover',
                        args: [
                            [], record.data.product_id, record.model
                        ],
                    }
                    var rpc = require('web.rpc');

                    rpc.query(params, {
                        async: false
                    }).then(function(data) {
                        if (data && data.html) {
                            clearTimeout(product_details_link_counter);
                            $(".popover").popover('hide');
                            product_details_link_counter = setTimeout(function() {

                                $(event.currentTarget).popover({
                                    placement: 'right',
                                    trigger: 'auto',
                                    animation: true,
                                    html: true,
                                    container: 'body',
                                    content: function() {
                                        return data.html;
                                    },
                                }).popover("show");
                                $(event.currentTarget).on("mouseleave", function(event) {
                                    setTimeout(function() {
                                        if (!$(".popover:hover").length) {
                                            if (!$(event.currentTarget).is(':hover')) {
                                                $(event.currentTarget).popover('hide');
                                            }
                                        }
                                    }, 100);
                                });
                            }, 10);
                        }
                    });
                }
            }
        },

    });
});