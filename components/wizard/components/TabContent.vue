<template>
	<transition :enter-active-class="enterAnimation" :leave-active-class="leaveAnimation">
		<div v-show="active"
			:id="tabId"
			role="tabpanel"
			:aria-hidden="!active"
			:aria-labelledby="`step-${tabId}`"
		>
			<slot :active="active"></slot>
		</div>
	</transition>
</template>

<script>
export default{
	name: 'TabContent',
	inject: ['addTab', 'removeTab'],
	props: {
		title: {
			type: String,
			default: ''
		},
		subTitle: {
			type: String,
			default: ''
		},
		icon: {
			type: String,
			default: ''
		},
		transition: {
			type: String,
			default: ''
		},
		/***
        * Function to execute before tab switch. Return value must be boolean
        * If the return result is false, tab switch is restricted
        */
		beforeChange: {
			type: Function,
			default: null
		},
		/***
        * Function to execute after tab switch. Return void for now.
        * Safe to assume necessary validation has already occured
        */
		afterChange: {
			type: Function,
			default: null
		},
		route: {
			type: [String, Object],
			default: null
		},
		additionalInfo: {
			type: Object,
			default: () => {}
		}
	},
	data: () => ({
		active: false,
		validationError: null,
		checked: false,
		tabId: ''
	}),
	computed: {
		enterAnimation () {
			if (this.$parent.activeTabIndex <= this.$parent.beforeChangeTabIndex) {
				return "uk-animation-slide-left";
			} else {
				return "uk-animation-slide-right";
			}
		},
		leaveAnimation () {
			if (this.$parent.activeTabIndex > this.$parent.beforeChangeTabIndex) {
				return "uk-animation-slide-left uk-animation-reverse";
			} else {
				return "uk-animation-slide-right uk-animation-reverse";
			}
		}
	},
	mounted () {
		this.addTab(this)
	},
	destroyed () {
		if (this.$el && this.$el.parentNode) {
			this.$el.parentNode.removeChild(this.$el)
		}
		this.removeTab(this)
	}
}
</script>
