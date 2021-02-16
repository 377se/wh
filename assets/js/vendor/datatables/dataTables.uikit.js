/*! DataTables UIkit 3 integration
 */

/**
 * This is a tech preview of UIKit integration with DataTables.
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net'], function ($) {
			return factory($, window, document);
		});
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = function (root, $) {
			if (!root) {
				root = window;
			}

			if (!$ || !$.fn.dataTable) {
				// Require DataTables, which attaches to jQuery, including
				// jQuery if needed and have a $ property so we can access the
				// jQuery object that is used
				$ = require('datatables.net')(root, $).$;
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

	/* Set the defaults for DataTables initialisation */
	$.extend(true, DataTable.defaults, {
		dom:
			"<'row uk-grid uk-flex-middle uk-grid-small dt-uikit-header'<'uk-width-1-2@m'l><'uk-width-1-2@m uk-text-right@m'f>>" +
			"<'row uk-grid dt-merge-grid'<'uk-width-1-1'tr>>" +
			"<'row uk-grid dt-merge-grid uk-flex-middle uk-grid-small dt-uikit-footer'<'uk-width-2-5@m'i><'uk-width-3-5@m'p>>",
		renderer: 'uikit'
	});

	/* Default class modification */
	$.extend(DataTable.ext.classes, {
		sWrapper: "dataTables_wrapper uk-form dt-uikit",
		sFilterInput: "uk-form-small",
		sLengthSelect: "uk-form-small",
		sProcessing: "dataTables_processing uk-panel"
	});

	/* UIkit paging button renderer */
	DataTable.ext.renderer.pageButton.uikit = function (settings, host, idx, buttons, page, pages) {
		var api = new DataTable.Api(settings);
		var classes = settings.oClasses;
		var lang = settings.oLanguage.oPaginate;
		var aria = settings.oLanguage.oAria.paginate || {};
		var btnDisplay; var btnClass; var counter = 0;

		var attach = function (container, buttons) {
			var i, ien, node, button;
			var clickHandler = function (e) {
				e.preventDefault();
				if (!$(e.currentTarget).hasClass('disabled') && api.page() != e.data.action) {
					api.page(e.data.action).draw('page');
				}
			};

			for (i = 0, ien = buttons.length; i < ien; i++) {
				button = buttons[i];

				if ($.isArray(button)) {
					attach(container, button);
				} else {
					btnDisplay = '';
					btnClass = '';

					switch (button) {
					case 'ellipsis':
						btnDisplay = '<i class="mdi mdi-dots-horizontal"></i>';
						btnClass = 'uk-pagination-dots uk-disabled disabled';
						break;

					case 'first':
						btnDisplay = '<i class="mdi mdi-chevron-double-left"></i> ' + lang.sFirst;
						btnClass = (page > 0
							? ' uk-pagination-first' : ' uk-pagination-first uk-disabled disabled');
						break;

					case 'previous':
						btnDisplay = '<i class="mdi mdi-chevron-left"></i> ' + lang.sPrevious;
						btnClass = (page > 0
							? ' uk-pagination-prev' : ' uk-pagination-prev uk-disabled disabled');
						break;

					case 'next':
						btnDisplay = lang.sNext + ' <i class="mdi mdi-chevron-right"></i>';
						btnClass = (page < pages - 1
							? ' uk-pagination-next' : ' uk-pagination-next uk-disabled disabled');
						break;

					case 'last':
						btnDisplay = lang.sLast + ' <i class="mdi mdi-chevron-double-right"></i>';
						btnClass = (page < pages - 1
							? ' uk-pagination-last' : ' uk-pagination-last uk-disabled disabled');
						break;

					default:
						btnDisplay = button + 1;
						btnClass = page === button
							? 'uk-active' : '';
						break;
					}

					if (btnDisplay) {
						node = $('<li>', {
							'class': classes.sPageButton + ' ' + btnClass,
							'id': idx === 0 && typeof button === 'string'
								? settings.sTableId + '_' + button
								: null
						})
							.append($((-1 !== btnClass.indexOf('disabled') || -1 !== btnClass.indexOf('active')) ? '<span>' : '<a>', {
								'href': '#',
								'aria-controls': settings.sTableId,
								'aria-label': aria[ button ],
								'data-dt-idx': counter,
								'tabindex': settings.iTabIndex
							})
								.html(btnDisplay)
							)
							.appendTo(container);

						settings.oApi._fnBindAction(
							node, {action: button}, clickHandler
						);

						counter++;
					}
				}
			}
		};

		// IE9 throws an 'unknown error' if document.activeElement is used
		// inside an iframe or frame.
		var activeEl;

		try {
			// Because this approach is destroying and recreating the paging
			// elements, focus is lost on the select button which is bad for
			// accessibility. So we want to restore focus once the draw has
			// completed
			activeEl = $(host).find(document.activeElement).data('dt-idx');
		} catch (e) {}

		attach(
			$(host).empty().html('<ul class="uk-pagination uk-pagination-right uk-flex-right"/>').children('ul'),
			buttons
		);

		if (activeEl) {
			$(host).find('[data-dt-idx=' + activeEl + ']').focus();
		}
	};

	return DataTable;
}));
