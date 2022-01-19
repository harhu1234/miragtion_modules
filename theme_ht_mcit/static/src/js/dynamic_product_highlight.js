odoo.define('theme_ht_mcit.dynamic_product_highlight', function (require) {
'use strict';


const config = require('web.config');
const core = require('web.core');
const publicWidget = require('web.public.widget');
const DynamicSnippet = require('website.s_dynamic_snippet');

const DynamicSnippetCarousel = DynamicSnippet.extend({
    selector: '.dynamic_product_highlight',
    xmlDependencies: (DynamicSnippet.prototype.xmlDependencies || []).concat(
        ['/theme_ht_mcit/static/src/xml/dynamic_product_highlight.xml']
    ),



    /**
     *
     * @override
     */
    init: function () {
        this._super.apply(this, arguments);
        this.template_key = 'theme_ht_mcit.dynamic_product_highlight.carousel';
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * Method to be overridden in child components in order to prepare QWeb
     * options
     * @private
     */
    _getQWebRenderOptions: function () {
        return Object.assign(
            this._super.apply(this, arguments),
            {
                interval: parseInt(this.$target[0].dataset.carouselInterval),
            },
        );
    },

    /**
     *
     * @override
     */
    _renderContent: function () {
        this._super.apply(this, arguments);
        this._computeHeights();
    },

    /**
     *
     * Force height of carousel to the higher slide, to avoid flickering.
     * @private
     */
    _computeHeights: function () {
        var maxHeight = 0;
        var $items = this.$('.carousel-item');
        $items.css('min-height', '');
        _.each($items, function (el) {
            var $item = $(el);
            var isActive = $item.hasClass('active');
            $item.addClass('active');
            var height = $item.outerHeight();
            if (height > maxHeight) {
                maxHeight = height;
            }
            $item.toggleClass('active', isActive);
        });
        $items.css('min-height', maxHeight);
    },

});
publicWidget.registry.dynamic_snippet_carousel = DynamicSnippetCarousel;

console.log('aashish==',DynamicSnippetCarousel)
return DynamicSnippetCarousel;
});