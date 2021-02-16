<template>
	<aside id="sc-sidebar-main" class="sc-sidebar-info-fixed">
		<div id="sc-sidebar-main-offcanvas-bar" v-touch:swipe.left="closeSidebar" class="uk-offcanvas-bar">
			<div class="sc-sidebar-main-scrollable" data-sc-scrollbar="visible-y">
				<ScMenuList :menu-data="menuEntries" :is-parent="true"></ScMenuList>
			</div>
			<div class="sc-sidebar-info">
				{{ $t('version') }}: {{ vxAppVersion }}
			</div>
		</div>
	</aside>
</template>

<script>
import { mapState } from 'vuex'
import ScMenuList from './navigation/MenuList';
import { scMq } from '~/assets/js/utils'
import { menuEntries } from './navigation/sidebar_menu'

require('~/plugins/vue2-touch-events')

export default {
	name: 'ScSidebar',
	components: {
		ScMenuList
	},
	data: () => ({
		menuEntries
	}),
	computed: mapState([
		'vxSidebarMainExpanded',
		'vxAppVersion'
	]),
	watch: {
		'vxSidebarMainExpanded' (state) {
			if(scMq.mediumMax() || this.$store.getters['sidebarOffcanvasState']) {
				if (state) {
					UIkit.offcanvas('#sc-sidebar-main').show();
					if(this.$store.getters.offcanvasState) {
						this.$store.commit('offcanvasToggle', false);
					}
				} else {
					UIkit.offcanvas('#sc-sidebar-main').hide();
				}
			}
		},
		$route () {
			this.$nextTick(() => {
				if(scMq.mediumMax()) {
					this.$store.commit('sidebarMainToggle', false);
				}
			})
		}
	},
	mounted () {
		const self = this;
		this.$nextTick(() => {
			if(scMq.mediumMax() || this.$store.getters['sidebarOffcanvasState']) {
				// activate UIKit offcanvas
				UIkit.offcanvas(document.getElementById('sc-sidebar-main'), {
					overlay: true,
					container: '#nuxt-wrapper'
				});
				// update drop container
				UIkit.util.on('#sc-sidebar-main', 'hidden', function () {
					self.$store.commit('sidebarMainToggle', false);
				});
				self.$store.commit('sidebarMainToggle', false);
			}
		})
	},
	methods: {
		closeSidebar (direction, event) {
			if (event.type === 'touchend') {
				this.$store.commit('sidebarMainToggle', false);
			}
		}
	}
}
</script>

<style>
</style>
