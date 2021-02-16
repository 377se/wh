<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@l uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody>
							<VectorMap :config="vmWorld" class="uk-height-large uk-height-medium@s sc-js-vmap"></VectorMap>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							<VectorMap :config="vmEurope" class="uk-height-large uk-height-medium@s sc-js-vmap" :load-map="['europe']"></VectorMap>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div class="uk-child-width-1-2@l uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody>
							<VectorMap ref="vmUSA" :config="vmUSA" class="uk-height-large uk-height-medium@s sc-js-vmap" :load-map="['usa']"></VectorMap>
							<div>
								<p class="uk-text-mendium sc-color-secondary uk-margin-top uk-margin-small-bottom">
									Select:
								</p>
								<div class="uk-grid uk-grid-medium" data-uk-grid>
									<div>
										<button class="sc-button" @click="selectState('co')">
											Colorado
										</button>
									</div>
									<div>
										<button class="sc-button" @click="selectState('id')">
											Idaho
										</button>
									</div>
									<div>
										<button class="sc-button" @click="selectState('tx')">
											Texas
										</button>
									</div>
								</div>
								<p class="uk-text-mendium sc-color-secondary uk-margin-top uk-margin-small-bottom">
									Select (deselect others):
								</p>
								<div class="uk-grid uk-grid-medium" data-uk-grid>
									<div>
										<button class="sc-button" @click="selectState('pa', true)">
											Pensylwania
										</button>
									</div>
									<div>
										<button class="sc-button" @click="selectState('ny', true)">
											New York
										</button>
									</div>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardHeader :separator="vmMultiMap">
							<div class="uk-flex-middle uk-grid-small uk-grid" data-uk-grid>
								<div class="uk-flex-1">
									<h5 class="uk-margin-remove">
										Select map to load
									</h5>
								</div>
								<div class="uk-width-1-3@s">
									<select name="sc-js-vmap-select" class="uk-select" @change="loadMap">
										<option value="">
											Select...
										</option>
										<option value="world_en">
											World
										</option>
										<optgroup label="Countries">
											<option value="algeria_fr">
												Algeria
											</option>
											<option value="argentina_en">
												Argentina
											</option>
											<option value="brazil_br">
												Brazil
											</option>
											<option value="canada_en">
												Canada
											</option>
											<option value="china_en">
												China
											</option>
											<option value="france_fr">
												France
											</option>
											<option value="germany_en">
												Germany
											</option>
											<option value="greece_en">
												Greece
											</option>
											<option value="india_en">
												India
											</option>
											<option value="iran_ir">
												Iran
											</option>
											<option value="iraq_en">
												Iraq
											</option>
											<option value="poland_en">
												Poland
											</option>
											<option value="russia_en">
												Russia
											</option>
											<option value="tunisia_en">
												Tunisia
											</option>
											<option value="turkey_en">
												Turkey
											</option>
											<option value="usa_en">
												USA
											</option>
										</optgroup>
										<optgroup label="Continents">
											<option value="africa_en">
												Africa
											</option>
											<option value="asia_en">
												Asia
											</option>
											<option value="australia_en">
												Australia
											</option>
											<option value="europe_en">
												Europe
											</option>
											<option value="north_america_en">
												North America
											</option>
											<option value="south_america_en">
												South America
											</option>
										</optgroup>
									</select>
								</div>
							</div>
						</ScCardHeader>
						<ScCardBody v-if="vmMultiMap">
							<VectorMap
								v-if="vmMultiMap"
								:key="vmMultiMap"
								class="sc-js-vmap"
								:config="vmMulti"
								:class="{'uk-height-large': vmMultiMap}"
								:load-map="['world', 'europe', 'usa', 'africa', 'algeria', 'argentina', 'asia', 'australia', 'brazil', 'canada', 'china', 'europe', 'france', 'germany', 'greece', 'india', 'iran', 'iraq', 'north_america', 'poland', 'russia', 'south_america', 'tunisia', 'turkey']"
							></VectorMap>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { VectorMap } from '~/components/vector-map';

if(process.client) {
	require('~/assets/icons/flags/flags.css');
}

