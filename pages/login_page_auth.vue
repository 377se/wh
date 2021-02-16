<template>
	<div class="uk-flex uk-flex-center uk-flex-middle sc-login-page-wrapper">
		<div class="uk-width-2-3@s uk-width-1-2@m uk-width-1-3@l uk-width-1-4@xl uk-margin-auto-vertical">
			<ScCard>
				<ScCardBody>
					<div class="sc-login-page-logo">
						<img v-rjs="require('~/assets/img/logo_alt@2x.png')" :src="appLogo" alt="">
					</div>
					<div class="sc-login-page-logo sc-login-page-logo-light">
						<img v-rjs="require('~/assets/img/logo_alt.png')" :src="appLogoLight" alt="">
					</div>
					<div id="sc-login-form" class="sc-toggle-login-register sc-toggle-login-password">
						<div class="sc-login-page-inner">
							<div class="uk-margin-medium">
								<ScInput v-model="loginData.email" name="email">
									<label>
										Email/Login
									</label>
								</ScInput>
							</div>
							<div class="uk-margin-medium">
								<ScInput v-model="loginData.password" type="password" name="password">
									<label>
										Password
									</label>
								</ScInput>
								<div class="uk-margin-small-top uk-text-small uk-text-right@s">
									<a href="javascript:void(0)" class="sc-link" data-uk-toggle="target: .sc-toggle-login-password; animation: uk-animation-scale-up">
										Forgot Password?
									</a>
								</div>
							</div>
							<ul v-if="authError" class="sc-vue-errors uk-display-block">
								<li>
									{{ authError }}
								</li>
							</ul>
							<div class="uk-margin-large-top">
								<a href="javascript:void(0)" class="sc-button sc-button-large sc-button-block sc-button-danger" @click.prevent="login()">
									Sign In
								</a>
								<div class="uk-child-width-1-3 uk-grid-medium uk-margin-medium-top uk-grid" data-uk-grid>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-social sc-button-facebook uk-width-1-1 uk-flex-center">
											<i class="mdi mdi-facebook"></i>
										</a>
									</div>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-social sc-button-twitter uk-width-1-1 uk-flex-center">
											<i class="mdi mdi-twitter"></i>
										</a>
									</div>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-social sc-button-linkedin uk-width-1-1 uk-flex-center">
											<i class="mdi mdi-linkedin"></i>
										</a>
									</div>
								</div>
								<div class="uk-margin-large-top uk-text-center">
									<span class="sc-color-secondary">
										Don't have an account?
									</span>
									<div>
										<a href="javascript:void(0)" class="sc-text-semibold" data-uk-toggle="target: .sc-toggle-login-register; animation: uk-animation-scale-up">
											Sign Up
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="sc-register-form" class="sc-toggle-login-register" hidden>
						<div class="sc-login-page-inner">
							<div class="uk-margin-medium">
								<ScInput v-model="registerData.name">
									<label>
										Name
									</label>
								</ScInput>
							</div>
							<div class="uk-margin-medium">
								<ScInput v-model="registerData.email">
									<label>
										Email
									</label>
								</ScInput>
							</div>
							<div class="uk-margin-medium">
								<ScInput v-model="registerData.password">
									<label>
										Password
									</label>
								</ScInput>
							</div>
							<div class="uk-margin-large-top">
								<button class="sc-button sc-button-large sc-button-block sc-button-secondary">
									Sign Up
								</button>
								<div class="uk-margin-large-top uk-flex uk-flex-middle uk-flex-center">
									<a href="javascript:void(0)" class="sc-text-semibold" data-uk-toggle="target: .sc-toggle-login-register; animation: uk-animation-scale-up">
										Back to login form
									</a>
								</div>
							</div>
						</div>
					</div>
					<div id="sc-password-form" class="sc-toggle-login-password" hidden>
						<div class="sc-login-page-inner">
							<div class="uk-margin-medium">
								Please enter your email address. You will receive a link to reset your password.
							</div>
							<div class="uk-margin-medium">
								<ScInput v-model="recoverPassEmail">
									<label>
										Email
									</label>
								</ScInput>
							</div>
							<div class="uk-margin-large-top">
								<button class="sc-button sc-button-large sc-button-block sc-button-primary">
									Reset Password
								</button>
								<div class="uk-margin-large-top uk-flex uk-flex-middle uk-flex-center">
									<a href="javascript:void(0)" class="sc-text-semibold" data-uk-toggle="target: .sc-toggle-login-password; animation: uk-animation-scale-up">
										Back to login form
									</a>
								</div>
							</div>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
import ScInput from '~/components/Input'

export default {
	name: 'LoginPage',
	components: {
		ScInput
	},
	layout: 'login_page',
	middleware ({ store, redirect }) {
		if (store.state.authenticated) {
			return redirect('/account')
		}
	},
	auth: 'guest',
	data: () => ({
		loginData: {
			email: '',
			password: ''
		},
		registerData: {
			name: '',
			email: '',
			password: ''
		},
		recoverPassEmail: '',
		authError: null
	}),
	head () {
		return {
			'title': 'Scutum Admin Login Page'
		}
	},
	computed: {
		appLogo () {
			return require('~/assets/img/logo_alt.png');
		},
		appLogoLight () {
			return require('~/assets/img/logo.png');
		}
	},
	mounted () {
		if (this.$auth.$state.loggedIn) {
			this.$router.push({
				path: '/'
			})
		}
	},
	methods: {
		async csrf () {
			const axios = await this.$axios.$get('/sanctum/csrf-cookie')
			return { axios }
		},
		async login () {
			this.authError = {}
			var data = {
				email: this.loginData.email,
				password: this.loginData.password
			}
			try {
				await this.$auth.loginWith('laravelSanctum', {
					data: data
				})
				// Redirect user after login
				this.$router.push({
					path: '/account'
				})
			} catch (err) {
				this.authError = err.response.data
				// console.log(err.response.data)
			}
		}
	}
}
</script>
