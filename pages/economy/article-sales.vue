<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
        </div>
    </div>
    <div v-else>
        <div id="sc-page-wrapper">
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
                        <ScCard class="uk-card-small">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Statistik
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div v-if="articleSaleStats" class="uk-overflow-auto" style="max-height:800px;">
                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove returnstatslist" style="border-collapse: separate;">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 50px;"></th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small uk-table-middle" style="text-align: left; width: 100px;">Lag</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small uk-table-middle" style="text-align: left; width: 100px;">Produktnamn</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small uk-table-middle" style="text-align: left; width: 80px;">Märke</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small uk-table-middle" style="text-align: left; width: 120px;">Art. nummer</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small uk-table-middle" style="text-align: right; width: 100px;">Ant sålda</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small uk-table-middle" style="text-align: right; width: 100px;">Försälj. ex.moms</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small uk-table-middle" style="text-align: right; width: 100px;">Bruttom kr</th>
                                                <th class="sticky-headers border-top border-bottom border-left border-right uk-text-small uk-table-middle" style="text-align: right; width: 100px;">Bruttom %</th>
                                            </tr>
                                            <tr>
                                                <th class="sticky-headers-2 border-bottom border-left uk-table-middle" style="color: #fff; text-align: left; width: 50px; background-color:#888;"></th>
                                                <th class="sticky-headers-2 border-bottom border-left uk-table-middle" style="color: #fff; text-align: left; width: 100px; background-color:#888;"></th>
                                                <th class="sticky-headers-2 border-bottom border-left uk-table-middle" style="color: #fff; text-align: left; width: 100px; background-color:#888;"></th>
                                                <th class="sticky-headers-2 border-bottom border-left uk-table-middle" style="color: #fff; text-align: left; width: 80px; background-color:#888;"></th>
                                                <th class="sticky-headers-2 border-bottom border-left uk-table-middle" style="color: #fff; text-align: left; width: 120px; background-color:#888;"></th>
                                                <th class="sticky-headers-2 border-bottom border-left uk-table-middle" style="color: #fff; text-align: right; width: 100px; background-color:#888;"><strong>{{ articleSaleStats.TotalItems | thousandsDelimiter }} st</strong></th>
                                                <th class="sticky-headers-2 border-bottom border-left uk-table-middle" style="color: #fff; text-align: right; width: 100px; background-color:#888;"><strong>{{ articleSaleStats.TotalValue | thousandsDelimiter }} kr</strong></th>
                                                <th class="sticky-headers-2 border-bottom border-left uk-table-middle" style="color: #fff; text-align: right; width: 100px; background-color:#888;"><strong>{{ articleSaleStats.TotalGrossMargin | thousandsDelimiter }} kr</strong></th>
                                                <th class="sticky-headers-2 border-bottom border-left border-right uk-table-middle" style="color: #fff; text-align: right; background-color:#888; width: 100px;"><strong>{{ articleSaleStats.GrossMarginPercent }} %</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="article in articleSaleStats.ArticleList" :key="article.ArticleId" class="uk-table-middle">
                                                <td class="border-bottom border-left" style="text-align: left; "><img :src="article.ImageName"></td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ article.Category }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ article.ProductName }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ article.BrandName }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ article.ArticleNumber }}</td>
                                                <td class="border-bottom border-left" style="text-align: right; ">{{ article.Quantity | thousandsDelimiter }}</td>
                                                <td class="border-bottom border-left" style="text-align: right; ">{{ article.TotalSale | thousandsDelimiter }}</td>
                                                <td class="border-bottom border-left" style="text-align: right; ">{{ article.GrossMargin | thousandsDelimiter }}</td>
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
                        <ScCard v-if="currentStatsObject" class="uk-card-small">
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
                                        <!-- LIGA -->
                                        <div class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-leagueList"
                                                    v-model="currentStatsObject.LeagueId"
                                                    :options="leagueList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Liga', 'closeOnSelect': true, 'allowClear': true }"
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
                                                    :settings="{ 'width': '100%', 'placeholder': 'Lag', 'closeOnSelect': true, 'allowClear': true }"
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
                                                    :settings="{ 'width': '100%', 'placeholder': 'Märke', 'closeOnSelect': true, 'allowClear': true }"
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
                                                    :settings="{ 'width': '100%', 'placeholder': 'Produkttyp', 'closeOnSelect': true, 'allowClear': true }"
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

                                        <div class="uk-width-1-1 uk-flex uk-flex-between uk-margin-medium-top">
                                            <div><button @click="postArticleSaleStats" class="sc-button sc-button-primary sc-button-mini uk-align-center">HÄMTA STATISTIK</button></div>
                                            <div><button @click="resetFilter" class="uk-align-center sc-button sc-button-mini" >NOLLSTÄLL</button></div>
                                        </div>
                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>
                        <ScCard v-if="articleSaleStats">
                            <ScCardBody class="uk-text-center md-bg-cyan-800">
                                <div class="uk-width-1-1">
                                    <div class="summary uk-light">{{ articleSaleStats.TotalValue | thousandsDelimiter }}</div>
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
            articleSaleStats: null,
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
        async postArticleSaleStats() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/economy/PostArticleSaleStats', _this.currentStatsObject)
			.then(function (articlesalestats) {
                articlesalestats.ArticleList.length == 0 ? UIkit.modal.dialog('<p class="uk-modal-body">Inga artiklar hittades!</p>') : null
                _this.articleSaleStats = articlesalestats
                _this.$store.dispatch('setBusyOff')
			})
			.catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
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
        this.$store.dispatch('setBusyOn')
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
            this.$store.dispatch('setBusyOff')
        } catch (err) {
            console.log(err);
            this.$store.dispatch('setBusyOff')
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
    .sticky-headers-2 {
        background: white;
        position: sticky;
        top: 36px; /* Don't forget this, required for the stickiness */
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
    .returnstatslist {
        table-layout: fixed;
    }
    .summary {
        font-size: 200%;
        font-weight: 700;
        line-height: 1;
    }
</style>