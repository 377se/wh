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
                    <!-- LIST -->
                    <div class="uk-width-1-1 uk-width-3-4@m">
                        <ScCard class="uk-card-small">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Sökresultat
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto">
                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove orderlist">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 50px;">OrderId</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 70px;">Datum</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 30px;">Valuta</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 60px;">Summa</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 60px;">Total</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 60px;">Total ex VAT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(order, index) in statsByCurrencyWithSummary" :key="index" class="uk-table-middle">
                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: left; ">{{ order.OrderId }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ order.OrderDate }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ order.Currency }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: right; ">{{ order.Ordersum }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: right; ">{{ order.OrderTotal }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: right; ">{{ order.OrderTotalExVat }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
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
                                        <!-- SHOP -->
                                        <div class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-shopList"
                                                    v-model.number="currentStatsObject.ShopId"
                                                    :options="shopList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Shop', 'closeOnSelect': true, 'allowClear': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>
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
                                        <!-- VALUTA -->
                                        <div class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-currencyList"
                                                    v-model.number="currentStatsObject.CurrencyId"
                                                    :options="currencyList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Valuta', 'closeOnSelect': true, 'allowClear': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>

                                        <div class="uk-width-1-1 uk-flex uk-flex-column uk-flex-middle uk-margin-medium-top uk-margin-small-bottom">
                                            <div><button @click="getStatsByCurrency" class="sc-button sc-button-primary sc-button-mini uk-align-center uk-margin-small-bottom">HÄMTA STATISTIK</button></div>
                                            <div>
                                                <XlsxWorkbook>
                                                    <XlsxSheet v-for="sheet in sheets" :collection="sheet.data" :key="sheet.name" :sheet-name="sheet.name" />
                                                    <XlsxDownload :filename="(currentStatsObject.Year != 0 ? yearList.find(year => year.id == currentStatsObject.Year).text : '') + '-' + (currentStatsObject.Month != 0 ? monthList.find(month => month.id == currentStatsObject.Month).text : '') + '-' + currentStatsObject.MerchantId + '-' + currentStatsObject.Currency + '.xlsx'">
                                                        <button ref="downloadExtendedStats" class="sc-button sc-button-mini uk-align-center">EXPORTERA EXCEL</button>
                                                    </XlsxDownload>
                                                </XlsxWorkbook>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>

                        <!-- <ScCardBody v-if="statsByCurrency.length > 0" class="uk-text-center md-bg-cyan-800">
                            <div class="uk-width-1-1 uk-flex uk-flex-around uk-flex-wrap uk-padding-small">
                                <div class="uk-padding-small">
                                    <div class="summary uk-light">{{ statsByCurrency.length | thousandsDelimiter }}</div>
                                    <div class="uk-light">filer</div>
                                </div>
                            </div>
                        </ScCardBody> -->

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
                { name: '1', data: null },
            ],
            emptyStatsObject: {},
            currentStatsObject: {},
            statsByCurrency: [],
            statsByCurrencyWithSummary: [],
            shopList: null,
            yearList: null,
            monthList: null,
            currencyList: null,
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
                statsbycurrency.ItemList.length == 0 ? UIkit.modal.dialog('<p class="uk-modal-body">Ingen statistik hittades!</p>') : null
                statsbycurrency.ItemList.push(_this.createSummaryObject(statsbycurrency.ItemList))
                _this.sheets[0].name = 'Statistik per valuta'
                _this.sheets[0].data = statsbycurrency.ItemList
                _this.statsByCurrencyWithSummary = statsbycurrency.ItemList
                _this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
		},
        createSummaryObject(orderlist) {
            let summaryObject = Object.assign({}, orderlist[0])
            Object.keys(summaryObject).forEach(k => summaryObject[k] = null)
            summaryObject.Ordersum = itemlist.reduce( ( accumulatedValue, currentValue ) => {
                    return accumulatedValue + currentValue.Ordersum
                }, 0
            )
            summaryObject.OrderTotal = itemlist.reduce( ( accumulatedValue, currentValue ) => {
                    return accumulatedValue + currentValue.OrderTotal
                }, 0
            )
            summaryObject.OrderTotalExVat = itemlist.reduce( ( accumulatedValue, currentValue ) => {
                    return accumulatedValue + currentValue.OrderTotalExVat
                }, 0
            )
            return summaryObject
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
            // this.emptyStatsObject = emptystatsobject
            this.emptyStatsObject = {
                "ShopId": 1,
                "Year": 2021,
                "Month": 1,
                "MerchantId": 1,
                "CurrencyId": 1,
                "VatType1": 0.0,
                "VatType2": 0.0,
            }
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