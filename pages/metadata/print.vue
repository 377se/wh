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
                        Metadata - Tryck
                    </h1>
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
                                    Hantera de namn som kan förväljas som tryck på matchtröja
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto"  style="max-height:800px;">
                                    <table :ref="render" class="uk-table uk-table-small uk-text-small uk-margin-remove paymentproviderlist" style="border-collapse: separate;">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: center; width: 20px;"></th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 150px;">Lag</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 200px;">Namn</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 20px;">Nummer</th>
                                                <th class="sticky-headers border-top border-bottom border-left border-right uk-text-small" style="text-align: center; width: 20px;"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(print, index) in printList" :key="index" class="uk-table-middle">
                                                <td class="border-bottom border-left" style="text-align: left;"><img :src="print.ImageName" alt=""></td>
                                                <td class="cursor-pointer link-color border-bottom border-left" style="text-align: left;">{{ print.TeamName }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ print.Name }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ print.Number }}</td>
                                                <td class="cursor-pointer border-bottom border-left border-right" style="text-align: center; ">
                                                 <div @click="preDeletePrint(print)">
                                                        <i class="mdi mdi-delete-forever md-color-red-600 sc-icon-24"></i>
                                                    </div>
                                                </td>
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
                            <ScCardTitle>
                                Skapa ny
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
                                    <!-- LAG -->
                                    <div class="uk-margin uk-width-1-1 uk-margin-medium-top">
                                        <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <label class="select-label" for="select-team">Lag</label>
                                                <client-only>
                                                    <Select2
                                                        id="select-leagueList"
                                                        v-model.number="currentPrintObject.TeamId"
                                                        :options="teamList"
                                                        :settings="{ 'width': '100%', 'closeOnSelect': true }"
                                                    >
                                                    </Select2>
                                                </client-only>
                                        </div>
                                    </div>
                                    <!-- Namn -->
                                    <div class="uk-margin-medium-bottom">
                                        <ScInput v-model="currentPrintObject.Name" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Namn</label>
                                        </ScInput>
                                    </div>
                                    <!-- Nummer -->
                                    <div class="uk-margin-medium-bottom">
                                        <ScInput v-model.number="currentPrintObject.Number" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Nummer</label>
                                        </ScInput>
                                    </div>
                                    <div class="uk-flex uk-flex-around uk-margin-medium-bottom">
                                        <div>
                                            <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="createPrint()">SKAPA&nbsp;NY
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
            Select2: process.client ? () => import('~/components/Select2') : null,
        },
        data () {
            return {
                errors: null,
                message: null,
                render: false,
                printList: null,
                emptyPrintObject: null,
                currentPrintObject: null,
                teamList: [],
            }
        },
        methods: {
            preDeletePrint(print) {
                let _this = this
                UIkit.modal.confirm('Vill du verkligen radera detta tryck?', {labels: { ok: 'JA', cancel: 'NEJ' }}).then(function() {
                    _this.deletePrint(print)
                    console.log('DELETE')
                }, function () {
                    console.log('Rejected.')
                })
            },
            async deletePrint(print) {
                let _this = this
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$post('/webapi/Metadata/DeletePrint', print)
                .then(function (print) {
                    _this.$fetch()
                    _this.$store.dispatch('setBusyOff')
                })
                .catch(function (error) {
                    console.log(error)
                    _this.$store.dispatch('setBusyOff')
                })
            },
            async createPrint() {
                let _this = this
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$post('/webapi/Metadata/CreatePrint', _this.currentPrintObject)
                .then(function (res) {
                    if (res.ErrorList != null) {
                        _this.errors = res.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        UIkit.modal.dialog('<p class="uk-modal-body">Ett nytt tryck har skapats!</p>')
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
                const [ emptyprintobject, printlist, teamlist ] = await Promise.all([
                    this.$axios.$get('/webapi/Metadata/GetEmptyPrintObject'),
                    this.$axios.$get('/webapi/Metadata/GetPrintList'),
				    this.$axios.$get('/webapi/Metadata/GetTeamList'),
                ])
                this.emptyPrintObject = emptyprintobject
                this.currentPrintObject = emptyprintobject
                this.printList = printlist
    			this.teamList = teamlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
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
    .cursor-pointer {
        cursor: pointer;
    }
</style>