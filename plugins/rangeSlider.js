import Vue from 'vue'
import jQuery from './jquery'
require('ion-rangeslider');
require('~/assets/scss/plugins/range_slider.scss');

Vue.directive("rangeSlider", {
	bind: (el, binding, vnode) => {

		Vue.nextTick(function () {
			el.ionRangeSlider = $(el).ionRangeSlider(binding.value);
			el.ionRangeSlider.on("change", function () {
				vnode.context.$emit('input', $(this).prop("value"))
			});
		})
	},
	unbind: (el, binding) => {
		if(el.ionRangeSlider) {
			el.ionRangeSlider.data("ionRangeSlider").destroy();
		}
	}
});
