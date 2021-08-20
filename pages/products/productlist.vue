<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
            {{ showPageOverlaySpinner() }}
        </div>
    </div>

    <div v-else id="sc-page-wrapper">
        {{ hidePageOverlaySpinner() }}
        <div id="sc-page-top-bar" class="sc-top-bar">
            <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                <div class="uk-flex-1">
                    <h1 class="sc-top-bar-title">
                        Produktlista
                    </h1>
                </div>
            </div>
        </div>
        <div id="sc-page-content">
            <ScCard>
                <ScCardBody>
                    <div class="uk-flex uk-flex-between uk-width-1-1">
                        <div class="uk-width-1-3">
                            <client-only>
                                <Select2
                                    id="select-shopOptionsList"
                                    v-model.number="currentStatsObject.shopId"
                                    :options="shopOptionsList"
                                    :settings="{ 'width': '100%', 'placeholder': 'Shop', 'closeOnSelect': true, 'allowClear': true }"
                                >
                                </Select2>
                            </client-only>
                        </div>
                        <div class="uk-width-1-3">
                            <client-only>
                                <Select2
                                    id="select-productStatusList"
                                    v-model.number="currentStatsObject.StatusId"
                                    :options="productStatusList"
                                    :settings="{ 'width': '100%', 'placeholder': 'Status', 'closeOnSelect': true, 'allowClear': true }"
                                >
                                </Select2>
                            </client-only>
                        </div>
                        <div class="uk-width-1-3"></div>
                    </div>

                    <button class="uk-button uk-button-primary uk-margin-small-top uk-margin-small-bottom" @click="loadProducts">HÄMTA</button>

                    <VueGoodTable
                        :columns="columns"
                        :rows="products"
                        style-class="vgt-table"
                        :search-options="{ enabled: true }"
                        :pagination-options="{
                            enabled: true,
                            mode: 'pages',
                            perPage: 50,
                            position: 'top',
                            perPageDropdown: [10, 20, 30, 40, 50],
                            dropdownAllowAll: true,
                            setCurrentPage: 1,
                            nextLabel: 'nästa',
                            prevLabel: 'föregående',
                            rowsPerPageLabel: 'Produkter per sida',
                            ofLabel: 'av',
                            pageLabel: 'sida', // for 'pages' mode
                            allLabel: 'Alla',
                        }"
                    >
                    <div class="uk-label uk-label-success uk-margin-small-right" slot="table-actions">
                        {{ this.products.length }}
                    </div>
                        <template slot="table-row" slot-scope="props">
                            <img v-if="props.column.field === 'ImageName'" :src="props.row.ImageName">
                            <span v-else-if="props.column.field === 'Category'">
                                {{ props.row.Category }}
                            </span>
                            <nuxt-link v-else-if="props.column.field === 'ProductName'" :to="props.row.Url">
                                <div>{{ props.row.ProductName }}</div>
                            </nuxt-link>
                            <span v-else-if="props.column.field === 'ArticleNumber'">
                                {{ props.row.ArticleNumber }}
                            </span>
                            <input
                                class="uk-input"
                                v-else-if="props.column.field === 'Shelf'"
                                v-on:blur="updateArticleDetails(props.row)"
                                v-model="props.row.Shelf"
                            >
                            <span v-else-if="props.column.field === 'Price'">
                                {{ props.row.Price }}
                            </span>
                            <span v-else-if="props.column.field === 'PriceOnSale'">
                                {{ props.row.PriceOnSale }}
                            </span>
                            <span v-else-if="props.column.field === 'ItemsInStock'"
                            :class="[
                                {'uk-label uk-label-danger': props.row.ItemsInStock < 1 },
                                {'uk-label uk-label-warning': props.row.ItemsInStock < 11 && props.row.ItemsInStock >= 1 },
                                ]">
                                {{ props.row.ItemsInStock }}
                            </span>
                            <span v-else>
                                {{ props.row.PublishDate }}
                            </span>
                        </template>
                    </VueGoodTable>
                </ScCardBody>
            </ScCard>
        </div>
    </div>

