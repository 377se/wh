<template>
	<div></div>
</template>

<script>
require('~/plugins/jquery');
if (process.client) {
	require('~/assets/js/vendor/jqvmap/jquery.vmap');
}

export default {
	props: {
		config: {
			type: Object,
			default: () => {}
		},
		loadMap: {
			type: Array,
			default: () => ['world']
		}
	},
	data: () => ({
		map: null
	}),
	mounted () {
		this.$nextTick(() => {
			this.loadMap.forEach(map => {
				require('~/assets/js/vendor/jqvmap/maps/jquery.vmap.'+ map +'.js');
			});
			const self = this;
			let _config = {
				onLoad (event, map) {
					self.map = map;
					self.$emit('loaded');
				}
			};
			const config = $.extend(_config, this.config);
			$(this.$el).vectorMap(config);
		})
	},
	methods: {
		highlight (region) {
			$(this.$el).vectorMap('highlight', region);
		},
		unhighlight (region) {
			$(this.$el).vectorMap('unhighlight', region);
		},
		resize () {
			$(this.$el).vectorMap('resizeMap');
		},
		deselect (region) {
			if(region) {
				$(this.$el).vectorMap('deselect', region);
			} else {
				$(this.$el).vectorMap('deselect');
			}
		},
		select (region) {
			$(this.$el).vectorMap('select', region);
		}
	}
}
</script>
