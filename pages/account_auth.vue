<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<div>
						Name: {{ this.userDetails.Firstname }}
					</div>
					<div class="uk-margin-small-top uk-margin-bottom">
						Email: {{ userDetails.Email }}
					</div>
					<a class="sc-button sc-button-default sc-button-outline" href="javascript:void(0)" @click="logout()">
						Logout
					</a>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
export default {
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
		async logout() {
			let _this = this
			await this.$axios.$post('/webapi/Logout/PostLogout')
			_this.$cookies.remove('wh-377')
			await this.$store.commit('setIsLoggedIn', false)
          	this.$router.push('/')
		},
	},
	data: () => ({
		userDetails: []
	})
}
</script>
