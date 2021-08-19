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
                        <h1 class="sc-top-bar-title uk-display-inline">Tullsedel Norge</h1>
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
                                    Skapade tullsedlar
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto">
                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove waybilllist">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 27%;">Datum</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 25%;">Fakturanummer</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 25%;">Berörda ordrar</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: center; width: 10%;">Produkter</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: center; width: 10%;"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(waybill, index) in waybillList" :key="index" class="uk-table-middle">
                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: left;">{{ waybill.CreatedDate }}</td>
                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: left;">{{ waybill.InvoiceNumber }}</td>
                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: left;">{{ waybill.OrdersShipped }}</td>
                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: center;">
                                                    <button class="sc-button sc-button-mini uk-align-center" @click="getProducts(waybill.WaybillId)">VISA</button>
                                                </td>
                                                <td class="border-bottom border-left border-right uk-overflow-hidden" style="text-align: center; ">
                                                    <button @click="printWayBill(waybill.WaybillId)" class="sc-button sc-button-mini uk-align-center">SKRIV&nbsp;UT</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <!-- FILTERMENUS -->
                    <div class="uk-width-1-1 uk-width-1-4@m uk-flex-first uk-flex-last@m" uk-margin>
                        <ScCard class="uk-card-small">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Sök inom period
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
                                    <Alert
                                        :errorlist="this.errors ? this.errors : []"
                                        :message="this.message ? this.message : ''"
                                        :alertClass="'uk-alert-success'"
                                        id=2
                                    />
                                    <div class="uk-text-medium">
                                        Denna tjänst använder du för att generera underlag för de produkter som skickats till Norge. Den hämtar ut ordrar som skickats till Norge, är flaggade som levererade och ännu inte hamnat som underlag via denna sida.
                                    </div>
                                    <div class="uk-width-1-1">
                                        <!-- Fakturanummer (ex SDN05005) -->
                                        <div class="uk-margin uk-margin-large-top">
                                            <ScInput v-model.number="invoice" state="fixed" mode="outline"  extra-classes="uk-form-small">
                                                <label>Fakturanummer (ex SDN05005)</label>
                                            </ScInput>
                                        </div>
                                        <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-medium-top uk-margin-medium-bottom">
                                            <div><button @click="createWaybillList" class="sc-button sc-button-primary uk-align-center uk-margin-medium-right">SKAPA UNDERLAG</button></div>
                                        </div>

                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>
                        <!-- DETALJVY LEVERERADE PRODUKTER MODAL -->
                        <div id="modal-products" class="uk-modal-full uk-modal" data-uk-modal>
                            <div>
                                <div class="uk-modal-header basket-ribbon uk-animation-slide-right">
                                    <!-- sticky -->
                                    <h4 class="uk-modal-title" style="color:#fff; line-height:1; margin:3px 0 0 12px; padding:10px;">Tullsedel Norge - Levererade produkter</h4>
                                    <button
                                        class="uk-offcanvas-close uk-icon uk-close"
                                        style="color:#fff;top:14px;right:12px;"
                                        type="button"
                                        uk-close
                                        uk-toggle="target: #dailysales-modal"/>
                                </div>
                                <div v-if="waybillDetails != null" class="uk-modal-dialog uk-modal-body uk-overflow-auto uk-animation-slide-right" style="padding:0px;height:100vh;background:#ffffff;">
                                    <!-- SUMMERING -->
                                    <div class="uk-width-1-1" uk-margin>
                                        <ScCard class="uk-card-small">
                                                <ScCardBody class="uk-text-center">
                                                    <div class="uk-width-1-1 uk-flex uk-flex-around uk-padding-small">
                                                        <div>
                                                            <div class="summary ">{{ waybillDetails.Details.TotalAmount | thousandsDelimiter }}</div>
                                                            <div class="">totalt värde</div>
                                                        </div>
                                                        <div>
                                                            <div class="summary ">{{ waybillDetails.Details.TotalWeight | thousandsDelimiter }}</div>
                                                            <div class="">total vikt</div>
                                                        </div>
                                                        <div>
                                                            <div class="summary ">{{ waybillDetails.ArticleList.reduce((acc, current) => acc + current.NumberOfItems, 0 ) | thousandsDelimiter }}</div>
                                                            <div class="">produkter</div>
                                                        </div>
                                                        <div>
                                                            <div class="summary ">{{ waybillDetails.Details.NumberOfParcels | thousandsDelimiter }}</div>
                                                            <div class="">paket</div>
                                                        </div>
                                                    </div>
                                                </ScCardBody>
                                        </ScCard>
                                    </div>
                                    <!-- LIST -->
                                    <div class="uk-width-1-1">
                                        <ScCard class="uk-card-small" :key="render">
                                            <ScCardBody>
                                                <div class="uk-overflow-auto">
                                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove waybilllist">
                                                        <thead>
                                                            <tr class="uk-padding-remove-bottom">
                                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 45%;">Produkt</th>
                                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 9%;">Antal</th>
                                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 10%;">Tariff</th>
                                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 10%;">Ursprung</th>
                                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 9%;">Pris/st</th>
                                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 9%;">Totalt pris</th>
                                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 9%;">Total vikt</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(product, index) in waybillDetails.ArticleList" :key="index" class="uk-table-middle">
                                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: left; ">{{ product.Description }}</td>
                                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: right; ">{{ product.NumberOfItems }}</td>
                                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: left; ">{{ product.Tariff }}</td>
                                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: left; ">{{ product.Origin }}</td>
                                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: right; ">{{ product.Price }}</td>
                                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: right; ">{{ product.Amount }}</td>
                                                                <td class="border-bottom border-left border-right uk-overflow-hidden" style="text-align: right; ">{{ product.TotalWeight }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </ScCardBody>
                                        </ScCard>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
            message: '',
            render: false,
            emptyStatsObject: {},
            currentStatsObject: {},
            waybillList: [],
            waybillDetails: null,
            invoice: null,
        }
    },
    watch: {

    },
	mounted: function () {
    },
    computed: {
    },
    methods: {
        hidePageOverlaySpinner () {
            this.$store.commit('toggleProgressOverlay', false);
            this.$store.commit('togglePageOverlay', false)
        },
        showPageOverlaySpinner () {
            this.$store.commit('toggleProgressOverlay', true);
            this.$store.commit('togglePageOverlay', true)
        },
        createWaybillList() {

        },
        printWaybill() {

        },
        async getProducts(waybillid) {
            let _this = this
            _this.waybillDetails = null
            try {
                const [ waybilldetails ] = await Promise.all([
                    this.$axios.$get('/webapi/Waybill/GetWaybillDetails?waybillId=' + waybillid )
                ])
                _this.waybillDetails = waybilldetails
                UIkit.modal('#modal-products').show()
                _this.render = !_this.render
            } catch (err) {
                console.log(err);
            }
		},
    },
    async fetch () {
        try {
            const [ emptywaybill, waybilllist ] = await Promise.all([
                this.$axios.$get('/webapi/Waybill/GetEmptyObject'),
                this.$axios.$get('/webapi/Waybill/GetWaybillList'),
            ])
            this.emptyWayBill = emptywaybill
            this.currentWayBill = emptywaybill
            this.waybillList = waybilllist
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
    .waybilllist {
        table-layout: fixed;
    }
    .summary {
        font-size: 200%;
        font-weight: 700;
        line-height: 1;
    }
    .uk-modal-dialog, .uk-modal-header {
        margin-left: auto;
        width:55vw !important;
        max-width: 800px !important;
        @media only screen and (max-width: 600px) {
            width:85vw !important;
            max-width: 800px !important;
        }
	}
    .uk-modal-header {
		min-height: 50px;
		height: auto;
		padding: 0px;
	}
	.basket-ribbon{
		background: #00838F;
	}

</style>