<template>
	<div class="uk-position-relative">
		<slot></slot>
		<template v-if="animate">
			<transition name="fade">
				<div v-if="activeAnimated" class="sc-overlay" :class="{'dimmed': dimmed}"></div>
			</transition>
		</template>
		<template v-else>
			<div v-if="active" class="sc-overlay dimmed"></div>
		</template>
		<template v-if="progress">
			<ScProgressOverlay :active="active"></ScProgressOverlay>
		</template>
	</div>
</template>

<script>
import { ScProgressOverlay } from '~/components/progress'

export default {
	components: {
		ScProgressOverlay
	},
	props: {
		active: Boolean,
		animate: Boolean,
		progress: Boolean
	},
	data: () => ({
		activeAnimated: false,
		dimmed: false,
		overlayProgress: false,
		progressActive: false
	}),
	watch: {
		active (newVal) {
			if(this.animate) {
				if(newVal) {
					this.activeAnimated = true
					setTimeout(() => {
						this.dimmed = true
					}, 10)
				} else {
					this.dimmed = false
					setTimeout(() => {
						this.activeAnimated = false
					}, 280)
				}
			}
		}
	}
}
</script>
