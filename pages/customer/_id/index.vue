<template>
<div v-if="$fetchState.pending">
	<div id="sc-page-wrapper">
	</div>
</div>
<div v-else>
 	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
				<div class="uk-flex-1">
						<img :src="this.customer.ImageName" alt="Shop-logo" class="uk-margin-medium-right"><h1 class="sc-top-bar-title uk-display-inline"> {{ customer.FirstName }} {{ customer.LastName }}</h1>
				</div>
			</div>
		</div>
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
                <div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
                    <!-- CUSTOMER -->
                    <div>
                        <ScCard>
                            <ScCardHeader separator>
                                <div class="uk-flex uk-flex-middle">
                                    <div class="uk-flex-1">
                                        <ScCardTitle>
                                            {{ customer.FirstName }} {{ customer.LastName }}
                                        </ScCardTitle>
                                    </div>
                                    <ScCardActions>

                                    </ScCardActions>
                                </div>
                            </ScCardHeader>
                            <ScCardContent>
                                <ScCardBody>
                                    <!-- Kundnummer -->
                                    <ScInput :value="customer.CustomerId.toString()" state="fixed" mode="outline" :disabled="true" extra-classes="uk-form-small">
                                    </ScInput>
                                    <!-- MedlemsId -->
                                    <Alert
                                        v-if="this.customer.ErrorList != null"
                                        :errorlist="this.customer.ErrorList"
                                        :message=null
                                        :alertClass="alertClass"
                                        id=0
                                    />
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.MemberId" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>MedlemsId</label>
                                        </ScInput>
                                    </div>
                                    <!-- Förnamn -->
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.FirstName" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Förnamn</label>
                                        </ScInput>
                                    </div>
                                    <!-- Efternamn -->
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.LastName" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Efternamn</label>
                                        </ScInput>
                                    </div>
                                    <!-- Email -->
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.Email" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Email</label>
                                        </ScInput>
                                    </div>
                                    <!-- Mobilnummer -->
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.CellPhone" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Mobilnummer</label>
                                        </ScInput>
                                    </div>
                                    <!-- Rabattsats -->
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.Discount" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Rabattsats</label>
                                        </ScInput>
                                    </div>
                                    <!-- Senaste inloggningen -->
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.LatestLogin" state="fixed" mode="outline"  extra-classes="uk-form-small" :disabled="true">
                                            <label>Senaste inloggningen</label>
                                        </ScInput>
                                    </div>
                                    <!-- Antal inloggningar -->
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.NumberOfLogin" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                                            <label>Antal inloggningar</label>
                                        </ScInput>
                                    </div>
                                    <button v-waves.button.light class="sc-button sc-button-primary uk-margin-large-bottom" @click.prevent="updateCustomer()">
                                        UPPDATERA
                                    </button>
                                    <div>
                                        <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="getResetLink()">
                                            GENERERA ÅTERSTÄLLNINGSLÄNK
                                        </button>
                                        <div v-if="resetLinkVisible" class="uk-margin-medium-top">
                                            <p>Följande länk har genererats och är giltig i 24 timmar: </p><p>{{ this.resetLink }}</p>
                                            <button @click.prevent="resetLinkVisible = false" class="sc-button sc-button-primary waves-effect waves-button waves-light" type="button">
                                                OK
                                            </button>
                                        </div>
                                    </div>
                                </ScCardBody>
                            </ScCardContent>
                        </ScCard>
                    </div>
                    <!-- ORDRAR & COINS -->
                    <div>
                        <!-- ORDRAR -->
                        <div>
                            <ScCard>
                                <ScCardHeader separator>
                                    <div class="uk-flex uk-flex-middle">
                                        <div class="uk-flex-1">
                                            <ScCardTitle>
                                                Ordrar
                                            </ScCardTitle>
                                        </div>
                                        <ScCardActions>
                                        </ScCardActions>
                                    </div>
                                </ScCardHeader>
                                <ScCardContent>
                                    <ScCardBody v-if="orderList.length > 0">
                                        <VueGoodTable
                                            :columns="this.columnsOrderList"
                                            :rows="this.orderListAsChildren"
                                            style-class="vgt-table"
                                            :row-style-class="rowStyleClassFn"
                                            :group-options="{
                                                enabled: true,
                                                headerPosition: 'bottom',
                                            }"
                                        >
                                            <template slot="table-row" slot-scope="props">
                                                <nuxt-link v-if="props.column.field === 'OrderId'" :to="props.row.UrlOrder">
                                                    <span
                                                        class="uk-badge"
                                                        :class="{
                                                            'md-bg-blue-600': props.row.StatusId == 1
                                                            && props.row.StatusId == 2,
                                                            'md-bg-green-600': props.row.StatusId > 2
                                                        }"
                                                        >
                                                        {{ props.row.OrderId }}
                                                    </span>
                                                </nuxt-link>
                                                <span v-else-if="props.column.field === 'OrderDate'">
                                                        {{ props.row.OrderDate }}
                                                </span>
                                                <span v-else-if="props.column.field === 'PaymentMethod'">
                                                    {{ props.row.PaymentMethod }}
                                                </span>
                                                <span v-else-if="props.column.field === 'Voucher'">
                                                    {{ props.row.Voucher }}
                                                </span>
                                                <span v-else>
                                                    {{ props.row.Ordersum | thousandsDelimiter }} {{ props.row.Currency ? props.row.Currency : null }}
                                                </span>
                                            </template>
                                        </VueGoodTable>
                                        <button @click.prevent="showAllOrders = !showAllOrders" class="uk-margin-medium-top uk-align-right sc-button sc-button-mini">
										    {{ showAllOrders ? 'Visa bara färdiga ordrar' : 'Visa alla'}}
									    </button>
                                    </ScCardBody>
                                </ScCardContent>
                            </ScCard>
                        </div>
                        <!-- COINS -->
                        <div class="uk-margin-medium-top">
                            <ScCard>
                                <ScCardHeader separator>
                                    <div class="uk-flex uk-flex-middle">
                                        <div class="uk-flex-1">
                                            <ScCardTitle>
                                                Nuvarande antal coins: {{ coins.TotalCoins }}
                                            </ScCardTitle>
                                        </div>
                                        <ScCardActions>
                                        </ScCardActions>
                                    </div>
                                </ScCardHeader>
                                <ScCardContent>
                                    <ScCardBody>
                                        <Alert 
                                            v-if="this.coins.ErrorList != null || this.coins.Message != null"
                                            :errorlist="this.coins.ErrorList"
                                            :message="String(this.coins.Message)"
                                            :alertClass="alertClass"
                                            id=1
                                        />
                                        <div class="uk-margin">
                                            <ScInput v-model="coins.Coins" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Antal</label>
                                            </ScInput>
                                        </div>
                                        <div class="uk-margin">
                                            <ScInput v-model="coins.Description" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Beskrivning</label>
                                            </ScInput>
                                        </div>
                                        <div class="uk-margin">
                                            <ScInput v-model="coins.ValidThru" v-flatpickr="{ 'locale': Swedish }" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Giltiga t.o.m.</label>
                                            </ScInput>
                                        </div>
                                        <button v-waves.button.light class="uk-margin-large-bottom sc-button sc-button-primary" @click="updateCoins()">
                                            UPPDATERA
                                        </button>

                                        <VueGoodTable
                                            v-if="updateTheBloodyTable == true"
                                            :columns="this.columnsCoinEvents"
                                            :rows="this.coins.EventList"
                                            style-class="vgt-table"
                                        >
                                            <template slot="table-row" slot-scope="props">
                                                <span v-if="props.column.field === 'CreatedDate'">
                                                        {{ props.row.CreatedDate }}
                                                </span>
                                                <span v-else-if="props.column.field === 'Description'">
                                                    {{ props.row.Description }}
                                                </span>
                                                <span v-else-if="props.column.field === 'Value'">
                                                    {{ props.row.Value }}
                                                </span>
                                                <span v-else>
                                                    {{ props.row.AdminName }}
                                                </span>
                                            </template>
                                        </VueGoodTable>
                                    </ScCardBody>
                                </ScCardContent>
                            </ScCard>
                        </div>
                    </div>
                </div>
				</ScCardBody>
			</ScCard>
		</div>
    </div>
