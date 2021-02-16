<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-grid" data-uk-grid>
				<div v-for="color in colors" :key="color[0]" class="uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s">
					<ScCard>
						<ScCardBody>
							<h5>{{ color[0] }}</h5>
							<div v-if="color[2]">
								<div v-for="(variant,index) in variantsAccent" :key="variant" style="padding:12px 8px;" :class="setClass(index, color[0], color[1], variant)">
									<small>.md-bg-{{ color[0] }}-{{ variant }}</small>
									<br><small>.md-color-{{ color[0] }}-{{ variant }}</small>
								</div>
							</div>
							<div v-if="!color[2]">
								<div v-for="(variant, index) in variantsNoAccent" :key="variant" style="padding:12px 8px;" :class="setClass(index, color[0], color[1], variant)">
									<small>.md-bg-{{ color[0] }}-{{ variant }}</small>
									<br><small>.md-color-{{ color[0] }}-{{ variant }}</small>
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
export default {
	name: 'ComponentsColorPalette',
	data: () => ({
		variantsAccent: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'a100', 'a200', 'a400', 'a700'],
		variantsNoAccent: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
		colors: [
			['red', [1, 2, 3, 4, 11], true],
			['pink', [1, 2, 3, 11], true],
			['purple', [1, 2, 3, 11], true],
			['deep-purple', [1, 2, 3, 11], true],
			['indigo', [1, 2, 3, 11], true],
			['blue', [1, 2, 3, 4, 5, 11], true],
			['light-blue', [1, 2, 3, 4, 5, 6, 11, 12, 13], true],
			['cyan', [1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14], true],
			['teal', [1, 2, 3, 4, 5, 11, 12, 13, 14], true],
			['green', [1, 2, 3, 4, 5, 6, 11, 12, 13, 14], true],
			['light-green', [1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14], true],
			['lime', [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14], true],
			['yellow', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], true],
			['amber', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], true],
			['orange', [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14], true],
			['deep-orange', [1, 2, 3, 4, 5, 11, 12], true],
			['brown', [1, 2, 3], false],
			['grey', [1, 2, 3, 4, 5, 6], false],
			['blue-grey', [1, 2, 3, 4], false]
		]
	}),
	methods: {
		setClass (index, name, lightTextArray, variant ) {
			var lightText = lightTextArray.indexOf(index + 1) > -1 ? '' : ' md-color-white';
			return 'md-bg-' + name + '-' + variant + lightText
		}
	}
}
</script>
