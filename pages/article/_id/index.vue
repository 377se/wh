<template>
<div v-if="$fetchState.pending">
	<div id="sc-page-wrapper">
		<p>Loading</p>
	</div>
</div>
<div v-else>
 	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
				<div class="uk-flex-1">
					<img :src="this.articleDetails.ProductImage" alt="Produkbild" class="uk-margin-medium-right"><h1 class="sc-top-bar-title uk-display-inline">{{ this.articleDetails.ProductName }}</h1>
				</div>
			</div>
		</div>
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<!-- TAB-HEADLINES - ARTICLE DETAILS -->
					<ul data-uk-tab>
						<li class="uk-active">
							<a href="javascript:void(0)">
								Global info
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								Shop info
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								Sortering
							</a>
						</li>
					</ul>
					<!-- TAB-CONTENT - ARTICLE DETAILS -->
					<ul class="uk-switcher">
						<!-- Global info -->
						<li class="uk-active">
							<div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
								<div>
									<!-- Inställningar -->
									<ScCard :full-screen="cardPrefsFullScreen">
											<ScCardHeader separator>
													<div class="uk-flex uk-flex-middle">
														<div class="uk-flex-1">
															<ScCardTitle>
																Inställningar
															</ScCardTitle>
														</div>
														<ScCardActions>
															<a
																href="javascript:void(0)"
																class="sc-actions-icon mdi mdi-fullscreen"
																:class="{'mdi-fullscreen' : !cardPrefsFullScreen, 'mdi-fullscreen-exit' : cardPrefsFullScreen }"
																@click.prevent="cardPrefsFullScreen = !cardPrefsFullScreen"
															></a>
														</ScCardActions>
													</div>
												</ScCardHeader>
										<ScCardContent>
										<ScCardBody>

											<ScInput :value="this.articleDetails.ArticleId.toString()" :disabled="true" extra-classes="uk-form-small">
											</ScInput>
											<!-- Produktnamn -->
											<div class="uk-margin">
												<ScInput v-model="articleDetails.ProductName" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
													<label>Produktnamn</label>
												</ScInput>
											</div>
											<!-- Produktnamn - sv -->
											<div class="uk-margin">
												<ScInput v-model="articleDetails.ArticleNameList[0].ArticleName" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
													<label>Produktnamn - sv</label>
												</ScInput>
											</div>
											<!-- Produktnamn - no -->
											<div class="uk-margin">
												<ScInput v-model="articleDetails.ArticleNameList[1].ArticleName" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
													<label>Produktnamn - no</label>
												</ScInput>
											</div>
											<!-- Produktnamn - fi -->
											<div class="uk-margin">
												<ScInput v-model="articleDetails.ArticleNameList[3].ArticleName" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
													<label>Produktnamn - fi</label>
												</ScInput>
											</div>
											<!-- Artikelnummer -->
											<div class="uk-margin">
												<ScInput v-model="articleDetails.ArticleNumber" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
													<label>Artikelnummer</label>
												</ScInput>
											</div>
											<!-- Hyllplats -->
											<div class="uk-margin">
												<ScInput v-model="articleDetails.Shelf" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
													<label>Hyllplats</label>
												</ScInput>
											</div>
											<!-- Publiceringsdatum -->
											<div class="uk-margin">
												<ScInput v-model="articleDetails.PublishDate" v-flatpickr="{ 'locale': Swedish }" placeholder="Välj publiceringsdatum..." state="fixed" mode="outline" @input="updateArticleDetails()" extra-classes="uk-form-small">
													<label>Publiceringsdatum</label>
												</ScInput>
											</div>
											<!-- Lag -->
											<div class="uk-margin uk-width-1-1">
												<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
												<label class="select-label" for="select-team">Lag</label>
													<client-only>
														<Select2
															id="select-team"
															v-model="articleDetails.TeamId"
															:options="teamInfo"
															:settings="{ 'width': '100%', 'placeholder': 'Välj lag...', 'closeOnSelect': true }"
															@select="updateArticleDetails()"
														>
															<option v-if="isLoading = false" :value="articleDetails.TeamId">{{ teamInfo.find(x => x.id === articleDetails.TeamId).text }}</option>
														</Select2>
													</client-only>
												</div>
											</div>
											<!-- Varumärke -->
											<div class="uk-margin uk-width-1-1">
												<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
												<label class="select-label" for="select-brand">Varumärke</label>
													<client-only>
														<Select2
															id="select-brand"
															v-model="articleDetails.BrandId"
															:options="brandInfo"
															:settings="{ 'width': '100%', 'placeholder': 'Välj varumärke...', 'closeOnSelect': true }"
															@select="updateArticleDetails()"
														>
															<option v-if="isLoading = false" :value="articleDetails.BrandId">{{ brandInfo.find(x => x.id === articleDetails.BrandId).text }}</option>
														</Select2>
													</client-only>
												</div>
											</div>
											<!-- Material -->
											<div class="uk-margin uk-width-1-1">
												<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
												<label class="select-label" for="select-material">Material</label>
												<client-only>
													<Select2
														id="select-material"
														v-model="articleDetails.MaterialId"
														:options="materialInfo"
														:settings="{ 'width': '100%', 'placeholder': 'Välj material...', 'closeOnSelect': true }"
														@select="updateArticleDetails()"
													>
														<option v-if="isLoading = false" :value="articleDetails.MaterialId">{{ materialInfo.find(x => x.id === articleDetails.MaterialId).text }}</option>
													</Select2>
												</client-only>
												</div>
											</div>
											<!-- Produkttyp -->
											<div class="uk-margin uk-margin-remove-bottom uk-width-1-1">
												<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
												<label class="select-label" for="select-producttype">Produkttyp</label>
												<client-only>
													<Select2
														id="select-producttype"
														v-model="articleDetails.ProductTypeId"
														:options="productTypeInfo"
														:settings="{ 'width': '100%', 'placeholder': 'Välj produkttyp...', 'closeOnSelect': true }"
														@select="updateArticleDetails()"
													>
														<option v-if="isLoading = false" :value="articleDetails.ProductTypeId">{{ productTypeInfo.find(x => x.id === articleDetails.ProductTypeId).text }}</option>
													</Select2>
												</client-only>
												</div>
											</div>
											<!-- Färg(er) -->
											<div class="uk-margin-small-bottom uk-margin-small-top uk-width-1-1">
												<label class="uk-text-small">Färg(er)</label>
													<ul class="uk-list uk-column-1-3 uk-margin-remove-top" style="grid-column-gap: 0px; -moz-column-gap: 0px; column-gap: 0px;">
														<li v-for="color in articleDetails.ColorList" :key="color.ColorId" class="uk-text-small" style="padding: 3px 3px 3px 2px">
															<PrettyCheck v-model="color.IsSelected" class="p-icon" @change="updateArticleDetails()">
																<i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">{{ color.Description }}</span>
															</PrettyCheck>


														</li>
													</ul>
											</div>
											<!-- Kön -->
											<div class="uk-margin uk-width-1-1">
												<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
												<label class="select-label" for="select-gender">Kön</label>
												<client-only>
													<Select2
														id="select-gender"
														v-model="articleDetails.GenderId"
														:options="genderInfo"
														:settings="{ 'width': '100%', 'placeholder': 'Välj kön...', 'closeOnSelect': true }"
														@select="updateArticleDetails()"
													>
														<option v-if="isLoading = false" :value="articleDetails.GenderId">{{ genderInfo.find(x => x.id === articleDetails.GenderId).text }}</option>
													</Select2>
												</client-only>
												</div>
											</div>
											<!-- Storleksguide -->
											<div class="uk-margin uk-width-1-1">
												<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
												<label class="select-label" for="select-sizeguide">Storleksguide</label>
												<client-only>
													<Select2
														id="select-sizeguide"
														v-model="articleDetails.SizeGuideId"
														:options="sizeGuideInfo"
														:settings="{ 'width': '100%', 'placeholder': 'Välj storleksguide...', 'closeOnSelect': true }"
														@select="updateArticleDetails()"
													>
														<option v-if="isLoading = false" :value="articleDetails.SizeGuideId">{{ genderInfo.find(x => x.id === articleDetails.SizeGuideId).text }}</option>
													</Select2>
												</client-only>
												</div>
											</div>
											<!-- Tvättråd -->
											<div class="uk-margin uk-width-1-1">
												<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
												<label class="select-label" for="select-washingguide">Tvättråd</label>
												<client-only>
													<Select2
														id="select-washingguide"
														v-model="articleDetails.WashingId"
														:options="washingGuideInfo"
														:settings="{ 'width': '100%', 'placeholder': 'Välj tvättråd...', 'closeOnSelect': true }"
														@select="updateArticleDetails()"
													>
														<option v-if="isLoading = false" :value="articleDetails.WashingId">{{ genderInfo.find(x => x.id === articleDetails.WashingId).text }}</option>
													</Select2>
												</client-only>
												</div>
											</div>
											<!-- Tariffkod -->
											<div class="uk-margin uk-width-1-1">
												<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
												<label class="select-label" for="select-tariffs">Tariffkod</label>
												<client-only>
													<Select2
														id="select-tariffs"
														v-model="articleDetails.TariffId"
														:options="tariffsInfo"
														:settings="{ 'width': '100%', 'placeholder': 'Välj tariffkod...', 'closeOnSelect': true }"
														@select="updateArticleDetails()"
													>
														<option v-if="isLoading = false" :value="articleDetails.TariffId">{{ genderInfo.find(x => x.id === articleDetails.TariffId).text }}</option>
													</Select2>
												</client-only>
												</div>
											</div>
											<!-- Momstyp -->
											<div class="uk-margin uk-width-1-1">
												<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
												<label class="select-label" for="select-vattype">Momstyp</label>
												<client-only>
													<Select2
														id="select-vattype"
														v-model="articleDetails.VatTypeId"
														:options="vatTypeInfo"
														:settings="{ 'width': '100%', 'placeholder': 'Välj momstyp...', 'closeOnSelect': true }"
														@select="updateArticleDetails()"
													>
														<option v-if="isLoading = false" :value="articleDetails.VatTypeId">{{ genderInfo.find(x => x.id === articleDetails.VatTypeId).text }}</option>
													</Select2>
												</client-only>
												</div>
											</div>
											<!-- Ursprungsland -->
											<div class="uk-margin uk-width-1-1">
												<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
												<label class="select-label" for="select-landoforigin">Ursprungsland</label>
												<client-only>
													<Select2
														id="select-landoforigin"
														v-model="articleDetails.LandOfOriginId"
														:options="landOfOriginInfo"
														:settings="{ 'width': '100%', 'placeholder': 'Välj ursprungsland...', 'closeOnSelect': true }"
														@select="updateArticleDetails()"
													>
														<option v-if="isLoading = false" :value="articleDetails.LandOfOriginId">{{ genderInfo.find(x => x.id === articleDetails.LandOfOriginId).text }}</option>
													</Select2>
												</client-only>
												</div>
											</div>
											<!-- Vikt -->
											<div class="uk-margin">
												<ScInput v-model="articleDetails.Weight" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
													<label>Vikt</label>
												</ScInput>
											</div>
											<!-- Inköpspris -->
											<div class="uk-margin">
												<ScInput v-model="articleDetails.PurchasePrice" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
													<label>Inköpspris</label>
												</ScInput>
											</div>
											<!-- Medlemspaket -->
											<div class="uk-margin uk-margin-remove-bottom uk-width-1-1">
												<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
												<label class="select-label" for="select-membershippackage">Medlemspaket</label>
												<client-only>
													<Select2
														id="select-membershippackage"
														v-model="articleDetails.MemberPackageTypeId"
														:options="memberPackageInfo"
														:settings="{ 'width': '100%', 'placeholder': 'Välj medlemspaket...', 'closeOnSelect': true }"
														@select="updateArticleDetails()"
													>
														<option v-if="isLoading = false" :value="articleDetails.MemberPackageTypeId">{{ genderInfo.find(x => x.id === articleDetails.MemberPackageTypeId).text }}</option>
													</Select2>
												</client-only>
												</div>
											</div>
											<!-- Färdigt tryck -->
											<div class="uk-margin uk-width-1-1">
												<div class="">
													<ul class="uk-list uk-margin-remove-top">
														<li class="uk-text-small" style="padding: 3px 3px 3px 2px">
															<PrettyCheck v-model="articleDetails.ContainsPrint" class="p-icon" @change="updateArticleDetails()">
																<i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Färdigt tryck</span>
															</PrettyCheck>
														</li>
													</ul>
												</div>
											</div>
											<!-- Tryck -->
											<div class="uk-margin uk-margin-remove-bottom uk-width-1-1">
												<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
												<label class="select-label" for="select-print">Tryck</label>
												<client-only>
													<Select2
														id="select-print"
														v-model="articleDetails.PrintTypeId"
														:options="printTypeInfo"
														:settings="{ 'width': '100%', 'placeholder': 'Välj tryck...', 'closeOnSelect': true }"
														@select="updateArticleDetails()"
													>
														<option v-if="isLoading = false" :value="articleDetails.PrintTypeId">{{ genderInfo.find(x => x.id === articleDetails.PrintTypeId).text }}</option>
													</Select2>
												</client-only>
												</div>
											</div>
											<!-- Releasedate preorder -->
											<div class="uk-margin">
												<ScInput v-model="articleDetails.ReleaseDate" v-flatpickr="{ 'locale': Swedish }" placeholder="Välj releasedate preorder..." state="fixed" mode="outline" @input="updateArticleDetails()" extra-classes="uk-form-small">
													<label>Releasedate preorder</label>
												</ScInput>
											</div>


											</ScCardBody>
										</ScCardContent>

										<!-- {{ articleDetails.ContainsPrint }} -->

									</ScCard>
								</div>
								<div>
									<!-- Status -->
									<ScCard :full-screen="cardStatusFullScreen">
											<ScCardHeader separator>
													<div class="uk-flex uk-flex-middle">
														<div class="uk-flex-1">
															<ScCardTitle>
																Status
															</ScCardTitle>
														</div>
														<ScCardActions>
															<a
																href="javascript:void(0)"
																class="sc-actions-icon mdi mdi-fullscreen"
																:class="{'mdi-fullscreen' : !cardStatusFullScreen, 'mdi-fullscreen-exit' : cardStatusFullScreen }"
																@click.prevent="cardStatusFullScreen = !cardStatusFullScreen"
															></a>
														</ScCardActions>
													</div>
											</ScCardHeader>
										<ScCardContent>
											<ScCardBody>
											<!-- Supporters Place -->
												<div class="uk-margin uk-width-1-1">
													<div class="uk-width-1-1 uk-flex uk-flex-middle">
														<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
															<label class="select-label" for="select-status-supporters-place">Supporters Place</label>
															<client-only>
																	<Select2
																		id="select-status-supporters-place"
																		v-model="articleStatusList[0].StatusId"
																		:options="supportersPlaceArticleStatusList"
																		:settings="{ 'width': '100%', 'placeholder': 'Välj status...', 'closeOnSelect': true }"
																		@select="updateStatusId(0)"
																	>
																		<option v-if="isLoading = false" :value="articleStatusList[0].StatusId">{{ supportersPlaceArticleStatusList.find(x => x.id === articleStatusList[0].StatusId).text }}</option>
																	</Select2>
															</client-only>
														</div>
														<i v-if="articleStatusList[0].StatusId == 1" class="uk-margin-small-left mdi mdi mdi-checkbox-marked md-color-green-600 sc-icon-18"></i>
													</div>
												</div>
											<!-- Sam Dodds -->
												<div class="uk-margin uk-width-1-1">
													<div class="uk-width-1-1 uk-flex uk-flex-middle">
														<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
															<label class="select-label" for="select-status-sam-dodds">Sam Dodds</label>
															<client-only>
																<Select2
																	id="select-status-sam-dodds"
																	v-model="articleStatusList[1].StatusId"
																	:options="samDoddsArticleStatusList"
																	:settings="{ 'width': '100%', 'placeholder': 'Välj status...', 'closeOnSelect': true }"
																	@select="updateStatusId(1)"
																>
																	<option v-if="isLoading = false" :value="articleStatusList[1].StatusId">{{ samDoddsArticleStatusList.find(x => x.id === articleStatusList[1].StatusId).text }}</option>
																</Select2>
															</client-only>
														</div>
														<i v-if="articleStatusList[1].StatusId == 1" class="uk-margin-small-left mdi mdi mdi-checkbox-marked md-color-green-600 sc-icon-18"></i>
													</div>
												</div>
											<!-- KopShop -->
												<div class="uk-margin uk-width-1-1">
													<div class="uk-width-1-1 uk-flex uk-flex-middle">
														<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
															<label class="select-label" for="select-status-kop-shop">KopShop</label>
															<client-only>
																<Select2
																	id="select-status-kop-shop"
																	v-model="articleStatusList[2].StatusId"
																	:options="kopShopArticleStatusList"
																	:settings="{ 'width': '100%', 'placeholder': 'Välj status...', 'closeOnSelect': true }"
																	@select="updateStatusId(2)"
																>
																	<option v-if="isLoading = false" :value="articleStatusList[2].StatusId">{{ kopShopArticleStatusList.find(x => x.id === articleStatusList[2].StatusId).text }}</option>
																</Select2>
															</client-only>
														</div>
														<i v-if="articleStatusList[2].StatusId == 1" class="uk-margin-small-left mdi mdi mdi-checkbox-marked md-color-green-600 sc-icon-18"></i>
													</div>
												</div>
											<!-- Gameday -->
												<div class="uk-margin uk-width-1-1">
													<div class="uk-width-1-1 uk-flex uk-flex-middle">
														<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
															<label class="select-label" for="select-status-gameday">Gameday</label>
															<client-only>
																<Select2
																	id="select-status-gameday"
																	v-model="articleStatusList[3].StatusId"
																	:options="supporterPrylarArticleStatusList"
																	:settings="{ 'width': '100%', 'placeholder': 'Välj status...', 'closeOnSelect': true }"
																	@select="updateStatusId(3)"
																>
																	<option v-if="isLoading = false" :value="articleStatusList[3].StatusId">{{ supporterPrylarArticleStatusList.find(x => x.id === articleStatusList[3].StatusId).text }}</option>
																</Select2>
															</client-only>
														</div>
														<i v-if="articleStatusList[3].StatusId == 1" class="uk-margin-small-left mdi mdi mdi-checkbox-marked md-color-green-600 sc-icon-18"></i>
													</div>
												</div>
											<!-- Supporterprylar -->
												<div class="uk-margin uk-width-1-1">
													<div class="uk-width-1-1 uk-flex uk-flex-middle">
														<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
															<label class="select-label" for="select-status-supporterprylar">Supporterprylar</label>
															<client-only>
																<Select2
																	id="select-status-supporterprylar"
																	v-model="articleStatusList[4].StatusId"
																	:options="gameDayArticleStatusList"
																	:settings="{ 'width': '100%', 'placeholder': 'Välj status...', 'closeOnSelect': true }"
																	@select="updateStatusId(4)"
																>
																	<option v-if="isLoading = false" :value="articleStatusList[4].StatusId">{{ gameDayArticleStatusList.find(x => x.id === articleStatusList[4].StatusId).text }}</option>
																</Select2>
															</client-only>
														</div>
														<i v-if="articleStatusList[4].StatusId == 1" class="uk-margin-small-left mdi mdi mdi-checkbox-marked md-color-green-600 sc-icon-18"></i>
													</div>
												</div>
											</ScCardBody>
										</ScCardContent>
									</ScCard>
									<!-- Produktbilder -->
									<ScCard :full-screen="cardProduktbilderFullScreen" class="uk-margin-medium-top">
											<ScCardHeader separator>
													<div class="uk-flex uk-flex-middle">
														<div class="uk-flex-1">
															<ScCardTitle>
																Produktbilder
															</ScCardTitle>
														</div>
														<ScCardActions>
															<a
																href="javascript:void(0)"
																class="sc-actions-icon mdi mdi-fullscreen"
																:class="{'mdi-fullscreen' : !cardProduktbilderFullScreen, 'mdi-fullscreen-exit' : cardProduktbilderFullScreen }"
																@click.prevent="cardProduktbilderFullScreen = !cardProduktbilderFullScreen"
															></a>
														</ScCardActions>
													</div>
												</ScCardHeader>
										<ScCardContent>
											<ScCardBody>
												Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum unde accusantium, distinctio neque, quae aliquid architecto aliquam nemo in minus ratione quas nisi omnis asperiores eius enim. Error officia iusto, sunt maxime praesentium earum reiciendis nam repellendus eaque, iure doloribus alias eveniet beatae, consequuntur sit illum fugit nulla? Fuga deserunt voluptas, veritatis eveniet vel aperiam soluta possimus voluptatum commodi incidunt quod modi aliquid neque atque nam facere eaque laboriosam unde fugit quidem nisi tempora, consequuntur quibusdam earum. Dolore quod architecto, quidem nisi dolor quae eum ducimus ab magni? Assumenda fugiat cum voluptates, delectus eligendi recusandae labore ipsam modi sequi ullam.
											</ScCardBody>
										</ScCardContent>
									</ScCard>
								</div>
							</div>
						</li>
						<!-- Shop info -->
						<li>
						</li>
						<!-- Sortering -->
						<li>
							<div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
								<!-- SORTERING -->
								<div>
									<ScCard :full-screen="cardSorteringFullScreen">
										<ScCardHeader separator>
											<div class="uk-flex uk-flex-middle">
												<div class="uk-flex-1">
													<ScCardTitle>
														Sortering
													</ScCardTitle>
												</div>
												<ScCardActions>
													<a
														href="javascript:void(0)"
														class="sc-actions-icon mdi mdi-fullscreen"
														:class="{'mdi-fullscreen' : !cardSorteringFullScreen, 'mdi-fullscreen-exit' : cardSorteringFullScreen }"
														@click.prevent="cardSorteringFullScreen = !cardSorteringFullScreen"
													></a>
												</ScCardActions>
											</div>
										</ScCardHeader>
										<ScCardContent>
											<ScCardBody style="padding: 0px;">
												<VueGoodTable
													v-if="updateTheBloodyTable == true"
													:columns="columns_articleAssortment"
													:rows="articleAssortment"
													style-class="vgt-table"
													:row-style-class="rowStyleClassFn"
												>
													<template slot="table-row" slot-scope="props">
														<input  class="uk-input"
															v-if="props.column.field === 'SizeDisplay'" 
															v-on:blur="updateArticleAssortment(props.row)"
															v-model="props.row.SizeDisplay"
														>
														<span v-else-if="props.column.field === 'InitialAmount'">
															{{ props.row.InitialAmount }}
														</span>
														<span v-else-if="props.column.field === 'ItemsInStock'">
															{{ props.row.ItemsInStock }}
														</span>
														<input  class="uk-input"
															v-else-if="props.column.field === 'Correction'" 
															v-on:blur="updateArticleAssortment(props.row)"
															v-model="props.row.Correction"
														>
														<span v-else-if="props.column.field === 'WaitingForDelivery'">
															{{ props.row.WaitingForDelivery }}
														</span>
														<PrettyCheck v-else v-model="props.row.IsHidden" class="p-icon" @change="updateArticleAssortment(props.row)">
														<i slot="extra" class="icon mdi mdi-check"></i>
														</PrettyCheck>
													</template>
												</VueGoodTable>
											</ScCardBody>
										</ScCardContent>
									</ScCard>
								</div>
								<!-- LAGERHANTERING -->
								<div>
									<ScCard :full-screen="cardInventoryHandlingFullScreen">
										<ScCardHeader separator>
											<div class="uk-flex uk-flex-middle">
												<div class="uk-flex-1">
													<ScCardTitle>
														Lagerhantering
													</ScCardTitle>
												</div>
												<ScCardActions>
													<a
														href="javascript:void(0)"
														class="sc-actions-icon mdi mdi-fullscreen"
														:class="{'mdi-fullscreen' : !cardInventoryHandlingFullScreen, 'mdi-fullscreen-exit' : cardInventoryHandlingFullScreen }"
														@click.prevent="cardInventoryHandlingFullScreen = !cardInventoryHandlingFullScreen"
													></a>
												</ScCardActions>
											</div>
										</ScCardHeader>
										<ScCardContent>
											<ScCardBody>
												<!-- TAB-HEADLINES -->
												<ul data-uk-tab>
													<li>
														<a href="javascript:void(0)">
															Inleverans
														</a>
													</li>
													<li>
														<a href="javascript:void(0)">
															Historik
														</a>
													</li>
												</ul>
												<!-- TAB-CONTENT - Inleverans / Korrigering / Historik -->
												<ul class="uk-switcher">
													<li>
															Inleverans
													</li>
													<li>
															Historik
													</li>
												</ul>
											</ScCardBody>
										</ScCardContent>
									</ScCard>
								</div>
							</div>
						</li>
					</ul>
				</ScCardBody>
			</ScCard>
		</div>
    </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import ScInput from '~/components/Input'
