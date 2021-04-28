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
					    <img v-if="shopId" :src="shops.find(({ ShopId }) => ShopId === parseInt(this.shopId)).ImageName" class="uk-margin-medium-right"><h1 class="sc-top-bar-title uk-display-inline">Kategorier/Meny</h1>
				    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody>
                        <div class="uk-margin-medium-bottom uk-width-1-1">
                            <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                            <client-only>
                                <Select2
                                    id="select-shopOptionsList"
                                    v-model="shopId"
                                    :options="shopOptionsList"
                                    :settings="{ 'width': '100%', 'placeholder': 'Välj shop för att jobba med kategorier/meny', 'closeOnSelect': true }"
                                    @select="getMenuByShopId"
                                >
                                </Select2>
                            </client-only>
                            </div>
                        </div>
                        <div class="uk-flex">
                            <ScCard class="uk-width-2-3">
                                <ScCardHeader separator>
                                    <ScCardTitle>
                                        Sorteringslista - Dra för att ändra ordning/placering
                                    </ScCardTitle>
                                </ScCardHeader>
                                <ScCardBody>
                                    <Nested :SubItemList="menu" :shopId="parseInt(shopId)"/>
                                </ScCardBody>
                            </ScCard>
                            <ScCard class="uk-width-1-3 uk-padding-small-left">
                                <ScCardBody>
                                    <!-- {{ menu[0] }} -->
                                </ScCardBody>
                            </ScCard>
                        </div>
                    </ScCardBody>
                </ScCard>
            </div>
        </div>
    </div>
</template>

<script>
import Alert from '~/components/Alert'
import Nested from '~/components/nested'


export default {
    order: 15,
	components: {
		Alert,
		Nested,
		Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            shops: [],
            shopId: 0,
            shopOptionsList: [],
            menu: [],
            errors: null,
            message: '',
        }
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
        async getMenuByShopId() {
			let _this = this
            _this.menu = []
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/Menu/GetMenuByShopId?shopId=' + _this.shopId)
			.then(function (menu) {
                _this.menu = menu
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
            this.shops = shops
        } catch (err) {
            console.log(err);
        }
    },
}
</script>

<style>

</style>