</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
export default {
	components: {
		VueGoodTable,
        Select2: process.client ? () => import('~/components/Select2') : null,
	},
	data () {
		return {
            currentStatsObject: [],
            productStatusList: [],
			products: [],
			selections: [],
			shopId: 1,
			selectionId: 1,
		}
    },
	mounted() {
    },
	watch: {
	},
	computed: {
		columns () {
			return [
				{
					label: '',
					field: 'ImageName',
					sortable: false,
					tdClass: 'uk-text-center uk-text-nowrap',
                    width: '33px',
				},
				{
					label: 'Kategori',
					field: 'Category',
					sortable: true,
					type: 'string',
					filterOptions: {
						enabled: true
					},
                    width: '10%',
				},
				{
					label: 'Produktnamn',
					field: 'ProductName',
					sortable: true,
					type: 'string',
					filterOptions: {
						enabled: true
					},
                    width: '25%',
				},
				{
					label: 'Artikelnummer',
					field: 'ArticleNumber',
					sortable: true,
					type: 'string',
					filterOptions: {
						enabled: true
					},
                    width: '20%',
				},
				{
					label: 'Hyllplan',
					field: 'Shelf',
					sortable: true,
					type: 'string',
					filterOptions: {
						enabled: true
					},
                    tdClass: 'uk-text-center',
				},
				{
					label: 'Utpris',
					field: 'Price',
					sortable: true,
					type: 'number',
					filterOptions: {
						enabled: true
					},
                    tdClass: 'uk-text-center',
                    thClass: 'uk-text-left',
				},
				{
					label: 'REA',
					field: 'PriceOnSale',
					sortable: true,
                    type: 'number',
					filterOptions: {
						enabled: true
					},
					thClass: 'uk-text-left',
                    tdClass: 'uk-text-center',
				},
				{
					label: 'Lagersaldo',
					field: 'ItemsInStock',
					sortable: true,
                    type: 'number',
					filterOptions: {
						enabled: true
					},
					thClass: 'uk-text-left',
                    tdClass: 'uk-text-center',
				},
				{
					label: 'Pub.datum',
					field: 'PublishDate',
					sortable: true,
					filterOptions: {
						enabled: true
					},
                    type: 'date',
					dateInputFormat: 'yyyy-MM-dd',
					dateOutputFormat: 'MMM do yyyy',
					thClass: 'uk-text-left',
					tdClass: 'uk-text-nowrap uk-text-left'
				},
			]
		},
	},
	methods: {
		async loadProducts() {
            this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Article/ArticleListByStatus', this.currentStatsObject)
			.then(products => {
				this.products = products
                this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
		async updateArticleDetails(articleDetails) {
			let _this = this
			// _this.isUpdating = true
			await this.$axios.$post('/webapi/ControlCenter/PostUpdate', articleDetails)
			.then(function (response) {
				if(response.Message !== ''){
					// setTimeout(() => {
					// 	_this.isUpdating = false
					// }, 1000)
					_this.showPageOverlaySpinner()
				} else {

        		}
			})
			.catch(function (error) {
				console.log(error)
			})
		},
        hidePageOverlaySpinner () {
            this.$store.commit('toggleProgressOverlay', false);
            this.$store.commit('togglePageOverlay', false)
        },
        showPageOverlaySpinner () {
            this.$store.commit('toggleProgressOverlay', true);
            this.$store.commit('togglePageOverlay', true)
        },
	},
    async fetch () {
        try {
            const [ emptystatsobject, shops, productstatuslist ] = await Promise.all([
                this.$axios.$get('/webapi/stats/GetEmptyStatsObject'),
                this.$axios.$get('/webapi/Shop/GetShopList'),
                this.$axios.$get('/webapi/Metadata/GetProductStatusList'),
            ])
            this.currentStatsObject = emptystatsobject
            this.shopOptionsList = shops.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
            this.productStatusList = productstatuslist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.currentStatsObject.shopId = 1
            this.currentStatsObject.StatusId = 1
        } catch (err) {
            console.log(err);
        }
    },
}
</script>

<style lang="scss">
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