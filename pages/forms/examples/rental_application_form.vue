<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-flex-center uk-grid" data-uk-grid>
				<div class="uk-width-3-4@l">
					<ScCard>
						<ScCardHeader class="sc-padding">
							<div class="uk-flex uk-flex-middle">
								<div>
									<span data-uk-icon="icon:home;ratio:1.4" class="uk-margin-medium-right"></span>
								</div>
								<ScCardTitle>
									Rental Application Form
								</ScCardTitle>
							</div>
						</ScCardHeader>
						<ScCardBody>
							<form action="">
								<ul class="uk-accordion-outline uk-accordion" data-uk-accordion="multiple: true">
									<li class="uk-open">
										<h3 class="uk-accordion-title">
											1. Personal Information
										</h3>
										<div class="uk-accordion-content">
											<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
												<div>
													<ScInput v-model="userData.fName" mode="outline">
														<label>
															First Name
														</label>
													</ScInput>
												</div>
												<div>
													<ScInput v-model="userData.lName" mode="outline">
														<label>
															Last Name
														</label>
													</ScInput>
												</div>
											</div>
											<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
												<div>
													<ScInput v-model="userData.email" v-input-mask="{ 'alias': 'email' }" mode="outline">
														<label>
															Email
														</label>
													</ScInput>
												</div>
												<div>
													<ScInput v-model="userData.phone" mode="outline">
														<label>
															Phone Number
														</label>
													</ScInput>
												</div>
											</div>
											<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
												<div>
													<ScInput v-model="userData.birthDate" mode="outline">
														<label>
															Birth Date
														</label>
													</ScInput>
												</div>
												<div>
													<ScInput v-model="userData.ssn" v-input-mask="{ 'mask': '999-99-9999' }" mode="outline">
														<label>
															Social Security Number
														</label>
													</ScInput>
												</div>
												<div>
													<ScInput v-model="userData.driversLicense" v-input-mask="{ 'mask': 'a999-999-99-999-9' }" mode="outline">
														<label>
															Drivers License Number
														</label>
													</ScInput>
												</div>
											</div>
										</div>
									</li>
									<li>
										<h3 class="uk-accordion-title">
											2. Employment History
										</h3>
										<div class="uk-accordion-content">
											<div class="uk-margin">
												<ScInput v-model="userData.employmentHistory.employer" mode="outline">
													<label>
														Current or Most Recent Employer
													</label>
												</ScInput>
											</div>
											<div class="uk-child-width-1-3@m uk-margin-top uk-grid" data-uk-grid>
												<div>
													<ScInput v-model="userData.employmentHistory.position" mode="outline">
														<label>
															Position
														</label>
													</ScInput>
												</div>
												<div>
													<ScInput v-model="userData.employmentHistory.employmentLength" mode="outline">
														<label>
															Length of Employment
														</label>
													</ScInput>
												</div>
												<div>
													<ScInput v-model="userData.employmentHistory.monthlySalary" v-input-mask="{ 'alias': 'numeric', 'groupSeparator': ',', 'autoGroup': true, 'digits': 2, 'digitsOptional': false, 'prefix': '$ ', 'placeholder': '0' }" mode="outline">
														<label>
															Monthly Salary
														</label>
													</ScInput>
												</div>
											</div>
											<div class="uk-child-width-1-2@m uk-margin-top uk-grid" data-uk-grid>
												<div>
													<ScInput v-model="userData.employmentHistory.supervisorName" mode="outline">
														<label>
															Supervisor Name
														</label>
													</ScInput>
												</div>
												<div>
													<ScInput v-model="userData.employmentHistory.supervisorPhone" mode="outline">
														<label>
															Supervisor Phone
														</label>
													</ScInput>
												</div>
											</div>
										</div>
									</li>
									<li>
										<h3 class="uk-accordion-title">
											3. Rental History
										</h3>
										<div class="uk-accordion-content">
											<div v-for="(item, index) in userData.rentalHistory" :key="item.id" :class="{'md-bg-grey-100 uk-accordion-content-expand uk-margin' : index % 2}">
												<div class="uk-grid-match sc-form-section uk-grid" data-uk-grid>
													<div class="uk-width-expand@m">
														<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
															<div class="uk-width-expand@m">
																<ScInput v-model="item.address" mode="outline">
																	<label>
																		Address
																	</label>
																</ScInput>
															</div>
															<div class="uk-width-1-3@m">
																<ScInput v-model="item.zipCode" mode="outline">
																	<label>
																		Postal/Zip-Code
																	</label>
																</ScInput>
															</div>
														</div>
														<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
															<div>
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
															<div>
																<label class="uk-form-label">
																	State/Province
																</label>
																<div class="uk-form-controls">
																	<client-only>
																		<Select2
																			v-model="item.state"
																			:options="usStates"
																			:settings="{ 'width': '100%', 'placeholder': 'Select a state...' }"
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
																			v-model="item.country"
																			:options="countries"
																			:settings="{ 'width': '100%', 'placeholder': 'Select a country...' }"
																		></Select2>
																	</client-only>
																</div>
															</div>
														</div>
														<hr class="uk-margin-medium">
														<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
															<div>
																<div class="uk-position-relative">
																	<ScInput v-model="item.moveInDate" v-flatpickr :read-only="true" mode="outline">
																		<span slot="icon" class="uk-form-icon uk-form-icon-flip mdi mdi-login"></span>
																		<label>
																			Move in Date
																		</label>
																	</ScInput>
																</div>
															</div>
															<div>
																<div class="uk-position-relative">
																	<ScInput v-model="item.moveOutDate" v-flatpickr :read-only="true" mode="outline">
																		<span slot="icon" class="uk-form-icon uk-form-icon-flip mdi mdi-logout"></span>
																		<label>
																			Move out Date
																		</label>
																	</ScInput>
																</div>
															</div>
														</div>
														<hr class="uk-margin-medium">
														<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
															<div class="">
																<ScInput v-model="item.landlordName" mode="outline">
																	<label>
																		Landlord Name
																	</label>
																</ScInput>
															</div>
															<div>
																<ScInput v-model="item.landlordPhone" mode="outline">
																	<label>
																		Landlord Phone
																	</label>
																</ScInput>
															</div>
														</div>
													</div>
													<div class="uk-width-auto@m uk-flex-middle">
														<a v-if="userData.rentalHistory.length === (index + 1)" href="javascript:void(0)" class="sc-color-primary" @click="addRentHistory($event)">
															<i class="mdi mdi-plus-box-outline sc-icon-24"></i>
														</a>
														<a v-if="userData.rentalHistory.length !== (index + 1)" href="javascript:void(0)" class="sc-color-primary" @click="removeRentHistory($event,item.id)">
															<i class="mdi mdi-minus-box-outline sc-icon-24"></i>
														</a>
													</div>
												</div>
											</div>
										</div>
									</li>
									<li>
										<h3 class="uk-accordion-title">
											4. Personal References
										</h3>
										<div class="uk-accordion-content">
											<div v-for="(item, index) in userData.personalReference" :key="item.id" class="sc-form-section uk-margin-medium">
												<h5 class="uk-margin-bottom uk-heading-line">
													<span class="sc-theme-color">
														{{ item.fName }} {{ item.lName }}
													</span>
												</h5>
												<div class="uk-grid-match uk-grid" data-uk-grid>
													<div class="uk-width-expand@m">
														<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
															<div>
																<ScInput v-model="item.fName" mode="outline">
																	<label>
																		First Name
																	</label>
																</ScInput>
															</div>
															<div>
																<ScInput v-model="item.lName" mode="outline">
																	<label>
																		Last Name
																	</label>
																</ScInput>
															</div>
														</div>
														<div class="uk-grid" data-uk-grid>
															<div class="uk-width-1-3@l">
																<ScInput v-model="item.relationship" mode="outline">
																	<label>
																		Relationship to Applicant
																	</label>
																</ScInput>
															</div>
															<div class="uk-width-1-3@l uk-width-1-2@m">
																<ScInput v-model="item.phone" mode="outline">
																	<label>
																		Phone
																	</label>
																</ScInput>
															</div>
															<div class="uk-width-1-3@l uk-width-1-2@m">
																<ScInput v-model="item.email" v-input-mask="{ 'alias': 'email' }" mode="outline">
																	<label>
																		Email
																	</label>
																</ScInput>
															</div>
														</div>
													</div>
													<div class="uk-width-auto@m uk-flex-middle">
														<a v-if="userData.personalReference.length === (index + 1)" href="javascript:void(0)" class="sc-color-primary" @click="addPersonalReference($event)">
															<i class="mdi mdi-plus-box-outline sc-icon-24"></i>
														</a>
														<a v-if="userData.personalReference.length !== (index + 1)" href="javascript:void(0)" class="sc-color-primary" @click="removePersonalReference($event,item.id)">
															<i class="mdi mdi-minus-box-outline sc-icon-24"></i>
														</a>
													</div>
												</div>
											</div>
										</div>
									</li>
									<li>
										<h3 class="uk-accordion-title">
											5. Other Information
										</h3>
										<div class="uk-accordion-content">
											<div>
												<ScTextarea
													v-model="userData.pets"
													:cols="30"
													:rows="6"
													:autosize="true"
													mode="outline"
												>
													<label>
														Pets (please describe)
													</label>
												</ScTextarea>
											</div>
											<div class="uk-margin-medium-top">
												<ScTextarea
													v-model="userData.info"
													:cols="30"
													:rows="6"
													:autosize="true"
													mode="outline"
												>
													<label>
														Vehicles to be parked on premises
													</label>
												</ScTextarea>
											</div>
										</div>
									</li>
								</ul>
								<div class="uk-margin-large-top">
									<button class="sc-button sc-button-primary sc-button-large">
										Submit Application
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

