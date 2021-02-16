<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<h3 class="uk-margin-bottom">
				Data Visualization
				<span class="sc-sub-heading">Datatables/Billboard.js integration based on <a href="https://webdesign.tutsplus.com/tutorials/data-visualization-with-datatablesjs-and-highchartsjs--cms-29691">envatotuts+ tutorial</a></span>
			</h3>
			<ScCard>
				<ScCardBody>
					<client-only>
						<Datatable
							id="sc-datatable"
							ref="dataTable"
							table-class="uk-table-small uk-table-border"
							:data="dtData"
							:options="dtOptions"
							:custom-events="customEvents"
						>
						</Datatable>
					</client-only>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardBody>
					<client-only>
						<BillboardChart ref="bbChart" :options="chartOptions"></BillboardChart>
					</client-only>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
import {scColors} from "assets/js/utils";

export default {
	components: {
		Datatable: process.client ? () => import('~/components/datatables/Datatables') : null,
		BillboardChart: process.client ? () => import('~/components/billboard-charts/Chart') : null
	},
	data () {
		return {
			dtData: [
				{
					"Country": "Bangladesh",
					"Population (2017)": 164669751,
					"Density (P/Km2)": 1265,
					medAge: 26
				},
				{
					"Country": "Brazil",
					"Population (2017)": 209288278,
					"Density (P/Km2)": 25,
					medAge: 31
				},
				{
					"Country": "China",
					"Population (2017)": 1409517397,
					"Density (P/Km2)": 150,
					medAge: 37
				},
				{
					"Country": "DR Congo",
					"Population (2017)": 81339988,
					"Density (P/Km2)": 36,
					medAge: 17
				},
				{
					"Country": "Egypt",
					"Population (2017)": 97553151,
					"Density (P/Km2)": 98,
					medAge: 25
				},
				{
					"Country": "Ethiopia",
					"Population (2017)": 104957438,
					"Density (P/Km2)": 105,
					medAge: 19
				},
				{
					"Country": "France",
					"Population (2017)": 64979548,
					"Density (P/Km2)": 119,
					medAge: 41
				},
				{
					"Country": "Germany",
					"Population (2017)": 82114224,
					"Density (P/Km2)": 236,
					medAge: 46
				},
				{
					"Country": "India",
					"Population (2017)": 1339180127,
					"Density (P/Km2)": 450,
					medAge: 27
				},
				{
					"Country": "Indonesia",
					"Population (2017)": 263991379,
					"Density (P/Km2)": 146,
					medAge: 28
				},
				{
					"Country": "Iran",
					"Population (2017)": 81162788,
					"Density (P/Km2)": 50,
					medAge: 30
				},
				{
					"Country": "Italy",
					"Population (2017)": 59359900,
					"Density (P/Km2)": 202,
					medAge: 46
				},
				{
					"Country": "Japan",
					"Population (2017)": 127484450,
					"Density (P/Km2)": 350,
					medAge: 46
				},
				{
					"Country": "Mexico",
					"Population (2017)": 129163276,
					"Density (P/Km2)": 66,
					medAge: 28
				},
				{
					"Country": "Nigeria",
					"Population (2017)": 190886311,
					"Density (P/Km2)": 210,
					medAge: 18
				},
				{
					"Country": "Pakistan",
					"Population (2017)": 197015955,
					"Density (P/Km2)": 256,
					medAge: 28
				},
				{
					"Country": "Philippines",
					"Population (2017)": 104918090,
					"Density (P/Km2)": 352,
					medAge: 24
				},
				{
					"Country": "Russia",
					"Population (2017)": 143989754,
					"Density (P/Km2)": 9,
					medAge: 39
				},
				{
					"Country": "South Africa",
					"Population (2017)": 56717156,
					"Density (P/Km2)": 47,
					medAge: 26
				},
				{
					"Country": "Tanzania",
					"Population (2017)": 57310019,
					"Density (P/Km2)": 65,
					medAge: 17
				},
				{
					"Country": "Thailand",
					"Population (2017)": 69037513,
					"Density (P/Km2)": 135,
					medAge: 38
				},
				{
					"Country": "Turkey",
					"Population (2017)": 80745020,
					"Density (P/Km2)": 105,
					medAge: 30
				},
				{
					"Country": "U.K.",
					"Population (2017)": 66181585,
					"Density (P/Km2)": 274,
					medAge: 40
				},
				{
					"Country": "U.S.",
					"Population (2017)": 324459463,
					"Density (P/Km2)": 35,
					medAge: 38
				},
				{
					"Country": "Viet Nam",
					"Population (2017)": 95540800,
					"Density (P/Km2)": 308,
					medAge: 30
				}
			],
			dtOptions: {
				"scrollY": "200px",
				"scrollCollapse": true,
				"paging": false
			}
		}
	},
	computed: {
		chartOptions () {
			var self = this
			return {
				data: {
					columns: [
						this.dtCalcData['Population (2017)'],
						this.dtCalcData['Density (P/Km2)']
					],
					types: {
						"Population (2017)": 'bar',
						"Density (P/Km2)": "spline"
					},
					axes: {
						"Population (2017)": "y",
						"Density (P/Km2)": "y2"
					},
					colors: {
						"Population (2017)": scColors.multi[6],
						"Density (P/Km2)": scColors.multi[1]
					}
				},
				axis: {
					x: {
						type: "category",
						categories: self.dtCalcData['Countries'],
						tick: {
							fit: true,
							autorotate: true,
							rotate: -45,
							multiline: false,
							culling: false
						}
					},
					y: {
						label: 'Population (2017)',
						tick: {
							format: function (x) {
								return x / 1000000 + ' M';
							}
						}
					},
					y2: {
						label: 'Density (P/Km²)',
						show: true,
						tick: {
							format: function (x) {
								return x;
							}
						}
					}
				},
				padding: {
					bottom: 80
				},
				tooltip: {
					format: {
						title: function (d) {
							return self.dtCalcData['Countries'][d];
						},
						value: function (value, ratio, id) {
							return id === "Population (2017)" ? Math.round(value / 1000000) + 'M' : value;
						}
					}
				},
				render: {
					lazy: false
				}
			}
		},
		dtCalcData () {
			var population = ["Population (2017)"]
			var density = ["Density (P/Km2)"]
			this.dtData.forEach(item => {
				population.push(item['Population (2017)'])
				density.push(item['Density (P/Km2)'])
			})
			return {
				'Countries': this.dtData.map(item => item['Country']),
				'Population (2017)': population,
				'Density (P/Km2)': density
			}
		},
		customEvents () {
			var self = this
			var events = []
			events.push({
				name: 'draw',
				function: () => {
					var timer;
					clearTimeout(timer);
					timer = setTimeout(function () {
						var tableData = self.getTableData(self.$refs['dataTable'].$dt);
						var population = ["Population (2017)"]
						tableData[1].forEach(function (item) {
							population.push(item)
						})
						var density = ["Density (P/Km2)"]
						tableData[2].forEach(function (item) {
							density.push(item)
						})
						self.$refs['bbChart'].bbChart.load({
							columns: [
								population,
								density
							]
						});
						self.$refs['bbChart'].bbChart.config("axis.x.categories", tableData[0], true);
					}, 50)
				}
			})
			return events
		}
	},
	methods: {
		getTableData (table) {
			var dataArray = []
			var countryArray = []
			var populationArray = []
			var densityArray = []
			table.rows({search: "applied"}).every(function () {
				const data = this.data();
				countryArray.push(data['Country']);
				populationArray.push(parseInt(data['Population (2017)']));
				densityArray.push(parseInt(data['Density (P/Km2)']));
			});
			dataArray.push(countryArray, populationArray, densityArray);
			return dataArray;
		}
	}
}
</script>

<style lang="scss">
@import "~scss/common/md_colors";
@import "~scss/common/variables_mixins";
@import "~scss/plugins/datatables";
</style>
