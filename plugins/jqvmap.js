import Vue from 'vue'
import jQuery from './jquery'
require('~/assets/js/vendor/jqvmap/jquery.vmap');

Vue.directive("vmap", {
	bind: (el, binding, vnode) => {
		let config = binding.value;
		Vue.nextTick(function () {
			if(config) {
				$(el).vectorMap(config);
			}
		})
	},
	unbind: (el) => {
		$(el).remove();
	}
});