const countries = require('~/data/common/countries.json');
const usStates = require('~/data/common/us_states.json');
const usCities = require('~/data/common/us_cities.json');
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'
if(process.client) {
	require('~/plugins/inputmask')
}
import Flatpickr from '~/plugins/flatpickr'

export default {
	name: 'FormsExamplesRentalApplication',
	components: {
		Select2: process.client ? () => import('~/components/Select2') : null,
		ScInput,
		ScTextarea
	},
	data: () => ({
		userData: {
			employmentHistory: {},
			select2: {},
			rentalHistory: [
				{
					id: uniqueID(),
					address: '',
					zipCode: '',
					city: '',
					state: '',
					country: '',
					landlordName: '',
					landlordPhone: ''
				}
			],
			personalReference: [
				{
					id: uniqueID(),
					fName: '',
					lName: '',
					relationship: '',
					phone: '',
					email: ''
				}
			]
		},
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
	methods: {
		addRentHistory (e) {
			e.preventDefault();
			this.userData.rentalHistory.push({
				id: uniqueID(),
				address: '',
				zipCode: '',
				city: '',
				state: '',
				country: '',
				landlordName: '',
				landlordPhone: ''
			});
		},
		removeRentHistory (e, id) {
			e.preventDefault();
			var index = this.userData.rentalHistory.map(function (item) {
				return item.id
			}).indexOf(id);
			this.userData.rentalHistory.splice(index, 1);
		},
		addPersonalReference (e) {
			e.preventDefault();
			this.userData.personalReference.push({
				id: uniqueID(),
				fName: '',
				lName: '',
				relationship: '',
				phone: '',
				email: ''
			});
		},
		removePersonalReference (e, id) {
			e.preventDefault();
			var index = this.userData.personalReference.map(function (item) {
				return item.id
			}).indexOf(id);
			this.userData.personalReference.splice(index, 1);
		}
	}
}
</script>
