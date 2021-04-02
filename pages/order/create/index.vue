<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
            {{ this.showPageOverlaySpinner() }}
        </div>
    </div>
    <div v-else>
        <div id="sc-page-wrapper">
            {{ this.hidePageOverlaySpinner() }}
            <div id="sc-page-top-bar" class="sc-top-bar">
                <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                    <div class="uk-flex-1">
                            <h1 class="sc-top-bar-title uk-display-inline">Skapa ny order</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody>
                        <div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
                            <div>
                                <ScCard>
                                    <ScCardHeader separator>
                                        <div class="uk-flex uk-flex-middle">
                                            <div class="uk-flex-1">
                                                <ScCardTitle>
                                                    Kundinfo
                                                </ScCardTitle>
                                            </div>
                                            <ScCardActions>
                                            </ScCardActions>
                                        </div>
                                    </ScCardHeader>
                                    <ScCardContent>
                                        <ScCardBody>
                                            <Alert
                                                :message="this.errors ? this.errors[0].Value : ''"
                                                :alertClass="'uk-alert-danger'"
                                                id=4
                                            />
                                            <!-- Shop -->
                                            <div class="uk-margin uk-margin-remove-bottom uk-width-1-1">
                                                <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                <label class="select-label" for="select-shopOptionsList">Shop</label>
                                                <client-only>
                                                    <Select2
                                                        id="select-shopOptionsList"
                                                        v-model="shopId"
                                                        :options="shopOptionsList"
                                                        :settings="{ 'width': '100%', 'placeholder': '', 'closeOnSelect': true }"
                                                    >
                                                    </Select2>
                                                </client-only>
                                                </div>
                                            </div>
                                            <!-- Kundinfoblock som visas vid vald shop -->
                                            <div v-if="shopId" class="uk-margin">
                                                <!-- Betalning -->
                                                <div class="uk-margin uk-margin-remove-bottom uk-width-1-1">
                                                    <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                    <label class="select-label" for="select-paymentOptionsList">Betalningstyp</label>
                                                    <client-only>
                                                        <Select2
                                                            id="select-paymentOptionsList"
                                                            v-model="order.PaymentTypeId"
                                                            :options="paymentOptionsList"
                                                            :settings="{ 'width': '100%', 'placeholder': '', 'closeOnSelect': true }"
                                                        >
                                                        </Select2>
                                                    </client-only>
                                                    </div>
                                                </div>
                                                <Alert
                                                    :message="'Skriv in email-address!'"
                                                    :alertClass="'uk-alert-danger'"
                                                    id=5
                                                />
                                                <!-- Email -->
                                                <div class="uk-margin">
                                                    <ScInput v-model="customerEmail" state="fixed" mode="outline" v-on:blur="getCustomerByEmail(customerEmail, order.ShopId)" extra-classes="uk-form-small">
                                                        <label>Email</label>
                                                    </ScInput>
                                                </div>
                                                <Alert
                                                    :message="'Det finns ingen address. Skriv in address manuellt'"
                                                    :alertClass="'uk-alert-danger'"
                                                    id=2
                                                />
                                                <!-- Adresser -->
                                                <div v-if="this.showAdressContainer" class="uk-margin adress-container">
                                                    <div class="adress-title">Address(er)</div>
                                                    <ul data-uk-accordion>
                                                        <li class="uk-open">
                                                            <label class="uk-accordion-title">&nbsp;</label>
                                                            <div class="uk-accordion-content sc-round">
                                                                <div v-for="adress in customer.AddressList" :key="adress.AddressId">
                                                                    <PrettyRadio
                                                                        v-model="order.Address"
                                                                        :value="adress"
                                                                        name="chooseAdress"
                                                                        class="p-radio uk-margin-small-bottom"
                                                                        @change="showAdressContainer = false"
                                                                    >
                                                                        {{ adress.FirstName }} {{ adress.LastName }}, {{ adress.Address1 }}
                                                                    </PrettyRadio>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <!-- Nedan block visas endast vid ifylld epost-adress -->
                                                <div v-if="customerEmail">
                                                    <!-- Förnamn -->
                                                    <div class="uk-margin">
                                                        <ScInput v-model="order.Address.FirstName" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                            <label>Förnamn</label>
                                                        </ScInput>
                                                    </div>
                                                    <!-- Efternamn -->
                                                    <div class="uk-margin">
                                                        <ScInput v-model="order.Address.LastName" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                            <label>Efternamn</label>
                                                        </ScInput>
                                                    </div>
                                                    <!-- Address -->
                                                    <div class="uk-margin">
                                                        <ScInput v-model="order.Address.Address1" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                            <label>Address</label>
                                                        </ScInput>
                                                    </div>
                                                    <!-- Postadress -->
                                                    <div class="uk-margin uk-flex">
                                                        <!-- Postnummer -->
                                                        <div class="uk-width-1-4">
                                                            <ScInput v-model="order.Address.PostalCode" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                                <label>Postnummer</label>
                                                            </ScInput>
                                                        </div>
                                                        <!-- Ort -->
                                                        <div class="uk-width-3-4 uk-margin-left">
                                                            <ScInput v-model="order.Address.City" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                                <label>Ort</label>
                                                            </ScInput>
                                                        </div>
                                                    </div>
                                                    <!-- Land -->
                                                    <div class="uk-margin uk-margin-remove-bottom uk-width-1-1">
                                                        <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                        <label class="select-label" for="select-countriesOptionsList">Land</label>
                                                        <client-only>
                                                            <Select2
                                                                id="select-countriesOptionsList"
                                                                v-model="order.Address.CountryId"
                                                                :options="countriesOptionsList"
                                                                :settings="{ 'width': '100%', 'placeholder': '', 'closeOnSelect': true }"
                                                            >
                                                            </Select2>
                                                        </client-only>
                                                        </div>
                                                    </div>
                                                    <!-- Mobil -->
                                                    <div class="uk-margin">
                                                        <ScInput v-model="order.Address.Mobile" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                            <label>Mobil</label>
                                                        </ScInput>
                                                    </div>
                                                </div>
                                            </div>
                                        </ScCardBody>
                                    </ScCardContent>
                                </ScCard>
                            </div>
                            <div>
                                <ScCard>
                                    <ScCardHeader separator>
                                        <div class="uk-flex uk-flex-middle">
                                            <div class="uk-flex-1">
                                                <ScCardTitle>
                                                    Artikelinfo
                                                </ScCardTitle>
                                            </div>
                                            <ScCardActions>
                                            </ScCardActions>
                                        </div>
                                    </ScCardHeader>
                                    <ScCardContent>
                                        <ScCardBody>
                                            <!-- ArtikelNr -->
                                            <div class="uk-margin">
                                                <ScInput v-model="articleNumber" state="fixed" mode="outline" extra-classes="uk-form-small" v-on:blur="getArticleDetailsByArticleNumber(articleNumber)">
                                                    <label>ArtikelNr</label>
                                                </ScInput>
                                            </div>
                                            <Alert
                                                :message="errorsArticleDetails ? errorsArticleDetails[0].Value : ''"
                                                :alertClass="'uk-alert-danger'"
                                                id=3
                                            />
                                            <div v-if="articleDetails && !errorsArticleDetails" :class="{ 'uk-flex': !errorsArticleDetails }">
                                                <div class="uk-margin-small-right uk-width-1-4" :class="{ 'uk-hidden': errorsArticleDetails }">
                                                    <img :src="articleDetails.ProductImage">
                                                </div>
                                                <div :class="{ 'uk-width-3-4': !errorsArticleDetails }">
                                                    <!-- Produktnamn -->
                                                    <div class="uk-margin-medium-bottom">
                                                        <ScInput v-model="articleDetails.ProductName" state="fixed" mode="outline" extra-classes="uk-form-small" disabled>
                                                            <label>Produktnamn</label>
                                                        </ScInput>
                                                    </div>
                                                    <!-- Storlek -->
                                                    <div class="uk-margin-medium-bottom uk-width-1-1">
                                                        <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                        <label class="select-label" for="select-paymentOptionsList">Storlek</label>
                                                        <client-only>
                                                            <Select2
                                                                id="select-sizeOptionsList"
                                                                v-model="articleDetails.StockId"
                                                                :options="sizeOptionsList"
                                                                :settings="{ 'width': '100%', 'placeholder': 'Välj storlek', 'closeOnSelect': true }"
                                                            >
                                                            </Select2>
                                                        </client-only>
                                                        </div>
                                                    </div>
                                                    <!-- Pris -->
                                                    <div class="uk-margin-medium-bottom">
                                                        <ScInput v-model="articleDetails.Price" state="fixed" mode="outline" extra-classes="uk-form-small" placeholder="Skriv in pris">
                                                            <label>Pris</label>
                                                        </ScInput>
                                                    </div>
                                                    <div v-if="articleDetails.HasPrint" class="uk-flex">
                                                        <div class="uk-width-1-2 uk-margin-small-right">
                                                            <!-- Tryck - Namn -->
                                                            <div class="uk-margin-medium-bottom">
                                                                <ScInput v-model="articleDetails.PrintOptionList[0].Value" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                                    <label>Tryck - Namn</label>
                                                                </ScInput>
                                                            </div>
                                                            <!-- Tryck - Nummer -->
                                                            <div class="uk-margin-medium-bottom">
                                                                <ScInput v-model="articleDetails.PrintOptionList[1].Value" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                                    <label>Tryck - Nummer</label>
                                                                </ScInput>
                                                            </div>
                                                            <!-- Tryck - Patch -->
                                                            <div class="uk-margin-medium-bottom">
                                                                <PrettyCheck v-model="articleDetails.PrintOptionList[2].IsChecked" class="p-icon">
                                                                    <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Tryck - Patch</span>
                                                                </PrettyCheck>
                                                            </div>
                                                        </div>
                                                        <div class="uk-width-1-2">
                                                            <!-- Pris -->
                                                            <div class="uk-margin-medium-bottom">
                                                                <ScInput v-model="articleDetails.PrintOptionList[0].Price" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                                    <label>Pris</label>
                                                                </ScInput>
                                                            </div>
                                                            <!-- Pris -->
                                                            <div class="uk-margin-medium-bottom">
                                                                <ScInput v-model="articleDetails.PrintOptionList[1].Price" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                                    <label>Pris</label>
                                                                </ScInput>
                                                            </div>
                                                            <!-- Pris -->
                                                            <div class="uk-margin-medium-bottom">
                                                                <ScInput v-model="articleDetails.PrintOptionList[2].Price" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                                    <label>Pris</label>
                                                                </ScInput>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="postAddToCart()">
                                                        LÄGG I VARUKORGEN
                                                    </button>
                                                </div>
                                            </div>
                                        </ScCardBody>
                                    </ScCardContent>
                                </ScCard>
                                <ScCard class="uk-margin-medium-top">
                                    <ScCardHeader separator>
                                        <div class="uk-flex uk-flex-middle">
                                            <div class="uk-flex-1">
                                                <ScCardTitle>
                                                    Varukorg
                                                </ScCardTitle>
                                            </div>
                                            <ScCardActions>
                                            </ScCardActions>
                                        </div>
                                    </ScCardHeader>
                                    <ScCardContent>
                                        <ScCardBody>
                                            <VueGoodTable
                                                v-if="updateTheBloodyTable == true && this.cart"
                                                :columns="columns_cart"
                                                :rows="cart"
                                                style-class="vgt-table"
                                                :search-options="{ enabled: false }"
                                                :pagination-options="{
                                                    enabled: false,
                                                    mode: 'pages',
                                                    perPage: 10,
                                                    position: 'top',
                                                    perPageDropdown: [10, 20, 30, 40, 50],
                                                    dropdownAllowAll: true,
                                                    setCurrentPage: 1,
                                                    nextLabel: 'nästa',
                                                    prevLabel: 'föregående',
                                                    rowsPerPageLabel: 'Produkter per sida',
                                                    ofLabel: 'av',
                                                    pageLabel: 'sida',
                                                    allLabel: 'Alla',
                                                }"
                                            >
                                            <div class="uk-label uk-label-success uk-margin-small-right" slot="table-actions">
                                                {{ this.cart ? this.cart.length : 0 }}
                                            </div>
                                                <template slot="table-row" slot-scope="props">
                                                    <img v-if="props.column.field === 'ArticleImage'" :src="props.row.ArticleImage">
                                                    <span v-else-if="props.column.field === 'TeamName'">
                                                        {{ props.row.TeamName }}
                                                    </span>
                                                    <nuxt-link v-else-if="props.column.field === 'ArticleName'" :to="props.row.Url">
                                                        <div>{{ props.row.ArticleName }}</div>
                                                        <div v-if="props.row.AddOnText">{{ props.row.AddOnText }}</div>
                                                    </nuxt-link>
                                                    <span v-else-if="props.column.field === 'PriceToPay'">
                                                        {{ props.row.PriceToPay }}
                                                    </span>
                                                    <span v-else-if="props.column.field == 'after'">
                                                        <div class="cart-delete-button" @click="postDeleteFromCart(props.row.CartId)">
															<i class="mdi mdi-delete-forever md-color-red-600"></i>
														</div>
                                                    </span>
                                                </template>
                                            </VueGoodTable>
                                                <button v-if="this.cart" v-waves.button.light class="sc-button sc-button-primary uk-margin-medium-top" @click.prevent="postCreateOrder()">
                                                    SKAPA ORDER
                                                </button>
                                        </ScCardBody>
                                    </ScCardContent>
                                </ScCard>
                            </div>
                        </div>
                    </ScCardBody>
                </ScCard>
            </div>
        </div>
    </div>
