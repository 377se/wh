<template>
	<footer class="sc-footer sc-theme-bg-dark sc-footer-light">
		<div class="uk-flex uk-visible@m">
			<div class="uk-flex-1">
				<div class="uk-grid uk-grid-divider uk-child-width-auto uk-grid-medium uk-visible@m" data-uk-grid>
					<nuxt-link to="/pages/chat">
						{{ $t('Chat') }}
					</nuxt-link>
					<nuxt-link to="/pages/Mailbox">
						{{ $t('Mailbox') }}
					</nuxt-link>
					<nuxt-link to="/plugins/gantt_chart">
						{{ $t('Gantt Chart') }}
					</nuxt-link>
					<nuxt-link to="/pages/invoices">
						{{ $t('Invoices') }}
					</nuxt-link>
				</div>
			</div>
			<div>
				Scutum Admin Template
			</div>
		</div>
		<div class="uk-grid uk-child-width-expand uk-flex-center uk-margin-remove-top uk-grid-collapse uk-height-1-1 uk-hidden@m" data-uk-grid>
			<nuxt-link to="/pages/chat">
				<i class="mdi mdi-chat"></i>
			</nuxt-link>
			<nuxt-link to="/pages/Mailbox">
				<i class="mdi mdi-email-outline"></i>
			</nuxt-link>
			<div class="uk-width-mini"></div>
			<nuxt-link to="/plugins/gantt_chart">
				<i class="mdi mdi-chart-timeline"></i>
			</nuxt-link>
			<nuxt-link to="/pages/invoices">
				<i class="mdi mdi-receipt"></i>
			</nuxt-link>
		</div>
		<div class="sc-fab-wrapper uk-hidden@m">
			<ScFabSpeedDial
				class="sc-fab-footer-wrapper"
				:fabs="fabs"
			>
				<a href="javascript:void(0)" class="sc-fab sc-fab-primary">
					<i class="mdi mdi-plus"></i>
					<i class="mdi mdi-close"></i>
				</a>
			</ScFabSpeedDial>
			<div class="round-corner left"></div>
			<div class="round-corner right"></div>
		</div>
	</footer>
</template>

<script>
import ScFabSpeedDial from '~/components/FabSpeedDial'

export default {
	components: {
		ScFabSpeedDial
	},
	data: () => ({
		footerBgcolor: 'grey-800', // red-800, green-800 etc.
		footerLight: true,
		fabs: [
			{
				id: 1,
				class: 'md-bg-light-blue-600 sc-fab-dark',
				to: '/pages/mailbox/',
				icon: ' mdi-email-check'
			},
			{
				id: 2,
				class: 'md-bg-light-green-600 sc-fab-dark',
				href: 'javascript:void(0)',
				icon: ' mdi-email-edit'
			},
			{
				id: 3,
				class: 'md-bg-red-600 sc-fab-dark',
				href: 'javascript:void(0)',
				icon: ' mdi-email-lock'
			},
			{
				id: 4,
				class: 'md-bg-amber-600 sc-fab-dark',
				href: 'javascript:void(0)',
				icon: ' mdi-reload'
			}
		]
	}),
	computed: {
		bgColor () {
			return this.footerBgcolor !== '' ? 'md-bg-' + this.footerBgcolor : '';
		}
	}
}
</script>

<style lang="scss">
	@import "~scss/common/variables_mixins";
	@import "~scss/partials/footer";
</style>
