<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
            {{ showPageOverlaySpinner() }}
        </div>
    </div>
    <div v-else>
        <div id="sc-page-wrapper">
            {{ hidePageOverlaySpinner() }}
            <div id="sc-page-top-bar" class="sc-top-bar">
                <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                    <div class="uk-flex-1">
                        <h1 class="sc-top-bar-title uk-display-inline">Ekonomi översikt</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <div class="uk-grid uk-grid-medium" uk-grid uk-margin>
                    <!-- LIST -->
                    <div class="uk-width-1-1 uk-width-3-4@m">
                        <ScCard class="uk-card-small">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Försäljning per månad ex moms ink frakt
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <!-- OVERVIEW STATS -->
                                <div v-if="economySummary">
                                    <div class="uk-overflow-auto">
                                        <table class="uk-table uk-table-small uk-text-small uk-margin-remove" style="table-layout: fixed;">
                                            <thead>
                                                <tr class="uk-padding-remove-bottom">
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 60px;">År</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 60px;">Jan</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 60px;">Feb</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 60px;">Mar</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 60px;">Apr</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 60px;">Maj</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 60px;">Jun</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 60px;">Jul</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 60px;">Aug</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 60px;">Sep</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 60px;">Okt</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 60px;">Nov</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 60px;">Dec</th>
                                                    <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 80px;">Tot</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="year in yearId ? economySummary.filter(year =>  year.Year == yearId) : economySummary" :key="year.Year" class="uk-table-middle">
                                                    <td class="border-bottom border-left" style="text-align: left;">{{ year.Year }}</td>
                                                    <td class="border-bottom border-left" style="text-align: right;"><div class="linkstyle" @click="setMonthAndYearId(year.Year, year.MonthIdJan)">{{ year.Jan | thousandsDelimiter }}</div><div>{{ year.AverageJan | thousandsDelimiter }}</div></td>
                                                    <td class="border-bottom border-left" style="text-align: right;"><div class="linkstyle" @click="setMonthAndYearId(year.Year, year.MonthIdFeb)">{{ year.Feb | thousandsDelimiter }}</div><div>{{ year.AverageFeb | thousandsDelimiter }}</div></td>
                                                    <td class="border-bottom border-left" style="text-align: right;"><div class="linkstyle" @click="setMonthAndYearId(year.Year, year.MonthIdMar)">{{ year.Mar | thousandsDelimiter }}</div><div>{{ year.AverageMar | thousandsDelimiter }}</div></td>
                                                    <td class="border-bottom border-left" style="text-align: right;"><div class="linkstyle" @click="setMonthAndYearId(year.Year, year.MonthIdApr)">{{ year.Apr | thousandsDelimiter }}</div><div>{{ year.AverageApr | thousandsDelimiter }}</div></td>
                                                    <td class="border-bottom border-left" style="text-align: right;"><div class="linkstyle" @click="setMonthAndYearId(year.Year, year.MonthIdMay)">{{ year.May | thousandsDelimiter }}</div><div>{{ year.AverageMay | thousandsDelimiter }}</div></td>
                                                    <td class="border-bottom border-left" style="text-align: right;"><div class="linkstyle" @click="setMonthAndYearId(year.Year, year.MonthIdJun)">{{ year.Jun | thousandsDelimiter }}</div><div>{{ year.AverageJun | thousandsDelimiter }}</div></td>
                                                    <td class="border-bottom border-left" style="text-align: right;"><div class="linkstyle" @click="setMonthAndYearId(year.Year, year.MonthIdJul)">{{ year.Jul | thousandsDelimiter }}</div><div>{{ year.AverageJul | thousandsDelimiter }}</div></td>
                                                    <td class="border-bottom border-left" style="text-align: right;"><div class="linkstyle" @click="setMonthAndYearId(year.Year, year.MonthIdAug)">{{ year.Aug | thousandsDelimiter }}</div><div>{{ year.AverageAug | thousandsDelimiter }}</div></td>
                                                    <td class="border-bottom border-left" style="text-align: right;"><div class="linkstyle" @click="setMonthAndYearId(year.Year, year.MonthIdSep)">{{ year.Sep | thousandsDelimiter }}</div><div>{{ year.AverageSep | thousandsDelimiter }}</div></td>
                                                    <td class="border-bottom border-left" style="text-align: right;"><div class="linkstyle" @click="setMonthAndYearId(year.Year, year.MonthIdOct)">{{ year.Oct | thousandsDelimiter }}</div><div>{{ year.AverageOct | thousandsDelimiter }}</div></td>
                                                    <td class="border-bottom border-left" style="text-align: right;"><div class="linkstyle" @click="setMonthAndYearId(year.Year, year.MonthIdNov)">{{ year.Nov | thousandsDelimiter }}</div><div>{{ year.AverageNov | thousandsDelimiter }}</div></td>
                                                    <td class="border-bottom border-left" style="text-align: right;"><div class="linkstyle" @click="setMonthAndYearId(year.Year, year.MonthIdDec)">{{ year.Dec | thousandsDelimiter }}</div><div>{{ year.AverageDec | thousandsDelimiter }}</div></td>
                                                    <td class="border-bottom border-left border-right" style="text-align: right;">{{ year.Total | thousandsDelimiter }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div v-if="economyMonthlyReview" class="uk-margin-medium-top">
                                    <div class="uk-overflow-auto">
                                        <table class="uk-table uk-table-small uk-text-small uk-margin-remove" style="table-layout: fixed;">
                                            <thead>
                                                <tr class="uk-padding-remove-bottom">
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 120px;">Datum</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 120px;">Summa</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 120px;">Frakt</th>
                                                    <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 120px;">Totalt</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="date in economyMonthlyReview.ItemList" :key="date.OrderDate" class="uk-table-middle">
                                                    <td class="border-bottom border-left" style="text-align: left;"><div class="linkstyle" @click="getDateStats(date.OrderDate)">{{ date.OrderDate }}</div></td>
                                                    <td class="border-bottom border-left" style="text-align: right;">{{ date.Ordersum | thousandsDelimiter }}</td>
                                                    <td class="border-bottom border-left" style="text-align: right;">{{ date.Shipping | thousandsDelimiter }}</td>
                                                    <td class="border-bottom border-left border-right" style="text-align: right;">{{ date.Total | thousandsDelimiter }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <!-- FILTERMENU -->
                    <div class="uk-width-1-1 uk-width-1-4@m uk-flex-first uk-flex-last@m" uk-margin>
                        <ScCard class="uk-card-small">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Filtrera
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div>
                                    <Alert
                                        :errorlist="this.errors ? this.errors : []"
                                        :message="this.message ? this.message : ''"
                                        :alertClass="'uk-alert-danger'"
                                        id=1
                                    />
                                    <Alert
                                        :errorlist="this.errors ? this.errors : []"
                                        :message="this.message ? this.message : ''"
                                        :alertClass="'uk-alert-success'"
                                        id=2
                                    />
                                    <div class="uk-width-1-1 uk-margin-medium-top">
                                        <!-- SHOP -->
                                        <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-shopList"
                                                    v-model.number="shopId"
                                                    :options="shopList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Välj shop...', 'closeOnSelect': true, 'allowClear': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>
                                        <!-- ÅR -->
                                        <div v-if="economyMonthlyReview" class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-yearList"
                                                    v-model.number="yearId"
                                                    :options="yearList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'År', 'closeOnSelect': true, 'allowClear': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>

                                        <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-medium-top uk-margin-medium-bottom">
                                            <div><button @click="getEconomySummary" class="sc-button sc-button-primary sc-button-mini uk-align-center uk-margin-medium-right">HÄMTA STATISTIK</button></div>
                                        </div>
                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>
                        <ScCardBody v-if="economyMonthlyReview" class="uk-text-center md-bg-cyan-800">
                            <div class="uk-width-1-1 uk-flex uk-flex-around uk-flex-wrap uk-padding-small">
                                <div class="uk-padding-small">
                                    <div class="summary uk-light">{{ economyMonthlyReview.Ordersum | thousandsDelimiter }}</div>
                                    <div class="uk-light">ex. moms</div>
                                    <div class="summary uk-light uk-margin-medium-top">{{ economyMonthlyReview.Shipping | thousandsDelimiter }}</div>
                                    <div class="uk-light">frakt ex. moms</div>
                                    <div class="summary uk-light uk-margin-medium-top">{{ economyMonthlyReview.Total | thousandsDelimiter }}</div>
                                    <div class="uk-light">totalt ex. moms</div>
                                </div>
                            </div>
                        </ScCardBody>
                    </div>
                </div>
            </div>
        </div>

        <!-- DATE-VIEW MODAL -->
        <div v-if="dateViewedInModal" id="date-view-modal" class="uk-modal-full uk-modal" data-uk-modal>
            <div class="uk-modal-header basket-ribbon uk-animation-slide-right">
                <!-- sticky -->
                <h4 class="uk-modal-title" style="color:#fff; line-height:1; margin:3px 0 0 12px; padding:10px;">Sålda produkter per {{ dateViewed }}</h4>
                <button
                    class="uk-offcanvas-close uk-icon uk-close"
                    style="color:#fff;top:14px;right:12px;"
                    type="button"
                    uk-close
                    uk-toggle="target: #date-view-modal"/>
            </div>
            <div class="uk-modal-dialog uk-modal-body uk-overflow-auto uk-animation-slide-right" uk-overflow-auto="" style="padding:20px;height:100vh;background:#ffffff;">

                <div class="uk-overflow-auto">
                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove">
                        <thead>
                            <tr class="uk-padding-remove-bottom">
                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 50px;"><span class="uk-badge md-bg-green-600">{{ dateViewedInModal.length }}</span></th>
                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 38%;">Produktnamn</th>
                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 38%;">Artikelnummer</th>
                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 20%;">Antal sålda</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="article in dateViewedInModal" :key="article.ArticleId" class="uk-table-middle">
                                <td class="border-bottom border-left uk-preserve-width" style="text-align: left;"><img :src="article.ProductImage"></td>
                                <td class="border-bottom border-left linkstyle" style="text-align: left; " @click="closeDateViewModalAndGoToArticle(article.Url)">{{ article.ProductName }}</td>
                                <td class="border-bottom border-left" style="text-align: left; ">{{ article.ArticleNumber }}</td>
                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ article.SoldItems | thousandsDelimiter }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import Alert from '~/components/Alert'
import ScInput from '~/components/Input'

export default {
	components: {
		Alert,
		ScInput,
		Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            errors: null,
            message: '',
            compReRender: false,
            dateViewedInModal: null,
            dateViewed: null,
            economySummary: null,
            economyMonthlyReview: null,
            shopList: [],
            shopId: null,
            yearList: [],
            yearId: null,
            monthList: [],
            monthId: null,
            dayId: null,
        }
    },
    watch: {
        shopId(newValue, oldValue) {
            this.economyMonthlyReview = null
            this.getEconomySummary(this.shopId)
        },
        yearId(newValue, oldValue) {
            this.getEconomyMonthlyReview(this.yearId, this.monthId)
        },
        monthId(newValue, oldValue) {
            this.getEconomyMonthlyReview(this.yearId, this.monthId)
        },
    },
	mounted: function () {
    },
    computed: {
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
        setMonthAndYearId(year, month) {
            this.yearId = year
            this.monthId = month
        },
        async getEconomySummary() {
			let _this = this
            _this.yearId = null
            _this.monthId = null
            try {
            _this.showPageOverlaySpinner()
            const [ economysummary ] = await Promise.all([
                this.$axios.$get('/webapi/Economy/GetEconomySummary?shopId=' + _this.shopId ),
            ])
			    _this.economySummary = economysummary
                _this.hidePageOverlaySpinner()
            } catch (err) {
                console.log(err);
            }
		},
        async getEconomyMonthlyReview(year, month) {
			let _this = this
            _this.yearId = year
            _this.monthId = month
            _this.showPageOverlaySpinner()
            try {
            const [ economymonthlyreview ] = await Promise.all([
                this.$axios.$get('/webapi/Economy/GetEconomyMonthlyReview?shopId=' + _this.shopId + '&year='+ _this.yearId +'&month=' + _this.monthId),
            ])
			    _this.economyMonthlyReview = economymonthlyreview
            } catch (err) {
                console.log(err);
            }
            _this.hidePageOverlaySpinner()
		},
        async getDateStats(orderdate) {
            let _this = this
            _this.dateViewed = orderdate
            try {
                const [ dateviewedinmodal ] = await Promise.all([
                    this.$axios.$get('/webapi/Economy/GetArticleSaleByDate?shopId=' + _this.shopId + '&date=' + orderdate ),
            ])
			    _this.dateViewedInModal = dateviewedinmodal
                _this.compReRender = !_this.compReRender
            } catch (err) {
                console.log(err);
            }
            setTimeout(() => {
                UIkit.modal('#date-view-modal').show()
            }, 200)
		},
        async closeDateViewModalAndGoToArticle(url) {
            let waitForModalToHide = new Promise((resolve, reject) => {
                UIkit.modal('#date-view-modal').hide()
                resolve("Modal hidden, go for it!")
            })
            await waitForModalToHide
            this.$router.push(url)
        },
    },
    async fetch () {
        try {
            const [ shoplist, yearlist, monthlist ] = await Promise.all([
                this.$axios.$get('/webapi/Shop/GetShopList'),
                this.$axios.$get('/webapi/Utility/GetYearList'),
                this.$axios.$get('/webapi/Utility/GetMonthList'),
            ])
            this.shopList = shoplist.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
            this.yearList = yearlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.monthList = monthlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
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
    .summary {
        font-size: 200%;
        font-weight: 700;
        line-height: 1;
    }
    .linkstyle {
        color: #0088CC;
        cursor: pointer;
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
</style>