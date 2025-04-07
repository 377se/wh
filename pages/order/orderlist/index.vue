<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
        </div>
    </div>
    <div v-else>
                    <client-only>
        <div id="sc-page-wrapper">
            <div id="sc-page-top-bar" class="sc-top-bar">
                <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                    <div class="uk-flex-1">
                        <h1 class="sc-top-bar-title uk-display-inline">Orderlista</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">

                <ScCard :key="render">
                    <ScCardBody>
                        <div class="uk-margin-medium-bottom uk-padding-small uk-padding-remove-horizontal actionpanel" uk-sticky="offset: 45">
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
                                            <button v-waves.button.light class="sc-button sc-button-primary sc-button-small" @click.prevent="resetIsSelected">
                                                NOLLSTÄLL VAL
                                            </button>
                                        </div>
                                        <div>
                                            <button v-waves.button.light class="sc-button sc-button-primary sc-button-small" @click.prevent="selectTwentyOldest">
                                                VÄLJ 15 ÄLDSTA
                                            </button>
                                        </div>
                                        <div>
                                            <button v-waves.button.light class="sc-button sc-button-primary sc-button-small" @click.prevent="getPrintout">
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
                        <div uk-scrollspy="cls: uk-animation-fade; target: #sticky-down-right; delay: 500; repeat: true;">
                            <button
                                v-waves.button.light
                                class="sc-button sc-button-primary sc-button-small uk-margin-medium-top sticky-down-right"
                                href="#"
                                uk-totop
                                uk-scroll
                            >
                            </button>
                        </div>
                            <table v-for="(order, index) in orderList" :key="order.OrderId" class="uk-table uk-table-small uk-text-small uk-margin-remove orderlist">
                                <thead :class="{ 'hide': index !== 0 }">
                                    <tr class="uk-padding-remove-bottom">
                                        <th class="border-top border-left" style="width: 30px; padding: 0;"></th>
                                        <th class="border-top border-left" style="width: 30px; padding: 0;"></th>
                                        <th class="border-top border-left" style="width: 30px; padding: 0;"></th>
                                        <th class="border-top border-left" style="width: 30px; padding: 0;"></th>
                                        <th class="border-top border-left" style="width: 30px; padding: 0;"></th>
                                        <th class="border-top border-left" style="width: 30px; padding: 0;"></th>
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
                                        <td class="border-top border-left" style="width: 30px; padding: 0; text-align: center;"><input type="checkbox" v-model="order.IsSelected" @change="getSelectedOrders"></td>
                                        <td class="border-top border-left" style="width: 30px; padding: 0; text-align: center;"><span v-if="order.HasBeenPrinted" uk-tooltip="title: Utskriven"><i class="mdi mdi-printer sc-icon-18 md-color-green-600"></i></span></td>
                                        <td class="border-top border-left" style="width: 30px; padding: 0; text-align: center;"><span v-if="order.ContainsPrintedItem" uk-tooltip="title: Innehåller tryck"><i class="mdi mdi-tshirt-crew sc-icon-18 md-color-blue-600"></i></span></td>
                                        <td class="border-top border-left" style="width: 30px; padding: 0; text-align: center;"><span v-if="order.ContainsOnDemand" uk-tooltip="title: On demand"><i class="mdi mdi-ammunition sc-icon-18 md-color-yellow-600"></i></span></td>
                                        <td class="border-top border-left" style="width: 30px; padding: 0; text-align: center;"><span v-if="order.ContainsPreorder" uk-tooltip="title: Preorder"><i class="mdi mdi-pause-circle sc-icon-18 md-color-indigo-600"></i></span></td>
                                        <td class="border-top border-left" style="width: 30px; padding: 0; text-align: center;"><span v-if="order.IsBackorder" uk-tooltip="title: Restnoterad"><i class="mdi mdi-clock sc-icon-18 md-color-orange-600"></i></span></td>
                                        <td class="border-top border-left" style="text-align: left; width: 35px;"><Nuxt-Link :to="order.UrlOrder">{{ order.OrderId }}</Nuxt-Link></td>
                                        <td class="border-top border-left" style="text-align: left; width: 150px;">{{ order.OrderDate }}<br><div class="uk-label" :class="{'uk-label-success':!order.SupplierName.includes('Hämta'),'uk-label-warning':order.SupplierName.includes('Hämta')}">{{ order.SupplierName }}</div><br><div class="uk-label uk-label-default">{{ order.ClickId }}</div></td>
                                        <td class="border-top border-left" style="text-align: right; width: 70px;">{{ order.Ordersum }}</td>
                                        <td class="border-top border-left" style="width: 70px;">{{ order.Currency }}</td>
                                        <td class="border-top border-left" style="width: 70px;">{{ order.Voucher }}</td>
                                        <td class="border-top border-left" style="width: 200px;"><a :href="order.UrlCustomer">{{ order.CustomerName }}</a></td>
                                        <td class="border-top border-left border-right" style="width: 200px;">{{ order.Comment }}</td>
                                    </tr>
                                    <tr v-for="article in order.OrderItemList" :key="article.ItemId">
                                        <td class="border-top border-left" colspan="5"></td>
                                        <td class="border-top border-left" style="width: 50px;">
                                            <img :src="article.ImageName">
                                        </td>
                                        <td class="border-top border-left border-right" colspan="6">
                                            <div>{{ article.TeamName }}</div>
                                            <div>{{ article.ProductName }}</div>
                                            <div>{{ article.AddonValue }}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </ScCardBody>
                </ScCard>
            </div>
        </div>

        <div style="visibility: hidden; height: 0px; overflow: hidden;">
                <Deliverynotes :orders="orders" :isUnifaunTrue="true" @finishedprinting="getOrderList" :isPrintPickingList="true" ref="form" />
        </div>

        <!-- FAILED ACTIVATION MODAL -->

        <div id="failed-activation-modal" class="uk-modal" data-uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
                <h2 class="uk-modal-title">
                    {{ activationError ? activationError.Title : '' }}
                </h2>
                <p>{{ activationError ? activationError.Description : '' }}</p>
                <p class="uk-text-right">
                    <button class="sc-button sc-button-primary" type="button" @click="setOrderAsProcessed">
                        JAG HAR HANTERAT ORDERN
                    </button>
                </p>
            </div>
        </div>
