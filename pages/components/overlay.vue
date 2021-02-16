<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<content-overlay :active="contentOverlayActive" :animate="true" :progress="progressActive">
				<ScCard>
					<ScCardTitle>
						Overlay
					</ScCardTitle>
					<ScCardBody>
						<div class="uk-flex uk-height-medium">
							<button class="sc-button uk-margin-right" @click.prevent="showContentOverlay">
								Content overlay
							</button>
							<button class="sc-button uk-margin-right" @click.prevent="showContentOverlaySpinner">
								Content overlay + spinner
							</button>
							<button class="sc-button sc-js-page-overlay uk-margin-right" @click.prevent="showPageOverlay">
								Page overlay
							</button>
							<button class="sc-button" @click.prevent="showPageOverlaySpinner">
								Page overlay + spinner
							</button>
						</div>
					</ScCardBody>
				</ScCard>
			</content-overlay>
		</div>
	</div>
</template>

<script>
import contentOverlay from '~/components/Overlay'

export default {
	name: 'ComponentsOverlay',
	components: {
		contentOverlay
	},
	data: () => ({
		contentOverlayActive: false,
		progressActive: false
	}),
	methods: {
		showContentOverlay () {
			this.contentOverlayActive = true
			setTimeout(() => {
				this.contentOverlayActive = false
			}, 2000)
		},
		showContentOverlaySpinner () {
			this.contentOverlayActive = true
			this.progressActive = true
			setTimeout(() => {
				this.contentOverlayActive = false
				setTimeout(() => {
					this.progressActive = false
				}, 280)
			}, 2000)
		},
		showPageOverlay () {
			this.$store.commit('togglePageOverlay', true)
			setTimeout(() => {
				this.$store.commit('togglePageOverlay', false)
			}, 2000)
		},
		showPageOverlaySpinner () {
			this.$store.commit('togglePageOverlay', true)
			this.$store.commit('toggleProgressOverlay', true);
			setTimeout(() => {
				this.$store.commit('toggleProgressOverlay', false);
				setTimeout(() => {
					this.$store.commit('togglePageOverlay', false)
				})
			}, 2000)
		}
	}
}
</script>
