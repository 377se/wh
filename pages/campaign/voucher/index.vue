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
					    <h1 class="sc-top-bar-title uk-display-inline">Voucher</h1>
				    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <div class="uk-grid-column-medium" uk-grid>
                    <div class="uk-width-1-2">
                        <!-- VOUCHERS LIST -->
                        <ScCard>
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Voucherlist
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody class="uk-padding-remove uk-text-small" separator>
                                <div class="uk-flex">
                                    <div style="width: 15%; padding: 5px 0 5px 0;" class="border-bottom">
                                        <div class="uk-margin-small-left">Skapad</div>
                                    </div>
                                    <div style="width: 40%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                        <div class="uk-margin-small-left">Kod</div>
                                    </div>
                                    <div style="width: 10%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                        <div class="uk-margin-small-left">Värde</div>
                                    </div>
                                    <div style="width: 10%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                        <div class="uk-margin-small-left">Antal</div>
                                    </div>
                                    <div style="width: 10%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                        <div class="uk-margin-small-left">Kvar</div>
                                    </div>
                                    <div style="width: 15%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                        <div class="uk-margin-small-left">Giltig t.o.m</div>
                                    </div>
                                </div>
                                <div v-for="voucherItem in voucherList" :key="voucherItem.VoucherId" >
                                    <div class="uk-flex">
                                        <div style="width: 15%; padding: 5px 0 5px 0;" class="border-bottom">
                                            <div class="uk-margin-small-left">{{ voucherItem.CreatedDate }}</div>
                                        </div>
                                        <div style="width: 40%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                            <a class="uk-margin-small-left" @click.prevent="getVoucherById(voucherItem.VoucherId)"> {{ voucherItem.VoucherCode }}</a>
                                        </div>
                                        <div style="width: 10%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                            <div class="uk-margin-small-left">{{ voucherItem.Value }}</div>
                                        </div>
                                        <div style="width: 10%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                            <div class="uk-margin-small-left">{{ voucherItem.InitialAmount }}</div>
                                        </div>
                                        <div style="width: 10%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                            <div class="uk-margin-small-left">{{ voucherItem.ItemsLeft }}</div>
                                        </div>
                                        <div style="width: 15%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                            <div class="uk-margin-small-left">{{ voucherItem.ValidThru }}</div>
                                        </div>
                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <div v-if="!editVouchersPanel" class="uk-width-1-2">
                        <!-- SKAPA NY VOUCHER -->
                        <ScCard>
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Skapa ny voucher
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody class="uk-text-small" separator>
                                <Alert
                                    :errorlist="this.errors ? this.errors : null"
                                    :alertClass="'uk-alert-danger'"
                                    id=1
                                />
                                <Alert
                                    :message="this.message ? this.message : null"
                                    :alertClass="'uk-alert-success'"
                                    id=2
                                />
                                <!-- Shop -->
                                <div class="uk-margin-medium-bottom uk-margin-medium-top uk-width-1-1">
                                    <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                    <label class="select-label" for="select-shopOptionsList">Shop</label>
                                    <client-only>
                                        <Select2
                                            id="select-shopOptionsList"
                                            v-model="newVoucher.ShopId"
                                            :options="shopOptionsList"
                                            :settings="{ 'width': '100%', 'placeholder': 'Välj shop', 'closeOnSelect': true }"
                                        >
                                        </Select2>
                                    </client-only>
                                    </div>
                                </div>
                                <!-- Voucherkod -->
                                <div class="uk-flex uk-margin uk-flex-between uk-width-1-1">
                                    <div class="uk-width-3-4">
                                        <ScInput v-model="newVoucher.VoucherCode" state="fixed" mode="outline"  extra-classes="uk-form-small">
                                            <label>Voucherkod</label>
                                        </ScInput>
                                    </div>
                                    <div class="uk-width-1-4 uk-margin-small-left">
                                        <button v-waves.button.light class="uk-width-1-1 sc-button sc-button-mini sc-button-primary" @click.prevent="generateVoucher()">
                                            GENERERA KOD
                                        </button>
                                    </div>
                                </div>
                                <!-- Värde (procent) -->
                                <div class="uk-margin">
                                    <ScInput v-model="newVoucher.Value" state="fixed" mode="outline"  extra-classes="uk-form-small">
                                        <label>Värde (procent)</label>
                                    </ScInput>
                                </div>
                                <!-- Antal -->
                                <div class="uk-margin">
                                    <ScInput v-model="newVoucher.InitialAmount" state="fixed" mode="outline"  extra-classes="uk-form-small">
                                        <label>Antal</label>
                                    </ScInput>
                                </div>
                                <!-- Giltig t.o.m. -->
                                <div class="uk-margin">
                                    <ScInput v-model="newVoucher.ValidThru" v-flatpickr="{ 'locale': Swedish }" placeholder="" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Giltig t.o.m.</label>
                                    </ScInput>
                                </div>
                                <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="createVoucher()">
                                    SPARA
                                </button>
                            </ScCardBody>
                        </ScCard>
                        <!-- HANDBOKEN -->
                        <ScCard class="uk-card-primary uk-margin-medium-top">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Att skapa voucherkod
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody class="" separator>
                              <ol>
                                  <li>Välj shop</li>
                                  <li>Fyll i egen kod eller välj "Generera kod".<br>Det senare sätter alltid ett shop-prefix utifrån ditt val av shop i steg 1. Dvs, väljer du "Sam Dodds" kan koden bli "SAM-1234567". Detta beroende på prefixet som är satt på shopens inställningar.</li>
                                  <li>Sätt värde på koden.<br>Detta görs i heltal procent (%), t.ex. 20, och kommer att ge rabatt på köpet. Ger ej rabatt på tidigare nedsatta varor.</li>
                                  <li>Välj antal vouchers som ska finnas (1-X)</li>
                                  <li>Sätt giltighetsdatum.<br>Detta är t.o.m. datum. Vill man att den är giltig mars ut så sätter man alltså 31:a mars som datum.</li>
                              </ol>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <div v-if="editVouchersPanel" class="uk-width-1-2">
                        <!-- VOUCHER DETAILS -->
                        <ScCard>
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    <div class="uk-flex uk-flex-between">
                                        Redigera voucher {{ editedVoucher.VoucherCode }}
                                        <span class="closeicon" @click.prevent="editVouchersPanel = false"><i class="mdi mdi-close-circle md-color-grey-600"></i></span>
                                    </div>
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody class="uk-text-small" separator>
                                <Alert
                                    :errorlist="this.errors ? this.errors : null"
                                    :alertClass="'uk-alert-danger'"
                                    id=3
                                />
                                <Alert
                                    :message="this.message ? this.message : null"
                                    :alertClass="'uk-alert-success'"
                                    id=4
                                />
                                <!-- Kod -->
                                <div class="uk-margin">
                                    <ScInput v-model="editedVoucher.VoucherCode" state="fixed" mode="outline" extra-classes="uk-form-small" @blur="updateVoucher()">
                                        <label>Kod</label>
                                    </ScInput>
                                </div>
                                <!-- Värde -->
                                <div class="uk-margin">
                                    <ScInput v-model="editedVoucher.Value" state="fixed" mode="outline" extra-classes="uk-form-small" @blur="updateVoucher()">
                                        <label>Värde</label>
                                    </ScInput>
                                </div>
                                <!-- Antal -->
                                <div class="uk-margin">
                                    <ScInput v-model="editedVoucher.InitialAmount" state="fixed" mode="outline" extra-classes="uk-form-small" @blur="updateVoucher()">
                                        <label>Antal</label>
                                    </ScInput>
                                </div>
                                <!-- Giltighetstid -->
                                <div class="uk-margin">
                                    <ScInput v-model="editedVoucher.ValidThru" v-flatpickr="{ 'locale': Swedish }" state="fixed" mode="outline" extra-classes="uk-form-small" @input="updateVoucher()">
                                        <label>Giltighetstid</label>
                                    </ScInput>
                                </div>
                            </ScCardBody>
                        </ScCard>
                        <!-- ORDRAR MED VOUCHER -->
                        <ScCard v-if="editVouchersPanel" class="uk-margin-medium-top">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    <div class="uk-flex uk-flex-between">
                                        <div>Ordrar med voucher {{ editedVoucher.VoucherCode }}</div>
                                        <div class="uk-badge md-bg-green-600">{{ editedVoucher.OrderList.length }}</div>
                                    </div>
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody class="uk-padding-remove uk-text-small" separator>
                                    <div id="orderlist" class="uk-overflow-auto uk-height-medium">
                                        <div class="uk-flex" uk-sticky="top: #orderlist">
                                            <div style="width: 20%; padding: 5px 0 5px 0;" class="border-bottom">
                                                <div class="uk-margin-small-left">Shop</div>
                                            </div>
                                            <div style="width: 15%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                                <div class="uk-margin-small-left">Skapad</div>
                                            </div>
                                            <div style="width: 50%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                                <div class="uk-margin-small-left">Kund</div>
                                            </div>
                                            <div style="width: 15%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                                <div class="uk-margin-small-left">OrderId</div>
                                            </div>
                                        </div>
                                        <div v-for="order in editedVoucher.OrderList" :key="order.OrderId">
                                            <div class="uk-flex">
                                                <div style="width: 20%; padding: 5px 0 5px 0;" class="border-bottom">
                                                    <div class="uk-margin-small-left">{{ editedVoucher.ShopName }}</div>
                                                </div>
                                                <div style="width: 15%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                                    <div class="uk-margin-small-left">{{ order.OrderDate }}</div>
                                                </div>
                                                <div style="width: 50%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                                    <div class="uk-margin-small-left">{{ order.CustomerName }}</div>
                                                </div>
                                                <div style="width: 15%; padding: 5px 0 5px 0;" class="border-left border-bottom">
                                                    <div class="uk-margin-small-left"><nuxt-link :to="order.UrlOrder">{{ order.OrderId }}</nuxt-link></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ScInput from '~/components/Input'
