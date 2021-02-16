<template>
	<div class="uk-flex uk-flex-column uk-height-1-1">
		<ScCardHeader class="sc-border-bottom uk-flex uk-flex-middle uk-flex-none">
			<div class="uk-flex-1 uk-text-truncate">
				<ScCardTitle class="uk-text-truncate">
					Invoice {{ invoice.number }}
				</ScCardTitle>
			</div>
			<div class="sc-actions sc-flex-no-shrink uk-margin-left">
				<a v-print="printInvoice" href="javascript:void(0)" class="sc-actions-icon mdi mdi mdi-printer"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi mdi-pencil"></a>
			</div>
		</ScCardHeader>
		<transition name="fadeUp" appear>
			<ScCardBody id="invoice-single" class="sc-padding sc-padding-large-top sc-padding-large-top">
				<div class="uk-margin-bottom">
					<img v-rjs="require('~/assets/img/logo_alt@2x.png')" :src="logo" class="sc-invoice-logo" alt="">
					<img v-rjs="require('~/assets/img/logo@2x.png')" :src="logoLight" class="sc-invoice-logo sc-invoice-logo-light" alt="">
				</div>
				<div class="uk-grid" data-uk-grid>
					<div class="uk-flex-1 sc-print-column-3-5">
						<div class="uk-margin-medium-bottom">
							<span class="uk-text-medium uk-text-muted">Invoice from:</span>
							<address class="uk-text-medium uk-margin-mini-top">
								341 Maegan Shore Apt. 572<br>
								Lake Oleberg<br>
								tel.: 997-531-4098<br>
								email: 997-531-4098
							</address>
						</div>
						<div>
							<span class="uk-text-medium uk-text-muted">Invoice to:</span>
							<address class="uk-text-medium uk-margin-mini-top">
								{{ invoice.to_company }}<br>
								{{ invoice.to_address_1 }}<br>
								{{ invoice.to_address_2 }}
							</address>
						</div>
					</div>
					<div class="uk-width-2-5@s sc-print-column-2-5">
						<div class="uk-child-width-1-2@xl uk-grid" data-uk-grid>
							<div>
								<span class="uk-text-medium uk-text-muted">Invoice:</span>
								<p class="uk-margin-bottom-remove uk-margin-mini-top">
									<span class="sc-text-semibold">{{ invoice.number }}</span>
								</p>
							</div>
							<div>
								<span class="uk-text-medium uk-text-muted">Due date:</span>
								<p class="uk-margin-bottom-remove uk-margin-mini-top">
									{{ invoice.date }}
								</p>
							</div>
						</div>
						<div class="uk-grid" data-uk-grid>
							<div>
								<span class="uk-text-medium uk-text-muted">Amount Due:</span>
								<p class="uk-margin-remove uk-text-xlarge sc-text-semibold md-color-red-800">
									{{ invoiceTotal | formatCurrency(invoice.currency) }}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="uk-overflow-auto uk-margin-xlarge-top">
					<table class="uk-table uk-table-small uk-table-divider uk-table-middle">
						<thead>
							<tr class="md-bg-grey-100">
								<th>Item</th>
								<th class="uk-table-shrink uk-text-nowrap uk-text-center">
									Unit Price
								</th>
								<th class="uk-table-shrink">
									Quantity
								</th>
								<th class="uk-table-shrink">
									VAT
								</th>
								<th class="uk-table-shrink uk-text-center">
									Total
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in invoice.items" :key="`item-${index}`">
								<td class="uk-text-nowrap sc-print-text-wrap">
									<p class="uk-margin-remove sc-text-semibold">
										{{ item.name }}
									</p>
									<span class="sc-color-secondary">
										{{ item.description }}
									</span>
								</td>
								<td class="uk-text-right">
									{{ item.price | formatCurrency(invoice.currency) }}
								</td>
								<td class="uk-text-center">
									{{ item.quantity }}
								</td>
								<td class="uk-text-center">
									{{ item.VAT }}%
								</td>
								<td class="uk-text-right uk-text-nowrap">
									<span class="sc-text-semibold">
										{{ item.total | formatCurrency(invoice.currency) }}
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="uk-margin-xlarge-top">
					<p class="md-color-grey-600 uk-text-medium uk-text-uppercase uk-margin-remove">
						Payment Methods
					</p>
					<div class="uk-child-width-1-3@m" data-uk-grid>
						<div>
							<ul class="uk-list uk-list-divider uk-margin-small-top">
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-paypal"></i>
									</div>
									<div class="sc-list-body">
										qfriesen@labadie.net
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-bank"></i>
									</div>
									<div class="sc-list-body">
										meagan.herman<br>
										5705112251220
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</ScCardBody>
		</transition>
	</div>
</template>

<script>
import print from '~/plugins/directives/vue-print-nb'
const invoices = require('~/data/pages/invoices.json');

export default {
	name: 'PagesInvoicesId',
	directives: { print },
	data: () => ({
		logo: require('~/assets/img/logo_alt.png'),
		logoLight: require('~/assets/img/logo.png'),
		printInvoice: {
			id: "invoice-single",
			popTitle: 'Invoice'
		}
	}),
	head () {
		return {
			'title': 'Scutum Admin - pages/invoices/ - ' + this.invoice['number']
		}
	},
	computed: {
		invoice () {
			const params = this.$route.params;
			const invoice = invoices.find(invoice => String(invoice.id) === params.id);
			if (!invoice) {
			 	return this.$nuxt.error({ message: 'Invoice not found', statusCode: 404 })
			}
			return invoice
		},
		invoiceTotal () {
			const items = this.invoice.items;
			const itemsTotal = items.map((x) => x.total);
			return itemsTotal.reduce((a, b) => a + b, 0)
		}
	}
}
</script>

<style lang="scss">
	@import "~@/assets/scss/common/print";
	.sc-invoice {
		&-logo {
			max-height: 96px;
		}
	}
</style>
