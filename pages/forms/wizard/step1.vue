<template>
	<div class="sc-border sc-round sc-padding md-bg-grey-50">
		<div class="uk-grid-medium uk-grid" data-uk-grid>
			<div class="uk-width-expand@l">
				<div class="sc-input-match-field" :class="{'vuelidate-wrapper-error': $v.userData.userTitle.$error}">
					<span class="uk-margin-right">
						<PrettyRadio v-model.trim="userData.userTitle" value="mr" class="p-radio" name="userTitle">
							Mr.
						</PrettyRadio>
					</span>
					<span>
						<PrettyRadio v-model.trim="userData.userTitle" value="mrs" class="p-radio" name="userTitle">
							Mrs.
						</PrettyRadio>
					</span>
				</div>
				<ul class="sc-vue-errors">
					<li v-if="!$v.userData.userTitle.required">
						Field is required
					</li>
				</ul>
			</div>
			<div class="uk-width-2-5@l uk-width-1-2@m">
				<ScInput v-model.trim="userData.firstName" name="userData.firstName" :error-state="$v.userData.firstName.$error" :validator="$v.userData.firstName">
					<label>First Name *</label>
				</ScInput>
				<ul class="sc-vue-errors">
					<li v-if="!$v.userData.firstName.required">
						Field is required
					</li>
					<li v-if="!$v.userData.firstName.minLength">
						First Name must have at least {{ $v.userData.firstName.$params.minLength.min }} letters.
					</li>
				</ul>
			</div>
			<div class="uk-width-2-5@l uk-width-1-2@m">
				<ScInput v-model.trim="userData.lastName" name="lastName" :error-state="$v.userData.lastName.$error" :validator="$v.userData.lastName">
					<label>last Name *</label>
				</ScInput>
				<ul class="sc-vue-errors">
					<li v-if="!$v.userData.lastName.required">
						Field is required
					</li>
				</ul>
			</div>
		</div>
		<div class="uk-child-width-1-2@s uk-margin uk-grid" data-uk-grid>
			<div>
				<ScInput v-model.trim="userData.email" name="email" :error-state="$v.userData.email.$error" :validator="$v.userData.email">
					<label>Email *</label>
				</ScInput>
				<ul class="sc-vue-errors">
					<li v-if="!$v.userData.email.required">
						Field is required
					</li>
					<li v-if="!$v.userData.email.email">
						This value should be a valid email
					</li>
				</ul>
			</div>
			<div>
				<ScInput v-model.trim="userData.phoneNumber">
					<label>Phone Number</label>
				</ScInput>
			</div>
		</div>
		<div class="uk-margin uk-grid" data-uk-grid>
			<div class="uk-width-expand@s">
				<ScInput v-model.trim="userData.company">
					<label>Company</label>
				</ScInput>
			</div>
			<div class="uk-width-2-5@s sc-bor">
				<ScInput v-model.trim="userData.companyID">
					<label>Company ID</label>
				</ScInput>
			</div>
		</div>
		<hr>
		<div>
			<div v-for="(item, index) in userData.addresses" :key="item.id" class="sc-form-section" :class="{'uk-margin-medium-top sc-border-top sc-padding-medium-top' : index > 0}">
				<div class="uk-grid-match" data-uk-grid>
					<div class="uk-width-expand@m">
						<div class="uk-margin uk-grid" data-uk-grid>
							<div class="uk-width-expand@m">
								<ScInput v-model.trim="item.billingAddress">
									<label>Billing Address</label>
								</ScInput>
							</div>
							<div class="uk-width-1-4@m">
								<ScInput v-model.trim="item.zipCode">
									<label>Postal/Zip-Code</label>
								</ScInput>
							</div>
						</div>
						<div class="uk-margin-top-remove uk-child-width-1-2@m uk-grid" data-uk-grid>
							<div>
								<label class="uk-form-label" :for="'wiz-address-city_' + item.id">
									City
								</label>
								<div class="uk-form-controls">
									<client-only>
										<Select2
											:id="'wiz-address-city_' + item.id"
											v-model="item.city"
											:options="usCities"
											:settings="{ 'width': '100%', 'placeholder': 'Select a city...' }"
										></Select2>
									</client-only>
								</div>
							</div>
							<div>
								<label class="uk-form-label" :for="'wiz-address-country_' + item.id">
									Country
								</label>
								<div class="uk-form-controls">
									<client-only>
										<Select2
											:id="'wiz-address-country_' + item.id"
											v-model="item.country"
											:options="countries"
											:settings="{ 'width': '100%', 'placeholder': 'Select a country...' }"
										></Select2>
									</client-only>
								</div>
							</div>
						</div>
					</div>
					<div class="uk-width-auto@m uk-flex-middle">
						<a v-if="userData.addresses.length === (index + 1)" href="javascript:void(0)" class="sc-color-primary" @click="addAddress($event)">
							<i class="mdi mdi-plus-box-outline sc-icon-24"></i>
						</a>
						<a v-if="userData.addresses.length !== (index + 1)" href="javascript:void(0)" class="sc-color-primary" @click="removeAddress($event,item.id)">
							<i class="mdi mdi-minus-box-outline sc-icon-24"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

const countries = require('~/data/common/countries.json');
const usCities = require('~/data/common/us_cities.json');

import ScInput from '~/components/Input'
import PrettyRadio from 'pretty-checkbox-vue/radio';
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
import customValidators from '~/plugins/vuelidateValidators'

if(process.client) {
	require('~/plugins/inputmask')
}

export default {
	name: 'FormsWizardStep1',
	components: {
		PrettyRadio,
		ScInput,
		Select2: process.client ? () => import('~/components/Select2') : null
	},
	mixins: [validationMixin],
	data: () => ({
		userData: {
			userTitle: '',
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			company: '',
			companyID: '',
			addresses: [
				{
					id: uniqueID(10),
					billingAddress: '',
					zipCode: '',
					city: '',
					country: '',
				}
			]
		}
	}),
	computed: {
		countries () {
			return countries.map(function (obj) {
				obj.id = obj.id || obj.code;
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
	validations: {
		userData: {
			userTitle: {
				required
			},
			firstName: {
				required,
				minLength: minLength(3)
			},
			lastName: {
				required
			},
			email: {
				required,
				email
			}
		}
	},
	methods: {
		validate () {
			this.$v.userData.$touch();
			var isValid = !this.$v.userData.$invalid;
			this.$emit('on-validate', this.$data.userData, isValid);
			return isValid
		},
		addAddress (e) {
			e.preventDefault();
			this.userData.addresses.push({
				id: uniqueID(10),
				billingAddress: '',
				zipCode: '',
				city: '',
				country: '',
			});
		},
		removeAddress (e, id) {
			e.preventDefault();
			var index = this.userData.addresses.map(function (item) {
				return item.id
			}).indexOf(id);
			this.userData.addresses.splice(index, 1);
		},
	}
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
