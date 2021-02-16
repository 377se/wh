<template>
	<div v-if="progressActive" class="sc-spinner-overlay fixed" :class="[progressEnter]">
		<ScProgressCircular></ScProgressCircular>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { ScProgressCircular } from '~/components/progress'

export default {
	components: {
		ScProgressCircular
	},
	data: () => ({
		progressActive: false,
		progressEnter: false,
	}),
	computed: {
		...mapState([
			'vxProgressOverlay'
		])
	},
	watch: {
		'vxProgressOverlay' (newVal) {
			if(newVal) {
				this.showProgress()
			} else {
				this.hideProgress()
			}
		},
		$route () {
			if (this.progressActive) {
				this.$store.commit('toggleProgressOverlay', false);
			}
		}
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
