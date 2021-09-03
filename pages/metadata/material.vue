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
                        Metadata - Material
                    </h1>
                </div>
            </div>
        </div>
        <div id="sc-page-content">
            <div class="uk-grid uk-grid-medium" uk-grid uk-margin>
                <div class="uk-width-1-1 uk-width-2-3@m">
                    <ScCard>
                        <ScCardHeader separator>
                            <ScCardTitle>
                                Lista med material
                            </ScCardTitle>
                        </ScCardHeader>
                        <ScCardBody>
                            <div class="uk-overflow-auto" style="max-height:1200px;">
                                <table class="uk-table uk-table-small uk-text-small uk-margin-remove border-left border-top" style="border-collapse: separate;">
                                    <thead>
                                        <tr class="uk-padding-remove-bottom">
                                            <th v-for="(header, index) in materialList.HeaderList" :key="index" class="sticky-headers border-bottom border-right uk-text-small" style="text-align: left; width: 20%;">{{ header.Name }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(materialrow, index) in materialList.MaterialList"
                                            :key="index"
                                            class="uk-table-middle"
                                        >
                                            <td v-for="material in materialrow.ItemList" :key="material.LanguageId" class="border-right border-bottom" style="text-align: left;">
                                                <ScInput v-model="material.Description" state="fixed" mode="outline"  extra-classes="uk-form-small" @blur="updateMaterial(material)">
                                                </ScInput>
                                            </td>
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
                            <ScCardTitle>
                                Nytt material
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
                                <div class="uk-margin-medium-bottom">
                                    <ScInput v-model="currentMaterialObject.Description" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Material (svenska)</label>
                                    </ScInput>
                                </div>
                                <div class="uk-flex uk-flex-start">
                                    <div>
                                        <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="createMaterial()">
                                            SPARA
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
    import Alert from '~/components/Alert'
    import ScInput from '~/components/Input'

    export default {
        components: {
    		Alert,
    		ScInput,
        },
        data () {
            return {
                errors: null,
                message: null,
                render: false,
                materialList: null,
                emptyMaterialObject: null,
                currentMaterialObject: null,
            }
        },
        methods: {
            async updateMaterial(material) {
                let _this = this
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$post('/webapi/Metadata/UpdateMaterial', material)
                .then(function (material) {
                    _this.$fetch()
                    _this.$store.dispatch('setBusyOff')
                })
                .catch(function (error) {
                    console.log(error)
                    _this.$store.dispatch('setBusyOff')
                })
            },
            async createMaterial() {
                let _this = this
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$post('/webapi/Metadata/CreateMaterial', _this.currentMaterialObject)
                .then(function (res) {
                    if (res.ErrorList != null) {
                        _this.errors = res.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.hidePageOverlaySpinner()
                    } else {
                        UIkit.modal.dialog('<p class="uk-modal-body">Ett nytt material har skapats!</p>')
                        _this.$fetch()
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
            this.$store.dispatch('setBusyOn')
            try {
                const [ emptymaterialobject, materiallist ] = await Promise.all([
                    this.$axios.$get('/webapi/Metadata/GetEmptyMaterialObject'),
                    this.$axios.$get('/webapi/Metadata/GetMaterialMetaList'),
                ])
                this.emptyMaterialObject = emptymaterialobject
                this.currentMaterialObject = emptymaterialobject
                this.materialList = materiallist
            } catch (err) {
                console.log(err);
            }
            this.$store.dispatch('setBusyOff')
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
</style>