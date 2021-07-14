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
                        <h1 class="sc-top-bar-title uk-display-inline">Försäljning - Orderstatistik</h1>
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
                                    Period
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto">
                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove orderstatslist">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 20px;"></th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 40px;">Id</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 80px;">Shop</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 70px;">O Date</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 70px;">S Date</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 40px;">Sum</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 40px;">S & H</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 40px;">Total</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 40px;">Total ex VAT</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 40px;">VAT</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 60px;">P M</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="order in orderStats.ItemList" :key="order.OrderId" class="uk-table-middle">
                                                <td class="border-bottom border-left" style="text-align: center; "><i v-if="order.Flag" class="mdi mdi-flag-variant md-color-red-600"></i></td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ order.OrderId }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ order.ShopName }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ order.OrderDate }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ order.ShippingDate }}</td>
                                                <td class="border-bottom border-left" style="text-align: right; ">{{ order.Ordersum }}</td>
                                                <td class="border-bottom border-left" style="text-align: right; ">{{ order.ShippingAndHandling }}</td>
                                                <td class="border-bottom border-left" style="text-align: right; ">{{ order.OrderTotal }}</td>
                                                <td class="border-bottom border-left" style="text-align: right; ">{{ order.OrderTotalExVat }}</td>
                                                <td class="border-bottom border-left" style="text-align: right; ">{{ order.Vat }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ order.PaymentMethod }}</td>
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
                                        <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-shopOptionsList"
                                                    v-model="currentStatsObject.ShopId"
                                                    :options="shopOptionsList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Shop', 'closeOnSelect': true, 'allowClear': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>
                                        <!-- VALUTA -->
                                        <div class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-currencyList"
                                                    v-model="currentStatsObject.currencyId"
                                                    :options="currencyList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Valuta', 'closeOnSelect': true, 'allowClear': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>
                                        <!-- ÅR -->
                                        <div class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-yearList"
                                                    v-model="currentStatsObject.Year"
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
                                                    v-model="currentStatsObject.Month"
                                                    :options="monthList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Månad', 'closeOnSelect': true, 'allowClear': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>

                                        <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-medium-top uk-margin-medium-bottom">
                                            <div><button @click="postOrderStats" class="sc-button sc-button-primary sc-button-mini uk-align-center uk-margin-medium-right">HÄMTA STATISTIK</button></div>
                                            <div>
                                                <XlsxWorkbook>
                                                    <XlsxSheet
                                                        v-for="sheet in sheets"
                                                        :collection="sheet.data"
                                                        :key="sheet.name"
                                                        :sheet-name="sheet.name"
                                                    />
                                                    <XlsxDownload filename="OrderStats.xlsx">
                                                        <button class="sc-button sc-button-mini uk-align-center">EXCEL</button>
                                                    </XlsxDownload>
                                                </XlsxWorkbook>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>

                        <ScCardBody v-if="orderStats.TotalValue" class="uk-text-center md-bg-cyan-800">
                            <div class="uk-width-1-1 uk-flex uk-flex-around uk-flex-wrap uk-padding-small">
                                <div class="uk-padding-small">
                                    <div class="summary uk-light">{{ orderStats.TotalValue | thousandsDelimiter }}</div>
                                    <div class="uk-light">ex moms</div>
                                </div>
                                <div class="uk-padding-small">
                                    <div class="summary uk-light">{{ orderStats.TotalValueNotShipped | thousandsDelimiter }}</div>
                                    <div class="uk-light">ej levererade samma månad</div>
                                </div>
                                <div class="uk-padding-small">
                                    <div class="summary uk-light">{{ orderStats.TotalItems | thousandsDelimiter }}</div>
                                    <div class="uk-light">ordrar</div>
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
                { name: "Försäljning - Orderstatistik", data: null },
            ],
            shopOptionsList: [],
            shopId: 0,
            emptyStatsObject: {},
            currentStatsObject: {},
            orderStats: {},
            yearList: [],
            yearId: 0,
            monthList: [],
            monthId: 0,
            currencyList: [],
            currencyId: 0,
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
        async postOrderStats() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Economy/PostOrderStats', _this.currentStatsObject)
			.then(function (orderstats) {
                orderstats.ItemList.length == 0 ? UIkit.modal.dialog('<p class="uk-modal-body">Inga artiklar hittades!</p>') : null
                if (orderstats.ItemList.length != 0) {
                    _this.sheets[0].data = orderstats.ItemList
                }
                _this.orderStats = orderstats
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
            const [ emptystatsobject, shops, yearlist, monthlist, currencylist ] = await Promise.all([
                this.$axios.$get('/webapi/Stats/GetEmptyStatsObject'),
                this.$axios.$get('/webapi/Shop/GetShopList'),
                this.$axios.$get('/webapi/Utility/GetYearList'),
                this.$axios.$get('/webapi/Utility/GetMonthList'),
                this.$axios.$get('/webapi/Economy/GetCurrencyList'),
            ])
            this.emptyStatsObject = emptystatsobject
            this.currentStatsObject = emptystatsobject
            this.shopOptionsList = shops.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
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
    .orderstatslist {
        table-layout: fixed;
    }
    .summary {
        font-size: 200%;
        font-weight: 700;
        line-height: 1;
    }
</style>