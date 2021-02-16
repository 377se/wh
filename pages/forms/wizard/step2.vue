<template>
	<div class="sc-padding">
		<div class="uk-grid" data-uk-grid>
			<div class="uk-width-1-3@s uk-width-1-4@m">
				<ul class="uk-list uk-list-condensed" :class="{'vuelidate-wrapper-error': $v.userData.paymentMethod.$error}">
					<li v-for="method in paymentMethods" :key="method.id">
						<PrettyRadio v-model="userData.paymentMethod.name" class="p-radio" name="paymentMethod" :value="method.name">
							<img v-for="icon in method.icons"
								:key="icon.id"
								:src="icon.src"
								alt=""
								width="64"
								height="40"
							>
						</PrettyRadio>
					</li>
				</ul>
				<ul class="sc-vue-errors">
					<li v-if="$v.userData.paymentMethod.$error">
						Choose payment method.
					</li>
				</ul>
			</div>
			<div class="uk-width-2-3@s uk-width-3-4@m more-info-section uk-flex uk-flex-middle">
				<div v-if="userData.paymentMethod.name === ''" class="uk-text-center uk-width-2-3">
					Choose payment method.
				</div>
				<div v-show="userData.paymentMethod.name === 'Credit Card'" class="uk-width-1-1">
					<div class="uk-margin">
						<div class="cc-validate-wrapper">
							<span class="cc-icon">
								<img :src="ccIcon" alt="" width="52" height="32">
							</span>
							<label class="uk-form-label" for="f-pay-cc-number">
								Credit card number
							</label>
							<input id="f-pay-cc-number"
								ref="ccValidateInput"
								v-model="userData.paymentMethod.ccNumber"
								class="uk-input"
								type="text"
							>
							<div class="uk-form-help-block">
								Examples: <a href="javascript:void(0)" @click.prevent="ccExampleFill($event,'4000 0000 0000 0002')">
									4000 0000 0000 0002
								</a> | <a href="javascript:void(0)" @click.prevent="ccExampleFill($event,'4026 0000 0000 0002')">
									4026 0000 0000 0002
								</a> | <a href="javascript:void(0)" @click.prevent="ccExampleFill($event,'501800000009')">
									501800000009
								</a> | <a href="javascript:void(0)" @click.prevent="ccExampleFill($event,'51000000 00000008')">
									51000000 00000008
								</a> | <a href="javascript:void(0)" @click.prevent="ccExampleFill($event,'6011-0000-0000-0004')">
									6011-0000-0000-0004
								</a>
							</div>
						</div>
					</div>
					<div class="uk-margin-large-top">
						<ScInput v-model="userData.paymentMethod.ccHolder" state="fixed" mode="outline">
							<label>Credit Card Holder Name</label>
						</ScInput>
					</div>
					<div class="uk-margin-large-top uk-child-width-1-4@l uk-child-width-1-2@m" data-uk-grid>
						<div>
							<ScInput v-model="userData.paymentMethod.ccDate" v-input-mask="{ 'alias': 'datetime', 'inputFormat': 'mm/yyyy', 'clearIncomplete': true }" state="fixed" mode="outline">
								<label>Validation date</label>
							</ScInput>
						</div>
						<div>
							<ScInput v-model="userData.paymentMethod.ccCVV" v-input-mask="{ 'mask': '999', 'clearIncomplete': true }" state="fixed" mode="outline">
								<label>CVV</label>
							</ScInput>
						</div>
					</div>
				</div>
				<div v-show="userData.paymentMethod.name === 'Paypal'" class="uk-width-2-3">
					<ScInput v-model="userData.paymentMethod.ppAccount" mode="outline">
						<label>Paypall Account</label>
					</ScInput>
				</div>
				<div v-show="userData.paymentMethod.name === 'Amazon'" class="uk-width-2-3">
					<ScInput v-model="userData.paymentMethod.amazonAccount" mode="outline">
						<label>Amazon Account</label>
					</ScInput>
				</div>
				<div v-show="userData.paymentMethod.name === 'Skrill'" class="uk-width-2-3">
					<ScInput v-model="userData.paymentMethod.skrillAccount" mode="outline">
						<label>Skrill Account</label>
					</ScInput>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import jQuery from '~/plugins/jquery'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import ScInput from '~/components/Input'
import PrettyRadio from 'pretty-checkbox-vue/radio';
if(process.client) {
	require('~/assets/js/vendor/jquery.creditCardValidator.js');
	require('~/plugins/inputmask');
}

export default {
	name: 'FormsWizardStep2',
	components: {
		PrettyRadio,
		ScInput
	},
	mixins: [validationMixin],
	data: () => ({
		userData: {
			paymentMethod: {
				name: '',
				ccNumber: '',
				ccType: ''
			}
		},
		paymentMethods: [
			{
				id: 1,
				name: 'Credit Card',
				icons: [
					{
						id: 1,
						src: require('~/assets/icons/payment-icons/color/visa.png')
					},
					{
						id: 2,
						src: require('~/assets/icons/payment-icons/color/mastercard.png')
					}
				]
			},
			{
				id: 2,
				name: 'Paypal',
				icons: [
					{
						id: 1,
						src: require('~/assets/icons/payment-icons/color/PayPal.png')
					}
				]
			},
			{
				id: 3,
				name: 'Amazon',
				icons: [
					{
						id: 1,
						src: require('~/assets/icons/payment-icons/color/Amazon.png')
					}
				]
			},
			{
				id: 4,
				name: 'Skrill',
				icons: [
					{
						id: 1,
						src: require('~/assets/icons/payment-icons/color/Skrill.png')
					}
				]
			}
		],
		ccIcon: require('~/assets/img/blank.gif')
	}),
	validations: {
		userData: {
			paymentMethod: {
				name: {
					required
				}
			}
		}
	},
	mounted () {
		const $el = $(this.$refs.ccValidateInput);
		const self = this;
		this.$nextTick(() => {
			$el.validateCreditCard(function (result) {
				if (result.valid) {
					if (result.card_type) {
						self.getCcIcon(result.card_type.name);
						self.userData.paymentMethod.ccType = result.card_type.name;
					}
				} else {
					self.getCcIcon(false);
				}
			});
		})
	},
	methods: {
		validate () {
			this.$v.userData.paymentMethod.$touch();
			var isValid = !this.$v.userData.paymentMethod.$invalid;
			this.$emit('on-validate', this.$data.userData, isValid);
			return isValid
		},
		// credit cards example numbers
		ccExampleFill (e, number) {
			e.preventDefault();
			$(this.$refs.ccValidateInput).val(number).trigger('input');
			this.userData.paymentMethod.ccNumber = number;
		},
		getCcIcon (name) {
			this.ccIcon = name ? require('~/assets/icons/payment-icons/color/' + name + '.png') : require('~/assets/img/blank.gif')
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
