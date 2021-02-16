<template>
	<ul
		:class="{
			'sc-sidebar-menu uk-nav': isParent,
			'sc-sidebar-menu-sub': !isParent
		}"
	>
		<li
			v-for="item in menuItems"
			:key="item.id"
			:class="{
				'sc-has-submenu': item.submenu && item.submenu.length,
				'sc-page-active': $route.path === item.page || pageChild(item),
				'sc-section-active': item.isOpen,
				'sc-sidebar-menu-heading': item.section_title,
				'sc-sidebar-menu-separator': item.separator
			}"
		>
			<span v-if="item.section_title">
				{{ $t(item.section_title) }}
			</span>
			<nuxt-link v-if="item.page && !item.submenu" :to="item.page">
				<span v-if="item.tag" class="uk-label">
					{{ item.tag }}
				</span>
				<span v-if="item.icon" class="uk-nav-icon">
					<i :class="item.icon"></i>
				</span>
				<span class="uk-nav-title">
					{{ $t(item.title) }}
				</span>
			</nuxt-link>
			<a v-if="item.submenu" href="javascript:void(0)" @click.stop="toggleSection($event, item)">
				<span v-if="item.icon" class="uk-nav-icon">
					<i :class="item.icon"></i>
				</span>
				<span class="uk-nav-title">
					{{ $t(item.title) }}
				</span>
			</a>
			<a v-if="item.page === '' && !item.submenu" href="javascript:void(0)">
				<span v-if="item.icon" class="uk-nav-icon">
					<i :class="item.icon"></i>
				</span>
				<span class="uk-nav-title">
					{{ item.title }}
				</span>
			</a>
			<transition
				:css="false"
				@enter="tEnter"
				@enter-cancelled="tEnterCancelled"
				@leave="tLeave"
				@leave-cancelled="tLeaveCancelled"
			>
				<ScMenuList v-if="item.submenu && item.submenu.length" v-show="item.isOpen" :menu-data="item.submenu"></ScMenuList>
			</transition>
		</li>
	</ul>
</template>

<script>
import { mapState } from 'vuex'
import { scVars } from '~/assets/js/utils'
import _ from 'lodash';

require('~/plugins/velocity.client.js');

export default {
	name: 'ScMenuList',
	props: {
		menuData: {
			type: Array,
			default: null
		},
		isParent: Boolean
	},
	computed: {
		...mapState([
			'vxSidebarMainAccordionMode',
			'vxSidebarMainScrollToActive',
			'vxActiveLang'
		]),
		menuItems () {
			return this.menuData
		}
	},
	created () {
		this.menuItems.forEach(k => {
			if (typeof k.submenu !== 'undefined') {
				this.setSectionOpen(k)
			}
		});
	},
	methods: {
		pageChild (item) {
			return this.$nuxt.$route.matched.some(route => route.path === item.page)
		},
		toggleSection (e, item) {
			const state = this.$store.state;
			if (state.vxSidebarMainAccordionMode) {
				const items = _.filter(this.menuItems, {level: item.level});
				items.forEach(k => {
					if(k.title !== item.title) {
						k.isOpen = false;
					}
				});
			}
			item.isOpen = !item.isOpen;
		},
		setSectionOpen (item) {
			let subPages = this.getSubPages(item.submenu);
			if(subPages.length) {
				let isActive = subPages.some(path => {
					return this.$route.path.indexOf(path) === 0
				});
				if(isActive) {
					item.isOpen = true;
				}
			}
		},
		getSubPages (items) {
			let pages = [];
			items.forEach(k => {
				if (k.page !== 'undefinded' && k.page !== '') {
					pages.push(k.page)
				}
				if (typeof k.submenu !== 'undefined') {
					this.getSubPages(k.submenu);
				}
			});
			return pages;
		},
		tEnter (el, done) {
			const state = this.$store.state;
			velocity(el, 'slideDown', {
				duration: 280,
				easing: scVars.easingSwiftOut,
				complete () {
					if (state.vxSidebarMainScrollToActive) {
						velocity(el.closest('.sc-section-active'), "scroll", {
							duration: 360,
							easing: scVars.easingSwiftOut,
							container: document.getElementsByClassName('sc-sidebar-main-scrollable'),
							offset: 1
						});
					}
					done();
				}
			});
		},
		tEnterCancelled (el) {
			velocity(el, 'stop')
		},
		tLeave (el, done) {
			velocity(el, 'slideUp', {
				duration: 200,
				easing: scVars.easingSwiftOut,
				complete: done
			})
		},
		tLeaveCancelled (el) {
			velocity(el, 'stop')
		}
	}
}
</script>
