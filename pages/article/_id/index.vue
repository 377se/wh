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
					<div class="uk-margin">
						<ScInput v-model="articleDetails.ProductName" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
							<label>Produktnamn</label>
						</ScInput>
					</div>
					<div class="uk-margin">
						<ScInput v-model="articleDetails.ArticleNameList[0].ArticleName" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
							<label>Produktnamn - sv</label>
						</ScInput>
					</div>
					<div class="uk-margin">
						<ScInput v-model="articleDetails.ArticleNameList[1].ArticleName" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
							<label>Produktnamn - no</label>
						</ScInput>
					</div>
					<div class="uk-margin">
						<ScInput v-model="articleDetails.ArticleNameList[3].ArticleName" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
							<label>Produktnamn - fi</label>
						</ScInput>
					</div>
					<div class="uk-margin">
						<ScInput v-model="articleDetails.ArticleNumber" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
							<label>Artikelnummer</label>
						</ScInput>
					</div>
					<div class="uk-margin">
						<ScInput v-model="articleDetails.Shelf" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
							<label>Hyllplats</label>
						</ScInput>
					</div>
					<div class="uk-margin">
						<ScInput v-model="articleDetails.PublishDate" state="fixed" mode="outline" v-on:blur="updateArticleDetails()" extra-classes="uk-form-small">
							<label>Publiceringsdatum</label>
						</ScInput>
					</div>


					<div class="uk-margin uk-width-1-1">
						<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
						<label class="select-label" for="select-team">Lag</label>
						<client-only>
							<Select2
								id="select-team"
								v-model="articleDetails.TeamName"
								:options="teams"
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
{{ articleDetails }}
</div>
</template>

<script>

import ScInput from '~/components/Input'
import contentOverlay from '~/components/Overlay'

const teams = [
				{
					"TeamId": "1",
					"TeamName": "Behöver API"
				},
				{
					"TeamId": "2",
					"TeamName": "Behöver API"
				},
				{
					"TeamId": "3",
					"TeamName": "Behöver API"
				}
			]


export default {
	components: {
		ScInput,
		contentOverlay,
		Select2: process.client ? () => import('~/components/Select2') : null,
	},
	data () {
		return {
			articleDetails: [],
			isLoading: true,
		}
	},
	computed: {
		teams () {
			return teams.map(function (obj) {
				obj.id = obj.id || obj.TeamId;
				obj.text = obj.text || obj.TeamName;
				return obj;
			});
		},
	},
	mounted () {
		this.loadArticleDetails()
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