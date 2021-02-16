/*
 jQuery.ganttView v.0.8.8
 Copyright (c) 2010 JC Grubbs - jc.grubbs@devmynd.com
 MIT License Applies
 Heavily modified by tzd
 */
(function (jQuery) {

	jQuery.fn.ganttView = function () {
		var args = Array.prototype.slice.call(arguments);
		if (args.length === 1 && typeof (args[0]) === "object") {
			build.call(this, args[0]);
		}
		if (args.length === 2 && typeof (args[0]) === "string") {
			handleMethod.call(this, args[0], args[1]);
		}
	};

	function build (options) {
		var els = this;
		var defaults = {
			highlightWeekends: true,
			highlightToday: true,
			toggleableProjects: true,
			cellWidth: 20,
			slideWidth: 400,
			kineticScroll: true,
			startDate: false,
			endDate: false,
			startToday: false,
			behavior: {
				clickable: false,
				draggable: true,
				resizable: true
			}
		};

		var opts = jQuery.extend(true, defaults, options);

		if (opts.data) {
			build();
		} else if (opts.dataUrl) {
			jQuery.getJSON(opts.dataUrl, function (data) { opts.data = data; build(); });
		}

		function build () {
			var minDays = Math.floor((opts.slideWidth / opts.cellWidth) + 5);
			var startEnd = DateUtils.getBoundaryDatesFromData(opts.data, minDays);
			opts.start = opts.startDate ? moment(opts.startDate, "MM/DD/YYYY")._d : startEnd[0];
			opts.end = opts.endDate ? moment(opts.endDate, "MM/DD/YYYY")._d : startEnd[1];

			els.each(function () {
				var container = jQuery(this);
				var div = jQuery("<div>", { "class": "ganttview" });
				new Chart(div, opts).render();
				container.append(div);

				var w = jQuery("div.ganttview-vtheader", container).outerWidth() +
					jQuery("div.ganttview-slide-container", container).outerWidth();

				new Behavior(container, opts).apply();
			});
		}
	}

	function handleMethod (method, value) {
		if (method === "setSlideWidth") {
			var div = $("div.ganttview", this);
			div.each(function () {
				var vtWidth = $("div.ganttview-vtheader", div).outerWidth();
				$(div).width(vtWidth + value + 1);
				$("div.ganttview-slide-container", this).width(value);
			});
		}
	}

	var Chart = function (div, opts) {
		function render () {
			addVtHeader(div, opts.data);

			var slideDiv = jQuery("<div>", {
				"class": "ganttview-slide-container"
			});

			var dates = getDates(opts.start, opts.end);
			addHzHeader(slideDiv, dates, opts.cellWidth, opts.highlightWeekends, opts.highlightToday, opts.startToday);
			addGrid(slideDiv, opts.data, dates, opts.cellWidth, opts.highlightWeekends, opts.highlightToday);
			addBlockContainers(slideDiv, opts.data);
			addBlocks(slideDiv, opts.data, opts.cellWidth, opts.start);
			div.append(slideDiv);
			jQuery(div).find('.ganttview-blocks').width(slideDiv.find('.ganttview-grid').width());
			applyLastClass(div.parent());
			if (opts.toggleableProjects) {
				toggleProjects(div);
			}
			if (opts.kineticScroll) {
				kineticScroll(div);
			}
			if (opts.startToday) {
				setTimeout(function () {
					var days = DateUtils.daysBetween(opts.start, moment()._d);
					slideDiv.scrollLeft(days * opts.cellWidth);
				}, 100)
			}
		}

		// Creates a 3 dimensional array [year][month][day] of every day
		// between the given start and end dates
		function getDates (start, end) {
			var dates = [];
			dates[start.getFullYear()] = [];
			dates[start.getFullYear()][start.getMonth()] = [start];
			var last = start;
			while (moment(end).isAfter(last)) {
				var next = moment(last).add(1, 'days')._d;
				if (!dates[next.getFullYear()]) { dates[next.getFullYear()] = []; }
				if (!dates[next.getFullYear()][next.getMonth()]) {
					dates[next.getFullYear()][next.getMonth()] = [];
				}
				dates[next.getFullYear()][next.getMonth()].push(next);
				last = next;
			}
			return dates;
		}

		function addVtHeader (div, data) {
			var headerDiv = jQuery("<div>", { "class": "ganttview-vtheader" });
			for (var i = 0; i < data.length; i++) {
				var itemDiv = jQuery("<div>", { "class": "ganttview-vtheader-group" });
				itemDiv.append(jQuery("<div>", {
					"class": "ganttview-vtheader-group-name",
					"id": "groupId_" + i
				}).append(data[i].name).append('<span/>'));

				var seriesDiv = jQuery("<div>", { "class": "ganttview-vtheader-series" });
				for (var j = 0; j < data[i].series.length; j++) {
					var seriesRow = jQuery("<div>", { "class": "ganttview-vtheader-series-row" });
					if ((data[i].series[j].sub_series)) {
						var series_content = jQuery("<div>", { "class": "series-content" });

						var series_dates = jQuery("<div>", { "class": "series-dates" });
						var series_users = jQuery("<div>", { "class": "series-users" });

						series_content.append('<div class="series-name">' +
							data[i].series[j].name +
							'</div>');

						for (var k = 0; k < data[i].series[j].sub_series.length; k++) {
							var moreItems = k > 0 ? '<span class="date-sep">|</span>' : '';

							var sub_serie = data[i].series[j].sub_series[k];

							if (sub_serie.user_avatar) {
								var series_user = jQuery("<div>", { "class": "series-user" });

								var user_name = sub_serie.user_name;
								var user_avatar = sub_serie.user_avatar;
								series_user.append('<span><img src="' + user_avatar + '" alt="' + user_name + '" title="' + user_name + '"/></span>');
								series_users.append(series_user);
								seriesRow.append(series_users);
							}

							series_dates.append(function () {
								return moreItems +
									"<span data-event-id='" + data[i].series[j].sub_series[k].id + "'>" +
									moment(sub_serie.start, "MM/DD/YYYY").format('D MMM') +
									" - " +
									moment(sub_serie.end, "MM/DD/YYYY").format('D MMM') +
									"</span>"
							});

							series_content.append(series_dates);
							seriesRow.append(series_content);
						}
					} else {
						seriesRow.append(
							function () {
								var avatar =
									(data[i].series[j].user_avatar)
										? "<div class='series-user'><span><img src='" + data[i].series[j].user_avatar + "' alt='" + data[i].series[j].user_name + "' title='" + data[i].series[j].user_name + "'/></span></div>"
										: "";

								return avatar +
									"<div class='series-content'>" +
									'<div class="series-name">' +
									data[i].series[j].name +
									'</div>' +
									"<div class='series-dates'>" +
									"<span data-event-id='" + data[i].series[j].id + "'>" +
									moment(data[i].series[j].start, "MM/DD/YYYY").format('D MMM') +
									" - " +
									moment(data[i].series[j].end, "MM/DD/YYYY").format('D MMM') +
									"</span>" +
									"</div>" +
									"</div>"
							}
						);
					}
					seriesDiv.append(seriesRow);
				}
				itemDiv.append(seriesDiv);
				headerDiv.append(itemDiv);
			}
			div.append(headerDiv);
		}

		function addHzHeader (div, dates, cellWidth, highlightWeekends, highlightToday, startToday) {
			var headerDiv = jQuery("<div>", { "class": "ganttview-hzheader" });
			var monthsDiv = jQuery("<div>", { "class": "ganttview-hzheader-months" });
			var daysDiv = jQuery("<div>", { "class": "ganttview-hzheader-days" });
			var totalW = 0;
			for (var y in dates) {
				for (var m in dates[y]) {
					var w = dates[y][m].length * cellWidth;
					totalW = totalW + w;
					monthsDiv.append(jQuery("<div>", {
						"class": "ganttview-hzheader-month",
						"css": { "width": (w - 1) + "px" }
					}).append(moment(parseInt(m) + 1, "M").format('MMMM') + " " + y));
					for (var d in dates[y][m]) {
						var headerDay = jQuery("<div>", { "class": "ganttview-hzheader-day" });
						if (DateUtils.isWeekend(dates[y][m][d]) && highlightWeekends) {
							headerDay.addClass("ganttview-weekend");
						}
						if (moment(dates[y][m][d]).isSame(Date.now(), 'day') && highlightToday) {
							headerDay.addClass("ganttview-today");
						}
						if (moment(dates[y][m][d]).isSame(Date.now(), 'day') && startToday) {
							headerDay.addClass("ganttview-startToday");
						}
						daysDiv.append(headerDay.append(dates[y][m][d].getDate()));
					}
				}
			}
			monthsDiv.css("width", totalW + "px");
			daysDiv.css("width", totalW + "px");
			headerDiv.append(monthsDiv).append(daysDiv);
			div.append(headerDiv);
		}

		function addGrid (div, data, dates, cellWidth, highlightWeekends, highlightToday) {
			var gridDiv = jQuery("<div>", { "class": "ganttview-grid" });
			var rowDiv = jQuery("<div>", { "class": "ganttview-grid-row" });
			for (var y in dates) {
				for (var m in dates[y]) {
					for (var d in dates[y][m]) {
						var cellDiv = jQuery("<div>", { "class": "ganttview-grid-row-cell" });
						if (DateUtils.isWeekend(dates[y][m][d]) && highlightWeekends) {
							cellDiv.addClass("ganttview-weekend");
						}
						if (moment(dates[y][m][d]).isSame(Date.now(), 'day') && highlightToday) {
							cellDiv.addClass("ganttview-today");
						}
						rowDiv.append(cellDiv);
					}
				}
			}
			var w = jQuery("div.ganttview-grid-row-cell", rowDiv).length * cellWidth;
			rowDiv.css("width", w + "px");
			gridDiv.css("width", w + "px");
			for (var i = 0; i < data.length; i++) {
				gridDiv.append(jQuery("<div>", {
					"class": "ganttview-grid-spacer",
					"data-click-target": "groupId_" + i
				}));
				for (var j = 0; j < data[i].series.length; j++) {
					gridDiv.append(rowDiv.clone().addClass('groupId_' + i));
				}
			}
			div.append(gridDiv);
		}

		function addBlockContainers (div, data) {
			var blocksDiv = jQuery("<div>", {
				"class": "ganttview-blocks"
			});
			for (var i = 0; i < data.length; i++) {
				blocksDiv.append(jQuery("<div>", { "class": "ganttview-block-spacer" }));
				for (var j = 0; j < data[i].series.length; j++) {
					blocksDiv.append(jQuery("<div>", {
						"class": "ganttview-block-container groupId_" + i
					}));
				}
			}
			div.append(blocksDiv);
		}

		function addBlocks (div, data, cellWidth, start) {
			var rows = jQuery("div.ganttview-blocks div.ganttview-block-container", div);

			var rowIdx = 0;

			for (var i = 0; i < data.length; i++) {
				for (var j = 0; j < data[i].series.length; j++) {
					if (data[i].series[j].sub_series) {
						var sub_series = data[i].series[j].sub_series;

						var $sub_series_name = (data[i].series[j].name).replace(/(<([^>]+)>)/ig, " ");
						$.each(sub_series, function ($key, $value) {
							var size = DateUtils.daysBetween($value.start, $value.end) + 1;

							var offset = DateUtils.daysBetween(start, $value.start);

							var user_name = $value.user_name ? ' (' + $value.user_name + ')' : '';

							var block = jQuery("<div>", {
								"class": "ganttview-block",
								"title": $sub_series_name + user_name,
								"data-id": $value.id,
								"id": 'ganttview-item-' + $value.id,
								"css": {
									"width": ((size * cellWidth) - 7) + "px",
									"left": ((offset * cellWidth) + 3) + "px"
								}
							});

							addBlockData(block, data[i], sub_series[$key]);
							if ($value.color) {
								block.css("background-color", $value.color);
							}
							var title = $value.title ? $value.link ? '<a href="' + $value.link + '" title="' + $value.link + '">' + $value.title + '</a>' : $value.title : DateUtils.humanizeOutput(moment($value.start, 'MM/DD/YYYY'), moment($value.end, 'MM/DD/YYYY'));
							if ($value.link) {
								block.append(jQuery("<div>", { "class": "ganttview-block-text" }).html(title));
							} else {
								block.append(jQuery("<div>", { "class": "ganttview-block-text" }).text(title));
							}
							jQuery(rows[rowIdx]).append(block);
						});
					} else {
						var series = data[i].series[j];

						var $series_name = (series.name).replace(/(<([^>]+)>)/ig, " ");

						var size = DateUtils.daysBetween(series.start, series.end) + 1;

						var offset = DateUtils.daysBetween(start, series.start);

						var block = jQuery("<div>", {
							"class": "ganttview-block",
							"title": $series_name,
							"id": 'ganttview-item-' + data[i].series[j].id,
							"css": {
								"width": ((size * cellWidth) - 7) + "px",
								"left": ((offset * cellWidth) + 3) + "px"
							}
						});
						addBlockData(block, data[i], series);
						if (data[i].series[j].color) {
							block.css("background-color", data[i].series[j].color);
						}
						var title = series.title ? series.link ? '<a href="' + series.link + '" title="' + series.link + '">' + series.title + '</a>' : series.title : DateUtils.humanizeOutput(moment(series.start, 'MM/DD/YYYY'), moment(series.end, 'MM/DD/YYYY'));
						if (series.link) {
							block.append(jQuery("<div>", { "class": "ganttview-block-text" }).html(title));
						} else {
							block.append(jQuery("<div>", { "class": "ganttview-block-text" }).text(title));
						}

						jQuery(rows[rowIdx]).append(block);
					}
					rowIdx++;
				}
			}

			jQuery(".ganttview-blocks").css({
				width: $(div).width()
			});
		}

		function addBlockData (block, data, series) {
			// This allows custom attributes to be added to the series data objects
			// and makes them available to the 'data' argument of click, resize, and drag handlers
			var blockData = { parent: data.name };
			jQuery.extend(blockData, series);
			block.data("block-data", blockData);
		}

		function applyLastClass (div) {
			jQuery("div.ganttview-grid-row div.ganttview-grid-row-cell:last-child", div).addClass("last");
			jQuery("div.ganttview-hzheader-days div.ganttview-hzheader-day:last-child", div).addClass("last");
			jQuery("div.ganttview-hzheader-months div.ganttview-hzheader-month:last-child", div).addClass("last");
		}

		function toggleProjects (div) {
			var easing = [0.55, 0, 0.1, 1];
			$('div.ganttview-vtheader-group-name', div).addClass('toggle_enabled').on('click', function () {
				var $thisId = $(this).attr('id');
				if (!$(this).hasClass('projectHidden')) {

					$(this).addClass('projectHidden');

					velocity($(this).next('div').children(), "slideUp", {
						duration: 180,
						easing: easing
					});

					$('.ganttview-block-container.' + $thisId).hide();

					velocity($('.ganttview-grid-row.' + $thisId), "slideUp", {
						duration: 180,
						easing: easing
					});
				} else {

					$(this).removeClass('projectHidden');

					velocity($(this).next('div').children(), "slideDown", {
						duration: 180,
						easing: easing
					});

					$('.ganttview-block-container.' + $thisId).show();

					velocity($('.ganttview-grid-row.' + $thisId), "slideDown", {
						duration: 180,
						easing: easing
					});
				}
			});

			$('div.ganttview-grid-spacer', div).on('click', function () {
				$('#' + $(this).attr('data-click-target')).click()
			});
		}

		function kineticScroll (div) {
			var container = jQuery("div.ganttview-slide-container", div);
			$(container).kinetic({
				y: false,
				filterTarget: function (target, e) {
					return !($(target).closest(".ganttview-block").length || $(target).closest(".ganttview-grid-spacer").length);
				}
			});
		}

		return {
			render: render
		};
	};

	var Behavior = function (div, opts) {
		function apply () {
			if (opts.behavior.clickable) {
				bindBlockClick(div, opts.behavior.onClick);
			}

			if (opts.behavior.resizable) {
				bindBlockResize(div, opts.cellWidth, opts.start, opts.behavior.onResize);
			}

			if (opts.behavior.draggable) {
				bindBlockDrag(div, opts.cellWidth, opts.start, opts.behavior.onDrag);
			}
		}

		function bindBlockClick (div, callback) {
			jQuery("div.ganttview-block", div).on("click", function () {
				if (callback) { callback(jQuery(this).data("block-data")); }
			});
		}

		function bindBlockResize (div, cellWidth, startDate, callback) {
			jQuery("div.ganttview-block", div).resizable({
				grid: cellWidth,
				handles: "e,w",
				stop: function () {
					var block = jQuery(this);
					updateDataAndPosition(div, block, cellWidth, startDate);

					var blockData = block.data("block-data");
					div.find('[data-event-id=' + blockData.id + ']').text(moment(blockData.start).format('D MMM') + ' - ' + moment(blockData.end).format('D MMM'));

					if (callback) { callback(block.data("block-data")); }
				}
			});
		}

		function bindBlockDrag (div, cellWidth, startDate, callback) {
			jQuery("div.ganttview-block", div).draggable({
				axis: "x",
				grid: [cellWidth, cellWidth],
				containment: "parent",
				stop: function () {
					var block = jQuery(this);
					updateDataAndPosition(div, block, cellWidth, startDate);

					var blockData = block.data("block-data");
					div.find('[data-event-id=' + blockData.id + ']').text(moment(blockData.start).format('D MMM') + ' - ' + moment(blockData.end).format('D MMM'));

					if (callback) { callback(block.data("block-data")); }
				}
			});
		}

		function updateDataAndPosition (div, block, cellWidth, startDate) {
			var container = jQuery("div.ganttview-slide-container", div);
			var scroll = container.scrollLeft();
			var offset = block.offset().left - container.offset().left - 1 + scroll;

			// Set new start date
			var daysFromStart = Math.round(offset / cellWidth);
			var newStart = moment(startDate).add(daysFromStart, 'days');
			block.data("block-data").start = newStart;

			// Set new end date
			var width = block.outerWidth();
			var numberOfDays = Math.round(width / cellWidth) - 1;
			var newEnd = moment(newStart).add(numberOfDays, 'days');
			block.data("block-data").end = newEnd;
			if (!block.data("block-data").title) {
				jQuery("div.ganttview-block-text", block).text( DateUtils.humanizeOutput(newStart, newEnd) );
			}
		}

		return {
			apply: apply
		};
	};

	var DateUtils = {
		daysBetween: function (start, end) {
			if (!start || !end) { return 0; }
			start = Date.parse(start); end = Date.parse(end);
			if (moment(start)._d.getYear() == 1901 || moment(end)._d.getYear() == 8099) { return 0; }
			return moment(end).diff(moment(start), 'days');
		},
		isWeekend: function (date) {
			return date.getDay() % 6 == 0;
		},
		getBoundaryDatesFromData: function (data, minDays) {
			var minStart = new Date();

			var maxEnd = new Date();

			var entries = [];

			data.forEach(function (group) {
				group.series.forEach(function (entry) {
					if (entry.sub_series) {
						entry.sub_series.forEach(function (subEntry) {
							entries.push(subEntry);
						})
					} else {
						entries.push(entry);
					}
				});
			});
			entries.forEach(function (entry, index) {
				var start = Date.parse(entry.start);

				var end = Date.parse(entry.end);

				if (index === 0) {
					minStart = start;
					maxEnd = end;
				}

				if (moment(minStart).isAfter(start)) { minStart = start; }
				if (moment(maxEnd).isBefore(end)) { maxEnd = end; }
			});

			// Insure that the width of the chart is at least the slide width to avoid empty
			// whitespace to the right of the grid
			if (moment(maxEnd).diff(minStart, 'days') < minDays) {
				maxEnd = moment(minStart).add(minDays, 'days');
			}

			return [moment(minStart)._d, moment(maxEnd)._d];
		},
		humanizeOutput: function(start, end) {

			var duration = moment.duration(moment(end._d).diff(moment(start._d).subtract('1','day')));
			var singular = duration._locale._relativeTime.d;
			var plural = duration._locale._relativeTime.dd;
			var days = parseInt(duration.asDays());

			if(days > 1) {
				days = plural.replace('%d', days)
			} else {
				days = singular
			}

			return days;
		}
	};
})(jQuery);
