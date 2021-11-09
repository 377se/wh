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
                        Metadata - Storleksguide
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
                                    Lista med fördefinierade guider
                                </ScCardTitle>
                            </div>
                        </ScCardHeader>
                        <ScCardBody>
                            <div class="uk-overflow-auto" style="max-height:800px;">
                                <table :ref="render" class="uk-table uk-table-small uk-text-small uk-margin-remove paymentproviderlist" style="border-collapse: separate;">
                                    <thead>
                                        <tr class="uk-padding-remove-bottom">
                                            <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 50%;">Guide</th>
                                            <th class="sticky-headers border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 50%;">Typ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(size, index) in sizeList" :key="index" class="uk-table-middle" style="height: 50px;">
                                            <td class="cursor-pointer link-color border-bottom border-left uk-overflow-hidden" style="text-align: left; " @click="getSizeById(size.Id)">{{ size.Name }}</td>
                                            <td class="border-bottom border-left border-right" style="text-align: left; ">{{ size.SizeTypeName }}</td>
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
                            <ScCardTitle v-if="currentSizeObject.Id">
                                Redigera guide
                            </ScCardTitle>
                            <ScCardTitle v-else>
                                Skapa guide
                            </ScCardTitle>
                        </ScCardHeader>
                        <ScCardBody>
                            <div class="uk-width-1-1">
                                <Alert
                                    :errorlist="errors"
                                    :alertClass="'uk-alert-danger'"
                                    id=1
                                />

                                <!-- Namn -->
                                <div class="uk-margin-medium-bottom uk-margin-small-top">
                                    <ScInput v-model="currentSizeObject.Name" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Namn</label>
                                    </ScInput>
                                </div>
                                <!-- Typ -->
                                <div v-if="!currentSizeObject.Id" class="uk-margin uk-width-1-1 uk-margin-medium-top">
                                    <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                        <label class="select-label" for="select-sizeGuideTypeList">Typ</label>
                                            <client-only>
                                                <Select2
                                                    id="select-sizeGuideTypeList"
                                                    v-model.number="currentSizeObject.SizeTypeId"
                                                    :options="sizeGuideTypeList"
                                                    :settings="{ 'width': '100%', 'closeOnSelect': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                    </div>
                                </div>
                                <div v-if="currentSizeObject.Id != 0" class="uk-overflow-auto uk-margin-medium-bottom">
                                    <table v-if="currentSizeObject.ItemList.length > 0" :ref="render" class="uk-table uk-table-small uk-text-small uk-margin-remove paymentproviderlist" style="border-collapse: separate;">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th v-for="(header, index) in currentSizeObject.HeaderList" :key="index" class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 50%;">{{ header.Name }}</th>
                                                <th class="border-left border-top border-right border-bottom"></th>
                                            </tr>
                                        </thead>
                                        <draggable v-model="currentSizeObject.ItemList" tag="tbody">
                                            <tr v-for="(size, index) in currentSizeObject.ItemList" :key="size.Sortorder" class="uk-table-middle" style="height: 50px;">
                                                <td v-if="size.Size != null" class="cursor-pointer link-color border-bottom border-left" style="text-align: left;" key="1">
                                                    <ScInput v-model="size.Size" state="fixed" mode="outline" extra-classes="uk-form-small" style="min-width:40px;">
                                                    </ScInput>
                                                </td>
                                                <td v-if="size.Length != null" class="border-bottom border-left" style="text-align: left;">
                                                    <ScInput v-model.number="size.Length" state="fixed" mode="outline" extra-classes="uk-form-small" style="min-width:40px;">
                                                    </ScInput>
                                                </td>
                                                <td v-if="size.Width != null" class="border-bottom border-left" style="text-align: left; ">
                                                    <ScInput v-model.number="size.Width" state="fixed" mode="outline" extra-classes="uk-form-small" style="min-width:40px;">
                                                    </ScInput>
                                                </td>
                                                <td v-if="size.Volume != null" class="border-bottom border-left" style="text-align: left; ">
                                                    <ScInput v-model.number="size.Volume" state="fixed" mode="outline" extra-classes="uk-form-small" style="min-width:40px;">
                                                    </ScInput>
                                                </td>
                                                <td v-if="size.EU != null" class="border-bottom border-left" style="text-align: left;">
                                                    <ScInput v-model="size.EU" state="fixed" mode="outline" extra-classes="uk-form-small" style="min-width:40px;">
                                                    </ScInput>
                                                </td>
                                                <td v-if="size.UK != null" class="border-bottom border-left" style="text-align: left;">
                                                    <ScInput v-model="size.UK" state="fixed" mode="outline" extra-classes="uk-form-small" style="min-width:40px;">
                                                    </ScInput>
                                                </td>
                                                <td v-if="size.US != null" class="border-bottom border-left" style="text-align: left;">
                                                    <ScInput v-model="size.US" state="fixed" mode="outline" extra-classes="uk-form-small" style="min-width:40px;">
                                                    </ScInput>
                                                </td>
                                                <td class="cursor-pointer border-bottom border-left border-right" style="text-align: center; ">
                                                    <div @click="currentSizeObject.ItemList.splice(index, 1)">
                                                            <i class="mdi mdi-delete-forever md-color-red-600 sc-icon-24"></i>
                                                    </div>
                                                </td>
                                            </tr>

                                            <!-- <tr>
                                                <template v-for="(size, index) in currentSizeObject.HeaderList">
                                                    <td v-if="size.Name == 'Storlek'" class="border-bottom border-left" style="text-align: left;" :key="index">
                                                        <ScInput v-model="currentNewSize.Size" state="fixed" mode="outline" extra-classes="uk-form-small" style="min-width:40px;">
                                                        </ScInput>
                                                    </td>
                                                    <td v-if="size.Name == 'Längd'" class="border-bottom border-left" style="text-align: left;" :key="index">
                                                        <ScInput v-model="currentNewSize.Length" state="fixed" mode="outline" extra-classes="uk-form-small" style="min-width:40px;">
                                                        </ScInput>
                                                    </td>
                                                    <td v-if="size.Name == 'Bredd'" class="border-bottom border-left" style="text-align: left;" :key="index">
                                                        <ScInput v-model="currentNewSize.Width" state="fixed" mode="outline" extra-classes="uk-form-small" style="min-width:40px;">
                                                        </ScInput>
                                                    </td>
                                                    <td v-if="size.Name == 'EU'" class="border-bottom border-left" style="text-align: left;" :key="index">
                                                        <ScInput v-model="currentNewSize.EU" state="fixed" mode="outline" extra-classes="uk-form-small" style="min-width:40px;">
                                                        </ScInput>
                                                    </td>
                                                    <td v-if="size.Name == 'UK'" class="border-bottom border-left" style="text-align: left;" :key="index">
                                                        <ScInput v-model="currentNewSize.UK" state="fixed" mode="outline" extra-classes="uk-form-small" style="min-width:40px;">
                                                        </ScInput>
                                                    </td>
                                                    <td v-if="size.Name == 'US'" class="border-bottom border-left" style="text-align: left;" :key="index">
                                                        <ScInput v-model="currentNewSize.US" state="fixed" mode="outline" extra-classes="uk-form-small" style="min-width:40px;">
                                                        </ScInput>
                                                    </td>
                                                </template>
                                                <td class="cursor-pointer border-bottom border-left border-right" style="text-align: center; ">
                                                </td>
                                            </tr> -->

                                        </draggable>
                                    </table>

                                    <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-small-top">
                                            <i class="mdi mdi-plus-circle-outline md-color-green-600 sc-icon-24 cursor-pointer" @click="addSize(currentNewSize)"></i>
                                    </div>

                                </div>
                                <div class="uk-flex uk-flex-around">
                                    <div v-if="!currentSizeObject.Id">
                                        <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="createSize()">NY&nbsp;GUIDE
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button v-waves.button.light class="sc-button sc-button-primary uk-margin-small-top" @click.prevent="updateSize()">
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
    import draggable from 'vuedraggable'

    export default {
        components: {
    		Alert,
    		ScInput,
            Select2: process.client ? () => import('~/components/Select2') : null,
            draggable,
        },
        data () {
            return {
                errors: null,
                message: null,
                render: false,
                emptySizeObject: {},
                currentSizeObject: {},
                sizeList: [],
                sizeGuideTypeList: [],
                emptyNewSize: {
                    Depth: null,
                    EU: null,
                    ItemId: 0,
                    Length: null,
                    Size: null,
                    Sortorder: 0,
                    UK: null,
                    US: null,
                    Volume: null,
                    Width: null,
                },
                currentNewSize: null,
            }
        },
        computed: {
        },
        mounted () {
        },
        methods: {
            async createSize() {
                let _this = this
                _this.$store.commit('setAlertHidden', 1)
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$post('/webapi/Metadata/CreateSize', _this.currentSizeObject)
                .then(function (res) {
                    if (res.ErrorList != null) {
                        _this.errors = res.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.currentSizeObject = res
                        _this.emptyNewSize = res.StarterKit
                        _this.currentNewSize = _this.emptyNewSize


                        // switch (_this.currentSizeObject.SizeTypeId) {
                        //     case 1:
                        //         _this.currentSizeObject.ItemList[0].Size = '-'
                        //         _this.currentSizeObject.ItemList[0].Length = '-'
                        //         _this.currentSizeObject.ItemList[0].Width = '-'
                        //         break
                        //     case 3:
                        //         _this.currentSizeObject.ItemList[0].EU = '-'
                        //         _this.currentSizeObject.ItemList[0].UK = '-'
                        //         _this.currentSizeObject.ItemList[0].US = '-'
                        //         break
                        //     case 5:
                        //         _this.currentSizeObject.ItemList[0].Width = '-'
                        //         _this.currentSizeObject.ItemList[0].Length = '-'
                        //         _this.currentSizeObject.ItemList[0].Depth = '-'
                        //         break
                        //     case 6:
                        //         _this.currentSizeObject.ItemList[0].Size = '-'
                        //         _this.currentSizeObject.ItemList[0].Width = '-'
                        //         break
                        //     default:
                        //         break
                        // }
                        _this.sizeList.push(_this.currentSizeObject)
                        _this.$store.dispatch('setBusyOff')
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    _this.$store.dispatch('setBusyOff')
                })
            },
            async updateSize() {
                let _this = this
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$post('/webapi/Metadata/UpdateSize', _this.currentSizeObject )
                .then(function (response) {
                    try {
                        if (response.ErrorList != null ) {
                            _this.errors = response.ErrorList
                            _this.$store.commit('setAlertVisible', 1)
                            _this.$store.dispatch('setBusyOff')
                        } else {
                            _this.$store.commit('setAlertHidden', 1)
                            _this.sizeList.forEach((size, index) => {
                                if (size.Id == _this.currentSizeObject.Id) {
                                    _this.sizeList[index] = _this.currentSizeObject
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
            async getSizeById(sizeId) {
                let _this = this
                _this.$store.commit('setAlertHidden', 1)
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$get('/webapi/Metadata/GetSizeById?id=' + sizeId)
                .then(function (response) {
                    try {
                        if (response.ErrorList != null ) {
                            _this.$store.dispatch('setBusyOff')
                        } else {
                            _this.currentSizeObject = response
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
            addSize(newsize) {
                this.currentSizeObject.ItemList.push(newsize)
                this.currentNewSize = this.emptyNewSize
            },
        },
        async fetch () {
            try {
                const [ emptysizeobject, sizeguidetypelist, sizelist ] = await Promise.all([
                    this.$axios.$get('/webapi/Metadata/GetEmptySizeObject'),
                    this.$axios.$get('/webapi/Metadata/GetSizeGuideTypeList'),
                    this.$axios.$get('/webapi/metadata/GetSizeList'),
                ])
                this.emptySizeObject = emptysizeobject
                this.currentSizeObject = emptysizeobject
    			this.sizeGuideTypeList = sizeguidetypelist.map(({ Id, Name }) => ({ id: Id, text: Name }))
                this.sizeList = sizelist
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
    .cursor-pointer {
        cursor: pointer;
    }
    .link-color {
        color: #0088CC;
    }
</style>