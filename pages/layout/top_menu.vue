<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			Top Menu example
		</div>
	</div>
</template>

<script>
export default {
	name: 'LayoutTopMenu',
	mounted () {
		this.$store.commit('setTopMenuActive', true);
		this.$store.commit('setFullwidthActive', true);
	},
	beforeDestroy () {
		this.$store.commit('setTopMenuActive', false);
		this.$store.commit('setFullwidthActive', false);
	}
}
</script>
