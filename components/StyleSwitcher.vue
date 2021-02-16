<template>
	<div id="sc-style-switcher" :class="{'active' : sSwitchActive }">
		<a id="sc-style-switcher-toggle" href="javascript:void(0)" class="sc-sSw-toggle" @click.stop="sSwitchActive = !sSwitchActive">
			<i class="mdi mdi-tune"></i>
		</a>
		<p class="sc-text-semibold uk-margin-top-remove uk-margin-bottom">
			Themes
		</p>
		<ul class="sc-sSw-theme-switcher">
			<li v-for="theme in themes" :key="theme" :class="{'active': vxAppTheme === theme}">
				<a href="javascript:void(0)" class="sc-sSw-theme-switch" :class="['sc-sW-'+ theme ]" @click.stop="changeTheme(theme)">
					<span class="sc-sSw-theme-switch-color-1"></span>
					<span class="sc-sSw-theme-switch-color-2"></span>
				</a>
			</li>
		</ul>
		<p class="sc-text-semibold uk-margin-large-top uk-margin-bottom">
			Main Menu
		</p>
		<div class="uk-flex uk-flex-middle uk-margin-small-bottom">
			<PrettyCheck v-model="scrollToActive" class="p-icon" @change="scrollToActiveToggle">
				<i slot="extra" class="icon mdi mdi-check"></i>
				Scroll to active
			</PrettyCheck>
		</div>
		<div class="uk-flex uk-flex-middle">
			<PrettyCheck v-model="accordionMode" class="p-icon" @change="accordionModeToggle">
				<i slot="extra" class="icon mdi mdi-check"></i>
				Accordion mode
			</PrettyCheck>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import PrettyCheck from 'pretty-checkbox-vue/check';

export default {
	name: 'ScStyleSwitcher',
	components: {
		PrettyCheck
	},
	data: () => ({
		sSwitchActive: false,
		themes: [
			'theme-default',
			'theme-a',
			'theme-b',
			'theme-c',
			'theme-d',
			'theme-e',
			'theme-f',
			'theme-g',
			'theme-h',
			'theme-dark'
		],
		scrollToActive: false,
		accordionMode: false
	}),
	computed: {
		...mapState([
			'vxAppTheme',
			'vxSidebarMainAccordionMode',
			'vxSidebarMainScrollToActive'
		])
	},
	watch: {
		'vxSidebarMainScrollToActive' (state) {
			this.scrollToActive = state;
		},
		'vxSidebarMainAccordionMode' (state) {
			this.accordionMode = state;
		},
		$route () {
			if(this.sSwitchActive) {
				this.sSwitchActive = false
			}
		}
	},
	mounted () {
		this.$nextTick( () => {
			this.accordionMode = this.vxSidebarMainAccordionMode;
			this.scrollToActive = this.vxSidebarMainScrollToActive;
		})
	},
	methods: {
		changeTheme (theme) {
			this.$store.commit('setAppTheme', theme);
		},
		scrollToActiveToggle (state) {
			this.$store.commit('sidebarMainScrollToActiveToggle', state);
		},
		accordionModeToggle (state) {
			this.$store.commit('sidebarMainAccordionModeToggle', state);
		}
	}
}
</script>
<style lang="scss">
	@import '~pretty-checkbox/src/pretty-checkbox.scss';
	@import "~scss/plugins/style_switcher";
</style>
