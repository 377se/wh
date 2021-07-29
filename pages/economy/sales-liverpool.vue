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
                        <h1 class="sc-top-bar-title uk-display-inline">Försäljning Liverpool</h1>
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
                                    Försäljning Liverpool (ex.moms)
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <!-- SWEDISH BRANCH STATS -->
                                <div v-if="liverpoolStats">
                                    <div v-for="shop in liverpoolStats" :key="shop.ShopId" class="uk-overflow-auto">
                                        <br>
                                        <table class="uk-table uk-table-small uk-text-small uk-margin-remove" style="table-layout: fixed;">
                                            <thead>
                                                <tr class="uk-padding-remove-bottom">
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 120px;">{{ shop.ShopName }}</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 50px;">Jan</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 50px;">Feb</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 50px;">Mar</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 50px;">Apr</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 50px;">Maj</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 50px;">Jun</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 50px;">Jul</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 50px;">Aug</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 50px;">Sep</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 50px;">Okt</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 50px;">Nov</th>
                                                    <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 50px;">Dec</th>
                                                    <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 80px;">Tot</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(brand, index) in shop.Sales" :key="index" class="uk-table-middle">
                                                    <td class="border-bottom border-left" style="text-align: left;">{{ brand.BrandName }}</td>
                                                    <td class="border-bottom border-left" style="text-align: right;">{{ brand.Jan }}</td>
                                                    <td class="border-bottom border-left" style="text-align: right;">{{ brand.Feb }}</td>
                                                    <td class="border-bottom border-left" style="text-align: right;">{{ brand.Mar }}</td>
                                                    <td class="border-bottom border-left" style="text-align: right;">{{ brand.Apr }}</td>
                                                    <td class="border-bottom border-left" style="text-align: right;">{{ brand.May }}</td>
                                                    <td class="border-bottom border-left" style="text-align: right;">{{ brand.Jun }}</td>
                                                    <td class="border-bottom border-left" style="text-align: right;">{{ brand.Jul }}</td>
                                                    <td class="border-bottom border-left" style="text-align: right;">{{ brand.Aug }}</td>
                                                    <td class="border-bottom border-left" style="text-align: right;">{{ brand.Sep }}</td>
                                                    <td class="border-bottom border-left" style="text-align: right;">{{ brand.Oct }}</td>
                                                    <td class="border-bottom border-left" style="text-align: right;">{{ brand.Nov }}</td>
                                                    <td class="border-bottom border-left" style="text-align: right;">{{ brand.Dec }}</td>
                                                    <td class="border-bottom border-left border-right" style="text-align: right;">{{ brand.TotalSales }}</td>
                                                </tr>
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
                                        <!-- ÅR -->
                                        <div class="uk-margin-medium-top sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-yearList"
                                                    v-model.number="yearId"
                                                    :options="yearList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'År', 'closeOnSelect': true, 'allowClear': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>

                                        <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-medium-top uk-margin-medium-bottom">
                                            <div><button @click="getLiverPoolStats" class="sc-button sc-button-primary sc-button-mini uk-align-center uk-margin-medium-right">HÄMTA STATISTIK</button></div>
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
            liverpoolStats: null,
            gamedayStats: null,
            kopshopStats: null,
            sammyStats: null,
            laxenStats: null,
            spStats: null,
            yearList: [],
            yearId: null,
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
        async getLiverPoolStats() {
			let _this = this
            _this.showPageOverlaySpinner()
            try {
            const [ liverpoolstats ] = await Promise.all([
                this.$axios.$get('/webapi/Economy/GetLiverpoolSales?year=' + _this.yearId),
            ])
			    _this.liverpoolStats = liverpoolstats
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
            ])
            this.emptyStatsObject = emptystatsobject
            this.currentStatsObject = emptystatsobject
            this.yearList = yearlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
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
    .summary {
        font-size: 200%;
        font-weight: 700;
        line-height: 1;
    }
</style>