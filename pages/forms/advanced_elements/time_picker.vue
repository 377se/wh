<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Default
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-position-relative">
								<ScInput v-model="tpDefault" v-flatpickr="{enableTime: true, noCalendar: true, dateFormat: 'H:i' }" placeholder="Pick a time..." mode="outline"></ScInput>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							24-hour Time Picker
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-position-relative">
								<ScInput v-model="tp24" v-flatpickr="timepicker24" placeholder="Pick a time..." mode="outline"></ScInput>
							</div>
							{{ tp24 }}
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ScInput from '~/components/Input'
if(process.client) {
	require('~/plugins/flatpickr');
}
import moment from '~/plugins/moment'

export default {
	name: 'FormsAdvancedElementsTimePicker',
	components: {
		ScInput
	},
	data: () => ({
		tpDefault: '',
		tp24: ''
	}),
	computed: {
		timepicker24 () {
			return {
				enableTime: true,
				noCalendar: true,
				dateFormat: "H:i",
				time_24hr: true,
				defaultDate: this.$moment().format('HH:mm')
			}
		}
	},
	mounted () {
		this.tp24 = this.$moment().format('HH:mm');
	}
}
</script>
