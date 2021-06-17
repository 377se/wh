<template>
    <div>
        <div id="sc-page-wrapper">
            {{ hidePageOverlaySpinner() }}
            <div id="sc-page-top-bar" class="sc-top-bar">
                <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                    <div class="uk-flex-1">
					    <h1 class="sc-top-bar-title uk-display-inline">Extensions {{ extensionTypeId ? '- ' + extensionTypeOptionsList.find( ({ id }) => id == extensionTypeId ).text : '' }}</h1>
				    </div>
                </div>
            </div>
	        <div id="sc-page-content">
				<ScCard>
					<ScCardBody>
						<div id="header-area" class="uk-flex uk-margin-medium-bottom">
							<div class="uk-margin-medium-bottom uk-width-1-1">
								<!-- ExtensionType -->
                                <div class="uk-flex uk-flex-middle">
                                    <div class="uk-width-4-5 uk-margin-medium-right sc-input-wrapper sc-input-wrapper-outline sc-input-filled uk-position-z-index">
                                        <client-only>
                                            <Select2
                                                id="select-extensiontypelist"
                                                v-model="extensionTypeId"
                                                :options="extensionTypeOptionsList"
                                                :settings="{ 'width': '100%', 'placeholder': 'Välj extensiontyp', 'closeOnSelect': true }"
                                                @select="getShopListByExtensionType()"
                                            >
                                            </Select2>
                                        </client-only>
                                    </div>
                                    <div v-if="extensionTypeId" class="uk-width-1-5 uk-flex uk-flex-middle" @click="getEmptyExtension()">
                                        <i class="addicon mdi mdi-plus-circle-outline md-color-green-600 uk-margin-small-right"></i>
                                        <span class="addicon uk-text-middle">Skapa ny extension</span> <!-- SKAPA NY EXTENSION -->
                                    </div>
                                </div>
                                <!-- Shopdrop & Summary -->
                                <div class="uk-flex uk-flex-middle uk-flex-between">
                                    <div v-if="extensionTypeId == 3" class="uk-margin-medium-bottom uk-margin-medium-top uk-width-1-3">
                                        <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                        <client-only>
                                            <Select2
                                                id="select-shopList"
                                                v-model="shopId"
                                                :options="shopList"
                                                :settings="{ 'width': '100%', 'placeholder': 'Välj shop', 'closeOnSelect': true }"
                                                @select="getExtensionListByExtensionTypeId"
                                            >
                                            </Select2>
                                        </client-only>
                                        </div>
                                    </div>
                                    <div class="uk-width-1-2 uk-margin-medium-bottom uk-margin-medium-top" v-if="extensionList.length != 0">
                                        {{ extensionList.Summary[0].Name }}: {{ extensionList.Summary[0].ItemsSold }}
                                    </div>
                                </div>
							</div>
						</div>
                        <div v-if="extensionTypeId" class="uk-flex">
                            <!-- EXTENSIONS -->
                            <div class="uk-width-1-1 extensionlist-container uk-overflow-auto" :class="{'uk-width-2-3': editorVisible }">
                                <table class="border-all extensionlist uk-card uk-box-shadow-small uk-margin-remove-bottom uk-table uk-table-small uk-table-middle uk-text-small">
                                    <thead>
                                        <tr>
                                            <td class="border-bottom border-right uk-text-center" style="width:4%;"><strong>Aktiv</strong></td>
                                            <td class="border-bottom border-right uk-text-center" style="width:5%;"><strong>Bild</strong></td>
                                            <td class="border-bottom border-right uk-text-left" style="width:15%;"><strong>Artikelnummer</strong></td>
                                            <td class="border-bottom border-right uk-text-left" style="width:15%;"><strong>Artikelnamn</strong></td>
                                            <td class="border-bottom border-right uk-text-left" style="width:13%;"><strong>Kopplad mot</strong></td>
                                            <td class="border-bottom border-right uk-text-right" style="width:4%;"><strong>Pris</strong></td>
                                            <td class="border-bottom border-right uk-text-right" style="width:5%;"><strong>Ant sålda</strong></td>
                                            <td class="border-bottom border-right uk-text-center" style="width:10%;" colspan="2"></td>
                                        </tr>
                                    </thead>
                                        <draggable tag="tbody" v-model="extensionList.ItemList" @start="drag = true" @end="drag = false" @change="sortExtensionList" v-bind="dragOptions">
                                            <tr v-for="extension in extensionList.ItemList" :key="extension.ExtensionId" class="uk-table-middle">
                                                <td class="border-bottom border-left border-right uk-text-center">
                                                    <i v-if="extension.IsActive" class="mdi mdi-checkbox-marked-circle md-color-green-600"></i>
                                                </td>
                                                <td class="border-bottom border-right uk-width-auto"><img class="uk-preserve-width" :src="extension.ImageName"></td>
                                                <td class="border-bottom border-right uk-width-auto">{{ extension.ArticleNumber }}</td>
                                                <td class="border-bottom border-right uk-width-auto">{{ extension.ArticleName }}</td>
                                                <td v-if="extensionTypeId == 3" class="border-bottom border-right uk-width-auto uk-text-left">{{ shopOptionsList.find( ({ id }) => id == extension.ShopId).text }}</td>
                                                <td v-else class="border-bottom border-right uk-width-auto uk-text-left">{{ extension.ParentName }}</td>
                                                <td class="border-bottom border-right uk-width-auto uk-text-right">{{ extension.ExtensionPrice }}</td>
                                                <td class="border-bottom border-right uk-width-auto uk-text-right">{{ extension.ItemsSold }}</td>
                                                <td class="border-bottom border-right uk-text-center">
                                                    <div class="editicon" @click="getExtensionToEdit(extension.ExtensionId)"> <!-- EDITERA EXTENSION -->
                                                    <i class="mdi mdi-file-edit md-color-green-600"></i>
                                                    </div>
                                                </td>
                                                <td class="border-bottom border-right uk-text-center"> <!-- TA BORT EXTENSION -->
                                                    <div v-if="extension.IsDeleteable" class="wastebasket" @click="deleteExtension(extension.ExtensionId, extension.ShopId)">
                                                        <i class="mdi mdi-delete-forever md-color-red-600 sc-icon-28"></i>
                                                    </div>
                                                    <div v-else>
                                                        <i class="mdi mdi-delete-off md-color-gray-600 sc-icon-28"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        </draggable>
                                    <tfoot>
                                        <tr
                                            v-for="(summary, index) in extensionList.Summary" :key="index">
                                            <td class="border-bottom border-right uk-text-right" colspan="6"><strong>{{ summary.Name }}</strong></td>
                                            <td class="border-bottom border-right uk-width-auto uk-text-right">{{ summary.ItemsSold }}</td>
                                            <td class="border-bottom border-right uk-text-center" style="width:10%;" colspan="2"></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <!-- EDIT EXTENSION -->
                            <div v-if="editorVisible && extensionItem" :class="{'uk-width-1-3': editorVisible }" class="uk-card uk-padding-small uk-margin-medium-left md-bg-grey-200">
                                <div class="uk-flex uk-flex-between">
                                    <h3 class="uk-card-title uk-padding-remove-vertical uk-padding-remove-horizontal">Skapa/Editera extension</h3>
                                    <span class="closeicon" @click="editorVisible = false"><i class="mdi mdi-close-circle md-color-grey-600"></i></span>
                                </div>
                                <div>
                                <!-- BILD -->
                                    <img :src="extensionItem.ImageName">
                                </div>
                                <Alert
                                    :errorlist="errors"
                                    message=""
                                    :alertClass="'uk-alert-danger'"
                                    id=1
                                />
                                <!-- Shop -->
                                <div v-if="extensionItem.ExtensionTypeId != 1" class="uk-margin-medium-bottom uk-margin-medium-top uk-width-1-1">
                                    <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                    <label class="select-label" for="select-shopOptionsList">Shop</label>
                                    <client-only>
                                        <Select2
                                            id="select-shopOptionsList"
                                            v-model="shopId"
                                            :options="shopOptionsList"
                                            :settings="{ 'width': '100%', 'placeholder': 'Välj shop', 'closeOnSelect': true }"
                                            @select="getExtensionListByExtensionTypeId"
                                        >
                                        </Select2>
                                    </client-only>
                                    </div>
                                </div>
                                <!-- Koppla mot -->
                                <div v-if="extensionItem.ExtensionTypeId == 1" class="uk-margin-medium-bottom uk-margin-medium-top uk-width-1-1">
                                    <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                    <label class="select-label" for="select-MemberPackageList">Koppla mot</label>
                                    <client-only>
                                        <Select2
                                            id="select-MemberPackageList"
                                            v-model="extensionItem.ParentProductId"
                                            :options="extensionItem.MemberPackageList.map(({ ArticleId, ArticleName }) => ({ id: ArticleId, text: ArticleName }))"
                                            :settings="{ 'width': '100%', 'placeholder': 'Välj artikel att koppla mot', 'closeOnSelect': true }"
                                        >
                                        </Select2>
                                    </client-only>
                                    </div>
                                </div>
                                <!-- Artikelnummer -->
                                <div class="uk-margin">
                                    <ScInput v-model="extensionItem.ArticleNumber" state="fixed" mode="outline" extra-classes="uk-form-small" v-on:blur="getArticleDetailsByArticleNumber(extensionItem.ArticleNumber)">
                                        <label>Artikelnummer</label>
                                    </ScInput>
                                </div>
                                <!-- Artikelnamn -->
                                <div v-if="extensionItem.ExtensionId" class="uk-margin">
                                    <ScInput v-model="extensionItem.ArticleName" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Artikelnamn</label>
                                    </ScInput>
                                </div>
                                <!-- Pris -->
                                <div v-if="extensionItem.ExtensionId" class="uk-margin">
                                    <ScInput v-model="extensionItem.ExtensionPrice" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Pris</label>
                                    </ScInput>
                                </div>
                                <!-- Startdatum -->
                                <div v-if="extensionItem.ExtensionId" class="uk-margin">
                                    <ScInput v-model="extensionItem.StartDate" v-flatpickr="{ 'locale': Swedish }" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Startdatum</label>
                                    </ScInput>
                                </div>
                                <!-- Slutdatum -->
                                <div v-if="extensionItem.ExtensionId" class="uk-margin">
                                    <ScInput v-model="extensionItem.ValidThru" v-flatpickr="{ 'locale': Swedish }" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Slutdatum</label>
                                    </ScInput>
                                </div>
                                <!-- Aktiv -->
                                <div v-if="extensionItem.ExtensionId" class="uk-margin uk-width-1-1">
                                    <div>
                                        <ul class="uk-list uk-margin-remove-top">
                                            <li class="uk-text-small">
                                                <PrettyCheck v-model="extensionItem.IsActive" class="p-icon">
                                                    <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Aktiv?</span>
                                                </PrettyCheck>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <button v-if="extensionItem.ExtensionId" v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateExtension()">
                                    SPARA/UPPDATERA
                                </button>
                            </div>
                        </div>
                    </ScCardBody>
                </ScCard>
            </div>
        </div>
    </div>
