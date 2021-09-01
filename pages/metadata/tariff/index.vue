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
                        <h1 class="sc-top-bar-title uk-display-inline">Tariffkoder</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <div class="uk-grid uk-grid-medium" uk-grid uk-margin>
                    <!-- LIST -->
                    <div class="uk-width-1-1 uk-width-3-4@m">
                        <ScCard class="uk-card-small">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Lista med tariffkoder
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto">
                                    <table :ref="render" class="uk-table uk-table-small uk-text-small uk-margin-remove paymentproviderlist">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 150px;">Tariffkod</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 200px;">Beskrivning</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 100px;">Antal produkter</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(tariff, index) in tariffList" :key="index" class="uk-table-middle">
                                                <td class="cursor-pointer link-color border-bottom border-left uk-overflow-hidden" style="text-align: left; " @click="getTariffToEdit(tariff.Id)">{{ tariff.Name }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ tariff.Descp }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ tariff.NumberOfItems }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <!-- NY TARIFFKOD -->
                    <div class="uk-width-1-1 uk-width-1-4@m uk-flex-first uk-flex-last@m" uk-margin>
                        <ScCard class="uk-card-small">
                            <ScCardHeader separator>
                            <ScCardTitle v-if="currentTariffObject.MetadataId != 0">
                                Redigera tariffkod
                            </ScCardTitle>
                            <ScCardTitle v-else>
                                Ny tariffkod
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
                                    <!-- Tariffkod -->
                                    <div class="uk-margin-medium-bottom uk-margin-medium-top">
                                        <ScInput v-model="currentTariffObject.Descp" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Tariffkod</label>
                                        </ScInput>
                                    </div>
                                    <!-- Beskrivning -->
                                    <div class="uk-margin-medium-bottom">
                                        <ScInput v-model="currentTariffObject.MetadataDescription" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Beskrivning</label>
                                        </ScInput>
                                    </div>
                                    <div class="uk-flex uk-flex-around uk-margin-medium-bottom">
                                        <div v-if="currentTariffObject.MetadataId == 0">
                                            <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="createTariff()">NY&nbsp;TARIFFKOD
                                            </button>
                                        </div>
                                        <div v-else>
                                            <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateTariff()">
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
import { XlsxWorkbook, XlsxSheet, XlsxDownload } from "vue-xlsx"
import _ from "lodash"

export default {
	components: {
		Alert,
		ScInput,
    },
    data () {
		return {
            errors: null,
            message: '',
            render: false,
            emptyTariffObject: {},
            currentTariffObject: {},
            tariffList: [],
        }
    },
    methods: {
        async createTariff() {
            let _this = this
            _this.currentTariffObject = _this.emptyTariffObject
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Metadata/CreateMetadata', _this.currentTariffObject)
            .then(function (res) {
                if (res.ErrorList != null) {
                    _this.errors = res.ErrorList
                    _this.$store.commit('setAlertVisible', 1)
                    _this.$store.dispatch('setBusyOff')
                } else {
                    _this.currentTariffObject = res
                    UIkit.modal.dialog('<p class="uk-modal-body">Tariffkoden har skapats!</p>')
                    _this.$fetch()
                    _this.$store.dispatch('setBusyOff')
                }
            })
            .catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
            })
        },
        async updateTariff() {
            let _this = this
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Metadata/UpdateMetadata', _this.currentTariffObject )
            .then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.errors = response.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.$store.commit('setAlertHidden', 1)
                        _this.$store.dispatch('setBusyOff')
                        _this.render = !_this.render
                        _this.currentTariffObject = _this.emptyTariffObject
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
        async getTariffToEdit(tariffid) {
            let _this = this
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$get('/webapi/Metadata/GetTariffDetails?id=' + tariffid)
            .then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.currentTariffObject = response
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
            const [ emptytariffobject, tarifflist ] = await Promise.all([
                this.$axios.$get('/webapi/Metadata/GetEmptyMetadata?typeId=12'),
                this.$axios.$get('/webapi/Metadata/GetTariffList'),
            ])
            this.emptyTariffObject = emptytariffobject
            this.currentTariffObject = emptytariffobject
            this.tariffList = tarifflist
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
    }</style>