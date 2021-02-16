<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Checkboxes
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
								<div>
									<ul class="uk-list">
										<li>
											<PrettyCheck class="p-icon">
												<i slot="extra" class="icon mdi mdi-check"></i>
												Default
											</PrettyCheck>
										</li>
										<li>
											<PrettyCheck class="p-icon" checked>
												<i slot="extra" class="icon mdi mdi-check"></i>
												Checked
											</PrettyCheck>
										</li>
										<li>
											<PrettyCheck class="p-icon" disabled>
												<i slot="extra" class="icon mdi mdi-check"></i>
												Disabled
											</PrettyCheck>
										</li>
										<li>
											<PrettyCheck class="p-icon" checked disabled>
												<i slot="extra" class="icon mdi mdi-check"></i>
												Disabled &amp; checked
											</PrettyCheck>
										</li>
									</ul>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Radio Buttons
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<ul class="uk-list">
										<li>
											<PrettyRadio class="p-radio" name="p-radio-a">
												Default
											</PrettyRadio>
										</li>
										<li>
											<PrettyRadio class="p-radio" name="p-radio-b" checked>
												Checked
											</PrettyRadio>
										</li>
										<li>
											<PrettyRadio class="p-radio" name="p-radio-c" disabled>
												Disabled
											</PrettyRadio>
										</li>
										<li>
											<PrettyRadio class="p-radio" name="p-radio-d" checked disabled>
												Disabled & Checked
											</PrettyRadio>
										</li>
									</ul>
								</div>
								<div>
									<ul class="uk-list">
										<li>
											<PrettyRadio v-model="prettyRadioGroup" :value="prettyRadioGroupItems.a" class="p-radio" name="p-radio-group">
												Radio 1
											</PrettyRadio>
										</li>
										<li>
											<PrettyRadio v-model="prettyRadioGroup" :value="prettyRadioGroupItems.b" class="p-radio" name="p-radio-group">
												Radio 2
											</PrettyRadio>
										</li>
										<li>
											<PrettyRadio v-model="prettyRadioGroup" :value="prettyRadioGroupItems.c" class="p-radio" name="p-radio-group">
												Radio 3
											</PrettyRadio>
										</li>
									</ul>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PrettyCheck from 'pretty-checkbox-vue/check';
import PrettyRadio from 'pretty-checkbox-vue/radio';

export default {
	name: 'FormsAdvancedElementsCheckboxRadio',
	components: {
		PrettyCheck,
		PrettyRadio
	},
	data: () => ({
		prettyCheckboxModel: true,
		prettyRadioGroup: {},
		prettyRadioGroupItems: {
			a: 'item 1',
			b: 'item 2',
			c: 'item 3',
		},
		prettySwitchGroup: {},
		prettySwitchGroupItems: {
			a: 'item 1',
			b: 'item 2',
			c: 'item 3',
		}
	})
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
