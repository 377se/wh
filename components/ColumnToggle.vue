<template>
	<div class="uk-flex uk-flex-center" :class="{ 'uk-flex-1': columnCollapsed }">
		<a v-show="!columnCollapsed"
			href="javascript:void(0)"
			class="sc-column-hide sc-actions-icon mdi"
			data-uk-tooltip
			:class="[hideIcon]"
			:title="hideTitle"
			@click.stop="columnToggle()"
		></a>
		<a v-show="columnCollapsed"
			href="javascript:void(0)"
			class="sc-column-show sc-actions-icon mdi"
			:class="[showIcon]"
			data-uk-tooltip
			:title="showTitle"
			@click.stop="columnToggle()"
		></a>
	</div>
</template>

<script>
export default {
	props: {
		hideTitle: {
			type: String,
			default: 'Hide List'
		},
		hideIcon: {
			type: String,
			default: 'mdi-arrow-collapse-horizontal'
		},
		showTitle: {
			type: String,
			default: 'Show List'
		},
		showIcon: {
			type: String,
			default: 'mdi-arrow-expand-horizontal'
		},
		collapsed: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		columnCollapsed: {
			get () {
				return this.collapsed
			},
			set (value) {
				this.$emit('columnCollapsing', value);
				setTimeout(() => {
					this.$emit(value ? 'columnHidden' : 'columnShown');
				}, 300);
				return value;
			}
		}
	},
	methods: {
		columnToggle () {
			this.columnCollapsed = !this.columnCollapsed;
		}
	}
}
</script>
