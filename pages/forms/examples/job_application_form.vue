<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-flex-center uk-grid" data-uk-grid>
				<div class="uk-width-2-3@l">
					<ScCard>
						<ScCardBody>
							<form class="uk-form-stacked">
								<h4>Personal Informations</h4>
								<div class="md-bg-grey-100 sc-padding">
									<div class="uk-child-width-1-2@s uk-grid-divider uk-grid" data-uk-grid>
										<div>
											<label class="uk-form-label" for="f-job-fname">
												First Name
											</label>
											<div class="uk-form-controls">
												<ScInput id="f-job-fname" v-model="userData.fName" mode="outline"></ScInput>
											</div>
										</div>
										<div>
											<label class="uk-form-label" for="f-job-lname">
												Last Name
											</label>
											<div class="uk-form-controls">
												<ScInput id="f-job-lname" v-model="userData.lName" mode="outline"></ScInput>
											</div>
										</div>
									</div>
									<hr>
									<div class="uk-grid-divider uk-grid" data-uk-grid>
										<div class="uk-width-1-1@m">
											<label class="uk-form-label" for="f-job-address">
												Address
											</label>
											<div class="uk-form-controls">
												<ScInput id="f-job-address" v-model="userData.address" mode="outline"></ScInput>
											</div>
										</div>
										<div class="uk-width-2-5@s">
											<label class="uk-form-label" for="f-address-city">
												City
											</label>
											<div class="uk-form-controls">
												<client-only>
													<Select2
														id="f-address-city"
														v-model="userData.select2.city"
														:options="usCities"
														:settings="{ 'width': '100%', 'placeholder': 'Select a city...' }"
													></Select2>
												</client-only>
											</div>
										</div>
										<div class="uk-width-2-5@s">
											<label class="uk-form-label" for="f-address-state">
												State
											</label>
											<div class="uk-form-controls">
												<client-only>
													<Select2
														id="f-address-state"
														v-model="userData.select2.state"
														:options="usStates"
														:settings="{ 'width': '100%', 'placeholder': 'Select a state...' }"
													></Select2>
												</client-only>
											</div>
										</div>
										<div class="uk-width-1-5@s">
											<label class="uk-form-label" for="f-address-postal">
												Zip-Code
											</label>
											<div class="uk-form-controls">
												<ScInput id="f-address-postal" v-model="userData.zipCode" mode="outline"></ScInput>
											</div>
										</div>
									</div>
									<hr>
									<div class="uk-grid-divider uk-grid" data-uk-grid>
										<div class="uk-width-1-4@l uk-width-1-2@m">
											<label class="uk-form-label" for="f-job-phone-number">
												Phone Number
											</label>
											<div class="uk-form-controls">
												<ScInput id="f-job-phone-number" v-model="userData.phone" mode="outline"></ScInput>
											</div>
										</div>
										<div class="uk-width-1-4@l uk-width-1-2@m">
											<label class="uk-form-label" for="f-job-phone-mobile">
												Mobile Number
											</label>
											<div class="uk-form-controls">
												<div class="uk-position-relative">
													<ScInput id="f-job-phone-mobile" v-model="userData.phoneMobile" mode="outline" :error-state="true">
														<span slot="icon" class="uk-form-icon uk-form-icon-flip mdi mdi-alert-circle"></span>
													</ScInput>
												</div>
												<span class="uk-form-help-block sc-color-danger">
													This field is required.
												</span>
											</div>
										</div>
										<div class="uk-width-1-2@l">
											<label class="uk-form-label" for="f-job-email">
												Email
											</label>
											<div class="uk-form-controls">
												<ScInput id="f-job-email" v-model="userData.email" v-input-mask="{ 'alias': 'email' }" mode="outline"></ScInput>
											</div>
										</div>
									</div>
								</div>
								<h4 class="uk-margin-large-top">
									Position
								</h4>
								<div class="md-bg-grey-100 sc-padding">
									<div class="uk-grid-divider uk-grid" data-uk-grid>
										<div class="uk-width-1-2@l">
											<label class="uk-form-label" for="f-job-position">
												Position You Are Applying For
											</label>
											<div class="uk-form-controls">
												<client-only>
													<Select2
														id="f-job-position"
														v-model="userData.select2.jobPosition"
														:options="jobPositions"
														:settings="{ 'width': '100%', 'placeholder': 'Select position from the list...' }"
													></Select2>
												</client-only>
											</div>
										</div>
										<div class="uk-width-1-4@l uk-width-1-2@m">
											<label class="uk-form-label" for="dp-job-start-date">
												Available Start Date
											</label>
											<div class="uk-form-controls">
												<ScInput id="dp-job-start-date" v-model="userData.startDate" v-flatpickr="dtPicker" mode="outline"></ScInput>
											</div>
										</div>
										<div class="uk-width-1-4@l uk-width-1-2@m">
											<label class="uk-form-label" for="f-job-pay">
												Desired Pay
											</label>
											<div class="uk-form-controls">
												<ScInput id="f-job-pay" v-model="userData.desiredPay" v-input-mask="{ 'alias': 'numeric', 'groupSeparator': ',', 'autoGroup': true, 'digits': 2, 'digitsOptional': false, 'prefix': '$ ', 'placeholder': '0' }" mode="outline"></ScInput>
											</div>
										</div>
									</div>
									<hr>
									<div class="uk-width-1-1">
										<label class="uk-form-label uk-margin-small-bottom sc-padding-remove">
											Employment Desired
										</label>
										<div class="uk-child-width-auto uk-grid-medium" data-uk-grid>
											<div>
												<PrettyCheck v-model="userData.emplDesired" value="full-time" class="p-icon">
													<i slot="extra" class="icon mdi mdi-check"></i>
													Full Time
												</PrettyCheck>
											</div>
											<div>
												<PrettyCheck v-model="userData.emplDesired" value="part-time" class="p-icon">
													<i slot="extra" class="icon mdi mdi-check"></i>
													Part Time
												</PrettyCheck>
											</div>
											<div>
												<PrettyCheck v-model="userData.emplDesired" value="temporary" class="p-icon">
													<i slot="extra" class="icon mdi mdi-check"></i>
													Seasonal/Temporary
												</PrettyCheck>
											</div>
										</div>
									</div>
								</div>
								<h4 class="uk-margin-large-top">
									Shift Availability
								</h4>
								<div class="md-bg-grey-100 sc-padding">
									<div class="uk-overflow-auto">
										<table class="uk-table uk-table-small">
											<thead>
												<tr>
													<th></th>
													<th class="uk-text-center">
														Monday
													</th>
													<th class="uk-text-center">
														Tuesday
													</th>
													<th class="uk-text-center">
														Wednesday
													</th>
													<th class="uk-text-center">
														Thursday
													</th>
													<th class="uk-text-center">
														Friday
													</th>
													<th class="uk-text-center">
														Saturday
													</th>
													<th class="uk-text-center">
														Sunday
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>From</td>
													<td v-for="shift in shifts" :key="shift.id">
														<ScInput v-model="userData.shifts[shift.text].from" v-input-mask="{ 'alias': 'datetime', 'inputFormat': 'HH', 'clearIncomplete': true }" mode="outline" extra-classes="uk-form-small uk-text-center"></ScInput>
													</td>
												</tr>
												<tr>
													<td>To</td>
													<td v-for="shift in shifts" :key="shift.id">
														<ScInput v-model="userData.shifts[shift.text].to" v-input-mask="{ 'alias': 'datetime', 'inputFormat': 'HH', 'clearIncomplete': true }" mode="outline" extra-classes="uk-form-small uk-text-center"></ScInput>
													</td>
												</tr>
												<tr>
													<td>Overnight</td>
													<td v-for="shift in shifts" :key="shift.id" class="uk-text-center">
														<PrettyCheck v-model="userData.shifts[shift.text].overnight" class="p-icon">
															<i slot="extra" class="icon mdi mdi-check"></i>
														</PrettyCheck>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<h4 class="uk-margin-large-top">
									Education
								</h4>
								<div class="md-bg-grey-100 sc-padding">
									<div class="uk-overflow-auto">
										<table id="sc-js-dynamic-fields-education" class="uk-table uk-table-small uk-table-middle uk-table-divider">
											<thead>
												<tr>
													<th></th>
													<th class="uk-text-nowrap">
														School Name
													</th>
													<th class="uk-text-nowrap">
														Location
													</th>
													<th class="uk-text-nowrap">
														Years Attended
													</th>
													<th class="uk-text-nowrap">
														Degree Received
													</th>
													<th class="uk-text-nowrap">
														Major
													</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(item, index) in userData.education" :key="item.id" class="sc-form-section">
													<td>{{ (index + 1) }}.</td>
													<td class="uk-width-1-3">
														<ScInput v-model="item.school" extra-classes="uk-form-small" mode="outline"></ScInput>
													</td>
													<td>
														<ScInput v-model="item.location" extra-classes="uk-form-small" mode="outline"></ScInput>
													</td>
													<td>
														<ScInput v-model="item.years" extra-classes="uk-form-small" mode="outline"></ScInput>
													</td>
													<td>
														<ScInput v-model="item.degree" extra-classes="uk-form-small" mode="outline"></ScInput>
													</td>
													<td>
														<ScInput v-model="item.major" extra-classes="uk-form-small" mode="outline"></ScInput>
													</td>
													<td class="uk-table-middle uk-text-center">
														<a v-if="userData.education.length === (index + 1)" href="javascript:void(0)" class="sc-color-primary" @click="addEducation($event)">
															<i class="mdi mdi-plus sc-icon-24"></i>
														</a>
														<a v-if="userData.education.length !== (index + 1)" href="javascript:void(0)" class="sc-color-primary" @click="removeEducation($event,item.id)">
															<i class="mdi mdi-minus sc-icon-24"></i>
														</a>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<h4 class="uk-margin-large-top">
									Employment History
								</h4>
								<div class="md-bg-grey-100 sc-padding">
									<div v-for="(item, index) in userData.emplHistory" :key="item.id" :class="{ 'uk-margin-medium-top' : index > 0 }">
										<hr v-if="index > 0" class="uk-margin-medium">
										<div class="uk-grid-match sc-form-section uk-grid" data-uk-grid>
											<div class="uk-width-expand@m">
												<div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
													<div>
														<label class="uk-form-label">
															Employer {{ (index + 1) }}
														</label>
														<div class="uk-form-controls">
															<ScInput v-model="item.employer" mode="outline"></ScInput>
														</div>
													</div>
													<div>
														<label class="uk-form-label">
															Job Title
														</label>
														<div class="uk-form-controls">
															<ScInput v-model="item.jobTitle" mode="outline"></ScInput>
														</div>
													</div>
												</div>
												<div class="uk-child-width-1-4@s  uk-margin-top uk-grid" data-uk-grid>
													<div>
														<label class="uk-form-label">
															Dates Employed
														</label>
														<div class="uk-form-controls">
															<ScInput v-model="item.datesEmployed" mode="outline"></ScInput>
														</div>
													</div>
													<div>
														<label class="uk-form-label">
															Work Phone
														</label>
														<div class="uk-form-controls">
															<ScInput v-model="item.phoneNumber" mode="outline"></ScInput>
														</div>
													</div>
													<div>
														<label class="uk-form-label">
															Starting Pay Rate
														</label>
														<div class="uk-form-controls">
															<ScInput v-model="item.startPayRate" v-input-mask="{ 'alias': 'numeric', 'groupSeparator': ',', 'autoGroup': true, 'digits': 2, 'digitsOptional': false, 'prefix': '$ ', 'placeholder': '0' }" mode="outline"></ScInput>
														</div>
													</div>
													<div>
														<label class="uk-form-label">
															Ending Pay Rate
														</label>
														<div class="uk-form-controls">
															<ScInput v-model="item.endPayRate" v-input-mask="{ 'alias': 'numeric', 'groupSeparator': ',', 'autoGroup': true, 'digits': 2, 'digitsOptional': false, 'prefix': '$ ', 'placeholder': '0' }" mode="outline"></ScInput>
														</div>
													</div>
												</div>
												<div class="uk-margin-top uk-grid" data-uk-grid>
													<div class="uk-width-1-2@m">
														<label class="uk-form-label">
															Address
														</label>
														<div class="uk-form-controls">
															<ScInput v-model="item.address" mode="outline"></ScInput>
														</div>
													</div>
													<div class="uk-width-1-4@m uk-width-1-2@s">
														<label class="uk-form-label">
															City
														</label>
														<div class="uk-form-controls">
															<client-only>
																<Select2
																	v-model="item.city"
																	:options="usCities"
																	:settings="{ 'width': '100%', 'placeholder': 'Select a city...' }"
																></Select2>
															</client-only>
														</div>
													</div>
													<div class="uk-width-1-4@m uk-width-1-2@s">
														<label class="uk-form-label">
															Zip Code
														</label>
														<div class="uk-form-controls">
															<ScInput v-model="item.zipCode" mode="outline"></ScInput>
														</div>
													</div>
												</div>
											</div>
											<div class="uk-width-auto@m uk-flex-middle uk-text-center">
												<a v-if="userData.emplHistory.length === (index + 1)" href="javascript:void(0)" class="sc-color-primary" @click="addEmployment($event)">
													<i class="mdi mdi-plus-box-outline sc-icon-24"></i>
												</a>
												<a v-if="userData.emplHistory.length !== (index + 1)" href="javascript:void(0)" class="sc-color-primary" @click="removeEmployment($event,item.id)">
													<i class="mdi mdi-minus-box-outline sc-icon-24"></i>
												</a>
											</div>
										</div>
									</div>
								</div>
								<div class="uk-margin-large-top">
									<button class="sc-button sc-button-large sc-button-primary">
										Send Application
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
import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

