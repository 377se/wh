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
                        <h1 class="sc-top-bar-title uk-display-inline">Returstatistik</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <div class="uk-grid uk-grid-medium" uk-grid uk-margin>
                    <!-- LIST -->
                    <div class="uk-width-1-1 uk-width-2-3@m">
                        <ScCard>
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Period
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto">
                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove returnstatslist">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 30px;">Antal</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 50px;">Värde&nbsp;(ut)</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 170px;">Produkt</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 100px;">Lag</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 50px;">Land</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 80px;">Shop</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="returnOrder in returnOrderStats.ItemList" :key="returnOrder.Id" class="uk-table-middle">
                                                <td class="border-bottom border-left" style="text-align: center; ">{{ returnOrder.NumberOfItems }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: right; ">{{ returnOrder.Value }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ returnOrder.Name }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ returnOrder.Team }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ returnOrder.Country }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ returnOrder.ShopName }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <!-- FILTERMENUS -->
                    <div class="uk-width-1-1 uk-width-1-3@m uk-flex-first uk-flex-last@m" uk-margin>
                        <ScCard>
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
                                                    :settings="{ 'width': '100%', 'placeholder': 'Shop', 'closeOnSelect': true }"
                                                    @select="postReturnOrderStats"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>
                                        <!-- LAND -->
                                        <div class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-countryList"
                                                    v-model="currentStatsObject.CountryId"
                                                    :options="countryList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Land', 'closeOnSelect': true }"
                                                    @select="postReturnOrderStats"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>
                                        <!-- LAG -->
                                        <div class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-teamList"
                                                    v-model="currentStatsObject.TeamId"
                                                    :options="teamList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Lag', 'closeOnSelect': true }"
                                                    @select="postReturnOrderStats"
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
                                                    :settings="{ 'width': '100%', 'placeholder': 'År', 'closeOnSelect': true }"
                                                    @select="postReturnOrderStats"
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
                                                    :settings="{ 'width': '100%', 'placeholder': 'Månad', 'closeOnSelect': true }"
                                                    @select="postReturnOrderStats"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>
                                        <button class="uk-margin-medium-top uk-button uk-button-primare uk-button-small" @click.prevent="resetFilter">NOLLSTÄLL FILTER</button>
                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>
                        <ScCard v-if="returnOrderStats.TotalValue">
                            <ScCardBody class="uk-text-center md-bg-cyan-800">
                                <div class="uk-width-1-1">
                                    <div class="summary uk-light">{{ returnOrderStats.TotalValue | thousandsDelimiter }}</div>
                                    <div class="uk-light">ex. moms</div>
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
            shopOptionsList: [],
            shopId: 0,
            emptyStatsObject: {},
            currentStatsObject: {},
            returnOrderStats: {},
            countryList: [],
            countryId: 0,
            yearList: [],
            yearId: 0,
            monthList: [],
            monthId: 0,
            teamList: [],
            teamId: 0,
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
        async postReturnOrderStats() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Stats/PostReturnOrderStats', _this.currentStatsObject)
			.then(function (returnorderstats) {
                _this.returnOrderStats = returnorderstats
                _this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
		},
        resetFilter () {
            this.currentStatsObject.CountryId = 0
            this.currentStatsObject.Month = 0
            this.currentStatsObject.ShopId = 0
            this.currentStatsObject.TeamId = 0
            this.currentStatsObject.Year = 0
        },
    },
    async fetch () {
        try {
            const [ emptystatsobject, shops, countrylist, yearlist, monthlist, teamlist ] = await Promise.all([
                this.$axios.$get('/webapi/Stats/GetEmptyStatsObject'),
                this.$axios.$get('/webapi/Shop/GetShopList'),
                this.$axios.$get('/webapi/Utility/GetCountryListDelivery'),
                this.$axios.$get('/webapi/Utility/GetYearList'),
                this.$axios.$get('/webapi/Utility/GetMonthList'),
                this.$axios.$get('/webapi/Metadata/GetTeamList'),
            ])
            this.emptyStatsObject = emptystatsobject
            this.currentStatsObject = emptystatsobject
            this.shopOptionsList = shops.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
            this.countryList = countrylist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.yearList = yearlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.monthList = monthlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.teamList = teamlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
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
    .returnstatslist {
        table-layout: fixed;
    }
    .summary {
        font-size: 260%;
        font-weight: 700;
        line-height: 1;
    }
</style>