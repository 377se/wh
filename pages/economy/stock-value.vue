<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
            {{ this.showPageOverlaySpinner() }}
        </div>
    </div>
    <div v-else>
        <div id="sc-page-wrapper">
            {{ hidePageOverlaySpinner() }}
            <div id="sc-page-top-bar" class="sc-top-bar">
                <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                    <div class="uk-flex-1">
                        <h1 class="sc-top-bar-title uk-display-inline">Lagervärde</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody>
                        <!-- TAB-HEADLINES - LAGERVÄRDE -->
                        <ul data-uk-tab>
                            <li class="uk-active">
                                <a href="javascript:void(0)">
                                    TOTALT
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    PER LAG
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    PER VARUMÄRKE
                                </a>
                            </li>
                        </ul>
                        <!-- TAB-CONTENT - LAGERVÄRDE -->
					    <ul class="uk-switcher">
                            <!-- TOTALT -->
                            <li>
                            <div class="uk-flex uk-flex-between uk-flex-middle md-bg-cyan-800 uk-padding-small">
                                <div class="uk-text-large uk-light"><strong>Totalt:</strong> {{ stockValueList.TotalValue | thousandsDelimiter }}</div>
                                <vue-excel-xlsx
                                    class="uk-button"
                                    :data="stockValueList.ItemList"
                                    :columns="columns_excel"
                                    :filename="'StockValue'"
                                    :sheetname="'StockValue'"
                                    >
                                    EXPORTERA EXCEL
                                </vue-excel-xlsx>
                            </div>
                                <VueGoodTable
                                    :columns="columns_total"
                                    :rows="stockValueList.ItemList"
                                    style-class="vgt-table"
                                    :fixed-header="true"
                                    max-height="600px"
                                    :search-options="{ enabled: false }"
                                    :pagination-options="{ enabled: true, mode: 'pages', perPage: 20, position: 'top', perPageDropdown: [10, 20, 30, 40, 50], dropdownAllowAll: true, setCurrentPage: 1, nextLabel: 'nästa', prevLabel: 'föregående', rowsPerPageLabel: 'Produkter per sida', ofLabel: 'av', pageLabel: 'Sida', allLabel: 'Alla' }"
                                >
                                    <div class="uk-label md-bg-cyan-800 uk-margin-small-right" slot="table-actions">{{ this.stockValueList.ItemList ? this.stockValueList.ItemList.length : 0 }}</div>
                                    <template slot="table-row" slot-scope="props">
                                        <span v-if="props.column.field === 'ArticleId'">{{ props.row.ArticleId }}</span>
                                        <span v-else-if="props.column.field === 'ArticleNumber'">{{ props.row.ArticleNumber }}</span>
                                        <nuxt-link v-else-if="props.column.field === 'ArticleName'" :to="props.row.Url"><div>{{ props.row.ArticleName }}</div></nuxt-link>
                                        <span v-else-if="props.column.field === 'TeamName'">{{ props.row.TeamName }}</span>
                                        <span v-else-if="props.column.field === 'PublishDate'">{{ props.row.PublishDate }}</span>
                                        <span v-else-if="props.column.field === 'ItemsInStock'">{{ props.row.ItemsInStock }}</span>
                                        <span v-else-if="props.column.field === 'PurchasePrice'">{{ props.row.PurchasePrice }}</span>
                                        <span v-else-if="props.column.field === 'ProductSum'">{{ props.row.ProductSum }}</span>
                                    </template>
                                </VueGoodTable>
                            </li>
                            <!-- PER LAG -->
                            <li>
                            <div class="md-bg-cyan-800 uk-light uk-padding-small"><strong>Totalt:</strong> {{ stockValueByTeam.TotalValue | thousandsDelimiter }}</div>
                                <VueGoodTable
                                    :columns="columns_team"
                                    :rows="stockValueByTeam.ItemList"
                                    style-class="vgt-table"
                                    :fixed-header="true"
                                    max-height="600px"
                                    :search-options="{ enabled: false }"
                                    :pagination-options="{ enabled: false, mode: 'pages', perPage: 10, position: 'top', perPageDropdown: [10, 20, 30, 40, 50], dropdownAllowAll: true, setCurrentPage: 1, nextLabel: 'nästa', prevLabel: 'föregående', rowsPerPageLabel: 'Produkter per sida', ofLabel: 'av', pageLabel: 'sida', allLabel: 'Alla' }"
                                >
                                    <div class="uk-label md-bg-cyan-800 uk-margin-small-right" slot="table-actions">
                                        {{ this.stockValueByTeam.ItemList ? this.stockValueByTeam.ItemList.length : 0 }}
                                    </div>
                                    <template slot="table-row" slot-scope="props">
                                        <img v-if="props.column.field === 'ImageName'" :src="props.row.ImageName">
                                        <span v-else-if="props.column.field === 'TeamName'">{{ props.row.TeamName }}</span>
                                        <span v-else-if="props.column.field === 'ProductSum'">{{ props.row.ProductSum | thousandsDelimiter }}</span>
                                    </template>
                                </VueGoodTable>
                            </li>
                            <!-- PER VARUMÄRKE -->
                            <li>
                                <div class="md-bg-cyan-800 uk-light uk-padding-small"><strong>Totalt:</strong> {{ stockValueByBrand.TotalValue | thousandsDelimiter }}</div>
                                <VueGoodTable
                                    :columns="columns_brand"
                                    :rows="stockValueByBrand.ItemList"
                                    style-class="vgt-table"
                                    :fixed-header="true"
                                    max-height="600px"
                                    :search-options="{ enabled: false }"
                                    :pagination-options="{ enabled: false, mode: 'pages', perPage: 10, position: 'top', perPageDropdown: [10, 20, 30, 40, 50], dropdownAllowAll: true, setCurrentPage: 1, nextLabel: 'nästa', prevLabel: 'föregående', rowsPerPageLabel: 'Produkter per sida', ofLabel: 'av', pageLabel: 'sida', allLabel: 'Alla' }"
                                >
                                    <div class="uk-label md-bg-cyan-800 uk-margin-small-right" slot="table-actions">
                                        {{ this.stockValueByBrand.ItemList ? this.stockValueByBrand.ItemList.length : 0 }}
                                    </div>
                                    <template slot="table-row" slot-scope="props">
                                        <img v-if="props.column.field === 'ImageName'" :src="props.row.ImageName">
                                        <span v-else-if="props.column.field === 'BrandName'">{{ props.row.BrandName }}</span>
                                        <span v-else-if="props.column.field === 'ProductSum'">{{ props.row.ProductSum | thousandsDelimiter }}</span>
                                    </template>
                                </VueGoodTable>
                            </li>
                        </ul>
                    </ScCardBody>
                </ScCard>
            </div>
        </div>
    </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'

    export default {
        components: {
            VueGoodTable,
        },
        data () {
            return {
                stockValueList: {},
                stockValueByTeam: {},
                stockValueByBrand: {},
                columns_excel : [
                    {
                        label: 'ProduktId',
                        field: 'ArticleId',
                    },
                    {
                        label: 'Artikelnummer',
                        field: 'ArticleNumber',
                    },
                    {
                        label: 'Produkt',
                        field: 'ArticleName',
                    },
                    {
                        label: 'Lag',
                        field: 'TeamName',
                    },
                    {
                        label: 'Publ. datum',
                        field: 'PublishDate',
                    },
                    {
                        label: 'I lager',
                        field: 'ItemsInStock',
                    },
                    {
                        label: 'Inköpspris',
                        field: 'PurchasePrice',
                    },
                    {
                        label: 'Totalt',
                        field: 'ProductSum',
                    },
                ],
            }
        },
        mounted () {
        },
        computed: {
            columns_total () {
                return [
                    {
                        label: 'ProduktId',
                        field: 'ArticleId',
                        sortable: false,
                        type: 'string',
                        filterOptions: {
                            enabled: false
                        },
                        width: '6%',
                    },
                    {
                        label: 'Artikelnummer',
                        field: 'ArticleNumber',
                        sortable: false,
                        type: 'string',
                        filterOptions: {
                            enabled: false
                        },
                        width: '15%',
                    },
                    {
                        label: 'Produkt',
                        field: 'ArticleName',
                        sortable: false,
                        type: 'string',
                        filterOptions: {
                            enabled: false
                        },
                        width: '30%',
                    },
                    {
                        label: 'Lag',
                        field: 'TeamName',
                        sortable: false,
                        type: 'string',
                        filterOptions: {
                            enabled: false
                        },
                        width: '17%',
                    },
                    {
                        label: 'Publ. datum',
                        field: 'PublishDate',
                        sortable: false,
                        type: 'string',
                        filterOptions: {
                            enabled: false
                        },
                        width: '10%',
                    },
                    {
                        label: 'I lager',
                        field: 'ItemsInStock',
                        sortable: false,
                        type: 'number',
                        filterOptions: {
                            enabled: false
                        },
                        tdClass: 'uk-text-right',
                        thClass: 'uk-text-right',
                        width: '4%',
                    },
                    {
                        label: 'Inköpspris',
                        field: 'PurchasePrice',
                        sortable: false,
                        type: 'number',
                        filterOptions: {
                            enabled: false
                        },
                        tdClass: 'uk-text-right',
                        thClass: 'uk-text-right',
                        width: '10%',
                    },
                    {
                        label: 'Totalt',
                        field: 'ProductSum',
                        sortable: false,
                        type: 'number',
                        filterOptions: {
                            enabled: false
                        },
                        tdClass: 'uk-text-right',
                        thClass: 'uk-text-right',
                        width: '8%',
                    },
                ]
            },
            columns_team () {
                return [
                    {
                        label: '',
                        field: 'ImageName',
                        sortable: false,
                        type: 'string',
                        filterOptions: {
                            enabled: false
                        },
                        width: '50px',
                    },
                    {
                        label: 'Lag',
                        field: 'TeamName',
                        sortable: false,
                        type: 'string',
                        filterOptions: {
                            enabled: false
                        },
                        width: '80%',
                    },
                    {
                        label: 'Totalt',
                        field: 'ProductSum',
                        sortable: false,
                        type: 'number',
                        filterOptions: {
                            enabled: false
                        },
                        tdClass: 'uk-text-right',
                        thClass: 'uk-text-right',
                        width: '15%',
                    },
                ]
            },
            columns_brand () {
                return [
                     {
                        label: '',
                        field: 'ImageName',
                        sortable: false,
                        type: 'string',
                        filterOptions: {
                            enabled: false
                        },
                        width: '50px',
                    },
                    {
                        label: 'Varumärke',
                        field: 'BrandName',
                        sortable: false,
                        type: 'string',
                        filterOptions: {
                            enabled: false
                        },
                        width: '80%',
                    },
                    {
                        label: 'Totalt',
                        field: 'ProductSum',
                        sortable: false,
                        type: 'number',
                        filterOptions: {
                            enabled: false
                        },
                        tdClass: 'uk-text-right',
                        thClass: 'uk-text-right',
                        width: '15%',
                    },
                ]
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
            async getStockValueList() {
                let _this = this
                _this.showPageOverlaySpinner()
                await this.$axios.$get('/webapi/Stock/GetStockValueList')
                .then(function (stockvaluelist) {
                    _this.stockValueList = stockvaluelist
                })
                .catch(function (error) {
                    console.log(error)
                })
                _this.hidePageOverlaySpinner()
		    },
            async getStockValueByTeam() {
                let _this = this
                _this.showPageOverlaySpinner()
                await this.$axios.$get('/webapi/Stock/GetStockValueByTeam')
                .then(function (stockvaluebyteam) {
                    _this.stockValueByTeam = stockvaluebyteam
                })
                .catch(function (error) {
                    console.log(error)
                })
                _this.hidePageOverlaySpinner()
		    },
            async getStockValueByBrand() {
                let _this = this
                _this.showPageOverlaySpinner()
                await this.$axios.$get('/webapi/Stock/GetStockValueByBrand')
                .then(function (stockvaluebybrand) {
                    _this.stockValueByBrand = stockvaluebybrand
                })
                .catch(function (error) {
                    console.log(error)
                })
                _this.hidePageOverlaySpinner()
		    },
        },
        async fetch () {
            try {
                const [stockvaluelist, stockvaluebyteam, stockvaluebybrand] = await Promise.all([
                    this.$axios.$get('/webapi/Stock/GetStockValueList'),
                    this.$axios.$get('/webapi/Stock/GetStockValueByTeam'),
                    this.$axios.$get('/webapi/Stock/GetStockValueByBrand'),
                ])
                this.stockValueList = stockvaluelist
                this.stockValueByTeam = stockvaluebyteam
                this.stockValueByBrand = stockvaluebybrand
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
    table.vgt-table {
        font-size: 0.75rem;
    }
    table.vgt-table td {
        vertical-align: middle;
        border-right: 1px solid #dcdfe6;
        padding: .3em .75em .3em .75em;
    }
    table.vgt-table th {
        font-size: 0.6rem;
    }
</style>