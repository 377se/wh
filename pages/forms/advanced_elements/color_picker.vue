<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardTitle>
					Colorpicker
				</ScCardTitle>
				<ScCardBody>
					<div class="uk-grid" data-uk-grid>
						<div class="uk-width-1-3@m">
							<label>Default</label>
							<div>
								<client-only>
									<ScColorpicker v-model="cpColor1" size="large" :close-on-select="false"></ScColorpicker>
								</client-only>
							</div>
							<span class="uk-form-help-block uk-margin-remove-left">
								closeOnSelect: false
							</span>
						</div>
						<div class="uk-width-1-3@m">
							<label>Selected color</label>
							<div>
								<client-only>
									<ScColorpicker v-model="cpColor2" size="large"></ScColorpicker>
								</client-only>
							</div>
						</div>
						<div class="uk-width-1-3@m">
							<label>Right aligned</label>
							<div class="uk-flex uk-flex-right">
								<client-only>
									<ScColorpicker v-model="cpColor2" size="large"></ScColorpicker>
								</client-only>
							</div>
						</div>
						<div class="uk-width-1-2@m">
							<label>Inline</label>
							<div>
								<client-only>
									<ScColorpicker v-model="cpColor3" :inline="true"></ScColorpicker>
								</client-only>
							</div>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FormsAdvancedElementsColorPicker',
	components: {
		ScColorpicker: process.client ? () => import('~/components/Colorpicker') : null,
	},
	data: () => ({
		cpColor1: '',
		cpColor2: '#039be5',
		cpColor3: ''
	})
}
</script>