export default {
	name: 'PluginsVectorMaps',
	components: {
		VectorMap
	},
	data: () => ({
		vmWorld: {
			map: 'world_en',
			backgroundColor: '#fff',
			borderOpacity: 0.25,
			hoverColor: '#424242',
			selectedColor: '#424242',
			scaleColors: ['#2E7D32', '#66BB6A'],
			normalizeFunction: 'polynomial',
			values: {
				"af": "16.63",
				"al": "11.58",
				"dz": "158.97",
				"ao": "85.81",
				"ag": "1.1",
				"ar": "351.02",
				"am": "8.83",
				"au": "1219.72",
				"at": "366.26",
				"az": "52.17",
				"bs": "7.54",
				"bh": "21.73",
				"bd": "105.4",
				"bb": "3.96",
				"by": "52.89",
				"be": "461.33",
				"bz": "1.43",
				"bj": "6.49",
				"bt": "1.4",
				"bo": "19.18",
				"ba": "16.2",
				"bw": "12.5",
				"br": "2023.53",
				"bn": "11.96",
				"bg": "44.84",
				"bf": "8.67",
				"bi": "1.47",
				"kh": "11.36",
				"cm": "21.88",
				"ca": "1563.66",
				"cv": "1.57",
				"cf": "2.11",
				"td": "7.59",
				"cl": "199.18",
				"cn": "5745.13",
				"co": "283.11",
				"km": "0.56",
				"cd": "12.6",
				"cg": "11.88",
				"cr": "35.02",
				"ci": "22.38",
				"hr": "59.92",
				"cy": "22.75",
				"cz": "195.23",
				"dk": "304.56",
				"dj": "1.14",
				"dm": "0.38",
				"do": "50.87",
				"ec": "61.49",
				"eg": "216.83",
				"sv": "21.8",
				"gq": "14.55",
				"er": "2.25",
				"ee": "19.22",
				"et": "30.94",
				"fj": "3.15",
				"fi": "231.98",
				"fr": "2555.44",
				"ga": "12.56",
				"gm": "1.04",
				"ge": "11.23",
				"de": "3305.9",
				"gh": "18.06",
				"gr": "305.01",
				"gd": "0.65",
				"gt": "40.77",
				"gn": "4.34",
				"gw": "0.83",
				"gy": "2.2",
				"ht": "6.5",
				"hn": "15.34",
				"hk": "226.49",
				"hu": "132.28",
				"is": "12.77",
				"in": "1430.02",
				"id": "695.06",
				"ir": "337.9",
				"iq": "84.14",
				"ie": "204.14",
				"il": "201.25",
				"it": "2036.69",
				"jm": "13.74",
				"jp": "5390.9",
				"jo": "27.13",
				"kz": "129.76",
				"ke": "32.42",
				"ki": "0.15",
				"kr": "986.26",
				"undefined": "5.73",
				"kw": "117.32",
				"kg": "4.44",
				"la": "6.34",
				"lv": "23.39",
				"lb": "39.15",
				"ls": "1.8",
				"lr": "0.98",
				"ly": "77.91",
				"lt": "35.73",
				"lu": "52.43",
				"mk": "9.58",
				"mg": "8.33",
				"mw": "5.04",
				"my": "218.95",
				"mv": "1.43",
				"ml": "9.08",
				"mt": "7.8",
				"mr": "3.49",
				"mu": "9.43",
				"mx": "1004.04",
				"md": "5.36",
				"mn": "5.81",
				"me": "3.88",
				"ma": "91.7",
				"mz": "10.21",
				"mm": "35.65",
				"na": "11.45",
				"np": "15.11",
				"nl": "770.31",
				"nz": "138",
				"ni": "6.38",
				"ne": "5.6",
				"ng": "206.66",
				"no": "413.51",
				"om": "53.78",
				"pk": "174.79",
				"pa": "27.2",
				"pg": "8.81",
				"py": "17.17",
				"pe": "153.55",
				"ph": "189.06",
				"pl": "438.88",
				"pt": "223.7",
				"qa": "126.52",
				"ro": "158.39",
				"ru": "1476.91",
				"rw": "5.69",
				"ws": "0.55",
				"st": "0.19",
				"sa": "434.44",
				"sn": "12.66",
				"rs": "38.92",
				"sc": "0.92",
				"sl": "1.9",
				"sg": "217.38",
				"sk": "86.26",
				"si": "46.44",
				"sb": "0.67",
				"za": "354.41",
				"es": "1374.78",
				"lk": "48.24",
				"kn": "0.56",
				"lc": "1",
				"vc": "0.58",
				"sd": "65.93",
				"sr": "3.3",
				"sz": "3.17",
				"se": "444.59",
				"ch": "522.44",
				"sy": "59.63",
				"tw": "426.98",
				"tj": "5.58",
				"tz": "22.43",
				"th": "312.61",
				"tl": "0.62",
				"tg": "3.07",
				"to": "0.3",
				"tt": "21.2",
				"tn": "43.86",
				"tr": "729.05",
				"tm": 0,
				"ug": "17.12",
				"ua": "136.56",
				"ae": "239.65",
				"gb": "2258.57",
				"us": "14624.18",
				"uy": "40.71",
				"uz": "37.72",
				"vu": "0.72",
				"ve": "285.21",
				"vn": "101.99",
				"ye": "30.02",
				"zm": "15.69",
				"zw": "5.57"
			}
		},
		vmUSA: {
			map: 'usa_en',
			backgroundColor: '#fff',
			borderOpacity: 0.25,
			borderColor: '#37474F',
			color: '#37474F',
			hoverColor: false,
			selectedColor: '#e53935',
			selectedRegions: ['CA', 'FL']
		},
		vmMultiMap: null,
		vmMulti: {}
	}),
	computed: {
		vmEurope () {
			return {
				map: 'europe_en',
				backgroundColor: '#fff',
				borderOpacity: 0.25,
				color: '#0288D1',
				hoverColor: '#01579B',
				selectedColor: '#01579B',
				selectedRegions: ['FR', 'PL', 'ES'],
				pins: {
					'fr': this.escapeXml('<span class="jqvmap-pin-bg-dark"><span class="flag flag-fr"></span></span>'),
					'pl': this.escapeXml('<span class="jqvmap-pin-bg-light">Poland</span>'),
					'es': this.escapeXml('<span class="jqvmap-pin-bg-dark">Spain</span>')
				},
				showTooltip: false
			}
		}
	},
	methods: {
		escapeXml (string) {
			return string.replace(/[<>]/g, function (c) {
				switch (c) {
				case '<': return '\u003c';
				case '>': return '\u003e';
				}
			});
		},
		loadMap (e) {
			this.vmMultiMap = e.target.value;
			this.vmMulti = {
				map: this.vmMultiMap,
				backgroundColor: '#fff',
				borderOpacity: 0.25,
				hoverColor: '#757575',
				selectedColor: '#0288D1'
			}
		},
		selectState (state, deselectOthers) {
			if(deselectOthers) {
				this.$refs.vmUSA.deselect()
			}
			this.$refs.vmUSA.select(state)
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/plugins/jqvmap.scss';
</style>
