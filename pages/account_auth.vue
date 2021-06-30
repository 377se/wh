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
			await _this.$axios.$post('/webapi/Logout/PostLogout')
			.then(res => {
				_this.$store.commit('setIsLoggedIn', false)
				_this.$cookies.remove('wh-377')
				_this.$router.push('/')
			})
			.catch(function (error) {
				console.log(error)
			})
		},
	},
	data: () => ({
		userDetails: []
	})
}
</script>
