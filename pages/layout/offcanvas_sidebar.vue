<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			Sidebar Offcanvas example
		</div>
	</div>
</template>

<script>
export default {
	name: 'LayoutMiniSidebar',
	mounted () {
		this.$store.commit('setSidebarOffcanvasActive', true);
		this.$store.commit('sidebarMainToggle', false);
	},
	beforeDestroy () {
		UIkit.offcanvas('#sc-sidebar-main').hide().then(function () {
			UIkit.offcanvas('#sc-sidebar-main').$destroy()
			document.getElementById('sc-sidebar-main').classList.remove('uk-offcanvas')
		});
		this.$store.commit('setSidebarOffcanvasActive', false);
	}
}
</script>
