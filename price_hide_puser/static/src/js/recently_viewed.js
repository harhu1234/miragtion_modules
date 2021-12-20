odoo.define('price_hide_puser.recently_viewed', function (require) {
'use strict';
var core = require('web.core');
var ajax = require('web.ajax');
var qweb = core.qweb;
ajax.loadXML('/price_hide_puser/static/src/xml/recently_viewed_inhe.xml', qweb);
	
});

