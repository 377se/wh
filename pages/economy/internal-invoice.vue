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
                        <h1 class="sc-top-bar-title uk-display-inline">Internfakturering</h1>
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
                                    Statistik
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody v-if="internalInvoiceStats.TotalValue" class="uk-text-center md-bg-cyan-800">
                                <div class="uk-width-1-1 uk-flex uk-flex-around uk-flex-wrap uk-padding-small">
                                    <div class="uk-padding-small">
                                        <div class="summary uk-light">{{ internalInvoiceStats.TotalValue | thousandsDelimiter }}</div>
                                        <div class="uk-light">ordersumma ex moms</div>
                                    </div>
                                    <div class="uk-padding-small">
                                        <div class="summary uk-light">{{ internalInvoiceStats.TotalShippingValue | thousandsDelimiter }}</div>
                                        <div class="uk-light">frakt ex moms</div>
                                    </div>
                                    <div class="uk-padding-small">
                                        <div class="summary uk-light">{{ internalInvoiceStats.TotalPurchasePrice | thousandsDelimiter }}</div>
                                        <div class="uk-light">inköpspris ex moms</div>
                                    </div>
                                    <div class="uk-padding-small">
                                        <div class="summary uk-light">{{ internalInvoiceStats.TotalItems | thousandsDelimiter }}</div>
                                        <div class="uk-light">ordrar</div>
                                    </div>
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
                                        <!-- LAND -->
                                        <div class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-countryList"
                                                    v-model="currentStatsObject.CountryId"
                                                    :options="countryList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Land', 'closeOnSelect': true, 'allowClear': true }"
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
                                            <div><button @click="postInternalInvoice" class="sc-button sc-button-primary sc-button-mini uk-align-center">HÄMTA STATISTIK</button></div>
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

export default {
	components: {
		Alert,
		Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            errors: null,
            message: '',
            emptyStatsObject: {},
            currentStatsObject: {},
            internalInvoiceStats: {},
            countryList: [],
            countryId: 0,
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
        async postInternalInvoice() {
			let _this = this
            _this.$store.commit('setAlertHidden', 1)
            _this.internalInvoiceStats = []
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Economy/PostInternalInvoice', _this.currentStatsObject)
			.then(function (internalinvoicestats) {
                if (internalinvoicestats.ErrorList != null) {
                    _this.errors = internalinvoicestats.ErrorList
                    _this.$store.commit('setAlertVisible', 1)
                } else {
                    _this.internalInvoiceStats = internalinvoicestats
                }
                _this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
                console.log(error)
                UIkit.modal.alert('<p class="uk-modal-body">Ett fel uppstod!</p>')
                _this.hidePageOverlaySpinner()
			})
		},
        resetFilter () {
            this.currentStatsObject.CountryId = 0
            this.currentStatsObject.Year = 0
            this.currentStatsObject.Month = 0
        },
    },
    async fetch () {
        try {
            const [ emptystatsobject, yearlist, monthlist ] = await Promise.all([
                this.$axios.$get('/webapi/Economy/GetEmptyInternalInvoiceObject'),
                this.$axios.$get('/webapi/Utility/GetYearList'),
                this.$axios.$get('/webapi/Utility/GetMonthList'),
            ])
            this.emptyStatsObject = emptystatsobject
            this.currentStatsObject = emptystatsobject
            this.countryList = emptystatsobject.CountryList.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.yearList = yearlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.monthList = monthlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
        } catch (err) {
            console.log(err)
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
    .returnstatslist {
        table-layout: fixed;
    }
    .summary {
        font-size: 200%;
        font-weight: 700;
        line-height: 1;
    }
</style>