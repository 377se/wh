<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
        </div>
    </div>
    <div v-else id="sc-page-wrapper">
        <div id="sc-page-top-bar" class="sc-top-bar">
            <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                <div class="uk-flex-1">
                    <h1 class="sc-top-bar-title">
                        Metadata - Varumärken
                    </h1>
                </div>
            </div>
        </div>
        <div id="sc-page-content">
            <div class="uk-grid uk-grid-medium" uk-grid uk-margin>
                <div class="uk-width-1-1 uk-width-2-3@m">
                    <ScCard>
                        <ScCardHeader separator>
                            <div class="uk-flex uk-flex-between">
                                <ScCardTitle>
                                    Lista med varumärken
                                </ScCardTitle>
                            </div>
                        </ScCardHeader>
                        <ScCardBody>
                            <div class="uk-overflow-auto" style="max-height:800px;">
                                <table :ref="render" class="uk-table uk-table-small uk-text-small uk-margin-remove paymentproviderlist" style="border-collapse: separate;">
                                    <thead>
                                        <tr class="uk-padding-remove-bottom">
                                            <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 150px;"></th>
                                            <th class="sticky-headers border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 90%;">Varumärke</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(brand, index) in brandList" :key="index" class="uk-table-middle" style="height: 50px;">
                                            <td class="border-bottom border-left" style="text-align: left; "><img :src="brand.ImageName"></td>
                                            <td class="cursor-pointer link-color border-bottom border-left border-right uk-overflow-hidden" style="text-align: left; " @click="getBrandById(brand.Id)">{{ brand.Name }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </ScCardBody>
                    </ScCard>
                </div>
                <div class="uk-width-1-1 uk-width-1-3@m uk-flex-first uk-flex-last@m" uk-margin>
                    <ScCard>
                        <ScCardHeader separator>
                            <ScCardTitle v-if="currentBrandObject.Id">
                                Redigera varumärke
                            </ScCardTitle>
                            <ScCardTitle v-else>
                                Skapa varumärke
                            </ScCardTitle>
                        </ScCardHeader>
                        <ScCardBody>
                            <div class="uk-width-1-1">
                                <Alert
                                    :errorlist="errors"
                                    :alertClass="'uk-alert-danger'"
                                    id=1
                                />
                                <!-- BILDUPPLADDNING -->

                                <template v-if="currentBrandObject.Id">
                                    <img :src="currentBrandObject.ImageName">
                                    <div class="uk-padding-small uk-padding-remove-horizontal">
                                        <FileUpload
                                            :brandId="currentBrandObject.Id"
                                            :brandImage="this.brandImage"
                                            @updateBrandImage="getBrandById(currentBrandObject.Id)"
                                        />
                                    </div>
                                </template>

                                <!-- Namn -->
                                <div class="uk-margin-medium-bottom uk-margin-small-top">
                                    <ScInput v-model="currentBrandObject.Name" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Namn</label>
                                    </ScInput>
                                </div>
                                <div class="uk-flex uk-flex-around">
                                    <div v-if="!currentBrandObject.Id">
                                        <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="createBrand()">NYTT&nbsp;VARUMÄRKE
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateBrand()">
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
</template>

<script>
    import 'vue-good-table/dist/vue-good-table.css'
    import ScInput from '~/components/Input'
    import Alert from '~/components/Alert'
    import FileUpload from '~/components/FileUploadBrandImage'

    export default {
        components: {
    		Alert,
    		ScInput,
    		FileUpload,
        },
        data () {
            return {
                errors: null,
                message: null,
                render: false,
                emptyBrandObject: {},
                currentBrandObject: {},
                brandList: [],
                brandImage: null,
            }
        },
        computed: {
        },
        methods: {
            async createBrand() {
                let _this = this
                _this.currentBrandObject = _this.emptyBrandObject
                _this.$store.commit('setAlertHidden', 1)
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$post('/webapi/Metadata/CreateBrand', _this.currentBrandObject)
                .then(function (res) {
                    if (res.ErrorList != null) {
                        _this.errors = res.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.currentBrandObject = res
                        _this.brandList.push(_this.currentBrandObject)
                        _this.$store.dispatch('setBusyOff')
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    _this.$store.dispatch('setBusyOff')
                })
            },
            async updateBrand() {
                let _this = this
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$post('/webapi/Metadata/UpdateBrand', _this.currentBrandObject )
                .then(function (response) {
                    try {
                        if (response.ErrorList != null ) {
                            _this.errors = response.ErrorList
                            _this.$store.commit('setAlertVisible', 1)
                            _this.$store.dispatch('setBusyOff')
                        } else {
                            _this.$store.commit('setAlertHidden', 1)
                            _this.brandList.forEach((brand, index) => {
                                if (brand.Id == _this.currentBrandObject.Id) {
                                    _this.brandList[index] = _this.currentBrandObject
                                }
                            })
                            _this.render = !_this.render
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
            async getBrandById(brandId) {
                let _this = this
                _this.$store.commit('setAlertHidden', 1)
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$get('/webapi/Metadata/GetBrandById?id=' + brandId)
                .then(function (response) {
                    try {
                        if (response.ErrorList != null ) {
                            _this.$store.dispatch('setBusyOff')
                        } else {
                            _this.currentBrandObject = response
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
                const [ emptybrandobject, brandlist ] = await Promise.all([
                    this.$axios.$get('/webapi/Metadata/GetEmptyBrandObject'),
                    this.$axios.$get('/webapi/metadata/GetBrandList'),
                ])
                this.emptyBrandObject = emptybrandobject
                this.currentBrandObject = emptybrandobject
                this.brandList = brandlist
            } catch (err) {
                console.log(err);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .sticky-headers {
        background: white;
        position: sticky;
        top: 0px; /* Don't forget this, required for the stickiness */
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
    .cursor-pointer {
        cursor: pointer;
    }
    .link-color {
        color: #0088CC;
    }
</style>