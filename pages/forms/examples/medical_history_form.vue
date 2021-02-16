<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-flex-center uk-grid" data-uk-grid>
				<div class="uk-width-2-3@l">
					<ScCard>
						<ScCardHeader class="uk-margin-medium-bottom">
							<div class="md-bg-blue-800 sc-padding sc-round uk-light uk-flex uk-flex-middle">
								<i class="mdi mdi-medical-bag sc-icon-24 uk-margin-medium-right md-color-white"></i>
								<ScCardTitle>
									Medical History
								</ScCardTitle>
							</div>
						</ScCardHeader>
						<ScCardBody>
							<form class="uk-form-stacked ">
								<div class="uk-child-width-1-2@l uk-grid" data-uk-grid>
									<div class="uk-width-2-3@m">
										<ScInput v-model="userData.name" mode="outline">
											<label>
												Patient Name
											</label>
										</ScInput>
									</div>
									<div class="uk-width-1-3@m">
										<ScInput v-model="userData.birthDate" v-flatpickr="dPicker" mode="outline">
											<label>
												Birth Date
											</label>
										</ScInput>
									</div>
								</div>
								<hr class="uk-margin-large">
								<h4 class="uk-margin-large-top">
									Please answer the following
								</h4>
								<div v-for="(question, index) in userData.questions" :key="question.id" class="uk-margin-small">
									<PrettyCheck v-model="userData.questions[index].value" :value="question.value" class="p-switch">
										{{ question.text }}
									</PrettyCheck>
									<div v-if="question.input" v-show="question.value" class="uk-margin-small-top uk-margin-medium-bottom">
										<ScInput v-model="userData.questions[index].moreInfo" placeholder="Please add more info..." mode="outline"></ScInput>
									</div>
								</div>
								<h4 class="uk-margin-large-top">
									Do you have or have you had any of the following?
								</h4>
								<div class="uk-child-width-expand@l uk-grid" data-uk-grid>
									<div v-for="(col, index) in splitConditions(3)" :key="index" class="uk-margin-remove">
										<ul class="uk-list">
											<li v-for="condition in col" :key="condition">
												<PrettyCheck v-model="userData.conditions" :value="condition" class="p-icon">
													<i slot="extra" class="icon mdi mdi-check"></i>
													{{ condition }}
												</PrettyCheck>
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-margin-large">
									<ScTextarea
										v-model="userData.info"
										:cols="30"
										:rows="6"
										:autosize="true"
										mode="outline"
									>
										<label>Additional info</label>
									</ScTextarea>
								</div>
								<div class="uk-margin-medium-top">
									<button class="sc-button sc-button-large sc-button-custom md-bg-blue-800" type="button">
										Save history
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
import moment from '~/plugins/moment'
import { scHelpers } from "~/assets/js/utils";
const { splitArr } = scHelpers;

import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'
import PrettyCheck from 'pretty-checkbox-vue/check';
import Flatpickr from '~/plugins/flatpickr'

export default {
	name: 'FormsExamplesMedicalHistory',
	components: {
		ScInput,
		ScTextarea,
		PrettyCheck
	},
	data: () => ({
		userData: {
			name: '',
			birthDate: '',
			info: '',
			questions: [
				{
					id: 1,
					text: 'Are you under a physician\'s care now?',
					value: false,
					input: true,
					moreInfo: ''
				},
				{
					id: 2,
					text: 'Have you ever been hospitalized or had a major operation?',
					value: false,
					input: true,
					moreInfo: ''
				},
				{
					id: 3,
					text: 'Have you ever had a serious head or neck injury?',
					value: false,
					input: true,
					moreInfo: ''
				},
				{
					id: 4,
					text: 'Are you taking any medications, pills or drugs?',
					value: false,
					input: true,
					moreInfo: ''
				},
				{
					id: 5,
					text: 'Are you on a special diet?',
					value: false,
					input: true,
					moreInfo: ''
				},
				{
					id: 6,
					text: 'Do you use tobaco?',
					value: false,
					input: false
				}
			],
			conditions: []
		},
		conditions: ['AIDS/HIV Positive', 'Anemia', 'Asthma', 'Breathing Problem', 'Cancer', 'Chemotherapy', 'Chest Pains', 'Cold Sores/Fever Blisters', 'Convulsions', 'Diabetes', 'Drug Addition', 'Frequent Cough', 'Hypoglycemia', 'Glaucoma', 'Heart Attack/Failure', 'Low Blood Pressure', 'Stroke', 'Tuberculosis']
	}),
	computed: {
		dPicker () {
			var self = this;
			return {
				maxDate: self.$moment()._d,
			}
		}
	},
	methods: {
		splitConditions (n) {
			return splitArr(this.conditions, n);
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
