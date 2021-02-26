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
			<ScCard class="uk-width-1-2">

				<ScCardBody>

					<h5 class="uk-heading-line">
						<span>Inställningar</span>
					</h5>

					<div class="uk-margin">
						<div>
							<ScInput :value="this.articleDetails.ArticleId.toString()" :disabled="true" extra-classes="uk-form-small">
							</ScInput>
						</div>
					</div>

					<div class="uk-margin">
						<div>
							<ScInput v-model="articleDetails.ProductName" mode="outline" v-on:blur="updateArticleDetails(articleDetails)" extra-classes="uk-form-small">
								<label>Produktnamn</label>
							</ScInput>
						</div>
					</div>

					<div class="uk-margin">
						<div>
							<ScInput v-model="articleDetails.ArticleNameList[0].ArticleName" mode="outline" v-on:blur="updateArticleDetails(articleDetails)" extra-classes="uk-form-small">
								<label>Produktnamn -sv</label>
							</ScInput>
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
		contentOverlay
	},
	data () {
		return {
			articleDetails: [],
			isLoading: true
		}
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
		async updateArticleDetails(articleDetails) {
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