const usStates = require('~/data/common/us_states.json');
const usCities = require('~/data/common/us_cities.json');

import moment from '~/plugins/moment'

import ScInput from '~/components/Input'
import PrettyCheck from 'pretty-checkbox-vue/check';
if(process.client) {
	require('~/plugins/inputmask')
}
import Flatpickr from '~/plugins/flatpickr'

export default {
	name: 'FormsExamplesJobApplication',
	components: {
		Select2: process.client ? () => import('~/components/Select2') : null,
		ScInput,
		PrettyCheck
	},
	data: () => ({
		userData: {
			fName: '',
			lName: '',
			address: '',
			select2: {
				state: '',
				city: '',
				jobPosition: ''
			},
			zipCode: '',
			phone: '',
			phoneMobile: '',
			email: '',
			startDate: '',
			desiredPay: '',
			emplDesired: [],
			shifts: {
				monday: {
					from: '',
					to: '',
					overnight: false
				},
				tuesday: {
					from: '',
					to: '',
					overnight: false
				},
				wednesday: {
					from: '',
					to: '',
					overnight: false
				},
				thursday: {
					from: '',
					to: '',
					overnight: false
				},
				friday: {
					from: '',
					to: '',
					overnight: false
				},
				saturday: {
					from: '',
					to: '',
					overnight: false
				},
				sunday: {
					from: '',
					to: '',
					overnight: false
				}
			},
			education: [
				{
					id: uniqueID(),
					school: '',
					location: '',
					years: '',
					degree: '',
					major: ''
				}
			],
			emplHistory: [
				{
					id: uniqueID(),
					employer: '',
					jobTitle: '',
					datesEmployed: '',
					phoneNumber: '',
					startPayRate: '',
					endPayRate: '',
					address: '',
					city: '',
					zipCode: ''
				}
			]
		},
		jobPositions: [
			{ id: '1', text: 'Web Programmer' },
			{ id: '2', text: 'Back-end Developer' },
			{ id: '3', text: 'Mobile Developer' },
			{ id: '4', text: 'Database Developer' },
			{ id: '5', text: 'Front-end Developer' },
			{ id: '6', text: 'System Analyst' },
			{ id: '7', text: 'Business Analyst' },
			{ id: '8', text: 'Network Administrator' },
			{ id: '9', text: 'Embedded Software Engineer' },
			{ id: '10', text: 'Software Architect' },
			{ id: '11', text: 'IT Coordinator' },
			{ id: '12', text: 'Data Manager' },
			{ id: '13', text: 'Application Developer' },
			{ id: '14', text: 'Chief Information Officer – CIO' },
			{ id: '15', text: 'IT Consultant Programmer' },
			{ id: '16', text: 'IT Director Software Engineer' },
			{ id: '17', text: 'Database Administrator (DBA)' },
			{ id: '18', text: 'Telecommunications Specialist' },
			{ id: '19', text: 'IT Manager' },
			{ id: '20', text: 'Game Developer' },
			{ id: '21', text: 'PHP Developer' },
			{ id: '22', text: 'Computer Technician' },
			{ id: '23', text: 'Web Developer' },
			{ id: '24', text: 'System Security Engineer' },
			{ id: '25', text: 'Software Security Engineer' }
		],
		shifts: [
			{ id: 0, text: 'monday' },
			{ id: 1, text: 'tuesday' },
			{ id: 2, text: 'wednesday' },
			{ id: 3, text: 'thursday' },
			{ id: 4, text: 'friday' },
			{ id: 5, text: 'saturday' },
			{ id: 6, text: 'sunday' },
		]
	}),
	computed: {
		dtPicker () {
			var self = this;
			return {
				minDate: self.$moment()._d,
				dateFormat: "d/m/Y"
			}
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
	methods: {
		addEducation (e) {
			e.preventDefault();
			this.userData.education.push({
				id: uniqueID(),
				school: '',
				location: '',
				years: '',
				degree: '',
				major: ''
			});
			UIkit.notification('New Education added');
		},
		removeEducation (e, id) {
			e.preventDefault();
			var index = this.userData.education.map(function (item) {
				return item.id
			}).indexOf(id);
			this.userData.education.splice(index, 1);
		},
		addEmployment (e) {
			e.preventDefault();
			this.userData.emplHistory.push({
				id: uniqueID(),
				employer: '',
				jobTitle: '',
				datesEmployed: '',
				phoneNumber: '',
				startPayRate: '',
				endPayRate: '',
				address: '',
				city: '',
				zipCode: ''
			})
		},
		removeEmployment (e, id) {
			e.preventDefault();
			var index = this.userData.emplHistory.map(function (item) {
				return item.id
			}).indexOf(id);
			this.userData.emplHistory.splice(index, 1);
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
