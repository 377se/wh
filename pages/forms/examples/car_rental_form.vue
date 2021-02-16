<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content" class="uk-height-1-1 uk-flex uk-flex-center sc-page-over-header">
			<div class="uk-width-2-3@l">
				<ScCard class="uk-height-1-1 uk-flex uk-flex-column">
					<ScCardHeader class="uk-flex uk-flex-middle" separator>
						<ScCardTitle class="uk-flex-1">
							Car Rental Form
						</ScCardTitle>
						<i class="mdi mdi-car-side sc-icon-32 uk-margin-left"></i>
					</ScCardHeader>
					<ScCardBody class="sc-padding-remove">
						<form class="sc-padding">
							<h4 class="uk-heading-line uk-margin-medium-bottom md-color-indigo-500">
								<span>Personal Informations</span>
							</h4>
							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<ScInput v-model="userData.fName" mode="outline">
										<label>First Name</label>
									</ScInput>
								</div>
								<div>
									<ScInput v-model="userData.lName" mode="outline">
										<label>Last Name</label>
									</ScInput>
								</div>
							</div>
							<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
								<div>
									<ScInput v-model="userData.phone" mode="outline">
										<label>Phone Number</label>
									</ScInput>
								</div>
								<div>
									<ScInput v-model="userData.email" mode="outline">
										<label>Email</label>
									</ScInput>
								</div>
								<div>
									<ScInput v-model="userData.birthDate" v-flatpickr mode="outline">
										<label>Birth Date</label>
									</ScInput>
								</div>
							</div>
							<h4 class="uk-heading-line uk-margin-medium-bottom uk-margin-large-top md-color-indigo-500">
								<span>Car Rental Details</span>
							</h4>
							<div class="uk-child-width-1-2@m uk-flex uk-flex-bottom uk-grid" data-uk-grid>
								<div>
									<label class="uk-form-label">
										Pick-up Location
									</label>
									<div class="uk-form-controls">
										<client-only>
											<Select2
												v-model="userData.select2.pickUpLocation"
												:options="usCities"
												:settings="{ 'width': '100%', 'placeholder': 'Select a city...', allowClear: true }"
											></Select2>
										</client-only>
									</div>
								</div>
								<div>
									<ScInput v-model="userData.pickUpDate" v-flatpickr="dtPicker">
										<label>Pick-up Date</label>
									</ScInput>
								</div>
							</div>
							<div class="uk-child-width-1-2@m uk-flex uk-flex-bottom uk-grid" data-uk-grid>
								<div>
									<label class="uk-form-label">
										Drop-off Location
									</label>
									<div class="uk-form-controls">
										<client-only>
											<Select2
												v-model="userData.select2.dropOffLocation"
												:options="usCities"
												:settings="{ 'width': '100%', 'placeholder': 'Select a city...', allowClear: true }"
											></Select2>
										</client-only>
									</div>
								</div>
								<div>
									<ScInput v-model="userData.dropOffDate" v-flatpickr="dtPicker">
										<label>Drop-off Date</label>
									</ScInput>
								</div>
							</div>
							<h4 class="uk-heading-line uk-margin-medium-bottom uk-margin-large-top md-color-indigo-500">
								<span>Car type</span>
							</h4>
							<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
								<div>
									<label for="f-car-type" class="uk-form-label">
										Type
									</label>
									<client-only>
										<Select2
											id="f-car-type"
											v-model="userData.select2.carType"
											:settings="{ 'width': '100%', 'placeholder': 'Select a type...', minimumResultsForSearch: -1, allowClear: true }"
											@change="clearSubtype()"
										>
											<option value="">
												---
											</option>
											<option value="economy">
												Economy
											</option>
											<option value="compact">
												Compact
											</option>
											<option value="midSize">
												Mid-size
											</option>
											<option value="fullSize">
												Full-size
											</option>
											<option value="premium">
												Premium
											</option>
											<option value="luxury">
												Luxury
											</option>
											<option value="minivan">
												Minivan
											</option>
										</Select2>
									</client-only>
								</div>
								<div>
									<label for="f-car-subtype" class="uk-form-label">
										Subtype
									</label>
									<client-only>
										<Select2
											id="f-car-subtype"
											v-model="userData.select2.carSubtype"
											:settings="{ 'width': '100%', 'placeholder': 'First select a type...', 'minimumResultsForSearch': -1 }"
											:disabled="subTypeDisabled"
										>
											<option value="">
												---
											</option>
											<option v-for="option in carSubtypeOptionsFiltered()"
												:key="option.val"
												:class="option.class"
											>
												{{ option.name }}
											</option>
										</Select2>
									</client-only>
								</div>
							</div>
							<h4 class="uk-heading-line uk-margin-medium-bottom uk-margin-large-top md-color-indigo-500">
								<span>Extras</span>
							</h4>
							<div class="uk-margin-small-top">
								<ul class="uk-list">
									<li v-for="extra in carExtraOptions" :key="extra.id">
										<PrettyCheck v-model="userData.carExtras" :value="extra.val" class="p-icon" checked>
											<i slot="extra" class="icon mdi mdi-check"></i>
											{{ extra.name }}
										</PrettyCheck>
									</li>
								</ul>
							</div>
							<hr>
							<ScTextarea
								v-model="userData.info"
								:cols="30"
								:rows="6"
								:autosize="true"
								mode="outline"
							>
								<label>Additional Requests&hellip;</label>
							</ScTextarea>
							<div class="uk-margin-large-top">
								<button class="sc-button sc-button-large md-bg-light-blue-600 sc-button-custom">
									Book now
								</button>
							</div>
						</form>
						<div class="sc-padding sc-padding-small-ends">
							<pre class="uk-margin-top">{{ userData | json }}</pre>
						</div>
					</ScCardBody>
				</ScCard>
			</div>
		</div>
	</div>
