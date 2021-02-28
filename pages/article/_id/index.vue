<template>
<div v-if="this.isLoading == true">
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
						<ScInput v-model="articleDetails.PublishDate" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
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
									@change="updateArticleDetails()"
								>
								<option :value="articleDetails.TeamName">{{ articleDetails.TeamName }}</option>
								</Select2>
							</client-only>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
    </div>
</div>
</template>

<script>

import ScInput from '~/components/Input'
import contentOverlay from '~/components/Overlay'

export default {
	components: {
		ScInput,
		contentOverlay,
		Select2: process.client ? () => import('~/components/Select2') : null,
	},
	data () {
		return {
			articleDetails: [],
			teamInfo: [],
			isLoading: true,
		}
	},
	computed: {
	},
	mounted () {
		this.loadArticleDetails()
		this.loadTeamInfo()
	},
	methods: {
		async loadArticleDetails() {
			this.isLoading = true
			await this.$axios.$get('/webapi/Article/GetArticleDetails?articleId=' + this.$route.params.id)
			.then(articleDetails => {
				this.articleDetails = articleDetails
				this.isLoading = false
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
		async loadTeamInfo() {
			this.isLoading = true
			await this.$axios.$get('/webapi/Metadata/GetTeamList')
			.then(teams => {
				const parsedTeams = teams.map(({ Id, Name }) => ({ id: Id, text: Name }))
				this.teamInfo = parsedTeams
				this.isLoading = false
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
		async updateArticleDetails() {
			let _this = this
			await this.$axios.$post('/webapi/Article/PostUpdateArticle', _this.articleDetails)
			.then(function (response) {
				if(response.Message !== ''){
					_this.showPageOverlaySpinner()
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
		}
	}
}
</script>

<style>
</style>