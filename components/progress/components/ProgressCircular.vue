<template>
	<div class="sc-progress-circular" :class="[color, extraClass, progressSize, progressColor]"></div>
</template>

<script>
export default {
	name: 'ScProgressCircular',
	props: {
		extraClass: {
			type: String,
			default: null
		},
		size: {
			type: String,
			default: null
		},
		color: {
			type: String,
			default: null
		},
		light: Boolean
	},
	computed: {
		progressSize () {
			let size = null;
			switch (this.size) {
			case 'sm':
				size = 'sc-progress-circular-small';
				break;
			case 'lg':
				size = 'sc-progress-circular-large';
				break;
			default:
				size = null
			}
			return size;
		},
		progressColor () {
			return this.light ? 'sc-progress-circular-light' : this.color === 'secondary' ? 'sc-progress-circular-secondary' : ''
		}
	}
}
</script>

<style lang="scss">
	@import "~scss/components/progress";
</style>
