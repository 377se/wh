<template>
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
						<VueGoodTable
							:columns="columns"
							:rows="products"
							style-class="vgt-table"
							row-style-class="rowStyleClass"
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
							<template slot="table-row" slot-scope="props">
								<img v-if="props.column.field === 'ImageName'" :src="props.row.ImageName">
								<nuxt-link v-else-if="props.column.field === 'ProductName'" :to="props.row.Url">
									<div>{{ props.row.Category }}</div>
									<div>{{ props.row.ProductName }}</div>
								</nuxt-link>
								<span v-else-if="props.column.field === 'ArticleNumber'">
									{{ props.row.ArticleNumber }}
								</span>
								<span v-else-if="props.column.field === 'Shelf'">
									{{ props.row.Shelf }}
								</span>
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
import { VueGoodTable } from 'vue-good-table';
import { mapGetters } from 'vuex'
export default {
	components: {
		VueGoodTable
	},
	data () {
		return {
			products: [],
			selections: [],
			selectionId: 1,
			isLoading: false
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
                    width: '8%',
				},
				{
					label: 'Produktnamn',
					field: 'ProductName',
					sortable: true,
					type: 'string',
					filterOptions: {
						enabled: true
					},
                    width: '30%',
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
                    tdClass: 'text-center',
				},
				{
					label: 'Utpris',
					field: 'Price',
					sortable: true,
					type: 'number',
					filterOptions: {
						enabled: true
					},
                    tdClass: 'text-center',
				},
				{
					label: 'REA',
					field: 'PriceOnSale',
					sortable: true,
                    type: 'number',
					filterOptions: {
						enabled: true
					},
                    tdClass: 'text-center',
				},
				{
					label: 'Lagersaldo',
					field: 'ItemsInStock',
					sortable: true,
                    type: 'number',
					filterOptions: {
						enabled: true
					},
                    tdClass: 'text-center',
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
	}
}
</script>

<style lang="scss">
	/* @import '~scss/plugins/vue-good-table.scss'; */
    table.vgt-table {
        font-size: 14px;
    }
    table.vgt-table td {
        vertical-align: middle;
        border-right: 1px solid #dcdfe6;
        padding: .35em .75em .35em .75em;
    }
    .text-center {
        text-align: center;
    }
	/* .vgt-wrap__footer .footer__navigation__page-btn .chevron:after {
    	top: -1px;
	} */
</style>