import contentOverlay from '~/components/Overlay'
import PrettyCheck from 'pretty-checkbox-vue/check'
import { Swedish } from "flatpickr/dist/l10n/sv.js"

if(process.client) {
	require('~/plugins/flatpickr');
}

export default {
	components: {
		ScInput,
		VueGoodTable,
		contentOverlay,
		Select2: process.client ? () => import('~/components/Select2') : null,
		PrettyCheck,
	},
	data () {
		return {
			cardPrefsFullScreen: false,
			cardStatusFullScreen: false,
			cardProduktbilderFullScreen: false,
			cardSorteringFullScreen: false,
			cardInventoryHandlingFullScreen: false,
			articleDetails: [],
			teamInfo: [],
			brandInfo: [],
			materialInfo: [],
			productTypeInfo: [],
			genderInfo: [],
			sizeGuideInfo: [],
			washingGuideInfo: [],
			tariffsInfo: [],
			vatTypeInfo: [],
			landOfOriginInfo: [],
			memberPackageInfo: [],
			printTypeInfo: [],
			articleStatusList: [],
			supportersPlaceArticleStatusList: [],
			samDoddsArticleStatusList: [],
			kopShopArticleStatusList: [],
			supporterPrylarArticleStatusList: [],
			gameDayArticleStatusList: [],
			isLoading: true,
			Swedish,
			contentOverlayActive: false,
			rowObjectFromVueGoodTable: null,
			updateTheBloodyTable: true,
		}
	},
	watch: {
		articleAssortment(oldA, newA){

		}
	},
	computed: {
		...mapGetters({
			articleAssortment: 'articleAssortmentState'
		}),
		columns_articleAssortment () {
			return [
				{
					label: 'Beskrivning',
					field: 'SizeDisplay',
					sortable: false,
                    type: 'string',
                    thClass: 'uk-text-left vgt-assortment-th',
					tdClass: 'uk-text-nowrap uk-text-left',
                    width: '105px',
				},
				{
					label: 'Inköpta totalt',
					field: 'InitialAmount',
					sortable: false,
					type: 'number',
					thClass: 'uk-text-left vgt-assortment-th',
					tdClass: 'uk-text-left',
                    width: '60px',
				},
				{
					label: 'Lagersaldo',
					field: 'ItemsInStock',
					sortable: false,
					type: 'number',
					thClass: 'uk-text-left vgt-assortment-th',
					tdClass: 'uk-text-left',
                    width: '55px',
				},
				{
					label: 'Korrigering',
					field: 'Correction',
					sortable: false,
					type: 'number',
					thClass: 'uk-text-left vgt-assortment-th',                    tdClass: 'uk-text-left',
                    width: '55px',
				},
				{
					label: 'I orderlistan',
					field: 'WaitingForDelivery',
					sortable: false,
					type: 'number',
					thClass: 'uk-text-left vgt-assortment-th',
					tdClass: 'uk-text-left',
                    width: '55px',
				},
				{
					label: 'Dölj',
					field: 'IsHidden',
					sortable: false,
					type: 'boolean',
					thClass: 'uk-text-center vgt-assortment-th',
                    tdClass: 'uk-text-center ',
				},
			]
		},
	},
	methods: {
		rowStyleClassFn(row) {
    		return row.IsHidden ? 'dimmed' : '';
  		},
		async updateArticleDetails() {
			let _this = this
			_this.isLoading = true
			await this.$axios.$post('/webapi/Article/PostUpdateArticle', _this.articleDetails)
			.then(function (response) {
				if(response.Message !== ''){
					_this.showPageOverlaySpinner()
					_this.isLoading = false
				} else {

        		}
			})
			.catch(function (error) {
				console.log(error)
			})
		},
		async updateArticleAssortment(articleAssortmentRow) {
			let _this = this
			_this.isLoading = true
			await this.$axios.$post('/webapi/Article/PostUpdateArticleAssortment?articleId=' + this.$route.params.id, articleAssortmentRow)
			.then(function (response) {
				if(response.StockId !== ''){
					_this.showPageOverlaySpinner()
					_this.$store.commit('updateArticleAssortment', response)
					_this.updateTheBloodyTable = false
					setTimeout(() => {
						_this.updateTheBloodyTable = true
					}, 10);
					_this.isLoading = false
				}
			})
			.catch(function (error) {
				console.log(error)
			})
		},
		async updateStatusId(shop) {
			let _this = this
			_this.isLoading = true
			await this.$axios.$post('/webapi/Article/PostUpdateArticleStatus', _this.articleStatusList[shop])
			.then(function (response) {
				if(response.Message !== ''){
					_this.showPageOverlaySpinner()
					_this.isLoading = false
				} else {

        		}
			})
			.catch(function (error) {
				console.log(error)
			})
		},
		showPageOverlaySpinner () {
			this.$store.commit('togglePageOverlay', true)
			this.$store.commit('toggleProgressOverlay', true);
			setTimeout(() => {
				this.$store.commit('toggleProgressOverlay', false);
				setTimeout(() => {
					this.$store.commit('togglePageOverlay', false)
				})
			}, 500)
		},
	},
	async fetch () {
		try {
			const [articleDetails, teams, brands, materials, producttypes, genders, sizeguides, washingguides, tariffs, vattypes, landsoforigin, memberpackages, printtypes, articleStatusList, articleAssortment] = await Promise.all([
				this.$axios.$get('/webapi/Article/GetArticleDetails?articleId=' + this.$route.params.id),
				this.$axios.$get('/webapi/Metadata/GetTeamList'),
				this.$axios.$get('/webapi/Metadata/GetBrandList'),
				this.$axios.$get('/webapi/Metadata/GetMaterialList'),
				this.$axios.$get('/webapi/Metadata/GetProductTypeList'),
				this.$axios.$get('/webapi/Metadata/GetGenderList'),
				this.$axios.$get('/webapi/Metadata/GetSizeGuideList'),
				this.$axios.$get('/webapi/Metadata/GetWashingList'),
				this.$axios.$get('/webapi/Metadata/GetTariffList'),
				this.$axios.$get('/webapi/Metadata/GetVatTypeList'),
				this.$axios.$get('/webapi/Metadata/GetLandOfOriginList'),
				this.$axios.$get('/webapi/Metadata/GetMembershipPackageList'),
				this.$axios.$get('/webapi/Metadata/GetPrintTypeList'),
				this.$axios.$get('/webapi/Article/GetArticleStatusList?articleId=' + this.$route.params.id),
				this.$axios.$get('/webapi/Article/GetArticleAssortment?articleId=' + this.$route.params.id),
      		])
			this.articleDetails = articleDetails
			this.teamInfo = teams.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.brandInfo = brands.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.materialInfo = materials.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.productTypeInfo = producttypes.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.genderInfo = genders.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.sizeGuideInfo = sizeguides.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.washingGuideInfo = washingguides.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.tariffsInfo = tariffs.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.vatTypeInfo = vattypes.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.landOfOriginInfo = landsoforigin.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.memberPackageInfo = memberpackages.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.printTypeInfo = printtypes.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.articleStatusList = articleStatusList
			this.supportersPlaceArticleStatusList = articleStatusList[0].ArticleStatusList.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.samDoddsArticleStatusList = articleStatusList[1].ArticleStatusList.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.kopShopArticleStatusList = articleStatusList[2].ArticleStatusList.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.supporterPrylarArticleStatusList = articleStatusList[3].ArticleStatusList.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.gameDayArticleStatusList = articleStatusList[4].ArticleStatusList.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.$store.commit('setArticleAssortment', articleAssortment)
		} catch (err) {
      		console.log(err);
		}
    },
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
    table.vgt-table {
        font-size: 0.75rem;
    }
    table.vgt-table td {
        vertical-align: middle;
        border-right: 1px solid #dcdfe6;
        padding: .35em .65em .35em .65em;
    }
    .vgt-assortment-th {
        font-size: 0.6rem;
    }
	.uk-input {
		height: 30px;
		border-radius: 0;
		color: rgba(0, 0, 0, 0.87);
		background-color: #fff;
		padding: 8px 8px 7px;
		font-size: 0.75rem;
	}
	.dimmed {
		opacity: 0.2;
	}
</style>
