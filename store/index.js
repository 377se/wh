import { version } from '~~/package.json';

export const state = () => ({
	vxAppVersion: version,
	vxSidebarMainExpanded: false,
	vxSidebarMainAccordionMode: true,
	vxSidebarMainScrollToActive: false,
	vxSidebarMiniActive: false,
	vxCardFixed: false,
	vxHeaderExpanded: false,
	vxPageFixed: false,
	vxAppTheme: 'theme-default',
	vxOffcanvasPresent: false,
	vxOffcanvasExpanded: false,
	vxCodeMirrorFullscreen: false,
	vxProgressOverlay: false,
	vxPageScrollbars: true,
	vxFooterActive: false,
	vxTopMenuActive: false,
	vxFullWidthActive: false,
	vxActiveLocale: 'en',
	vxPageOverlay: false,
	isLoggedIn: false,
	alerts: [
		{
			id: 0,
			name: 'customer',
			visible: false
		},
		{
			id: 1,
			name: 'coins',
		  	visible: false
		},
		{
			id: 2,
			name: 'no address',
		  	visible: false
		},
		{
			id: 3,
			name: 'search article-details',
		  	visible: false
		},
		{
			id: 4,
			name: 'no shop is selected',
		  	visible: false
		},
		{
			id: 5,
			name: 'Ingen email',
		  	visible: false
		},
	],
	articleAssortment: []
});

export const mutations = {
	updateArticleAssortment(state, val){
			const elementsIndex = state.articleAssortment.findIndex(element => element.StockId == val.StockId )
			state.articleAssortment[elementsIndex] = val
		},
	setArticleAssortment(state, val){
		state.articleAssortment = val
	  },
	setIsLoggedIn(state, val){
		state.isLoggedIn = val
	  },
	setAlertHidden(state, id) {
		state.alerts[id].visible = false
	  },
	setAlertVisible(state, id) {
		state.alerts[id].visible = true
	  },
	sidebarMainToggle (state, expanded) {
		state.vxSidebarMainExpanded = expanded
	},
	sidebarMainAccordionModeToggle (state) {
		state.vxSidebarMainAccordionMode = !state.vxSidebarMainAccordionMode
	},
	sidebarMainScrollToActiveToggle (state) {
		state.vxSidebarMainScrollToActive = !state.vxSidebarMainScrollToActive
	},
	setSidebarMiniActive (state, active) {
		state.vxSidebarMiniActive = active;
	},
	setCardFixed (state, fixed) {
		state.vxCardFixed = fixed;
	},
	setHeaderExpanded (state, expanded) {
		state.vxHeaderExpanded = expanded;
	},
	setPageFixed (state, fixed) {
		state.vxPageFixed = fixed
	},
	setAppTheme (state, theme) {
		console.log(theme);
		state.vxAppTheme = theme
	},
	setOffcanvasPresent (state, present) {
		state.vxOffcanvasPresent = present
	},
	offcanvasToggle (state, active) {
		state.vxOffcanvasExpanded = active
	},
	cmFullscreenToggle (state, fullscreen) {
		state.vxCodeMirrorFullscreen = fullscreen
	},
	toggleProgressOverlay (state, active) {
		state.vxProgressOverlay = active
	},
	togglePageScrollbars (state, active) {
		if (active) {
			this.pageScrollbarEnable();
		} else {
			this.pageScrollbarDisable();
		}
	},
	setFooterActive (state, active) {
		state.vxFooterActive = active
	},
	setTopMenuActive (state, active) {
		state.vxTopMenuActive = active
	},
	setFullwidthActive (state, active) {
		state.vxFullWidthActive = active
	},
	updateLocale (state, code) {
		state.vxActiveLocale = code
	},
	togglePageOverlay (state, overlay) {
		state.vxPageOverlay = overlay
	}
};

export const getters = {
	pageFixedState: state => state.vxPageFixed,
	cardFixedState: state => state.vxCardFixed,
	headerExpandedState: state => state.vxHeaderExpanded,
	sidebarMainState: state => state.vxSidebarMainExpanded,
	offcanvasState: state => state.vxOffcanvasExpanded,
	isLoggedInState: state => state.isLoggedIn,
	alertsState: state => state.alerts,
	articleAssortmentState: state => state.articleAssortment,
};

export const actions = {
  async nuxtServerInit({ getters, commit, dispatch }, context) {
		if(context.app.$cookies.get('wh-377') && context.app.$cookies.get('wh-377')!=undefined){
			commit('setIsLoggedIn', true)
		}
	}
}
