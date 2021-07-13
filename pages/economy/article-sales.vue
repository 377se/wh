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
                        <h1 class="sc-top-bar-title uk-display-inline">Produktförsäljning</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <div class="uk-grid uk-grid-medium" uk-grid uk-margin>
                    <!-- LIST -->
                    <div class="uk-width-1-1 uk-width-3-4@m">
                        <ScCard>
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Statistik
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto">
                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove returnstatslist">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 50px;"></th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 18%;">Produktnamn</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 16%;">Märke</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 19%;">Art. nummer</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 7%;">Ant sålda</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 10%;">Försälj. ex.moms</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 8%;">Bruttom kr</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 8%;">Bruttom %</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="article in articleSaleStats.ArticleList" :key="article.ArticleId" class="uk-table-middle">
                                                <td class="border-bottom border-left border-right" style="text-align: left; "><img :src="article.ImageName"></td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ article.ProductName }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ article.BrandName }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ article.ArticleNumber }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: center; ">{{ article.Quantity }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: right; ">{{ article.TotalSale }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: right; ">{{ article.GrossMargin }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: right; ">{{ article.GrossMarginPercent }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <!-- FILTERMENUS -->
                    <div class="uk-width-1-1 uk-width-1-4@m uk-flex-first uk-flex-last@m" uk-margin>
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
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>
                                        <!-- LIGA -->
                                        <div class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-leagueList"
                                                    v-model="currentStatsObject.LeagueId"
                                                    :options="leagueList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Liga', 'closeOnSelect': true }"
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
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>
                                        <!-- MÄRKE -->
                                        <div class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-brandList"
                                                    v-model="currentStatsObject.BrandId"
                                                    :options="brandList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Märke', 'closeOnSelect': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>
                                        <!-- PRODUKTTYP -->
                                        <div class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-productTypeList"
                                                    v-model="currentStatsObject.ProductTypeId"
                                                    :options="productTypeList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Produkttyp', 'closeOnSelect': true }"
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
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>
                                        <!-- FROM DATUM -->
                                        <div class="uk-margin">
                                            <ScInput v-model="currentStatsObject.FromDate" v-flatpickr="{ 'locale': Swedish }" placeholder="Välj from datum..." state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>From datum</label>
                                            </ScInput>
                                        </div>

                                        <!-- TOM DATUM -->
                                        <div class="uk-margin">
                                            <ScInput v-model="currentStatsObject.ToDate" v-flatpickr="{ 'locale': Swedish }" placeholder="Välj tom datum..." state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Tom datum</label>
                                            </ScInput>
                                        </div>

                                        <div class="uk-flex uk-flex-column uk-margin-medium-top">
                                            <div class="uk-width-1-1"><button @click="postArticleSaleStats" class="uk-button uk-button-small uk-align-center">HÄMTA STATISTIK</button></div>
                                            <div class="uk-width-1-1"><button @click="resetFilter" class="uk-align-center uk-button uk-button-small" >NOLLSTÄLL FILTER</button></div>
                                        </div>
                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>
                        <ScCard v-if="articleSaleStats.TotalValue">
                            <ScCardBody class="uk-text-center md-bg-cyan-800">
                                <div class="uk-width-1-1">
                                    <div class="summary uk-light">{{ articleSaleStats.TotalValue | thousandsDelimiter }} kr</div>
                                    <div class="uk-light">försäljning ex. moms</div>
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
import { Swedish } from "flatpickr/dist/l10n/sv.js"
import ScInput from '~/components/Input'

if(process.client) {
	require('~/plugins/flatpickr')
}

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
            Swedish,
            shopOptionsList: [],
            shopId: 0,
            emptyStatsObject: {},
            currentStatsObject: {},
            articleSaleStats: {},
            countryList: [],
            countryId: 0,
            yearList: [],
            yearId: 0,
            monthList: [],
            monthId: 0,
            teamList: [],
            teamId: 0,
            leagueList: [],
            leagueId: 0,
            productTypeList: [],
            productTypeId: 0,
            brandList: [],
            brandId: 0,
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
        async postArticleSaleStats() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/economy/PostArticleSaleStats', _this.currentStatsObject)
			.then(function (articlesalestats) {
                _this.articleSaleStats = articlesalestats
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
            this.currentStatsObject.leagueId = 0
            this.currentStatsObject.productTypeId = 0
            this.currentStatsObject.brandId = 0
        },
    },
    async fetch () {
        try {
            const [ emptystatsobject, shops, countrylist, yearlist, monthlist, teamlist, leaguelist, producttypelist, brandlist ] = await Promise.all([
                this.$axios.$get('/webapi/Stats/GetEmptyStatsObject'),
                this.$axios.$get('/webapi/Shop/GetShopList'),
                this.$axios.$get('/webapi/Utility/GetCountryListDelivery'),
                this.$axios.$get('/webapi/Utility/GetYearList'),
                this.$axios.$get('/webapi/Utility/GetMonthList'),
                this.$axios.$get('/webapi/Metadata/GetTeamList'),
                this.$axios.$get('/webapi/metadata/GetLeagueList'),
                this.$axios.$get('/webapi/metadata/GetProductTypeList'),
                this.$axios.$get('/webapi/metadata/GetBrandList'),
            ])
            this.emptyStatsObject = emptystatsobject
            this.currentStatsObject = emptystatsobject
            this.shopOptionsList = shops.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
            this.countryList = countrylist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.yearList = yearlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.monthList = monthlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.teamList = teamlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.leagueList = leaguelist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.productTypeList = producttypelist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.brandList = brandlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
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
        font-size: 200%;
        font-weight: 700;
        line-height: 1;
    }
</style>