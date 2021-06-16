<template>
	<header id="sc-header" ref="header">
		<nav class="uk-navbar uk-navbar-container" data-uk-navbar="mode: click; duration: 360">
			<div class="uk-navbar-left nav-overlay-small uk-margin-right uk-navbar-aside">
				<a v-if="!vxTopMenuActive && !vxSidebarMiniActive" id="sc-sidebar-main-toggle" href="javascript:void(0)" @click.stop="toggleMainSidebar">
					<i v-if="sidebarMainExpanded" class="mdi mdi-backburger" />
					<i v-else class="mdi mdi-menu" />
				</a>
				<div class="sc-brand uk-visible@m">
					<nuxt-link to="/"><img v-rjs="require('~/assets/img/logo@2x.png')" :src="logo" alt=""></nuxt-link>
				</div>
			</div>
				<div class="uk-flex uk-flex-middle uk-light">Välkommen {{ userDetails.Firstname }}!</div>
			<!-- <div v-if="!vxTopMenuActive" class="uk-navbar-left nav-overlay uk-margin-right uk-visible@m">
				<ul class="uk-navbar-nav">
					<li>
						<a href="javascript:void(0)" class="md-color-white sc-padding-remove-left"><i class="mdi mdi-view-grid"></i></a>
						<div class="uk-navbar-dropdown sc-padding-medium">
							<div class="uk-child-width-1-2 uk-child-width-1-3@s uk-grid uk-grid-small" data-uk-grid>
								<div>
									<nuxt-link to="/pages/mailbox" class="uk-flex uk-flex-column uk-flex-middle uk-box-shadow-hover-small sc-round sc-padding-small">
										<i class="mdi mdi-email-outline sc-icon-32 sc-text-lh-1 md-color-green-700"></i>
										<span class="uk-text-medium sc-color-primary">Mailbox</span>
									</nuxt-link>
								</div>
								<div>
									<nuxt-link to="/pages/poi_listing" class="uk-flex uk-flex-column uk-flex-middle uk-box-shadow-hover-small sc-round sc-padding-small">
										<i class="mdi mdi-map-marker sc-icon-32 sc-text-lh-1 md-color-red-700"></i>
										<span class="uk-text-medium sc-color-primary">POI</span>
									</nuxt-link>
								</div>
								<div>
									<nuxt-link to="/pages/chat" class="uk-flex uk-flex-column uk-flex-middle uk-box-shadow-hover-small sc-round sc-padding-small">
										<i class="mdi mdi-message-outline sc-icon-32 sc-text-lh-1 md-color-purple-700"></i>
										<span class="uk-text-medium sc-color-primary">Chat</span>
									</nuxt-link>
								</div>
								<div>
									<nuxt-link to="/plugins/calendar" class="uk-flex uk-flex-column uk-flex-middle uk-box-shadow-hover-small sc-round sc-padding-small">
										<i class="mdi mdi-calendar sc-icon-32 sc-text-lh-1 md-color-light-blue-700"></i>
										<span class="uk-text-medium sc-color-primary">Calendar</span>
									</nuxt-link>
								</div>
								<div>
									<nuxt-link to="/pages/user_profile" class="uk-flex uk-flex-column uk-flex-middle uk-box-shadow-hover-small sc-round sc-padding-small">
										<i class="mdi mdi-account sc-icon-32 sc-text-lh-1 md-color-blue-grey-700"></i>
										<span class="uk-text-medium sc-color-primary">Profile</span>
									</nuxt-link>
								</div>
								<div>
									<nuxt-link to="/plugins/charts" class="uk-flex uk-flex-column uk-flex-middle uk-box-shadow-hover-small sc-round sc-padding-small">
										<i class="mdi mdi-chart-multiline sc-icon-32 sc-text-lh-1 md-color-amber-700"></i>
										<span class="uk-text-medium sc-color-primary">Charts</span>
									</nuxt-link>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div> -->
			<div v-if="vxTopMenuActive" id="sc-top-menu" class="uk-navbar-left nav-overlay nav-overlay-small">
				<ScTopMenu :menu-data="topMenuData" />
			</div>
			<div class="nav-overlay nav-overlay-small uk-navbar-right uk-flex-1" hidden>
				<a class="uk-navbar-toggle uk-visible@l" data-uk-toggle="target: .nav-overlay; animation: uk-animation-slide-top" href="javascript:void(0)">
					<i class="mdi mdi-close sc-icon-24"></i>
				</a>
				<a class="uk-navbar-toggle uk-hidden@l uk-padding-remove-left" data-uk-toggle="target: .nav-overlay-small; animation: uk-animation-slide-top" href="javascript:void(0)">
					<i class="mdi mdi-close sc-icon-24"></i>
				</a>
				<div class="uk-navbar-item uk-width-expand uk-padding-remove-right">
					<form class="uk-search uk-search-navbar uk-width-1-1 uk-flex">
						<input class="uk-search-input" type="search" placeholder="Search..." autofocus>
						<button class="sc-button sc-button-small sc-button-icon sc-button-flat uk-margin-small-left" type="button">
							<i class="mdi mdi-magnify sc-icon-24 md-color-white"></i>
						</button>
					</form>
				</div>
			</div>
			<div class="nav-overlay nav-overlay-small uk-navbar-right">
				<ul class="uk-navbar-nav">
					<!-- <li>
						<a class="uk-navbar-toggle uk-visible@l" href="javascript:void(0)" data-uk-toggle="target: .nav-overlay; animation: uk-animation-slide-top">
							<i class="mdi mdi-magnify" />
						</a>
						<a id="sc-search-main-toggle-mobile" class="uk-navbar-toggle uk-hidden@l" href="javascript:void(0)" data-uk-toggle="target: .nav-overlay-small; animation: uk-animation-slide-top">
							<i class="mdi mdi-magnify" />
						</a>
					</li> -->
					<!-- <li class="uk-visible@l">
						<ScFullscreen id="sc-js-fullscreen-toggle" />
					</li> -->
					<!-- <li class="uk-visible@l">
						<a href="javascript:void(0)" class="sc-text-semibold sc-width-micro">
							{{ vxActiveLocale }}
						</a>
						<div id="sc-js-lang-switcher" class="uk-navbar-dropdown uk-dropdown-small" data-uk-toggle>
							<ul class="uk-nav uk-navbar-dropdown-nav">
								<li v-for="locale in availableLangs" :key="locale.code">
									<a
										href="javascript:void(0)"
										:class="{
											'sc-text-semibold': isActiveLang(locale.code)
										}"
										@click="updateLocale($event, locale.code)"
									>
										{{ locale.name }}
									</a>
								</li>
							</ul>
						</div>
					</li> -->
					<!-- <li>
						<a href="javascript:void(0)">
							<span class="mdi mdi-email"></span>
						</a>
						<div class="uk-navbar-dropdown sc-padding-remove">
							<div class="uk-panel uk-panel-scrollable uk-height-medium">
								<ul class="uk-list uk-list-divider">
									<li v-for="message in user.messages" :key="message.id" class="sc-list-group">
										<div class="sc-list-addon">
											<img v-if="message.avatar.image" :src="message.avatar.image" class="sc-avatar" alt="">
											<span v-if="!message.avatar.image" :title="message.from" :class="message.avatar.color" class="sc-avatar-initials">
												{{ message.from | initials }}
											</span>
										</div>
										<a href="javascript:void(0)" class="sc-list-body">
											<span class="uk-text-small uk-text-muted uk-width-expand">
												{{ message.date }}
											</span>
											<span class="uk-display-block uk-text-truncate">
												{{ message.content }}
											</span>
										</a>
									</li>
								</ul>
							</div>
							<nuxt-link to="/pages/mailbox" class="uk-flex uk-text-small sc-padding-small-ends sc-padding">
								Show all in mailbox
							</nuxt-link>
						</div>
					</li> -->
					<!-- <li class="uk-visible@l">
						<a href="javascript:void(0)">
							<span class="mdi mdi-bell uk-display-inline-block">
								<span v-show="!alertsEmpty" class="sc-indicator md-bg-color-red-600"></span>
							</span>
						</a>
						<div class="uk-navbar-dropdown md-bg-grey-100">
							<div class="sc-padding sc-padding-small-ends">
								<ul id="sc-header-alerts" class="uk-list uk-margin-remove">
									<li v-for="(alert, index) in user.alerts" :key="alert.id" :style="{'--index': index}" class="uk-margin-small-top sc-border sc-round md-bg-white">
										<div class="uk-flex uk-flex-middle">
											<div class="uk-margin-right uk-margin-small-left">
												<i class="mdi" :class="[alert.icon, alert.color]"></i>
											</div>
											<div class="uk-flex-1 uk-text-small">
												{{ alert.text }}
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</li> -->
					<!-- <li v-if="this.$store.getters['isLoggedInState'] == true"> -->
					<li>
						<a href="javascript:void(0)">
							<img v-if="isLoggedIn" :src="this.$store.getters['userDetailsState'].ImageName" alt="User-avatar">
							<img v-else src="~/assets/img/logo-avatar.png" style="width: 35px;" alt="377 Logo">
						</a>
						<div class="uk-navbar-dropdown uk-dropdown-small">
							<ul class="uk-nav uk-nav-navbar">
								<li>
									<a :href="this.$store.getters['userDetailsState'].Url">
										Profil
									</a>
								</li>
								<li>
									<a href="javascript:void(0)" @click.prevent="logout()">
										Logout
									</a>
								</li>
							</ul>
						</div>
					</li>
				</ul>
				<a v-if="vxOffcanvasPresent" href="javascript:void(0)" class="md-color-white uk-margin-left uk-hidden@l" @click="toggleOffcanvas">
					<i v-show="!vxOffcanvasExpanded" class="mdi mdi-menu"></i><i v-show="vxOffcanvasExpanded" class="mdi mdi-arrow-right"></i>
				</a>
			</div>
		</nav>
	</header>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { scMq } from '~/assets/js/utils'
