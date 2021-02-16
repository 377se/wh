<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<h3 class="uk-heading-line">
				<span>Billboard.js</span>
			</h3>
			<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Area Chart
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<BillboardChart :options="bb.areaChart"></BillboardChart>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Bar Chart
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<BillboardChart :options="bb.barChart"></BillboardChart>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Donut Chart
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<BillboardChart :options="bb.donutChart"></BillboardChart>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Line Chart
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<BillboardChart :options="bb.lineChart"></BillboardChart>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Radar Chart
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<BillboardChart :options="bb.radarChart"></BillboardChart>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Scatter Chart
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<BillboardChart :options="bb.scatterChart"></BillboardChart>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
			</div>

			<h3 class="uk-heading-line uk-margin-large-top">
				<span>Chart.js</span>
			</h3>
			<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody class="sc-chart-chartjs">
							<ChartJsBar chart-id="cjsBarChartData" :data="cjsBarChartData" :options="cjs.barChart.options"></ChartJsBar>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody class="sc-chart-chartjs">
							<ChartJsBar chart-id="cjsBarStackedChartData" :data="cjsBarStackedChartData" :options="cjs.barStackedChart.options"></ChartJsBar>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody class="sc-chart-chartjs">
							<ChartJsLine chart-id="cjsLineChartData" :data="cjsLineChartData" :options="cjs.lineChart.options"></ChartJsLine>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody class="sc-chart-chartjs">
							<ChartJsLine chart-id="cjsLineInterpolationChartData" :data="cjsLineInterpolationChartData" :options="cjs.lineInterpolationChart.options"></ChartJsLine>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody class="sc-chart-chartjs">
							<ChartJsLine chart-id="cjsLineSteppedChartData" :data="cjsLineSteppedChartData" :options="cjs.lineSteppedChart.options"></ChartJsLine>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody class="sc-chart-chartjs">
							<ChartJsLine chart-id="cjsLinePointsChartData" :data="cjsLinePointsChartData" :options="cjs.linePointsChart.options"></ChartJsLine>
						</ScCardBody>
					</ScCard>
				</div>
			</div>

			<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody class="sc-chart-chartjs">
							<ChartJsLine chart-id="cjsAreaChartData" :data="cjsAreaChartData" :options="cjs.areaChart.options"></ChartJsLine>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody class="sc-chart-chartjs">
							<ChartJsLine chart-id="cjsAreaStackedChartData" :data="cjsAreaStackedChartData" :options="cjs.areaStackedChart.options"></ChartJsLine>
						</ScCardBody>
					</ScCard>
				</div>
			</div>

			<div class="uk-child-width-1-3@l uk-child-width-1-2@m uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody class="sc-chart-chartjs">
							<ChartJsDoughnut chart-id="cjsDoughnutChartData" :data="cjsDoughnutChartData" :options="cjs.doughnutChart.options"></ChartJsDoughnut>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody class="sc-chart-chartjs">
							<ChartJsPie chart-id="cjsPieChartData" :data="cjsPieChartData" :options="cjs.pieChart.options"></ChartJsPie>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody class="sc-chart-chartjs">
							<ChartJsPolarArea chart-id="cjsPolarAreaChart" :data="cjsPolarAreaChart" :options="cjs.polarAreaChart.options"></ChartJsPolarArea>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { scColors } from '~/assets/js/utils';

import Chart from '~/components/chartjs/defaults'
import ChartJsBar from '~/components/chartjs/Bar'
import ChartJsLine from '~/components/chartjs/Line'
import ChartJsDoughnut from '~/components/chartjs/Doughnut'
import ChartJsPie from '~/components/chartjs/Pie'
import ChartJsPolarArea from '~/components/chartjs/PolarArea'