</template>

<script>
import ScInput from '~/components/Input'
import Alert from '~/components/Alert'
import PrettyRadio from 'pretty-checkbox-vue/radio';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import PrettyCheck from 'pretty-checkbox-vue/check'

export default {
	components: {
		ScInput,
		Alert,
		Select2: process.client ? () => import('~/components/Select2') : null,
		PrettyRadio,
		PrettyCheck,
		VueGoodTable,
    },
	data () {
		return {
            order: [],
            shops: [],
            shopId: null,
            shopOptionsList: [],
            paymentOptionsList: [],
            countriesOptionsList: [],
            paymentTypes: [],
            customer: [],
            articleDetails: null,
            articleNumber: null,
            sizeOptionsList: [],
            emptyAdressObject: [],
            showAdressContainer: false,
            customerEmail: null,
            showAdressAlert: false,
            cart: null,
            updateTheBloodyTable: true,
            errors: null,
            errorsArticleDetails: null,
        }
    },
    watch: {
        shopId: function (val) {
            this.order.ShopId = val
            this.articleDetails ? this.articleDetails.ShopId = val : null
        },
    },
	mounted: function () {

    },
    computed: {
		columns_cart () {
			return [
                {
					label: '',
					field: 'ArticleImage',
					sortable: false,
					tdClass: 'uk-text-center uk-text-nowrap',
                    width: '33px',
				},
				{
					label: 'Lag',
					field: 'TeamName',
					sortable: false,
					type: 'string',
					filterOptions: {
						enabled: false
					},
                    width: '30%',
				},
				{
					label: 'Produkt',
					field: 'ArticleName',
					sortable: false,
					type: 'string',
					filterOptions: {
						enabled: false
					},
                    width: '40%',
				},
                {
					label: 'Pris (SEK)',
					field: 'PriceToPay',
					sortable: false,
					type: 'number',
					filterOptions: {
						enabled: false
					},
                    tdClass: 'uk-text-right',
                    thClass: 'uk-text-right',
                    width: '15%',
				},
                {
                    label: '',
					sortable: false,
                    field: 'after',
                },
			]
		},
	},
    methods: {
        async getCustomerByEmail(email, shopId) {
			let _this = this
            if (!_this.customerEmail) {
                _this.$store.commit('setAlertVisible', 5)
                return
            }
            _this.showPageOverlaySpinner()
            _this.$store.commit('setAlertHidden', 2)
			await this.$axios.$get('/webapi/Customer/GetCustomerByEmail?email=' + email + '&shopId=' + shopId)
			.then(function (response) {
                _this.customer = response
                _this.order.CustomerId = response.CustomerId
                try {
                    if ( !response.AddressList ) {
                        _this.hidePageOverlaySpinner()
                        _this.$store.commit('setAlertVisible', 2)
                        _this.showAdressContainer = false
                    } else {
                        _this.hidePageOverlaySpinner()
                        _this.showAdressContainer = true
                    }
                } catch(err) {
                    console.log(err)
                }
                _this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
                console.log(error)
                _this.$store.commit('setAlertVisible', 5)
                _this.hidePageOverlaySpinner()
			})
		},
        async getArticleDetailsByArticleNumber(articleNumber) {
			let _this = this
            _this.$store.commit('setAlertHidden', 4)
            _this.showPageOverlaySpinner()
            _this.$store.commit('setAlertHidden', 3)
			await this.$axios.$get('/webapi/Article/GetArticleDetailsByArticleNumber?articleNumber=' + articleNumber)
			.then(function (response) {
                _this.articleDetails = response
                response.ShopId = _this.order.ShopId
                _this.sizeOptionsList = response.StockList.map(({ StockId, SizeDisplay }) => ({ id: StockId, text: SizeDisplay }))
                try {
                    if ( response.ErrorList != null ) {
                        _this.errorsArticleDetails = response.ErrorList
                        _this.hidePageOverlaySpinner()
                        _this.$store.commit('setAlertVisible', 3)
                    } else {
                        _this.hidePageOverlaySpinner()
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
        async postAddToCart() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Cart/PostAddToCart', _this.articleDetails)
			.then(function (response) {
                _this.errors = response.ErrorList
                _this.getCartBySessionId()
                try {
                    if ( response.ErrorList != null ) {
                        console.log(_this.errors)
                        _this.hidePageOverlaySpinner()
                        _this.$store.commit('setAlertVisible', 4)
                    } else {
                        _this.hidePageOverlaySpinner()
                        _this.$store.commit('setAlertHidden', 4)
                        _this.articleDetails = null
                        _this.articleNumber = null
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
        async postDeleteFromCart(cartId) {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Cart/PostDeleteFromCart?cartId=' + cartId)
			.then(function (response) {
                _this.getCartBySessionId()
                _this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
		},
        async postCreateOrder() {
			let _this = this
            _this.order.Address.Email = _this.customerEmail
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/OrderCreate/PostCreateOrder', _this.order)
			.then(function (response) {
                _this.hidePageOverlaySpinner()
                _this.$router.push(response.Url)
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
		},
        async getCartBySessionId() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/Cart/GetCartBySessionId')
			.then(function (cart) {
                _this.cart = cart.CartList
                _this.updateTheBloodyTable = false
                setTimeout(() => {
                    _this.updateTheBloodyTable = true
                }, 10)
                _this.hidePageOverlaySpinner()
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
			const [order, shops, paymentTypes, countries, cart] = await Promise.all([
				this.$axios.$get('/webapi/OrderCreate/GetEmptyObject'),
				this.$axios.$get('/webapi/Shop/GetShopList'),
				this.$axios.$get('/webapi/Utility/GetPaymentTypeList'),
				this.$axios.$get('/webapi/Address/GetCountries'),
				this.$axios.$get('/webapi/Cart/GetCartBySessionId'),
      		])
			this.order = order
			this.cart = cart.CartList
			this.shops = shops
			this.shopOptionsList = shops.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
			this.paymentTypes = paymentTypes
			this.paymentOptionsList = paymentTypes.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.countries = countries
			this.countriesOptionsList = countries.map(({ CountryId, Name }) => ({ id: CountryId, text: Name }))

        } catch (err) {
      		console.log(err);
		}
    },
}
</script>

<style lang="scss" scoped>
	@import '~scss/vue/_pretty_checkboxes';
	.uk-input {
		height: 30px;
		border-radius: 0;
		color: rgba(0, 0, 0, 0.87);
		background-color: #fff;
		padding: 8px 8px 7px;
		font-size: 0.75rem;
	}
    .adress-container {
        position: relative;
        border: 1px solid #ddd;
        border-radius: 3px;
        padding: 5px 10px 5px 10px;
    }
    .adress-title {
        position: absolute;
        left: 3px;
        top: -12px;
        font-size: 0.75rem;
        color: rgba(0, 0, 0, 0.54);
        padding: 0 4px;
        background: #fff;
    }
    .uk-accordion-content {
        margin-top: 0;
    }
    table.vgt-table {
        font-size: 0.75rem;
    }
    table.vgt-table td {
        vertical-align: middle;
        border-right: 1px solid #dcdfe6;
        padding: .3em .75em .3em .75em;
    }
    table.vgt-table th {
        font-size: 0.6rem;
    }
    .cart-delete-button {
        cursor: pointer;
    }
</style>