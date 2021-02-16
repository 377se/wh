<template>
	<div>
		<table :id="id" class="uk-table uk-table-striped uk-table-middle" :class="[tableClass]" style="width:100%">
			<thead>
				<tr>
					<th v-for="header in headers" :key="header" class="uk-text-nowrap">
						{{ header }}
					</th>
				</tr>
			</thead>
			<slot name="footer"></slot>
		</table>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { scMq } from '~/assets/js/utils'

require('~/plugins/jquery');

require('datatables.net/js/jquery.dataTables');
require('datatables.net-responsive');
require('datatables.net-select');
require('./dataTables.uikit');
require('./dataTables.responsive.uikit');

export default {
	name: 'Datatable',
	props: {
		data: {
			type: Array,
			default: () => [],
			required: true
		},
		options: {
			type: Object,
			default: () => {}
		},
		id: {
			type: String,
			required: true
		},
		buttons: {
			type: Boolean,
			default: false
		},
		autoWidth: Boolean,
		tableClass: {
			type: String,
			default: ''
		},
		customEvents: {
			type: Array,
			default: () => []
		}
	},
	data: () => ({
		$dt: null
	}),
	computed: {
		dtData () {
			return JSON.parse(JSON.stringify(this.data))
		},
		headers () {
			let names = [];
			Object.keys(this.data[0]).map(k => {
				let name = k.replace(/_/g, ' ');
				names.push(name.charAt(0).toUpperCase() + name.slice(1))
			});
			return names
		},
		columns () {
			let columns = [];
			Object.keys(this.data[0]).map(k => {
				columns.push({
					data: k
				})
			});
			return columns;
		},
		...mapState([
			'vxSidebarMainExpanded'
		])
	},
	watch: {
		dtData (newVal, oldVal) {
			const newLength = newVal.length;
			const oldLength = oldVal.length;
			const newIds = newVal.map(k => {
				return k.id
			});
			const oldIds = oldVal.map(k => {
				return k.id
			});
			if(newLength > oldLength) {
				let uniq = newIds.filter(k => {
					return !oldIds.includes(k)
				});
				if (uniq.length) {
					const newEl = newVal.filter(obj => {
						return obj.id === uniq[0]
					});
					this.$dt.row.add(newEl[0]).draw('full-hold');
				}
			} else {
				let uniq = oldIds.filter(k => {
					return !newIds.includes(k)
				});
				if (uniq.length) {
					this.$dt.row(':eq('+ uniq[0] +')').remove().draw('full-hold')
				}
			}
		},
		vxSidebarMainExpanded () {
			if(scMq.mediumMin()) {
				setTimeout(() => {
					$('#' + this.id).resize()
				}, 300);
			}
		}
	},
	mounted () {
		const self = this;

		if(self.buttons) {
			const pdfMake = require('~/assets/js/vendor/pdfmake/pdfmake');
			const pdfFonts =require('~/assets/js/vendor/pdfmake/vfs_fonts');
			pdfMake.vfs = pdfFonts.pdfMake.vfs;
			window.JSZip = require("~/assets/js/vendor/jszip");
			require('datatables.net-buttons');
			require('datatables.net-buttons/js/buttons.html5');
			require('datatables.net-buttons/js/buttons.print');
		}
		let _options = {
			data: self.data,
			columns: self.columns,
			responsive: true,
			"initComplete" (settings, json) {
				self.$dt = this.api();
				self.$emit('initComplete');
			}
		};
		const options = $.extend(_options, self.options);
		if(options.responsive === 'responsiveModal') {
			_options.responsive = {
				details:  {
					display: $.fn.dataTable.Responsive.display.modal({
						header (row) {
							return 'Details for row ' + (parseInt(row[0]) + 1);
						}
					}),
					renderer: $.fn.dataTable.Responsive.renderer.tableAll({
						tableClass: 'table'
					})
				}
			}
		}
		$('#' + this.id).DataTable(options);
		if(this.customEvents.length) {
			this.customEvents.forEach(event => {
				this.$dt.on(event.name, event.function)
			})
		}
	}
}
</script>
