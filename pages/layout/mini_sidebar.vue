<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			Mini Sidebar example
		</div>
	</div>
</template>

<script>
export default {
	name: 'LayoutMiniSidebar',
	mounted () {
		this.$store.commit('sidebarMainToggle', true);
		this.$store.commit('setSidebarMiniActive', true);
	},
	beforeDestroy () {
		this.$store.commit('setSidebarMiniActive', false);
	}
}
</script>
