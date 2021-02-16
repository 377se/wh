<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<form action="">
				<div class="uk-margin uk-grid" data-uk-grid>
					<div class="uk-width-1-2@l">
						<ScCard>
							<ScCardBody>
								<div class="uk-margin-medium">
									<p class="sc-text-semibold uk-margin-remove-top uk-margin-small-bottom">
										required / minLength: 3
									</p>
									<ScInput v-model="$v.firstName.$model" name="firstName" :error-state="$v.firstName.$error" :validator="$v.firstName">
										<label>First Name *</label>
									</ScInput>
									<ul class="sc-vue-errors">
										<li v-if="!$v.firstName.required">
											Field is required
										</li>
										<li v-if="!$v.firstName.minLength">
											First Name must have at least {{ $v.firstName.$params.minLength.min }} letters.
										</li>
									</ul>
								</div>
								<div class="uk-margin-medium">
									<p class="sc-text-semibold uk-margin-remove-top uk-margin-small-bottom">
										required / email
									</p>
									<ScInput v-model="$v.email.$model" name="email" :error-state="$v.email.$error" :validator="$v.email">
										<label>Email *</label>
									</ScInput>
									<ul class="sc-vue-errors">
										<li v-if="!$v.email.required">
											Field is required
										</li>
										<li v-if="!$v.email.email">
											This value should be a valid email
										</li>
									</ul>
								</div>
								<div class="uk-margin-medium">
									<p class="sc-text-semibold uk-margin-remove-top uk-margin-small-bottom">
										required / minLength: 6 / sameAs
									</p>
									<div>
										<ScInput v-model="$v.password.$model"
											name="password"
											type="password"
											:error-state="$v.password.$error"
											:validator="$v.password"
										>
											<label>Password *</label>
										</ScInput>
										<ul class="sc-vue-errors">
											<li v-if="!$v.password.required">
												Password is required.
											</li>
											<li v-if="!$v.password.minLength">
												Password must have at least {{ $v.password.$params.minLength.min }} characters.
											</li>
										</ul>
									</div>
									<div>
										<ScInput v-model="$v.repeatPassword.$model"
											name="repeatPassword"
											type="password"
											:error-state="$v.repeatPassword.$error"
											:validator="$v.repeatPassword"
										>
											<label>Repeat Password</label>
										</ScInput>
										<ul class="sc-vue-errors">
											<li v-if="!$v.repeatPassword.sameAsPassword">
												Passwords must be identical.
											</li>
										</ul>
									</div>
									<div class="uk-margin-medium">
										<p class="sc-text-semibold uk-margin-remove-top uk-margin-small-bottom">
											required
										</p>
										<ScTextarea v-model="$v.info.$model" name="info" :error-state="$v.info.$error" :validator="$v.info">
											<label>Info *</label>
										</ScTextarea>
										<ul class="sc-vue-errors">
											<li v-if="!$v.info.required">
												Field is required
											</li>
										</ul>
									</div>
								</div>
							</ScCardBody>
						</ScCard>
					</div>
					<div class="uk-width-1-2@l">
						<ScCard>
							<ScCardBody>
								<div class="uk-margin">
									<p class="sc-text-semibold uk-margin-remove-top uk-margin-small-bottom">
										required
									</p>
									<client-only>
										<Select2
											v-model="select2Users"
											:options="users"
											:settings="{ 'width': '100%', 'placeholder': 'Select user... *' }"
											:error-state="$v.select2Users.$error"
										></Select2>
									</client-only>
									<ul class="sc-vue-errors">
										<li v-if="!$v.select2Users.required">
											Field is required
										</li>
									</ul>
								</div>
								<div class="uk-margin">
									<div :class="{ 'vuelidate-wrapper-error': $v.checkboxes.$error }">
										<p class="sc-text-semibold uk-margin-remove-top">
											required / min: 2, max: 3
										</p>
										<div class="uk-child-width-1-5@m uk-grid" data-uk-grid>
											<div>
												<PrettyCheck v-model="checkboxes" :value="checkbox1" class="p-icon" name="checkboxes[]">
													<i slot="extra" class="icon mdi mdi-check"></i>
													Default 1
												</PrettyCheck>
											</div>
											<div>
												<PrettyCheck v-model="checkboxes" :value="checkbox2" class="p-icon" name="checkboxes[]">
													<i slot="extra" class="icon mdi mdi-check"></i>
													Default 2
												</PrettyCheck>
											</div>
											<div>
												<PrettyCheck v-model="checkboxes" :value="checkbox3" class="p-icon" name="checkboxes[]">
													<i slot="extra" class="icon mdi mdi-check"></i>
													Default 3
												</PrettyCheck>
											</div>
											<div>
												<PrettyCheck v-model="checkboxes" :value="checkbox4" class="p-icon" name="checkboxes[]">
													<i slot="extra" class="icon mdi mdi-check"></i>
													Default 4
												</PrettyCheck>
											</div>
										</div>
									</div>
									<ul class="sc-vue-errors sc-padding-remove-left">
										<li v-if="!$v.checkboxes.required">
											This value is required.
										</li>
										<li v-if="!$v.checkboxes.minMaxCheck">
											You must select min {{ $v.checkboxes.$params.minMaxCheck.min }} and max {{ $v.checkboxes.$params.minMaxCheck.max }} choices.
										</li>
									</ul>
								</div>
								<div class="uk-margin"></div>
							</ScCardBody>
						</ScCard>
					</div>
				</div>
				<button class="sc-button sc-button-primary" :disabled="submitStatus === 'PENDING'" @click="submitForm($event)">
					Validate
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

import customValidators from '~/plugins/vuelidateValidators'
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'
import PrettyCheck from 'pretty-checkbox-vue/check';

import { scFakeData } from '~/assets/js/utils'
const { name } = scFakeData;

export default {
	name: 'FormsValidation',
	components: {
		ScInput,
		ScTextarea,
		Select2: process.client ? () => import('~/components/Select2') : null,
		PrettyCheck
	},
	mixins: [validationMixin],
	data: () => ({
		submitStatus: null,
		firstName: '',
		email: '',
		password: '',
		repeatPassword: '',
		info: '',
		select2Users: '',
		checkboxes: [],
		checkbox1: 'cb1',
		checkbox2: 'cb2',
		checkbox3: 'cb3',
		checkbox4: 'cb4'
	}),
	computed: {
		users () {
			var users = [];
			for (let i = 1; i < 20; i++) {
				users.push({
					id: 'user-' + i,
					text: name()
				})
			}
			return users;
		}
	},
	validations: {
		firstName: {
			required,
			minLength: minLength(3)
		},
		email: {
			required,
			email
		},
		password: {
			required,
			minLength: minLength(6)
		},
		repeatPassword: {
			sameAsPassword: sameAs('password')
		},
		info: {
			required
		},
		select2Users: {
			required
		},
		checkboxes: {
			required,
			minMaxCheck: customValidators.minMaxCheck(2, 3)
		}
	},
	methods: {
		submitForm (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.submitStatus = 'ERROR'
			} else {
				this.submitStatus = 'PENDING';
				setTimeout(() => {
					this.submitStatus = 'OK'
				}, 500)
			}
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
