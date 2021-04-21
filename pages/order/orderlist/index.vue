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
                        <div class="uk-overflow-auto">
                            <table v-for="(order, index) in orderList" :key="order.OrderId" class="uk-table uk-table-small uk-text-small uk-margin-remove">
                                <thead :class="{ 'hide': index !== 0 }">
                                    <tr class="uk-padding-remove-bottom">
                                        <th class="border-top border-left" style="width: 15px;"></th>
                                        <th class="border-top border-left" style="width: 15px;"></th>
                                        <th class="border-top border-left" style="width: 15px;"></th>
                                        <th class="border-top border-left" style="width: 15px;"></th>
                                        <th class="border-top border-left uk-text-small" style="text-align: left;">OrderId</th>
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
                                        <td class="border-top border-left" style="width: 15px;"><input type="checkbox"></td>
                                        <td class="border-top border-left" style="width: 15px;"><span v-if="order.HasBeenPrinted"><i class="mdi mdi-printer sc-icon-18"></i></span></td>
                                        <td class="border-top border-left" style="width: 15px;"><span v-if="order.ContainsPrintedItem"><i class="mdi mdi-tshirt-crew sc-icon-18"></i></span></td>
                                        <td class="border-top border-left" style="width: 15px;"><span v-if="order.ContainsPreorder"><i class="mdi mdi-pause-circle sc-icon-18"></i></span></td>
                                        <td class="border-top border-left" style="text-align: left;"><Nuxt-Link :to="order.UrlOrder">{{ order.OrderId }}</Nuxt-Link></td>
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
    </div>
</template>

<script>

export default {
    data () {
		return {
            orderList: null,
            errors: null,
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
            const [ orderList ] = await Promise.all([
                this.$axios.$get('/webapi/Order/GetOrderlist?shopId=2&orderdate=2021-04-14&printStatus=0&hasPrint=0&preorderStatus=2&backorder=0&comment=0&sortorder=desc&pageNum=1'),
            ])
            this.orderList = orderList
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
</style>