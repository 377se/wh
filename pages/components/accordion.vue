<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@l" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody>
							<ul data-uk-accordion>
								<li class="uk-open">
									<h3 class="uk-accordion-title">
										Item 1
									</h3>
									<div class="uk-accordion-content">
										{{ sentenceA }}
									</div>
								</li>
								<li>
									<h3 class="uk-accordion-title">
										Item 2
									</h3>
									<div class="uk-accordion-content">
										{{ sentenceA }}
									</div>
								</li>
								<li>
									<h3 class="uk-accordion-title">
										Item 3
									</h3>
									<div class="uk-accordion-content">
										{{ sentenceA }}
									</div>
								</li>
							</ul>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							Outline
						</ScCardTitle>
						<ScCardBody>
							<ul class="uk-accordion-outline" data-uk-accordion>
								<li class="uk-open">
									<h3 class="uk-accordion-title">
										Item 1
									</h3>
									<div class="uk-accordion-content">
										<div class="uk-grid-medium" data-uk-grid>
											<div class="uk-width-1-3@m">
												<ScPhoto :image-id="4" size="md" class="uk-border-rounded uk-box-shadow"></ScPhoto>
											</div>
											<div class="uk-width-expand@m">
												{{ sentenceB }}
											</div>
										</div>
									</div>
								</li>
								<li>
									<h3 class="uk-accordion-title md-bg-light-blue-50">
										Item 2
									</h3>
									<div class="uk-accordion-content">
										{{ sentenceB }}
									</div>
								</li>
								<li>
									<h3 class="uk-accordion-title">
										Item 3
									</h3>
									<div class="uk-accordion-content">
										{{ sentenceB }}
									</div>
								</li>
								<li>
									<h3 class="uk-accordion-title">
										Item 4
									</h3>
									<div class="uk-accordion-content">
										{{ sentenceB }}
									</div>
								</li>
							</ul>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							Alternative
						</ScCardTitle>
						<ScCardBody>
							<ul class="uk-accordion-alt" data-uk-accordion>
								<li class="uk-open">
									<h3 class="uk-accordion-title md-bg-light-green-600 md-color-white">
										Item 1
									</h3>
									<div class="uk-accordion-content">
										<div class="uk-grid-medium" data-uk-grid>
											<div class="uk-width-1-3@m">
												<ScPhoto :image-id="4" size="md" class="uk-border-rounded uk-box-shadow"></ScPhoto>
											</div>
											<div class="uk-width-expand@m">
												{{ sentenceB }}
											</div>
										</div>
									</div>
								</li>
								<li>
									<h3 class="uk-accordion-title">
										Item 2
									</h3>
									<div class="uk-accordion-content">
										{{ sentenceB }}
									</div>
								</li>
								<li>
									<h3 class="uk-accordion-title">
										Item 3
									</h3>
									<div class="uk-accordion-content">
										{{ sentenceB }}
									</div>
								</li>
								<li>
									<h3 class="uk-accordion-title">
										Item 4
									</h3>
									<div class="uk-accordion-content">
										{{ sentenceB }}
									</div>
								</li>
							</ul>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Multiple Open Items
						</ScCardTitle>
						<ScCardBody>
							<ul data-uk-accordion="multiple: true">
								<li class="uk-open">
									<h3 class="uk-accordion-title">
										Item 1
									</h3>
									<div class="uk-accordion-content">
										{{ sentenceB }}
									</div>
								</li>
								<li>
									<h3 class="uk-accordion-title">
										Item 2
									</h3>
									<div class="uk-accordion-content">
										{{ sentenceB }}
									</div>
								</li>
								<li>
									<h3 class="uk-accordion-title">
										Item 3
									</h3>
									<div class="uk-accordion-content">
										{{ sentenceB }}
									</div>
								</li>
							</ul>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							Form Fields
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-child-width-1-2@m uk-grid-small" data-uk-grid>
								<div>
									<ScInput id="form-f-name" v-model="accInputA">
										<label for="form-f-name">First Name</label>
									</ScInput>
								</div>
								<div>
									<ScInput id="form-l-name" v-model="accInputB">
										<label for="form-l-name">Last Name</label>
									</ScInput>
								</div>
							</div>
							<ul class="uk-margin" data-uk-accordion>
								<li>
									<h4 class="uk-accordion-title md-color-light-blue-800 uk-text-medium">
										Optional details
									</h4>
									<div class="uk-accordion-content">
										<div class="uk-child-width-1-2@m uk-grid-small" data-uk-grid>
											<div>
												<ScInput id="form-m-name" v-model="accInputC">
													<label for="form-m-name">Middle Name</label>
												</ScInput>
											</div>
											<div>
												<ScInput id="form-md-name" v-model="accInputD">
													<label for="form-md-name">Maiden Name</label>
												</ScInput>
											</div>
										</div>
									</div>
								</li>
							</ul>
							<button class="uk-margin sc-button">
								Submit
							</button>
						</ScCardBody>
					</ScCard>
					<h5 class="uk-margin uk-margin-small-bottom">
						Accordion Menu
					</h5>
					<div class="uk-width-1-2@s uk-width-1-3@l">
						<ScCard>
							<ScCardBody>
								<form>
									<ul data-uk-accordion>
										<li class="uk-open">
											<h3 class="uk-accordion-title">
												<i class="mdi mdi-ruler"></i>Size
											</h3>
											<div class="uk-accordion-content sc-padding-medium md-bg-grey-100 sc-round">
												<div class="uk-margin-small uk-flex uk-flex-middle">
													<input id="ac-size-sm"
														class="uk-radio"
														type="radio"
														name="ac-size"
														data-sc-icheck
													><label for="ac-size-sm">
														Small
													</label>
												</div>
												<div class="uk-margin-small uk-flex uk-flex-middle">
													<input id="ac-size-md"
														class="uk-radio"
														type="radio"
														name="ac-size"
														data-sc-icheck
													><label for="ac-size-md">
														Medium
													</label>
												</div>
												<div class="uk-margin-small uk-flex uk-flex-middle">
													<input id="ac-size-lg"
														class="uk-radio"
														type="radio"
														name="ac-size"
														data-sc-icheck
													><label for="ac-size-lg">
														Large
													</label>
												</div>
												<div class="uk-margin-small uk-flex uk-flex-middle">
													<input id="ac-size-xl"
														class="uk-radio"
														type="radio"
														name="ac-size"
														data-sc-icheck
													><label for="ac-size-xl">
														X-Large
													</label>
												</div>
											</div>
										</li>
										<li>
											<h3 class="uk-accordion-title">
												<i class="mdi mdi-palette"></i>Colors
											</h3>
											<div class="uk-accordion-content sc-padding-medium md-bg-grey-100 sc-round">
												<div class="uk-margin-small uk-flex uk-flex-middle">
													<input id="ac-red"
														class="uk-checkbox"
														type="checkbox"
														name="ac-red"
														data-sc-icheck
													><label for="ac-red" class="md-color-red-600">
														Red
													</label>
												</div>
												<div class="uk-margin-small uk-flex uk-flex-middle">
													<input id="ac-blue"
														class="uk-checkbox"
														type="checkbox"
														name="ac-blue"
														data-sc-icheck
													><label for="ac-blue" class="md-color-blue-600">
														Blue
													</label>
												</div>
												<div class="uk-margin-small uk-flex uk-flex-middle">
													<input id="ac-green"
														class="uk-checkbox"
														type="checkbox"
														name="ac-green"
														data-sc-icheck
													><label for="ac-green" class="md-color-green-600">
														Green
													</label>
												</div>
											</div>
										</li>
										<li>
											<h3 class="uk-accordion-title">
												<i class="mdi mdi-cash-usd"></i>Price
											</h3>
											<div class="uk-accordion-content sc-padding-medium md-bg-grey-100 sc-round">
												<div class="uk-margin-small uk-flex uk-flex-middle">
													<input id="ac-price-100"
														class="uk-checkbox"
														type="checkbox"
														name="ac-price"
														data-sc-icheck
													><label for="ac-price-100">
														$100.00
													</label>
												</div>
												<div class="uk-margin-small uk-flex uk-flex-middle">
													<input id="ac-price-500"
														class="uk-checkbox"
														type="checkbox"
														name="ac-price"
														data-sc-icheck
													><label for="ac-price-500">
														$500.00
													</label>
												</div>
												<div class="uk-margin-small uk-flex uk-flex-middle">
													<input id="ac-price-1000"
														class="uk-checkbox"
														type="checkbox"
														name="ac-price"
														data-sc-icheck
													><label for="ac-price-1000">
														$1000.00
													</label>
												</div>
												<div class="uk-margin-small uk-flex uk-flex-middle">
													<input id="ac-price-5000"
														class="uk-checkbox"
														type="checkbox"
														name="ac-price"
														data-sc-icheck
													><label for="ac-price-5000">
														$5000.00
													</label>
												</div>
											</div>
										</li>
									</ul>
								</form>
							</ScCardBody>
						</ScCard>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ScPhoto from '~/components/Photo'
