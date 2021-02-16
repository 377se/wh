import Vue from 'vue'
var ClipboardJS = require('node-waves');

Vue.directive('clipboard', {
	inserted: function (el, bind) {
		var clipboard = new ClipboardJS(el);
	}
});
