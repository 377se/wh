<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-flex-center uk-grid" data-uk-grid>
				<div class="uk-width-2-3@l">
					<ScCard>
						<ScCardHeader>
							<div class="uk-flex uk-flex-middle">
								<ScCardTitle class="uk-flex-1">
									Advertising Evaluation Form
								</ScCardTitle>
								<i data-uk-icon="icon: commenting; ratio: 1.5" class="uk-margin-left md-color-red-600"></i>
							</div>
						</ScCardHeader>
						<ScCardBody>
							<form class="uk-form-stacked">
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid data-uk-height-match="target: > div > h5">
									<div>
										<h5>In the past week, how many times have you seen an advertisement for this product?</h5>
										<div class="uk-form-controls">
											<ul class="uk-list">
												<li v-for="option in seenTimes" :key="option.id">
													<PrettyRadio
														v-model="userData.seenTimes"
														:value="option.value"
														name="seenTimes"
														class="p-radio"
													>
														{{ option.value }}
													</PrettyRadio>
												</li>
											</ul>
										</div>
									</div>
									<div>
										<h5>
											Which of the following ads have you seen?
										</h5>
										<div class="uk-form-controls">
											<ul class="uk-list">
												<li v-for="option in seenMedium" :key="option.id">
													<PrettyCheck v-model="userData.seenMedium" :value="option.value" class="p-icon">
														<i slot="extra" class="icon mdi mdi-check"></i>
														{{ option.value }}
													</PrettyCheck>
													<input v-if="option.input" v-model="userData.seenMediumOther" type="text" class="uk-input uk-display-inline-block uk-form-width-small uk-margin-small-left uk-form-small">
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="uk-margin-large-top">
									<h5>Please choose the best answer for each of the following.</h5>
									<div class="uk-overflow-auto">
										<table class="uk-table uk-table-striped uk-table-small uk-table-middle">
											<thead>
												<tr>
													<th></th>
													<th class="uk-text-center uk-table-shrink uk-text-nowrap uk-table-middle">
														Strongly Agree
													</th>
													<th class="uk-text-center uk-table-shrink uk-text-nowrap uk-table-middle">
														Neutral Agree
													</th>
													<th class="uk-text-center uk-table-shrink uk-text-nowrap uk-table-middle">
														Agree
													</th>
													<th class="uk-text-center uk-table-shrink uk-text-nowrap uk-table-middle">
														Neutral Disagree
													</th>
													<th class="uk-text-center uk-table-shrink uk-text-nowrap uk-table-middle">
														Strongly Disagree
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td class="uk-text-nowrap">
														The claims made in the ads were believable
													</td>
													<td v-for="option in evalOptions" :key="option.id">
														<PrettyRadio v-model="userData.claimsBelievable" :value="option.value" class="p-radio uk-flex uk-flex-center" name="claimsBelievable">
														</PrettyRadio>
													</td>
												</tr>
												<tr>
													<td class="uk-text-nowrap">
														I understood the product being advertised
													</td>
													<td v-for="option in evalOptions" :key="option.id">
														<PrettyRadio v-model="userData.understoodAdd" :value="option.value" class="p-radio uk-flex uk-flex-center" name="understoodAdd">
														</PrettyRadio>
													</td>
												</tr>
												<tr>
													<td class="uk-text-nowrap">
														The ads were creative
													</td>
													<td v-for="option in evalOptions" :key="option.id">
														<PrettyRadio v-model="userData.creativeAdd" :value="option.value" class="p-radio uk-flex uk-flex-center" name="creativeAdd">
														</PrettyRadio>
													</td>
												</tr>
												<tr>
													<td class="uk-text-nowrap">
														The ads were original
													</td>
													<td v-for="option in evalOptions" :key="option.id">
														<PrettyRadio v-model="userData.originalAdd" :value="option.value" class="p-radio uk-flex uk-flex-center" name="originalAdd">
														</PrettyRadio>
													</td>
												</tr>
												<tr>
													<td class="uk-text-nowrap">
														I will remember the ads for a long time
													</td>
													<td v-for="option in evalOptions" :key="option.id">
														<PrettyRadio v-model="userData.rememberAdd" :value="option.value" class="p-radio uk-flex uk-flex-center" name="rememberAdd">
														</PrettyRadio>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="uk-margin-large-top">
									<h5>What did you least like about the ads?</h5>
									<div class="uk-form-controls">
										<ScTextarea v-model="userData.leastLikeDescription" :cols="30" :rows="6" mode="outline"></ScTextarea>
									</div>
								</div>
								<div class="uk-margin-medium-top">
									<button class="sc-button sc-button-primary" type="button">
										Submit
									</button>
								</div>
							</form>
						</ScCardBody>
					</ScCard>
					<div class="uk-margin-top">
						<pre>{{ userData | json }}</pre>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PrettyCheck from 'pretty-checkbox-vue/check';
import PrettyRadio from 'pretty-checkbox-vue/radio';
import ScTextarea from '~/components/Textarea'

export default {
	name: 'FormsExamplesAdvertisingEvaluation',
	components: {
		PrettyCheck,
		PrettyRadio,
		ScTextarea
	},
	data: () => ({
		seenTimes: [
			{
				id: 0,
				value: '0'
			},
			{
				id: 1,
				value: '1'
			},
			{
				id: 2,
				value: '2'
			},
			{
				id: 3,
				value: '3'
			},
			{
				id: 4,
				value: '4'
			},
			{
				id: 5,
				value: '5 or more'
			}
		],
		seenMedium: [
			{
				id: 0,
				value: 'Billboard'
			},
			{
				id: 1,
				value: 'Magazine'
			},
			{
				id: 2,
				value: 'Newspaper'
			},
			{
				id: 3,
				value: 'TV commercial'
			},
			{
				id: 4,
				value: 'Other',
				input: true
			}
		],
		userData: {
			seenTimes: '',
			seenMedium: [],
			seenMediumOther: '',
			claimsBelievable: '',
			understoodAdd: '',
			creativeAdd: '',
			originalAdd: '',
			rememberAdd: '',
			leastLikeDescription: '',
		},
		evalOptions: [
			{
				id: 0,
				value: 'Strongly Agree'
			},
			{
				id: 1,
				value: 'Neutral Agree'
			},
			{
				id: 2,
				value: 'Agree'
			},
			{
				id: 3,
				value: 'Neutral Disagree'
			},
			{
				id: 4,
				value: 'Strongly Disagree'
			}
		]
	})
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
