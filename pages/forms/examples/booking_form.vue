<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-flex-center uk-grid" data-uk-grid>
				<div class="uk-width-2-3@l">
					<ScCard>
						<ScCardHeader>
							<div class="uk-flex uk-flex-middle">
								<i class="mdi mdi-calendar sc-icon-24 uk-margin-medium-right"></i>
								<ScCardTitle>
									Booking Form
								</ScCardTitle>
							</div>
						</ScCardHeader>
						<ScCardBody>
							<form id="sc-booking-form">
								<h4 class="uk-heading-line uk-margin-medium-bottom">
									<span>Arrival/Departure Date</span>
								</h4>
								<client-only>
									<DateRangePicker :config="drpConfig">
										<div id="drp-arival-departure-container" class="date-picker-custom no-top-bar no-padding large-picker uk-margin-medium-bottom"></div>
									</DateRangePicker>
								</client-only>
								<div id="drp-arival-departure" class="uk-child-width-1-3@l uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<ScInput id="drp-arival" v-model="userData.arivalDate" :read-only="true">
											<label>Arrival Date</label>
										</ScInput>
									</div>
									<div>
										<ScInput id="drp-departure" v-model="userData.departureDate" :read-only="true">
											<label>Departure Date</label>
										</ScInput>
									</div>
								</div>

								<h4 class="uk-heading-line uk-margin-xlarge-top uk-margin-medium-bottom">
									<span>Personal Informations</span>
								</h4>
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
								</div>
								<div class="uk-child-width-1-2@m uk-margin-top uk-grid" data-uk-grid>
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
								<h4 class="uk-heading-line uk-margin-xlarge-top uk-margin-medium-bottom">
									<span>Address</span>
								</h4>
								<div class="uk-margin">
									<ScInput v-model="userData.addressLine1">
										<label>Street Address</label>
									</ScInput>
								</div>
								<div class="uk-margin">
									<ScInput v-model="userData.addressLine2">
										<label>Street Address</label>
									</ScInput>
									<span class="uk-form-help-block">
										Line 2
									</span>
								</div>
								<div class="uk-margin uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
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
										<div class="uk-form-controls">
											<client-only>
												<Select2
													v-model="userData.select2.state"
													:options="usStates"
													:settings="{ 'width': '100%', 'placeholder': 'Select a state...', allowClear: true }"
												></Select2>
											</client-only>
										</div>
									</div>
								</div>
								<div class="uk-margin uk-flex-bottom" data-uk-grid>
									<div class="uk-width-1-3@m">
										<ScInput v-model="userData.zipCode">
											<label>Postal/Zip-Code</label>
										</ScInput>
									</div>
									<div class="uk-width-2-3@m">
										<div class="uk-form-controls">
											<client-only>
												<Select2
													v-model="userData.select2.country"
													:options="countries"
													:settings="{
														'width': '100%',
														'placeholder': 'Select a country...',
														allowClear: true,
														'templateResult': 'formatCountryResult',
														'templateSelection': 'formatCountrySelection'
													}"
												></Select2>
											</client-only>
										</div>
									</div>
								</div>
								<h4 class="uk-heading-line uk-margin-xlarge-top uk-margin-medium-bottom">
									<span>Additional Informations</span>
								</h4>
								<div>
									<ScTextarea
										v-model="userData.info"
										:cols="30"
										:rows="6"
										:autosize="true"
										mode="outline"
									>
										<label>Your special request&hellip;</label>
									</ScTextarea>
								</div>
								<div class="uk-margin-large-top">
									<button class="sc-button sc-button-large sc-button-primary" type="button">
										Confirm
									</button>
								</div>
							</form>
						</ScCardBody>
					</ScCard>
					<pre class="uk-margin-top">{{ userData | json }}</pre>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const countries = require('~/data/common/countries.json');
const usStates = require('~/data/common/us_states.json');
const usCities = require('~/data/common/us_cities.json');

import moment from '~/plugins/moment'
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'
import DateRangePicker from '~/components/DateRangePicker'

if(process.client) {
	require('~/plugins/inputmask');
	require('~/assets/icons/flags/flags.css');
}

export default {
	name: 'FormsExamplesBooking',
	components: {
		Select2: process.client ? () => import('~/components/Select2') : null,
		ScInput,
		ScTextarea,
		DateRangePicker
	},
	data: () => ({
		userData: {
			fName: '',
			lName: '',
			email: '',
			phone: '',
			addressLine1: '',
			addressLine2: '',
			zipCode: '',
			arivalDate: '',
			departureDate: '',
			select2: {
				state: '',
				city: '',
				country: ''
			},
			info: ''
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
		},
		drpConfig () {
			const self = this;
			return {
				startOfWeek: 'monday',
				customArrowPrevSymbol: '<i class="mdi mdi-chevron-left"></i>',
				customArrowNextSymbol: '<i class="mdi mdi-chevron-right"></i>',
				inline: true,
				startDate: self.$moment(new Date(), "MM-DD-YYYY").add(1, 'day')._d,
				container: '#drp-arival-departure-container',
				alwaysOpen: true,
				customTopBar: '',
				format: 'dddd MMM Do, YYYY',
				getValue () {
					if (self.userData.arivalDate !== '' && self.userData.departureDate !== '') {
						return self.userData.arivalDate + ' to ' + self.userData.departureDate;
					} else {
						return '';
					}
				},
				setValue (s, s1, s2) {
					self.userData.arivalDate = s1;
					self.userData.departureDate = s2;
				},
				showDateFilter (time, date) {
					return '<span class="sc-text-semibold">' + date + '</span>' +
						'<div class="sc-color-secondary uk-margin-mini-top">$' + Math.round(Math.random() * 999) + '</div>';
				}
			}
		}
	}
}
</script>
