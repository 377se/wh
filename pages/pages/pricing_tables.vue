<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-flex uk-flex-center">
				<div class="uk-width-3-4@l">
					<div class="uk-child-width-1-3@l uk-child-width-1-2@s uk-grid" data-uk-grid>
						<div v-for="table in data" :key="table.id">
							<ScCard>
								<ScCardBody class="sc-padding-remove">
									<div class="sc-padding sc-round-top" :class="{'sc-light md-bg-light-blue-600' : table.default}">
										<div class="uk-flex uk-flex-middle uk-grid-small" data-uk-grid>
											<div class="uk-width-expand@s uk-text-center@xs">
												<h3 class="uk-margin-remove">
													{{ table.title }}
												</h3>
												<span class="uk-text-uppercase uk-text-small sc-color-secondary">
													{{ table. subtitle }}
												</span>
											</div>
											<div class="uk-width-auto@s uk-text-center@xs">
												<h1 class="sc-pricing-table-amount uk-margin-remove uk-display-inline-block sc-text-semibold">
													{{ table.price }}
												</h1>
												<span class="uk-text-small sc-color-secondary">
													/month
												</span>
											</div>
										</div>
									</div>
									<hr class="uk-margin-remove">
									<div class="sc-padding-large">
										<ul class="uk-list uk-list-large uk-margin-bottom">
											<li class="uk-text-large">
												<i class="mdi mdi-check uk-margin-right md-color-green-500"></i>{{ table.features.ram }}
											</li>
											<li class="uk-text-large">
												<i class="mdi mdi-check uk-margin-right md-color-green-500"></i>{{ table.features.cpu }}
											</li>
											<li class="uk-text-large">
												<i class="mdi mdi-check uk-margin-right md-color-green-500"></i>{{ table.features.disk }}
											</li>
											<li class="uk-text-large">
												<i class="mdi mdi-check uk-margin-right md-color-green-500"></i>
												<!-- eslint-disable-next-line vue/no-v-html -->
												<span v-html="table.features.transfer"></span>
											</li>
											<li class="uk-text-large">
												<i class="mdi mdi-check uk-margin-right md-color-green-500"></i>{{ table.features.users }}
											</li>
											<li v-if="!table.features.mailchimp" class="uk-text-large">
												<i class="mdi mdi-check uk-margin-right md-color-grey-400"></i><span class="md-color-grey-400">
													Mailchimp Integration
												</span>
											</li>
											<li v-else class="uk-text-large">
												<i class="mdi mdi-check uk-margin-right md-color-green-500"></i>Mailchimp Integration
											</li>
											<li v-if="!table.features.support" class="uk-text-large">
												<i class="mdi mdi-check uk-margin-right md-color-grey-400"></i><span class="md-color-grey-400">
													24/7 Support
												</span>
											</li>
											<li v-else class="uk-text-large">
												<i class="mdi mdi-check uk-margin-right md-color-green-500"></i>24/7 Support
											</li>
										</ul>
									</div>
									<hr class="uk-margin-remove">
									<div class="sc-padding md-bg-grey-200 uk-text-center">
										<button class="sc-button sc-button-large sc-button-block" :class="{'sc-button-custom md-bg-light-blue-600' : table.default}">
											Sign Up
										</button>
									</div>
								</ScCardBody>
							</ScCard>
						</div>
					</div>
					<hr class="uk-margin-large">
					<ScCard>
						<ScCardBody>
							<h1 class="uk-text-center uk-margin-small-bottom">
								Plans & Pricing
							</h1>
							<p class="uk-text-center uk-margin-top-remove uk-margin-large-bottom">
								Free 14-day trial. No credit card required.
							</p>
							<div class="uk-overflow-auto">
								<table class="uk-table uk-table-hover uk-table-border-inside uk-table-middle">
									<thead>
										<tr>
											<th class="uk-table-border-remove"></th>
											<th class="uk-width-1-6 uk-text-center md-bg-grey-100">
												<span class="uk-display-block sc-text-semibold uk-text-large md-color-red-600">
													Personal
												</span>
												<span>For Freelancers</span>
											</th>
											<th class="uk-width-1-6 uk-text-center md-bg-grey-100">
												<span class="uk-display-block sc-text-semibold uk-text-large md-color-blue-600">
													Team
												</span>
												<span>For small teams</span>
											</th>
											<th class="uk-width-1-6 uk-text-center md-bg-grey-100">
												<span class="uk-display-block sc-text-semibold uk-text-large md-color-green-600">
													Enterprise
												</span>
												<span>For large teams</span>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr class="uk-table-hover-disable">
											<td class="uk-table-border-remove"></td>
											<td class="uk-text-center">
												<div class="sc-padding">
													<h1 class="uk-margin-remove uk-display-inline-block sc-text-semibold">
														$5
													</h1>/mo
												</div>
											</td>
											<td class="uk-text-center">
												<div class="sc-padding">
													<h1 class="uk-margin-remove uk-display-inline-block sc-text-semibold">
														$20
													</h1>/mo
												</div>
											</td>
											<td class="uk-text-center">
												<div class="sc-padding">
													<h1 class="uk-margin-remove uk-display-inline-block sc-text-semibold">
														$99
													</h1>/mo
												</div>
											</td>
										</tr>
										<tr class="md-bg-grey-100">
											<td>
												<strong class="uk-text-uppercase">
													Features
												</strong>
											</td>
											<td colspan="3">
											&nbsp;
											</td>
										</tr>
										<tr>
											<td class="uk-text-nowrap">
												API Projects
											</td>
											<td class="uk-text-center uk-text-large">
												3
											</td>
											<td class="uk-text-center uk-text-large">
												10
											</td>
											<td class="uk-text-center uk-text-large">
												Unlimited
											</td>
										</tr>
										<tr>
											<td class="uk-text-nowrap">
												Number of keywords
											</td>
											<td class="uk-text-center uk-text-large">
												5
											</td>
											<td class="uk-text-center uk-text-large">
												15
											</td>
											<td class="uk-text-center uk-text-large">
												50
											</td>
										</tr>
										<tr>
											<td>
												Customization of your web page (Logo, cover, videos, photos)
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
										</tr>
										<tr>
											<td>Email templates HTML + RWD</td>
											<td class="uk-text-center">
												<i class="mdi mdi-minus md-color-grey-400"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
										</tr>
										<tr class="md-bg-grey-100">
											<td>
												<strong class="uk-text-uppercase">
													Other benefits
												</strong>
											</td>
											<td colspan="3">
											&nbsp;
											</td>
										</tr>
										<tr>
											<td class="uk-text-nowrap">
												Team Management
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-minus md-color-grey-400"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
										</tr>
										<tr>
											<td class="uk-text-nowrap">
												Advanced GitHub Integration
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
										</tr>
										<tr>
											<td class="uk-text-nowrap">
												Mailchimp Integration
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
										</tr>
										<tr>
											<td class="uk-text-nowrap">
												Analytics Integration
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-minus md-color-grey-400"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
										</tr>
										<tr>
											<td class="uk-text-nowrap">
												SSL Security Included
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-minus md-color-grey-400"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
										</tr>
										<tr>
											<td class="uk-text-nowrap">
												24/7 Support
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-minus md-color-grey-400"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-minus md-color-grey-400"></i>
											</td>
											<td class="uk-text-center">
												<i class="mdi mdi-check md-color-green-500"></i>
											</td>
										</tr>
										<tr class="uk-table-hover-disable">
											<td class="uk-table-border-remove"></td>
											<td class="uk-text-center">
												<button class="sc-button sc-button-custom md-bg-red-600">
													Try it Free
												</button>
											</td>
											<td class="uk-text-center">
												<button class="sc-button sc-button-custom md-bg-blue-600">
													Try it Free
												</button>
											</td>
											<td class="uk-text-center">
												<button class="sc-button sc-button-custom md-bg-green-600">
													Try it Free
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PagesPricingTables',
	data: () => ({
		data: [
			{
				id: 1,
				title: 'Personal',
				subtitle: 'For Frelancers',
				price: '$5',
				features: {
					ram: '512MB Memory',
					cpu: '1 Core Processor',
					disk: '10GB SSD Disk',
					transfer: '1TB Transfer',
					users: '1 User',
					mailchimp: false,
					support: false
				}
			},
			{
				id: 2,
				default: true,
				title: 'Team',
				subtitle: 'For small teams',
				price: '$20',
				features: {
					ram: '4BG Memory',
					cpu: '2 Core Processor',
					disk: '20GB SSD Disk',
					transfer: '8TB Transfer',
					users: '5 Users',
					mailchimp: true,
					support: false
				}
			},
			{
				id: 3,
				title: 'Enterprise',
				subtitle: 'For large teams',
				price: '$99',
				features: {
					ram: '32BG Memory',
					cpu: '8 Core Processor',
					disk: '1000GB SSD Disk',
					transfer: '<strong>Unlimited</strong> Transfer',
					users: '50 Users',
					mailchimp: true,
					support: true
				}
			}
		]
	})
}
</script>
