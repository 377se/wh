<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-flex-center uk-grid" data-uk-grid>
				<div class="uk-width-2-3@l">
					<div class="uk-flex uk-flex-middle uk-margin-bottom md-bg-blue-grey-600 sc-round sc-padding sc-padding-medium-ends">
						<span data-uk-icon="icon: cart; ratio: 1.5" class="uk-margin-right md-color-white uk-icon"></span>
						<h4 class="md-color-white uk-margin-remove">
							Checkout Form
						</h4>
					</div>
					<form>
						<fieldset class="uk-fieldset uk-fieldset-alt md-bg-white sc-padding-medium">
							<legend class="uk-legend">
								Billing Details
							</legend>
							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<ScInput v-model="userData.fName">
										<label>First Name</label>
									</ScInput>
								</div>
								<div>
									<ScInput v-model="userData.lName">
										<label>Last Name</label>
									</ScInput>
								</div>
								<div>
									<ScInput v-model="userData.email" v-input-mask="{ 'alias': 'email' }">
										<label>Email</label>
									</ScInput>
								</div>
								<div>
									<ScInput v-model="userData.phone">
										<label>Phone Number</label>
									</ScInput>
								</div>
							</div>
							<div class="uk-grid" data-uk-grid>
								<div class="uk-width-expand@m">
									<ScInput v-model="userData.company">
										<label>Company</label>
									</ScInput>
								</div>
								<div class="uk-width-1-3@m">
									<ScInput v-model="userData.comapnyID">
										<label>Company ID</label>
									</ScInput>
								</div>
							</div>
							<div class="uk-grid" data-uk-grid>
								<div class="uk-width-expand@m">
									<ScInput v-model="userData.billingAddress">
										<label>Billing Address</label>
									</ScInput>
								</div>
								<div class="uk-width-1-3@m">
									<ScInput v-model="userData.zipCode">
										<label>Postal/Zip-Code</label>
									</ScInput>
								</div>
							</div>
							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<label class="uk-form-label">
										City
									</label>
									<div class="uk-form-controls">
										<client-only>
											<Select2
												v-model="userData.select2.city"
												:options="usCities"
												:settings="{ 'width': '100%', 'placeholder': 'Select a city...', allowClear: true }"
											></Select2>
										</client-only>
									</div>
								</div>
								<div>
									<label class="uk-form-label">
										Country
									</label>
									<div class="uk-form-controls">
										<client-only>
											<Select2
												v-model="userData.select2.country"
												:options="countries"
												:settings="{ 'width': '100%', 'placeholder': 'Select a country...', allowClear: true }"
											></Select2>
										</client-only>
									</div>
								</div>
							</div>
						</fieldset>
						<fieldset class="uk-fieldset uk-fieldset-alt md-bg-white">
							<legend class="uk-legend">
								Payment Details
							</legend>
							<div class="uk-grid-small uk-grid" data-uk-grid>
								<div class="uk-width-1-3@s uk-width-1-4@m">
									<ul class="uk-list uk-list-condensed">
										<li v-for="method in paymentMethods" :key="method.id">
											<PrettyRadio v-model="userData.paymentMethod.name" class="p-radio" name="paymentMethods" :value="method.name">
												<img v-for="(icon, index) in method.icons"
													:key="icon.id"
													:src="icon.src"
													alt=""
													width="64"
													height="40"
													:class="{'uk-margin-mini-left': index !== 0}"
												>
											</PrettyRadio>
										</li>
									</ul>
								</div>
								<div class="uk-width-2-3@s uk-width-3-4@m more-info-section">
									<div v-if="userData.paymentMethod.name === 'CC'">
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
													</a> | <a href="javascript:void(0)" @click.prevent="ccExampleFill($event,'5018 0000 0009')">
														5018 0000 0009
													</a> | <a href="javascript:void(0)" @click.prevent="ccExampleFill($event,'5100 0000 0000 0008')">
														5100 0000 0000 0008
													</a> | <a href="javascript:void(0)" @click.prevent="ccExampleFill($event,'6011 0000 0000 0004')">
														6011 0000 0000 0004
													</a>
												</div>
											</div>
										</div>
										<div class="uk-margin-large-top">
											<ScInput v-model="userData.paymentMethod.ccHolder" state="fixed" mode="outline">
												<label>Credit Card Holder Name</label>
											</ScInput>
										</div>
										<div class="uk-margin-large-top uk-child-width-1-4@m uk-grid" data-uk-grid>
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
									<div v-if="userData.paymentMethod.name === 'Paypal'">
										<ScInput v-model="userData.paymentMethod.ppAccount" mode="outline">
											<label>Paypall Account</label>
										</ScInput>
									</div>
									<div v-if="userData.paymentMethod.name === 'Amazon'">
										<ScInput v-model="userData.paymentMethod.amazonAccount" mode="outline">
											<label>Amazon Account</label>
										</ScInput>
									</div>
									<div v-if="userData.paymentMethod.name === 'Skrill'">
										<ScInput v-model="userData.paymentMethod.skrillAccount" mode="outline">
											<label>Skrill Account</label>
										</ScInput>
									</div>
								</div>
							</div>
						</fieldset>
						<fieldset class="uk-fieldset uk-fieldset-alt md-bg-white">
							<legend class="uk-legend">
								Order info
							</legend>
							<div class="uk-width-1-1">
								<div class="uk-overflow-auto">
									<table class="uk-table uk-table-striped uk-table-small uk-table-middle">
										<thead>
											<tr>
												<th class="uk-table-shrink"></th>
												<th>Product Name</th>
												<th class="uk-table-shrink">
													Quantity
												</th>
												<th class="uk-table-shrink uk-text-center">
													Price
												</th>
												<th class="uk-table-shrink uk-text-center">
													Total
												</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>1.</td>
												<td class="uk-text-nowrap">
													<a href="javascript:void(0)">
														Product A
													</a>
													<p class="sc-color-secondary uk-margin-remove">
														Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, qui?
													</p>
												</td>
												<td class="uk-text-center">
													4
												</td>
												<td class="uk-text-right">
													$72.99
												</td>
												<td class="uk-text-right">
													$291.96
												</td>
											</tr>
											<tr>
												<td>2.</td>
												<td>
													<a href="javascript:void(0)">
														Product B
													</a>
													<p class="sc-color-secondary uk-margin-remove">
														Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam culpa quas.
													</p>
												</td>
												<td class="uk-text-center">
													2
												</td>
												<td class="uk-text-right">
													$43.27
												</td>
												<td class="uk-text-right">
													$86.54
												</td>
											</tr>
											<tr>
												<td>3.</td>
												<td>
													<a href="javascript:void(0)">
														Product C
													</a>
													<p class="sc-color-secondary uk-margin-remove">
														Lorem ipsum dolor sit amet, consectetur adipisicing elit.
													</p>
												</td>
												<td class="uk-text-center">
													7
												</td>
												<td class="uk-text-right">
													$120.00
												</td>
												<td class="uk-text-right">
													$840.00
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</fieldset>
						<fieldset class="uk-fieldset uk-fieldset-alt md-bg-white">
							<legend class="uk-legend">
								Message to the seller
							</legend>
							<ScTextarea v-model="userData.info" mode="outline" placeholder="Write here additional requests..."></ScTextarea>
						</fieldset>
						<div class="uk-margin-large-top">
							<button type="button" class="sc-button sc-button-primary sc-button-large">
								Confirm
							</button>
							<button type="button" class="sc-button sc-button-default sc-button-large sc-button-flat">
								Cancel
							</button>
						</div>
						<hr>
						<pre>{{ userData | json }}</pre>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import jQuery from '~/plugins/jquery'
