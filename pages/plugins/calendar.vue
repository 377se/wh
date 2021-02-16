<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content" class="uk-height-1-1">
			<ScCard class="uk-height-1-1">
				<div class="uk-grid-collapse uk-grid-divider uk-height-1-1 uk-grid" data-uk-grid>
					<div class="uk-width-expand@m uk-height-1-1 uk-flex uk-flex-column">
						<ScCardHeader>
							<div class="uk-flex-middle uk-grid-small uk-grid" data-uk-grid>
								<div class="uk-width-auto uk-flex-last@m">
									<button class="sc-button sc-button-default sc-button-outline uk-button-dropdown" type="button">
										<span id="sc-js-cal-view-name">
											{{ calendar.viewName | toUppercase }}
										</span>
									</button>
									<div data-uk-dropdown="boundary: #sc-page-content; mode: click">
										<ul class="uk-nav uk-dropdown-nav">
											<li>
												<a href="javascript:void(0)" :class="{'sc-text-semibold': calendar.viewName === 'Day'}" @click.prevent="changeCalView('day')">
													Day
												</a>
											</li>
											<li>
												<a href="javascript:void(0)" :class="{'sc-text-semibold': calendar.viewName === 'Week'}" @click.prevent="changeCalView('week')">
													Week
												</a>
											</li>
											<li>
												<a href="javascript:void(0)" :class="{'sc-text-semibold': calendar.viewName === 'Month'}" @click.prevent="changeCalView('month')">
													Month
												</a>
											</li>
											<li>
												<a href="javascript:void(0)" :class="{'sc-text-semibold': calendar.viewName === '2 Weeks'}" @click.prevent="changeCalView('2weeks')">
													2 Weeks
												</a>
											</li>
											<li class="uk-nav-divider"></li>
											<li>
												<div class="sc-padding sc-padding-small-ends">
													<div class="uk-margin-small">
														<PrettyCheck v-model="calWorkWeek" class="p-icon" @change="toggleWorkWeek()">
															<i slot="extra" class="icon mdi mdi-check"></i>
															Show weekends
														</PrettyCheck>
													</div>
													<div>
														<PrettyCheck v-model="calNarrowWeekends" class="p-icon" @change="toggleNarrowWeekends()">
															<i slot="extra" class="icon mdi mdi-check"></i>
															Narrower weekends
														</PrettyCheck>
													</div>
												</div>
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-width-auto uk-visible@m">
									<button type="button" class="sc-button sc-button-default sc-button-flat" @click.prevent="moveToday">
										Today
									</button>
								</div>
								<div class="uk-width-auto uk-flex uk-flex-middle">
									<button type="button" class="sc-button sc-button-default sc-button-flat sc-button-icon" @click.prevent="movePrev">
										<i class="mdi mdi-chevron-left"></i>
									</button>
									<button type="button" class="sc-button sc-button-default sc-button-flat sc-button-icon" @click.prevent="moveNext">
										<i class="mdi mdi-chevron-right"></i>
									</button>
								</div>
								<div class="uk-width-expand@s">
									<h1 class="tui-full-calendar-range-name">
										{{ calendar.rangeText }}
									</h1>
								</div>
							</div>
						</ScCardHeader>
						<ScCardBody>
							<client-only>
								<Calendar
									ref="tuiCalendar"
									:calendars="calendarList"
									:schedules="scheduleList"
									:view="calendar.view"
									:week="calendar.week"
									:month="calendar.month"
									:template="calendarTemplate"
									style="height: 800px;"
									@beforeDeleteSchedule="onBeforeDeleteSchedule"
									@beforeUpdateSchedule="onBeforeUpdateSchedule"
									@beforeCreateSchedule="onBeforeCreateSchedule"
									@clickSchedule="onClickSchedule"
									@calendarInitialized="calendarInitialized"
								></Calendar>
							</client-only>
						</ScCardBody>
					</div>
					<div class="uk-width-1-6@m sc-column-transition uk-visible@l" :class="{'sc-column-collapsed': columnCollapsed, 'sc-js-el-transform': columnTransform}">
						<ScCardHeader class="sc-padding md-bg-grey-200 sc-padding-medium-ends sc-border-bottom uk-margin-bottom">
							<div class="uk-flex uk-flex-middle">
								<div class="uk-flex-1 sc-js-el-hide">
									<p class="uk-margin-remove">
										My calendars
									</p>
								</div>
								<ColumnToggle
									show-icon="mdi-format-list-checks"
									:collapsed="columnCollapsed"
									@columnCollapsing="onColumnCollapsing"
									@columnShown="onColumnToggle"
									@columnHidden="onColumnToggle"
								></ColumnToggle>
							</div>
						</ScCardHeader>
						<ScCardBody class="sc-js-el-hide">
							<ul class="uk-list uk-margin-remove-ends sc-list-align">
								<li>
									<PrettyCheck v-model="calendarListMainCb.checked" :indeterminate.sync="calendarListMainCb.indeterminate" class="p-icon" @change="toggleCalendars($event)">
										<i slot="extra" class="icon mdi mdi-check"></i>
										<i slot="indeterminate-extra" class="icon mdi mdi-minus"></i>
										<strong>View all</strong>
										<label slot="indeterminate-label">
											<strong>View all</strong>
										</label>
									</PrettyCheck>
								</li>
							</ul>
							<ul class="sc-calendars-list uk-list uk-margin-remove-ends sc-list-align">
								<li v-for="cal in calendarList" :key="cal.id">
									<PrettyCheck v-model="cal.checked" class="p-icon p-custom" :style="{'--color': cal.bgColor}" @change="toggleCalendar($event, cal.id)">
										<i slot="extra" class="icon mdi mdi-check"></i>
										{{ cal.name }}
									</PrettyCheck>
								</li>
							</ul>
						</ScCardBody>
					</div>
				</div>
			</ScCard>
		</div>
		<client-only>
			<ScOffcanvas>
				<h5 class="sc-padding-small">
					My calendars
				</h5>
				<ul class="uk-list uk-margin-remove-ends">
					<li>
						<PrettyCheck v-model="calendarListMainCb.checked"
							:indeterminate.sync="calendarListMainCb.indeterminate"
							class="p-icon"
							@change="toggleCalendars($event)"
						>
							<i slot="extra" class="icon mdi mdi-check"></i>
							<i slot="indeterminate-extra" class="icon mdi mdi-minus"></i>
							<strong>View all</strong>
							<label slot="indeterminate-label">
								<strong>View all</strong>
							</label>
						</PrettyCheck>
					</li>
				</ul>
				<hr class="uk-margin">
				<ul class="sc-calendars-list uk-list uk-list-condensed uk-margin-remove-ends">
					<li v-for="cal in calendarList" :key="cal.id">
						<PrettyCheck v-model="cal.checked"
							class="p-icon p-custom"
							:style="{'--color': cal.bgColor}"
							@change="toggleCalendar($event, cal.id)"
						>
							<i slot="extra" class="icon mdi mdi-check"></i>
							{{ cal.name }}
						</PrettyCheck>
					</li>
				</ul>
			</ScOffcanvas>
		</client-only>
	</div>
