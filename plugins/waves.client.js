import Vue from 'vue'
const Waves = require('node-waves');

Vue.directive('waves', {
	inserted: function (el, bind) {
		var classes = Object.keys(bind.modifiers).map(function (val) {
			return 'waves-' + val;
		});
		Waves.attach(el, classes)
	}
});

Vue.mixin({
	created: function () {
		Waves.init({
			name: 'waves',
			duration: 500,
			delay: 200
		});
	}
});
