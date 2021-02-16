<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScTransition
				group
				stagger
				:speed="20"
				origin="50% 50%"
				class="uk-child-width-1-5@xl uk-child-width-1-3@l uk-child-width-1-2@s uk-grid uk-grid-match uk-sortable"
				data-uk-grid
				data-uk-sortable
			>
				<div v-show="showWidgets" key="widgetA">
					<ScCard class="sc-widget uk-flex">
						<div class="uk-width-1-4 md-bg-cyan-600 uk-flex-middle uk-flex uk-flex-center">
							<i class="mdi mdi-memory md-color-white sc-icon-24"></i>
						</div>
						<div class="uk-flex-1">
							<ScCardBody>
								<ScCardTitle>
									RAM usage
								</ScCardTitle>
								<ScProgressLinear extra-class="uk-margin-small-top">
									<ScProgressBar :value="ramUsage" color="md-bg-red-400"></ScProgressBar>
								</ScProgressLinear>
							</ScCardBody>
						</div>
					</ScCard>
				</div>
				<div v-show="showWidgets" key="widgetB">
					<ScCard class="sc-widget uk-flex">
						<div class="uk-width-1-4 md-bg-red-600 uk-flex-middle uk-flex uk-flex-center">
							<i class="mdi mdi-account-card-details md-color-white sc-icon-24"></i>
						</div>
						<div class="uk-flex-1">
							<ScCardBody>
								<ScCardTitle>
									New Customers
								</ScCardTitle>
								<ScCardMeta>
									1 453
								</ScCardMeta>
							</ScCardBody>
						</div>
					</ScCard>
				</div>
				<div v-show="showWidgets" key="widgetC">
					<ScCard class="sc-widget uk-flex">
						<div class="uk-width-1-4 md-bg-light-green-600 uk-flex-middle uk-flex uk-flex-center">
							<i class="mdi mdi-car md-color-white sc-icon-24"></i>
						</div>
						<div class="uk-flex-1">
							<ScCardBody>
								<ScCardTitle>
									Free spaces
								</ScCardTitle>
								<ScProgressLinear extra-class="uk-margin-small-top" size="sm">
									<ScProgressBar :value="58" color="md-bg-light-green-400"></ScProgressBar>
								</ScProgressLinear>
							</ScCardBody>
						</div>
					</ScCard>
				</div>
				<div v-show="showWidgets" key="widgetD">
					<ScCard class="sc-widget uk-flex">
						<div class="uk-width-1-4 md-bg-amber-600 uk-flex-middle uk-flex uk-flex-center">
							<i class="mdi mdi-currency-eur md-color-white sc-widget-addon"></i>
						</div>
						<div class="uk-flex-1">
							<ScCardBody>
								<ScCardTitle>
									1.135873
								</ScCardTitle>
								<ScCardMeta>
									EUR to USD
								</ScCardMeta>
							</ScCardBody>
						</div>
					</ScCard>
				</div>
				<div v-show="showWidgets" key="widgetE">
					<ScCard class="sc-widget uk-flex">
						<div class="uk-width-1-4 md-bg-purple-600 uk-flex-middle uk-flex uk-flex-center">
							<i class="mdi mdi-server md-color-white sc-widget-addon"></i>
						</div>
						<div class="uk-flex-1">
							<ScCardBody>
								<ScCardTitle>
									99.95%
								</ScCardTitle>
								<ScCardMeta>
									Server Uptime
								</ScCardMeta>
							</ScCardBody>
						</div>
					</ScCard>
				</div>
			</ScTransition>
			<div class="uk-child-width-1-4@xl uk-child-width-1-2@s uk-grid" data-uk-grid>
				<div>
					<ScCard class="sc-widget">
						<div class="sc-widget-content">
							<div class="uk-flex uk-flex-middle">
								<div class="uk-flex-1">
									<ScCardTitle>
										New Customers
									</ScCardTitle>
									<ScCardMeta>
										Jan - Jun 2018
									</ScCardMeta>
								</div>
								<div>
									<span class="sc-widget-addon md-color-green-600">
										+20%
									</span>
								</div>
							</div>
						</div>
						<ChartJsLine chart-id="widgetsChartsA" :data="widgetsChartsA" :options="widgetChart.options" class="sc-chart sc-chart-widget"></ChartJsLine>
					</ScCard>
				</div>
				<div>
					<ScCard class="sc-widget">
						<div class="sc-widget-content">
							<div class="uk-flex uk-flex-middle">
								<div class="uk-flex-1">
									<ScCardTitle>
										Comments
									</ScCardTitle>
									<ScCardMeta>
										Last 7 days
									</ScCardMeta>
								</div>
								<div>
									<span class="sc-widget-addon md-color-blue-grey-600">
										<i class="mdi mdi-comment-text-multiple-outline"></i>
									</span>
								</div>
							</div>
						</div>
						<ChartJsLine chart-id="widgetsChartsB" :data="widgetsChartsB" :options="widgetChart.options" class="sc-chart sc-chart-widget"></ChartJsLine>
					</ScCard>
				</div>
				<div>
					<ScCard class="sc-widget">
						<div class="sc-widget-content">
							<div class="uk-flex uk-flex-middle">
								<div class="uk-flex-1">
									<ScCardTitle>
										Sale
									</ScCardTitle>
									<ScCardMeta>
										02.2018 - 07.2018
									</ScCardMeta>
								</div>
								<div>
									<span class="sc-widget-addon md-color-red-600">
										+ $2230.00
									</span>
								</div>
							</div>
						</div>
						<ChartJsLine chart-id="widgetsChartsC" :data="widgetsChartsC" :options="widgetChart.options" class="sc-chart sc-chart-widget"></ChartJsLine>
					</ScCard>
				</div>
				<div>
					<ScCard class="sc-widget">
						<div class="sc-widget-content">
							<div class="uk-flex uk-flex-middle">
								<div class="uk-flex-1">
									<ScCardTitle>
										Orders
									</ScCardTitle>
									<ScCardMeta>
										02.2018 - 07.2018
									</ScCardMeta>
								</div>
								<div>
									<span class="sc-widget-addon md-color-blue-grey-600">
										<i class="mdi mdi-cart"></i>
									</span>
								</div>
							</div>
						</div>
						<ChartJsLine chart-id="widgetsChartsD" :data="widgetsChartsD" :options="widgetChart.options" class="sc-chart sc-chart-widget"></ChartJsLine>
					</ScCard>
				</div>
			</div>
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-3@l">
					<div class="uk-child-width-1-1@l uk-child-width-1-2@m uk-grid" data-uk-grid>
						<div>
							<Transition name="scale-up">
								<ScCard v-if="!trafficCardClosed" ref="trafficCard">
									<ScCardHeader>
										<div class="uk-flex uk-flex-middle">
											<div class="uk-flex-1">
												<ScCardTitle>
													Traffic sources
												</ScCardTitle>
											</div>
											<ScCardActions>
												<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close" @click="trafficCardClosed = true"></a>
											</ScCardActions>
										</div>
									</ScCardHeader>
									<ScCardBody>
										<ChartJsDoughnut chart-id="traficChartData" :data="traficChartData" :options="traficChart.options" class="sc-chart"></ChartJsDoughnut>
									</ScCardBody>
								</ScCard>
							</Transition>
						</div>
						<div>
							<Transition name="scale-up">
								<ScCard v-if="!bestSellersCardClosed" ref="trafficCard">
									<ScCardHeader>
										<div class="uk-flex uk-flex-middle">
											<div class="uk-flex-1">
												<ScCardTitle>
													Best Sellers
												</ScCardTitle>
											</div>
											<ScCardActions>
												<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close" @click="bestSellersCardClosed = true"></a>
											</ScCardActions>
										</div>
									</ScCardHeader>
									<ScCardBody>
										<ChartJsPie chart-id="bestsellersChartData" :data="bestsellersChartData" :options="bestsellersChart.options" class="sc-chart"></ChartJsPie>
									</ScCardBody>
								</ScCard>
							</Transition>
						</div>
					</div>
				</div>
				<div class="uk-width-2-3@l">
					<ScCard ref="uniqueVisitsCard"
						class="uk-margin"
						:full-screen="uniqueVisitsCardFullScreen"
						:full-screen-callback="cardFullScreenCallback"
						:loading="uniqueVisitsCardLoading"
						:collapsed="uniqueVisitsCardCollapsed"
					>
						<ScCardHeader>
							<div class="uk-flex uk-flex-middle">
								<div class="uk-flex-1">
									<ScCardTitle class="uk-margin-remove-bottom">
										Unique visits
									</ScCardTitle>
									<ScCardMeta>
										<time datetime="2018-01-01">Jan 01, 2018</time> - <time datetime="2018-06-30">Jun 30, 2018</time>
									</ScCardMeta>
								</div>
								<ScCardActions>
									<a
										href="javascript:void(0)"
										class="sc-actions-icon mdi mdi-refresh"
										:class="{'md-color-grey-400': btnDisabled}"
										@click.prevent="loadContent()"
									></a>
									<a
										href="javascript:void(0)"
										class="sc-actions-icon mdi mdi-fullscreen"
										:class="{'mdi-fullscreen' : !uniqueVisitsCardFullScreen, 'mdi-fullscreen-exit' : uniqueVisitsCardFullScreen }"
										@click.prevent="uniqueVisitsCardFullScreen = !uniqueVisitsCardFullScreen"
									></a>
									<a
										href="javascript:void(0)"
										class="sc-actions-icon mdi "
										:class="{'mdi-window-minimize' : !uniqueVisitsCardCollapsed, 'mdi-window-maximize' : uniqueVisitsCardCollapsed }"
										@click.prevent="uniqueVisitsCardCollapsed = !uniqueVisitsCardCollapsed"
									></a>
								</ScCardActions>
							</div>
						</ScCardHeader>
						<ScTransition name="slideUp">
							<ScCardContent v-show="!uniqueVisitsCardCollapsed" :loading="uniqueVisitsCardLoading">
								<div>
									<VectorMap ref="vmap" :config="visitsMap" class="sc-vmap" @loaded="cardFullScreenCallback = vmapResize"></VectorMap>
								</div>
								<div class="uk-overflow-auto">
									<table class="uk-table uk-table-divider uk-table-striped uk-table-hover uk-table-middle uk-margin-remove">
										<thead>
											<tr>
												<th></th>
												<th>Country</th>
												<th>Jan</th>
												<th>Feb</th>
												<th>Mar</th>
												<th>Apr</th>
												<th>May</th>
												<th>Jun</th>
											</tr>
										</thead>
										<tbody>
											<tr @mouseenter="highlightRegion('br')" @mouseleave="unhighlightRegion('br')">
												<td class="uk-table-shrink sc-padding-left">
													<span class="flag flag-br"></span>
												</td>
												<td><strong>Brazil</strong></td>
												<td v-for="visits in visitsData.brazil" :key="visits" class="uk-text-nowrap">
													{{ visits | formatNumber('0 0') }}
												</td>
											</tr>
											<tr @mouseenter="highlightRegion('us')" @mouseleave="unhighlightRegion('us')">
												<td class="uk-table-shrink sc-padding-left">
													<span class="flag flag-us"></span>
												</td>
												<td><strong>USA</strong></td>
												<td v-for="visits in visitsData.usa" :key="visits" class="uk-text-nowrap">
													{{ visits | formatNumber('0 0') }}
												</td>
											</tr>
											<tr @mouseenter="highlightRegion('pl')" @mouseleave="unhighlightRegion('pl')">
												<td class="uk-table-shrink sc-padding-left">
													<span class="flag flag-pl"></span>
												</td>
												<td><strong>Poland</strong></td>
												<td v-for="visits in visitsData.poland" :key="visits" class="uk-text-nowrap">
													{{ visits | formatNumber('0 0') }}
												</td>
											</tr>
											<tr @mouseenter="highlightRegion('au')" @mouseleave="unhighlightRegion('au')">
												<td class="uk-table-shrink sc-padding-left">
													<span class="flag flag-au"></span>
												</td>
												<td><strong>Australia</strong></td>
												<td v-for="visits in visitsData.australia" :key="visits" class="uk-text-nowrap">
													{{ visits | formatNumber('0 0') }}
												</td>
											</tr>
											<tr @mouseenter="highlightRegion('cn')" @mouseleave="unhighlightRegion('cn')">
												<td class="uk-table-shrink sc-padding-left">
													<span class="flag flag-cn"></span>
												</td>
												<td><strong>China</strong></td>
												<td v-for="visits in visitsData.china" :key="visits" class="uk-text-nowrap">
													{{ visits | formatNumber('0 0') }}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</ScCardContent>
						</ScTransition>
					</ScCard>
				</div>
			</div>
			<div class="uk-child-width-1-3@l uk-child-width-1-2@m uk-grid" data-uk-grid data-uk-height-match="target: > div > div > .uk-card-header > div">
				<div>
					<ScCard :collapsed="todoCardCollapsed">
						<ScCardHeader>
							<div class="uk-flex uk-flex-middle">
								<div class="uk-flex-1">
									<ScCardTitle>To Do</ScCardTitle>
									<ScCardMeta>
										4/12 tasks
									</ScCardMeta>
								</div>
								<ScCardActions>
									<a
										href="javascript:void(0)"
										class="sc-actions-icon mdi "
										:class="{'mdi-window-minimize' : !todoCardCollapsed, 'mdi-window-maximize' : todoCardCollapsed }"
										@click.prevent="todoCardCollapsed = !todoCardCollapsed"
									></a>
									<div class="sc-dropdown sc-dropdown-ico">
										<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-dots-vertical"></a>
										<div data-uk-dropdown="mode:click">
											<ul class="uk-nav uk-dropdown-nav">
												<li class="uk-active">
													<a href="javascript:void(0)">
														Active
													</a>
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
												<li class="uk-nav-header">
													Header
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
												<li class="uk-nav-divider"></li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
											</ul>
										</div>
									</div>
								</ScCardActions>
							</div>
						</ScCardHeader>
						<ScTransition name="slideUp">
							<ScCardContent v-show="!todoCardCollapsed">
								<ScCardBody>
									<ul class="uk-list uk-list-divider">
										<li class="sc-list-group" :class="{'sc-item-checked': todo.item1}">
											<div class="sc-list-addon">
												<PrettyCheck v-model="todo.item1" class="p-icon">
													<i slot="extra" class="icon mdi mdi-check"></i>
												</PrettyCheck>
											</div>
											<div class="sc-list-body" @click="todo.item1 = !todo.item1">
												<div class="uk-flex uk-flex-middle">
													<div class="uk-flex-1">
														<label>
															Pay electricity bill <span>$248.00 (25/11/2018)</span>
														</label>
													</div>
													<span class="uk-label md-bg-grey-600 uk-margin-small-left sc-flex-no-shrink">
														Other
													</span>
												</div>
											</div>
										</li>
										<li class="sc-list-group" :class="{'sc-item-checked': todo.item2}">
											<div class="sc-list-addon">
												<PrettyCheck v-model="todo.item2" class="p-icon">
													<i slot="extra" class="icon mdi mdi-check"></i>
												</PrettyCheck>
											</div>
											<div class="sc-list-body" @click="todo.item2 = !todo.item2">
												<div class="uk-flex uk-flex-middle">
													<div class="uk-flex uk-flex-middle uk-flex-1 uk-text-truncate">
														<i class="mdi mdi-airplane sc-icon-24 uk-margin-small-right"></i>
														<label>
															Book flight to Dublin
														</label>
													</div>
													<span class="uk-label md-bg-green-400 uk-margin-small-left sc-flex-no-shrink">
														Family
													</span>
												</div>
											</div>
										</li>
										<li class="sc-list-group" :class="{'sc-item-checked': todo.item3}">
											<div class="sc-list-addon">
												<PrettyCheck v-model="todo.item3" class="p-icon">
													<i slot="extra" class="icon mdi mdi-check"></i>
												</PrettyCheck>
											</div>
											<div class="sc-list-body" @click="todo.item3 = !todo.item3">
												<div class="uk-flex uk-flex-middle">
													<div class="uk-flex-1 uk-text-truncate">
														<label>
															Call <strong>{{ todoName }}</strong><span>Short descriprtion&hellip;</span>
														</label>
													</div>
													<span class="uk-label md-bg-blue-400 uk-margin-small-left sc-flex-no-shrink">
														Work
													</span>
												</div>
											</div>
										</li>
										<li class="sc-list-group" :class="{'sc-item-checked': todo.item4}">
											<div class="sc-list-addon">
												<PrettyCheck v-model="todo.item4" class="p-icon">
													<i slot="extra" class="icon mdi mdi-check"></i>
												</PrettyCheck>
											</div>
											<div class="sc-list-body" @click="todo.item4 = !todo.item4">
												<div class="uk-flex uk-flex-middle">
													<div class="uk-flex-1 uk-text-truncate">
														<label>
															Contact service center <span>15/09/2018</span>
														</label>
													</div>
													<span class="uk-label md-bg-red-400 uk-margin-small-left sc-flex-no-shrink">
														Important
													</span>
												</div>
											</div>
										</li>
										<li class="sc-list-group" :class="{'sc-item-checked': todo.item5}">
											<div class="sc-list-addon">
												<PrettyCheck v-model="todo.item5" class="p-icon">
													<i slot="extra" class="icon mdi mdi-check"></i>
												</PrettyCheck>
											</div>
											<div class="sc-list-body" @click="todo.item5 = !todo.item5">
												<div class="uk-flex uk-flex-middle">
													<div class="uk-flex-1 uk-text-truncate">
														<label>
															Email team for updates <span>BCC: {{ todoEmail }}</span>
														</label>
													</div>
													<span class="uk-label md-bg-blue-400 uk-margin-small-left sc-flex-no-shrink">
														Work
													</span>
												</div>
											</div>
										</li>
									</ul>
								</ScCardBody>
							</ScCardContent>
						</ScTransition>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardHeader>
							<div class="uk-flex uk-flex-middle">
								<ScCardTitle>
									Email Marketing
								</ScCardTitle>
							</div>
						</ScCardHeader>
						<ScCardBody>
							<div>
								<h5 class="uk-margin-bottom">
									Delivered
								</h5>
								<ScProgressLinear extra-class="uk-margin-medium-top" size="md">
									<ScProgressLabel>
										{{ progressEmail.bar1 }}%
									</ScProgressLabel>
									<ScProgressBar :value="progressEmail.bar1" color="md-bg-light-green-800"></ScProgressBar>
								</ScProgressLinear>
							</div>
							<hr>
							<div>
								<h5 class="uk-margin-bottom">
									Opened
								</h5>
								<ScProgressLinear extra-class="uk-margin-medium-top" size="md">
									<ScProgressLabel>
										{{ progressEmail.bar2 }}%
									</ScProgressLabel>
									<ScProgressBar :value="progressEmail.bar2" color="md-bg-amber-800"></ScProgressBar>
								</ScProgressLinear>
							</div>
							<hr>
							<div>
								<h5 class="uk-margin-bottom">
									Clicked
								</h5>
								<ScProgressLinear extra-class="uk-margin-medium-top" size="md">
									<ScProgressLabel>
										{{ progressEmail.bar3 }}%
									</ScProgressLabel>
									<ScProgressBar :value="progressEmail.bar3" color="md-bg-red-800"></ScProgressBar>
								</ScProgressLinear>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardHeader>
							<div class="uk-flex uk-flex-middle">
								<div class="uk-flex-1">
									<ScCardTitle>
										Shop Orders
									</ScCardTitle>
								</div>
								<ScCardActions>
									<div class="sc-dropdown">
										<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-dots-vertical"></a>
										<div data-uk-dropdown="mode:click">
											<ul class="uk-nav uk-dropdown-nav">
												<li class="uk-active">
													<a href="javascript:void(0)">
														Active
													</a>
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
												<li class="uk-nav-header">
													Header
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
												<li class="uk-nav-divider"></li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
											</ul>
										</div>
									</div>
								</ScCardActions>
							</div>
						</ScCardHeader>
						<ScCardBody>
							<div class="uk-child-width-1-3@s uk-grid-divider uk-grid-small uk-grid" data-uk-grid>
								<div class="uk-text-center">
									<span class="uk-text-medium md-color-blue-600">
										Today
									</span>
									<h4 class="uk-margin-mini-top">
										62
									</h4>
								</div>
								<div class="uk-text-center">
									<span class="sc-color-secondary uk-text-medium">
										Last Week
									</span>
									<h4 class="uk-margin-mini-top">
										482
									</h4>
								</div>
								<div class="uk-text-center">
									<span class="sc-color-secondary uk-text-medium">
										Last Month
									</span>
									<h4 class="uk-margin-mini-top">
										1709
									</h4>
								</div>
							</div>
							<hr>
							<div>
								<span class="sc-color-secondary uk-text-medium">
									Orders Summary
								</span>
								<ScProgressLinear extra-class="uk-margin-small-top" group size="lg">
									<ScProgressBar :value="65" color="md-bg-light-green-600">
										Completed
									</ScProgressBar>
									<ScProgressBar :value="20" color="md-bg-grey-600">
										Pending
									</ScProgressBar>
									<ScProgressBar :value="15" color="md-bg-red-600">
										Closed
									</ScProgressBar>
								</ScProgressLinear>
							</div>
							<hr>
							<div>
								<span class="sc-color-secondary uk-text-medium">Quick Info</span>
								<p class="uk-margin-remove-bottom uk-margin-small-top">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, tenetur...
								</p>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { scColors, scMq } from '~/assets/js/utils';
