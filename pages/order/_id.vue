<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
            {{ showPageOverlaySpinner() }}
        </div>
    </div>
    <div v-else>
        <div id="sc-page-wrapper">
            <div id="sc-page-top-bar" class="sc-top-bar">
                <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                    <div class="uk-flex-1">
                        <h1 class="sc-top-bar-title uk-display-inline">Order # {{ this.orderInfo.OrderId }}</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardHeader separator>
                        <div class="uk-flex uk-flex-middle">
                            <div class="uk-flex-1">
                                <ScCardTitle>
                                    Orderinformation
                                </ScCardTitle>
                            </div>
                            <ScCardActions>
                            </ScCardActions>
                        </div>
                    </ScCardHeader>
                    <ScCardBody class="uk-padding-remove-horizontal uk-padding-remove-vertical">
                        <table class="uk-table uk-table-hover uk-table-small uk-text-small">
                            <tbody>
                                <tr>
                                    <td class="border-bottom border-right uk-width-1-5">Kund</td>
                                    <td class="border-bottom uk-width-4-5">
                                        <div>{{ orderInfo.Address.FirstName }} {{ orderInfo.Address.LastName}}</div>
                                        <div>{{ orderInfo.Address.Address1 }}</div>
                                        <div>{{ orderInfo.Address.PostalCode }} {{ orderInfo.Address.City}}</div>
                                        <div>{{ orderInfo.Address.Country }}</div>
                                        <div>{{ orderInfo.Address.Email }}</div>
                                        <div>{{ orderInfo.Address.Mobile }}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border-bottom border-right uk-width-1-5">Orderdatum</td>
                                    <td class="border-bottom uk-width-4-5">{{ orderInfo.OrderDate }}</td>
                                </tr>
                                <tr>
                                    <td class="border-bottom border-right uk-width-1-5">Voucherkod</td>
                                    <td class="border-bottom uk-width-4-5">{{ orderInfo.Voucher }}</td>
                                </tr>
                                <tr>
                                    <td class="border-bottom border-right uk-width-1-5">Konto-id</td>
                                    <td v-if="orderInfo.AccountId" class="border-bottom uk-width-4-5">{{ orderInfo.AccountId }}</td>
                                    <td v-else class="border-bottom uk-width-4-5"><span class="uk-badge md-bg-gray-600">Denna order saknar information om provider-Id</span></td>
                                </tr>
                                <tr>
                                    <td class="border-bottom border-right uk-width-1-5">Trackingnummer</td>
                                    <td class="border-bottom uk-width-4-5">{{ orderInfo.TrackingNumber }}</td>
                                </tr>
                                <tr>
                                    <td class="border-bottom border-right uk-width-1-5">Betalningsmetod</td>
                                    <td class="border-bottom uk-width-4-5">{{ orderInfo.PaymentMethod }}, {{ orderInfo.Currency }}</td>
                                </tr>
                                <tr>
                                    <td class="border-bottom border-right uk-width-1-5">Leveransdatum</td>
                                    <td class="border-bottom uk-width-4-5">{{ orderInfo.ShippingDate }}</td>
                                </tr>
                                <tr>
                                    <td class="border-bottom border-right uk-width-1-5">Följesedel</td>
                                    <td class="border-bottom uk-width-4-5">{{ orderInfo.HasBeenPrinted ? 'Utskriven' : 'Ej utskriven' }}</td>
                                </tr>
                                <tr>
                                    <td class="border-bottom border-right uk-width-1-5">Status</td>
                                    <td class="border-bottom uk-width-4-5">
                                   	    <select v-model="orderInfo.StatusId" class="uk-select">
											<option v-for="statusId in orderInfo.StatusList" :key="statusId.Id" :value="statusId.Id">{{ statusId.Name }}</option>
										</select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border-right uk-width-1-5">Kommentar</td>
                                    <td class="uk-width-4-5">
                                        <textarea v-model="orderInfo.Comment" rows="7" cols="80" class="uk-width-1-1 uk-text-small"></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </ScCardBody>
                </ScCard>
                <ScCard class="uk-margin-large-top">
                    <ScCardHeader separator>
                        <div class="uk-flex uk-flex-middle">
                            <div class="uk-flex-1">
                                <ScCardTitle>
                                    Orderinnehåll
                                </ScCardTitle>
                            </div>
                        </div>
                    </ScCardHeader>
                    <ScCardBody class="uk-padding-remove-horizontal uk-padding-remove-vertical">
                        <table class="uk-table uk-table-small uk-text-small">
                            <thead>
                                <tr>
                                    <td class="border-bottom border-right"></td>
                                    <td class="border-bottom border-right"><strong>Produkt</strong></td>
                                    <td class="border-bottom border-right"><strong>Artikelnummer</strong></td>
                                    <td class="border-bottom border-right uk-text-center"><strong>Storlek</strong></td>
                                    <td class="border-bottom border-right uk-text-center"><strong>Antal</strong></td>
                                    <td class="border-bottom uk-text-right"><strong>Pris</strong></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="orderItem in orderContent.OrderItemList" :key="orderItem.ItemId" class="uk-table-middle">
                                    <td class="border-bottom border-right image-column-width"><img :src="orderItem.ImageName"></td>
                                    <td class="border-bottom border-right uk-width-auto">
                                        <nuxt-link :to="orderItem.Url">
                                            <div>{{ orderItem.TeamName }}</div>
                                            <div>{{ orderItem.ProductName }}</div>
                                        </nuxt-link>
                                    </td>
                                    <td class="border-bottom border-right uk-width-auto">{{ orderItem.ArticleNumber }}</td>
                                    <td class="border-bottom border-right uk-width-auto uk-text-center">{{ orderItem.SizeDisplay }}</td>
                                    <td class="border-bottom border-right uk-width-auto uk-text-center">{{ orderItem.Quantity }}</td>
                                    <td class="border-bottom border-right uk-width-auto uk-text-right">{{ orderItem.Price }} {{ orderInfo.Currency }}</td>
                                </tr>
                                <tr class="uk-table-middle">
                                    <td></td>
                                    <td></td>
                                    <td class="border-right"></td>
                                    <td class="border-bottom border-right uk-width-auto uk-text-right" colspan="2">Ordersumma</td>
                                    <td class="border-bottom border-right uk-width-auto uk-text-right">{{ orderContent.OrderSummary.OrderSum }} {{ orderInfo.Currency }}</td>
                                </tr>
                                <tr class="uk-table-middle">
                                    <td></td>
                                    <td></td>
                                    <td class="border-right"></td>
                                    <td class="border-bottom border-right uk-width-auto uk-text-right" colspan="2">
                                        <div>Frakt & hantering</div>
                                        <div><nuxt-link :to="'#'">Återbetala frakten</nuxt-link></div>
                                    </td>
                                    <td class="border-bottom border-right uk-width-auto uk-text-right">{{ orderContent.OrderSummary.ShippingAndHandling }} {{ orderInfo.Currency }}</td>
                                </tr>
                                <tr class="uk-table-middle">
                                    <td></td>
                                    <td></td>
                                    <td class="border-right"></td>
                                    <td class="border-bottom border-right uk-width-auto uk-text-right" colspan="2"><strong>Totalt</strong></td>
                                    <td class="border-bottom border-right uk-width-auto uk-text-right"><strong>{{ orderContent.OrderSummary.Total }} {{ orderInfo.Currency }}</strong></td>
                                </tr>
                                <tr class="uk-table-middle">
                                    <td></td>
                                    <td></td>
                                    <td class="border-right"></td>
                                    <td class="border-bottom border-right uk-width-auto uk-text-right" colspan="2">Varav moms</td>
                                    <td class="border-bottom border-right uk-width-auto uk-text-right">{{ orderContent.OrderSummary.Vat }} {{ orderInfo.Currency }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </ScCardBody>
                </ScCard>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
		return {
            errors: null,
            orderInfo: {},
            orderContent: {},
        }
    },
    watch: {

    },
	mounted: function () {

    },
    computed: {

    },
    methods: {
        async getMethod() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/Address/GetCountries')
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                        _this.$store.commit('setAlertVisible', 4)
                    } else {
                        _this.hidePageOverlaySpinner()
                        _this.$store.commit('setAlertHidden', 4)
                    }
                } catch(err) {
                    console.log(err)
                }
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
		},
        hidePageOverlaySpinner () {
            this.$store.commit('toggleProgressOverlay', false);
            this.$store.commit('togglePageOverlay', false)
        },
        showPageOverlaySpinner () {
            this.$store.commit('toggleProgressOverlay', true);
            this.$store.commit('togglePageOverlay', true)
        },
    },
    async fetch () {
        try {
            const [ orderInfo, orderContent ] = await Promise.all([
                this.$axios.$get('/webapi/Order/GetOrder?orderId=' + this.$route.params.id),
                this.$axios.$get('/webapi/Order/GetOrderContent?orderId=' + this.$route.params.id),
            ])
            this.orderInfo = orderInfo
            this.orderContent = orderContent
        } catch (err) {
            console.log(err);
        }
    },
}
</script>

<style lang="scss" scoped>
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
    .image-column-width {
        width: 50px;
    }
</style>