</template>

<script>
import moment from '~/plugins/moment'
const usCities = require('~/data/common/us_cities.json');
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'
import PrettyCheck from 'pretty-checkbox-vue/check';
import Flatpickr from '~/plugins/flatpickr'
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';

export default {
	name: 'FormsExamplesCarRental',
	components: {
		Select2: process.client ? () => import('~/components/Select2') : null,
		ScInput,
		ScTextarea,
		PrettyCheck
	},
	data: () => ({
		userData: {
			fName: '',
			lName: '',
			phone: '',
			email: '',
			birthDate: '',
			select2: {
				pickUpLocation: '',
				dropOffLocation: '',
				carType: '',
				carSubtype: ''
			},
			pickUpDate: '',
			dropOffDate: '',
			carExtras: [],
			info: ''
		},
		carSubtypeOptions: [
			{
				val: 'economy-1',
				name: 'Chevrolet Spark',
				class: 'economy'
			},
			{
				val: 'economy-2',
				name: 'Hyundai Accent',
				class: 'economy'
			},
			{
				val: 'economy-3',
				name: 'Chevrolet Aveo',
				class: 'economy'
			},
			{
				val: 'compact-1',
				name: 'Nissan Versa',
				class: 'compact'
			},
			{
				val: 'compact-2',
				name: 'Toyota Yaris',
				class: 'compact'
			},
			{
				val: 'compact-3',
				name: 'Huyndai Accent',
				class: 'compact'
			},
			{
				val: 'compact-4',
				name: 'Ford Focus',
				class: 'compact'
			},
			{
				val: 'fullSize-1',
				name: 'Ford Fusion',
				class: 'fullSize'
			},
			{
				val: 'fullSize-2',
				name: 'Nissan Altima',
				class: 'fullSize'
			},
			{
				val: 'fullSize-3',
				name: 'Dodge Charger',
				class: 'fullSize'
			},
			{
				val: 'fullSize-4',
				name: 'Chevrolet Impala',
				class: 'fullSize'
			},
			{
				val: 'fullSize-5',
				name: 'Ford Taurus',
				class: 'fullSize'
			},
			{
				val: 'premium-1',
				name: 'Nissan Maxima',
				class: 'premium'
			},
			{
				val: 'premium-2',
				name: 'Chrysler 300',
				class: 'premium'
			},
			{
				val: 'premium-3',
				name: 'Toyota Avalon',
				class: 'premium'
			},
			{
				val: 'premium-4',
				name: 'Mercury Grand Marquis',
				class: 'premium'
			},
			{
				val: 'premium-5',
				name: 'Ford Crown Victoria',
				class: 'premium'
			},
			{
				val: 'luxury-1',
				name: 'Cadillac ATZ',
				class: 'luxury'
			},
			{
				val: 'luxury-2',
				name: 'Lincoln MKZ',
				class: 'luxury'
			},
			{
				val: 'luxury-3',
				name: 'Buick LaCrosse',
				class: 'luxury'
			},
			{
				val: 'luxury-4',
				name: 'Cadillac STS',
				class: 'luxury'
			},
			{
				val: 'minivan-1',
				name: 'Dodge Grand Caravan',
				class: 'minivan'
			},
			{
				val: 'minivan-2',
				name: 'Chrysler Town and Country',
				class: 'minivan'
			},
			{
				val: 'minivan-3',
				name: 'Kia Sedona',
				class: 'minivan'
			}
		],
		carExtraOptions: [
			{
				id: 1,
				name: 'GPS navigation system',
				val: 'gps'
			},
			{
				id: 2,
				name: 'Booster',
				val: 'booster'
			},
			{
				id: 3,
				name: 'Child safety seat',
				val: 'childSafetySeat'
			},
			{
				id: 4,
				name: 'Additional driver',
				val: 'addDriver'
			}
		]
	}),
	computed: {
		usCities () {
			return usCities.map(function (obj) {
				obj.id = obj.id || obj.rank;
				obj.text = obj.text || obj.city;
				return obj;
			});
		},
		dtPicker () {
			var self = this;
			return {
				enableTime: true,
				time_24hr: true,
				minDate: self.$moment()._d,
				plugins: [new confirmDatePlugin({
					confirmIcon: "<i class='mdi mdi-check'></i>",
					confirmText: ""
				})],
				dateFormat: "d/m/Y H:i"
			}
		},
		subTypeDisabled () {
			return this.userData.select2.carType === '';
		}
	},
	mounted () {
		this.$store.commit('setCardFixed', true);
		this.$store.commit('setHeaderExpanded', true);
	},
	beforeDestroy () {
		this.$store.commit('setCardFixed', false);
		this.$store.commit('setHeaderExpanded', false);
	},
	methods: {
		carSubtypeOptionsFiltered () {
			const type = this.userData.select2.carType;
			return type === '' ? this.carSubtypeOptions : this.carSubtypeOptions.filter(function (option) {
				return option.class === type;
			});
		},
		clearSubtype () {
			this.userData.select2.carSubtype = ''
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
