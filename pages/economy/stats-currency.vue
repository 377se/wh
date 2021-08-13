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
                        <h1 class="sc-top-bar-title uk-display-inline">Statistik per valuta</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <div class="uk-grid uk-grid-medium" uk-grid uk-margin>

                    <!-- FILTERMENUS -->
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
                                    <div class="uk-width-1-1">
                                        <!-- ÅR -->
                                        <div class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-yearList"
                                                    v-model.number="currentStatsObject.Year"
                                                    :options="yearList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'År', 'closeOnSelect': true, 'allowClear': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>
                                        <!-- MÅNAD -->
                                        <div class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-monthList"
                                                    v-model.number="currentStatsObject.Month"
                                                    :options="monthList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Månad', 'closeOnSelect': true, 'allowClear': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>

                                        <div class="uk-width-1-1 uk-flex uk-flex-column uk-flex-middle uk-margin-medium-top uk-margin-small-bottom">
                                            <div><button @click="getStatsByCurrency" class="sc-button sc-button-primary sc-button-mini uk-align-center uk-margin-small-bottom">HÄMTA STATISTIK</button></div>
                                            <div>
                                                <XlsxWorkbook>
                                                    <XlsxSheet v-for="sheet in sheets" :collection="sheet.data" :key="sheet.name" :sheet-name="sheet.name" />
                                                    <XlsxDownload :filename="
                                                        'Försäljning' + '-' +
                                                        (currentStatsObject.Year != 0 ? yearList.find(year => year.id == currentStatsObject.Year).text : '') + '-' +
                                                        (currentStatsObject.Month != 0 ? monthList.find(month => month.id == currentStatsObject.Month).text : '') + '.xlsx'
                                                    ">
                                                        <button ref="downloadExtendedStats" class="sc-button sc-button-mini uk-align-center">EXPORTERA EXCEL</button>
                                                    </XlsxDownload>
                                                </XlsxWorkbook>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Alert from '~/components/Alert'
import ScInput from '~/components/Input'
import { XlsxWorkbook, XlsxSheet, XlsxDownload } from "vue-xlsx"
import _ from "lodash"

export default {
	components: {
		Alert,
		ScInput,
		XlsxWorkbook,
		XlsxSheet,
		XlsxDownload,
		Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            errors: null,
            message: '',
            sheets: [
                { name: 'SEK', data: null },
                { name: 'NOK', data: null },
                { name: 'EUR', data: null },
                { name: 'DKK', data: null },
            ],
            emptyStatsObject: {},
            currentStatsObject: {},
            statsByCurrency: [],
            statsByCurrencyWithSummary: [],
            shopList: null,
            yearList: null,
            monthList: null,
            currencyList: null,
            componentKey: 0,
        }
    },
    watch: {

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
        async getStatsByCurrency() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Economy/StatsByCurrency', _this.currentStatsObject)
			.then(function (statsbycurrency) {
                statsbycurrency.forEach((orderlist, index) => {
                const rearrangedList = orderlist.ItemList.map(order => { return {
                    'OrderId': order.OrderId,
                    'ShopName': order.ShopName,
                    'OrderDate': order.OrderDate,
                    'InvoiceNumber': order.InvoiceNumber,
                    'ShippingDate': order.ShippingDate,
                    'Ordersum': order.Ordersum,
                    'Extra': order.Extra,
                    'ShippingAndHandling': order.ShippingAndHandling,
                    'OrderTotal': order.OrderTotal,
                    'OrderTotalExVat': order.OrderTotalExVat,
                    'Vat': order.Vat,
                    'Currency': order.Currency,
                    'PaymentMethod': order.PaymentMethod,
                    'TransactionCreated': order.TransactionCreated,
                    'AccountId': order.AccountId,
                    'Reference': order.Reference,
                    'CustomerName': order.CustomerName,
                    }})
                    rearrangedList.push(_this.createSummaryObject(rearrangedList))
                    _this.sheets[index].data = rearrangedList
                })
                _this.statsByCurrencyWithSummary = statsbycurrency
                _this.forceRerender()
                _this.hidePageOverlaySpinner()
                UIkit.modal.alert('<p class="uk-modal-body">Din statistik är nu hämtad och färdig att exporteras!</p>')
			})
			.catch(function (error) {
                console.log(error)
                UIkit.modal.default('<p class="uk-modal-body">Ingen statistik hittades!</p>')
                _this.hidePageOverlaySpinner()
			})
		},
        createSummaryObject(orderlist) {
            let summaryObject = Object.assign({}, orderlist[0])
            Object.keys(summaryObject).forEach(k => summaryObject[k] = null)
            summaryObject.Ordersum = orderlist.reduce( ( accumulatedValue, currentValue ) => {
                    return parseInt(accumulatedValue + currentValue.Ordersum)
                }, 0
            )
            summaryObject.Extra = orderlist.reduce( ( accumulatedValue, currentValue ) => {
                    return parseInt(accumulatedValue + currentValue.Extra)
                }, 0
            )
            summaryObject.ShippingAndHandling = orderlist.reduce( ( accumulatedValue, currentValue ) => {
                    return parseInt(accumulatedValue + currentValue.ShippingAndHandling)
                }, 0
            )
            summaryObject.OrderTotal = orderlist.reduce( ( accumulatedValue, currentValue ) => {
                    return parseInt(accumulatedValue + currentValue.OrderTotal)
                }, 0
            )
            summaryObject.OrderTotalExVat = orderlist.reduce( ( accumulatedValue, currentValue ) => {
                    return parseInt(accumulatedValue + currentValue.OrderTotalExVat)
                }, 0
            )
            summaryObject.Vat = orderlist.reduce( ( accumulatedValue, currentValue ) => {
                    return parseInt(accumulatedValue + currentValue.Vat)
                }, 0
            )
            return summaryObject
        },
        forceRerender() {
            this.componentKey += 1;
        },
    },
    async fetch () {
        try {
            const [ emptystatsobject, shoplist, yearlist, monthlist, currencylist ] = await Promise.all([
                this.$axios.$get('/webapi/Stats/GetEmptyStatsObject'),
                this.$axios.$get('/webapi/Shop/GetShopList'),
                this.$axios.$get('/webapi/Utility/GetYearList'),
                this.$axios.$get('/webapi/Utility/GetMonthList'),
                this.$axios.$get('/webapi/Economy/GetCurrencyList'),
            ])
            this.emptyStatsObject = emptystatsobject
            this.currentStatsObject = this.emptyStatsObject
            this.shopList = shoplist.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
            this.yearList = yearlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.monthList = monthlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.currencyList = currencylist.map(({ Id, Name }) => ({ id: Id, text: Name }))
        } catch (err) {
            console.log(err);
        }
    },
}
</script>

<style lang="scss" scoped>
    .sticky-headers {
        background: white;
        position: sticky;
        top: 0px; /* Don't forget this, required for the stickiness */
    }
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
    .orderlist {
        table-layout: fixed;
    }
    .summary {
        font-size: 200%;
        font-weight: 700;
        line-height: 1;
    }
</style>