</template>

<script>
import Alert from '~/components/Alert'
import ScInput from '~/components/Input'
import PrettyCheck from 'pretty-checkbox-vue/check'
import FileUpload from '~/components/FileUploadBanner'
import { Swedish } from "flatpickr/dist/l10n/sv.js"
import draggable from 'vuedraggable'
if(process.client) {
	require('~/plugins/flatpickr');
}

export default {
    components: {
		ScInput,
		PrettyCheck,
		Alert,
		FileUpload,
        Swedish,
        draggable,
		Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            extensionId: null,
            extensionTypeId: null,
            extensionTypeOptionsList: null,
            extensionList: [],
            extensionItem: null,
            editorVisible: false,
            isNewExtension: false,
            shopOptionsList: null,
            shopList: null,
            shopId: 0,
    		errors: null,
    		Swedish,
            drag: false,
        }
    },
	watch: {
		extensionTypeId: function () {
			this.extensionList = []
			this.getExtensionListByExtensionTypeId(this.extensionTypeId, this.shopId)
		},
		shopId: function () {
			// this.shopId != 0 ? this.shopId = 0 : null
		},
	},
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            }
        },
    },
	mounted () {
        this.getExtensionTypeList()
    },
    methods: {
		async getExtensionListByExtensionTypeId() {
			{{ this.showPageOverlaySpinner() }}
            this.extensionList = []
            // !this.isNewExtension ? this.extensionItem = null : null
            // !this.isNewExtension ? this.editorVisible = false : null
			await this.$axios.$get('/webapi/Extension/GetExtensionList?extensionTypeId=' + this.extensionTypeId + '&shopId=' + this.shopId )
			.then( extensionlist => {
				this.extensionList = extensionlist
                {{ this.hidePageOverlaySpinner() }}
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
		async getExtensionTypeList() {
			{{ this.showPageOverlaySpinner() }}
			await this.$axios.$get('/webapi/Metadata/GetExtensionTypeList')
			.then( extensiontypelist => {
				this.extensionTypeOptionsList = extensiontypelist.map(({ Id, Name }) => ({ id: Id, text: Name }))
				{{ this.hidePageOverlaySpinner() }}
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
        async getExtensionToEdit(extensionId) {
			let _this = this
            _this.isNewExtension = false
            _this.$store.commit('setAlertHidden', 1)
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/Extension/GetExtensionById?extensionId=' + extensionId)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                    } else {
                        _this.extensionItem = response
                        _this.editorVisible = true
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
        async deleteExtension(extensionId, shopId) {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Extension/PostDeleteExtension?extensionId=' + extensionId + '&shopId=' + shopId)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                    } else {
                        _this.extensionList = response
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
        async updateExtension() {
			let _this = this
            _this.errors = null
            _this.$store.commit('setAlertHidden', 1)
            _this.isNewBanner = true
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Extension/PostUpdateExtension', _this.extensionItem )
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.errors = response.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.hidePageOverlaySpinner()
                    } else {
                        _this.$store.commit('setAlertHidden', 1)
                        _this.getExtensionListByExtensionTypeId()
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
        async sortExtensionList() {
			let _this = this
            _this.errors = null
            _this.$store.commit('setAlertHidden', 1)
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Extension/SortExtensionList', _this.extensionList )
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.errors = response.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.hidePageOverlaySpinner()
                    } else {
                        _this.$store.commit('setAlertHidden', 1)
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
        async getShopListByExtensionType() {
			let _this = this
            this.shopId != 0 ? this.shopId = 0 : null
            _this.$store.commit('setAlertHidden', 1)
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/Shop/GetShopListByExtensionType?extensionTypeId=' + _this.extensionTypeId)
			.then(function (shops) {
                try {
                    if (shops.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                    } else {
                        _this.shopOptionsList = shops.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
                        _this.shopList = shops.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
                        _this.shopList.push({id: 0, text: 'Alla shopar'})
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
        async getEmptyExtension() {
			let _this = this
            _this.isNewExtension = true
            _this.editorVisible = true
            _this.$store.commit('setAlertHidden', 1)
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/Extension/GetEmptyObject?extensionTypeId=' + _this.extensionTypeId + '&shopId=' + this.shopId)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                    } else {
                        _this.extensionItem = response
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
        async createExtension() {
			let _this = this
            _this.errors = null
            _this.extensionTypeId == 1 ? _this.extensionItem.ShopId = 1 : null
            _this.extensionTypeId == 2 ? _this.extensionItem.ShopId = 2 : null
            _this.extensionTypeId == 3 ? _this.extensionItem.ShopId = _this.shopId : null
            _this.$store.commit('setAlertHidden', 1)
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Extension/PostCreateExtension', _this.extensionItem)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                    } else {
                        _this.extensionItem = response
                        _this.hidePageOverlaySpinner()
                        _this.getExtensionListByExtensionTypeId()
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
        async getArticleDetailsByArticleNumber(articleNumber) {
			let _this = this
            _this.$store.commit('setAlertHidden', 4)
            _this.showPageOverlaySpinner()
            _this.$store.commit('setAlertHidden', 3)
			await this.$axios.$get('/webapi/Article/GetArticleDetailsByArticleNumber?articleNumber=' + articleNumber)
			.then(function (response) {
                try {
                    if ( response.ErrorList != null ) {
                        _this.errorsArticleDetails = response.ErrorList
                        _this.hidePageOverlaySpinner()
                        _this.$store.commit('setAlertVisible', 3)
                    } else {
                        _this.extensionItem.ArticleId = response.ArticleId
                        _this.extensionItem.ArticleName = response.ProductName
                        _this.extensionItem.ExtensionId == 0 ? _this.createExtension() : _this.updateExtension()
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
}
</script>

<style lang="scss" scoped>
    .extensionlist {
        line-height: 1;
        width: 99%;
        margin: 1px 1px;
    }
    .extensionlist-container {
        height: 75vh;
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
    .wastebasket, .editicon, .addicon, .closeicon {
		cursor: pointer;
	}
    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }
</style>
