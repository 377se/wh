<template>
<content-overlay :active="contentOverlayActive" :animate="true" :progress="progressActive">
	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
				<div class="uk-flex-1">
					<h1 class="sc-top-bar-title">
						Control Center
					</h1>
				</div>
			</div>
		</div>
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<select class="uk-select uk-margin-medium-bottom" v-model="selectionId">
						<option v-for="selection in selections" :key="selection.Id" :value="selection.Id">{{ selection.Name }}</option>
					</select>
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
							:search-options="{ enabled: true }"
							:pagination-options="{
								enabled: true,
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
		async loadProducts(selectionId) {
			await this.$axios.$get('/webapi/ControlCenter/GetSelectionList', { params: { selectionId: selectionId } })
			.then(products => {
				this.products = products
				this.isLoading = false
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
		async loadSelections() {
			this.isLoading = true
			await this.$axios.$get('/webapi/ControlCenter/GetControlCenterSelections')
			.then( selections => {
				this.selections = selections
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
					_this.$store.dispatch('setBusyOn')
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
        this.loadProducts(1)
        this.loadSelections()
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