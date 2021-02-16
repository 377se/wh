/*! UIkit integration for DataTables' Responsive
 * ©2015-2016 SpryMedia Ltd - datatables.net/license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net-bs', 'datatables.net-responsive'], function ($) {
			return factory($, window, document);
		});
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = function (root, $) {
			if (!root) {
				root = window;
			}
			if (!$ || !$.fn.dataTable) {
				$ = require('datatables.net-bs')(root, $).$;
			}
			if (!$.fn.dataTable.Responsive) {
				require('datatables.net-responsive')(root, $);
			}
			return factory($, root, root.document);
		};
	} else {
		// Browser
		factory(jQuery, window, document);
	}
}(function ($, window, document, undefined) {
	'use strict';
	var DataTable = $.fn.dataTable;
	var _display = DataTable.Responsive.display;
	var _original = _display.modal;
	var _modal = $(
		'<div id="dtr-uikit-modal" class="uk-flex-top">' +
			'<div class="uk-modal-dialog uk-margin-auto-vertical">' +
				'<button class="uk-modal-close-default" type="button" data-uk-close></button>' +
				'<div class="uk-modal-header">' +
					'<h3 class="uk-modal-title"></h3>' +
				'</div>' +
				'<div class="uk-modal-body"></div>' +
			'</div>' +
		'</div>'
	);
	_display.modal = function (options) {
		return function (row, update, render) {
			if (typeof UIkit.modal === 'function') {
				if (!update) {
					if (options && options.header) {
						var header = _modal.find('.uk-modal-title');
						header.html(options.header(row));
					}
					_modal.find('div.uk-modal-body').html(render());
					if (!$('body').find('#dtr-uikit-modal').length) {
						_modal.appendTo('body');
					}
					UIkit.modal($('#dtr-uikit-modal')).show();
				}
			} else {
				_original(row, update, render);
			}
		};
	};
	return DataTable.Responsive;
}));
