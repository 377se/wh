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
                        <h1 class="sc-top-bar-title uk-display-inline">Swedish Branch</h1>
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
                                    Underlag Swedish Branch
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <!-- SWEDISH BRANCH STATS -->
                                <div v-if="swedishBranchStats" class="uk-overflow-auto">
                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove">
                                        <thead>
                                            <tr>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" colspan="5">
                                                    <div class="uk-flex uk-flex-between">
                                                        <div><strong>Försäljning av Swedish Branch-produkter</strong></div>
                                                        <div class="uk-badge md-bg-green-600">{{ swedishBranchStats.BranchItemList.length }}</div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 8%;">ProduktId</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 53%;">Artikel</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 13%;">Antal</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 13%;">Kickback/enhet</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 13%;">Kickback tot</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="article in swedishBranchStats.BranchItemList" :key="article.ProductId" class="uk-table-middle">
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ article.ProductId }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; "><nuxt-link :to="article.Url">{{ article.ProductName }}</nuxt-link></td>
                                                <td class="border-bottom border-left" style="text-align: right; ">{{ article.Items }}</td>
                                                <td class="border-bottom border-left" style="text-align: right; ">{{ article.Kickback }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: right; ">{{ article.KickbackTotal }}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2"></td>
                                                <td class="border-bottom border-left border-right" style="text-align: right; ">{{ swedishBranchStats.TotalItems }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: right; ">{{ swedishBranchStats.Kickback }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: right; ">{{ swedishBranchStats.TotalKickback }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ScCardBody>
                        </ScCard>
                        <ScCard v-if="swedishBranchOrders" class="uk-card-small uk-margin-medium-top">
                            <ScCardBody>
                                <!-- SWEDISH BRANCH ORDERS -->
                                <div class="uk-overflow-auto">
                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove">
                                        <thead>
                                            <tr>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" colspan="5">
                                                    <div class="uk-flex uk-flex-between">
                                                        <div><strong>Ordrar av typen "Fakturera Swedish Branch"</strong></div>
                                                        <div class="uk-badge md-bg-green-600">{{ swedishBranchOrders.BranchItemList.length }}</div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 10%;">OrderId</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 20%;">Datum</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 50%;">Kund</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 20%;">Ordersumma</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="order in swedishBranchOrders.BranchItemList" :key="order.OrderId" class="uk-table-middle">
                                                <td class="border-bottom border-left" style="text-align: left; "><nuxt-link :to="order.Url">{{ order.OrderId }}</nuxt-link></td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ order.OrderDate }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ order.Name }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: right; ">{{ order.Ordersum }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ScCardBody>
                        </ScCard>
                        <ScCard v-if="swedishBranchRating" class="uk-card-small uk-margin-medium-top">
                            <ScCardBody>
                                <!-- SWEDISH BRANCH RATING -->
                                <div class="uk-overflow-auto">
                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove">
                                        <thead>
                                            <tr>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" colspan="5">
                                                    <div class="uk-flex uk-flex-between">
                                                        <div><strong>Betygsättning Swedish Branch</strong></div>
                                                        <div class="uk-badge md-bg-green-600">{{ swedishBranchRating.BranchItemList.length }}</div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 20%;">Datum</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 30%;">Kund</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 10%;">Summa</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 30%;">Beskrivning</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(rating, index) in swedishBranchRating.BranchItemList" :key="index" class="uk-table-middle">
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ rating.OrderDate }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ rating.Name }}</td>
                                                <td class="border-bottom border-left" style="text-align: right; ">{{ rating.Ordersum }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ rating.Description }}</td>
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
                                    Sök inom period
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
                                            <div><button @click="getSwedishBranchStats" class="sc-button sc-button-primary sc-button-mini uk-align-center uk-margin-medium-right">HÄMTA STATISTIK</button></div>
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
            emptyStatsObject: {},
            currentStatsObject: {},
            swedishBranchStats: null,
            swedishBranchOrders: null,
            swedishBranchRating: null,
            yearList: [],
            monthList: [],
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
        async getSwedishBranchStats() {
			let _this = this
            _this.showPageOverlaySpinner()
            try {
            const [ swedishbranchstats, swedishbranchorders, swedishbranchrating ] = await Promise.all([
                this.$axios.$post('/webapi/Economy/SwedishBranchStats', _this.currentStatsObject),
                this.$axios.$post('/webapi/Economy/SwedishBranchOrders', _this.currentStatsObject),
                this.$axios.$post('/webapi/Economy/SwedishBranchRating', _this.currentStatsObject),
            ])
			    _this.swedishBranchStats = swedishbranchstats
			    _this.swedishBranchOrders = swedishbranchorders
			    _this.swedishBranchRating = swedishbranchrating
                _this.hidePageOverlaySpinner()
            } catch (err) {
                console.log(err);
            }
		},
    },
    async fetch () {
        try {
            const [ emptystatsobject, yearlist, monthlist ] = await Promise.all([
                this.$axios.$get('/webapi/stats/GetEmptyStatsObject'),
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
    .swedishbranchlist {
        table-layout: fixed;
    }
    .summary {
        font-size: 200%;
        font-weight: 700;
        line-height: 1;
    }
</style>