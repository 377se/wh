<template>
	<div ref="infoContent" class="info-window">
		<button type="button" class="uk-button uk-button-link sc-iw-close" @click="close()">
			<i class="mdi mdi-close"></i>
		</button>
		<div class="sc-iw-title">
			{{ marker.title }}
		</div>
		<div v-if="marker.info" class="sc-iw-body">
			{{ marker.info }}
		</div>
		<div v-else class="sc-iw-body">
			{{ marker.address }}
		</div>
		<div v-if="marker.link" class="sc-iw-footer">
			<a :href="marker.link.url" class="sc-link-external" target="_blank">
				<span>{{ marker.link.text }}</span>
			</a>
		</div>
	</div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'

export default {
	props: {
		markerObj: {
			type: Object,
			default: () => {}
		},
		marker: {
			type: Object,
			default: () => {}
		},
		isOpen: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		infoWindow: null
	}),
	watch: {
		markerObj () {
			this.infoWindow.destroy();
			this.createInfoWindow()
		}
	},
	mounted () {
		this.$gmapApiPromiseLazy().then(() => {
			this.createInfoWindow()
		}).catch((err) => {
			throw err
		})
	},
	beforeDestroy () {
		this.infoWindow.destroy()
	},
	methods: {
		createInfoWindow () {
			const SnazzyInfoWindow = require('snazzy-info-window');
			this.infoWindow = new SnazzyInfoWindow({
				marker: this.markerObj,
				content: this.$refs.infoContent,
				maxWidth: 320,
				closeWhenOthersOpen: true,
				border: false,
				closeButtonMarkup: '<span hidden></span>',
				callbacks: {
					beforeClose: () => {
						this.$emit('close')
					},
					open () {
						// $poiList.find('[data-poi-id="' + id + '"]').addClass('uk-active');
					},
					close () {
						// $poiList.find('[data-poi-id="' + id + '"]').removeClass('uk-active');
					}
				}
			});
			this.infoWindow.open()
		},
		close () {
			this.infoWindow.close();
		}
	}
}
</script>
<style lang="scss">
	@import "assets/scss/plugins/snazzy_infowindow.scss";
</style>
