<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content" class="uk-height-1-1 uk-flex uk-flex-center sc-page-over-header">
			<div class="uk-width-5-6@m uk-height-1-1">
				<ScCard class="uk-height-1-1">
					<div class="uk-grid-divider uk-grid-collapse uk-height-1-1 uk-grid" data-uk-grid>
						<div class="uk-width-expand@l uk-height-1-1">
							<nuxt-child :key="$route.params.id"></nuxt-child>
						</div>
						<div class="uk-width-1-4@m uk-height-1-1 uk-visible@l sc-column-transition" :class="{'sc-column-collapsed': columnCollapsed, 'sc-js-el-transform': columnTransform}">
							<div class="uk-flex uk-flex-column uk-height-1-1">
								<ScCardHeader class="md-bg-grey-200 sc-js-el-transform-visible" separator>
									<div class="uk-flex uk-flex-middle uk-flex-center">
										<div class="sc-js-el-hide uk-margin-medium-right uk-flex-1">
											<input v-model="findInvoice" type="text" class="uk-input sc-js-list-search sc-js-search uk-form-small" placeholder="Find invoice...">
										</div>
										<client-only>
											<ColumnToggle
												show-icon="mdi-receipt"
												hide-title="Hide invoices"
												show-title="Show invoices"
												:collapsed="columnCollapsed"
												@columnCollapsing="onColumnCollapsing"
												@columnShown="onColumnToggle"
												@columnHidden="onColumnToggle"
											></ColumnToggle>
										</client-only>
									</div>
								</ScCardHeader>
								<ScCardBody class="sc-js-el-hide uk-flex-1">
									<ul class="uk-list uk-list-divider sc-list-clickable">
										<li v-for="invoice in filteredInvoices" :key="invoice.id" :class="{'uk-active': $nuxt.$route.path === '/pages/invoices/' + invoice.id}">
											<nuxt-link :to="'/pages/invoices/' + invoice.id" class="uk-flex uk-flex-middle uk-width-1-1">
												<span class="uk-display-block uk-flex-1 uk-text-truncate">
													<span class="sc-text-semibold sc-js-list-number">
														{{ invoice.number }} <span v-if="invoice.currency === 'EUR'" class="md-color-light-blue-500">
															(EUR)
														</span>
													</span>
													<span class="uk-display-block sc-list-secondary-text">
														<span class="uk-text-muted uk-text-small">
															To:
														</span> {{ invoice.to_company }}
													</span>
													<span class="uk-display-block sc-list-secondary-text">
														<span class="uk-text-muted uk-text-small">
															Date:
														</span> {{ invoice.date }}
													</span>
												</span>
												<span v-if="!invoice.paid" class="uk-label md-bg-red-500 sc-flex-no-shrink uk-margin-small-left">
													Unpaid
												</span>
											</nuxt-link>
										</li>
									</ul>
								</ScCardBody>
							</div>
						</div>
					</div>
				</ScCard>
			</div>
		</div>
		<div class="sc-fab-page-wrapper">
			<nuxt-link to="/pages/invoices/new" class="sc-fab sc-fab-large sc-fab-primary">
				<i class="mdi mdi-plus"></i>
			</nuxt-link>
		</div>
		<client-only>
			<ScOffcanvas>
				<ul class="uk-list uk-list-divider sc-list-clickable">
					<li v-for="invoice in filteredInvoices"
						:key="invoice.id"
						:class="{'uk-active': $nuxt.$route.path === '/pages/invoices/' + invoice.id}"
					>
						<nuxt-link :to="'/pages/invoices/' + invoice.id" class="uk-flex uk-flex-middle uk-width-1-1">
							<span class="uk-display-block uk-flex-1 uk-text-truncate">
								<span class="sc-text-semibold sc-js-list-number">
									{{ invoice.number }} <span v-if="invoice.currency === 'EUR'"
										class="md-color-light-blue-500"
									>
										(EUR)
									</span>
								</span>
								<span class="uk-display-block sc-list-secondary-text">
									<span class="uk-text-muted uk-text-small">
										To:
									</span> {{ invoice.to_company }}
								</span>
								<span class="uk-display-block sc-list-secondary-text">
									<span class="uk-text-muted uk-text-small">
										Date:
									</span> {{ invoice.date }}
								</span>
							</span>
							<span v-if="!invoice.paid"
								class="uk-label md-bg-red-500 sc-flex-no-shrink uk-margin-small-left"
							>
								Unpaid
							</span>
						</nuxt-link>
					</li>
				</ul>
			</ScOffcanvas>
		</client-only>
	</div>
</template>

<script>
import invoices from '~/data/pages/invoices.json'

import ColumnToggle from '~/components/ColumnToggle';
import ScOffcanvas from '~/components/Offcanvas';

export default {
	name: 'PagesInvoices',
	components: {
		ColumnToggle,
		ScOffcanvas
	},
	data: () => ({
		findInvoice: '',
		invoices,
		columnCollapsed: false,
		columnTransform: false,
		invoicesOffcanvas: true
	}),
	computed: {
		filteredInvoices () {
			return this.invoices.filter(invoice => {
				return invoice.number.toLowerCase().includes(this.findInvoice.toLowerCase()) || invoice.to_company.toLowerCase().includes(this.findInvoice.toLowerCase())
			})
		}
	},
	mounted () {
		this.$store.commit('setCardFixed', true);
		this.$store.commit('setHeaderExpanded', true);
	},
	beforeDestroy () {
		this.$store.commit('setCardFixed', false);
		this.$store.commit('setHeaderExpanded', false);
	},
	methods: {
		onColumnCollapsing (value) {
			this.columnCollapsed = value;
			this.columnTransform = true;
		},
		onColumnToggle () {
			this.columnTransform = false
		}
	}
}
</script>
