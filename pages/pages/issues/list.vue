<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
				<div class="uk-flex-1">
					<h1 class="sc-top-bar-title">
						Issue Tracker
					</h1>
					<span class="uk-text-muted">
						Scutum Admin
					</span>
				</div>
				<div class="sc-actions uk-margin-left">
					<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-printer"></a>
					<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-archive"></a>
					<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-dots-vertical"></a>
				</div>
			</div>
		</div>
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<VueGoodTable
						:columns="columns"
						:rows="issues"
						:pagination-options="{ enabled: true }"
						style-class="uk-table uk-table-divider scutum-vgt"
						:search-options="{
							enabled: true
						}"
					>
						<template slot="table-row" slot-scope="props">
							<span v-if="props.column.field === 'priority'" class="uk-label" :class="[priorityLabel(props.row.priority)]">
								{{ props.row.priority }}
							</span>
							<span v-else-if="props.column.field === 'status'" class="uk-label uk-label-outline">
								{{ props.row.status }}
							</span>
							<nuxt-link v-else-if="props.column.field === 'title'" :to="'/pages/issues/details/' + props.row.id">
								{{ props.row.title }}
							</nuxt-link>
							<span v-else-if="props.column.field === 'user'">
								{{ props.row.user }}
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
	computed: {
		...mapGetters({
			issues: 'issues/issues'
		}),
		columns () {
			return [
				{
					label: 'Id',
					field: 'issueId',
					sortable: true,
					sortFn: this.issueIdSort,
					tdClass: 'uk-text-center uk-text-nowrap'
				},
				{
					label: 'Priority',
					field: 'priority',
					tdClass: 'uk-text-center',
					filterOptions: {
						enabled: true,
						filterDropdownItems: ['minor', 'major', 'critical', 'blocker']
					}
				},
				{
					label: 'Title',
					field: 'title',
					filterOptions: {
						enabled: true
					}
				},
				{
					label: 'User',
					field: 'user',
					filterOptions: {
						enabled: true
					}
				},
				{
					label: 'Status',
					field: 'status'
				},
				{
					label: 'Created On',
					field: 'created',
					type: 'date',
					dateInputFormat: 'yyyy-MM-dd',
					dateOutputFormat: 'MMM do yyyy',
					tdClass: 'uk-text-nowrap uk-text-left'
				},
				{
					label: 'Modified On',
					field: 'modified',
					type: 'date',
					dateInputFormat: 'yyyy-MM-dd',
					dateOutputFormat: 'MMM do yyyy',
					tdClass: 'uk-text-nowrap uk-text-left'
				}
			]
		}
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
	}
}
</script>

<style lang="scss">
	@import '~scss/plugins/vue-good-table.scss';
</style>
