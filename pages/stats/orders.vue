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
                                            >
                                            </Select2>
                                        </client-only>
                                        </div>
                                        <!-- DATUM -->
                                        <div class="uk-margin">
                                            <ScInput v-model="orderDate" v-flatpickr="{ 'locale': Swedish }" placeholder="Välj datum..." state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Datum</label>
                                            </ScInput>
                                        </div>
                                        <div class="uk-margin">
                                            <button type="button" class="uk-button uk-button-small uk-align-center" @click="getOrderList()">Hämta</button>
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
                                            <th class="border-top border-left uk-text-small" style="text-align: left; width: 100px;">ClickId</th>
                                            <th class="border-top border-left uk-text-small" style="text-align: left; width: 35px;">OrderId</th>
                                            <th class="border-top border-left uk-text-small" style="text-align: left; width: 150px;">Orderdatum</th>
                                            <th class="border-top border-left uk-text-small" style="text-align: right; width: 70px;">Summa</th>
                                            <th class="border-top border-left uk-text-small" style="width: 70px;">Valuta</th>
                                            <th class="border-top border-left uk-text-small" style="text-align: left; width: 200px;">Kund</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="uk-table-middle">
                                            <td class="border-top border-left" style="text-align: left; width: 100px;">{{ order.ClickId }}</td>
                                            <td class="border-top border-left" style="text-align: left; width: 35px;"><Nuxt-Link :to="order.UrlOrder">{{ order.OrderId }}</Nuxt-Link></td>
                                            <td class="border-top border-left" style="text-align: left; width: 150px;">{{ order.OrderDate }}</td>
                                            <td class="border-top border-left" style="text-align: right; width: 70px;">{{ order.Ordersum }}</td>
                                            <td class="border-top border-left" style="width: 70px;">{{ order.Currency }}</td>
                                            <td class="border-top border-left" style="width: 200px;"><a :href="order.UrlCustomer">{{ order.CustomerName }}</a></td>
                                        </tr>
                                        <!--tr v-for="article in order.OrderItemList" :key="article.ItemId">
                                            <td class="border-top border-left" colspan="5"></td>
                                            <td class="border-top border-left" style="width: 50px;">
                                                <img :src="article.ImageName">
                                            </td>
                                            <td class="border-top border-left border-right" colspan="6">
                                                <div>{{ article.TeamName }}</div>
                                                <div>{{ article.ProductName }}</div>
                                                <div>{{ article.AddonValue }}</div>
                                            </td>
                                        </tr-->
                                    </tbody>
                                </table>
                            </div>
                        </ScCardBody>
                    </ScCard>
                </div>
            </div>
        </client-only>
    </div>
</template>

<script>
import Alert from '~/components/Alert'
import { Swedish } from "flatpickr/dist/l10n/sv.js"
import ScInput from '~/components/Input'

export default {
	components: {
		Alert,
        ScInput,
		Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            orderList: [],
            orders: [],
            shopId: null,
            orderDate: new Date().toLocaleDateString('sv-SE'),
            shopOptionsList: [],
            activationError: null,
            errors: null,
            message: '',
            render: false,
        }
    },
    methods: {
        async getOrderList() {
            if(!this.orderDate || !this.shopId){
                alert('Välj shop och datum!')
            }else{
                let _this = this
                _this.$store.commit('setAlertHidden', 1)
                _this.$store.commit('setAlertHidden', 2)
                _this.orders = []
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$get('/webapi/Stats/GetOrderStatistics?shopId=' + _this.shopId +'&orderdate='+_this.orderDate)
                .then(function (orderlist) {
                _this.orderList = orderlist
                _this.$store.dispatch('setBusyOff')
                    
                })
                .catch(function (error) {
                    console.log(error)
                    _this.$store.dispatch('setBusyOff')
                })
            }
		},
        
    },
    async fetch () {
        this.$store.dispatch('setBusyOn')
        try {
            const [ shops ] = await Promise.all([
                await this.$axios.$get('/webapi/Shop/GetShopList'),
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