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
		<div v-if="dashBoard" id="sc-page-content">
			<!-- STATISTIK -->
			<ScCard class="uk-margin-medium-bottom">
				<ScCardBody>
					<div class="uk-width-1-1 uk-overflow-auto">
						<table class="border-all uk-card uk-box-shadow-small uk-margin-remove-bottom uk-table uk-table-small uk-table-middle uk-text-small">
							<thead>
								<tr>
									<td class="border-bottom border-right uk-text-left"><strong>Shop</strong></td>
									<td class="border-bottom border-right uk-text-right"><strong>Dagsförsäljning</strong></td>
									<td class="border-bottom border-right uk-text-right"><strong>Ordrar idag</strong></td>
									<td class="border-bottom border-right uk-text-right"><strong>Månadsförsäljning</strong></td>
									<td class="border-bottom border-right uk-text-right"><strong>Aktiva ordrar</strong></td>
									<td class="border-bottom border-right uk-text-right"><strong>Med tryck</strong></td>
									<td class="border-bottom border-right uk-text-right"><strong>Leveranser idag</strong></td>
									<td v-if="isExtended" class="border-bottom border-right uk-text-right"><strong>Snitt idag</strong></td>
									<td v-if="isExtended" class="border-bottom border-right uk-text-right"><strong>Årsförsäljning</strong></td>
									<td v-if="isExtended" class="border-bottom border-right uk-text-right"><strong>Antal kunder</strong></td>
									<td v-if="isExtended" class="border-bottom border-right uk-text-right"><strong>Aktiva produkter</strong></td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="shop in dashBoard.ItemList" :key="shop.shopId" class="uk-table-middle">
									<td class="border-bottom border-right uk-width-auto uk-text-left">{{ shop.ShopName }}</td>
									<td class="border-bottom border-right uk-width-auto uk-text-right">{{ shop.TotalSaleToday | thousandsDelimiter }}</td>
									<td class="border-bottom border-right uk-width-auto uk-text-right">{{ shop.OrdersToday | thousandsDelimiter }}</td>
									<td class="border-bottom border-right uk-width-auto uk-text-right">{{ shop.TotalSaleCurrentMonth | thousandsDelimiter }}</td>
									<td class="border-bottom border-right uk-width-auto uk-text-right">{{ shop.ActiveOrders | thousandsDelimiter }}</td>
									<td class="border-bottom border-right uk-width-auto uk-text-right">{{ shop.OrdersWithPrint | thousandsDelimiter }}</td>
									<td class="border-bottom border-right uk-width-auto uk-text-right">{{ shop.ItemsShipped | thousandsDelimiter }}</td>
									<td v-if="isExtended" class="border-bottom border-right uk-width-auto uk-text-right">{{ shop.AvgSaleToday | thousandsDelimiter }}</td>
									<td v-if="isExtended" class="border-bottom border-right uk-width-auto uk-text-right">{{ shop.TotalSaleCurrentYear | thousandsDelimiter }}</td>
									<td v-if="isExtended" class="border-bottom border-right uk-width-auto uk-text-right">{{ shop.NumberOfCustomers | thousandsDelimiter }}</td>
									<td v-if="isExtended" class="border-bottom border-right uk-width-auto uk-text-right">{{ shop.ActiveProducts | thousandsDelimiter }}</td>
								</tr>
							</tbody>
							<tfoot>
								<tr class="uk-text-small uk-table-middle">
									<td class="border-bottom border-right uk-text-left"><strong>Totalt:</strong></td>
									<td class="border-bottom border-right uk-text-right"><strong>{{ dashBoard.Summary.TotalSaleToday | thousandsDelimiter }}</strong></td>
									<td class="border-bottom border-right uk-text-right"><strong>{{ dashBoard.Summary.OrdersToday | thousandsDelimiter }}</strong></td>
									<td class="border-bottom border-right uk-text-right"><strong>{{ dashBoard.Summary.TotalSaleCurrentMonth | thousandsDelimiter }}</strong></td>
									<td class="border-bottom border-right uk-text-right"><strong>{{ dashBoard.Summary.ActiveOrders | thousandsDelimiter }}</strong></td>
									<td class="border-bottom border-right uk-text-right"><strong>{{ dashBoard.Summary.OrdersWithPrint | thousandsDelimiter }}</strong></td>
									<td class="border-bottom border-right uk-text-right"><strong>{{ dashBoard.Summary.ItemsShipped | thousandsDelimiter }}</strong></td>
									<td v-if="isExtended" class="border-bottom border-right uk-text-right"><strong>{{ dashBoard.Summary.SaleAverage | thousandsDelimiter }}</strong></td>
									<td v-if="isExtended" class="border-bottom border-right uk-text-right"><strong>{{ dashBoard.Summary.TotalSaleCurrentYear | thousandsDelimiter }}</strong></td>
									<td v-if="isExtended" class="border-bottom border-right uk-text-right"><strong>{{ dashBoard.Summary.NumberOfCustomers | thousandsDelimiter }}</strong></td>
									<td v-if="isExtended" class="border-bottom border-right uk-text-right"><strong>{{ dashBoard.Summary.ActiveProducts | thousandsDelimiter }}</strong></td>
								</tr>
								<tr>
									<td colspan="2"><button @click="getDashboardExtended" class="uk-button uk-button-primary uk-button-small">{{ isExtended ? 'VISA MINDRE' : 'VISA MER' }}</button></td>
									<td class="border-bottom border-right uk-text-right uk-text-small" :colspan="isExtended ? 9 : 5">
										 (priser ex moms)
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
				</ScCardBody>
			</ScCard>
			<!-- 10 SENASTE -->
			<ScCard>
				<ScCardBody>
					<div class="uk-width-1-1 extensionlist-container uk-overflow-auto">
						<table class="border-all extensionlist uk-card uk-box-shadow-small uk-margin-remove-bottom uk-table uk-table-small uk-table-middle uk-text-small">
							<thead>
								<tr>
									<td colspan="2" class="border-bottom border-right uk-text-left">
										<div class="uk-flex uk-flex-between">
											<div><strong>10 senaste produkterna i 377 Warehouse</strong></div>
											<div class="uk-badge md-bg-green-600">{{ recentlyActivated.length }}</div>
										</div>
									</td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="article in recentlyActivated" :key="article.ArticleId" class="uk-table-middle">
									<td class="border-bottom border-right uk-width-auto" style="width: 60px;"><img :src="article.ImageName"></td>
									<td class="border-bottom border-right uk-width-auto uk-text-left">
										<nuxt-link :to="article.Url">
											<div>{{ article.TeamName | toUppercase }}</div>
											<div>{{ article.ArticleName }}</div>
										</nuxt-link>
									</td>
								</tr>
							</tbody>
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
			recentlyActivated: [],
			dashBoard: null,
			isExtended: false,
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
		async getDashboardExtended() {
            let _this = this
            _this.showPageOverlaySpinner()
            await this.$axios.$get('/webapi/Dashboard/GetDashboardExtended')
            .then(function (dashboard) {
                _this.dashBoard = dashboard
                _this.hidePageOverlaySpinner()
				_this.isExtended = !_this.isExtended
            })
            .catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
            })
        },

	},
    async fetch () {
        try {
            const [ userdetails, dashboard, recentlyactivated ] = await Promise.all([
				await this.$axios.$get('/webapi/admin/GetCurrentUser'),
				await this.$axios.$get('/webapi/Dashboard/GetDashboard'),
				await this.$axios.$get('/webapi/Dashboard/GetRecentlyActivatedArticleList'),
            ])
            this.userDetails = userdetails
            this.dashBoard = dashboard
            this.recentlyActivated = recentlyactivated
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