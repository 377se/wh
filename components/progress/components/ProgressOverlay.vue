<template>
	<div v-if="progressActive" class="sc-spinner-overlay" :class="[progressEnter]">
		<ScProgressCircular></ScProgressCircular>
	</div>
</template>

<script>
import { ScProgressCircular } from '~/components/progress'

export default {
	components: {
		ScProgressCircular
	},
	props: {
		active: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		progressActive: false,
		progressEnter: false,
	}),
	watch: {
		'active' (newVal) {
			if(newVal) {
				this.showProgress()
			} else {
				this.hideProgress()
			}
		}
	},
	mounted () {
		if(this.active) {
			this.showProgress()
		}
	},
	beforeDestroy () {
		this.progressActive = false;
	},
	methods: {
		hideProgress () {
			this.progressEnter = null;
			setTimeout(() => {
				this.progressActive = false;
			}, 300);
		},
		showProgress () {
			this.progressActive = true;
			setTimeout(() => {
				this.progressEnter = 'enter'
			}, 50)
		}
	}
}
</script>