import ScFullscreen from '~/components/FullScreen.vue';
import ScTopMenu from '~/components/topmenu/TopMenu.vue';
import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

export default {
	name: 'ScHeader',
	components: {
		ScFullscreen,
		ScTopMenu
	},
	data: () => ({
		userDetails: [],
		user: {
			messages: [
				{
					"id": 1,
					"from": "Aaron Jensen",
					"avatar": {
						"image": require("~/assets/img/avatars/avatar_03_sm.png")
					},
					"date": "24-10-2019",
					"content": "Zelnavo dej foten tu bivgal wi lonuh cow wuvelo atilid taza wucacto uwa."
				},
				{
					"id": 2,
					"from": "Eugenia Thompson",
					"avatar": {
						"image": require("~/assets/img/avatars/avatar_04_sm.png")
					},
					"date": "23-10-2019",
					"content": "Zopessud rodga here okuofe atvof el belildo bakah deud upanuuf usu ufava."
				},
				{
					"id": 3,
					"from": "Roxie Ortega",
					"avatar": {
						"color": "md-bg-red-500 md-color-white"
					},
					"date": "24-10-2019",
					"content": "Hub bo zejwawad pocmep li lubov vofnomzug ali akohe hoarla orhak ludafu bic zarajik ufpoeha."
				},
				{
					"id": 4,
					"from": "Ethan Perry",
					"avatar": {
						"image": require("~/assets/img/avatars/avatar_07_sm.png")
					},
					"date": "22-10-2019",
					"content": "Rucakes na vutnis jos lukse nis figulu zuw tisbu poh ufucas acoaz rubetlih miraetu atoolule sov rives."
				},
				{
					"id": 5,
					"from": "Daisy Hopkins",
					"avatar": {
						"color": "md-bg-purple-500 md-color-white"
					},
					"date": "21-10-2019",
					"content": "Cabhilzi seajofi he bami joglaceg manob cune zilpu jore melmoffuj kilahwog mehsilmuc vorlislu."
				},
				{
					"id": 6,
					"from": "Leo Singleton",
					"avatar": {
						"image": require("~/assets/img/avatars/avatar_02_sm.png")
					},
					"date": "21-10-2019",
					"content": "Uh esegivad umu gegmused vejgafpe nurlo luzreh zedleg he wisus buvnukik ga heeh gudafki ta za."
				}
			],
			alerts: [
				{
					id: 1,
					text: 'Information Page Not Found!',
					icon: 'mdi-alert-outline',
					color: 'md-color-red-600'
				},
				{
					id: 2,
					text: 'A new password has been sent to your e-mail address.',
					icon: 'mdi-email-check-outline',
					color: 'md-color-blue-600'
				},
				{
					id: 3,
					text: 'You do not have permission to access the API!',
					icon: 'mdi-alert-outline',
					color: 'md-color-red-600'
				},
				{
					id: 4,
					text: 'Your enquiry has been successfully sent.',
					icon: 'mdi-check-all',
					color: 'md-color-light-green-600'
				}
			]
		},
		sidebarMainExpanded: true,
		offcanvasExpanded: false,
		offcanvasPresent: false,
		logo: require('~/assets/img/logo.png'),
		alertsEmpty: null,
		topMenuData: [
			{
				id: uniqueID(),
				title: "Mailbox",
				url: '/pages/mailbox'
			},
			{
				id: uniqueID(),
				title: "Components",
				url: null,
				isOpen: false,
				submenu: [
					{
						id: uniqueID(),
						title: "Accordion",
						url: '/components/accordion'
					},
					{
						id: uniqueID(),
						title: "Alert",
						url: '/components/alert'
					},
					{
						id: uniqueID(),
						title: "Avatars",
						url: '/components/avatars'
					},
					{
						id: uniqueID(),
						title: "Grid",
						url: '/components/grid'
					}
				]
			},
			{
				id: uniqueID(),
				title: "Pages",
				url: null,
				isOpen: false,
				submenu: [
					{
						id: uniqueID(),
						title: "Blank",
						url: '/pages/blank'
					},
					{
						id: uniqueID(),
						title: "Gallery",
						url: '/pages/gallery'
					},
					{
						id: uniqueID(),
						title: "Settings",
						url: '/pages/settings'
					}
				]
			},
			{
				id: uniqueID(),
				title: "Nested",
				url: null,
				isOpen: false,
				submenu: [
					{
						id: uniqueID(),
						title: "Level 1",
						url: null,
					},
					{
						id: uniqueID(),
						title: "Level 1",
						url: null,
						isOpen: false,
						submenu: [
							{
								id: uniqueID(),
								title: "Sub-level 1.1",
								url: null
							},
							{
								id: uniqueID(),
								title: "Sub-level 1.1",
								url: null
							},
							{
								id: uniqueID(),
								title: "Sub-level 1.1",
								url: null,
								isOpen: false,
								submenu: [
									{
										id: uniqueID(),
										title: "Sub-level 1.1.1",
										url: null
									},
									{
										id: uniqueID(),
										title: "Sub-level 1.1.1",
										url: null
									},
									{
										id: uniqueID(),
										title: "Sub-level 1.1.1",
										url: null
									},
									{
										id: uniqueID(),
										title: "Sub-level 1.1.1",
										url: null
									},
									{
										id: uniqueID(),
										title: "Sub-level 1.1.1",
										url: null
									}
								]
							},
							{
								id: uniqueID(),
								title: "Sub-level 1.1",
								url: null
							},
							{
								id: uniqueID(),
								title: "Sub-level 1.1",
								url: null
							}
						]
					},
					{
						id: uniqueID(),
						title: "Level 1",
						url: null,
					},
					{
						id: uniqueID(),
						title: "Level 1",
						url: null,
					}
				]
			}
		],
		availableLangs: [
			{
				code: 'en',
				name: 'English'
			},
			{
				code: 'fr',
				name: 'French'
			},
			{
				code: 'es',
				name: 'Spanish'
			}
		]
	}),
	computed: {
		...mapState([
			'vxSidebarMainExpanded',
			'vxOffcanvasPresent',
			'vxOffcanvasExpanded',
			'vxTopMenuActive',
			'vxActiveLocale',
			'vxSidebarMiniActive',
			'isLoggedIn'
		])
	},
	watch: {
		'vxSidebarMainExpanded' (state) {
			this.sidebarMainExpanded = state;
		},
		'vxOffcanvasExpanded' (state) {
			this.offcanvasExpanded = state;
		},
		'vxOffcanvasPresent' (state) {
			this.offcanvasPresent = state;
		},
		'isLoggedIn' (state){
			if(state){
				this.loadUserDetails(); //reload userdetails when logged in.
			}
		}
	},
	mounted () {
		this.loadUserDetails()
		const self = this;
		self.$nextTick(() => {
			if(scMq.mediumMin() || this.$store.getters['sidebarOffcanvasState']) {
				self.sidebarMainExpanded = this.vxSidebarMainExpanded;
			} else {
				self.sidebarMainExpanded = false;
			}
		});
		// sticky header
		var options = scMq.mediumMax() ? { showOnUp: true, animation: "uk-animation-slide-top" } : {};
		UIkit.sticky(this.$refs.header, options);
	},
	methods: {
		async loadUserDetails() {
			await this.$axios.$get('/webapi/admin/GetCurrentUser')
			.then(userDetails => {
				this.userDetails = userDetails
				this.$store.commit('setUserDetails', userDetails)
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
		toggleMainSidebar () {
			let state = !this.sidebarMainExpanded;
			this.$store.commit('sidebarMainToggle', state);
		},
		toggleOffcanvas () {
			let state = !this.offcanvasExpanded;
			this.$store.commit('offcanvasToggle', state);
		},
		updateLocale (event, code) {
			if (code === this.vxActiveLocale) {
				event.preventDefault();
			}
			this.$i18n.setLocale(code);
			this.$store.commit('updateLocale', code);
			this.isActiveLang(code)
		},
		isActiveLang (code) {
			return code === this.vxActiveLocale
		},
		async logout() {
			await this.$axios.$post('/webapi/Logout/PostLogout')
			this.$cookies.remove('wh-377')
			this.$store.commit('setIsLoggedIn', false)
          	// this.$router.push('/')
			location.reload('/')
		},
	}
}
</script>
