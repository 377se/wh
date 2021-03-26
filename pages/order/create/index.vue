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
                                            <!-- Shop -->
                                            <div class="uk-margin uk-margin-remove-bottom uk-width-1-1">
                                                <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                <label class="select-label" for="select-shopOptionsList">Shop</label>
                                                <client-only>
                                                    <Select2
                                                        id="select-shopOptionsList"
                                                        v-model="order.ShopId"
                                                        :options="shopOptionsList"
                                                        :settings="{ 'width': '100%', 'placeholder': '', 'closeOnSelect': true }"
                                                    >
                                                    </Select2>
                                                </client-only>
                                                </div>
                                            </div>
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
                                            <!-- Email -->
                                            <div class="uk-margin">
                                                <ScInput v-model="customerEmail" state="fixed" mode="outline" v-on:blur="getCustomerByEmail(customerEmail, order.ShopId)" extra-classes="uk-form-small">
                                                    <label>Email</label>
                                                </ScInput>
                                            </div>
                                            <Alert
                                                v-if="showAdressAlert"
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
                                                    KORTTITEL
                                                </ScCardTitle>
                                            </div>
                                            <ScCardActions>
                                            </ScCardActions>
                                        </div>
                                    </ScCardHeader>
                                    <ScCardContent>
                                        <ScCardBody>
                                            KORTINNEHÅLL
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

export default {
	components: {
		ScInput,
		Alert,
		Select2: process.client ? () => import('~/components/Select2') : null,
		PrettyRadio,
    },
	data () {
		return {
            order: [],
            shops: [],
            shopOptionsList: [],
            paymentOptionsList: [],
            countriesOptionsList: [],
            paymentTypes: [],
            customer: [],
            emptyAdressObject: [],
            customerEmail: '',
            showAdressContainer: false,
            showAdressAlert: false,
        }
    },
    methods: {
        async getCustomerByEmail(email, shopId) {
			let _this = this
            _this.showPageOverlaySpinner()
            _this.$store.commit('setAlertHidden', 2)
			await this.$axios.$get('/webapi/Customer/GetCustomerByEmail?email=' + email + '&shopId=' + shopId)
			.then(function (response) {
                _this.customer = response
                _this.order.CustomerId = response.CustomerId
                try {
                    if ( response.AddressList.length == 0 ) {
                        _this.hidePageOverlaySpinner()
                        _this.showAdressAlert = true
                        _this.$store.commit('setAlertVisible', 2)
                        _this.showAdressContainer = false
                    } else {
                        _this.hidePageOverlaySpinner()
                        _this.showAdressContainer = true
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
			const [order, shops, paymentTypes, countries] = await Promise.all([
				this.$axios.$get('/webapi/OrderCreate/GetEmptyObject'),
				this.$axios.$get('/webapi/Shop/GetShopList'),
				this.$axios.$get('/webapi/Utility/GetPaymentTypeList'),
				this.$axios.$get('/webapi/Address/GetCountries'),
      		])
			this.order = order
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
</style>