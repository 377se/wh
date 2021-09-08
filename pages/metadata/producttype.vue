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
                        <h1 class="sc-top-bar-title uk-display-inline">Tvättråd</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <div class="uk-grid uk-grid-medium" uk-grid uk-margin>
                    <!-- LISTA -->
                    <div class="uk-width-1-1 uk-width-3-4@m">
                        <ScCard class="uk-card-small">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Lista med produkttyper
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto">
                                    <table :ref="render" class="border-top uk-table uk-table-small uk-text-small uk-margin-remove paymentproviderlist" style="width:99.8%;">
                                        <draggable v-model="productTypeList" tag="tbody" @end="sortProductTypeList">
                                            <tr v-for="(producttype, index) in productTypeList" :key="index" class="uk-table-middle">
                                                <td class="cursor-pointer link-color border-bottom border-left border-right uk-overflow-hidden" style="text-align: left; " @click="getProductTypeById(producttype.Id)">{{ producttype.Name }}</td>
                                            </tr>
                                        </draggable>
                                    </table>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <!-- EDITOR PRODUKTTYP -->
                    <div class="uk-width-1-1 uk-width-1-4@m uk-flex-first uk-flex-last@m" uk-margin>
                        <ScCard class="uk-card-small">
                            <ScCardHeader separator>
                            <ScCardTitle v-if="currentProductTypeObject.Id != 0">
                                Redigera produkttyp
                            </ScCardTitle>
                            <ScCardTitle v-else>
                                Ny produkttyp
                            </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div>
                                    <Alert
                                        :errorlist="this.errors ? this.errors : []"
                                        :message="this.message ? this.message : ''"
                                        :alertClass="'uk-alert-danger'"
                                        id=1
                                    />
                                    <!-- Namn -->
                                    <div class="uk-margin-large-bottom uk-margin-medium-top">
                                        <ScInput v-model="currentProductTypeObject.Name" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Namn</label>
                                        </ScInput>
                                    </div>
                                    <!-- Översättningar -->
                                    <div v-for="language in currentProductTypeObject.ItemList" :key="language.Id" class="uk-margin-medium-bottom uk-margin-medium-top">
                                        <ScInput v-model="language.Description" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>{{ language.Language }}</label>
                                        </ScInput>
                                    </div>
                                    <div class="uk-flex uk-flex-around uk-margin-medium-bottom">
                                        <div v-if="currentProductTypeObject.Id == 0">
                                            <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="createProductType()">SKAPA
                                            </button>
                                        </div>
                                        <div v-else>
                                            <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateProductType()">
                                                UPPDATERA
                                            </button>
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
import ScInput from '~/components/Input'
import { replaceUpdatedObjectInArrayOfObjects } from '~/utils.js'
import draggable from 'vuedraggable'

export default {
	components: {
		Alert,
		ScInput,
		draggable,
    },
    data () {
		return {
            errors: null,
            message: '',
            render: false,
            emptyProductTypeObject: {},
            currentProductTypeObject: {},
            productTypeList: [],
            producttypeById: [],
        }
    },
    computed: {
        sortedItemList: function() {
            return this.currentProductTypeObject.ItemList.sort((p1,p2) => {
                if(p2['IsSelected'] < p1['IsSelected']) return -1; if(p2['IsSelected'] > p1['IsSelected']) return 1;
                return 0
            })
        }
    },
    watch: {
    },
    methods: {
        async createProductType() {
            let _this = this
            _this.currentProductTypeObject = _this.emptyProductTypeObject
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Metadata/CreateProductType', _this.currentProductTypeObject)
            .then(function (res) {
                if (res.ErrorList != null) {
                    _this.errors = res.ErrorList
                    _this.$store.commit('setAlertVisible', 1)
                    _this.$store.dispatch('setBusyOff')
                } else {
                    _this.currentProductTypeObject = res
                    UIkit.modal.dialog('<p class="uk-modal-body">Produkttypen har skapats!</p>')
                    _this.$fetch()
                    _this.$store.dispatch('setBusyOff')
                }
            })
            .catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
            })
        },
        async updateProductType() {
            let _this = this
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Metadata/UpdateProductType', _this.currentProductTypeObject )
            .then(function (updatedproducttype) {
                try {
                    if (updatedproducttype.ErrorList != null ) {
                        _this.errors = updatedproducttype.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.$store.commit('setAlertHidden', 1)
                        _this.$store.dispatch('setBusyOff')
                        replaceUpdatedObjectInArrayOfObjects(_this.productTypeList, updatedproducttype, 'Id')
                        _this.currentProductTypeObject = _this.emptyProductTypeObject
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
        async sortProductTypeList() {
            let _this = this
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Metadata/SortProductTypeList', _this.productTypeList )
            .then(function (sortedproducttypelist) {
                try {
                    if (sortedproducttypelist.ErrorList != null ) {
                        _this.errors = sortedproducttypelist.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.$store.commit('setAlertHidden', 1)
                        _this.$store.dispatch('setBusyOff')
                        _this.productTypeList = sortedproducttypelist
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
        async getProductTypeById(producttypeid) {
            let _this = this
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$get('/webapi/Metadata/GetProductTypeById?id=' + producttypeid)
            .then(function (producttype) {
                try {
                    if (producttype.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.currentProductTypeObject = producttype
                        _this.$store.dispatch('setBusyOff')
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
    },
    async fetch () {
        try {
            const [ emptyproducttypeobject, producttypelist ] = await Promise.all([
                this.$axios.$get('/webapi/Metadata/GetEmptyProductTypeObject'),
                this.$axios.$get('/webapi/Metadata/GetProductTypeList'),
            ])
            this.emptyProductTypeObject = emptyproducttypeobject
            this.currentProductTypeObject = emptyproducttypeobject
            this.productTypeList = producttypelist
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
    .paymentproviderlist {
        table-layout: fixed;
    }
    .summary {
        font-size: 200%;
        font-weight: 700;
        line-height: 1;
    }
    .cursor-pointer {
        cursor: pointer;
    }
    .link-color {
        color: #0088CC;
    }
    .selected {
        background-color: #000;
        color: #fff;
    }
</style>