</client-only>
    </div>
</template>

<script>
import Alert from '~/components/Alert'
import Deliverynotes from '~/components/Deliverynotes'

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
            orderDate: null,
            shopOptionsList: [],
            activationError: null,
            errors: null,
            message: '',
            render: false,
        }
    },
    watch: {
    },
    mounted() {
        if (!this.loaded) this.$fetch()
    },
    computed: {
        numberOfSelected: function () {
            let counter = 0;
            this.orderList.forEach(order => {
                if (order.IsSelected === true) counter++;
            })
            return counter
        },
        activationModal: function () {
            return UIkit.modal('#failed-activation-modal', {
                bgClose: false
            })
        },
    },
    methods: {
        getPrintout() {
            this.$refs.form.getPrintout()
        },
        getSelectedOrders() {
            let selectedOrders = []
            for (const order of this.orderList) {
                if (order.IsSelected === true) selectedOrders.push(order.OrderId)
            }
            this.orders = selectedOrders
        },
        selectTwentyOldest() {
            this.resetIsSelected()
            this.orderList
            .filter(order => {
                return !order.HasBeenPrinted && !order.ContainsPrintedItem
            })
            .filter((order, index) => {
                return index < 15
            })
            .forEach(order => {
                order.IsSelected = true
            })
            this.getSelectedOrders()
        },
        resetIsSelected () {
            this.orderList.forEach(order => {
                if (order.IsSelected === true) order.IsSelected = false
            })
            this.getSelectedOrders()
        },
        async setOrderAsDelivered() {
			let _this = this
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.commit('setAlertHidden', 2)
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/OrderHandling/SetOrderAsDelivered', _this.orderList)
			.then(function (orderlist) {
                try {
                    if (orderlist.ActivationError.OrderId != 0 ) {
                        _this.activationError = orderlist.ActivationError
                        _this.$store.dispatch('setBusyOff')
                        UIkit.modal('#failed-activation-modal', { 'bg-close': false }).show()
                    } else {
                        _this.$store.dispatch('setBusyOff')
                        _this.orderList = orderlist.ItemList
                        _this.message = 'Markerade ordrar är satt som levererade!'
                        _this.render = !_this.render
                        _this.resetIsSelected()
                        _this.$store.commit('setAlertVisible', 2)
                    }
                } catch(err) {
                    console.log('Error i try/catchen')
                }
			})
			.catch(function (error) {
                console.log('Error i catch: ', error)
                _this.$store.dispatch('setBusyOff')
			})
		},
        async setOrderAsProcessed() {
			let _this = this
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.commit('setAlertHidden', 2)
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/OrderHandling/SetOrderAsProcessed', _this.activationError)
			.then(function (orderlist) {
                if (orderlist.ActivationError.OrderId != 0 ) {
                    _this.activationError = orderlist.ActivationError
                    _this.$store.dispatch('setBusyOff')
                    _this.activationModal.show()
                } else {
                    _this.activationError = null
                    _this.orderList = orderlist.ItemList
                    _this.render = !_this.render
                    _this.$store.dispatch('setBusyOff')
                    _this.activationModal.hide()
                }
			})
			.catch(function (error) {
                console.log('Error i catch: ', error)
                _this.$store.dispatch('setBusyOff')
			})
		},
        async sendOrderDelayed() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/OrderHandling/PostSendOrderDelayed', _this.orderList)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.errors = response.ErrorList
                        _this.$store.dispatch('setBusyOff')
                        _this.resetIsSelected()
                        _this.$store.commit('setAlertVisible', 1)
                    } else {
                        _this.message = response.Message
                        _this.$store.dispatch('setBusyOff')
                        _this.resetIsSelected()
                        _this.$store.commit('setAlertVisible', 2)
                    }
                } catch(err) {
                    console.log(err)
                }
			})
			.catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
			})
		},
        async getOrderList() {
			let _this = this
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.commit('setAlertHidden', 2)
            _this.resetIsSelected()
            _this.orders = []
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$get('/webapi/Order/GetOrderlist?shopId=' + _this.shopId +'&orderdate=' + _this.orderDate + '&printStatus=0&hasPrint=0&preorderStatus=2&backorder=0&comment=0&sortorder=desc&pageNum=1')
			.then(function (orderlist) {
                if (orderlist.ActivationError.OrderId != 0 ) {
                    _this.activationError = orderlist.ActivationError
                    _this.$store.dispatch('setBusyOff')
                    _this.activationModal.show()
                } else {
                    _this.orderList = orderlist.ItemList
                    _this.resetIsSelected()
                    _this.$store.dispatch('setBusyOff')
                }
			})
			.catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
			})
		},
    },
    async fetch () {
        this.$store.dispatch('setBusyOn')
        try {
            const [ shops ] = await Promise.all([
                this.$axios.$get('/webapi/Shop/GetShopList'),
            ])
            this.shopOptionsList = shops.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
            if (this.$route.query.shopId || this.$route.query.orderDate) {
                if (this.$route.query.shopId) {
                    this.shopId = this.$route.query.shopId
                }
                if (this.$route.query.orderDate) {
                    this.orderDate = this.$route.query.orderDate
                }
                await this.getOrderList()
            }
        this.$store.dispatch('setBusyOff')
        } catch (err) {
            console.log(err)
            this.$store.dispatch('setBusyOff')
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
    .sticky-down-right {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1;
    }
</style>