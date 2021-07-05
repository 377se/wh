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
                <ScCard>
                    <ScCardBody>
                        <div class="uk-margin-medium-bottom uk-padding-small uk-padding-remove-horizontal">
                                <div class="uk-width-1-1">
                                    <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                    <client-only>
                                        <Select2
                                            id="select-shopOptionsList"
                                            v-model="shopId"
                                            :options="shopOptionsList"
                                            :settings="{ 'width': '100%', 'placeholder': 'Välj shop för att få ut leveranslista', 'closeOnSelect': true }"
                                            @select="getShippingStats"
                                        >
                                        </Select2>
                                    </client-only>
                                    </div>
                                </div>
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
                        </div>
                        <div v-if="shopId" class="uk-overflow-auto">
                            <table class="uk-table uk-table-small uk-text-small uk-margin-remove deliverylist">
                                <thead>
                                    <tr class="uk-padding-remove-bottom">
                                        <th colspan="2" class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 150px;"><strong>Senaste 30 dagarna</strong></th>
                                    </tr>
                                    <tr class="uk-padding-remove-bottom">
                                        <th class="border-bottom border-left uk-text-small" style="text-align: left; width: 150px;">Datum</th>
                                        <th class="border-bottom border-left border-right uk-text-small" style="text-align: left; width: 70px;">Antal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="delivery in deliveryList" :key="delivery.Id" class="uk-table-middle">
                                        <td class="border-bottom border-left" style="text-align: left; width: 150px;">{{ delivery.ItemDate }}</td>
                                        <td class="border-bottom border-left border-right" style="text-align: left; width: 70px;">{{ delivery.NumberOfItems }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </ScCardBody>
                </ScCard>
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
        async getShippingStats() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/Stats/GetShippingStats?shopId=' + _this.shopId)
			.then(function (deliverylist) {
                _this.deliveryList = deliverylist.ItemList
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
            const [ shops ] = await Promise.all([
                this.$axios.$get('/webapi/Shop/GetShopList'),
            ])
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