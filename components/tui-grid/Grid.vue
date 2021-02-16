<template>
	<div ref="tuiGrid"></div>
</template>

<script>

const gridEvents = [
	'beforeRequest',
	'check',
	'click',
	'collapsed',
	'collapsedAll',
	'dblclick',
	'deleteRange',
	'errorResponse',
	'expanded',
	'expandedAll',
	'failResponse',
	'focusChange',
	'mousedown',
	'mouseout',
	'mouseover',
	'response',
	'selection',
	'successResponse',
	'uncheck'
];

const presetTheme = [
	'default',
	'striped',
	'clean'
];

const presetLanguage = [
	'en',
	'ko'
];

export default {
	name: 'TuiGrid',
	props: {
		rowData: {
			type: Array,
			required: true
		},
		columnData: {
			type: Array,
			required: true
		},
		options: {
			type: Object,
			default () {
				return {};
			}
		},
		theme: {
			type: [String, Object],
			default: null,
			validator (value) {
				let result = false;
				if (typeof value === 'string') {
					result = presetTheme.indexOf(value) > -1;
				} else {
					result = value.hasOwnProperty('name') && value.hasOwnProperty('value');
				}
				return result;
			}
		},
		language: {
			type: [String, Object],
			default: null,
			validator (value) {
				let result = false;
				if (typeof value === 'string') {
					result = presetLanguage.indexOf(value) > -1;
				} else {
					result = value.hasOwnProperty('name') && value.hasOwnProperty('value');
				}
				return result;
			}
		}
	},
	data: () => ({
		gridInstance: null
	}),
	watch: {
		rowData (newData) {
			this.invoke('setData', newData);
		},
		columnData (newColumns) {
			this.invoke('setColumns', newColumns);
		}
	},
	mounted () {
		const options = Object.assign({}, this.options, {
			el: this.$refs.tuiGrid,
			data: this.rowData,
			columns: this.columnData
		});
		this.$nextTick(() => {
			const Grid = require('tui-grid');
			this.gridInstance = new Grid(options);
			this.addEventListeners();
			this.applyTheme(Grid);
			this.setLanguage(Grid);
		})
	},
	beforeDestroy () {
		gridEvents.forEach(eventName => this.gridInstance.off(eventName));
	},
	methods: {
		addEventListeners () {
			gridEvents.forEach(eventName => {
				this.gridInstance.on(eventName, (...args) => this.$emit(eventName, ...args));
			});
		},
		applyTheme (Grid) {
			if (this.theme) {
				if (typeof this.theme === 'string') {
					Grid.applyTheme(this.theme);
				} else {
					Grid.applyTheme(this.theme.name, this.theme.value);
				}
			}
		},
		setLanguage (Grid) {
			if (this.language) {
				if (typeof this.language === 'string') {
					Grid.setLanguage(this.language);
				} else {
					Grid.setLanguage(this.language.name, this.language.value);
				}
			}
		},
		getRootElement () {
			return this.$refs.tuiGrid;
		},
		getPagination () {
			return this.gridInstance.getPagination();
		},
		invoke (methodName, ...args) {
			let result;
			if (methodName === 'resetData' && args.length > 0) {
				const clonedData = JSON.parse(JSON.stringify(args[0]));
				if (args.length > 1) {
					this.gridInstance[methodName](clonedData, args[1]);
				} else {
					this.gridInstance[methodName](clonedData);
				}
			} else if (this.gridInstance[methodName]) {
				result = this.gridInstance[methodName](...args);
			}
			return result;
		}
	}
};
</script>
