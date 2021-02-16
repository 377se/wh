import Vue from 'vue';
if (process.browser) {
	const VueCodemirror = require('vue-codemirror');
	Vue.use(VueCodemirror)
}
