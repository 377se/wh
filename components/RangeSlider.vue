<template>
	<input type="text" class="uk-input" :value="value">
</template>

<script>
import _ from 'lodash';
import jQuery from '~/plugins/jquery'
require('ion-rangeslider');
export default {
	name: 'IonRangeSlider',
	props: {
		settings: {
			type: Object,
			default: () => {}
		},
		value: {
			type: [String, Number],
			default: null
		}
	},
	data: () => ({
		slider: null,
		sliderData: null,
		mergedSettings: null
	}),
	computed: {
		defaultSettings () {
			const self = this;
			return {
				onFinish (data) {
					if(self.type === 'single') {
						self.$emit('input', data.from)
					}
					if(self.type === 'double') {
						self.$emit('input', String(data.from + ';' + data.to))
					}
				}
			}
		}
	},
	watch: {
		value (newVal) {
			if (typeof newVal === 'number') {
				this.sliderData.update({
					from: newVal
				})
			}
			if (typeof newVal === 'string') {
				var val = newVal.split(";");
				this.sliderData.update({
					from: val[0],
					to: val[1]
				})
			}
		},
	},
	mounted () {
		this.mergeSettings(this.settings);
		this.initRangeSlider(true);
	},
	destroyed () {
		this.destroyRangeSlider();
	},
	methods: {
		mergeSettings (settings) {
			this.mergedSettings = $.extend(this.defaultSettings, settings);
		},
		initRangeSlider () {
			this.slider = $(this.$el).ionRangeSlider( this.mergedSettings );
			this.sliderData = this.slider.data("ionRangeSlider")
		},
		destroyRangeSlider () {
			$(this.$el).data("ionRangeSlider").destroy();
		},
		changeSettings (newSettings) {
			if(!_.isEqual(newSettings, this.mergedSettings)) {
				this.destroyRangeSlider();
				this.mergeSettings(newSettings);
				this.initRangeSlider(this.mergedSettings);
			}
		}
	}
}
</script>

<style lang="scss">
	@import "../assets/scss/plugins/range_slider.scss";
</style>
