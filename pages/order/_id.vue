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
                    <ScCardBody>
                        <div class="uk-flex">
                            <table :class="{'uk-width-2-3': infoEditorVisible }" class="uk-card uk-box-shadow-small uk-table uk-table-small uk-text-small uk-margin-remove-bottom uk-margin-medium-right">
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
                            <div v-if="infoEditorVisible" :class="{'uk-width-1-3': infoEditorVisible }" class="uk-card uk-padding-small">
                               EDITOR FÖR ORDERINFO
                            </div>
                        </div>
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
                    <ScCardBody>
                         <div class="uk-flex">
                             <!-- ORDERINNEHÅLL -->
                            <table :class="{'uk-width-2-3': updateEditorVisible || addEditorVisible }" class="uk-card uk-box-shadow-small uk-table uk-table-small uk-text-small uk-margin-remove-bottom">
                                <thead>
                                    <tr>
                                        <td class="border-bottom"></td>
                                        <td class="border-bottom"></td>
                                        <td class="border-bottom border-right"></td>
                                        <td class="border-bottom border-right"><strong>Produkt</strong></td>
                                        <td class="border-bottom border-right"><strong>Artikelnummer</strong></td>
                                        <td class="border-bottom border-right uk-text-center"><strong>Storlek</strong></td>
                                        <td class="border-bottom border-right uk-text-center"><strong>Antal</strong></td>
                                        <td class="border-bottom uk-text-right"><strong>Pris</strong></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="orderItemInList in orderContent.OrderItemList" :key="orderItemInList.ItemId" class="uk-table-middle">
                                        <td class="border-bottom border-right uk-text-center">
                                            <div class="editicon" @click="getItemToEdit(orderItemInList.ItemId)"> <!-- EDITERA PRODUKT -->
                                                <i class="mdi mdi-file-edit md-color-green-600"></i>
											</div>
                                        </td>
                                        <td class="border-bottom border-right uk-text-center">
                                            <div class="wastebasket" @click="deleteItem(orderItemInList.ItemId)"> <!-- TA BORT PRODUKT -->
												<i class="mdi mdi-delete-forever md-color-red-600"></i>
											</div>
                                        </td>
                                        <td class="border-bottom border-right image-column-width"><img :src="orderItemInList.ImageName"></td>
                                        <td class="border-bottom border-right uk-width-auto">
                                            <nuxt-link :to="orderItemInList.Url">
                                                <div>{{ orderItemInList.TeamName }}</div>
                                                <div>{{ orderItemInList.ProductName }}</div>
                                            </nuxt-link>
                                        </td>
                                        <td class="border-bottom border-right uk-width-auto">{{ orderItemInList.ArticleNumber }}</td>
                                        <td class="border-bottom border-right uk-width-auto uk-text-center">{{ orderItemInList.SizeDisplay }}</td>
                                        <td class="border-bottom border-right uk-width-auto uk-text-center">{{ orderItemInList.Quantity }}</td>
                                        <td class="border-bottom border-right uk-width-auto uk-text-right">{{ orderItemInList.Price }} {{ orderInfo.Currency }}</td>
                                    </tr>
                                    <tr class="uk-table-middle">
                                        <td class="border-bottom border-right uk-text-center">
                                            <div @click="startAddItem()"><i class="addicon mdi mdi-plus-circle-outline md-color-green-600"></i></div> <!-- LÄGG TILL PRODUKT -->
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="border-right"></td>
                                        <td class="border-bottom border-right uk-width-auto uk-text-right" colspan="2">Ordersumma</td>
                                        <td class="border-bottom border-right uk-width-auto uk-text-right">{{ orderContent.OrderSummary.OrderSum }} {{ orderInfo.Currency }}</td>
                                    </tr>
                                    <tr class="uk-table-middle">
                                        <td></td>
                                        <td></td>
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
                                        <td></td>
                                        <td></td>
                                        <td class="border-right"></td>
                                        <td class="border-bottom border-right uk-width-auto uk-text-right" colspan="2"><strong>Totalt</strong></td>
                                        <td class="border-bottom border-right uk-width-auto uk-text-right"><strong>{{ orderContent.OrderSummary.Total }} {{ orderInfo.Currency }}</strong></td>
                                    </tr>
                                    <tr class="uk-table-middle">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="border-right"></td>
                                        <td class="border-bottom border-right uk-width-auto uk-text-right" colspan="2">Varav moms</td>
                                        <td class="border-bottom border-right uk-width-auto uk-text-right">{{ orderContent.OrderSummary.Vat }} {{ orderInfo.Currency }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- EDIT ORDERITEM -->
                            <div v-if="updateEditorVisible" :class="{'uk-width-1-3': updateEditorVisible }" class="uk-card uk-padding-small uk-margin-medium-left">
                                <div class="uk-flex uk-flex-between">
                                    <h3 class="uk-card-title uk-padding-remove-vertical uk-padding-remove-horizontal">Editera produkt</h3>
                                    <span class="closeicon" @click="updateEditorVisible = false"><i class="mdi mdi-close-circle md-color-grey-600"></i></span>
                                </div>
                                <!-- Pris -->
                                <div class="uk-margin">
                                    <ScInput v-model="orderItem.Price" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Pris</label>
                                    </ScInput>
                                </div>
                                <!-- Storlek -->
                                <div v-if="orderItem.StockList.length !== 1" class="uk-margin-medium-bottom uk-width-1-1">
                                    <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                    <label class="select-label" for="select-sizeOptionsList">Storlek</label>
                                    <client-only>
                                        <Select2
                                            id="select-sizeOptionsList"
                                            v-model="orderItem.StockId"
                                            :options="orderItem.StockList.map(({ StockId, SizeDisplay }) => ({ id: StockId, text: SizeDisplay }))"
                                            :settings="{ 'width': '100%', 'closeOnSelect': true }"
                                        >
                                        </Select2>
                                    </client-only>
                                    </div>
                                </div>
                                <!-- Tryck -->
                                <div v-if="orderItem.HasPrint == true" class="uk-flex">
                                    <div class="uk-width-1-2 uk-margin-small-right">
                                        <!-- Tryck - Namn -->
                                        <div class="uk-margin-medium-bottom">
                                            <ScInput v-model="orderItem.PrintOptionList[0].Value" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Tryck - Namn</label>
                                            </ScInput>
                                        </div>
                                        <!-- Tryck - Nummer -->
                                        <div class="uk-margin-medium-bottom">
                                            <ScInput v-model="orderItem.PrintOptionList[1].Value" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Tryck - Nummer</label>
                                            </ScInput>
                                        </div>
                                        <!-- Tryck - Patch -->
                                        <div class="uk-margin-medium-bottom">
                                            <PrettyCheck v-model="orderItem.PrintOptionList[2].IsChecked" class="p-icon">
                                                <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Tryck - Patch</span>
                                            </PrettyCheck>
                                        </div>
                                    </div>
                                    <div class="uk-width-1-2">
                                        <!-- Pris -->
                                        <div class="uk-margin-medium-bottom">
                                            <ScInput v-model="orderItem.PrintOptionList[0].Price" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Pris</label>
                                            </ScInput>
                                        </div>
                                        <!-- Pris -->
                                        <div class="uk-margin-medium-bottom">
                                            <ScInput v-model="orderItem.PrintOptionList[1].Price" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Pris</label>
                                            </ScInput>
                                        </div>
                                        <!-- Pris -->
                                        <div class="uk-margin-medium-bottom">
                                            <ScInput v-model="orderItem.PrintOptionList[2].Price" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Pris</label>
                                            </ScInput>
                                        </div>
                                    </div>
                                </div>
                                 <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateItem()">
                                    UPPDATERA
                                </button>
                            </div>
                            <!-- ADD ORDERITEM -->
                            <div v-if="addEditorVisible" :class="{'uk-width-1-3': addEditorVisible }" class="uk-card uk-padding-small uk-margin-medium-left">
                                <div class="uk-flex uk-flex-between">
                                    <h3 class="uk-card-title uk-padding-remove-vertical uk-padding-remove-horizontal">Lägg till produkt</h3>
                                    <span class="closeicon" @click="addEditorVisible = false"><i class="mdi mdi-close-circle md-color-grey-600"></i></span>
                                </div>
                                <!-- ArtikelNr -->
                                <div class="uk-margin">
                                    <ScInput v-model="articleNumber" state="fixed" mode="outline" extra-classes="uk-form-small" v-on:blur="getArticleDetails(articleNumber)">
                                        <label>ArtikelNr</label>
                                    </ScInput>
                                </div>
                                <Alert
                                    :message="errors ? errors[0].Value : ''"
                                    :alertClass="'uk-alert-danger'"
                                    id=3
                                />
                                <div v-if="articleDetails && !errors" :class="{ 'uk-flex': !errors }">
                                    <div class="uk-margin-small-right uk-width-1-4" :class="{ 'uk-hidden': errors }">
                                        <img :src="articleDetails.ProductImage">
                                    </div>
                                    <div :class="{ 'uk-width-3-4': !errors }">
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
                                        <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="addItem(orderInfo.OrderId)">
                                            LÄGG TILL PRODUKT
                                        </button>
                                    </div>
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
import ScInput from '~/components/Input'
import Alert from '~/components/Alert'
import PrettyCheck from 'pretty-checkbox-vue/check'

export default {
    components: {
		ScInput,
		PrettyCheck,
		Alert,
		Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            errors: null,
            infoEditorVisible: false,
            updateEditorVisible: false,
            addEditorVisible: false,
            orderInfo: {},
            orderContent: {},
            orderItem: null,
            articleNumber: null,
            articleDetails: null,
            sizeOptionsList: [],
        }
    },
    watch: {

    },
	mounted: function () {

    },
    computed: {

    },
    methods: {
        async deleteItem(itemId) {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/OrderHandling/PostDeleteItem?itemId=' + itemId)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                        // _this.$store.commit('setAlertVisible', 4) Vi behöver alert här
                    } else {
                        _this.orderContent = response
                        _this.hidePageOverlaySpinner()
                        // _this.$store.commit('setAlertHidden', 4) Vi behöver alert här
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
        startAddItem() {
            this.addEditorVisible = true
            this.updateEditorVisible = false
        },
        async addItem(orderId) {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/OrderHandling/PostAddItem?orderId=' + orderId, _this.articleDetails)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                        // _this.$store.commit('setAlertVisible', 4) Vi behöver alert här
                    } else {
                        _this.orderContent = response
                        _this.addEditorVisible = false
                        _this.hidePageOverlaySpinner()
                        // _this.$store.commit('setAlertHidden', 4) Vi behöver alert här
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
        async updateItem() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/OrderHandling/PostUpdateItem', _this.orderItem )
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                        // _this.$store.commit('setAlertVisible', 4) Vi behöver alert här
                    } else {
                        _this.orderContent = response
                        // _this.orderItem = null
                        _this.updateEditorVisible = false
                        _this.hidePageOverlaySpinner()
                        // _this.$store.commit('setAlertHidden', 4) Vi behöver alert här
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
        async getItemToEdit(itemId) {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/OrderHandling/GetOrderItem?itemId=' + itemId)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                        // _this.$store.commit('setAlertVisible', 4) Vi behöver alert här
                    } else {
                        _this.orderItem = response
                        _this.updateEditorVisible = true
                        _this.addEditorVisible = false
                        _this.hidePageOverlaySpinner()
                        // _this.$store.commit('setAlertHidden', 4) Vi behöver alert här
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
        async getArticleDetails(articleId) {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/Article/GetArticleDetailsByArticleNumber?articleNumber=' + articleId)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                    } else {
                        _this.articleDetails = response
                        _this.articleDetails.ShopId = _this.orderInfo.ShopId
                        _this.sizeOptionsList = response.StockList.map(({ StockId, SizeDisplay }) => ({ id: StockId, text: SizeDisplay }))
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
            this.showPageOverlaySpinner()
            const [ orderInfo, orderContent ] = await Promise.all([
                this.$axios.$get('/webapi/Order/GetOrder?orderId=' + this.$route.params.id),
                this.$axios.$get('/webapi/Order/GetOrderContent?orderId=' + this.$route.params.id),
            ])
            this.orderInfo = orderInfo
            this.orderContent = orderContent
            this.hidePageOverlaySpinner()
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
    .image-column-width {
        width: 50px;
    }
    .wastebasket, .editicon, .addicon, .closeicon {
		cursor: pointer;
	}
</style>