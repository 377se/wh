<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
            {{ showPageOverlaySpinner() }}
        </div>
    </div>
 	<div v-else id="sc-page-wrapper">
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
			todaysDate: '',
			dashBoard: null,
			isExtended: false,
			recentlyActivated: [],
			activeOrdersByDate: [],
			articleList: [],
			articleListName: '',
			monthlySalesTwoLatestYears: [],
			dailySales: [],
			dashboardInformationList: [],
			shopName: '',
		}
	},
	computed: {
		cjsLineChartData () {
			return {
				labels: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
				datasets: [{
					label: this.monthlySalesTwoLatestYears[0].Year,
					steppedLine: false,
					lineTension: 0.3,
					backgroundColor: scColors.multi[4],
					borderColor: scColors.multi[4],
					data: this.monthlySalesTwoLatestYears[0].MonthlySale,
					fill: false,
				}, {
					label: this.monthlySalesTwoLatestYears[1].Year,
					steppedLine: false,
					lineTension: 0.3,
					backgroundColor: scColors.multi[5],
					borderColor: scColors.multi[5],
					data: this.monthlySalesTwoLatestYears[1].MonthlySale,
					fill: false,
				}]
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
								stepSize: 200000,
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
			this.getArticleList(typeid, articlelistname)
			UIkit.modal('#article-list-modal').show()
		},
	},
    async fetch () {
        try {
            const [ dashboard, recentlyactivated, activeordersbydate, monthlysalestwolatestyears, dashboardinformationlist ] = await Promise.all([
				await this.$axios.$get('/webapi/Dashboard/GetDashboard'),
				await this.$axios.$get('/webapi/Dashboard/GetRecentlyActivatedArticleList'),
				await this.$axios.$get('/webapi/Dashboard/GetActiveOrdersByDate'),
				await this.$axios.$get('/webapi/Dashboard/GetMonthlySalesTwoLatestYears'),
				await this.$axios.$get('/webapi/Dashboard/GetDashboardInformationList'),
            ])
            this.dashBoard = dashboard
            this.recentlyActivated = recentlyactivated
            this.activeOrdersByDate = activeordersbydate
            this.monthlySalesTwoLatestYears = monthlysalestwolatestyears
            this.dashboardInformationList = dashboardinformationlist
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
	.uk-modal-dialog {
		margin-left: auto;
		width:55vw !important;
		max-width: 800px !important;
			@media only screen and (max-width: 600px) {
				width:85vw !important;
				max-width: 800px !important;
			}
	}
	.basket-ribbon{
		height:50px;
		background: #00838F;
	}
	.cursor-pointer {
		cursor: pointer;
	}

</style>