<template>

<client-only>

	<div class="uk-width-1-1 uk-position-relative">

		<div v-if="$fetchState.pending" class="no-print">
			<div id="sc-page-wrapper">
				{{ showPageOverlaySpinner() }}
			</div>
		</div>

		<div v-else id="sc-page-wrapper" class="no-print">
			{{ hidePageOverlaySpinner() }}

			<!-- PAGE-AREA -->

			<!-- HEADLINE -->
			<div id="sc-page-top-bar" class="sc-top-bar">
				<div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
					<div class="uk-flex-1">
						<h1 class="sc-top-bar-title">Dashboard</h1>
					</div>
				</div>
			</div>

			<div id="sc-page-content">

			<!-- TOP-AREA FULL WIDTH -->

				<!-- FÖRSÄLJINGSGRAF -->
				<ScCard class="uk-margin-medium-bottom">
					<ScCardBody v-if="monthlySalesLatestYears.length > 0" class="sc-chart-chartjs">
						<ChartJsLine chart-id="cjsLineChartData" :data="cjsLineChartData" :options="lineChart.options"></ChartJsLine>
					</ScCardBody>
				</ScCard>

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
										<td class="border-bottom border-right uk-width-auto uk-text-right"><a @click.prevent="showDailySales(shop.ShopId, shop.ShopName, todaysDate)">{{ shop.TotalSaleToday | thousandsDelimiter }}</a></td>
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

			<!-- BOTTOM-AREA 2 COLUMNS -->

				<div class="uk-child-width-1-2@s uk-grid" data-uk-grid>

					<!-- LEFT -->
					<div>

						<!-- SENASTE - PER DATUM -->
						<ScCard class="uk-margin-medium-bottom">
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

					</div>

					<!-- RIGHT -->
					<div>

						<!-- PRODUKTER -->
						<ScCard class="md-bg-cyan-800 uk-margin-medium-bottom">
							<ScCardBody>
							<div class="uk-text-light">
								<ul>
									<li class="uk-light" v-for="row in dashboardInformationList" :key="row.TypeId"><a @click.prevent="showArticleList(row.TypeId, row.Name)">{{ row.Name }}</a></li>
								</ul>
							</div>
							</ScCardBody>
						</ScCard>

						<!-- TRYCKINFO -->
						<ScCard class="md-bg-purple-700 uk-margin-medium-bottom">
							<ScCardBody>
							<div class="uk-text-light">
								<ul>
									<li class="uk-light"><a @click.prevent="showPrintInfo()">Bokstäver som behövs för aktiva tryckordrar</a></li>
								</ul>
							</div>
							</ScCardBody>
						</ScCard>


					</div>
				</div>

			</div>

			<!-- DAILY SALES MODAL -->
			<div id="dailysales-modal" class="uk-modal-full uk-modal" data-uk-modal>
				<div class="uk-modal-header basket-ribbon">
					<!-- sticky -->
					<h4 class="uk-modal-title" style="color:#fff; line-height:1; margin:3px 0 0 12px; padding:10px;">Dagsförsäljning - {{ this.shopName }}</h4>
					<button
						class="uk-offcanvas-close uk-icon uk-close"
						style="color:#fff;top:14px;right:12px;"
						type="button"
						uk-close
						uk-toggle="target: #dailysales-modal"/>
				</div>
				<div class="uk-modal-dialog uk-modal-body uk-overflow-auto" uk-overflow-auto="" style="padding:0px;height:100vh;background:#ffffff;">

					<div class="uk-width-1-1 uk-overflow-auto">
						<table class="border-all uk-card uk-box-shadow-small uk-margin-remove-bottom uk-table uk-table-small uk-table-middle uk-text-small">
							<thead>
								<tr>
									<td class="border-bottom border-right uk-text-center"><div class="uk-badge md-bg-green-600">{{ dailySales.length }}</div></td>
									<td class="border-bottom border-right uk-text-left"><strong>Artikel</strong></td>
									<td class="border-bottom border-right uk-text-left"><strong>ArtikelNr</strong></td>
									<td class="border-bottom border-right uk-text-left"><strong>Antal</strong></td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="article in dailySales" :key="article.ArticleId" class="uk-table-middle">
									<td class="border-bottom border-right uk-width-auto" style="width: 60px;"><img :src="article.ImageName"></td>
									<td class="border-bottom border-right uk-width-auto uk-text-left">
										<nuxt-link :to="article.Url" uk-toggle="target: #dailysales-modal">
											<div>{{ article.TeamName | toUppercase }}</div>
											<div>{{ article.ArticleName }}</div>
										</nuxt-link>
									</td>
									<td class="border-bottom border-right uk-width-auto uk-text-left"><div>{{ article.ArticleNumber }}</div></td>
									<td class="border-bottom border-right uk-width-auto uk-text-left"><div>{{ article.NumberOfItems }}</div></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- ARTICLE-LIST MODAL -->
			<div id="article-list-modal" class="uk-modal-full uk-modal" data-uk-modal>

				<div class="uk-modal-header basket-ribbon">
					<!-- sticky -->
					<h4 class="uk-modal-title" style="color:#fff; line-height:1; margin:3px 0 0 12px; padding:10px;">{{ articleListName }}</h4>
					<button
						class="uk-offcanvas-close uk-icon uk-close"
						style="color:#fff;top:14px;right:12px;"
						type="button"
						uk-close
						uk-toggle="target: #article-list-modal"/>
				</div>
				<div class="uk-modal-dialog uk-modal-body uk-overflow-auto" uk-overflow-auto="" style="padding:0px;height:100vh;background:#ffffff;">

					<div class="uk-width-1-1 uk-overflow-auto">
						<table class="border-all uk-card uk-box-shadow-small uk-margin-remove-bottom uk-table uk-table-small uk-table-middle uk-text-small">
							<thead>
								<tr>
									<td class="border-bottom border-right uk-text-center" style="width: 50px;"><div class="uk-badge md-bg-green-600">{{ articleList.length }}</div></td>
									<td colspan="2" class="border-bottom border-right uk-text-right">
										<a v-if="articleListTypeId == 1" v-print="printInventoryNotes" href="javascript:void(0)" class="sc-actions-icon mdi mdi-printer uk-display-inline uk-margin-small-right"></a>
									</td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="article in articleList" :key="article.ArticleId" class="uk-table-middle">
									<td class="border-bottom border-right uk-width-auto" style="width: 60px;"><img :src="article.ImageName"></td>
									<td class="border-bottom border-right uk-width-auto uk-text-left">
										<nuxt-link :to="article.Url" uk-toggle="target: #article-list-modal">
											<div>{{ article.TeamName | toUppercase }}</div>
											<div>{{ article.ArticleName }}</div>
										</nuxt-link>
									</td>
									<td v-if="articleListTypeId == 1" class="border-bottom border-right uk-width-auto uk-text-left" style="width: 80px;">
										<button class="uk-button uk-button-primary uk-button-small">DÖLJ</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- PRINTINFO MODAL -->
			<div id="print-info-modal" class="uk-modal-full uk-modal" data-uk-modal>

				<div class="uk-modal-header basket-ribbon">
					<!-- sticky -->
					<h4 class="uk-modal-title" style="color:#fff; line-height:1; margin:3px 0 0 12px; padding:10px;">Tryckinformation</h4>
					<button
						class="uk-offcanvas-close uk-icon uk-close"
						style="color:#fff;top:14px;right:12px;"
						type="button"
						uk-close
						uk-toggle="target: #print-info-modal"/>
				</div>
				<div class="uk-modal-dialog uk-modal-body uk-overflow-auto" uk-overflow-auto="" style="padding:0px;height:100vh;background:#ffffff;">

					<div class="uk-width-1-1 uk-overflow-auto">

						<!-- TRYCKINFORMATION -->

						<!-- TAB-HEADLINES -->
						<ul data-uk-tab>
							<li class="uk-active">
								<a href="javascript:void(0)">
									BOKSTÄVER/SIFFROR
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									NAMN
								</a>
							</li>
						</ul>
						<!-- TAB CONTENT -->
						<ul class="uk-switcher">

							<!-- TECKEN -->
							<li class="uk-active">
								<ScCard>
									<ScCardBody>
										<div class="uk-width-1-1 uk-overflow-auto">
											<table class="border-all uk-card uk-box-shadow-small uk-margin-remove-bottom uk-table uk-table-small uk-table-middle uk-text-small">
												<thead>
													<tr>
														<td class="border-bottom border-right uk-text-left">
															<strong>Bokstav/Siffra</strong>
														</td>
														<td class="border-bottom border-right uk-text-left">
															<strong>Antal</strong>
														</td>
													</tr>
												</thead>
												<tbody>
													<tr v-for="item in nameAndNumberInformation.LetterList" :key="item.Value" class="uk-table-middle">
														<td class="border-bottom border-right uk-width-auto uk-text-left">
															<div>{{ item.Value }}</div>
														</td>
														<td class="border-bottom border-right uk-width-auto uk-text-left">
															<div>{{ item.NumberOfItems }}</div>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</ScCardBody>
								</ScCard>
							</li>

							<!-- PATCHAR -->
							<li>
								<ScCard>
									<ScCardBody>
										<div class="uk-width-1-1 uk-overflow-auto">
											<table class="border-all uk-card uk-box-shadow-small uk-margin-remove-bottom uk-table uk-table-small uk-table-middle uk-text-small">
												<thead>
													<tr class="border-bottom border-right uk-text-left">
														<td class="border-bottom border-right uk-text-left">
															<strong>{{ nameAndNumberInformation.PatchList[0].Value }}</strong>
														</td>
														<td class="border-bottom border-right uk-text-left">
															<strong>{{ nameAndNumberInformation.PatchList[0].NumberOfItems }}</strong>
														</td>
													</tr>
													<tr>
														<td class="border-bottom border-right uk-text-left">
															<strong>Namn</strong>
														</td>
														<td class="border-bottom border-right uk-text-left">
															<strong>Antal</strong>
														</td>
													</tr>
												</thead>
												<tbody>
													<tr v-for="item in nameAndNumberInformation.PrintList" :key="item.Value" class="uk-table-middle">
														<td class="border-bottom border-right uk-width-auto uk-text-left">
															<div>{{ item.Value }}</div>
														</td>
														<td class="border-bottom border-right uk-width-auto uk-text-left">
															<div>{{ item.NumberOfItems }}</div>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</ScCardBody>
								</ScCard>
							</li>
						</ul>



					</div>
				</div>
			</div>

		</div>

		<!-- INVENTORY PRINTOUT -->
		<div class="inventory-note-container uk-invisible">

			<div id="all-inventory-notes" class="all-inventory-notes">
				<!-- INVENTERINGSLISTA -->
				<div v-if="articleList" class="inventory-note" style="clear: both; page-break-after: always;">
					<!-- <div class="uk-padding-small uk-flex uk-flex-right"><a v-print="printInventoryNotes" href="javascript:void(0)" class="sc-actions-icon mdi mdi mdi-printer"></a></div> -->
					<h2>INVENTERINGSLISTA</h2>
					<table class="items">
						<thead>
							<tr>
								<th style="width: 80px; text-align: left;"></th>
								<th style="width: 200px; text-align: left;">Lag/Produktnamn</th>
								<th style="width: 100px; text-align: left;">Artikelnummer</th>
								<th style="width: 80px; text-align: left;">Hyllplats</th>
							</tr>
						</thead>
						<tbody>
								<tr v-for="article in articleList" :key="article.ArticleNumber">
									<td style="width: 80px; text-align: left;"><img class="productImage" :src="article.ImageName" alt="Product image"></td>
									<td style="width: 200px; text-align: left;">
										{{ article.TeamName }}<br>
										{{ article.ArticleName }}<br>
										{{ article.BrandName }}
									</td>
									<td style="width: 100px; text-align: left;">{{ article.ArticleNumber }}</td>
									<td style="width: 80px; text-align: left;">{{ article.Shelf }}</td>
								</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

	</div>