import { Swedish } from "flatpickr/dist/l10n/sv.js"
import Alert from '~/components/Alert'

if(process.client) {
	require('~/plugins/flatpickr');
}

export default {
    components: {
		Alert,
        Swedish,
        ScInput,
		Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            shopOptionsList: [],
            voucherList: [],
            newVoucher: null,
            editedVoucher: null,
            editVouchersPanel: false,
            errors: null,
            message: null,
    		Swedish,
        }
    },
	mounted: function () {
        this.resetAlerts()
    },
    methods: {
        resetAlerts() {
            this.errors = null
            this.message = null
            this.$store.commit('setAlertHidden', 1)
            this.$store.commit('setAlertHidden', 2)
            this.$store.commit('setAlertHidden', 3)
            this.$store.commit('setAlertHidden', 4)
        },
        async generateVoucher() {
            let _this = this
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$get('/webapi/Voucher/GetGenerateVoucher?shopId=' + _this.newVoucher.ShopId)
            .then(function (code) {
                _this.newVoucher.VoucherCode = code
                _this.$store.dispatch('setBusyOff')
            })
            .catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
            })
        },
        async getVoucherList() {
            let _this = this
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$get('/webapi/Voucher/GetVoucherList')
            .then(function (voucherlist) {
                _this.voucherList = voucherlist
                _this.$store.dispatch('setBusyOff')
            })
            .catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
            })
        },
        async getVoucherById(id) {
            let _this = this
            _this.$store.dispatch('setBusyOn')
            _this.resetAlerts()
            await this.$axios.$get('/webapi/Voucher/GetVoucherById?voucherId=' + id)
            .then(function (editedvoucher) {
                try {
                    if (editedvoucher.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.editedVoucher = editedvoucher
                        _this.editVouchersPanel = true
                        _this.$store.dispatch('setBusyOff')                    }
                } catch(err) {
                    console.log(err)
                }
            })
            .catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
            })
        },
        async createVoucher() {
            let _this = this
            _this.errors = null
            _this.message = null
            _this.resetAlerts()
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Voucher/PostCreateVoucher', _this.newVoucher)
            .then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.errors = response.ErrorList
                        _this.$store.dispatch('setBusyOff')
                        _this.$store.commit('setAlertVisible', 1)
                    }
                    if (response.Message != null) {
                        _this.message = response.Message
                        _this.$store.dispatch('setBusyOff')
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
        async updateVoucher() {
            let _this = this
            _this.errors = null
            _this.message = null
            _this.resetAlerts()
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Voucher/PostUpdateVoucher', _this.editedVoucher)
            .then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.errors = response.ErrorList
                        _this.$store.dispatch('setBusyOff')
                        _this.$store.commit('setAlertVisible', 3)
                    }
                    if (response.Message != null) {
                        _this.message = response.Message
                        _this.$store.dispatch('setBusyOff')
                        _this.$store.commit('setAlertVisible', 4)
                    }
                } catch(err) {
                    console.log(err)
                }
                _this.getVoucherList()
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
            const [ shops, newvoucher ] = await Promise.all([
                this.$axios.$get('/webapi/Shop/GetShopList'),
                this.$axios.$get('/webapi/Voucher/GetEmptyVoucher'),
                this.getVoucherList(),
            ])
            this.newVoucher = newvoucher
            this.shopOptionsList = shops.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
            this.$store.dispatch('setBusyOff')
        } catch (err) {
            console.log(err);
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
    .closeicon {
		cursor: pointer;
	}
</style>