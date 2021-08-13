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
                        <h1 class="sc-top-bar-title uk-display-inline">Försäljning per kategori</h1>
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
                                    Försäljning per kategori (ex.moms)
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody :ref="renderAgain">
                                <!-- SALES BY CATEGORY -->
                                <div v-if="salesByCategory.length != 0" class="uk-margin-medium-top">
                                    <div class="uk-overflow-auto" style="max-height:600px;">
                                        <table class="uk-table uk-table-small uk-text-small uk-margin-remove" style="width:99.9%; position: relative; height:600px;">
                                            <thead>
                                                <tr class="uk-padding-remove-bottom">
                                                    <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 120px; border-collapse: collapse;">Kategori</th>
                                                    <th v-for="(year, index) in yearsContainer" :key="index" class="sticky-headers border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 120px; border-collapse: collapse;">{{ year }}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <template v-for="maincat in salesByCategory">
                                                    <tr class="uk-table-middle uk-relative" :key="maincat.CategoryId">
                                                        <td class="sticky-subheaders" style="text-align: left; border-collapse: collapse;">{{ maincat.Name }}</td>
                                                        <td v-for="year in maincat.SaleList" :key="year.Year" class="sticky-subheaders uk-text-small" style="text-align: right; width: 120px; border-collapse: collapse;">{{ parseInt(year.OrderTotal) | thousandsDelimiter }}</td>
                                                        <td v-for="(col, index) in yearsContainer.length - maincat.SaleList.length" :key="index" class="sticky-subheaders"></td>
                                                    </tr>
                                                    <tr v-for="cat in maincat.SubList" :key="cat.CategoryId" class="uk-table-middle">
                                                        <td class="border-left border-bottom borde-right" style="text-align: left; border-collapse: collapse; padding-left:30px;">{{ cat.Name }}</td>
                                                        <template v-for="year in yearsContainer">
                                                            <td v-if="getTotalForYearSubCat(year, cat.SaleList) != 0" :key="year" class="uk-text-small border-left border-bottom borde-right" style="text-align: right; width: 120px; border-collapse: collapse;">{{ parseInt(getTotalForYearSubCat(year, cat.SaleList))  | thousandsDelimiter }}</td>
                                                            <td v-else class="border-all" :key="year" style="text-align: right; width: 120px; border-collapse: collapse;">0</td>
                                                        </template>
                                                    </tr>
                                                </template>
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
                                                    v-model.number="currentStatsObject.shopId"
                                                    :options="shopList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Välj shop...', 'closeOnSelect': true, 'allowClear': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>

                                        <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-medium-top uk-margin-medium-bottom">
                                            <div><button @click="getSalesByCategory" class="sc-button sc-button-primary sc-button-mini uk-align-center uk-margin-medium-right">HÄMTA STATISTIK</button></div>
                                        </div>
                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>
                        <!-- <ScCardBody v-if="economyMonthlyReview" class="uk-text-center md-bg-cyan-800">
                            <div class="uk-width-1-1 uk-flex uk-flex-around uk-flex-wrap uk-padding-small">
                                <div class="uk-padding-small">
                                    <div class="summary uk-light">{{ parseInt(economyMonthlyReview.Ordersum | thousandsDelimiter) }}</div>
                                    <div class="uk-light">ex. moms</div>
                                    <div class="summary uk-light uk-margin-medium-top">{{ parseInt(economyMonthlyReview.Shipping | thousandsDelimiter) }}</div>
                                    <div class="uk-light">frakt ex. moms</div>
                                    <div class="summary uk-light uk-margin-medium-top">{{ parseInt(economyMonthlyReview.Total | thousandsDelimiter) }}</div>
                                    <div class="uk-light">totalt ex. moms</div>
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
            renderAgain: 0,
            emptyStatsObject: null,
            currentStatsObject: null,
            salesByCategory: [],
            yearsContainer: [],
            shopList: [],
            shopId: null,
        }
    },
    watch: {
    },
	mounted: function () {
    },
    computed: {
    },
    methods: {
        forceRender() {
            this.renderAgain = this.renderAgain + 1
        },
        hidePageOverlaySpinner () {
            this.$store.commit('toggleProgressOverlay', false);
            this.$store.commit('togglePageOverlay', false)
        },
        showPageOverlaySpinner () {
            this.$store.commit('toggleProgressOverlay', true);
            this.$store.commit('togglePageOverlay', true)
        },
        async getSalesByCategory() {
			let _this = this
            try {
            _this.showPageOverlaySpinner()
            const [ salesbycategory ] = await Promise.all([
                this.$axios.$post('/webapi/Economy/SalesByCategory', _this.currentStatsObject),
            ])
			    _this.salesByCategory = salesbycategory
                _this.forceRender()
                _this.getMaxNumberColumns(salesbycategory)
                _this.hidePageOverlaySpinner()
            } catch (err) {
                console.log(err);
            }
		},
        getMaxNumberColumns(salesbycategory) {
            this.yearsContainer = []
            salesbycategory.forEach(levelone => {
                levelone.SaleList.forEach(year => {
                    levelone.SaleList.length > this.yearsContainer.length ? this.yearsContainer.push(year.Year) : ''
                })
            })
        },
        getTotalForYearSubCat(year, salelist) {
            let orderTotal = 0
            let foundYear = salelist.find( ({ Year }) => { return Year == year })
            return foundYear ? foundYear.OrderTotal : 0
        },
    },
    async fetch () {
        try {
            const [ emptystatsobject, shoplist ] = await Promise.all([
                this.$axios.$get('/webapi/Stats/GetEmptyStatsObject'),
                this.$axios.$get('/webapi/Shop/GetShopList'),
            ])
            this.emptyStatsObject = emptystatsobject
            this.currentStatsObject = emptystatsobject
            this.shopList = shoplist.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
        } catch (err) {
            console.log(err);
        }
    },
}
</script>

<style lang="scss" scoped>
    .sticky-headers {
        background: #00838F;
        color: white;
        position: sticky;
        top: 0px;
        z-index: 10;
    }
    .sticky-subheaders {
        background: #00838F;
        color: white;
        outline: 1px solid #ccc;
        position: sticky;
        top: 35px;
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
    .summary {
        font-size: 200%;
        font-weight: 700;
        line-height: 1;
    }
    .linkstyle {
        color: #0088CC;
        cursor: pointer;
    }
</style>