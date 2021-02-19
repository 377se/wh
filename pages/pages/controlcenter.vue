<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
				<div class="uk-flex-1">
					<h1 class="sc-top-bar-title">
						Control Center
					</h1>
				</div>
				<!-- <div class="sc-actions uk-margin-left">
					<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-printer"></a>
					<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-archive"></a>
					<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-dots-vertical"></a>
				</div> -->
			</div>
		</div>
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<VueGoodTable
						:columns="columns"
						:rows="issues"
						:pagination-options="{ enabled: true }"
						style-class="vgt-table"
                        row-style-class="rowStyleClass"
						:search-options="{ enabled: true }"
                        :fixed-header="true"
                        max-height="70vh"
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
                            <span v-else-if="props.column.field === 'PublishDate'">
                                {{ props.row.PublishDate }}
                            </span>
							<template v-else>
								{{ props.formattedRow[props.column.field] }}
							</template>

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
	name: 'PagesIssuesList',
	components: {
		VueGoodTable
	},
        data () {
        return {
            issues: []
        }
    },

	computed: {
		columns () {
			return [
				{
					label: '',
					field: 'ImageName',
					sortable: false,
					// sortFn: this.issueIdSort,
					tdClass: 'uk-text-center uk-text-nowrap',
                    width: '8%',
				},
				{
					label: 'Produktnamn',
					field: 'ProductName',
					filterOptions: {
						enabled: true
					},
                    width: '30%',
				},
				{
					label: 'Artikelnummer',
					field: 'ArticleNumber',
					filterOptions: {
						enabled: true
					},
                    width: '20%',
				},
				{
					label: 'Hyllplan',
					field: 'Shelf',
					filterOptions: {
						enabled: true
					},
                    tdClass: 'text-center',
				},
				{
					label: 'Utpris',
					field: 'Price',
					filterOptions: {
						enabled: true
					},
                    tdClass: 'text-center',
				},
				{
					label: 'REA',
					field: 'PriceOnSale',
					filterOptions: {
						enabled: true
					},
                    tdClass: 'text-center',
				},
				{
					label: 'Lagersaldo',
					field: 'ItemsInStock',
					filterOptions: {
						enabled: true
					},
                    tdClass: 'text-center',
				},
				{
					label: 'Pub.datum',
					field: 'PublishDate',
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
		priorityLabel (priority) {
			let priorityClass = null;
			switch (priority) {
			case 'minor':
				priorityClass = 'uk-label-success';
				break;
			case 'major':
				priorityClass = '';
				break;
			case 'critical':
				priorityClass = 'uk-label-warning';
				break;
			case 'blocker':
				priorityClass = 'uk-label-danger';
				break;
			default:
			}
			return priorityClass;
		},
		issueIdSort (x, y, col, rowX, rowY) {
			const _x = parseInt(x.replace("sc-", ""));
			const _y = parseInt(y.replace("sc-", ""));
			return (_x < _y ? -1 : (_x > _y ? 1 : 0));
		}
	},
    async fetch () {
		try{
			const [articles] = await Promise.all([
				this.$axios.$get("/webapi/ControlCenter/GetSelectionList?selectionId=1")
			]);
			this.issues = articles
		}catch(error){
			console.log(error);
		}
	},
}
</script>

<style lang="scss">
	@import '~scss/plugins/vue-good-table.scss';
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
</style>