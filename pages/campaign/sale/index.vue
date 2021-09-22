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
                        <h1 class="sc-top-bar-title uk-display-inline">REA-hantering</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">

                <div class="uk-grid uk-grid-medium" uk-grid uk-margin :key="render">

                    <!-- LIST SALES ACTIVE -->
                    <div class="uk-width-1-1 uk-width-2-3@m">
                        <ScCard v-if="saleList" class="uk-card-small">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    <div class="uk-flex uk-flex-left uk-flex-middle">
                                        <div>Aktiva</div>
                                    </div>
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto" style="max-height:600px;">
                                    <table v-if="saleList" class="uk-table uk-table-small uk-text-small uk-margin-remove" style="border-collapse: separate;">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 20%;">Shop</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 22%;">Beskrivning</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 5%;">Rab</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 13%;">Start</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 13%;">Slut</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 10%;">Admin</th>
                                                <th class="sticky-headers border-top border-bottom border-left border-right uk-text-small" style="text-align: left; min-width:20%;"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="sale in saleList.filter(sale => { return sale.IsActive == true })" :key="sale.SaleId" class="uk-table-middle">
                                                <td class="border-bottom border-left cursor-pointer" style="color: #048ACD; text-align: left; " @click="getSaleById(sale.SaleId)">{{ sale.ShopName }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ sale.Name }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ sale.Discount }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ sale.StartDate }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ sale.ValidThru }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ sale.Admin }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">
                                                    <button v-if="sale.IsActive == true" v-waves.button.light class="sc-button sc-button-primary sc-button-mini" @click="resetSale(sale.SaleId)">
                                                        INAKTIVERA
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ScCardBody>
                        </ScCard>

                        <!-- LIST SALES IN-ACTIVE -->

                        <ScCard v-if="saleList" class="uk-card-small uk-margin-large-top">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    <div class="uk-flex uk-flex-left uk-flex-middle">
                                        <div>Inaktiva</div>
                                    </div>
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto" style="max-height:600px;">
                                    <table v-if="saleList" class="uk-table uk-table-small uk-text-small uk-margin-remove" style="border-collapse: separate;">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 20%;">Shop</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 22%;">Beskrivning</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 5%;">Rab</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 13%;">Start</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 13%;">Slut</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 10%;">Admin</th>
                                                <th class="sticky-headers border-top border-bottom border-left border-right uk-text-small" style="text-align: left; min-width:20%;"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="sale in saleList.filter(sale => { return sale.IsActive == false })" :key="sale.SaleId" class="uk-table-middle">
                                                <td class="border-bottom border-left cursor-pointer" style="color: #048ACD; text-align: left; " @click="getSaleById(sale.SaleId)">{{ sale.ShopName }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ sale.Name }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ sale.Discount }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ sale.StartDate }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ sale.ValidThru }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ sale.Admin }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">
                                                    <button v-if="sale.IsActive == true" v-waves.button.light class="sc-button sc-button-primary sc-button-mini" @click="resetSale(sale.SaleId)">
                                                        INAKTIVERA
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>


                    <!-- EDITOR -->
                    <div class="uk-width-1-1 uk-width-1-3@m uk-flex-first uk-flex-last@m" uk-margin>
                    <ScCard>
                        <ScCardHeader separator>
                            <ScCardTitle v-if="currentSaleObject.SaleId != 0">
                                Redigera rea
                            </ScCardTitle>
                            <ScCardTitle v-else>
                                Skapa ny rea
                            </ScCardTitle>
                        </ScCardHeader>
                        <ScCardBody>
                            <div class="uk-width-1-1">
                                <Alert
                                    :errorlist="errors"
                                    :alertClass="'uk-alert-danger'"
                                    id=1
                                />
                                <h4 class="uk-margin-remove"><strong>{{ currentSaleObject.Name }}</strong></h4>
                                <div v-if="currentSaleObject.SaleId != 0">
                                    <div v-if="currentSaleObject.IsActive == false" class="uk-label uk-label-danger uk-border-rounded uk-margin-medium-top uk-margin-small-bottom">
                                        Denna rea är inaktiv
                                    </div>
                                    <div v-else class="uk-label uk-label-success uk-border-rounded uk-margin-medium-top uk-margin-small-bottom">
                                        Denna rea är aktiv
                                    </div>
                                </div>
                                    <div>
                                        <!-- Shop -->
                                        <div class="uk-margin uk-width-1-1 uk-margin-medium-top">
                                            <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                <label class="select-label" for="select-shopList">Shop</label>
                                                <client-only>
                                                    <Select2
                                                        id="select-shopList"
                                                        v-model.number="shopId"
                                                        :options="shopList"
                                                        :settings="{ 'width': '100%', 'closeOnSelect': true }"
                                                        :disabled="currentSaleObject.SaleId != 0"
                                                    >
                                                    </Select2>
                                                </client-only>
                                            </div>
                                        </div>
                                        <!-- Beskrivning -->
                                        <div class="uk-margin">
                                            <ScInput v-model="currentSaleObject.Name" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Beskrivning</label>
                                            </ScInput>
                                        </div>
                                        <!-- Rabatt -->
                                        <div class="uk-margin">
                                            <ScInput v-model.number="currentSaleObject.Discount" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Rabatt</label>
                                            </ScInput>
                                        </div>
                                        <!-- Startdatum -->
                                        <div class="uk-margin">
                                            <ScInput v-model="currentSaleObject.StartDate" v-flatpickr="{ 'locale': Swedish, enableTime: false, enableSeconds: false }" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Startdatum</label>
                                            </ScInput>
                                        </div>
                                        <!-- Giltig t.o.m. -->
                                        <div class="uk-margin">
                                            <ScInput v-model="currentSaleObject.ValidThru" v-flatpickr="{ 'locale': Swedish, enableTime: false, enableSeconds: false }" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Giltig t.o.m.</label>
                                            </ScInput>
                                        </div>
                                        <!-- Kategori -->
                                        <div v-if="shopId != 0" class="uk-width-1-1 uk-margin-medium-top">
                                            <div>
                                                <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                    <label class="select-label" for="select-category">Kategori</label>
                                                    <client-only>
                                                        <Select2
                                                            id="select-category"
                                                            v-model="categoryId"
                                                            :options="currentSaleObject.ItemList.map(({ CategoryId, Name }) => ({ id: CategoryId, text: Name }))"
                                                            :settings="{ 'width': '100%', 'closeOnSelect': true }"
                                                            :disabled="currentSaleObject.SaleId != 0"
                                                        >
                                                        </Select2>
                                                    </client-only>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Kategori -->
                                        <div v-if="categoryId != 0" class="uk-margin-small-top uk-width-1-1">

                                            <ul class="uk-list uk-margin-remove-top" style="padding-left:5px;">
                                                <li v-for="item in currentSaleObject.ItemList[foundIndex].SubItemList" :key="item.CategoryId" class="uk-text-small uk-padding-remove" style="margin-bottom:2px;">
                                                    <PrettyCheck v-model="item.IsSelected" class="p-icon" :disabled="currentSaleObject.SaleId != 0">
                                                        <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">{{ item.Name }}</span>
                                                    </PrettyCheck>
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- Produkttyp -->
                                        <div class="uk-width-1-1 uk-margin">
                                            <div>
                                                <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                    <label class="select-label" for="select-team">Produkttyp</label>
                                                    <client-only>
                                                        <Select2
                                                            id="select-leagueList"
                                                            v-model.number="currentSaleObject.ProductTypeId"
                                                            :options="productTypeList"
                                                            :settings="{ 'width': '100%', 'closeOnSelect': true }"
                                                            :disabled="currentSaleObject.SaleId != 0"
                                                        >
                                                        </Select2>
                                                    </client-only>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                <div class="uk-flex uk-flex-around uk-margin-medium-bottom">
                                    <div v-if="currentSaleObject.SaleId == 0">
                                        <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="createSale()">NY&nbsp;REA
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateSale()">
                                            UPPDATERA
                                        </button>
                                        <button v-waves.button.light class="sc-button sc-button-primary uk-margin-small-left" @click.prevent="getEmptySaleObject(0)">
                                            RENSA
                                        </button>
                                    </div>
                                </div>


                                    <!-- INFO-TEXTER -->

                                    <div class="uk-margin-medium-bottom">
                                        <div v-if="currentSaleObject.CampaignId != 0">
                                            <div v-if="currentSaleObject.CampaignTypeId == 2">
                                                <div class="uk-text-small"><strong>Information</strong></div>
                                                <div class="uk-text-small uk-margin-small-bottom">En klassisk "ta 3 produkter, betala för 2". Den billigaste produkten blir gratis.</div>
                                                <div class="uk-text-small"><strong>Start- och slutdatum</strong></div>
                                                <div class="uk-text-small uk-margin-small-bottom">Format: 2017-04-17 23:59:00</div>
                                                <div class="uk-text-small"><strong>Produkttyp</strong></div>
                                                <div class="uk-text-small uk-margin-small-bottom">Här klickar du i den/de produkttyper vars produkter ska triggas av 3 för 2-erbjudandet</div>
                                            </div>
                                        </div>
                                        <div v-if="currentSaleObject.CampaignId != 0">
                                            <div v-if="currentSaleObject.CampaignTypeId == 3">
                                                <div class="uk-text-small"><strong>Information</strong></div>
                                                <div class="uk-text-small uk-margin-small-bottom">När kunden passerat en minimisumma läggs en frivara i varukorgen.</div>
                                                <div class="uk-text-small"><strong>Minsta ordersumma</strong></div>
                                                <div class="uk-text-small uk-margin-small-bottom">Minsta ordersumma för att trigga gratisprodukt</div>
                                                <div class="uk-text-small"><strong>Start- och slutdatum</strong></div>
                                                <div class="uk-text-small uk-margin-small-bottom">Format: 2017-04-17 23:59:00</div>
                                                <div class="uk-text-small"><strong>Koppla artikel</strong></div>
                                                <div class="uk-text-small uk-margin-small-bottom">Här väljer du den artikel som ska bli "frivara" när ordersumman uppnåtts.</div>
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
import Alert from '~/components/Alert'
import Rawdisplayer from '~/components/rawdisplayer'
import ScInput from '~/components/Input'
import { Swedish } from "flatpickr/dist/l10n/sv.js"
import PrettyCheck from 'pretty-checkbox-vue/check'
import PrettyRadio from 'pretty-checkbox-vue/radio';

