<template>
<content-overlay :active="contentOverlayActive" :animate="true" :progress="progressActive">
	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
				<div class="uk-flex-1">
					<h1 class="sc-top-bar-title">
						Varukorg
					</h1>
				</div>
			</div>
		</div>
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
						<div v-if="isLoading" class="uk-alert-success" data-uk-alert>
							Awesome products is being loaded...
						</div>
						<div v-if="isUpdating" class="uk-alert-success" data-uk-alert>
							The awesome product is being updated...
						</div>
						<VueGoodTable
							:columns="columns"
							:rows="products"
							style-class="vgt-table"
							:search-options="{ enabled: false }"
							:pagination-options="{
								enabled: false,
								mode: 'pages',
								perPage: 10,
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
							<template slot="table-row" slot-scope="props">
                                <span v-if="props.column.field === 'CreatedDate'">
									{{ props.row.CreatedDate }}
								</span>
                                <img v-if="props.column.field === 'ArticleImage'" :src="props.row.ArticleImage">
								<span v-else-if="props.column.field === 'TeamName'">
									{{ props.row.TeamName }}
								</span>
								<nuxt-link v-else-if="props.column.field === 'ArticleName'" :to="props.row.Url">
									<div>{{ props.row.ArticleName }}</div>
								</nuxt-link>
	                            <span v-else-if="props.column.field === 'PriceToPay'">
									{{ props.row.PriceToPay }}
								</span>
	                            <span v-else-if="props.column.field === 'SessionId'">
									{{ props.row.SessionId }}
								</span>
                                <img v-if="props.column.field === 'ShopImage'" :src="props.row.ShopImage">
							</template>
						</VueGoodTable>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</content-overlay>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import contentOverlay from '~/components/Overlay'
import { mapGetters } from 'vuex'
export default {
	components: {
		VueGoodTable,
		contentOverlay
	},
	data () {
		return {
			products: [],
			selections: [],
			selectionId: 1,
			valueBeingEdited: null,
			isLoading: false,
			isUpdating: false,
			contentOverlayActive: false,
			progressActive: false
		}
    },
	computed: {
		columns () {
			return [
				{
					label: 'Tidpunkt',
					field: 'CreatedDate',
					sortable: false,
					filterOptions: {
						enabled: false
					},
                    type: 'date',
					dateInputFormat: "yyyy-MM-dd'T'HH:mm:ss.SSS",
					dateOutputFormat: "yyyy-MM-dd' 'HH:mm",
                    thClass: 'uk-text-left',
					tdClass: 'uk-text-nowrap uk-text-left',
                    width: '11%',
				},
                {
					label: '',
					field: 'ArticleImage',
					sortable: false,
					tdClass: 'uk-text-center uk-text-nowrap',
                    width: '33px',
				},
				{
					label: 'Lag',
					field: 'TeamName',
					sortable: false,
					type: 'string',
					filterOptions: {
						enabled: false
					},
                    width: '10%',
				},
				{
					label: 'Produkt',
					field: 'ArticleName',
					sortable: false,
					type: 'string',
					filterOptions: {
						enabled: false
					},
                    width: '25%',
				},
                {
					label: 'Pris (SEK)',
					field: 'PriceToPay',
					sortable: false,
					type: 'number',
					filterOptions: {
						enabled: false
					},
                    tdClass: 'uk-text-center',
                    width: '8%',
				},
				{
					label: 'Session',
					field: 'SessionId',
					sortable: false,
					type: 'string',
					filterOptions: {
						enabled: false
					},
                    width: '30%',
				},
                {
					label: '',
					field: 'ShopImage',
					sortable: false,
					tdClass: 'uk-text-center uk-text-nowrap',
                    width: '33px',
				},
			]
		},
	},
	methods: {
		async loadProducts() {
			await this.$axios.$get('/webapi/Cart/GetCartList')
			.then(products => {
				this.products = products
				this.isLoading = false
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
		showPageOverlaySpinner () {
			this.$store.commit('togglePageOverlay', true)
			this.$store.commit('toggleProgressOverlay', true);
			setTimeout(() => {
				this.$store.commit('toggleProgressOverlay', false);
				setTimeout(() => {
					this.$store.commit('togglePageOverlay', false)
				})
			}, 500)
		}
	},
	mounted() {
        this.loadProducts()
    },
	watch: {
		selectionId: function () {
			this.isLoading = true
			this.products = []
			this.loadProducts(this.selectionId)
		}
	},
}
</script>

<style lang="scss">
    table.vgt-table {
        font-size: 13px;
    }
    table.vgt-table td {
        vertical-align: middle;
        border-right: 1px solid #dcdfe6;
        padding: .3em .75em .3em .75em;
    }
    table.vgt-table th {
        font-size: 12px;
    }
</style>