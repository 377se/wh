<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Default
						</ScCardTitle>
						<ScCardBody>
							<DateRangePicker v-model="drpDefault">
								<ScInput placeholder="Pick a range..."></ScInput>
							</DateRangePicker>
							<a class="sc-button sc-button-small uk-margin-small-top" href="javascript:void(0)" @click.prevent="setRange()">
								Set range
							</a>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Time Enabled
						</ScCardTitle>
						<ScCardBody>
							<DateRangePicker v-model="drpTime" :config="{format: 'DD.MM.YYYY HH:mm', autoClose: false, time: { enabled: true }}">
								<ScInput placeholder="Pick a range..."></ScInput>
							</DateRangePicker>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Future date shortcuts
						</ScCardTitle>
						<ScCardBody>
							<DateRangePicker v-model="drpFutureDates" :config="{showShortcuts: true, shortcuts: {'next-days': [3, 5, 7], 'next': ['week', 'month', 'year']}}">
								<ScInput placeholder="Pick a range..."></ScInput>
							</DateRangePicker>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Extra content
						</ScCardTitle>
						<ScCardBody>
							<DateRangePicker v-model="drpExtraContentVal" :config="drpExtraContent">
								<ScInput placeholder="Pick a range..."></ScInput>
							</DateRangePicker>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ScInput from '~/components/Input'
import DateRangePicker from '~/components/DateRangePicker'
import moment from '~/plugins/moment'

export default {
	name: 'FormsAdvancedElementsDateRangePicker',
	components: {
		ScInput,
		DateRangePicker
	},
	data () {
		return {
			drpDefault: [],
			drpTime: [],
			drpFutureDates: [],
			drpExtraContentVal: []
		}
	},
	computed: {
		drpExtraContent () {
			return {
				showDateFilter (time, date) {
					return '<span class="sc-text-semibold">' + date + '</span>' +
						'<div class="sc-color-secondary uk-margin-mini-top">$' + Math.round(Math.random() * 999) + '</div>';
				}
			}
		}
	},
	methods: {
		setRange () {
			this.drpDefault = [this.$moment().format('DD-MM-YYYY'), this.$moment().add(7, 'days').format('DD-MM-YYYY')]
		}
	}
}
</script>
