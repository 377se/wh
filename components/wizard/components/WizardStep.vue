<template>
	<li :class="{ 'current': tab.active, 'error': tab.validationError, 'disabled': !tab.active && !tab.checked, 'done': tab.checked && !tab.active }">
		<a :id="`step-${tab.tabId}`"
			href="javascript:void(0)"
			role="tab"
			:tabindex="tab.checked ? 0 : ''"
			:aria-controls="tab.tabId"
			:aria-disabled="tab.active"
			:aria-selected="tab.active"
		>
			<slot name="title">
				<i v-if="tab.icon !== ''" class="step-icon" :class="tab.icon"></i>
				<span>
					{{ tab.title }}
					<span class="sub-text">
						{{ tab.subTitle }}
					</span>
				</span>
			</slot>
		</a>
	</li>
</template>

<script>
export default {
	name: 'WizardStep',
	props: {
		tab: {
			type: Object,
			default: () => {

			}
		},
		transition: {
			type: String,
			default: ''
		},
		index: {
			type: Number,
			default: 0
		}
	}
}
</script>
<style>
</style>
