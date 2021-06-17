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

			<!-- TOP-AREA -->

			<!-- FÖRSÄLJINGSGRAF -->
			<!-- <ScCard class="uk-margin-medium-bottom">
				<ScCardBody class="sc-chart-chartjs">
					<ChartJsLine chart-id="cjsLineChartData" :data="cjsLineChartData" :options="cjs.lineChart.options"></ChartJsLine>
				</ScCardBody>
			</ScCard> -->



			<!-- DASHBOARD - STATISTIK -->
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

			<!-- LEFT-AREA TABS -->
			<ScCard class="uk-width-1-1 uk-width-1-2@s">
				<ScCardBody>
					<!-- TAB-HEADLINES -->
					<ul data-uk-tab>
						<li class="uk-active">
							<a href="javascript:void(0)">
								SENASTE
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								PER DATUM
							</a>
						</li>
					</ul>
					<!-- TAB CONTENT -->
					<ul class="uk-switcher">
						<!-- 10 SENASTE -->
						<li class="uk-active">
							<ScCard>
								<ScCardBody>
									<div class="uk-width-1-1 extensionlist-container uk-overflow-auto">
										<table class="border-all extensionlist uk-card uk-box-shadow-small uk-margin-remove-bottom uk-table uk-table-small uk-table-middle uk-text-small">
											<thead>
												<tr>
													<td colspan="2" class="border-bottom border-right uk-text-left">
														<div class="uk-flex uk-flex-between">
															<div><strong>Senaste produkterna</strong></div>
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
						</li>
						<!-- PER DATUM -->
						<li>
							<ScCard>
								<ScCardBody>
									<div class="uk-width-1-1 extensionlist-container uk-overflow-auto">
										<table class="border-all extensionlist uk-card uk-box-shadow-small uk-margin-remove-bottom uk-table uk-table-small uk-table-middle uk-text-small">
											<thead>
												<tr>
													<td class="border-bottom border-right uk-text-left"><strong>Datum</strong></td>
													<td class="border-bottom border-right uk-text-left"><strong>Shop</strong></td>
													<td class="border-bottom border-right uk-text-right"><strong>Antal</strong></td>
													<td class="border-bottom border-right uk-text-right"><strong>Antal utskrivna</strong></td>
													<td class="border-bottom border-right uk-text-right"><strong>Antal med tryck</strong></td>
												</tr>
											</thead>
											<tbody>
												<tr v-for="orders in activeOrdersByDate.ItemList" :key="orders.Id" class="uk-table-middle">
													<td class="border-bottom border-right uk-width-auto uk-text-left" style="min-width:80px;"><nuxt-link :to="orders.Url">{{ orders.OrderDate }}</nuxt-link></td>
													<td class="border-bottom border-right uk-width-auto uk-text-left">{{ orders.ShopName }}</td>
													<td class="border-bottom border-right uk-width-auto uk-text-right">{{ orders.NumberOfOrders }}</td>
													<td class="border-bottom border-right uk-width-auto uk-text-right"><span :class="{'uk-badge md-bg-green-600': orders.NumberOfOrders == orders.NumberOfOrdersPrinted}">{{ orders.NumberOfOrdersPrinted }}</span></td>
													<td class="border-bottom border-right uk-width-auto uk-text-right"><span :class="{'uk-badge md-bg-orange-600': orders.NumberOfOrders == orders.NumberOfOrdersWithAddons}">{{ orders.NumberOfOrdersWithAddons }}</span></td>
												</tr>
											</tbody>
											<tfoot>
												<tr class="uk-text-small uk-table-middle">
													<td colspan="2" class="border-bottom border-right uk-text-left"></td>
													<td class="border-bottom border-right uk-text-right"><strong>{{ activeOrdersByDate.Summary.NumberOfOrders }}</strong></td>
													<td class="border-bottom border-right uk-text-right"><strong>{{ activeOrdersByDate.Summary.NumberOfOrdersPrinted }}</strong></td>
													<td class="border-bottom border-right uk-text-right"><strong>{{ activeOrdersByDate.Summary.NumberOfOrdersWithAddons }}</strong></td>
												</tr>
											</tfoot>
										</table>
									</div>
								</ScCardBody>
							</ScCard>
						</li>
					</ul>
				</ScCardBody>
			</ScCard>

{{ articleList }}

		</div>
    </div>
</template>
<script>
import { scColors } from '~/assets/js/utils';
import ChartJsLine from '~/components/chartjs/Line'

export default {
	components: {
		ChartJsLine,
	},
	data () {
		return {
			color: (process.client) ? Chart.helpers.color : '#fff',
			cjs: {
				lineChart: {
					options: {
						responsive: true,
						maintainAspectRatio: false,
						title: {
							display: true,
							text: 'Månadsförsäljning'
						},
						tooltips: {
							mode: 'index',
							intersect: false
						},
						hover: {
							mode: 'nearest',
							intersect: true
						},
						scales: {
							xAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Månad'
								}
							}],
							yAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Summa'
								}
							}]
						}
					}
				},
			},
			userDetails: [],
			dashBoard: null,
			isExtended: false,
			recentlyActivated: [],
			activeOrdersByDate: [],
			articleList: [],
		}
	},
	computed: {
		cjsLineChartData () {
			return {
				labels: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
				datasets: [{
					label: 'Föregående år',
					backgroundColor: scColors.multi[4],
					borderColor: scColors.multi[4],
					// data: this.cjsRandData[5],
					data: [1,2,3,4,5,6,7,8,9,10,11,12],
					fill: false,
				}, {
					label: 'Innevarande år',
					fill: false,
					backgroundColor: scColors.multi[5],
					borderColor: scColors.multi[5],
					// data: this.cjsRandData[6],
					data: [12,11,10,9,8,7,6,5,4,3,2,1],
				}]
			}
		},
	},
	mounted () {
		this.getArticleList(1)
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
		async getArticleList(typeid) {
            let _this = this
            _this.showPageOverlaySpinner()
            await this.$axios.$get('/webapi/Dashboard/GetArticleList?typeId=' + typeid)
            .then(function (articlelist) {
				_this.articleList = articlelist
                _this.hidePageOverlaySpinner()
            })
            .catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
            })
        },

	},
    async fetch () {
        try {
            const [ userdetails, dashboard, recentlyactivated, activeordersbydate ] = await Promise.all([
				await this.$axios.$get('/webapi/admin/GetCurrentUser'),
				await this.$axios.$get('/webapi/Dashboard/GetDashboard'),
				await this.$axios.$get('/webapi/Dashboard/GetRecentlyActivatedArticleList'),
				await this.$axios.$get('/webapi/Dashboard/GetActiveOrdersByDate'),
            ])
            this.userDetails = userdetails
            this.dashBoard = dashboard
            this.recentlyActivated = recentlyactivated
            this.activeOrdersByDate = activeordersbydate
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