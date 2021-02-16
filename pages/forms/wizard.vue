<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-flex-center uk-grid" data-uk-grid>
				<div class="uk-width-4-5@l">
					<ScCard>
						<ScCardBody>
							<client-only>
								<FormWizard @on-complete="onComplete">
									<TabContent
										title="Billing"
										sub-title="Enter your billing information."
										:before-change="()=>validateStep('step1')"
									>
										<Step1 ref="step1" @on-validate="mergePartialModels"></Step1>
									</TabContent>
									<TabContent
										title="Payment"
										sub-title="Choose your payment method"
										icon="mdi mdi-credit-card"
										:before-change="()=>validateStep('step2')"
									>
										<Step2 ref="step2" @on-validate="mergePartialModels"></Step2>
									</TabContent>
									<TabContent
										title="Confirm Order"
										sub-title="Verify order details"
									>
										<Step3 :data="finalModel"></Step3>
									</TabContent>
								</FormWizard>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {FormWizard, TabContent } from '~/components/wizard'

export default {
	name: 'FormsWizard',
	components: {
		FormWizard,
		TabContent,
		Step1: process.client ? () => import('./wizard/step1') : null,
		Step2: process.client ? () => import('./wizard/step2') : null,
		Step3: process.client ? () => import('./wizard/step3') : null
	},
	data: () => ({
		finalModel: {
			paymentMethod: {}
		}
	}),
	computed: {

	},
	methods: {
		validateStep (name) {
			var refToValidate = this.$refs[name];
			return refToValidate.validate();
		},
		mergePartialModels (model, isValid){
			if(isValid){
				this.finalModel = Object.assign({}, this.finalModel, model)
			}
		},
		onComplete () {
			alert('Done!');
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/plugins/steps.scss';
</style>
