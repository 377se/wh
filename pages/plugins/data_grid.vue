<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardTitle>
					Basic Grid
				</ScCardTitle>
				<ScCardBody>
					<Grid :row-data="basic.rows" :column-data="basic.columns" :theme="theme" :options="basic.options"></Grid>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardTitle>
					Using summary
				</ScCardTitle>
				<ScCardBody>
					<Grid :row-data="summary.rows" :column-data="summary.columns" :theme="theme" :options="summary.options"></Grid>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardTitle>
					Input Types
				</ScCardTitle>
				<ScCardBody>
					<Grid :row-data="inputTypes.rows" :column-data="inputTypes.columns" :theme="theme" :options="inputTypes.options"></Grid>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardTitle>
					Complex columns
				</ScCardTitle>
				<ScCardBody>
					<Grid ref="complexColumns"
						:row-data="complexColumns.rows"
						:column-data="complexColumns.columns"
						:theme="theme"
						:options="complexColumns.options"
					></Grid>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
import { scMq, scFakeData } from '~/assets/js/utils';
const { name } = scFakeData;

import 'tui-grid/dist/tui-grid.css'
import { Grid, CustomTextEditor } from '~/components/tui-grid'

export default {
	name: 'PluginsDataGrid',
	components: {
		Grid
	},
	data: () => ({
		data: [
			{
				id: 549731,
				name: 'Beautiful Lies',
				artist: 'Birdy',
				release: '2016.03.26',
				type: 'Deluxe',
				typeCode: '1',
				genre: 'Pop',
				genreCode: '1',
				grade: '4',
				price: 10000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 436461,
				name: 'X',
				artist: 'Ed Sheeran',
				release: '2014.06.24',
				type: 'Deluxe',
				typeCode: '1',
				genre: 'Pop',
				genreCode: '1',
				grade: '5',
				price: 20000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 295651,
				name: 'Moves Like Jagger',
				release: '2011.08.08',
				artist: 'Maroon5',
				type: 'Single',
				typeCode: '3',
				genre: 'Pop,Rock',
				genreCode: '1,2',
				grade: '2',
				price: 7000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 541713,
				name: 'A Head Full Of Dreams',
				artist: 'Coldplay',
				release: '2015.12.04',
				type: 'Deluxe',
				typeCode: '1',
				genre: 'Rock',
				genreCode: '2',
				grade: '3',
				price: 25000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 265289,
				name: '21',
				artist: 'Adele',
				release: '2011.01.21',
				type: 'Deluxe',
				typeCode: '1',
				genre: 'Pop,R&B',
				genreCode: '1,3',
				grade: '5',
				price: 15000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 555871,
				name: 'Warm On A Cold Night',
				artist: 'HONNE',
				release: '2016.07.22',
				type: 'EP',
				typeCode: '1',
				genre: 'R&B,Electronic',
				genreCode: '3,4',
				grade: '4',
				price: 11000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 550571,
				name: 'Take Me To The Alley',
				artist: 'Gregory Porter',
				release: '2016.09.02',
				type: 'Deluxe',
				typeCode: '1',
				genre: 'Jazz',
				genreCode: '5',
				grade: '3',
				price: 30000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 544128,
				name: 'Make Out',
				artist: 'LANY',
				release: '2015.12.11',
				type: 'EP',
				typeCode: '2',
				genre: 'Electronic',
				genreCode: '4',
				grade: '2',
				price: 12000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 366374,
				name: 'Get Lucky',
				artist: 'Daft Punk',
				release: '2013.04.23',
				type: 'Single',
				typeCode: '3',
				genre: 'Pop,Funk',
				genreCode: '1,5',
				grade: '3',
				price: 9000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 8012747,
				name: 'Valtari',
				artist: 'Sigur Rós',
				release: '2012.05.31',
				type: 'EP',
				typeCode: '3',
				genre: 'Rock',
				genreCode: '2',
				grade: '5',
				price: 10000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 502792,
				name: 'Bush',
				artist: 'Snoop Dogg',
				release: '2015.05.12',
				type: 'EP',
				typeCode: '2',
				genre: 'Hiphop',
				genreCode: '5',
				grade: '5',
				price: 18000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 294574,
				name: '4',
				artist: 'Beyoncé',
				release: '2011.07.26',
				type: 'Deluxe',
				typeCode: '1',
				genre: 'Pop',
				genreCode: '1',
				grade: '3',
				price: 12000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 317659,
				name: 'I Won\'t Give Up',
				artist: 'Jason Mraz',
				release: '2012.01.03',
				type: 'Single',
				typeCode: '3',
				genre: 'Pop',
				genreCode: '1',
				grade: '2',
				price: 7000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 583551,
				name: 'Following My Intuition',
				artist: 'Craig David',
				release: '2016.10.01',
				type: 'Deluxe',
				typeCode: '1',
				genre: 'R&B,Electronic',
				genreCode: '3,4',
				grade: '5',
				price: 15000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 490500,
				name: 'Blue Skies',
				release: '2015.03.18',
				artist: 'Lenka',
				type: 'Single',
				typeCode: '3',
				genre: 'Pop,Rock',
				genreCode: '1,2',
				grade: '5',
				price: 6000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 587871,
				name: 'This Is Acting',
				artist: 'Sia',
				release: '2016.10.22',
				type: 'EP',
				typeCode: '2',
				genre: 'Pop',
				genreCode: '1',
				grade: '3',
				price: 20000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 504288,
				name: 'Blurryface',
				artist: 'Twenty One Pilots',
				release: '2015.05.19',
				type: 'EP',
				typeCode: '2',
				genre: 'Rock',
				genreCode: '2',
				grade: '1',
				price: 13000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 450720,
				name: 'I\'m Not The Only One',
				artist: 'Sam Smith',
				release: '2014.09.15',
				type: 'Single',
				typeCode: '3',
				genre: 'Pop,R&B',
				genreCode: '1,3',
				grade: '4',
				price: 8000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 498896,
				name: 'The Magic Whip',
				artist: 'Blur',
				release: '2015.04.27',
				type: 'EP',
				typeCode: '2',
				genre: 'Rock',
				genreCode: '2',
				grade: '3',
				price: 15000,
				downloadCount: 1000,
				listenCount: 5000
			},
			{
				id: 491379,
				name: 'Chaos And The Calm',
				artist: 'James Bay',
				release: '2015.03.23',
				type: 'EP',
				typeCode: '2',
				genre: 'Pop,Rock',
				genreCode: '1,2',
				grade: '5',
				price: 12000,
				downloadCount: 1000,
				listenCount: 5000
			}
		],
		theme: {
			name: 'striped',
			value: {
				grid: {
					text: '#222'
				},
				cell: {
					normal: {
						border: '#e0e0e0',
						showVerticalBorder: true
					},
					disabled: {
						text: '#999'
					},
					head: {
						border: '#bdbdbd',
						background: '#eeeeee'
					},
					selectedHead: {
						background: '#e0e0e0'
					},
					focused: {
						border: "#1565C0"
					}
				},
				area: {
					summary: {
						border: '#bdbdbd'
					}
				}
			}
		},
	}),
	computed: {
		summaryComputedRows () {
			var gridData = [];
			for (let i = 0; i < 120; i++) {
				gridData.push({
					c1: name(),
					c2: ((i + 5) % 8) * 100 + i,
					c3: ((i + 3) % 7) * 60
				});
			}
			return gridData;
		},
		basic () {
			return {
				columns: [
					{
						header: 'Name',
						name: 'name'
					},
					{
						header: 'Artist',
						name: 'artist'
					},
					{
						header: 'Type',
						name: 'type'
					},
					{
						header: 'Release',
						name: 'release'
					},
					{
						header: 'Genre',
						name: 'genre'
					}
				],
				rows: JSON.parse(JSON.stringify(this.data)),
				options: {
					scrollY: true,
					scrollX: scMq.mediumMax(),
					usageStatistics: false,
					rowHeight: 35,
					pagination: false,
					header: {
						height: 40
					},
					bodyHeight: 400,
					columnOptions: {
						minWidth: scMq.mediumMax() ? 150 : 50
					}
				}
			}
		},
		summary () {
			return {
				columns: [
					{
						header: 'User ID',
						name: 'c1',
						align: 'center',
						editor: 'text'
					},
					{
						header: 'Score',
						name: 'c2',
						className: 'clickable',
						editor: 'text'
					},
					{
						header: 'Item Count',
						name: 'c3',
						editor: 'text'
					}
				],
				rows: this.summaryComputedRows,
				options: {
					scrollX: scMq.mediumMax(),
					bodyHeight: 300,
					usageStatistics: false,
					pagination: false,
					rowHeaders: ['rowNum'],
					columnOptions: {
						width: 100,
						minWidth: scMq.mediumMax() ? 150 : 100
					},
					summary: {
						height: 50,
						position: 'bottom', // or 'top'
						columnContent: {
							c2: {
								template (valueMap) {
									return '<div class="uk-text-center">MAX: ' + valueMap.max + '<br>MIN: ' + valueMap.min + '</div>';
								}
							},
							c3: {
								template (valueMap) {
									return '<div class="uk-text-center">TOTAL: ' + valueMap.sum + '<br>AVG: ' + valueMap.avg.toFixed(2) + '</div>';
								}
							}
						}
					}
				}
			}},
		inputTypes () {
			return {
				columns: [
					{
						header: 'Name',
						name: 'name',
						onBeforeChange (ev) {
							console.log('Before change:' + ev);
							ev.stop();
						},
						onAfterChange (ev) {
							console.log('After change:' + ev);
						},
						editor: 'text'
					},
					{
						header: 'Artist (maxLength: 20)',
						name: 'artist',
						onBeforeChange (ev) {
							console.log('Before change:' + ev);
						},
						onAfterChange (ev) {
							console.log('After change:' + ev);
						},
						editor: {
							type: CustomTextEditor,
							options: {
								maxLength: 20
							}
						}
					},
					{
						header: 'Type',
						name: 'typeCode',
						onBeforeChange (ev) {
							console.log('Before change:' + ev);
						},
						onAfterChange (ev) {
							console.log('After change:' + ev);
						},
						formatter: 'listItemText',
						editor: {
							type: 'select',
							options: {
								listItems: [
									{ text: 'Deluxe', value: '1' },
									{ text: 'EP', value: '2' },
									{ text: 'Single', value: '3' }
								]
							}
						}
					},
					{
						header: 'Genre',
						name: 'genreCode',
						onBeforeChange (ev) {
							console.log('Before change:' + ev);
						},
						onAfterChange (ev) {
							console.log('After change:' + ev);
						},
						formatter: 'listItemText',
						editor: {
							type: 'checkbox',
							options: {
								listItems: [
									{ text: 'Pop', value: '1' },
									{ text: 'Rock', value: '2' },
									{ text: 'R&B', value: '3' },
									{ text: 'Electronic', value: '4' },
									{ text: 'etc.', value: '5' }
								]
							}
						},
						copyOptions: {
							useListItemText: true // when this option is used, the copy value is concatenated text
						}
					},
					{
						header: 'Grade',
						name: 'grade',
						onBeforeChange: function (ev) {
							console.log('Before change:' + ev);
						},
						onAfterChange: function (ev) {
							console.log('After change:' + ev);
						},
						copyOptions: {
							useListItemText: true
						},
						formatter: function (obj) {
							var stars = '';
							for (let i = 0; i < obj.value; i++) {
								stars += '<span class="mdi mdi-star"></span>'
							}
							for (let i = 4; i >= obj.value; i--) {
								stars += '<span class="mdi mdi-star-outline"></span>'
							}
							return stars;
						},
						editor: {
							type: 'radio',
							options: {
								listItems: [
									{ text: '1★', value: '1' },
									{ text: '2★', value: '2' },
									{ text: '3★', value: '3' },
									{ text: '4★', value: '4' },
									{ text: '5★', value: '5' }
								]
							}
						}
					}
				],
				rows: JSON.parse(JSON.stringify(this.data)),
				options: {
					scrollX: scMq.mediumMax(),
					scrollY: false,
					usageStatistics: false,
					pagination: false,
					columnOptions: {
						minWidth: scMq.mediumMax() ? 150 : 50
					}
				}
			}},
		complexColumns () {
			return {
				columns: [
					{
						header: 'Name',
						name: 'name'
					},
					{
						header: 'Artist',
						name: 'artist'
					},
					{
						header: 'Type',
						name: 'type'
					},
					{
						header: 'Release',
						name: 'release'
					},
					{
						header: 'Genre',
						name: 'genre'
					},
					{
						header: 'Price',
						name: 'price'
					},
					{
						header: 'Download',
						name: 'downloadCount'
					},
					{
						header: 'Listen',
						name: 'listenCount'
					}
				],
				rows: JSON.parse(JSON.stringify(this.data)),
				options: {
					scrollY: true,
					scrollX: scMq.mediumMax(),
					header: {
						height: 160,
						complexColumns: [
							{
								header: 'Basic',
								name: 'mergeColumn1',
								childNames: ['name', 'artist']
							},
							{
								header: 'Extra',
								name: 'mergeColumn2',
								childNames: ['type', 'release', 'genre']
							},
							{
								header: 'Detail',
								name: 'mergeColumn3',
								childNames: ['mergeColumn1', 'mergeColumn2']
							},
							{
								header: 'Count',
								name: 'mergeColumn4',
								childNames: ['downloadCount', 'listenCount']
							},
							{
								header: 'Album Info',
								name: 'mergeColumn5',
								childNames: ['price', 'mergeColumn3', 'mergeColumn4']
							}
						]
					},
					usageStatistics: false,
					bodyHeight: 300,
					columnOptions: {
						minWidth: scMq.mediumMax() ? 150 : 50
					}
				}
			}}
	},
	mounted () {
		this.$nextTick(() => {
			// assign data
			this.basic.rows = JSON.parse(JSON.stringify(this.data));
			this.inputTypes.rows = JSON.parse(JSON.stringify(this.data));
			this.summary.rows = this.summaryComputedRows;
			// net use addon
			// TODO create API endpoints then enable this example
			// this.$refs.netUseGrid.invoke('use', 'Net', {
			// 	perPage: self.netUse.config.perPage,
			// 	readDataMethod: 'GET',
			// 	initialRequest: false,
			// 	api: {
			// 		readData: '/static/api/readData.php'
			// 	}
			// });
		});
	}
}
</script>

<style lang="scss">
	@import '~scss/plugins/data_grid';
</style>
