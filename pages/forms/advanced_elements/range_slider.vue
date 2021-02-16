<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<div class="uk-child-width-1-3@l uk-child-width-1-2@m uk-grid uk-grid-divider" data-uk-grid>
						<div>
							<client-only>
								<IonRangeSlider v-model="rangeSlider.a"
									:settings="{min: 100, max: 1000}"
								></IonRangeSlider>
							</client-only>
							<span class="sc-color-secondary uk-text-small">Data: {{ rangeSlider.a }}</span>
						</div>
						<div>
							<client-only>
								<IonRangeSlider v-model="rangeSlider.b"
									:settings="{type: 'double', grid: true, min: 0, max: 1000, prefix: '$'}"
								></IonRangeSlider>
							</client-only>
							<span class="sc-color-secondary uk-text-small">Data: {{ rangeSlider.b }}</span>
						</div>
						<div>
							<client-only>
								<IonRangeSlider v-model="rangeSlider.c"
									:settings="{grid: true, from: 5, values: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']}"
								></IonRangeSlider>
							</client-only>
							<span class="sc-color-secondary uk-text-small">Data: {{ rangeSlider.c }}</span>
						</div>
					</div>
					<hr>
					<div class="uk-child-width-1-3@l uk-child-width-1-2@m uk-grid uk-grid-divider" data-uk-grid>
						<div>
							<client-only>
								<IonRangeSlider v-model="rangeSlider.d"
									:settings="{grid: true, min: 18, max: 70, from: 30, prefix: 'Age ', max_postfix: '+'}"
								></IonRangeSlider>
							</client-only>
							<span class="sc-color-secondary uk-text-small">Data: {{ rangeSlider.d }}</span>
						</div>
						<div>
							<client-only>
								<IonRangeSlider v-model="rangeSlider.e"
									:settings="{type: 'double', min: 1000000, max: 2000000, grid: true, force_edges: true}"
								></IonRangeSlider>
							</client-only>
							<span class="sc-color-secondary uk-text-small">Data: {{ rangeSlider.e }}</span>
						</div>
						<div>
							<client-only>
								<IonRangeSlider v-model="rangeSlider.f"
									:settings="{type: 'single', min: 0, max: 10, step: 2.34, grid: true, grid_snap: true}"
								></IonRangeSlider>
							</client-only>
							<span class="sc-color-secondary uk-text-small">Data: {{ rangeSlider.f }}</span>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardTitle>
					Update values and settings
				</ScCardTitle>
				<ScCardBody>
					<div class="uk-grid uk-margin-bottom" data-uk-grid>
						<div class="uk-width-1-2@m">
							<client-only>
								<IonRangeSlider ref="customSlider" v-model="rangeSlider.custom" :settings="rangeSlider.customSettings"></IonRangeSlider>
							</client-only>
						</div>
					</div>
					<div data-uk-margin>
						<button class="sc-button" :disabled="rangeSlider.custom === 2" @click="setSliderValue(2)">
							Set to 2
						</button>
						<button class="sc-button" :disabled="rangeSlider.custom === 4" @click="setSliderValue(4)">
							Set to 4
						</button>
						<button class="sc-button uk-margin-right" :disabled="rangeSlider.custom === 8" @click="setSliderValue(8)">
							Set to 8
						</button>
						<button class="sc-button" @click="setSliderSettings()">
							<span v-if="rangeSlider.defaultCustomSettings">Change</span>
							<span v-else>Restore</span>
							settings
						</button>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FormsAdvancedElementsRangeSlider',
	components: {
		IonRangeSlider: process.client ? () => import('~/components/RangeSlider') : null
	},
	data: () => ({
		rangeSlider: {
			a: 550,
			b: '200;800',
			c: 5,
			d: 30,
			e: '1000000;2000000',
			f: 0,
			custom: 8,
			customSettings: {
				min: 1,
				max: 10
			},
			defaultCustomSettings: true
		}
	}),
	methods: {
		setSliderValue (value) {
			this.rangeSlider.custom = value;
		},
		setSliderSettings () {
			const slider = this.$refs.customSlider;
			if (this.rangeSlider.defaultCustomSettings) {
				slider.changeSettings({
					min: 1,
					max: 20
				})
			} else {
				slider.changeSettings({
					min: 1,
					max: 10
				})
			}
			this.rangeSlider.defaultCustomSettings = !this.rangeSlider.defaultCustomSettings;
		}
	}
}
</script>
