<template>
	<ul :class="{ 'uk-navbar-nav sc-top-menu': isRoot }">
		<li v-for="topMenuNode in menuData"
			:key="topMenuNode.id"
			:class="{
				'sc-has-submenu': topMenuNode.submenu,
				'sc-js-active': topMenuNode.isOpen
			}"
			@mouseover="showSubMenu(topMenuNode)"
			@mouseout="hideSubMenu(topMenuNode)"
		>
			<nuxt-link v-if="topMenuNode.url" :to="topMenuNode.url">
				{{ $t(topMenuNode.title) }}
			</nuxt-link>
			<a v-else href="javascript:void(0)">
				{{ $t(topMenuNode.title) }}
			</a>
			<transition name="menuFadeUp">
				<ul v-if="topMenuNode.submenu" v-show="topMenuNode.isOpen">
					<li v-for="subNode in topMenuNode.submenu"
						:key="subNode.id"
						:class="{
							'sc-has-submenu': subNode.submenu,
							'sc-js-active': subNode.isOpen
						}"
						@mouseover="showSubMenu(subNode)"
						@mouseout="hideSubMenu(subNode)"
					>
						<nuxt-link v-if="subNode.url" :to="subNode.url">
							{{ $t(subNode.title) }}
						</nuxt-link>
						<a v-else href="javascript:void(0)">
							{{ $t(subNode.title) }}
						</a>
						<transition name="menuFadeUp">
							<ScTopMenu v-if="subNode.submenu" v-show="subNode.isOpen" :menu-data="subNode.submenu" :is-root="false" />
						</transition>
					</li>
				</ul>
			</transition>
		</li>
	</ul>
</template>

<script>

export default {
	name: 'ScTopMenu',
	props: {
		menuData: {
			type: Array,
			default: null
		},
		isRoot: {
			type: Boolean,
			default: true
		}
	},
	data: () => ({
	    node: null
	}),
	methods: {
		showSubMenu (node) {
			node.isOpen = true;
		},
		hideSubMenu (node) {
			node.isOpen = false;
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/components/top_menu';
	.menuFadeUp-enter-active,
	.menuFadeUp-leave-active {
	    transition: all 220ms $easing;
	}
	.menuFadeUp-enter,
	.menuFadeUp-leave-to {
	    opacity: 0;
	    transform: translateY(10%);
	}
</style>
