<template>
 	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
				<div class="uk-flex-1">
					<h1 class="sc-top-bar-title">Dashboard</h1>
				</div>
			</div>
		</div>
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
                    Välkommen {{ userDetails.Firstname }}!
				</ScCardBody>
			</ScCard>
		</div>
    </div>
</template>
<script>
export default {
	data () {
		return {
			userDetails: [],
		}
	},
	mounted () {
		this.loadUserDetails()
	},
	methods: {
		async loadUserDetails() {
			await this.$axios.$get('/webapi/admin/GetCurrentUser')
			.then(userDetails => {
				this.userDetails = userDetails
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