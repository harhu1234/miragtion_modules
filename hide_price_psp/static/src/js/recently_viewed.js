odoo.define('hide_price_psp.recently_viewed', function (require) {
'use strict';
var core = require('web.core');
var ajax = require('web.ajax');
var qweb = core.qweb;
ajax.loadXML('/hide_price_psp/static/src/xml/recently_viewed_inhe.xml', qweb);
	
});

