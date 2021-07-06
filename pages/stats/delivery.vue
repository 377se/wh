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
                        <h1 class="sc-top-bar-title uk-display-inline">Leveranser</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <div class="uk-grid uk-grid-medium" uk-grid uk-margin>
                    <div class="uk-width-1-1 uk-width-2-3@m">
                        <ScCard>
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    30 senaste dagarna
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div v-if="deliveryList" class="uk-overflow-auto">
                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove deliverylist">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 150px;">Datum</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 70px;">Antal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="delivery in deliveryList.ItemList" :key="delivery.Id" class="uk-table-middle">
                                                <td class="border-bottom border-left" style="text-align: left; width: 150px;">{{ delivery.ItemDate }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; width: 70px;">{{ delivery.NumberOfItems }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <div class="uk-width-1-1 uk-width-1-3@m uk-flex-first uk-flex-last@m">
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
                                        <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <client-only>
                                                <Select2
                                                    id="select-shopOptionsList"
                                                    v-model="currentStatsObject.ShopId"
                                                    :options="shopOptionsList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Välj shop för att få ut leveranslista', 'closeOnSelect': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                            <button @click="postShippingStats" class="uk-button uk-margin-large-top uk-align-center">HÄMTA STATISTIK</button>
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
            deliveryList: [],
            shopId: null,
            shopOptionsList: [],
            errors: null,
            message: '',
            emptyStatsObject: {},
            currentStatsObject: {},
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
        async postShippingStats() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Stats/PostShippingStats', _this.currentStatsObject)
			.then(function (deliverylist) {
                _this.deliveryList = deliverylist
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
            const [ emptystatsobject, shops ] = await Promise.all([
                this.$axios.$get('/webapi/Stats/GetEmptyStatsObject'),
                this.$axios.$get('/webapi/Shop/GetShopList'),
            ])
            this.emptyStatsObject = emptystatsobject
            this.currentStatsObject = emptystatsobject
            this.shopOptionsList = shops.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
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
    .deliveryList {
        table-layout: fixed;
    }
</style>