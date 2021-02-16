/*
* UIkit customizations
*
*/

// accordion
UIkit.mixin({data: {transition: 'ease-out', duration: 140}}, 'accordion');

var dropData = {
	duration: 240,
	animation: ['uk-animation-scale-up'],
	pos: 'bottom-right'
}

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
