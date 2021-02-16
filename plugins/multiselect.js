import Vue from 'vue'
import jQuery from './jquery'
require('multiselect');
require('~/assets/scss/plugins/multiselect.scss');

Vue.directive("multiSelect", {
	bind: (el, binding, vnode) => {
		const _config = {
			afterSelect: function (values){
				var selected = [];
				$(el).find('option:selected').each(function (index, item) {
					selected.push(item.value);
				});
				vnode.context.$emit('change', selected)
			},
			afterDeselect: function (values){
				var selected = [];
				$(el).find('option:selected').each(function (index, item) {
					selected.push(item.value);
				});
				vnode.context.$emit('change', selected)
			}
		};
		const config = $.extend(_config, binding.value);
		Vue.nextTick(function () {
			$(el).multiSelect(config)
		})
	},
	unbind: (el, binding) => {
		$(el).multiSelect('destroy')
	}
});
