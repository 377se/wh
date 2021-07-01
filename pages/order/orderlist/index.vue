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
                        <h1 class="sc-top-bar-title uk-display-inline">Orderlista</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody>
                        <div class="uk-margin-medium-bottom uk-padding-small uk-padding-remove-horizontal actionpanel" uk-sticky="offset: 60">
                                <div class="uk-margin-medium-bottom uk-width-1-1">
                                    <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                    <client-only>
                                        <Select2
                                            id="select-shopOptionsList"
                                            v-model="shopId"
                                            :options="shopOptionsList"
                                            :settings="{ 'width': '100%', 'placeholder': 'Välj shop för att få ut orderlista', 'closeOnSelect': true }"
                                            @select="getOrderList"
                                        >
                                        </Select2>
                                    </client-only>
                                    </div>
                                </div>
                            <div v-if="shopId">
                                <div class="uk-grid-small uk-flex-between" uk-grid>
                                    <div class="uk-width-auto">
                                        <div class="sc-button sc-button-disabled sc-button-small">
                                                Markerade ordrar: {{ numberOfSelected }}
                                        </div>
                                    </div>
                                    <div class="uk-width-auto uk-grid-small uk-flex-right" uk-grid>
                                        <div>
                                            <button v-waves.button.light class="sc-button sc-button-primary sc-button-small" @click.prevent="printDeliveryNotes('all-delivery-notes')">
                                                SKRIV UT FÖLJESEDEL
                                            </button>
                                        </div>
                                        <div>
                                            <button v-waves.button.light class="sc-button sc-button-primary sc-button-small" @click.prevent="setOrderAsDelivered()">
                                                SÄTT SOM LEVERERAT
                                            </button>
                                        </div>
                                        <div>
                                            <button v-waves.button.light class="sc-button sc-button-primary sc-button-small" @click.prevent="sendOrderDelayed()">
                                                FÖRSENAD ORDER
                                            </button>
                                        </div>
                                    </div>
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
                            <table v-for="(order, index) in orderList" :key="order.OrderId" class="uk-table uk-table-small uk-text-small uk-margin-remove orderlist">
                                <thead :class="{ 'hide': index !== 0 }">
                                    <tr class="uk-padding-remove-bottom">
                                        <th class="border-top border-left" style="width: 15px;"></th>
                                        <th class="border-top border-left" style="width: 15px;"></th>
                                        <th class="border-top border-left" style="width: 15px;"></th>
                                        <th class="border-top border-left" style="width: 15px;"></th>
                                        <th class="border-top border-left uk-text-small" style="text-align: left; width: 35px;">OrderId</th>
                                        <th class="border-top border-left uk-text-small" style="text-align: left; width: 150px;">Orderdatum</th>
                                        <th class="border-top border-left uk-text-small" style="text-align: right; width: 70px;">Summa</th>
                                        <th class="border-top border-left uk-text-small" style="width: 70px;">Valuta</th>
                                        <th class="border-top border-left uk-text-small" style="width: 70px;">Voucher</th>
                                        <th class="border-top border-left uk-text-small" style="text-align: left; width: 200px;">Kund</th>
                                        <th class="border-top border-left border-right uk-text-small" style="text-align: left; width: 200px;">Kommentar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="uk-table-middle">
                                        <td class="border-top border-left" style="width: 15px;"><input type="checkbox" v-model="order.IsSelected"></td>
                                        <td class="border-top border-left" style="width: 15px;"><span v-if="order.HasBeenPrinted"><i class="mdi mdi-printer sc-icon-18"></i></span></td>
                                        <td class="border-top border-left" style="width: 15px;"><span v-if="order.ContainsPrintedItem"><i class="mdi mdi-tshirt-crew sc-icon-18"></i></span></td>
                                        <td class="border-top border-left" style="width: 15px;"><span v-if="order.ContainsPreorder"><i class="mdi mdi-pause-circle sc-icon-18"></i></span></td>
                                        <td class="border-top border-left" style="text-align: left; width: 35px;"><Nuxt-Link :to="order.UrlOrder">{{ order.OrderId }}</Nuxt-Link></td>
                                        <td class="border-top border-left" style="text-align: left; width: 150px;">{{ order.OrderDate }}</td>
                                        <td class="border-top border-left" style="text-align: right; width: 70px;">{{ order.Ordersum }}</td>
                                        <td class="border-top border-left" style="width: 70px;">{{ order.Currency }}</td>
                                        <td class="border-top border-left" style="width: 70px;">{{ order.Voucher }}</td>
                                        <td class="border-top border-left" style="width: 200px;"><a :href="order.UrlCustomer">{{ order.CustomerName }}</a></td>
                                        <td class="border-top border-left border-right" style="width: 200px;">{{ order.Comment }}</td>
                                    </tr>
                                    <tr v-for="article in order.OrderItemList" :key="article.ItemId">
                                        <td class="border-top border-left" colspan="4"></td>
                                        <td class="border-top border-left" style="width: 50px;">
                                            <img :src="article.ImageName">
                                        </td>
                                        <td class="border-top border-left border-right" colspan="6">
                                            {{ article.TeamName }}<br>
                                            {{ article.ProductName }}<br>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </ScCardBody>
                </ScCard>
            </div>
        </div>
        <Deliverynotes :orders="this.orders" :isUnifaunTrue="true" />
    </div>
