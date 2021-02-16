import Vue from 'vue';
import jQuery from './jquery'
if(process.client) {
	require('~/assets/js/vendor/sticky-kit.js');
}
import { scMq } from "../assets/js/utils";

Vue.directive("scSticky", {
	bind: (el, binding, vnode) => {
		var sticky = binding.value || {};
		var options = sticky.options || {};
		var events = sticky.on || {};

		if (typeof sticky.media !== 'undefined') {
			if (!scMq[sticky.media]()) {
				return;
			}
		}
		vnode.context.$nextTick(() => {
			var $this = $(el);
			var $header = $('#sc-header');
			var $topBar = $('#sc-page-top-bar');

			if (options.offset_top === 'inPlace') {
				options.offset_top = $this.offset().top;
			} else {
				if ($header.length) {
					options.offset_top = $header.outerHeight();
				}
				if ($topBar.length) {
					options.offset_top += $topBar.outerHeight();
				}
			}
			setTimeout(function () {
				$this.stick_in_parent(options);
				for(var i in events) {
					if (events.hasOwnProperty(i)) {
						$this.on(i, events[i]);
					}
				}
			}, 500);
		});
	},
	unbind: (el) => {
		$(el).trigger("sticky_kit:detach");
	}
});