const PrettyCheck = () => import('pretty-checkbox-vue/check');
import { ScProgressLinear, ScProgressBar, ScProgressLabel } from '~/components/progress'

import Chart from '~/components/chartjs/defaults'
import ChartJsDoughnut from '~/components/chartjs/Doughnut'
import ChartJsPie from '~/components/chartjs/Pie'
import ChartJsLine from '~/components/chartjs/Line'
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { VectorMap } from '~/components/vector-map';

if(process.client) {
	require('~/assets/icons/flags/flags.css');
}

export default {
	name: 'DashboardV1',
	components: {
		PrettyCheck,
		ChartJsLine,
		ChartJsDoughnut,
		ChartJsPie,
		ScProgressLinear,
		ScProgressBar,
		ScProgressLabel,
		VectorMap
	},
	data: () => ({
		ramUsage: 82,
		updateInterval: null,
		todoName: 'George Weaver',
		todoEmail: 'he@ewipebtel.be',
		todo: {
			item1: false,
			item2: false,
			item3: false,
			item4: true,
			item5: false
		},
		hightlightedRegion: null,
		showWidgets: false,
		widgetChart: {
			options: {
				responsive: true,
				maintainAspectRatio: false,
				layout: {
					padding: {
						top: 10
					}
				},
				title: {
					display: false
				},
				legend: {
					display: false,
				},
				tooltips: {
					enabled: false
				},
				elements: {
					line: {
						tension: 0.000001,
						borderWidth: 2
					},
					point: {
						radius: 0
					}
				},
				plugins: {
					filler: {
						propagate: false
					},
					datalabels: false
				},
				scales: {
					xAxes: [{
						display: false
					}],
					yAxes: [{
						display: false
					}]
				},
			}
		},
		trafficCardClosed: false,
		traficChart: {
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					position: scMq.mediumMin() ? 'right' : 'bottom'
				},
				title: {
					display: false
				},
				animation: {
					animateScale: true,
					animateRotate: true
				},
				plugins: {
					datalabels: {
						formatter: (value, ctx) => {
							let sum = 0;
							let dataArr = ctx.chart.data.datasets[0].data;
							dataArr.map(data => {
								sum += data;
							});
							return (value*100 / sum).toFixed(2)+"%";
						},
						color: '#fff',
					}
				}
			}
		},
		bestSellersCardClosed: false,
		bestsellersChart: {
			options: {
				responsive: true,
				maintainAspectRatio: false,
				layout: {
					padding: {
						top: 10,
						bottom: 10,
						left: 20,
						right: 10
					}
				},
				legend: {
					position: scMq.mediumMin() ? 'right' : 'bottom'
				},
				title: {
					display: false
				},
				plugins: {
					datalabels: {
						clamp: true,
						backgroundColor (context) {
							return context.dataset.backgroundColor;
						},
						anchor: 'end',
						borderColor: 'white',
						borderRadius: 25,
						borderWidth: 2,
						color: '#fff',
						padding: {
							left: 8,
							right: 8,
							top: 6
						},
						formatter: (value, ctx) => {
							let sum = 0;
							let dataArr = ctx.chart.data.datasets[0].data;
							dataArr.map(data => {
								sum += data;
							});
							return (value*100 / sum).toFixed(0)+"%";
						}
					}
				}
			}
		},
		uniqueVisitsCardFullScreen: false,
		uniqueVisitsCardCollapsed: false,
		uniqueVisitsCardLoading: false,
		btnDisabled: false,
		color: (process.client) ? Chart.helpers.color : '#fff',
		cardFullScreenCallback: () => {},
		todoCardCollapsed: false,
		progressEmail: {
			bar1: 100,
			bar2: 64,
			bar3: 37
		}
	}),
	computed: {
		visitsData () {
			let data = {
				brazil: [],
				usa: [],
				poland: [],
				australia: [],
				china: []
			};
			for (let i = 0; i < 6; i++) {
				data.brazil.push(this.randomNumber(1000, 4000));
				data.usa.push(this.randomNumber(10000, 50000));
				data.poland.push(this.randomNumber(1000, 10000));
				data.australia.push(this.randomNumber(5000, 30000));
				data.china.push(this.randomNumber(10000, 100000));
			}
			return data
		},
		widgetsChartsA () {
			return {
				labels: ["January", "February", "March", "April", "May", "June"],
				datasets: [{
					backgroundColor: this.transparentize('#E53935', 0.8),
					borderColor: '#E53935',
					data: [120, 60, 400, 150, 390, 35],
					fill: 'start'
				}]
			}
		},
		widgetsChartsB () {
			return {
				labels: ["2018-12-12", "2018-12-11", "2018-12-10", "2018-12-09", "2018-12-08", "2018-12-07"],
				datasets: [{
					backgroundColor: this.transparentize('#F9A825', 0.8),
					borderColor: '#F9A825',
					data: [18, 32, 12, 0, 12, 16, 3],
					fill: 'start'
				}]
			}
		},
		widgetsChartsC () {
			return {
				labels: ["2018-01-01", "2018-02-01", "2018-03-01", "2018-04-01", "2018-05-01", "2018-06-01"],
				datasets: [{
					backgroundColor: this.transparentize('#03A9F4', 0.8),
					borderColor: '#03A9F4',
					data: [12000, 26000, 10000, 15000, 12000, 50000],
					fill: 'start'
				}]
			}
		},
		widgetsChartsD () {
			return {
				labels: ["2018-01-01", "2018-02-01", "2018-03-01", "2018-04-01", "2018-05-01", "2018-06-01"],
				datasets: [{
					backgroundColor: this.transparentize('#7CB342', 0.8),
					borderColor: '#7CB342',
					data: [120, 40, 210, 360, 510, 242],
					fill: 'start'
				}]
			}
		},
		bestsellersChartData () {
			return {
				datasets: [
					{
						data: [2640.72, 4200, 1651.43, 617.55, 1231.94],
						backgroundColor: [
							scColors.multi[0],
							scColors.multi[1],
							scColors.multi[2],
							scColors.multi[3],
							scColors.multi[4]
						],
					}
				],
				labels: [
					'Automotive',
					'Books',
					'Software',
					'Toys',
					'Video Games'
				]
			}
		},
		traficChartData () {
			return {
				datasets: [{
					data: [30, 45, 25],
					backgroundColor: [
						scColors.blue[0],
						scColors.blue[1],
						scColors.blue[2]
					]
				}],
				labels: [
					'Organic',
					'Referral',
					'Social'
				]
			}
		},
		visitsMap () {
			return {
				map: 'world_en',
				backgroundColor: '#f5f5f5',
				borderOpacity: 0.25,
				color: '#BDBDBD',
				colors: {
					br: scColors.blue[1],
					us: scColors.blue[0],
					au: scColors.blue[2],
					pl: scColors.blue[3],
					cn: scColors.blue[1]
				},
				hoverColor: '#424242',
				selectedColor: '#424242'
			}
		},
	},
	mounted () {
		this.$nextTick(() => {
			this.showWidgets = true;
			this.updateRamUsage();
		})
	},
	beforeDestroy () {
		clearInterval(this.updateInterval);
	},
	methods: {
		escapeXml (string) {
			return string.replace(/[<>]/g, function (c) {
				switch (c) {
				case '<': return '\u003c';
				case '>': return '\u003e';
				}
			});
		},
		randomNumber (min, max) {
			return Math.floor(Math.random() * max) + min
		},
		updateRamUsage () {
			// update ram usage
			this.updateInterval = setInterval(() => {
				if(this.showWidgets) {
					this.ramUsage = (Math.floor(Math.random() * 100) + 15)
				}
			}, 3000);
		},
		loadContent () {
			if(!this.btnDisabled) {
				this.uniqueVisitsCardLoading = true;
				this.btnDisabled = true;
				setTimeout(() => {
					this.uniqueVisitsCardLoading = false;
					this.btnDisabled = false;
				}, 2000)
			}
		},
		highlightRegion (region) {
			if (this.hightlightedRegion) {
				this.$refs.vmap.unhighlight(this.hightlightedRegion);
			}
			this.$refs.vmap.highlight(region);
			this.hightlightedRegion = region;
		},
		unhighlightRegion () {
			if (this.hightlightedRegion) {
				this.$refs.vmap.unhighlight(this.hightlightedRegion);
			}
		},
		vmapResize () {
			this.$refs.vmap.resize()
		},
		transparentize (color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return (process.client) ? this.color(color).alpha(alpha).rgbString() : color;
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/vue/pretty_checkboxes';
	@import '~scss/plugins/jqvmap.scss';
</style>
