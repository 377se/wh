/*
 * Chained - jQuery / Zepto chained selects plugin
 *
 * Copyright (c) 2010-2014 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/chained
 *
 * Version: 1.0.0
 *
 */

;(function ($, window, document, undefined) {
	"use strict";

	$.fn.chained = function (parent_selector) {

		return this.each(function () {

			/* Save this to child because this changes when scope changes. */
			var child   = this;
			var backup = $(child).clone();

			/* Handles maximum two parents now. */
			$(parent_selector).each(function () {
				$(this).bind("change", function () {
					updateChildren();
				});

				/* Force IE to see something selected on first page load, */
				/* unless something is already selected */
				if (!$("option:selected", this).length) {
					$("option", this).first().attr("selected", "selected");
				}

				/* Force updating the children. */
				updateChildren();
			});

			function updateChildren () {
				var trigger_change = true;
				var currently_selected_value = $("option:selected", child).val();

				$(child).html(backup.html());

				/* If multiple parents build classname like foo\bar. */
				var selected = "";
				$(parent_selector).each(function () {
					var selectedClass = $("option:selected", this).val();
					if (selectedClass) {
						if (selected.length > 0) {
							if (window.Zepto) {
								/* Zepto class regexp dies with classes like foo\bar. */
								selected += "\\\\";
							} else {
								selected += "\\";
							}
						}
						selected += selectedClass;
					}
				});

				/* Also check for first parent without subclassing. */
				/* TODO: This should be dynamic and check for each parent */
				/*       without subclassing. */
				var first;
				if ($.isArray(parent_selector)) {
					first = $(parent_selector[0]).first();
				} else {
					first = $(parent_selector).first();
				}
				var selected_first = $("option:selected", first).val();

				$("option", child).each(function () {
					/* Remove unneeded items but save the default value. */
					if ($(this).hasClass(selected) && $(this).val() === currently_selected_value) {
						$(this).prop("selected", true);
						trigger_change = false;
					} else if (!$(this).hasClass(selected) && !$(this).hasClass(selected_first) && $(this).val() !== "") {
						$(this).remove();
					}
				});

				/* If we have only the default value disable select. */
				if (1 === $("option", child).length && $(child).val() === "") {
					$(child).prop("disabled", true);
				} else {
					$(child).prop("disabled", false);
				}
				if (trigger_change) {
					$(child).trigger("change");
				}
			}
		});
	};

	/* Alias for those who like to use more English like syntax. */
	$.fn.chainedTo = $.fn.chained;

	/* Default settings for plugin. */
	$.fn.chained.defaults = {};

})(window.jQuery || window.Zepto, window, document);

/*
 * Chained - jQuery / Zepto chained selects plugin
 *
 * Copyright (c) 2010-2014 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/chained
 *
 * Version: 1.0.0
 *
 */

;(function ($, window, document, undefined) {
	"use strict";

	$.fn.remoteChained = function (options) {

		var settings = $.extend({}, $.fn.remoteChained.defaults, options);

		/* Loading text always clears the select. */
		if (settings.loading) {
			settings.clear = true;
		}

		return this.each(function () {

			/* Save this to self because this changes when scope changes. */
			var self = this;
			var request = false; /* Track xhr requests. */

			$(settings.parents).each(function () {
				$(this).bind("change", function () {

					/* Build data array from parents values. */
					var data = {};
					$(settings.parents).each(function () {
						var id = $(this).attr(settings.attribute);
						var value = ($(this).is("select") ? $(":selected", this) : $(this)).val();
						data[id] = value;

						/* Optionally also depend on values from these inputs. */
						if (settings.depends) {
							$(settings.depends).each(function () {
								/* Do not include own value. */
								if (self !== this) {
									var id = $(this).attr(settings.attribute);
									var value = $(this).val();
									data[id] = value;
								}
							});
						}
					});

					/* If previous request running, abort it. */
					/* TODO: Probably should use Sinon to test this. */
					if (request && $.isFunction(request.abort)) {
						request.abort();
						request = false;
					}

					if (settings.clear) {
						if (settings.loading) {
							/* Clear the select and show loading text. */
							build.call(self, {"" : settings.loading});
						} else {
							/* Clear the select. */
							$("option", self).remove();
						}

						/* Force updating the children to clear too. */
						$(self).trigger("change");

						/* Custom event to notify we have remote loaded a select. See issue #38 */
						$(self).trigger("chained:load");
					}

					request = $.getJSON(settings.url, data, function (json) {
						build.call(self, json);
						/* Force updating the children. */
						$(self).trigger("change");
					});
				});

				/* If we have bootstrapped data given in options. */
				if (settings.bootstrap) {
					build.call(self, settings.bootstrap);
					settings.bootstrap = null;
				}
			});

			/* Build the select from given data. */
			function build (json) {
				/* If select already had something selected, preserve it. */
				var selected_key = $(":selected", self).val();

				/* Clear the select. */
				$("option", self).remove();

				var option_list = [];
				if ($.isArray(json)) {
					if ($.isArray(json[0])) {
						/* JSON is already an array of arrays. */
						/* [["","--"],["series-1","1 series"],["series-3","3 series"]] */
						option_list = json;
					} else {
						/* JSON is an array of objects. */
						/* [{"":"--"},{"series-1":"1 series"},{"series-3":"3 series"}] */
						option_list = $.map(json, function (value) {
							return $.map(value, function (value, index) {
								return [[index, value]];
							});
						});
					}
				} else {
					/* JSON is an JavaScript object. Rebuild it as an array. */
					/* {"":"--","series-1":"1 series","series-3":"3 series"} */
					for (var index in json) {
						if (json.hasOwnProperty(index)) {
							option_list.push([index, json[index]]);
						}
					}
				}

				/* Add new options from json. */
				for (var i=0; i!==option_list.length; i++) {
					var key = option_list[i][0];
					var value = option_list[i][1];

					/* Set the selected option from JSON. */
					if ("selected" === key) {
						selected_key = value;
						continue;
					}
					var option = $("<option />").val(key).append(value);
					$(self).append(option);
				}

				/* Loop option again to set selected. IE needed this... */
				$(self).children().each(function () {
					if ($(this).val() === selected_key + "") {
						$(this).attr("selected", "selected");
					}
				});

				/* If we have only the default value disable select. */
				if (1 === $("option", self).length() && $(self).val() === "") {
					$(self).prop("disabled", true);
				} else {
					$(self).prop("disabled", false);
				}
			}
		});
	};

	/* Alias for those who like to use more English like syntax. */
	$.fn.remoteChainedTo = $.fn.remoteChained;

	/* Default settings for plugin. */
	$.fn.remoteChained.defaults = {
		attribute: "name",
		depends : null,
		bootstrap : null,
		loading : null,
		clear : false
	};

})(window.jQuery || window.Zepto, window, document);
