<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardTitle>
					Basic Example
				</ScCardTitle>
				<ScCardBody>
					<VueGoodTable
						:columns="columns"
						:rows="rows"
						style-class="uk-table uk-table-divider uk-table-border scutum-vgt"
					/>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardTitle>
					Line Numbers
				</ScCardTitle>
				<ScCardBody>
					<VueGoodTable
						:columns="columns"
						:rows="rows"
						:line-numbers="true"
						style-class="uk-table uk-table-divider scutum-vgt"
					/>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardTitle>
					Search Options
				</ScCardTitle>
				<ScCardBody>
					<VueGoodTable
						:columns="columns"
						:rows="rows"
						style-class="uk-table uk-table-divider scutum-vgt"
						:search-options="{
							enabled: true
						}"
					/>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardTitle>
					Checkbox Table
				</ScCardTitle>
				<ScCardBody>
					<VueGoodTable
						:columns="columns"
						:rows="rows"
						style-class="uk-table uk-table-divider scutum-vgt"
						:select-options="{ enabled: true }"
						@on-selected-rows-change="onSelectChanged"
					/>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardTitle>
					Pagination
				</ScCardTitle>
				<ScCardBody>
					<p>records mode (default)</p>
					<VueGoodTable
						:columns="columns"
						:rows="rows"
						style-class="uk-table uk-table-divider scutum-vgt"
						:pagination-options="{
							enabled: true,
							perPage: 2,
							perPageDropdown: [2, 4, 6]
						}"
					/>
					<hr>
					<p>pages mode</p>
					<VueGoodTable
						:columns="columns"
						:rows="rows"
						style-class="uk-table uk-table-divider scutum-vgt"
						:pagination-options="{
							enabled: true,
							perPage: 2,
							perPageDropdown: [2, 4, 6],
							mode: 'pages'
						}"
					/>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
export default {
	name: 'PluginsVueGoodTable',
	components: {
		VueGoodTable
	},
	data: () => ({
		columns: [
			{
				label: 'Name',
				field: 'name',
			},
			{
				label: 'Age',
				field: 'age',
				type: 'number',
				thClass: 'uk-text-right'
			},
			{
				label: 'Created On',
				field: 'createdAt',
				type: 'date',
				dateInputFormat: 'yyyy-mm-dd',
				dateOutputFormat: 'MMM do yyyy',
				thClass: 'uk-text-right'
			},
			{
				label: 'Percent',
				field: 'score',
				type: 'percentage',
				thClass: 'uk-text-right'
			},
		],
		rows: [
			{ id:1, name:"John", age: 20, createdAt: '2019-10-12', score: 0.241 },
			{ id:2, name:"Jane", age: 24, createdAt: '2019-10-31', score: 0.03343 },
			{ id:3, name:"Susan", age: 16, createdAt: '2019-10-14', score: 1.00 },
			{ id:4, name:"Chris", age: 55, createdAt: '2019-10-11', score: 0.081 },
			{ id:5, name:"Dan", age: 40, createdAt: '2019-10-25', score: 0.052 },
			{ id:6, name:"John", age: 20, createdAt: '2019-10-30', score: 0.0012 },
		],
	}),
	methods: {
		onSelectChanged (params) {
			const selectedIds = params.selectedRows.reduce((acc, row) => {
				acc.push(row.id);
				return acc;
			}, []);
			console.log(params.selectedRows);
			console.log(selectedIds);
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/plugins/vue-good-table.scss';
</style>