</div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ScInput from '~/components/Input'
import Alert from '~/components/Alert'
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import { Swedish } from "flatpickr/dist/l10n/sv.js"

if(process.client) {
	require('~/plugins/flatpickr');
}

export default {
	components: {
		ScInput,
		VueGoodTable,
		Alert,
    },
	data () {
		return {
			customer: {},
            orderList: [],
            coins: [],
            resetLink: '',
            resetLinkVisible: false,
            showAllOrders: false,
            updateTheBloodyTable: true,
            Swedish,
            alertClass: '',
        }
    },
    computed: {
		...mapGetters({
			alerts: 'alertsState'
		}),
		columnsOrderList () {
			return [
				{
					label: 'OrderId',
					field: 'OrderId',
					sortable: false,
                    type: 'number',
                    thClass: 'uk-text-left vgt-th',
					tdClass: 'uk-text-left',
                    width: '60px',
				},
				{
					label: 'Orderdatum',
					field: 'OrderDate',
					sortable: false,
					type: 'string',
					thClass: 'uk-text-left vgt-th',
					tdClass: 'uk-text-left',
                    width: '80px',
				},
				{
					label: 'Betalmetod',
					field: 'PaymentMethod',
					sortable: false,
					type: 'string',
					thClass: 'uk-text-left vgt-th',
					tdClass: 'uk-text-left',
                    width: '90px',
				},
				{
					label: 'Voucher',
					field: 'Voucher',
					sortable: false,
                    type: 'number',
                    thClass: 'uk-text-left vgt-th',
					tdClass: 'uk-text-left',
                    width: '100px',
				},
				{
					label: 'Summa',
					field: 'Ordersum',
					sortable: false,
                    type: 'number',
                    thClass: 'uk-text-right vgt-th',
					tdClass: 'uk-text-right',
                    width: '70px',
                    headerField: this.orderSumTotal,
				},
			]
		},
        orderListAsChildren () {
			return [
				{
          			OrderId: '',
         			OrderDate: '',
         			PaymentMethod: '',
         			Ordersum: 0,
          			children: this.orderList,
				}
			]
		},
		columnsCoinEvents () {
			return [
				{
					label: 'Datum',
					field: 'CreatedDate',
					sortable: false,
                    type: 'string',
                    thClass: 'uk-text-left vgt-th',
					tdClass: 'uk-text-left',
                    width: '80px',
				},
				{
					label: 'Beskrivning',
					field: 'Description',
					sortable: false,
					type: 'string',
					thClass: 'uk-text-left vgt-th',
					tdClass: 'uk-text-left',
                    width: '140px',
				},
				{
					label: 'Coins',
					field: 'Value',
					sortable: false,
					type: 'number',
					thClass: 'uk-text-left vgt-th',
					tdClass: 'uk-text-left',
                    width: '20px',
				},
				{
					label: 'Admin',
					field: 'AdminName',
					sortable: false,
                    type: 'string',
                    thClass: 'uk-text-left vgt-th',
					tdClass: 'uk-text-left',
                    width: '70px',
				},
			]
		},
    },
    methods: {
        rowStyleClassFn(row) {
            if (this.showAllOrders) {
                return ''
            }
            return row.StatusId > 0 ? '' : 'hideOrder'
        },
		orderSumTotal(rowObj) {
    		let sum = 0
			for (let i = 0; i < rowObj.children.length; i++) {
				rowObj.children[i].StatusId > 0 ? sum += rowObj.children[i].Ordersum : sum
			}
            sum = this.$options.filters.thousandsDelimiter(sum) + ' ' + rowObj.children[0].Currency
    		return sum
	    },
		async updateCustomer() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/Customer/PostUpdateCustomer', _this.customer)
			.then(function (response) {
                _this.customer = response
                try {
                    if ( response.ErrorList != null ) {
                        _this.alertClass = 'uk-alert-danger'
                        _this.$store.commit('setAlertVisible', 0)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.alertClass = 'uk-alert-success'
                        _this.$store.commit('setAlertVisible', 0)
                        _this.$store.dispatch('setBusyOff')
                        _this.updateTheBloodyTable = false
					    setTimeout(() => {
						    _this.updateTheBloodyTable = true
					    }, 10)
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
		async updateCoins() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/Coins/PostUpdateCoins', _this.coins)
			.then(function (response) {
                _this.coins = response
                try {
                    if ( response.ErrorList != null ) {
                        _this.alertClass = 'uk-alert-danger'
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.alertClass = 'uk-alert-success'
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                        _this.updateTheBloodyTable = false
					    setTimeout(() => {
						    _this.updateTheBloodyTable = true
					    }, 10)
                    }
                } catch(err) {
                    console.log(err)
                }
			})
			.catch(function (error) {
                console.log(error)
			})
		},
		async getResetLink() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$get('/webapi/Customer/GetResetLink?customerid=' + _this.customer.CustomerId )
			.then(function (response) {
					_this.resetLink = response
                    _this.resetLinkVisible = true
                    _this.$store.dispatch('setBusyOff')
			})
			.catch(function (error) {
				console.log(error)
			})
		},
    },
    watch: {
    },
    async fetch () {
        this.$store.dispatch('setBusyOn')
		try {
			const [customer, orderList, coins] = await Promise.all([
				this.$axios.$get('/webapi/Customer/GetCustomer?customerid=' + this.$route.params.id),
				this.$axios.$get('/webapi/Order/GetOrderlistByCustomerId?customerId=' + this.$route.params.id),
				this.$axios.$get('/webapi/Coins/GetCoinsByCustomerId?customerId=' + this.$route.params.id),
      		])
			this.customer = customer
			this.orderList = orderList
			this.coins = coins
            this.$store.dispatch('setBusyOff')
		} catch (err) {
      		console.log(err);
		}
    },
}
</script>

<style lang="scss">
    table.vgt-table {
        font-size: 0.75rem;
    }
    table.vgt-table td,
    table.vgt-table th {
        vertical-align: middle;
        border-right: 1px solid #dcdfe6;
        padding: .3em .75em .3em .75em;
    }
    .vgt-th {
        font-size: 0.6rem;
    }
	.vgt-table th.vgt-row-header {
        font-size: 0.7rem;
	}
	.uk-input {
		height: 30px;
		border-radius: 0;
		color: rgba(0, 0, 0, 0.87);
		background-color: #fff;
		padding: 8px 8px 7px;
		font-size: 0.75rem;
	}
    .hideOrder {
        display: none;
    }
</style>