<template>
	<div
		ref="colorpicker"
		v-closable="{ handler: 'closeColorpicker' }"
		:class="[
			'sc-colorpicker',
			cpInline,
			isActive(cpActive),
			{'sc-colorpicker-right': isRight}
		]"
		class="uk-flex"
	>
		<div v-if="!inline" class="sc-colorpicker-picker" :style="{'background-color': selectedColor}" @click="isActive(cpActive = !cpActive)"></div>
		<div v-if="!inline" ref="dropdown" class="sc-colorpicker-dropdown" :style="{ width: cpWidth }">
			<span
				v-for="color in pallete"
				:key="color"
				:style="{'background-color': color}"
				:class="{'sc-color-active': selectedColor === color}"
				@click="selectColor(color)"
			></span>
		</div>
		<div v-if="inline" class="sc-colorpicker-colors">
			<span
				v-for="color in pallete"
				:key="color"
				:style="{'background-color': color}"
				:class="{'sc-color-active': selectedColor === color}"
				@click="selectColor(color)"
			></span>
		</div>
		<input type="hidden" :value="selectedColor">
	</div>
</template>

<script>
import { width } from "~/assets/js/utils/dom";

export default {
	name: 'ScColorpicker',
	props: {
		pallete: {
			type: Array,
			default () {
				return [
					'#e53935', '#d81b60', '#8e24aa', '#5e35b1', '#3949ab', '#1e88e5', '#039be5', '#0097a7', '#00897b', '#43a047', '#689f38', '#ef6c00', '#f4511e', '#6d4c41', '#757575', '#546e7a'
				]
			}
		},
		value: {
			type: String,
			default: ''
		},
		inline: {
			type: Boolean,
			default: false
		},
		closeOnSelect: {
			type: Boolean,
			default: true
		}
	},
	data: () => ({
		selectedColor: '',
		cpActive: false,
		isRight: false
	}),
	computed: {
		cpInline () {
			return this.inline ? 'sc-colorpicker-inline' : ''
		},
		cpWidth () {
			if(!this.inline) {
				if (this.pallete.length > 8) {
					return ((this.pallete.length * 28) / 2) + 'px'
				}
				return (this.pallete.length * 28) + 'px'
			}
			return '';
		}
	},
	mounted () {
		this.$nextTick(() => {
			this.selectedColor = this.value;

			// adjust dropdown position
			var dropdown = this.$refs.dropdown
			if(dropdown) {
				var cpLeftOffset = this.$refs.colorpicker.getBoundingClientRect().left
				if(cpLeftOffset + 224 > width(window)) {
					this.isRight = true
				}
			}

		})
	},
	methods: {
		isActive (state) {
			return state ? 'sc-colorpicker-active' : ''
		},
		closeColorpicker (e) {
			this.cpActive = false
		},
		selectColor (color) {
			this.selectedColor = color;
			this.cpActive = !this.closeOnSelect;
			this.$emit('input', color)
		}
	}
}
</script>

<style scoped lang="scss">
	@import "~scss/common/_variables_mixins.scss";
	@import "~scss/components/_colorpicker.scss";
</style>
