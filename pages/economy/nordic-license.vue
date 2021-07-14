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
                        <h1 class="sc-top-bar-title uk-display-inline">Nordic License</h1>
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
                                    Underlag
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody :key="componentKey">
                                    <!-- TAB-HEADLINES - NORDIC LICENSE -->
                                    <ul data-uk-tab>
                                        <li class="uk-active">
                                            <a href="javascript:void(0)">
                                                SEK
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)">
                                                NOK
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)">
                                                EUR
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)">
                                                DKK
                                            </a>
                                        </li>
                                    </ul>
                                    <!-- TAB-CONTENT - NORDIC LICENSE -->
                                    <ul class="uk-switcher">
                                        <li v-for="(currency, index) in nordicLicenseStats.ItemList" :key="index">
                                            <div class="uk-overflow-auto">
                                                <table class="uk-table uk-table-small uk-text-small uk-margin-remove">
                                                    <thead>
                                                        <tr class="uk-padding-remove-bottom">
                                                            <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 8%;">Antal</th>
                                                            <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 24%;">Artikelnummer</th>
                                                            <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 32%;">Produkt</th>
                                                            <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 10%;">Inköpspris</th>
                                                            <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 10%;">Totalt</th>
                                                            <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 10%;">Genomsnitt</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, index) in currency.StatsList" :key="index" class="uk-table-middle">
                                                            <td class="border-bottom border-left" style="text-align: center; ">{{ item.NumberOfItems | thousandsDelimiter }}</td>
                                                            <td class="border-bottom border-left" style="text-align: left; ">{{ item.ArticleNumber }}</td>
                                                            <td class="border-bottom border-left" style="text-align: left; ">{{ item.ArticleName }}</td>
                                                            <td class="border-bottom border-left" style="text-align: right; ">{{ item.PurchasePrice | thousandsDelimiter }}</td>
                                                            <td class="border-bottom border-left" style="text-align: right; ">{{ item.TotalSale | thousandsDelimiter }}</td>
                                                            <td class="border-bottom border-left border-right" style="text-align: right; ">{{ item.AverageSale | thousandsDelimiter }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
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
                                    <div class="uk-width-1-1 uk-margin-medium-top">
                                        <!-- FROM DATUM -->
                                        <div class="uk-margin">
                                            <ScInput v-model="currentStatsObject.FromDate" v-flatpickr="{ 'locale': Swedish }" placeholder="Välj from datum..." state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>From datum</label>
                                            </ScInput>
                                        </div>

                                        <!-- TOM DATUM -->
                                        <div class="uk-margin">
                                            <ScInput v-model="currentStatsObject.ToDate" v-flatpickr="{ 'locale': Swedish }" placeholder="Välj tom datum..." state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Tom datum</label>
                                            </ScInput>
                                        </div>

                                        <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-medium-top uk-margin-medium-bottom">
                                            <div><button @click="postNordicLicenseStats" class="sc-button sc-button-primary sc-button-mini uk-align-center uk-margin-medium-right">HÄMTA STATISTIK</button></div>
                                            <div>
                                                <XlsxWorkbook>
                                                    <XlsxSheet
                                                        v-for="sheet in sheets"
                                                        :collection="sheet.data"
                                                        :key="sheet.name"
                                                        :sheet-name="sheet.name"
                                                    />
                                                    <XlsxDownload filename="NordicLicense-From-Tom.xlsx">
                                                        <button class="sc-button sc-button-mini uk-align-center">EXCEL</button>
                                                    </XlsxDownload>
                                                </XlsxWorkbook>
                                            </div>
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
import { Swedish } from "flatpickr/dist/l10n/sv.js"
import ScInput from '~/components/Input'
import { XlsxWorkbook, XlsxSheet, XlsxDownload } from "vue-xlsx"

if(process.client) {
	require('~/plugins/flatpickr')
}

export default {
	components: {
		Alert,
		ScInput,
		XlsxWorkbook,
		XlsxSheet,
		XlsxDownload,
		Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            errors: null,
            message: '',
            componentKey: 0,
            Swedish,
            sheets: [
                { name: "SEK", data: null },
                { name: "NOK", data: null },
                { name: "EUR", data: null },
                { name: "DKK", data: null },
            ],
            shopOptionsList: [],
            shopId: 0,
            emptyStatsObject: {},
            currentStatsObject: {},
            nordicLicenseStats: {},
            countryList: [],
            countryId: 0,
            yearList: [],
            yearId: 0,
            monthList: [],
            monthId: 0,
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
        forceRerender() {
            this.componentKey += 1;
        },
        async postNordicLicenseStats() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/economy/PostNordicLicense', _this.currentStatsObject)
			.then(function (nordiclicensestats) {
                nordiclicensestats.ItemList.length == 0 ? UIkit.modal.dialog('<p class="uk-modal-body">Inga artiklar hittades!</p>') : null
                _this.nordicLicenseStats = nordiclicensestats
                if (nordiclicensestats.ItemList.length != 0) {
                    _this.sheets[0].data = nordiclicensestats.ItemList[0].StatsList
                    _this.sheets[1].data = nordiclicensestats.ItemList[1].StatsList
                    _this.sheets[2].data = nordiclicensestats.ItemList[2].StatsList
                    _this.sheets[3].data = nordiclicensestats.ItemList[3].StatsList
                }
                _this.forceRerender()
                _this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
		},
    },
    async fetch () {
        try {
            const [ emptystatsobject ] = await Promise.all([
                this.$axios.$get('/webapi/Economy/GetEmptyNordicLicenseObject'),
            ])
            this.emptyStatsObject = emptystatsobject
            this.currentStatsObject = emptystatsobject
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
    .returnstatslist {
        table-layout: fixed;
    }
    .summary {
        font-size: 200%;
        font-weight: 700;
        line-height: 1;
    }
</style>