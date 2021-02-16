<template>
	<div ref="bbChart" class="v-bb-chart"></div>
</template>

<script>
import { mapState } from 'vuex'
import { scMq } from '~/assets/js/utils'

require('~/assets/scss/plugins/billboard.scss');
import { bb } from 'billboard.js'

export default {
	name: "BillboardChart",
	props: {
		options: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			oldData: JSON.parse(JSON.stringify(this.options.data)),
			bbChart: null
		}
	},
	computed: {
		...mapState([
			'vxSidebarMainExpanded'
		])
	},
	watch: {
		'options.data': {
			deep: true,
			handler (newVal) {
				if(newVal.columns.length > this.oldData.columns.length) {
					this.createLoadDataChart(newVal);
				} else {
					let oldIds = this.oldData.columns.map(obj => {
						return obj[0];
					});
					let newIds = newVal.columns.map(obj => {
						return obj[0]
					});
					let ids = oldIds.filter(function (obj) {
						return newIds.indexOf(obj) === -1;
					});
					if(ids.length) {
						this.createUnloadDataChart(ids);
					}
				}
				this.oldData = JSON.parse(JSON.stringify(newVal))
			}
		},
		vxSidebarMainExpanded (newVal) {
			if(scMq.mediumMin()) {
				setTimeout(()=> {
					this.bbChart.flush(true);
				}, 300);
			}
		}
	},
	mounted () {
		this.bbChart = this.createGenerateChart();
	},
	beforeDestroy () {
		this.destroyChart();
	},
	methods: {
		destroyChart () {
			this.bbChart.destroy();
			this.bbChart = null;
			this.oldData = null;
		},
		createGenerateChart () {
			const self = this;
			const options = Object.assign({
				bindto: self.$el,
				onafterinit () {
					self.$emit('created', true);
				}
			}, this.options);
			return bb.generate(options);
		},
		createLoadDataChart (data) {
			if(!this.bbChart){
				this.bbChart = this.createGenerateChart(this.options);
			}
			this.bbChart.load(data);
		},
		createUnloadDataChart (data) {
			if(!this.bbChart){
				this.bbChart = this.createGenerateChart(this.options);
			}
			this.bbChart.unload({
				ids: data
			});
		}
	}
};
</script>
