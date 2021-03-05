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
					<h1 class="sc-top-bar-title">{{ this.articleDetails.ProductName }}</h1>
				</div>
			</div>
		</div>
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<h5 class="uk-heading-line"><span>Inställningar</span></h5>
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

				<!-- {{ articleDetails.ContainsPrint }} -->

			</ScCard>
		</div>
    </div>
</div>
</template>

<script>

import ScInput from '~/components/Input'
import contentOverlay from '~/components/Overlay'
import PrettyCheck from 'pretty-checkbox-vue/check';
import { Swedish } from "flatpickr/dist/l10n/sv.js"

if(process.client) {
	require('~/plugins/flatpickr');
}

export default {
	name: "ArticleDetails",
	components: {
		ScInput,
		contentOverlay,
		Select2: process.client ? () => import('~/components/Select2') : null,
		PrettyCheck,
	},
	computed: {
	},
	methods: {
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
		data () {
		return {
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
			isLoading: true,
			Swedish,
		}
	},
	async fetch () {
		try {
			const [articleDetails, teams, brands, materials, producttypes, genders, sizeguides, washingguides, tariffs, vattypes, landsoforigin, memberpackages, printtypes] = await Promise.all([
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
      		])
			this.articleDetails = articleDetails
			const parsedTeams = teams.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.teamInfo = parsedTeams
			const parsedBrands = brands.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.brandInfo = parsedBrands
			const parsedMaterials = materials.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.materialInfo = parsedMaterials
			const parsedProductTypes = producttypes.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.productTypeInfo = parsedProductTypes
			const parsedGenders = genders.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.genderInfo = parsedGenders
			const parsedSizeGuides = sizeguides.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.sizeGuideInfo = parsedSizeGuides
			const parsedWashingGuides = washingguides.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.washingGuideInfo = parsedWashingGuides
			const parsedTariffs = tariffs.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.tariffsInfo = parsedTariffs
			const parsedVatTypes = vattypes.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.vatTypeInfo = parsedVatTypes
			const parsedLandsOfOrigin = landsoforigin.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.landOfOriginInfo = parsedLandsOfOrigin
			const parsedMemberPackage = memberpackages.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.memberPackageInfo = parsedMemberPackage
			const parsedPrintTypes = printtypes.map(({ Id, Name }) => ({ id: Id, text: Name }))
			this.printTypeInfo = parsedPrintTypes
		} catch (err) {
      		console.log(err);
		}
    },
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
