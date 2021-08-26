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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(waybill, index) in waybillList.slice((pageNum-1) * numberViewed, pageNum * numberViewed)" :key="index" class="uk-table-middle">
                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: left;">{{ waybill.CreatedDate }}</td>
                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: left;">{{ waybill.InvoiceNumber }}</td>
                                                <td class="border-bottom border-left uk-overflow-hidden" style="text-align: left;">{{ waybill.OrdersShipped }}</td>
                                                <td class="border-bottom border-left border-right uk-overflow-hidden" style="text-align: center;">
                                                    <button class="sc-button sc-button-mini uk-align-center" @click="getProducts(waybill.WaybillId, 1)">VISA</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- PAGINATION -->
                                <ul class="uk-pagination uk-flex-center uk-margin-bottom">
                                    <li v-if="pageNum > 1">
                                        <a href="#" @click.prevent="previous"><span uk-pagination-previous></span>Föregående</a>
                                    </li>
                                    <li>
                                        <span>{{ pageNum }}/{{ totalPages }}</span>
                                    </li>
                                    <li v-if="pageNum < totalPages">
                                        <a href="#" @click.prevent="next">Nästa<span uk-pagination-next></span></a>
                                    </li>
                                </ul>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <!-- FILTERMENUS -->
                    <div class="uk-width-1-1 uk-width-1-4@m uk-flex-first uk-flex-last@m" uk-margin>
                        <ScCard class="uk-card-small">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Skapa underlag
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
                                            <ScInput v-model="currentWayBill.InvoiceNumber" state="fixed" mode="outline"  extra-classes="uk-form-small">
                                                <label>Fakturanummer (ex SDN05005)</label>
                                            </ScInput>
                                        </div>
                                        <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-medium-top uk-margin-medium-bottom">
                                            <div><button @click="createWaybill" class="sc-button sc-button-primary uk-align-center uk-margin-medium-right">SKAPA UNDERLAG</button></div>
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
                                                    <div class="uk-width-1-1 uk-flex uk-flex-around uk-flex-middle uk-padding-small">
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
                                                        <div>
                                                            <button v-print="printWaybill" class="sc-button sc-button-primary uk-align-center">SKRIV&nbsp;UT</button>
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

        <!-- TULLSEDEL - UTSKRIFT -->
        <div v-if="waybillDetails" id="page-wrap-waybill" style="clear: both; page-break-after: always;" class="waybill-printed">

            <div id="header">Invoice</div>

            <div id="invoicedetails">
                Invoice date: {{ waybillDetails.Details.InvoiceDate }}<br />
                Invoice no: {{ waybillDetails.Details.InvoiceNumber }}<br />
                Terms of payment: 30 days net<br />
                Terms of delivery: DAP - Oslo<br />
                <br />
                <strong>SENDER</strong><br />
                377 Sport AB<br />
                Stensätravägen 9A<br />
                127 39 Skärholmen<br />
                SWEDEN<br />
                EORI: SE5566841465

            </div>

           <div id="consignee">
                <strong>CONSIGNEE</strong><br />
                377 Sport AS<br />
                c/o Praksisutvikling AS<br />
                Postboks 169<br />
                0130 Oslo<br />
                NORWAY<br />
                VAT: NO 913 444 019<br />
                <br />
                Number of parcels: {{ waybillDetails.Details.NumberOfParcels }}<br />
                Weight: {{ waybillDetails.Details.TotalWeight }} kg

            </div>

            <div id="buyer">
                <strong>BUYER</strong><br />
                377 Sport AS<br />
                c/o Praksisutvikling AS<br />
                Postboks 169<br />
                0130 Oslo<br />
                NORWAY<br />
                VAT: NO 913 444 019<br />
                <br />
                Contact person: Svein Berntzen<br />
                Phone: +47 917 05 561<br />
                E-mail: svein@nettregnskap.net<br />

            </div>

            <div style="clear: both"></div>

            <div class="order">
                <table class="items">
                    <thead>
                        <tr>
                            <th>SI.NO</th>
                            <th>DESCRIPTION</th>
                            <th>COUNTRY</th>
                            <th style="text-align: center;">TARIFF.NO</th>
                            <th style="text-align: center;">WEIGHT</th>
                            <th style="text-align: center;">QTY</th>
                            <th style="text-align: right;">PRICE/U</th>
                            <th style="text-align: right;">AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="waybillDetails != null">
                            <tr v-for="article in waybillDetails.ArticleList" :key="article.SnNo" class="item-row">
                                <td class="sino">{{ article.SnNo }}</td>
                                <td class="description"><br />{{ article.Description }}</td>
                                <td class="country">{{ article.Origin }}</td>
                                <td class="tariff">{{ article.Tariff }}</td>
                                <td class="weight">{{ article.TotalWeight }}</td>
                                <td class="qty">{{ article.NumberOfItems }}</td>
                                <td class="price">{{ article.Price }}</td>
                                <td class="amount">{{ article.Amount }}</td>
                            </tr>
                        </template>
                    </tbody>
                    <tfoot>
                        <tr class="summary-row">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="amount" colspan="2">SEK<br />
                                {{ waybillDetails.Details.TotalAmount | thousandsDelimiter }}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="terms">
                <p>
                    The exporter of the products covered by this document (Aut. no) declares that, except where otherwise clearly indicated, these products are of EEA/TR preferential origin.<br />
                    Tollkredit number 33072841.
                </p>
            </div>

            <div class="terms signature">
                <p>
                    2021-08-18 Signature:
                </p>
            </div>

            <div class="terms">
                <p>
                    Address: 377 Sport AB, Stensätravägen 9A, 127 39 Skärholmen, SWEDEN<br />
                    Phone: +46 8 6585 377, E-mail: invoice@377.se, VAT: SE556684-1465
                </p>
            </div>

        </div>

    </div>
