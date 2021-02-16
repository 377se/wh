import Vue from 'vue'
import UIkit from 'uikit'

// accordion
UIkit.mixin({data: {transition: 'ease-out', duration: 140}}, 'accordion');

var dropData = {
	duration: 240,
	animation: ['uk-animation-scale-up'],
	pos: 'bottom-right'
};
// dropdown
UIkit.mixin({data: dropData}, 'drop');
// drop
UIkit.mixin({data: dropData}, 'dropdown');

// notifications
UIkit.mixin({data: {pos: 'top-right'}}, 'notification');

// scroll
UIkit.mixin({data: {duration: 560}}, 'scroll');

// tab
UIkit.mixin({data: {swiping: false}}, 'tab');

// tooltip
UIkit.mixin({data: {duration: 140}}, 'notification');

import Icons from 'uikit/dist/js/uikit-icons'

UIkit.use(Icons);
UIkit.container = '#__nuxt';

Vue.mixin({
	mounted: function () {
		console.log(document.querySelectorAll('[data-uk-dropdown]'));
	}
});

export default (ctx, inject) => {
	ctx.$uikit = UIkit;
	inject('UIkit', UIkit)
}
