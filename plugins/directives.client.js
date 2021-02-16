import Vue from 'vue'
import { scDom } from '~/assets/js/utils'
const { css } = scDom;

Vue.directive('boxGradient', {
	inserted: (el, binded, vnode) => {
		const colors = typeof binded.value === 'string' ? binded.value.split(',') : binded.value;
		vnode.context.$nextTick(() => {
			css(el, {
				'background-color': colors[0],
				'background-image': 'linear-gradient( 135deg, ' + colors[0] + ' 10%, ' + colors[1] + ' 100%)'
			});
		})
	},
	update: (el, binded) => {
		const colors = typeof binded.value === 'string' ? binded.value.split(',') : binded.value;
		css(el, {
			'background-color': colors[0],
			'background-image': 'linear-gradient( 135deg, ' + colors[0] + ' 10%, ' + colors[1] + ' 100%)'
		});
	}
});

/**
 * Detect Clicks Outside an Element
 * v-closable="{ exclude: [], handler: '' }"
 * exclude: an array of id's of the elements that we don't want to trigger the outside-click event
 * handler: the name of the method that will handle the outside-click event
 *
 * https://medium.com/@Taha_Shashtari/an-easy-way-to-detect-clicks-outside-an-element-in-vue-1b51d43ff634
 */
let handleOutsideClick;
Vue.directive('closable', {
	bind (el, binding, vnode) {
		handleOutsideClick = (e) => {
			e.stopPropagation();
			const { handler, exclude } = binding.value;
			let clickedOnExcludedEl = false;
			if(typeof exclude !== 'undefined') {
				exclude.forEach(id => {
					if (!clickedOnExcludedEl) {
						const excludedEl = document.getElementById(id);
						clickedOnExcludedEl = excludedEl.contains(e.target);
					}
				});
			}
			if (!el.contains(e.target) && !clickedOnExcludedEl) {
				vnode.context[handler]()
			}
		};
		document.addEventListener('click', handleOutsideClick);
		document.addEventListener('touchstart', handleOutsideClick);
	},
	unbind () {
		document.removeEventListener('click', handleOutsideClick);
		document.removeEventListener('touchstart', handleOutsideClick);
	}
});