export default {
	name: 'PluginsCharts',
	components: {
		BillboardChart: process.client ? () => import('~/components/billboard-charts/Chart') : null,
		ChartJsBar,
		ChartJsLine,
		ChartJsDoughnut,
		ChartJsPie,
		ChartJsPolarArea
	},
	data: () => ({
		bb: {
			areaChart: {
				data: {
					columns: [
						["data1", 300, 350, 300, 0, 0, 0],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					types: {
						data1: "area-spline",
						data2: "area"
					}
				},
				area: {
					linearGradient: true
				},
				color: {
					pattern: scColors.multi
				}
			},
			barChart: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "bar"
				},
				bar: {
					width: {
						ratio: 0.5
					}
				},
				color: {
					pattern: scColors.multi
				},
				grid: {
					y: {
						show: true
					}
				}
			},
			donutChart: {
				data: {
					columns: [
						["data1", 30],
						["data2", 120]
					],
					type: "donut",
					onclick (d, i) {
						console.log("onclick", d, i);
					},
					onover (d, i) {
						console.log("onover", d, i);
					},
					onout (d, i) {
						console.log("onout", d, i);
					}
				},
				donut: {
					title: "Iris Petal Width"
				},
				color: {
					pattern: scColors.multi
				}
			},
			lineChart: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				},
				color: {
					pattern: scColors.multi
				},
				grid: {
					x: {
						show: true
					},
					y: {
						show: true
					}
				}
			},
			radarChart: {
				data: {
					x: "x",
					columns: [
						["x", "Data A", "Data B", "Data C", "Data D", "Data E"],
						["data1", 330, 350, 200, 380, 150],
						["data2", 130, 100, 30, 200, 80],
						["data3", 230, 153, 85, 300, 250]
					],
					type: "radar",
					labels: true
				},
				radar: {
					axis: {
						max: 400
					},
					level: {
						depth: 4
					},
					direction: {
						clockwise: true
					}
				},
				color: {
					pattern: scColors.multi
				}
			},
			scatterChart: {
				data: {
					xs: {
						setosa: "setosa_x",
						versicolor: "versicolor_x",
						virginica: "virginica_x"
					},
					columns: [
						["setosa_x", 3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3, 4, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3, 3.8, 3.2, 3.7, 3.3],
						["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2, 3, 2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3, 2.8, 3, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6, 3, 2.6, 2.3, 2.7, 3, 2.9, 2.9, 2.5, 2.8],
						["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
						["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1, 1.3, 1.4, 1, 1.5, 1, 1.4, 1.3, 1.4, 1.5, 1, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1, 1.1, 1, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3]
					],
					type: "scatter"
				},
				axis: {
					x: {
						label: "Sepal.Width",
						tick: {
							fit: false
						}
					},
					y: {
						label: "Petal.Width"
					}
				},
				color: {
					pattern: scColors.multi
				}
			}
		},
		cjs: {
			barChart: {
				options: {
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						position: 'top'
					},
					title: {
						display: true,
						text: 'Chart.js Bar Chart'
					}
				}
			},
			barStackedChart: {
				options: {
					title: {
						display: true,
						text: 'Chart.js Bar Chart - Stacked'
					},
					tooltips: {
						mode: 'index',
						intersect: false
					},
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						xAxes: [{
							stacked: true
						}],
						yAxes: [{
							stacked: true
						}]
					}
				}
			},
			lineChart: {
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: true,
						text: 'Chart.js Line Chart'
					},
					tooltips: {
						mode: 'index',
						intersect: false
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						xAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Month'
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Value'
							}
						}]
					}
				}
			},
			lineInterpolationChart: {
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: true,
						text: 'Chart.js Line Chart - Cubic interpolation mode'
					},
					tooltips: {
						mode: 'index'
					},
					scales: {
						xAxes: [{
							display: true,
							scaleLabel: {
								display: true
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Value'
							},
							ticks: {
								suggestedMin: -10,
								suggestedMax: 200
							}
						}]
					}
				}
			},
			lineSteppedChart: {
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: true,
						text: 'Step Before Interpolation'
					}
				}
			},
			linePointsChart: {
				options: {
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						position: 'bottom'
					},
					hover: {
						mode: 'index'
					},
					scales: {
						xAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Month'
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Value'
							}
						}]
					},
					title: {
						display: true,
						text: 'Chart.js Line Chart - Different point sizes'
					}
				}
			},
			areaChart: {
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: true,
						text: 'Chart.js - fill: start'
					}
				}
			},
			areaStackedChart: {
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: true,
						text: 'Chart.js Line Chart - Stacked Area'
					},
					tooltips: {
						mode: 'index'
					},
					hover: {
						mode: 'index'
					},
					scales: {
						xAxes: [{
							scaleLabel: {
								display: true,
								labelString: 'Month'
							}
						}],
						yAxes: [{
							stacked: true,
							scaleLabel: {
								display: true,
								labelString: 'Value'
							}
						}]
					}
				}
			},
			doughnutChart: {
				options: {
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						position: 'right'
					},
					title: {
						display: true,
						text: 'Chart.js Doughnut Chart'
					},
					animation: {
						animateScale: true,
						animateRotate: true
					}
				}
			},
			pieChart: {
				options:  {
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						position: 'right'
					},
					title: {
						display: true,
						text: 'Chart.js Pie Chart'
					}
				}
			},
			polarAreaChart: {
				options: {
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						position: 'right'
					},
					title: {
						display: true,
						text: 'Chart.js Polar Area Chart'
					},
					scale: {
						ticks: {
							beginAtZero: true
						},
						reverse: false
					},
					animation: {
						animateRotate: false,
						animateScale: true
					}
				}
			}
		},
		seed: Date.now(),
		color: (process.client) ? Chart.helpers.color : '#fff',
		cjsDatatpoints: [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170]
	}),
	computed: {
		cjsRandData () {
			return [
				this.cjsGenerateData(6), this.cjsGenerateData(6), this.cjsGenerateData(6),
				this.cjsGenerateData(6), this.cjsGenerateData(6), this.cjsGenerateData(6),
				this.cjsGenerateData(6), this.cjsGenerateData(6), this.cjsGenerateData(6),
				this.cjsGenerateData(6), this.cjsGenerateData(6), this.cjsGenerateData(6),
				this.cjsGenerateData(6), this.cjsGenerateData(6), this.cjsGenerateData(6),
				this.cjsGenerateData(6), this.cjsGenerateData(6), this.cjsGenerateData(5), // 17
				this.cjsGenerateData(5)
			]
		},
		cjsBarChartData () {
			return {
				labels: ['January', 'February', 'March', 'April', 'May', 'June'],
				datasets: [{
					label: 'Dataset 1',
					backgroundColor: (process.client) ? this.color(scColors.multi[0]).alpha(0.8).rgbString() : this.color,
					borderColor: scColors.multi[0],
					borderWidth: 1,
					data: this.cjsRandData[0]
				}, {
					label: 'Dataset 2',
					backgroundColor: (process.client) ? this.color(scColors.multi[1]).alpha(0.8).rgbString() : this.color,
					borderColor: scColors.multi[1],
					borderWidth: 1,
					data: this.cjsRandData[1]
				}]
			}
		},
		cjsBarStackedChartData () {
			return {
				labels: ['January', 'February', 'March', 'April', 'May', 'June'],
				datasets: [{
					label: 'Dataset 1',
					backgroundColor: scColors.multi[1],
					stack: 'Stack 0',
					data: this.cjsRandData[2]
				}, {
					label: 'Dataset 2',
					backgroundColor: scColors.multi[3],
					stack: 'Stack 0',
					data: this.cjsRandData[3]
				}, {
					label: 'Dataset 3',
					backgroundColor: scColors.multi[0],
					stack: 'Stack 1',
					data: this.cjsRandData[4]
				}]

			}
		},
		cjsLineChartData () {
			return {
				labels: ['January', 'February', 'March', 'April', 'May', 'June'],
				datasets: [{
					label: 'My First dataset',
					backgroundColor: scColors.multi[4],
					borderColor: scColors.multi[4],
					data: this.cjsRandData[5],
					fill: false
				}, {
					label: 'My Second dataset',
					fill: false,
					backgroundColor: scColors.multi[5],
					borderColor: scColors.multi[5],
					data: this.cjsRandData[6]
				}]
			}
		},
		cjsLineInterpolationChartData () {
			const self = this;
			return {
				labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
				datasets: [{
					label: 'Cubic interpolation (monotone)',
					data: self.cjsDatatpoints,
					borderColor: scColors.multi[0],
					backgroundColor: 'rgba(0, 0, 0, 0)',
					fill: false,
					cubicInterpolationMode: 'monotone'
				}, {
					label: 'Cubic interpolation (default)',
					data: self.cjsDatatpoints,
					borderColor: scColors.multi[1],
					backgroundColor: 'rgba(0, 0, 0, 0)',
					fill: false
				}, {
					label: 'Linear interpolation',
					data: self.cjsDatatpoints,
					borderColor: scColors.multi[2],
					backgroundColor: 'rgba(0, 0, 0, 0)',
					fill: false,
					lineTension: 0
				}]
			}
		},
		cjsLineSteppedChartData () {
			return {
				labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
				datasets: [{
					label: 'steppedLine: true',
					steppedLine: true,
					data: this.cjsRandData[7],
					borderColor: scColors.multi[5],
					fill: false
				}]
			}
		},
		cjsLinePointsChartData () {
			return {
				labels: ['January', 'February', 'March', 'April', 'May', 'June'],
				datasets: [{
					label: 'dataset - big points',
					data: this.cjsRandData[8],
					backgroundColor: scColors.multi[0],
					borderColor: scColors.multi[0],
					fill: false,
					borderDash: [5, 5],
					pointRadius: 15,
					pointHoverRadius: 25
				}, {
					label: 'dataset - individual point sizes',
					data: this.cjsRandData[9],
					backgroundColor: scColors.multi[1],
					borderColor: scColors.multi[1],
					fill: false,
					borderDash: [5, 5],
					pointRadius: [2, 4, 6, 18, 0, 12, 20]
				}, {
					label: 'dataset - large pointHoverRadius',
					data: this.cjsRandData[10],
					backgroundColor: scColors.multi[2],
					borderColor: scColors.multi[2],
					fill: false,
					pointHoverRadius: 30
				}, {
					label: 'dataset - large pointHitRadius',
					data: this.cjsRandData[11],
					backgroundColor: scColors.multi[3],
					borderColor: scColors.multi[3],
					fill: false,
					pointHitRadius: 20
				}]
			}
		},
		cjsAreaChartData () {
			return {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				datasets: [{
					label: 'My First dataset',
					backgroundColor: this.transparentize(scColors.multi[3]),
					borderColor: this.transparentize(scColors.multi[3]),
					data: this.cjsRandData[12],
					fill: 'start'
				}]
			}
		},
		cjsAreaStackedChartData () {
			return {
				labels: ['January', 'February', 'March', 'April', 'May', 'June'],
				datasets: [{
					label: 'My First dataset',
					borderColor: scColors.multi[0],
					backgroundColor: scColors.multi[0],
					data: this.cjsRandData[13]
				}, {
					label: 'My Second dataset',
					borderColor: scColors.multi[1],
					backgroundColor: scColors.multi[1],
					data: this.cjsRandData[14]
				}, {
					label: 'My Third dataset',
					borderColor: scColors.multi[2],
					backgroundColor: scColors.multi[2],
					data: this.cjsRandData[15]
				}, {
					label: 'My Third dataset',
					borderColor: scColors.multi[3],
					backgroundColor: scColors.multi[3],
					data: this.cjsRandData[16]
				}]
			}
		},
		cjsDoughnutChartData () {
			return {
				datasets: [
					{
						data: this.cjsRandData[17],
						backgroundColor: [
							scColors.multi[0],
							scColors.multi[1],
							scColors.multi[2],
							scColors.multi[3],
							scColors.multi[4]
						],
						label: 'Dataset 1'
					}
				],
				labels: [
					'Blue',
					'Orange',
					'Green',
					'Purple',
					'Red'
				]
			}
		},
		cjsPieChartData () {
			return {
				datasets: [{
					data: this.cjsRandData[18],
					backgroundColor: [
						scColors.multi[0],
						scColors.multi[1],
						scColors.multi[2],
						scColors.multi[3],
						scColors.multi[4]
					],
					label: 'Dataset 1'
				}],
				labels: [
					'Blue',
					'Orange',
					'Green',
					'Purple',
					'Red'
				]
			}
		},
		cjsPolarAreaChart () {
			let randomScalingFactor = () => {
				return Math.round(Math.random() * 100);
			};
			return {
				datasets: [{
					data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor()
					],
					backgroundColor: [
						(process.client) ? this.color(scColors.multi[0]).alpha(0.6).rgbString() : scColors.multi[0],
						(process.client) ? this.color(scColors.multi[1]).alpha(0.6).rgbString() : scColors.multi[1],
						(process.client) ? this.color(scColors.multi[2]).alpha(0.6).rgbString() : scColors.multi[2],
						(process.client) ? this.color(scColors.multi[3]).alpha(0.6).rgbString() : scColors.multi[3],
						(process.client) ? this.color(scColors.multi[4]).alpha(0.6).rgbString() : scColors.multi[4]
					],
					label: 'My dataset'
				}],
				labels: [
					'Blue',
					'Orange',
					'Green',
					'Purple',
					'Red'
				]
			}
		}
	},
	mounted () {
		// update bb bar chart
		setTimeout(() => {
			this.bb.barChart.data.columns.push(
				["data3", 130, -150, 200, 300, -200, 100]
			)
		}, 1000);
		// update bb donut chart
		setTimeout(() => {
			this.bb.donutChart.data.columns.push(
				["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2]
			);
			this.bb.donutChart.data.columns.push(
				["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3]
			);
			this.bb.donutChart.data.columns.push(
				["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8]
			)
		}, 1500);
		setTimeout(() => {
			this.bb.donutChart.data.columns.splice(0, 2);
		}, 2500);
		// update bb line chart
		setTimeout(() => {
			// this.bb.lineChart.data.columns.push(["data1", 230, 190, 300, 500, 300, 400]);
		}, 1000);
		setTimeout(() => {
			this.bb.lineChart.data.columns.push(
				["data3", 130, 150, 200, 300, 200, 100]
			);
		}, 1500);
		setTimeout(() => {
			this.bb.lineChart.data.columns.splice(0, 1);
		}, 1500);
		// update bb scatter chart
		setTimeout(() => {
			this.bb.scatterChart.data.columns.push(
				["virginica_x", 3.3, 2.7, 3.0, 2.9, 3.0, 3.0, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7, 3.0, 2.5, 2.8, 3.2, 3.0, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3.0, 2.8, 3.0, 2.8, 3.8, 2.8, 2.8, 2.6, 3.0, 3.4, 3.1, 3.0, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3.0, 2.5, 3.0, 3.4, 3.0]
			);
			this.bb.scatterChart.data.columns.push(
				["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8]
			);
		}, 1000);
		setTimeout(() => {
			var index = this.bb.scatterChart.data.columns.map(item => {
				return item[0]
			}).indexOf('setosa');
			this.bb.scatterChart.data.columns.splice(index, 1);
		}, 2000);
		setTimeout(() => {
			this.bb.scatterChart.data.columns.push(
				["virginica", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2]
			)
		}, 3000);
	},
	methods: {
		cjsRandomizeData (min, max) {
			let seed = this.seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this.seed = (seed * 9301 + 49297) % 233280;
			return min + (this.seed / 233280) * (max - min);
		},
		cjsGenerateData (items) {
			let data = [];
			for (let i = 0; i < items; i++) {
				data.push(Math.round(this.cjsRandomizeData(-100, 100)))
			}
			return data;
		},
		transparentize (color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return (process.client) ? this.color(color).alpha(alpha).rgbString() : color;
		}
	}
}
</script>
