<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Basic
						</ScCardTitle>
						<ScCardBody>
							<ScInput v-model="dpBasic" v-flatpickr placeholder="Pick a date..." mode="outline"></ScInput>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Human-readable date
						</ScCardTitle>
						<ScCardBody>
							<ScInput v-model="dpHRDate" v-flatpickr="{ 'altInput': true, 'altFormat': 'F j, Y' }" placeholder="Pick a date..." mode="outline"></ScInput>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Datetime Picker
						</ScCardTitle>
						<ScCardBody>
							<ScInput v-model="dpDT" v-flatpickr="dpTimePicker" placeholder="Pick a date and time..." mode="outline"></ScInput>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Locale (FR)
						</ScCardTitle>
						<ScCardBody>
							<ScInput v-model="dpLocale" v-flatpickr="{ 'locale': French }" mode="outline"></ScInput>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Selecting a Range of Dates
						</ScCardTitle>
						<ScCardBody>
							<ScInput v-model="dpRangeVal" v-flatpickr="dpRange" placeholder="Pick a date range..." mode="outline"></ScInput>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Multiple dates
						</ScCardTitle>
						<ScCardBody>
							<div v-flatpickr="dpMultipleDates" class="uk-position-relative">
								<a v-show="dpMultiple !== ''"
									class="uk-form-icon uk-form-icon-flip"
									href="javascript:void(0)"
									data-uk-icon="icon: close"
									data-clear
								></a>
								<input
									v-model="dpMultiple"
									type="text"
									class="uk-input"
									placeholder="Pick a multiple dates..."
									data-input
								>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Icons
						</ScCardTitle>
						<ScCardBody>
							<div v-flatpickr="{ wrap: true, clickOpens: false }" class="uk-position-relative">
								<a class="uk-form-icon uk-form-icon-flip" href="javascript:void(0)" data-uk-icon="icon: calendar" data-toggle></a>
								<a v-show="dpIcons !== ''"
									class="uk-form-icon uk-form-icon-flip"
									href="javascript:void(0)"
									data-uk-icon="icon: close"
									data-clear
								></a>
								<input
									v-model="dpIcons"
									class="uk-input"
									type="text"
									placeholder="Pick a date..."
									data-input
								>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div class="uk-child-width-1-2@m uk-child-width-1-3@l uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Inline
						</ScCardTitle>
						<ScCardBody>
							<ScInput
								v-model="dpInline"
								v-flatpickr="{ inline: true, weekNumbers: true }"
								type="hidden"
								placeholder="Pick a date..."
								mode="outline"
								extra-classes="uk-hidden"
							></ScInput>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ScInput from '~/components/Input'
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';
import moment from '~/plugins/moment'
import { French } from "flatpickr/dist/l10n/fr.js"

if(process.client) {
	require('~/plugins/flatpickr');
}

export default {
	name: 'FormsAdvancedElementsDatePicker',
	components: {
		ScInput
	},
	data: () => ({
		dpBasic: '',
		dpHRDate: '',
		dpDT: '',
		dpLocale: '',
		dpRangeVal: '',
		dpMultiple: '',
		dpIcons: '',
		dpInline: '',
	    French
	}),
	computed: {
		dpTimePicker () {
			const self = this;
			return {
				enableTime: true,
				time_24hr: true,
				plugins: [new confirmDatePlugin({
					confirmIcon: "<i class='mdi mdi-check'></i>",
					confirmText: ""
				})],
				dateFormat: "d/m/Y H:i",
				defaultDate: self.$moment().format('DD/MM/YYYY H:m')
			}
		},
		dpRange () {
			return {
				mode: "range",
				plugins: [confirmDatePlugin]
			}
		},
		dpMultipleDates () {
			return {
				mode: "multiple",
				wrap: true,
				plugins: [confirmDatePlugin]
			}
		}
	}
}
</script>
