<template>
    <div>
        <div id="sc-page-wrapper">
            <div id="sc-page-top-bar" class="sc-top-bar">
                <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                    <div class="uk-flex-1">
                            <h1 class="sc-top-bar-title uk-display-inline">Norgereturer</h1>
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
                                    Lista med norgereturer
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto">
                                    <table :ref="render" class="border-top uk-table uk-table-small uk-text-small uk-margin-remove paymentproviderlist" style="width:99.8%;">
                                        <thead>
                                            <tr>
                                                <th class="sticky-headers border-bottom border-left uk-text-small" style="width:30px;"><strong>SiNo</strong></th>
                                                <th class="sticky-headers border-bottom border-left uk-text-small" style="width:200px;"><strong>Beskrivning</strong></th>
                                                <th class="sticky-headers border-bottom border-left uk-text-small" style="width:200px;"><strong>Land</strong></th>
                                                <th class="sticky-headers border-bottom border-left uk-text-small" style="width:100px;"><strong>Tariffnummer</strong></th>
                                                <th class="sticky-headers border-bottom border-left uk-text-small" style="width:100px;"><strong>Vikt</strong></th>
                                                <th class="sticky-headers border-bottom border-left uk-text-small" style="width:100px;"><strong>Antal</strong></th>
                                                <th class="sticky-headers border-bottom border-left uk-text-small" style="width:150px;"><strong>Pris per enhet</strong></th>
                                                <th class="sticky-headers border-bottom border-left border-right uk-text-small" style="width:150px;"><strong>Belopp</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(norwayreturn, index) in norwayReturnList" :key="index" class="uk-table-middle">
                                                <td class="border-bottom border-left" style="text-align: left;">{{ norwayreturn.SiNo }}</td>
                                                <td class="border-bottom border-left" style="text-align: left;">{{ norwayreturn.Description }}</td>
                                                <td class="border-bottom border-left" style="text-align: left;">{{ norwayreturn.Country }}</td>
                                                <td class="border-bottom border-left" style="text-align: left;">{{ norwayreturn.TariffNumber }}</td>
                                                <td class="border-bottom border-left" style="text-align: left;">{{ norwayreturn.Weight }}</td>
                                                <td class="border-bottom border-left" style="text-align: left;">{{ norwayreturn.Quantity }}</td>
                                                <td class="border-bottom border-left" style="text-align: left;">{{ norwayreturn.PricePerUnit }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left;">{{ norwayreturn.Amount }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <!-- SÖK -->
                    <div class="uk-width-1-1 uk-width-1-4@m uk-flex-first uk-flex-last@m" uk-margin>
                        <ScCard class="uk-card-small">
                            <ScCardHeader separator>
                            <ScCardTitle>
                                Sök ordrar
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
                                        <ScInput v-model="orderList" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Orderlista (kommaseparerad lista)</label>
                                        </ScInput>
                                    </div>
                                    <div class="uk-flex uk-flex-around uk-margin-medium-bottom">
                                        <div>
                                            <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="getNorwayReturnList">SÖK
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
    import ScInput from '~/components/Input'
    import Alert from '~/components/Alert'

    export default {
        components: {
            Alert,
            ScInput,
        },
        data() {
            return {
                errors: null,
                message: null,
                render: null,
                orderList: [],
                norwayReturnList: null,
            }
        },
        watch: {
            orderList(newValue, oldValue) {
                this.getNorwayReturnList
            }
        },
        methods: {
            async getNorwayReturnList() {
                    try {
                        await this.$axios.$get(`/webapi/Order/GetNorwayReturnList?orderList=${ this.orderList.replace(/\s+/g, '') }`)
                    .then(norwayreturnlist => {
                        this.norwayReturnList = norwayreturnlist
                    })
                } catch (err) {
                    console.log(err);
                    this.$store.dispatch('setBusyOff')
                }
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>