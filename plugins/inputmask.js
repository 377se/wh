import Vue from 'vue';
import Inputmask from 'inputmask';

Vue.directive('inputMask', {
	bind (el, binding) {
		const input = el.querySelector('input');
		if(input) {
			Inputmask(binding.value).mask(input)
		} else {
			Inputmask(binding.value).mask(el)
		}
	},
	unbind (el) {
		const input = el.querySelector('input');
		if(input) {
			Inputmask.remove(input);
		} else {
			Inputmask.remove(el);
		}
	}
});
