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
                                    v-model.number="currentStatsObject.ShopId"
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
                        :search-options="{ 
                            enabled: false,
                            trigger: 'enter',
                        }"
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
                            <span v-if="props.column.field === 'ArticleName'">
                                <nuxt-link :to="props.row.Url">{{ props.row.ArticleName }}</nuxt-link>
                            </span>
                            <span v-else-if="props.column.field === 'ArticleNumber'">
                                {{ props.row.ArticleNumber }}
                            </span>
                            <input
                                class="uk-input"
                                v-else-if="props.column.field === 'Shelf'"
                                v-on:blur="updateShelf(props.row)"
                                v-model="props.row.Shelf"
                            >
                            <span v-else-if="props.column.field === 'Price'">
                                {{ props.row.Price }}
                            </span>
                            <span v-else-if="props.column.field === 'PriceOnSale'">
                                {{ props.row.PriceOnSale }}
                            </span>
                            <span v-else-if="props.column.field === 'ItemsInStock'">
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
					label: 'Produktnamn',
					field: 'ArticleName',
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
					label: 'Lagersaldo',
					field: 'ItemsInStock',
					sortable: true,
                    type: 'number',
					filterOptions: {
						enabled: true
					},
					thClass: 'uk-text-right',
                    tdClass: 'uk-text-right',
				},
			]
		},
	},
	methods: {
		async loadProducts() {
            let _this = this
            _this.$store.dispatch('setBusyOn')
            try {
                const [ products ] = await Promise.all([
                    this.$axios.$post('/webapi/Article/ArticleListByStatus', _this.currentStatsObject)
                ])
                _this.products = products
                _this.$store.dispatch('setBusyOff')
            } catch (error) {
                console.log(error)
            }
    	},
		async updateShelf(articledetails) {
			let _this = this
            _this.$store.dispatch('setBusyOn')
            try {
                const [ response ] = await Promise.all([
                    this.$axios.$post('/webapi/Article/UpdateShelf', articledetails)
                ])
                if(response.ErrorList != null) {
                    _this.$store.dispatch('setBusyOff')
                    console.log('Something fucked up!')
				} else {
                    console.log("Something didn't fuck up!")
        		}
                _this.$store.dispatch('setBusyOff')
            } catch (error) {
                console.log(error)
            }
		},
	},
    async fetch () {
        this.$store.dispatch('setBusyOn')
        try {
            const [ emptystatsobject, shops, productstatuslist ] = await Promise.all([
                this.$axios.$get('/webapi/stats/GetEmptyStatsObject'),
                this.$axios.$get('/webapi/Shop/GetShopList'),
                this.$axios.$get('/webapi/Metadata/GetProductStatusList'),
            ])
            this.currentStatsObject = emptystatsobject
            this.currentStatsObject.StatusId = 1
            this.shopOptionsList = shops.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
            this.productStatusList = productstatuslist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.$store.dispatch('setBusyOff')
        } catch (err) {
            console.log(err);
            this.$store.dispatch('setBusyOff')
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