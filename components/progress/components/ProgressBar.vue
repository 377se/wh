<template>
	<div class="sc-progress-bar" :style="barWidth" :class="[color]">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'ScProgressBar',
	props: {
		value: {
			type: [Number, Array],
			default: null
		},
		color: {
			type: String,
			default: 'md-bg-green-500'
		},
		indeterminate: Boolean,
		extraClass: {
			type: String,
			default: null
		}
	},
	data () {
		return {
			barWidth: this.value ? 'width:' + this.value + '%' : null
		}
	},
	watch: {
		'value' (newVal) {
			this.barWidth = 'width:' + newVal + '%'
		}
	}
}
</script>
