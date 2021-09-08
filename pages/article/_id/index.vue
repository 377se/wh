<template>
<div v-if="$fetchState.pending">
	<div id="sc-page-wrapper">
	</div>
</div>
<div v-else>
 	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
				<div class="uk-flex-1">
					<img :src="this.articleDetails.ProductImage" alt="Produktbild" class="uk-margin-medium-right"><h1 class="sc-top-bar-title uk-display-inline">{{ this.articleDetails.ProductName }}</h1>
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
								GLOBAL INFO
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								SHOP INFO
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								SORTERING
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								FÖRSÄLJNINGSSTATISTIK
							</a>
						</li>
					</ul>
					<!-- TAB-CONTENT - ARTICLE DETAILS -->
					<ul class="uk-switcher">
						<!-- GLOBAL INFO -->
						<li class="uk-active">
							<div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
								<!-- Inställningar -->
								<div>
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
													<ScInput v-model="articleDetails.ProductName" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Produktnamn</label>
													</ScInput>
												</div>
												<!-- Produktnamn - sv -->
												<div class="uk-margin">
													<ScInput v-model="articleDetails.ArticleNameList[0].ArticleName" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Produktnamn - sv</label>
													</ScInput>
												</div>
												<!-- Produktnamn - no -->
												<div class="uk-margin">
													<ScInput v-model="articleDetails.ArticleNameList[1].ArticleName" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Produktnamn - no</label>
													</ScInput>
												</div>
												<!-- Produktnamn - fi -->
												<div class="uk-margin">
													<ScInput v-model="articleDetails.ArticleNameList[3].ArticleName" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Produktnamn - fi</label>
													</ScInput>
												</div>
												<!-- Artikelnummer -->
												<div class="uk-margin">
													<ScInput v-model="articleDetails.ArticleNumber" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Artikelnummer</label>
													</ScInput>
												</div>
												<!-- Hyllplats -->
												<div class="uk-margin">
													<ScInput v-model="articleDetails.Shelf" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Hyllplats</label>
													</ScInput>
												</div>
												<!-- Publiceringsdatum -->
												<div class="uk-margin">
													<ScInput v-model="articleDetails.PublishDate" v-flatpickr="{ 'locale': Swedish }" placeholder="Välj publiceringsdatum..." state="fixed" mode="outline" extra-classes="uk-form-small">
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
														>
															<option v-if="isLoading = false" :value="articleDetails.ProductTypeId">{{ productTypeInfo.find(x => x.id === articleDetails.ProductTypeId).text }}</option>
														</Select2>
													</client-only>
													</div>
												</div>
												<!-- Färg(er) -->
												<div class="uk-margin-small-bottom uk-margin-small-top uk-width-1-1 uk-height-auto">
													<label class="uk-text-small">Färg(er)</label>
														<div class="uk-column-1-3 uk-margin-remove-top">
															<div v-for="color in articleDetails.ColorList" :key="color.ColorId" class="uk-text-small" style="padding: 2px 0 0 0;">
																<PrettyCheck v-model="color.IsSelected" class="p-icon">
																	<i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">{{ color.Description }}</span>
																</PrettyCheck>


															</div>
														</div>
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
														>
															<option v-if="isLoading = false" :value="articleDetails.LandOfOriginId">{{ genderInfo.find(x => x.id === articleDetails.LandOfOriginId).text }}</option>
														</Select2>
													</client-only>
													</div>
												</div>
												<!-- Vikt -->
												<div class="uk-margin">
													<ScInput v-model="articleDetails.Weight" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Vikt</label>
													</ScInput>
												</div>
												<!-- Inköpspris -->
												<div class="uk-margin">
													<ScInput v-model="articleDetails.PurchasePrice" state="fixed" mode="outline"  extra-classes="uk-form-small">
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
																<PrettyCheck v-model="articleDetails.ContainsPrint" class="p-icon">
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
														>
															<option v-if="isLoading = false" :value="articleDetails.PrintTypeId">{{ genderInfo.find(x => x.id === articleDetails.PrintTypeId).text }}</option>
														</Select2>
													</client-only>
													</div>
												</div>
												<!-- Releasedate preorder -->
												<div class="uk-margin">
													<ScInput v-model="articleDetails.ReleaseDate" v-flatpickr="{ 'locale': Swedish }" placeholder="Välj releasedate preorder..." state="fixed" mode="outline" extra-classes="uk-form-small">
														<label>Releasedate preorder</label>
													</ScInput>
												</div>
												<div class="uk-flex">
													<button class="uk-button uk-button-primary" @click="updateArticleDetails">UPPDATERA</button>
													<button v-if="articleDetails.IsDeleteable" class="uk-button uk-button-primary" @click="deleteArticle">RADERA</button>
												</div>
											</ScCardBody>
										</ScCardContent>
									</ScCard>
								</div>
								<!-- Status -->
								<div>
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
												<div id="sortableImages" class="uk-flex uk-flex-wrap" data-uk-sortable>
													<div v-for="item in sortableOrder" :key="item.ImageId" class="uk-width-1-4 sc-round" :data-id="item.ImageId">
														<div class="sc-padding-small uk-position-relative">
															<div uk-lightbox><a :href="item.Url"><img :src="item.Name"></a></div>
															<div class="wasteBasket" @click="deleteImage(item)">
																<i class="mdi mdi-delete-forever md-color-red-600"></i>
															</div>
														</div>
													</div>
												</div>
												<div class="uk-padding-small">
													<FileUpload 
													:articleId="this.$route.params.id"
													@updateArticleImages="articleImages = $event"
													/>
												</div>
											</ScCardBody>
										</ScCardContent>
									</ScCard>
								</div>
							</div>
						</li>
						<!-- SHOP INFO -->
						<li>
							<!-- TAB-HEADLINES - SHOP INFO -->
							<ul data-uk-tab>
								<li v-for="shop in shopListByArticle" :key="shop.ShopId">
    								<a href="javascript:void(0)">
										<img :src="shop.ImageName" alt="shop-logo">
									</a>
  								</li>
							</ul>
							<!-- TAB-CONTENT - SHOP INFO -->
							<ul class="uk-switcher">
								<li v-for="shop in shopListByArticle" :key="shop.ShopId">
									<ShopInfo :shopId="parseInt(shop.ShopId)" :articleId="parseInt($route.params.id)"/>
  								</li>
							</ul>
						</li>
						<!-- SORTERING -->
						<li>
							<div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
								<!-- LAGERHANTERING -->
								<div>
									<ScCard :full-screen="cardSorteringFullScreen">
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
														:class="{'mdi-fullscreen' : !cardSorteringFullScreen, 'mdi-fullscreen-exit' : cardSorteringFullScreen }"
														@click.prevent="cardSorteringFullScreen = !cardSorteringFullScreen"
													></a>
												</ScCardActions>
											</div>
										</ScCardHeader>
										<ScCardContent>
											<ScCardBody :key="coolKeyUsedToRedoRender">
												<VueGoodTable
													v-if="updateTheBloodyTable == true"
													:columns="columns_articleAssortment"
													:rows="articleAssortmentAsChildren"
													style-class="vgt-table"
													:row-style-class="rowStyleClassFn"
													:group-options="{
														enabled: true,
														headerPosition: 'bottom',
													}"
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
														<input class="uk-input"
															v-else-if="props.column.field === 'Correction'"
															@keyup.tab="updateArticleAssortment(props.row)"
															@keyup.enter="updateArticleAssortment(props.row)"
															v-model="props.row.Correction"
														>
														<input class="uk-input"
															v-else-if="props.column.field === 'Delivery'"
															@keyup.tab="updateArticleAssortment(props.row)"
															@keyup.enter="updateArticleAssortment(props.row)"
															v-model="props.row.Delivery"
														>
														<span v-else-if="props.column.field === 'WaitingForDelivery'">
															{{ props.row.WaitingForDelivery }}
														</span>
														<PrettyCheck v-else v-model="props.row.IsHidden" class="p-icon" @change="updateArticleAssortment(props.row)">
														<i slot="extra" class="icon mdi mdi-check"></i>
														</PrettyCheck>
													</template>
												</VueGoodTable>
												<div class="uk-text-small uk-margin-medium-top">Inköpspris:</div>
												<div>
													<input class="uk-input uk-width-1-4" v-model="articleDetails.PurchasePrice" :placeholder="articleDetails.PurchasePrice">
												</div>
												<div class="uk-text-small uk-margin-medium-top">Använd TAB eller RETURN för att spara/uppdatera tabellen!</div>
											</ScCardBody>
										</ScCardContent>
									</ScCard>
								</div>
								<!-- HISTORIK -->
								<div>
									<ScCard :full-screen="cardInventoryHandlingFullScreen">
										<ScCardHeader separator>
											<div class="uk-flex uk-flex-middle">
												<div class="uk-flex-1">
													<ScCardTitle>
														Historik
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
												<div>
													<ScCard>
														<ScCardContent>
															<ScCardBody style="padding: 0px;">
																<VueGoodTable
																	v-if="updateTheBloodyTable == true"
																	:columns="columns_articleAssortmentHistory"
																	:rows="articleAssortmentHistory"
																	style-class="vgt-table"
																	:row-style-class="rowStyleClassFn"
																>
																	<template slot="table-row" slot-scope="props">
																		<span v-if="props.column.field === 'CreatedDate'">
																			{{ props.row.CreatedDate }}
																		</span>
																		<span v-else-if="props.column.field === 'Description'">
																			{{ props.row.Description }}
																		</span>
																		<span v-else-if="props.column.field === 'AdminName'">
																			{{ props.row.AdminName }}
																		</span>
																		<span v-else-if="props.column.field === 'SizeDisplay'">
																			{{ props.row.SizeDisplay }}
																		</span>
																		<span v-else-if="props.column.field === 'Items'">
																			{{ props.row.Items }}
																		</span>
																		<span v-else>
																			{{ props.row.PurchasePrice }}
																		</span>
																	</template>
																</VueGoodTable>
															</ScCardBody>
														</ScCardContent>
													</ScCard>
												</div>
											</ScCardBody>
										</ScCardContent>
									</ScCard>
								</div>
							</div>
						</li>
						<!-- FÖRSÄLJNINGSSTATISTIK -->
						<li>
							<div>
								<ScCard :full-screen="cardArticleSaleFullScreen">
									<ScCardHeader separator>
										<div class="uk-flex uk-flex-middle">
											<div class="uk-flex-1">
												<ScCardTitle>
													Försäljningsstatistik
												</ScCardTitle>
											</div>
											<ScCardActions>
												<a
													href="javascript:void(0)"
													class="sc-actions-icon mdi mdi-fullscreen"
													:class="{'mdi-fullscreen' : !cardArticleSaleFullScreen, 'mdi-fullscreen-exit' : cardArticleSaleFullScreen }"
													@click.prevent="cardArticleSaleFullScreen = !cardArticleSaleFullScreen"
												></a>
											</ScCardActions>
										</div>
									</ScCardHeader>
									<ScCardContent>
										<ScCardBody>
											<div>
												<ScCard>
													<ScCardContent>
														<ScCardBody style="padding: 0px;">
															<VueGoodTable
																:columns="columns_articleSale"
																:rows="articleSale"
																style-class="vgt-table"
																:row-style-class="rowStyleClassFn"
															>
																<template slot="table-row" slot-scope="props">
																	<span v-if="props.column.field === 'OrderDate'">
																		{{ props.row.OrderDate }}
																	</span>
																	<span v-else-if="props.column.field === 'Quantity'">
																		{{ props.row.Quantity }}
																	</span>
																	<span v-else-if="props.column.field === 'TotalSale'">
																		{{ props.row.TotalSale }}
																	</span>
																	<span v-else-if="props.column.field === 'PriceAverage'">
																		{{ props.row.PriceAverage }}
																	</span>
																	<span v-else>
																		{{ props.row.GrossMargin }}
																	</span>
																</template>
															</VueGoodTable>
														</ScCardBody>
													</ScCardContent>
												</ScCard>
											</div>
										</ScCardBody>
									</ScCardContent>
								</ScCard>
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
import ShopInfo from '~/components/ShopInfo'
import FileUpload from '~/components/FileUploadArticleImages'
import _ from 'lodash'


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
		ShopInfo,
		FileUpload,
	},
	data () {
		return {
			coolKeyUsedToRedoRender: 0,
			files: [],
			cardArticleSaleFullScreen: false,
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
			articleAssortmentHistory: [],
			shopListByArticle: [],
			articleImages: [],
			articleSale: [],
		}
	},
	watch: {
		articleAssortment(oldA, newA){

		}
	},
	mounted () {
		this.$nextTick(() => {
			const self = this;
			// save sortable order
			UIkit.util.on(document, 'stop', function (data) {

				let list = data.srcElement.children
				for (let i = 0; i < list.length; i++) {
					let item = self.articleImages.filter(obj => {
						return obj.ImageId == list[i].dataset.id
					})
					item[0].Sortorder = i
				}
				self.articleImages = self.sortableOrder
				self.updateImageSorting()
			})
		})
	},
	computed: {
		...mapGetters({
			articleAssortment: 'articleAssortmentState'
		}),
		sortableOrder () {
			return _.orderBy(this.articleImages, 'Sortorder')
		},
		articleAssortmentAsChildren () {
			return [
				{
          			SizeDisplay: 'Totalt',
         			InitialAmount: 0,
         			ItemsInStock: 0,
         			Correction: '',
         			WaitingForDelivery: '',
         			IsHidden: '',
          			children: this.articleAssortment,
				}
			]
		},
		columns_articleSale () {
			return [
				{
					label: 'Datum',
					field: 'OrderDate',
					sortable: false,
                    type: 'string',
                    thClass: 'uk-text-left vgt-assortment-th',
					tdClass: 'uk-text-nowrap uk-text-left',
                    width: '20%',
				},
				{
					label: 'Antal',
					field: 'Quantity',
					sortable: false,
					type: 'number',
					thClass: 'uk-text-right vgt-assortment-th',
					tdClass: 'uk-text-right',
                    width: '20%',
				},
				{
					label: 'Totalt',
					field: 'TotalSale',
					sortable: false,
					type: 'number',
					thClass: 'uk-text-right vgt-assortment-th',
					tdClass: 'uk-text-right',
                    width: '20%',
				},
				{
					label: 'Snittpris',
					field: 'PriceAverage',
					sortable: false,
					type: 'number',
					thClass: 'uk-text-right vgt-assortment-th',
                    tdClass: 'uk-text-right ',
                    width: '20%',
				},
				{
					label: 'Bruttomarginal',
					field: 'GrossMargin',
					sortable: false,
					type: 'number',
					thClass: 'uk-text-right vgt-assortment-th',
                    tdClass: 'uk-text-right ',
                    width: '20%',
				},
			]
		},
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
					label: 'Ink tot',
					field: 'InitialAmount',
					sortable: false,
					thClass: 'uk-text-left vgt-assortment-th',
					tdClass: 'uk-text-left',
                    width: '40px',
					headerField: this.sumInitialAmount,
					type: 'number',
				},
				{
					label: 'Lagersaldo',
					field: 'ItemsInStock',
					sortable: false,
					thClass: 'uk-text-left vgt-assortment-th',
					tdClass: 'uk-text-left',
                    width: '45px',
					headerField: this.sumItemsInStock,
					type: 'number',
				},
				{
					label: 'Korr',
					field: 'Correction',
					sortable: false,
					type: 'number',
					thClass: 'uk-text-left vgt-assortment-th',
					tdClass: 'uk-text-left',
                    width: '35px',
				},
				{
					label: 'Inlev',
					field: 'Delivery',
					sortable: false,
					type: 'number',
					thClass: 'uk-text-left vgt-assortment-th',
					tdClass: 'uk-text-left',
                    width: '35px',
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
		columns_articleAssortmentHistory () {
			return [
				{
					label: 'Tidpunkt',
					field: 'CreatedDate',
					sortable: false,
                    type: 'string',
                    thClass: 'uk-text-left vgt-assortment-th',
					tdClass: 'uk-text-nowrap uk-text-left',
                    width: '90px',
				},
				{
					label: 'Typ',
					field: 'Description',
					sortable: false,
					type: 'string',
					thClass: 'uk-text-left vgt-assortment-th',
					tdClass: 'uk-text-left',
                    width: '60px',
				},
				{
					label: 'Admin',
					field: 'AdminName',
					sortable: false,
					type: 'string',
					thClass: 'uk-text-left vgt-assortment-th',
					tdClass: 'uk-text-left',
                    width: '40px',
				},
				{
					label: 'Storlek',
					field: 'SizeDisplay',
					sortable: false,
					type: 'string',
					thClass: 'uk-text-left vgt-assortment-th',
					tdClass: 'uk-text-left',
                    width: '95px',
				},
				{
					label: 'Antal',
					field: 'Items',
					sortable: false,
					type: 'number',
					thClass: 'uk-text-left vgt-assortment-th',
					tdClass: 'uk-text-left',
                    width: '25px',
				},
				{
					label: 'Inköpspris',
					field: 'PurchasePrice',
					sortable: false,
					type: 'number',
					thClass: 'uk-text-center vgt-assortment-th',
                    tdClass: 'uk-text-center ',
                    width: '35px',
				},
			]
		},
	},
	methods: {
		sumInitialAmount(rowObj) {
    		let sum = 0
			for (let i = 0; i < rowObj.children.length; i++) {
				sum += rowObj.children[i].InitialAmount
			}
    		return sum
	    },
		sumItemsInStock(rowObj) {
    		let sum = 0
			for (let i = 0; i < rowObj.children.length; i++) {
				sum += rowObj.children[i].ItemsInStock
			}
    		return sum
	    },
		rowStyleClassFn(row) {
    		return row.IsHidden ? 'dimmed' : '';
  		},
		async updateArticleDetails() {
			let _this = this
			_this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/Article/PostUpdateArticle', _this.articleDetails)
			.then(function (response) {
				if(response.Message !== ''){
					_this.$store.dispatch('setBusyOn')
					_this.isLoading = false
					_this.$store.dispatch('setBusyOff')
				} else {
					_this.$store.dispatch('setBusyOff')
        		}
			})
			.catch(function (error) {
				console.log(error)
			})
		},
		async deleteArticle() {
			let _this = this
			_this.$store.dispatch('setBusyOn')
			await UIkit.modal.confirm('Vill du verkligen radera artikeln?', { labels: { ok: 'Yeah', cancel: 'Nope' } }).then(function () {
				_this.$store.dispatch('setBusyOn')
				 _this.$axios.$post('/webapi/Article/PostDeleteArticle', _this.articleDetails)
				.then(function (response) {
					if(response.Id == 1){
						_this.$store.dispatch('setBusyOff')
						UIkit.modal.alert('Denna artikel har nu raderats från sortimentet!').then(function() {
							_this.$router.push('/')
						})
					} else {
						console.log(error)
					}
				})
				.catch(function (error) {
					console.log(error)
				})
			}, function () {
				_this.$store.dispatch('setBusyOff')
			})
		},
		async updateImageSorting() {
			let _this = this
			_this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/Article/PostUpdateImageSorting', _this.articleImages)
			.then(function (response) {
				if(response.Message !== ''){
					_this.message = response.Message
					_this.$store.dispatch('setBusyOff')
				} else {
					_this.$store.dispatch('setBusyOff')
        		}
			})
			.catch(function (error) {
				console.log(error)
			})
		},
		async deleteImage(image) {
			let _this = this
			_this.$store.dispatch('setBusyOn')
			_this.isLoading = true
			await this.$axios.$post('/webapi/Article/PostDeleteImage?articleId=' + this.$route.params.id, image)
			.then(function (response) {
				if(response.Message !== ''){
					_this.articleImages = response
					_this.isLoading = false
					_this.$store.dispatch('setBusyOff')
				} else {
					_this.$store.dispatch('setBusyOff')
        		}
			})
			.catch(function (error) {
				console.log(error)
			})
		},
		async updateArticleAssortment(articleAssortmentRow) {
			let _this = this
			await this.$axios.$post('/webapi/Article/PostUpdateArticleAssortment?purchasePrice=' + this.articleDetails.PurchasePrice, articleAssortmentRow)
			.then(function (response) {
				if(response.StockId !== ''){
					_this.$store.dispatch('setBusyOn')
					_this.articleAssortmentHistory = response.History
					delete response.History
					_this.$store.commit('updateArticleAssortment', response)
					_this.forceRerenderOfAssortmentTable()
				}
			})
			.catch(function (error) {
				console.log(error)
			})
		},
		forceRerenderOfAssortmentTable() {
      		this.coolKeyUsedToRedoRender += 1
    	},
		async updateStatusId(shop) {
			let _this = this
			_this.isLoading = true
			await this.$axios.$post('/webapi/Article/PostUpdateArticleStatus', _this.articleStatusList[shop])
			.then(function (response) {
				if(response.Message !== ''){
					_this.$store.dispatch('setBusyOn')
					_this.isLoading = false
				} else {

        		}
			})
			.catch(function (error) {
				console.log(error)
			})
		},
},
	async fetch () {
		try {
			const [articleDetails, teams, brands, materials, producttypes, genders, sizeguides, washingguides, tariffs, vattypes, landsoforigin, memberpackages, printtypes, articleStatusList, articleAssortment, articleAssortmentHistory, shopListByArticle, articleImages, articleSale] = await Promise.all([
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
				this.$axios.$get('/webapi/Article/GetArticleAssortmentHistory?articleId=' + this.$route.params.id),
				this.$axios.$get('/webapi/Shop/GetShopListByArticle?articleId=' + this.$route.params.id),
				this.$axios.$get('/webapi/Article/GetArticleImages?articleId=' + this.$route.params.id),
				this.$axios.$get('/webapi/Article/GetArticleSale?articleId=' + this.$route.params.id),

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
			this.articleAssortmentHistory = articleAssortmentHistory
			this.shopListByArticle = shopListByArticle
			this.articleImages = articleImages
			this.articleSale = articleSale
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
	.vgt-table th.vgt-row-header {
        font-size: 0.7rem;
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
	.wasteBasket {
		position: absolute;
		background-color: #fff;
		cursor: pointer;
		border-radius: 10px;
		bottom: -3px;
		left: -3px;
		z-index: 1000;
	}
</style>
