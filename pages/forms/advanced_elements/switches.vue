<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardTitle>
					Switches
				</ScCardTitle>
				<ScCardBody>
					<div class="uk-child-width-1-4@m uk-grid" data-uk-grid>
						<div>
							<PrettyCheck v-model="switchA" class="p-switch">
								Checked
							</PrettyCheck>
						</div>
						<div>
							<PrettyCheck v-model="switchB" class="p-switch" :disabled="switchBDisabled">
								Disabled
							</PrettyCheck>
						</div>
						<div>
							<PrettyCheck v-model="switchC" class="p-switch" disabled>
								Checked & Disabled
							</PrettyCheck>
						</div>
					</div>
					<p class="uk-margin uk-margin-large-top uk-heading-line">
						<span>Colors</span>
					</p>
					<div class="uk-child-width-1-4@m uk-grid" data-uk-grid>
						<div>
							<PrettyCheck v-model="switchD" class="p-switch" color="primary">
								Primary
							</PrettyCheck>
						</div>
						<div>
							<PrettyCheck v-model="switchE" class="p-switch" color="success">
								Success
							</PrettyCheck>
						</div>
						<div>
							<PrettyCheck v-model="switchF" class="p-switch" color="danger">
								Danger
							</PrettyCheck>
						</div>
						<div>
							<PrettyCheck v-model="switchG" class="p-switch" color="warning">
								Warning
							</PrettyCheck>
						</div>
					</div>
					<p class="uk-margin uk-margin-large-top uk-heading-line">
						<span>Group</span>
					</p>
					<div class="uk-child-width-1-4@m uk-grid" data-uk-grid>
						<div>
							<PrettyRadio v-model="switchGroup" :value="switchGroupItems.a" class="p-switch" name="p-switch-group">
								Radio 1
							</PrettyRadio>
						</div>
						<div>
							<PrettyRadio v-model="switchGroup" :value="switchGroupItems.b" class="p-switch" name="p-switch-group">
								Radio 2
							</PrettyRadio>
						</div>
						<div>
							<PrettyRadio v-model="switchGroup" :value="switchGroupItems.c" class="p-switch" name="p-switch-group">
								Radio 3
							</PrettyRadio>
						</div>
					</div>
					<p class="uk-margin uk-margin-large-top uk-heading-line">
						<span>Manual Toggle</span>
					</p>
					<div class="uk-child-width-1-4@m uk-grid" data-uk-grid>
						<div>
							<PrettyCheck v-model="switchH" class="p-switch">
								Label on
								<label slot="off-label">
									Label off
								</label>
							</PrettyCheck>
						</div>
						<div>
							<button class="sc-button sc-button-small" @click="switchH = !switchH">
								Toggle
							</button>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
import PrettyCheck from 'pretty-checkbox-vue/check';
import PrettyRadio from 'pretty-checkbox-vue/radio';

export default {
	name: 'FormsAdvancedElementsSwitches',
	components: {
		PrettyCheck,
		PrettyRadio
	},
	data: () => ({
		switchA: true,
		switchB: false,
		switchBDisabled: true,
		switchC: true,
		switchD: true,
		switchE: true,
		switchF: true,
		switchG: true,
		switchH: false,
		switchGroup: 'radio 2',
		switchGroupItems: {
			a: 'radio 1',
			b: 'radio 2',
			c: 'radio 3'
		},
	})
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