const countries = require('~/data/common/countries.json');
const usStates = require('~/data/common/us_states.json');
const usCities = require('~/data/common/us_cities.json');
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'
import PrettyRadio from 'pretty-checkbox-vue/radio';
if(process.client) {
	require('~/plugins/inputmask');
	require('~/assets/js/vendor/jquery.creditCardValidator.js');
}

export default {
	name: 'FormsExamplesCheckout',
	components: {
		Select2: process.client ? () => import('~/components/Select2') : null,
		ScInput,
		ScTextarea,
		PrettyRadio
	},
	data: () => ({
		userData: {
			fName: '',
			lName: '',
			email: '',
			phone: '',
			company: '',
			companyID: '',
			info: '',
			paymentMethod: {
				name: 'CC',
				ccNumber: '',
				ccHolder: '',
				ccDate: '',
				ccCVV: '',
				ppAccount: '',
				amazonAccount: '',
				skrillAccount: ''
			},
			select2: {
				country: '',
				city: '',
				state: ''
			}
		},
		paymentMethods: [
			{
				id: 1,
				name: 'CC',
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
	computed: {
		countries () {
			return countries.map(function (obj) {
				obj.id = obj.id || obj.code;
				obj.text = obj.text || obj.name;
				return obj;
			});
		},
		usStates () {
			return usStates.map(function (obj) {
				obj.id = obj.id || obj.val;
				obj.text = obj.text || obj.name;
				return obj;
			});
		},
		usCities () {
			return usCities.map(function (obj) {
				obj.id = obj.id || obj.rank;
				obj.text = obj.text || obj.city;
				return obj;
			});
		}
	},
	mounted () {
		const self = this;
		const $el = $(this.$refs.ccValidateInput);
		$el.validateCreditCard(function (result) {
			if (result.valid) {
				if (result.card_type) {
					self.getCcIcon(result.card_type.name);
				}
			} else {
				self.getCcIcon(false);
			}
		});
	},
	methods: {
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
