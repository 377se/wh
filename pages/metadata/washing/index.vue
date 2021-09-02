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
                    <!-- LIST -->
                    <div class="uk-width-1-1 uk-width-3-4@m">
                        <ScCard class="uk-card-small">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Lista med tvättråd
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto">
                                    <table :ref="render" class="uk-table uk-table-small uk-text-small uk-margin-remove paymentproviderlist">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 30%;">Namn</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 70%;">Beskrivning</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(washing, index) in washingMetaList" :key="index" class="uk-table-middle">
                                                <td class="cursor-pointer link-color border-bottom border-left uk-overflow-hidden" style="text-align: left; " @click="getWashingById(washing.Id)">{{ washing.Name }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ washing.Description }}</td>
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
                            <ScCardTitle v-if="currentWashingObject.Id != 0">
                                Redigera tvättråd
                            </ScCardTitle>
                            <ScCardTitle v-else>
                                Nytt tvättråd
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
                                    <div class="uk-margin-medium-bottom uk-margin-medium-top">
                                        <ScInput v-model="currentWashingObject.Name" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Namn</label>
                                        </ScInput>
                                    </div>
                                    <!-- Beskrivning -->
                                    <div class="uk-margin-medium-bottom">
                                        <ScInput v-model="currentWashingObject.Description" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Beskrivning</label>
                                        </ScInput>
                                    </div>
                                    <div class="uk-flex uk-flex-around uk-margin-medium-bottom">
                                        <div v-if="currentWashingObject.Id == 0">
                                            <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="createWashingInstruction()">SKAPA
                                            </button>
                                        </div>
                                        <div v-else>
                                            <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateWashing()">
                                                UPPDATERA
                                            </button>
                                        </div>
                                    </div>
                                    <!-- IKONER -->
                                    <div v-if="currentWashingObject.Id != 0" class="uk-grid uk-grid-medium" uk-grid uk-margin>
                                        <div v-for="icon in currentWashingObject.ItemList" :key="icon.IconId">
                                            <div :class="{ selected: icon.IsSelected }" @click="icon.IsSelected = !icon.IsSelected"><span :class="`${icon.ImageName} pe-2x pe-va`"></span></div>
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
            emptyWashingObject: {},
            currentWashingObject: {},
            washingMetaList: [],
            washingById: [],
        }
    },
    computed: {
    },
    methods: {
        async createWashingInstruction() {
            let _this = this
            _this.currentWashingObject = _this.emptyWashingObject
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Metadata/CreateWashingInstruction', _this.currentWashingObject)
            .then(function (res) {
                if (res.ErrorList != null) {
                    _this.errors = res.ErrorList
                    _this.$store.commit('setAlertVisible', 1)
                    _this.$store.dispatch('setBusyOff')
                } else {
                    _this.currentWashingObject = res
                    UIkit.modal.dialog('<p class="uk-modal-body">Tvättrådet har skapats!</p>')
                    _this.$fetch()
                    _this.$store.dispatch('setBusyOff')
                }
            })
            .catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
            })
        },
        async updateWashing() {
            let _this = this
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Metadata/UpdateWashingInstruction', _this.currentWashingObject )
            .then(function (updatedwashing) {
                try {
                    if (updatedwashing.ErrorList != null ) {
                        _this.errors = updatedwashing.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.$store.commit('setAlertHidden', 1)
                        _this.$store.dispatch('setBusyOff')
                        replaceUpdatedObjectInArrayOfObjects(_this.washingMetaList, updatedwashing, 'Id')
                        _this.currentWashingObject = _this.emptyWashingObject
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
        async getWashingById(washingid) {
            let _this = this
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$get('/webapi/Metadata/GetWashingById?id=' + washingid)
            .then(function (washing) {
                try {
                    if (washing.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.currentWashingObject = washing
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
            const [ emptywashingobject, washingmetalist ] = await Promise.all([
                this.$axios.$get('/webapi/Metadata/GetEmptyWashingObject'),
                this.$axios.$get('/webapi/Metadata/GetWashingMetaList'),
            ])
            this.emptyWashingObject = emptywashingobject
            this.currentWashingObject = emptywashingobject
            this.washingMetaList = washingmetalist
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