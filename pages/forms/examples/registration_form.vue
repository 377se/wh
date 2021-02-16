<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-flex-center uk-grid" data-uk-grid>
				<div class="uk-width-3-5@l">
					<ScCard>
						<ScCardBody>
							<form>
								<fieldset class="uk-fieldset md-bg-grey-100 sc-padding">
									<p class="sc-text-semibold uk-text-large uk-margin-remove-top">
										Personal info
									</p>
									<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
										<div>
											<label class="uk-form-label" for="f-f-name">
												First Name
											</label>
											<div class="uk-form-controls">
												<ScInput id="f-f-name" v-model="userData.fName" mode="outline"></ScInput>
											</div>
										</div>
										<div>
											<label class="uk-form-label" for="f-l-name">
												Last Name
											</label>
											<div class="uk-form-controls">
												<ScInput id="f-l-name" v-model="userData.lName" mode="outline"></ScInput>
											</div>
										</div>
									</div>
									<div class="uk-child-width-1-2@m uk-flex uk-flex-top uk-margin-top uk-grid" data-uk-grid>
										<div>
											<label class="uk-form-label" for="f-birthdate">
												Date of Birth
											</label>
											<div class="uk-form-controls">
												<ScInput id="f-birthdate" v-model="userData.birthDate" mode="outline"></ScInput>
											</div>
										</div>
										<div>
											<label class="uk-form-label" for="f-l-name">
												Gender
											</label>
											<div class="uk-margin-small-top uk-margin-small-left">
												<span class="uk-margin-right">
													<PrettyRadio
														v-model="userData.gender"
														value="male"
														name="f-r-gender"
														class="p-radio"
													>
														Male
													</PrettyRadio>
												</span>
												<span>
													<PrettyRadio
														v-model="userData.gender"
														value="female"
														name="f-r-gender"
														class="p-radio"
													>
														Female
													</PrettyRadio>
												</span>
											</div>
										</div>
									</div>
								</fieldset>
								<fieldset class="uk-fieldset md-bg-grey-100 sc-padding uk-margin-top">
									<p class="sc-text-semibold uk-text-large uk-margin-remove-top">
										Login info
									</p>
									<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
										<div>
											<label class="uk-form-label" for="f-email">
												Email
											</label>
											<div class="uk-form-controls">
												<ScInput id="f-email" v-model="userData.email" v-input-mask="{ 'alias': 'email' }" mode="outline"></ScInput>
											</div>
										</div>
										<div>
											<label class="uk-form-label" for="f-re-email">
												Re-enter Email
											</label>
											<div class="uk-form-controls">
												<ScInput id="f-re-email" v-model="userData.reEmail" v-input-mask="{ 'alias': 'email' }" mode="outline"></ScInput>
											</div>
										</div>
									</div>
									<div class="uk-child-width-1-2@m uk-margin-top uk-grid" data-uk-grid>
										<div>
											<label class="uk-form-label" for="f-password">
												Password
											</label>
											<div class="uk-form-controls">
												<ScInput id="f-password" v-model="userData.password" type="password" mode="outline"></ScInput>
											</div>
										</div>
										<div>
											<label class="uk-form-label" for="f-re-password">
												Re-enter Password
											</label>
											<div class="uk-form-controls">
												<ScInput id="f-re-password" v-model="userData.rePassword" type="password" mode="outline"></ScInput>
											</div>
										</div>
									</div>
								</fieldset>
								<div class="uk-margin-top uk-flex uk-flex-middle">
									<PrettyCheck v-model="userData.terms" :value="false" class="p-icon">
										<i slot="extra" class="icon mdi mdi-check"></i>
										I agree to
										<a href="javascript:void(0)" data-uk-toggle="target: #sc-terms-modal">
											Terms of Use
										</a>
									</PrettyCheck>
									<div id="sc-terms-modal" class="uk-flex-top uk-modal" data-uk-modal>
										<div class="uk-modal-dialog uk-margin-auto-vertical">
											<div class="uk-modal-body">
												<h2 class="uk-modal-title">
													Terms and Conditions
												</h2>
												<button class="uk-modal-close-default" type="button" data-uk-close></button>
												<hr class="uk-margin-medium-bottom">
												<div>
													<h4 class="uk-margin-small">
														1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, repudiandae.
													</h4>
													<p class="uk-margin-remove">
														Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse, explicabo impedit non odit pariatur perspiciatis provident quis saepe vel vitae. A ad aliquam, aspernatur dignissimos doloremque eum fugiat magni mollitia nemo nesciunt quasi qui quis repellendus velit voluptate!
													</p>
													<h4 class="uk-margin-small uk-margin-large-top">
														2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, molestias.
													</h4>
													<p class="uk-margin-remove">
														Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque blanditiis dolorum expedita explicabo facere labore optio quaerat sequi sint! Alias, assumenda blanditiis dignissimos dolore eum ex fuga minima molestiae molestias nobis numquam placeat quos rem veritatis voluptatum? Porro, quidem.
													</p>
												</div>
											</div>
											<div class="uk-modal-footer uk-margin-top">
												<button class="sc-button sc-button-default sc-button-outline uk-modal-close" @click="userData.terms = true">
													I agree
												</button>
											</div>
										</div>
									</div>
								</div>
								<div class="uk-margin-top">
									<button class="sc-button sc-button-primary" type="button">
										Register
									</button>
								</div>
							</form>
							<pre class="uk-margin-top">{{ userData | json }}</pre>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ScInput from '~/components/Input'
import PrettyCheck from 'pretty-checkbox-vue/check';
import PrettyRadio from 'pretty-checkbox-vue/radio';
if(process.client) {
	require('~/plugins/inputmask')
}

export default {
	name: 'FormsExamplesRegistration',
	components: {
		ScInput,
		PrettyCheck,
		PrettyRadio
	},
	data: () => ({
		userData: {
			fName: '',
			lName: '',
			birthDate: '',
			gender: '',
			email: '',
			reEmail: '',
			password: '',
			rePassword: '',
			terms: false
		}
	})
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
