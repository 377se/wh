<template>
	<div v-if="vxOffcanvasPresent" id="sc-offcanvas" data-uk-offcanvas="flip: true; container: '#nuxt-wrapper'">
		<div class="uk-offcanvas-bar" :class="extraClass">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { scMq } from '~/assets/js/utils'

export default {
	name: 'ScOffcanvas',
	props: {
		extraClass: {
			type: String,
			default: ''
		}
	},
	computed: {
		...mapState([
			'vxOffcanvasPresent',
			'vxOffcanvasExpanded'
		])
	},
	watch: {
		'vxOffcanvasExpanded' (state) {
			if(scMq.mediumMax()) {
				if (state) {
					UIkit.offcanvas('#sc-offcanvas').show();
					if(this.$store.getters.sidebarMainState) {
						this.$store.commit('sidebarMainToggle', false);
					}
				} else {
					UIkit.offcanvas('#sc-offcanvas').hide();
				}
			}
		},
		$route () {
			if(this.$store.getters.offcanvasState) {
				this.$store.commit('offcanvasToggle', false);
			}
		}
	},
	mounted () {
		const self = this;
		if(scMq.mediumMax()) {
			self.$nextTick(() => {
				self.$store.commit('setOffcanvasPresent', true);
			});
		}
	},
	beforeDestroy () {
		this.$store.commit('offcanvasToggle', false);
		this.$store.commit('setOffcanvasPresent', false);
	},
	methods: {
		hide () {
			this.$store.commit('offcanvasToggle', false);
		}
	}
}
</script>
