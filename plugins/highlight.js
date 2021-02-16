// highlight.js
import Vue from 'vue'

var hljs = require("highlight.js/lib/core");
require('highlight.js/styles/github.css');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

Vue.directive('highlightjs', {
	deep: true,
	bind: function bind (el, binding) {
		// on first bind, highlight all targets
		var targets = el.querySelectorAll('code');
		var target;
		var i;
		for (i = 0; i < targets.length; i += 1) {
			target = targets[i];
			if (typeof binding.value === 'string') {
				// if a value is directly assigned to the directive, use this
				// instead of the element content.
				target.textContent = binding.value;
			}
			hljs.highlightBlock(el);
		}
	},
	componentUpdated: function componentUpdated (el, binding) {
		// after an update, re-fill the content and then highlight
		var targets = el.querySelectorAll('code');
		var target;
		var i;
		for (i = 0; i < targets.length; i += 1) {
			target = targets[i];
			if (typeof binding.value === 'string') {
				target.textContent = binding.value;
				hljs.highlightBlock(el);
			}
		}
	}
});
