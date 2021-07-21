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
                        <h1 class="sc-top-bar-title uk-display-inline">Statistik per payment provider</h1>
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
                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove paymentproviderlist">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 48%;">MerchantId</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 20%;">Valuta</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 20%;">Antal</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 50px;"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(paymentProvider, index) in paymentProviderStats" :key="index" class="uk-table-middle">
                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: left; ">{{ paymentProvider.MerchantId }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ paymentProvider.Currency }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: right; ">{{ paymentProvider.Items | thousandsDelimiter }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">
                                                    <button @click="statsByPaymentProvider(paymentProvider.MerchantId, paymentProvider.Currency)" class="sc-button sc-button-mini uk-align-center">EXCEL</button>
                                                    <!-- <button @click="fetchStatsAndDownloadExcel(paymentProvider.MerchantId, paymentProvider.Currency)" class="sc-button sc-button-mini uk-align-center">EXCEL</button> -->
                                                </td>
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

                                        <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-medium-top uk-margin-medium-bottom">
                                            <div><button @click="paymentProviderList" class="sc-button sc-button-primary sc-button-mini uk-align-center uk-margin-medium-right">HÄMTA STATISTIK</button></div>
                                        </div>

                                                    <div>
                                                        <XlsxWorkbook>
                                                            <XlsxSheet
                                                                v-for="sheet in sheets"
                                                                :collection="sheet.data"
                                                                :key="sheet.name"
                                                                :sheet-name="sheet.name"
                                                            />
                                                            <XlsxDownload :filename="(currentStatsObject.Year != 0 ? yearList.find(year => year.id == currentStatsObject.Year).text : '') + '-' + (currentStatsObject.Month != 0 ? monthList.find(month => month.id == currentStatsObject.Month).text : '') + '-' + currentStatsObject.MerchantId + '-' + currentStatsObject.Currency + '.xlsx'">
                                                                <button ref="downloadExtendedStats" class="uk-hidden"></button>
                                                            </XlsxDownload>
                                                        </XlsxWorkbook>
                                                    </div>

                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>

                        <ScCardBody v-if="paymentProviderStats.length > 0" class="uk-text-center md-bg-cyan-800">
                            <div class="uk-width-1-1 uk-flex uk-flex-around uk-flex-wrap uk-padding-small">
                                <div class="uk-padding-small">
                                    <div class="summary uk-light">{{ paymentProviderStats.length | thousandsDelimiter }}</div>
                                    <div class="uk-light">filer</div>
                                </div>
                            </div>
                        </ScCardBody>

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
                { name: '2', data: null },
            ],
            emptyStatsObject: {},
            currentStatsObject: {},
            paymentProviderStats: [],
            extendedPaymentProviderStats: [],
            extendedPaymentProviderStatsWithSummary: [],
            yearList: [],
            yearId: 0,
            monthList: [],
            monthId: 0,
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
        async paymentProviderList() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Economy/PaymentProviderList', _this.currentStatsObject)
			.then(function (paymentproviderstats) {
                paymentproviderstats.length == 0 ? UIkit.modal.dialog('<p class="uk-modal-body">Ingen statistik hittades!</p>') : null
                _this.paymentProviderStats = paymentproviderstats
                _this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
		},
        async statsByPaymentProvider(MerchantId, Currency) {
			let _this = this
            _this.currentStatsObject.MerchantId = MerchantId
            _this.currentStatsObject.Currency = Currency
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Economy/StatsByPaymentProvider', _this.currentStatsObject)
			.then(function (extendedpaymentproviderstats) {
                extendedpaymentproviderstats.length == 0 ? UIkit.modal.dialog('<p class="uk-modal-body">Ingen statistik hittades!</p>') : null
                _this.extendedPaymentProviderStats = extendedpaymentproviderstats
                _this.extendedPaymentProviderStatsWithSummary = _.clone(extendedpaymentproviderstats)
                let summaryObject = _this.extendedPaymentProviderStatsWithSummary.reduce(function(previousValue, currentValue) {
                    return {
                        "OrderId": null,
                        "ParentOrderId": null,
                        "ShopName": null,
                        "OrderDate": null,
                        "InvoiceNumber": null,
                        "ShippingDate": null,
                        "OrderSum": previousValue.OrderSum + currentValue.OrderSum,
                        "Extra": previousValue.Extra + currentValue.Extra,
                        "Discount": null,
                        "ShippingAndHandling": previousValue.ShippingAndHandling + currentValue.ShippingAndHandling,
                        "OrderTotal": previousValue.OrderTotal + currentValue.OrderTotal,
                        "OrderTotalExVat": previousValue.OrderTotalExVat + currentValue.OrderTotalExVat,
                        "OrderSumVatType1": null,
                        "OrderSumVatType2": null,
                        "OrderSumExVatType1": null,
                        "OrderSumExVatType2": null,
                        "ShippingType1ExVat": null,
                        "ShippingType2ExVat": null,
                        "VatType1": null,
                        "VatType2": null,
                        "VatTotal": previousValue.VatTotal + currentValue.VatTotal,
                        "DiscountExVatType1": null,
                        "DiscountExVatType2": null,
                        "Currency": null,
                        "PaymentTypeId": null,
                        "PaymentType": null,
                        "ParentOrderPaymentType": null,
                        "TransactionCreated": null,
                        "AccountId": null,
                        "Reference": null
                    }
                })
                _this.extendedPaymentProviderStatsWithSummary.push(summaryObject)
                if (extendedpaymentproviderstats.length != 0) {
                    _this.sheets[0].name = Currency
                    _this.sheets[0].data = _this.extendedPaymentProviderStats
                    _this.sheets[1].name = _this.extendedPaymentProviderStatsWithSummary[0].PaymentType
                    _this.sheets[1].data = _this.extendedPaymentProviderStatsWithSummary
                }
                setTimeout(() => {
                    _this.$refs.downloadExtendedStats.click()
                }, 500)
                _this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
        },
        async fetchStatsAndDownloadExcel(MerchantId, Currency) {
            this.currentStatsObject.MerchantId = MerchantId
            this.currentStatsObject.Currency = Currency
            await this.statsByPaymentProvider(MerchantId, Currency)
            .then(res => {
                this.$refs.downloadExtendedStats.click()
            })
        },
    },
    async fetch () {
        try {
            const [ emptystatsobject, yearlist, monthlist ] = await Promise.all([
                this.$axios.$get('/webapi/economy/GetEmptyEconomyStatsObject'),
                this.$axios.$get('/webapi/Utility/GetYearList'),
                this.$axios.$get('/webapi/Utility/GetMonthList'),
            ])
            this.emptyStatsObject = emptystatsobject
            this.currentStatsObject = emptystatsobject
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
    .paymentproviderlist {
        table-layout: fixed;
    }
    .summary {
        font-size: 200%;
        font-weight: 700;
        line-height: 1;
    }
</style>