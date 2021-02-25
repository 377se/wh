<template>
 	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
				<div class="uk-flex-1">
					<h1 class="sc-top-bar-title">{{ this.products.ProductName }}</h1>
				</div>
			</div>
		</div>

		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
{{ products }}
				</ScCardBody>
			</ScCard>
		</div>
    </div>
</template>

<script>
export default {
	data () {
		return {
			products: [],
		}
	},
	mounted () {
		this.loadProducts()
	},
	methods: {
		async loadProducts() {
			await this.$axios.$get('/webapi/Article/GetArticleDetails?articleId=' + this.$route.params.id)
			.then(products => {
				this.products = products
				this.isLoading = false
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
	}
}
</script>

<style>

</style>