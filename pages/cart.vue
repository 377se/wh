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
						<VueGoodTable
							:columns="columns"
							:rows="products"
							style-class="vgt-table"
							:search-options="{ enabled: true }"
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
                        <div class="uk-label uk-label-success uk-margin-small-right" slot="table-actions">
                            {{ this.products.length }} 
                        </div>
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

</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
export default {
	components: {
		VueGoodTable,
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
                    type: 'string',
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
                    tdClass: 'uk-text-right',
                    thClass: 'uk-text-right',
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
            const [ products ] = await Promise.all([
				await this.$axios.$get('/webapi/Cart/GetCartList'),
            ])
			this.products = products
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