</template>

<script>
import { scHelpers, scMq } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

import PrettyCheck from 'pretty-checkbox-vue/check';
import ColumnToggle from '~/components/ColumnToggle'
import moment from '~/plugins/moment'
require('tui-calendar/dist/tui-calendar.css');
require('tui-date-picker/dist/tui-date-picker.css');
require('tui-time-picker/dist/tui-time-picker.css');

export default {
	name: 'PluginsCalendar',
	components: {
		Calendar: process.client ? () => import('~/components/tui-calendar') : null,
		ColumnToggle,
		PrettyCheck,
		ScOffcanvas: process.client ? () => import('~/components/Offcanvas') : null
	},
	data: () => ({
		calInstance: null,
		calendar: {
			rangeText: '',
			view: 'month',
			viewName: 'Month',
			week: {
				narrowWeekend: scMq.largeMin(),
				startDayOfWeek: 1, // monday
				workweek: false
			},
			month: {
				visibleWeeksCount: 0,
				narrowWeekend: scMq.largeMin(),
				startDayOfWeek: 1, // monday
				workweek: false
			},
			theme: {
				'common.border': '1px solid rgba(0,0,0,.12)',
				'common.holiday.color': '#f44336',
				'common.saturday.color': 'rgba(0,0,0,.54)',
				'common.dayname.color': 'rgba(0,0,0,.87)',

				// creation guide style
				'common.creationGuide.backgroundColor': 'rgba(19, 93, 230, 0.1)',
				'common.creationGuide.border': '1px solid #135de6',

				// month header 'dayname'
				'month.dayname.height': '32px',
				'month.dayname.borderLeft': '1px solid rgba(0,0,0,.12)',
				'month.dayname.paddingLeft': '8px',
				'month.dayname.paddingRight': '8px',
				'month.dayname.fontWeight': 'normal',
				'month.dayname.textAlign': 'left',

				// month schedule style
				'month.schedule.borderRadius': '4px',

				// month more view
				'month.moreView.boxShadow': 'none',
				'month.moreView.paddingBottom': '0',
				'month.moreViewTitle.height': '28px',
				'month.moreViewTitle.marginBottom': '0',
				'month.moreViewTitle.backgroundColor': '#f5f5f5',
				'month.moreViewTitle.borderBottom': '1px solid rgba(0,0,0,.12)',
				'month.moreViewTitle.padding': '0 8px',
				'month.moreViewList.padding': '8px',

				// week header 'dayname'
				'week.dayname.height': '42px',
				'week.dayname.borderTop': '1px solid rgba(0,0,0,.12)',
				'week.dayname.borderBottom': '1px solid rgba(0,0,0,.12)',
				'week.dayname.borderLeft': '1px solid rgba(0,0,0,.12)',
				'week.dayname.paddingLeft': '4px',
				'week.dayname.backgroundColor': 'inherit',
				'week.dayname.textAlign': 'left',
				'week.pastDay.color': 'rgba(0,0,0,.54)',

				// week vertical panel 'vpanel'
				'week.vpanelSplitter.border': '1px solid #ddd',
				'week.vpanelSplitter.height': '3px',

				// week daygrid 'daygrid'
				'week.daygrid.borderRight': '1px solid #ddd',

				'week.daygridLeft.width': '80px',
				'week.daygridLeft.backgroundColor': '',
				'week.daygridLeft.paddingRight': '4px',
				'week.daygridLeft.borderRight': '1px solid #ddd',

				'week.today.color': 'rgba(0,0,0,.87)',
				'week.today.backgroundColor': '#inherit',
				'week.weekend.backgroundColor': 'inherit',

				// week timegrid 'timegrid'
				'week.timegridLeft.width': '80px',
				'week.timegridLeft.backgroundColor': '#fafafa',
				'week.timegridLeft.borderRight': '1px solid #ddd',
				'week.timegridLeft.fontSize': '12px',
				'week.timegridLeftTimezoneLabel.height': '51px',
				'week.timegridLeftAdditionalTimezone.backgroundColor': '#fdfdfd',

				'week.timegridOneHour.height': '48px',
				'week.timegridHalfHour.height': '24px',
				'week.timegridHalfHour.borderBottom': '1px dotted #f9f9f9',
				'week.timegridHorizontalLine.borderBottom': '1px solid #eee',

				'week.timegrid.paddingRight': '10px',
				'week.timegrid.borderRight': '1px solid #ddd',
				'week.timegridSchedule.borderRadius': '0',
				'week.timegridSchedule.paddingLeft': '0',

				'week.currentTime.color': '#135de6',
				'week.currentTime.fontSize': '12px',
				'week.currentTime.fontWeight': 'bold',

				'week.pastTime.color': '#999',
				'week.pastTime.fontWeight': 'normal',

				'week.futureTime.color': '#333',
				'week.futureTime.fontWeight': 'normal',

				'week.currentTimeLinePast.border': '1px solid rgba(19, 93, 230, 0.3)',
				'week.currentTimeLineBullet.backgroundColor': '#135de6',
				'week.currentTimeLineToday.border': '1px solid #135de6',
				'week.currentTimeLineFuture.border': '1px solid #135de6',

				// week creation guide style
				'week.creationGuide.color': '#135de6',
				'week.creationGuide.fontSize': '12px',
				'week.creationGuide.fontWeight': 'bold',

				// week daygrid schedule style
				'week.dayGridSchedule.borderRadius': '0',
				'week.dayGridSchedule.height': '22px',
				'week.dayGridSchedule.marginTop': '2px',
				'week.dayGridSchedule.marginLeft': '8px',
				'week.dayGridSchedule.marginRight': '8px'
			}
		},
		calendarList: [],
		scheduleList: [],
		calViewName: '',
		calNarrowWeekends: scMq.largeMin(),
		calWorkWeek: true,
		calendarListMainCb: {
			checked: true,
			indeterminate: false,
		},
		lastClickedSchedule: null,
		columnCollapsed: false,
		columnTransform: false
	}),
	computed: {
		calendarTemplate () {
			const self = this;
			return {
				monthGridHeader (model) {
					var date = new Date(model.date);
					return '<span class="tui-full-calendar-weekday-grid-date">' + date.getDate() + '</span>';
				},
				milestone (model) {
					return '<span class="mdi mdi-flag-outline"></span>' + model.title;
				},
				task (model) {
					return '<span class="mdi mdi-calendar-check"></span>' + model.title;
				},
				allday (schedule) {
					return self.getTimeTemplate(schedule, true);
				},
				time (schedule) {
					return self.getTimeTemplate(schedule, false);
				}
			}
		},
		tempCalendarList () {
			return [
				{
					id: '1',
					name: 'My Calendar',
					color: '#ffffff',
					bgColor: '#0288D1',
					dragBgColor: '#0288D1',
					borderColor: '#0277BD',
					checked: true
				},
				{
					id: '2',
					name: 'Company',
					color: '#ffffff',
					bgColor: '#E53935',
					dragBgColor: '#E53935',
					borderColor: '#C62828',
					checked: true
				},
				{
					id: '3',
					name: 'Family',
					color: '#ffffff',
					bgColor: '#0097A7',
					dragBgColor: '#0097A7',
					borderColor: '#00838F',
					checked: true
				},
				{
					id: '4',
					name: 'Friends',
					color: '#ffffff',
					bgColor: '#5E35B1',
					dragBgColor: '#5E35B1',
					borderColor: '#4527A0',
					checked: true
				},
				{
					id: '5',
					name: 'Travel',
					color: '#ffffff',
					bgColor: '#43A047',
					dragBgColor: '#43A047',
					borderColor: '#2E7D32',
					checked: true
				},
				{
					id: '6',
					name: 'etc',
					color: '#ffffff',
					bgColor: '#757575',
					dragBgColor: '#757575',
					borderColor: '#424242',
					checked: true
				},
				{
					id: '7',
					name: 'Birthdays',
					color: '#222222',
					bgColor: '#FDD835',
					dragBgColor: '#FDD835',
					borderColor: '#F9A825',
					checked: true
				},
				{
					id: '8',
					name: 'National Holidays',
					color: '#ffffff',
					bgColor: '#00897B',
					dragBgColor: '#00897B',
					borderColor: '#00695C',
					checked: true
				}
			]
		},
		tempScheduleList () {
			const self = this;
			return [
				{
					id: uniqueID(),
					calendarId: '1',
					title: 'Book Flight to France',
					category: 'allday',
					dragBgColor: self.tempCalendarList[0].dragBgColor,
					start: self.$moment().startOf('month').format('YYYY-MM-DD HH:mm'),
					end: self.$moment().startOf('month').format('YYYY-MM-DD HH:mm')
				},
				{
					id: uniqueID(),
					calendarId: '2',
					title: 'Staff meeting',
					category: 'time',
					dragBgColor: self.tempCalendarList[1].dragBgColor,
					recurrenceRule: true,
					raw: {
						attendees: ['Mark', 'John', 'Lisa']
					},
					start: self.$moment().startOf('month').add(4, 'day').startOf('day').add(10, 'hours').format('YYYY-MM-DD HH:mm'),
					end: self.$moment().startOf('month').add(4, 'day').startOf('day').add(11, 'hours').format('YYYY-MM-DD HH:mm')
				},
				{
					id: uniqueID(),
					calendarId: '3',
					title: 'Get Dentist appointment for John',
					category: 'time',
					dragBgColor: self.tempCalendarList[2].dragBgColor,
					raw: {
						isImportant: true
					},
					start: self.$moment().startOf('month').add(12, 'day').startOf('day').add(13, 'hours').format('YYYY-MM-DD HH:mm'),
					end: self.$moment().startOf('month').add(12, 'day').startOf('day').add(13, 'hours').format('YYYY-MM-DD HH:mm')
				},
				{
					id: uniqueID(),
					calendarId: '4',
					title: 'Weekend getaway with friends',
					category: 'time',
					dragBgColor: self.tempCalendarList[3].dragBgColor,
					location: 'Cinque Terre, Italy',
					start: self.$moment().startOf('month').add(15, 'day').format('YYYY-MM-DD HH:mm'),
					end: self.$moment().startOf('month').add(17, 'day').format('YYYY-MM-DD HH:mm')
				},
				{
					id: uniqueID(),
					calendarId: '5',
					title: 'Trip to France',
					category: 'time',
					dragBgColor: self.tempCalendarList[4].dragBgColor,
					isReadOnly: true,
					start: self.$moment().startOf('month').add(26, 'day').format('YYYY-MM-DD HH:mm'),
					end: self.$moment().startOf('month').add(30, 'day').format('YYYY-MM-DD HH:mm')
				},
				{
					id: uniqueID(),
					calendarId: '6',
					title: 'Review insurance services',
					category: 'time',
					dragBgColor: self.tempCalendarList[5].dragBgColor,
					isAllDay: true,
					isPrivate: true,
					start: self.$moment().startOf('month').add(6, 'day').format('YYYY-MM-DD'),
					end: self.$moment().startOf('month').add(7, 'day').format('YYYY-MM-DD')
				},
				{
					id: uniqueID(),
					calendarId: '7',
					title: 'Get a present for Dad',
					category: 'allday',
					dragBgColor: self.tempCalendarList[6].dragBgColor,
					raw: {
						icon: 'mdi mdi-gift'
					},
					start: self.$moment().startOf('month').add(22, 'day').format('YYYY-MM-DD HH:mm'),
					end: self.$moment().startOf('month').add(22, 'day').format('YYYY-MM-DD HH:mm')
				},
				{
					id: uniqueID(),
					calendarId: '8',
					title: 'National Hugging Day',
					category: 'allday',
					dragBgColor: self.tempCalendarList[7].dragBgColor,
					raw: {
						icon: 'mdi mdi-emoticon-happy'
					},
					start: self.$moment().startOf('month').add(19, 'day').format('YYYY-MM-DD HH:mm'),
					end: self.$moment().startOf('month').add(19, 'day').format('YYYY-MM-DD HH:mm')
				},
				{
					id: uniqueID(),
					calendarId: '6',
					title: 'Check project status',
					category: 'task',
					dragBgColor: self.tempCalendarList[5].dragBgColor,
					dueDate: 'morning',
					start: self.$moment().format('YYYY-MM-DD HH:mm'),
					end: self.$moment().format('YYYY-MM-DD HH:mm')
				},
				{
					id: uniqueID(),
					calendarId: '2',
					title: 'My project v2.0',
					category: 'milestone',
					dragBgColor: self.tempCalendarList[1].dragBgColor,
					start: self.$moment().format('YYYY-MM-DD HH:mm'),
					end: self.$moment().format('YYYY-MM-DD HH:mm')
				},
				{
					id: uniqueID(),
					calendarId: '2',
					title: 'Company picnic',
					category: 'allday',
					dragBgColor: self.tempCalendarList[1].dragBgColor,
					raw: {
						icon: 'mdi mdi-food-fork-drink'
					},
					start: self.$moment().startOf('month').add(9, 'day').startOf('day').add(8, 'hours').format('YYYY-MM-DD HH:mm'),
					end: self.$moment().startOf('month').add(10, 'day').startOf('day').add(20, 'hours').format('YYYY-MM-DD HH:mm')
				}
			];
		}
	},
	created () {
		this.$nextTick(() => {
			// move computed calendarList to data
			this.tempCalendarList.forEach(obj => {
				this.calendarList.push(obj)
			});
			// move computed scheduleList to data
			this.tempScheduleList.forEach(obj => {
				this.scheduleList.push(obj)
			});
		})
	},
	methods: {
		calendarInitialized () {
			this.calInstance = this.$refs.tuiCalendar.getCalInstance();
			// set default range text
			this.setRenderRangeText();
			// set theme
			this.calInstance.setTheme(this.calendar.theme);
		},
		movePrev () {
			this.calInstance.prev();
			this.setRenderRangeText();
		},
		moveNext () {
			this.calInstance.next();
			this.setRenderRangeText();
		},
		moveToday () {
			this.calInstance.today();
			this.setRenderRangeText();
		},
		changeCalView (view) {
			const self = this;
			switch (view) {
			case 'day':
				self.calendar.view = 'day';
				self.calendar.viewName = 'Day';
				break;
			case 'week':
				self.calendar.view = 'week';
				self.calendar.viewName = 'Week';
				break;
			case 'month':
				self.calendar.month.visibleWeeksCount = 0;
				self.calendar.view = 'month';
				self.calendar.viewName = 'Month';
				break;
			case '2weeks':
				self.calendar.month.visibleWeeksCount = 2;
				self.calendar.view = 'month';
				self.calendar.viewName = '2 Weeks';
				break;
			}
			setTimeout(() => {
				this.setRenderRangeText();
			}, 100);
		},
		toggleCalendar (e, id) {
			this.calInstance.toggleSchedules(id, !e);
			let checkboxes = this.calendarList.map((k) => {
				return k.checked
			});
			let someChecked = checkboxes.some(cb => cb === true);
			let allChecked = checkboxes.every(cb => cb === true);

			if (allChecked) {
				this.calendarListMainCb.checked = true;
				this.calendarListMainCb.indeterminate = false
			} else if (someChecked) {
				this.calendarListMainCb.indeterminate = true
			} else {
				this.calendarListMainCb.checked = false;
				this.calendarListMainCb.indeterminate = false
			}
		},
		toggleCalendars (state) {
			this.calendarList.forEach(k => {
				k.checked = state;
				this.calInstance.toggleSchedules(k.id, !state);
			});
		},
		onBeforeDeleteSchedule (event) {
			var index = this.scheduleList.map(item => {
				return item.id
			}).indexOf(event.schedule.id);
			this.scheduleList.splice(index, 1);
		},
		onBeforeUpdateSchedule (event) {
			const schedule = event.schedule;
			const startTime = event.start._date;
			const endTime = event.end._date;
			var index = this.scheduleList.map(item => {
				return item.id
			}).indexOf(event.schedule.id);
			let _schedule = this.scheduleList[index];
			if('calendar' in event) {
				if(this.lastClickedSchedule.id === schedule.id) {
					this.scheduleList.splice(index, 1, {
						id: _schedule.id,
						calendarId: event.calendar.id,
						title: event.schedule.title,
						location: event.schedule.location,
						isAllDay: event.schedule.isAllDay,
						state: event.schedule.state,
						start: this.$moment(startTime).format('YYYY-MM-DD HH:mm'),
						end: this.$moment(endTime).format('YYYY-MM-DD HH:mm'),
						category: event.schedule.isAllDay ? 'time' : _schedule.category,
						isPrivate: _schedule.isPrivate,
						raw: _schedule.raw,
						dragBgColor: event.calendar.dragBgColor
					})
				}
			} else {
				let updatedObj = null;
				this.scheduleList.forEach((obj, index) => {
					if(obj.id === schedule.id) {
						updatedObj = obj;
						updatedObj.start = this.$moment(startTime).format('YYYY-MM-DD HH:mm');
						updatedObj.end = this.$moment(endTime).format('YYYY-MM-DD HH:mm');
					}
				});
				if (updatedObj) {
					this.scheduleList.splice(index, 1, updatedObj)
				}
			}
		},
		onBeforeCreateSchedule (event) {
			this.saveNewSchedule(event)
		},
		onClickSchedule (event) {
			this.lastClickedSchedule = event.schedule;
		},
		toggleNarrowWeekends () {
			this.calendar.month.narrowWeekend = !this.calendar.month.narrowWeekend;
			this.calendar.week.narrowWeekend = !this.calendar.week.narrowWeekend;
		},
		toggleWorkWeek () {
			this.calendar.month.workweek = !this.calendar.month.workweek;
			this.calendar.week.workweek = !this.calendar.week.workweek;
		},
		findCalendar (id) {
			let found;
			this.calendarList.forEach(function (calendar) {
				if (calendar.id === id) {
					found = calendar;
				}
			});
			return found;
		},
		saveNewSchedule (scheduleData) {
			let calendar = scheduleData.calendar || this.findCalendar(scheduleData.calendarId);
			let schedule = {
				id: uniqueID(),
				title: scheduleData.title,
				isAllDay: scheduleData.isAllDay,
				start: scheduleData.start,
				end: scheduleData.end,
				category: scheduleData.isAllDay ? 'allday' : 'time',
				dueDateClass: '',
				color: calendar.color,
				bgColor: calendar.bgColor,
				dragBgColor: calendar.dragBgColor,
				borderColor: calendar.borderColor,
				location: scheduleData.location,
				raw: {
					class: scheduleData.raw['class']
				},
				state: scheduleData.state
			};
			if (calendar) {
				schedule.calendarId = calendar.id;
				schedule.color = calendar.color;
				schedule.bgColor = calendar.bgColor;
				schedule.borderColor = calendar.borderColor;
			}
			this.scheduleList.push(schedule);
		},
		setRenderRangeText () {
			let options = this.calInstance.getOptions();
			let viewName = this.calendar.view;
			let html = [];
			if (viewName === 'day') {
				html.push(this.$moment(this.calInstance.getDate().getTime()).format('MMMM Do YYYY'));
			} else if (viewName === 'month' &&
				(!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)) {
				html.push(this.$moment(this.calInstance.getDate().getTime()).format('MMMM YYYY'));
			} else {
				html.push(this.$moment(this.calInstance.getDateRangeStart().getTime()).format('MMMM Do YYYY'));
				html.push(' ~ ');
				html.push(this.$moment(this.calInstance.getDateRangeEnd().getTime()).format('MMMM Do YYYY'));
			}
			this.calendar.rangeText = html.join('');
		},
		getTimeTemplate (schedule, isAllDay) {
			var html = [];
			var start = this.$moment(schedule.start.toUTCString());
			if (!isAllDay) {
				html.push('<strong>' + start.format('HH:mm') + '</strong> ');
			}
			if (schedule.isPrivate) {
				html.push('<span class="mdi mdi-lock-outline"></span>');
				html.push(' ' + schedule.title);
			} else {
				if (schedule.isReadOnly) {
					html.push('<span class="mdi mdi-pencil-lock"></span>');
				}
				if (schedule.attendees.length) {
					html.push('<span class="mdi mdi-account-multiple-outline"></span>');
				}
				if (schedule.location) {
					html.push('<span class="mdi mdi-map-marker-outline"></span>');
				}
				if (schedule.hasOwnProperty('raw') && schedule.raw) {
					if (schedule.raw.hasOwnProperty('attendees')) {
						html.push('<span class="mdi mdi-account-multiple"></span>');
					}
					if (schedule.raw.hasOwnProperty('isImportant')) {
						html.push('<span class="mdi mdi-alert-outline"></span>');
					}
					if (schedule.raw.hasOwnProperty('icon')) {
						html.push('<span class="' + schedule.raw.icon + '"></span>');
					}
				}
				html.push(' ' + schedule.title);
			}
			return html.join('');
		},
		onColumnCollapsing (value) {
			this.columnCollapsed = value;
			this.columnTransform = true;
		},
		onColumnToggle () {
			this.columnTransform = false
		}
	}
}
</script>

<style lang="scss">
	@import "~scss/plugins/calendar";
	@import '~scss/vue/_pretty_checkboxes';
</style>