</client-only>

</template>
<script>
import { scColors } from '~/assets/js/utils';
import ChartJsLine from '~/components/chartjs/Line'
import print from '~/plugins/directives/vue-print-nb'

export default {
	components: {
		ChartJsLine,
	},
	directives: { print },
	data () {
		return {
			printInventoryNotes: {
                id: "all-inventory-notes",
            },
			color: (process.client) ? Chart.helpers.color : '#fff',
			todaysDate: '',
			dashBoard: null,
			isExtended: false,
			recentlyActivated: [],
			activeOrdersByDate: [],
			articleList: [],
			articleListTypeId: null,
			articleListName: '',
			monthlySalesLatestYears: [],
			dailySales: [],
			dashboardInformationList: [],
			shopName: '',
			nameAndNumberInformation: null,
		}
	},
	computed: {
		cjsLineChartData () {
			return {
				labels: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
				datasets: [
				{
					label: this.monthlySalesLatestYears[0].Year,
					steppedLine: false,
					lineTension: 0.3,
					backgroundColor: scColors.multi[3],
					borderColor: scColors.multi[3],
					data: this.monthlySalesLatestYears[0].MonthlySale,
					fill: false,
				},
				{
					label: this.monthlySalesLatestYears[1].Year,
					steppedLine: false,
					lineTension: 0.3,
					backgroundColor: scColors.multi[4],
					borderColor: scColors.multi[4],
					data: this.monthlySalesLatestYears[1].MonthlySale,
					fill: false,
				},
				{
					label: this.monthlySalesLatestYears[2].Year,
					steppedLine: false,
					lineTension: 0.3,
					backgroundColor: scColors.multi[5],
					borderColor: scColors.multi[5],
					data: this.monthlySalesLatestYears[2].MonthlySale,
					fill: false,
				},
				]
			}
		},
		lineChart () {
			return {
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: false,
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
								display: false,
								labelString: 'Månad'
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								display: false,
								labelString: 'Summa'
							},
							ticks: {
								beginAtZero: true,
								stepSize: 500000,
								callback: (value) => {
									return Intl.NumberFormat().format((value)) + ' kr';
								},
							}
						}]
					},
				}
			}
		},
	},
	mounted () {
		this.getTodaysDate()
	},
	methods: {
		getTodaysDate() {
			let d = new Date(),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear()
			if (month.length < 2)
				month = '0' + month
			if (day.length < 2)
				day = '0' + day
			this.todaysDate = [year, month, day].join('-')
		},
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
		async getArticleList(typeid, articlelistname) {
            let _this = this
			_this.articleListName = articlelistname
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
		async getDailySales(shopid, date) {
            let _this = this
			_this.dailySales = []
            _this.showPageOverlaySpinner()
            await this.$axios.$get('/webapi/Dashboard/GetDailySales?shopId=' + shopid + '&date=' + date)
            .then(function (dailysales) {
				_this.dailySales = dailysales
                _this.hidePageOverlaySpinner()
            })
            .catch(function (error) {
				console.log(error)
                _this.hidePageOverlaySpinner()
            })
        },
		showDailySales(shopid, shopname, date) {
			this.shopName = shopname
			this.getDailySales(shopid, date)
			UIkit.modal('#dailysales-modal').show()
		},
		showArticleList(typeid, articlelistname) {
			this.articleListTypeId = typeid
			this.getArticleList(typeid, articlelistname)
			UIkit.modal('#article-list-modal').show()
		},
		showPrintInfo() {
			UIkit.modal('#print-info-modal').show()
		},
	},
    async fetch () {
        try {
            const [ dashboard, recentlyactivated, activeordersbydate, monthlysaleslatestyears, dashboardinformationlist, nameandnumberinformation ] = await Promise.all([
				await this.$axios.$get('/webapi/Dashboard/GetDashboard'),
				await this.$axios.$get('/webapi/Dashboard/GetRecentlyActivatedArticleList'),
				await this.$axios.$get('/webapi/Dashboard/GetActiveOrdersByDate'),
				await this.$axios.$get('/webapi/Dashboard/GetMonthlySalesTwoLatestYears'),
				await this.$axios.$get('/webapi/Dashboard/GetDashboardInformationList'),
				await this.$axios.$get('/webapi/Order/GetNameAndNumberInformation'),
            ])
            this.dashBoard = dashboard
            this.recentlyActivated = recentlyactivated
            this.activeOrdersByDate = activeordersbydate
            this.monthlySalesLatestYears = monthlysaleslatestyears
            this.dashboardInformationList = dashboardinformationlist
			this.nameAndNumberInformation = nameandnumberinformation
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
	.uk-offcanvas-bar {
		color:#333;
	}
	.uk-modal-full {
		background: rgba(0, 0, 0, 0.6);
	}
	.uk-modal-dialog, .uk-modal-header {
		margin-left: auto;
		width:55vw !important;
		max-width: 800px !important;
			@media only screen and (max-width: 600px) {
				width:85vw !important;
				max-width: 800px !important;
			}
	}
	.uk-modal-header {
		min-height: 50px;
		height: auto;
		padding: 0px;
	}
	.basket-ribbon{
		background: #00838F;
	}
	.cursor-pointer {
		cursor: pointer;
	}
	.uk-tab {
		margin-bottom: 0px;
	}



	@media print {
		.no-print, .no-print * {
			display: none !important;
		}
	}

	.inventory-note-container {
		width: 100%;
		margin: 60px 0 0 0px;
		font-size: 12px;
		font-family: 'Roboto', sans-serif;
		font-weight:400;
	}

	.all-inventory-notes {
		// width: 950px;
		margin: 0 auto;
	}

	.inventory-note {
		margin: 0 0 50px 0;
		padding: 50px 50px;
		background-color: #fff;
	}
	.items th {
		background: #333;
		font-family: "Roboto Condensed", sans-serif;
		font-weight: 700;
		text-transform: uppercase;
		font-size: 0.8em;
		text-align: left;
		color: #fff;
		height: 30px;
	}

	@media print {
		.items th {
			background: #333 !important;
			-webkit-print-color-adjust: exact;
			color: #fff !important;
			font-size: 10px;
    	}
		.inventory-note {
			margin: 30px 20px 60px 20px  !important;
			padding: 0;
		}
		.all-inventory-notes {
			margin-bottom: 60px !important;
		}
	}
	.items {
		clear: both;
		width: 100%;
		margin: 30px 0 30px 0;
		border-collapse: collapse;
	}
	.items tbody tr {
		font-size: 12px;
		border: solid #333;
		border-width: 0 0 1px 0;
		height: 65px;
	}
	.items th {
		text-transform: uppercase;
	}

</style>