if(process.client) {
	require('~/plugins/flatpickr');
}

export default {
	components: {
        Alert,
		Rawdisplayer,
		ScInput,
        Select2: process.client ? () => import('~/components/Select2') : null,
		PrettyCheck,
		PrettyRadio,
		Swedish,
	},
    data() {
        return {
            errors: null,
            message: null,
            render: false,
            emptySaleObject: null,
            currentSaleObject: null,
            saleList: null,
            productTypeList: null,
            shopId: 0,
            shopList: null,
            categoryId: 0,
            foundIndex: 0,
            Swedish,
        }
    },
    mounted () {

    },
    watch: {
        shopId(newValue, oldValue) {
            if (this.currentSaleObject.SaleId == 0) {
                this.getEmptySaleObject(newValue)
            }
        },
        categoryId(newValue, oldValue) {
            this.foundIndex = this.currentSaleObject.ItemList.findIndex(item => { return item.CategoryId == newValue })
            this.currentSaleObject.ItemList[this.foundIndex].IsSelected = true
        }
    },
    methods: {
        async getSaleById(saleid) {
            let _this = this
            _this.$store.commit('setAlertHidden', 1)
            try {
                const [ currentsale ] = await Promise.all([
                    this.$axios.$get('/webapi/Sale/GetSaleById?saleId=' + saleid ),
            ])
                _this.currentSaleObject = currentsale
                _this.shopId = currentsale.ShopId
            } catch (err) {
                console.log(err);
            }
		},
        async getEmptySaleObject(shopid) {
            let _this = this
            _this.$store.commit('setAlertHidden', 1)
            try {
                const [ emptysaleobject ] = await Promise.all([
                    this.$axios.$get('/webapi/Sale/GetEmptySaleObject?shopId=' + shopid ),
            ])
                _this.emptySaleObject = emptysaleobject
                _this.currentSaleObject = emptysaleobject
                _this.currentSaleObject.ShopId = shopid
                _this.shopId = shopid
            } catch (err) {
                console.log(err);
            }
		},
        async createSale() {
            let _this = this
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Sale/CreateSale', _this.currentSaleObject)
            .then(function (createdsale) {
                if (createdsale.ErrorList != null) {
                    _this.errors = createdsale.ErrorList
                    _this.$store.commit('setAlertVisible', 1)
                    _this.$store.dispatch('setBusyOff')
                } else {
                    _this.currentSaleObject = createdsale
                    _this.saleList.unshift(createdsale)
                    UIkit.modal.dialog('<p class="uk-modal-body">Rean har skapats!</p>')
                    _this.$store.dispatch('setBusyOff')
                }
            })
            .catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
            })
        },
        async resetSale(saleid) {
            let _this = this
            _this.errors = null
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Sale/ResetSale?saleId=' + saleid)
            .then(function (salelist) {
                if (salelist.ErrorList != null) {
                    _this.errors = salelist.ErrorList
                    _this.$store.commit('setAlertVisible', 1)
                    _this.$store.dispatch('setBusyOff')
                } else {
                    _this.saleList = salelist
                    _this.render = !render
                    UIkit.modal.dialog('<p class="uk-modal-body">Rean har inaktiverats!</p>')
                    _this.$store.dispatch('setBusyOff')
                }
            })
            .catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
            })
        },
        async updateSale() {
            let _this = this
            _this.errors = null
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Sale/UpdateSale', _this.currentSaleObject)
            .then(function (updatedsaleobject) {
                if (salelist.ErrorList != null) {
                    _this.errors = updatedsaleobject.ErrorList
                    _this.$store.commit('setAlertVisible', 1)
                    _this.$store.dispatch('setBusyOff')
                } else {
                    let foundIndex = _this.saleList.findIndex(sale => sale.SaleId == updatedsaleobject.CampaignId)
                    _this.campaignList[foundIndex] = _this.currentCampaignObject
                    _this.saleList = salelist
                    _this.render = !render
                    UIkit.modal.dialog('<p class="uk-modal-body">Rean är uppdaterad!</p>')
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
        this.$store.commit('setAlertHidden', 1)
        this.$store.commit('setAlertHidden', 2)
        this.$store.dispatch('setBusyOn')
        this.getEmptySaleObject(0)
        try {
            const [ salelist, producttypelist, shoplist ] = await Promise.all([
                this.$axios.$get('/webapi/Sale/GetSaleList'),
                this.$axios.$get('/webapi/Metadata/GetProductTypeList'),
                this.$axios.$get('/webapi/Shop/GetShopList'),
            ])
            this.saleList = salelist
            this.productTypeList = producttypelist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.shopList = shoplist.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
            this.$store.dispatch('setBusyOff')
        } catch (err) {
            console.log(err);
        }
    }
}
</script>

<style lang="scss" scoped>
	@import '~scss/vue/_pretty_checkboxes';
    .sticky-headers {
        background: white;
        position: sticky;
        top: 0px;
    }
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
	.uk-modal-full {
		background: rgba(0, 0, 0, 0.6);
	}
	.uk-modal-dialog, .uk-modal-header {
		margin-left: auto;
		width:55vw !important;
		max-width: 800px !important;
			@media only screen and (max-width: 600px) {
				width:85vw !important;
				max-width: 800px !important;
			}
	}
	.uk-modal-header {
		min-height: 50px;
		height: auto;
		padding: 0px;
	}
	.basket-ribbon{
		background: #00838F;
	}
    .cursor-pointer {
		cursor: pointer;
	}
</style>