</template>

<script>
import Alert from '~/components/Alert'
import Deliverynotes from '~/components/Deliverynotes'
import Print from '~/plugins/directives/vue-print-nb/printarea.js'

export default {
	components: {
		Alert,
		Deliverynotes,
		Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            orderList: [],
            orders: [],
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
        numberOfSelected: function () {
            let counter = 0;
            for (const order of this.orderList) {
                if (order.IsSelected === true) counter++;
            }
            return counter
        },
    },
    methods: {
        printDeliveryNotes(id) {
            let selectedOrders = []
            for (const order of this.orderList) {
                if (order.IsSelected === true) selectedOrders.push(order.OrderId)
            }
            this.orders = selectedOrders
            setTimeout(() => {
                new Print({
                    ids: id, // * Partial printing must pass in id
                    standard: '', // Document type, default is html5, optional html5, loose, strict
                    extraHead: '', // Additional tags attached to the head tag, separated by commas
                    extraCss: '', // Additional CSS, separated by multiple commas
                    popTitle: '', // iframe title
                    endCallback () { // Callback event after printing
                    }
                })
            }, 500)
        },
        resetIsSelected () {
            for (const order of this.orderList) {
                if (order.IsSelected === true) order.IsSelected = false
            }
        },
        async setOrderAsDelivered() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/OrderHandling/PostSetOrderAsDelivered', _this.orderList)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.errors = response.ErrorList
                        _this.hidePageOverlaySpinner()
                        _this.resetIsSelected()
                        _this.$store.commit('setAlertVisible', 1)
                    } else {
                        _this.orderList = response
                        _this.message = 'Markerade ordrar är satt som levererade!'
                        _this.hidePageOverlaySpinner()
                        _this.resetIsSelected()
                        _this.$store.commit('setAlertVisible', 2)
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
        async sendOrderDelayed() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/OrderHandling/PostSendOrderDelayed', _this.orderList)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.errors = response.ErrorList
                        _this.hidePageOverlaySpinner()
                        _this.resetIsSelected()
                        _this.$store.commit('setAlertVisible', 1)
                    } else {
                        _this.message = response.Message
                        _this.hidePageOverlaySpinner()
                        _this.resetIsSelected()
                        _this.$store.commit('setAlertVisible', 2)
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
        async getOrderList() {
			let _this = this
            _this.resetIsSelected()
            _this.orders = []
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/Order/GetOrderlist?shopId=' + _this.shopId +'&orderdate=2021-04-14&printStatus=0&hasPrint=0&preorderStatus=2&backorder=0&comment=0&sortorder=desc&pageNum=1')
			.then(function (orderlist) {
                _this.orderList = orderlist
                _this.resetIsSelected()
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
    .hide {
        display: none;
    }
    .actionpanel {
        background-color: #fff;
    }
    .orderlist {
        table-layout: fixed;
    }
</style>