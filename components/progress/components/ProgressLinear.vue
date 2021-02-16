<template>
	<div class="sc-progress" :class="[extraClass, labelMargin, barSize, stateClass, groupClass]">
		<slot name="label"></slot>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'ScProgress',
	props: {
		value: {
			type: Number,
			default: null
		},
		color: {
			type: String,
			default: 'md-bg-green-500'
		},
		size: {
			type: String,
			default: null
		},
		label: {
			type: String,
			default: null
		},
		indeterminate: Boolean,
		extraClass: {
			type: String,
			default: null
		},
		group: Boolean
	},
	data () {
		return {
			barWidth: this.value + '%'
		}
	},
	computed: {
		stateClass () {
			return this.indeterminate ? 'sc-progress-indeterminate' : null
		},
		groupClass () {
			return this.group ? 'sc-progress-group' : null
		},
		barSize () {
			let size = null;
			switch (this.size) {
			case 'md':
				size = 'sc-progress-medium';
				break;
			case 'lg':
				size = 'sc-progress-large';
				break;
			default:
				size = ''
			}
			return size;
		},
		labelMargin () {
			return this.hasLabelSlot ? 'sc-progress-label-enabled' : null
		},
		hasLabelSlot () {
			return !!this.$slots['label']
		}
	},
	watch: {
		'value' (newVal) {
			this.barWidth = newVal + '%'
		}
	}
}
</script>
<style lang="scss">
	@import "~scss/common/md_colors";
	@import "~scss/common/variables_mixins";
	@import "~scss/components/progress";
</style>
