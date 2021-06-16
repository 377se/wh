<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
            {{ showPageOverlaySpinner() }}
        </div>
    </div>
 	<div v-else id="sc-page-wrapper">
		{{ hidePageOverlaySpinner() }}
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
				<div class="uk-flex-1">
					<h1 class="sc-top-bar-title">Dashboard</h1>
				</div>
			</div>
		</div>
		<div id="sc-page-content">
			<ScCard class="uk-margin-medium-bottom">
				<ScCardBody>
                    Välkommen {{ userDetails.Firstname }}!
				</ScCardBody>
			</ScCard>
			<ScCard>
				<ScCardBody>
					<div class="uk-width-1-1 extensionlist-container uk-overflow-auto">
						<table class="border-all extensionlist uk-card uk-box-shadow-small uk-margin-remove-bottom uk-table uk-table-small uk-table-middle uk-text-small">
							<thead>
								<tr>
									<td class="border-bottom border-right uk-text-left" style="width:14%;"><strong>Shop</strong></td>
									<td class="border-bottom border-right uk-text-left" style="width:14%;"><strong>Dagsförsäljning</strong></td>
									<td class="border-bottom border-right uk-text-left" style="width:14%;"><strong>Ordrar i dag</strong></td>
									<td class="border-bottom border-right uk-text-left" style="width:14%;"><strong>Månadsförsäljning</strong></td>
									<td class="border-bottom border-right uk-text-left" style="width:14%;"><strong>Aktiva ordrar</strong></td>
									<td class="border-bottom border-right uk-text-left" style="width:14%;"><strong>Med tryck</strong></td>
									<td class="border-bottom border-right uk-text-left" style="width:14%;"><strong>Leveranser i dag</strong></td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="shop in dashBoard.ItemList" :key="shop.shopId" class="uk-table-middle">
									<td class="border-bottom border-right uk-width-auto">{{ shop.ShopName }}</td>
									<td class="border-bottom border-right uk-width-auto">{{ shop.TotalSaleToday }}</td>
									<td class="border-bottom border-right uk-width-auto">{{ shop.OrdersToday }}</td>
									<td class="border-bottom border-right uk-width-auto">{{ shop.TotalSaleCurrentMonth }}</td>
									<td class="border-bottom border-right uk-width-auto">{{ shop.ActiveOrders }}</td>
									<td class="border-bottom border-right uk-width-auto">{{ shop.OrdersWithPrint }}</td>
									<td class="border-bottom border-right uk-width-auto">{{ shop.ItemsShipped }}</td>
								</tr>
							</tbody>
							<tfoot>
								<tr class="uk-text-small uk-table-middle">
									<td class="border-bottom border-right"><strong>Totalt:</strong></td>
									<td class="border-bottom border-right"><strong>{{ dashBoard.Summary.TotalSaleToday }}</strong></td>
									<td class="border-bottom border-right"><strong>{{ dashBoard.Summary.OrdersToday }}</strong></td>
									<td class="border-bottom border-right"><strong>{{ dashBoard.Summary.TotalSaleCurrentMonth }}</strong></td>
									<td class="border-bottom border-right"><strong>{{ dashBoard.Summary.ActiveOrders }}</strong></td>
									<td class="border-bottom border-right"><strong>{{ dashBoard.Summary.OrdersWithPrint }}</strong></td>
									<td class="border-bottom border-right"><strong>{{ dashBoard.Summary.ItemsShipped }}</strong></td>
								</tr>
								<tr>
									<td class="border-bottom border-right uk-text-right uk-text-small" colspan="7">
										 (priser ex moms)
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
    </div>
</template>
<script>
export default {
	data () {
		return {
			userDetails: [],
			dashBoard: null,
		}
	},
	mounted () {
	},
	methods: {
        hidePageOverlaySpinner () {
            this.$store.commit('toggleProgressOverlay', false);
            this.$store.commit('togglePageOverlay', false)
        },
        showPageOverlaySpinner () {
            this.$store.commit('toggleProgressOverlay', true);
            this.$store.commit('togglePageOverlay', true)
        },
	},
    async fetch () {
        try {
            const [ userdetails, dashboard ] = await Promise.all([
				await this.$axios.$get('/webapi/admin/GetCurrentUser'),
				await this.$axios.$get('/webapi/Dashboard/GetDashboard')
            ])
            this.userDetails = userdetails
            this.dashBoard = dashboard
        } catch (err) {
            console.log(err);
        }
    },
}
</script>

<style lang="scss" scoped>
	.border-all {
        border: 1px solid #ccc;
    }
    .border-left {
        border-left: 1px solid #ccc;
    }
    .border-right {
        border-right: 1px solid #ccc;
    }
    .border-top {
        border-top: 1px solid #ccc;
    }
    .border-bottom {
        border-bottom: 1px solid #ccc;
    }
</style>