</template>

<script>
import Alert from '~/components/Alert'
import ScInput from '~/components/Input'
import print from '~/plugins/directives/vue-print-nb'


export default {
	components: {
		Alert,
		ScInput,
    },
    directives: {
        print,
    },
    data () {
		return {
            printWaybill: {
                id: "page-wrap-waybill",
            },
            errors: null,
            message: '',
            render: false,
            emptyWayBill: {},
            currentWayBill: {},
            waybillList: [],
            waybillDetails: null,
            pageNum: 1,
            numberViewed: 10,
        }
    },
    watch: {

    },
	mounted: function () {
        this.$store.commit('setAlertHidden', 1)
    },
    computed: {
        totalPages() {
            return parseInt(this.waybillList.length / this.numberViewed)
        },
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
        async createWaybill() {
            let _this = this
            _this.$store.commit('setAlertHidden', 1)
            _this.showPageOverlaySpinner()
            await this.$axios.$post('/webapi/Waybill/PostCreateWaybill', _this.currentWayBill)
			.then(function (res) {
                if (res.ErrorList != null) {
                    _this.errors = res.ErrorList
                    _this.$store.commit('setAlertVisible', 1)
                    _this.hidePageOverlaySpinner()
                } else {
                    _this.$fetch()
                    _this.hidePageOverlaySpinner()
                }
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
        },
        async getProducts(waybillid, type) {
            let _this = this
            _this.showPageOverlaySpinner()
            _this.waybillDetails = null
            try {
                const [ waybilldetails ] = await Promise.all([
                    this.$axios.$get('/webapi/Waybill/GetWaybillDetails?waybillId=' + waybillid )
                ])
                _this.hidePageOverlaySpinner()
                _this.waybillDetails = waybilldetails
                if (type == 1) {
                    setTimeout(() => {
                        UIkit.modal('#modal-products').show()
                        _this.render = !_this.render
                    }, 200)
                }
            } catch (err) {
                console.log(err)
            }
		},
        next() {
            if (this.pageNum < this.totalPages) {
                this.pageNum = parseInt(this.pageNum) + 1
            }
        },
        previous(){
            if (this.pageNum > 1) {
                this.pageNum = parseInt(this.pageNum) - 1
            }
        }
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


    // PRINT STYLES
    .waybill-printed {
        margin: 0 0 50px 0;
        padding: 50px 50px;
        background-color: #fff;
        display: none;
    }
    @media print {
        .waybill-printed {
            // margin: 30px 60px 60px 30px  !important;
            padding: 40px;
            display: block;
        }
    }



    #page-wrap-waybill {
        width: 900px;
        margin: 0 auto;
    }
    #page-wrap-waybill > div,
    #page-wrap-waybill > textarea {
        border: 0;
        font: 13px;
        line-height: 18px;
        overflow: hidden;
        resize: none;
    }
    table {
        border-collapse: collapse;
    }
    table td,
    table th {
        border: 0;
        padding: 10px;
    }
    #header {
        font-family: "Roboto Condensed", sans-serif;
        font-weight: 700;
        color: #333;
        font-size: 30px;
        line-height: 48px;
        text-transform: uppercase;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        padding-top: 10px;
        margin-bottom: 20px;
    }
    #invoicedetails,
    #consignee {
        width: 33.333%;
        float: left;
    }
    #buyer {
        width: 33.333%;
        float: right;
    }
    .meta {
        margin-bottom: 28px;
        width: 350px;
        float: right;
    }
    .meta td {
        text-align: right;
        border: 0;
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
        padding-top: 12px;
    }
    .meta td.meta-head {
        text-align: left;
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
    }
    .items {
        clear: both;
        width: 100%;
        margin: 30px 0 30px 0;
        border: 0;
    }
    .items tbody {
        height: 420px;
    }
    .items th {
        background: #333;
        font-family: "Roboto Condensed", sans-serif;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.8em;
        text-align: left;
        color: #fff;
    }
    .items tr.item-row td {
        border: 0;
        vertical-align: middle;
        border-bottom: 1px solid #ccc;
    }
    .items tr.summary-row td {
        border: 0;
        vertical-align: middle;
    }
    .items tr.summary-row td.amount {
        font-weight: bold;
    }
    .items tr.blank td {
        border: 0;
    }
    tr.item-row,
    tr.summary-row,
    tr.blank {
        height: 30px;
    }
    tr.blank.spread {
        height: auto;
    }
    .items td.total-line {
        border: 0;
        border-bottom: 1px solid #ccc !important;
        padding: 14px 10px 10px 0px;
    }
    .items td.total-value {
        border: 0;
        border-bottom: 1px solid #ccc !important;
        padding: 14px 10px 10px 0px;
    }
    @media print {
        .items th {
            background: #333 !important;
            -webkit-print-color-adjust: exact;
            color: #fff !important;
            font-size: 10px;
        }
        .items tr {
            font-size: 12px;
        }
    }
    .product_category {
        font-weight: 700;
        font-size: 0.8em;
        text-transform: uppercase;
    }
    .terms p {
        text-align: left;
        margin: 0;
        background: #f5f5f5;
        padding: 20px;
    }
    @media print {
        .terms p {
            background: #f5f5f5 !important;
            -webkit-print-color-adjust: exact;
            color: #000 !important;
            font-size: 10px;
        }
    }
    .terms h5 {
        margin-top: 20px;
        text-transform: uppercase;
        font: 13px Helvetica, Sans-Serif;
        font-weight: bold;
    }
    .signature {
        font-weight: bold;
        height: 40px;
    }
    .weight,
    .tariff,
    .qty {
        text-align: center;
    }
    .price,
    .amount {
        text-align: right;
    }


</style>