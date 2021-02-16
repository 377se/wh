import Vue from 'vue'
import { scDom } from '~/assets/js/utils'
const { css } = scDom;

Vue.mixin({
	methods: {
		pageScrollbarDisable () {
			css(document.documentElement, {
				'overflow': 'hidden'
			});
			css(document.body, {
				'overflow-y': 'scroll'
			});
			css(document.getElementById('sc-header'), {
				'margin-right': this.getScrollbarWidth()
			});
		},
		pageScrollbarEnable () {
			css(document.documentElement, {
				'overflow': ''
			});
			css(document.body, {
				'overflow-y': ''
			});
			css(document.getElementById('sc-header'), {
				'margin-right': ''
			});
		},
		getScrollbarWidth (recalculate) {
			let div1, div2, scrollbarWidth;
			if (recalculate == null) {
				recalculate = false;
			}
			if (document.readyState === 'loading') {
				return null;
			}
			div1 = document.createElement('div');
			div2 = document.createElement('div');
			div1.style.width = div2.style.width = div1.style.height = div2.style.height = '100px';
			div1.style.overflow = 'scroll';
			div2.style.overflow = 'hidden';
			document.body.appendChild(div1);
			document.body.appendChild(div2);
			scrollbarWidth = Math.abs(div1.scrollHeight - div2.scrollHeight);
			document.body.removeChild(div1);
			document.body.removeChild(div2);
			return scrollbarWidth;
		}
	}
});