import ScInput from '~/components/Input'

export default {
	name: 'ComponentsAccordion',
	components: {
		ScPhoto,
		ScInput
	},
	data: () => ({
		'accInputA': '',
		'accInputB': '',
		'accInputC': '',
		'accInputD': '',
		'sentenceA': 'Fugpon fuzne gipaj nutbof zozoona weg gunujfi zigut bew duwib fab naktof gov bovudof ipdufo hem buvagci ze ta lazse ujvuj eje ziz huma utfarid sil tewepgod cuiluwu zuzlup lol cohdihwa eha ko desil ekajaihi naczipo gof cavuv haheses nov jogra cimiguegu mo huw mas zemiruf elva ugaaf upeca ra zeha waf fifviwub lajve coge uc feug feslo sucijuf ewri.',
		'sentenceB': 'Uco enemih zu vad soulago se mup gorasaj macom was rukka vihud zaja keljev pepilag ilakislo sujfiguj rief nig zuzjec gu upvam hiebe zif miweb oja kuwletpo miv cu us womor taftumto overoke lup cekjud upito kabjevuk dufnilsi pummapter mofemalep bogugleb tu owe no diceciv rarihe he hulnuguje mufonu acu zogven vofeno ikli gurfap jijijga macnemlil no ra pu witop enomi sozigu kufur wekrodufu bidvi jojfof bozinwiz palujopu leso sege zasca hibol futam fiwaw miel behbor negihzek ciozme ut ji.'
	})
}
</script>
