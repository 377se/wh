<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardTitle>
					Footer example
				</ScCardTitle>
				<ScCardBody>
					<pre v-highlightjs><code>mounted () {
	this.$store.commit('setFooterActive', true);
},
beforeDestroy () {
	this.$store.commit('setFooterActive', false);
}</code></pre>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
require('~/plugins/highlight');

export default {
	name: 'ComponentsFooter',
	mounted () {
		this.$store.commit('setFooterActive', true);
	},
	beforeDestroy () {
		this.$store.commit('setFooterActive', false);
	}
}
</script>
