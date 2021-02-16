<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
					Tourist Attractions in Rome
				</h1>
				<div class="uk-margin-left uk-visible@m">
					<a href="javascript:void(0)" class="sc-button sc-button-icon sc-button-secondary sc-button-small">
						<i class="mdi mdi-plus sc-icon-18"></i> Add POI
					</a>
				</div>
			</div>
		</div>
		<div id="sc-page-wrapper-inner" class="uk-flex">
			<div id="sc-page-aside" class="md-bg-white uk-visible@m">
				<div class="sc-page-aside-body sc-padding-medium">
					<ul class="uk-list uk-list-divider sc-list-clickable sc-js-poi-list">
						<li
							v-for="(poi, index) in poiList"
							:key="poi.id"
							class="uk-flex-column sc-flex-items-left"
							:class="{ 'uk-active': currentMarker.id === poi.id }"
							@click="toggleInfoWindow(poi, index)"
						>
							<span v-if="poi.main" class="sc-text-semibold md-color-red-600">
								{{ poi.title }}
							</span>
							<p v-else class="sc-text-semibold uk-margin-remove uk-text-truncate" :title="poi.title">
								{{ poi.title }}
							</p>
							<p class="sc-color-secondary uk-text-truncate uk-margin-remove" :title="poi.address">
								{{ poi.address }}
							</p>
						</li>
					</ul>
				</div>
			</div>
			<div id="sc-page-content" class="sc-padding-remove">
				<client-only>
					<GmapMap
						ref="gMap"
						:center="map.center"
						:zoom="map.zoom"
						:options="map.options"
						class="uk-height-1-1"
					>
						<GmapMarker
							v-for="(m, index) in poiList"
							:key="m.id"
							:ref="'mObj_' + (index + 1)"
							:position="m.position"
							:clickable="true"
							:icon="m.main ? markersConfig.iconMain : markersConfig.icon"
							@click="toggleInfoWindow(m, index)"
						/>
						<InfoWindow
							v-if="isWindowOpen"
							:marker-obj="currentMarkerObject"
							:marker="currentMarker"
							@close="onInfoWindowClose"
						>
						</InfoWindow>
					</GmapMap>
				</client-only>
			</div>
		</div>
		<client-only>
			<ScOffcanvas ref="offcanvas">
				<ul class="uk-list uk-list-divider sc-list-clickable sc-js-poi-list">
					<li
						v-for="(poi, index) in poiList"
						:key="poi.id"
						class="uk-flex-column sc-flex-items-left"
						:class="{ 'uk-active': currentMarker.id === poi.id }"
						@click="toggleInfoWindow(poi, index)"
					>
						<span v-if="poi.main" class="sc-text-semibold md-color-red-600">
							{{ poi.title }}
						</span>
						<p v-else class="sc-text-semibold uk-margin-remove uk-text-truncate" :title="poi.title">
							{{ poi.title }}
						</p>
						<p class="sc-color-secondary uk-text-truncate uk-margin-remove" :title="poi.address">
							{{ poi.address }}
						</p>
					</li>
				</ul>
			</ScOffcanvas>
		</client-only>
	</div>
</template>
<script>
import { scMq } from '~/assets/js/utils'

if(process.client) {
	require('~/plugins/gmaps')
}

export default {
	name: 'PagesPoiListing',
	components: {
		InfoWindow: process.client ? () => import('~/components/InfoWindow') : null,
		ScOffcanvas: process.client ? () => import('~/components/Offcanvas') : null
	},
	data: () => ({
		map: {
			center: {
				lat: 41.9027835,
				lng: 12.4963655
			},
			zoom: 13,
			options: {
				styles: [
					{
						"featureType": "water",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#e9e9e9"
							},
							{
								"lightness": 17
							}
						]
					},
					{
						"featureType": "landscape",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#f5f5f5"
							},
							{
								"lightness": 20
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#ffffff"
							},
							{
								"lightness": 17
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#ffffff"
							},
							{
								"lightness": 29
							},
							{
								"weight": 0.2
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#ffffff"
							},
							{
								"lightness": 18
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#ffffff"
							},
							{
								"lightness": 16
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "geometry",
						"stylers": [
							{
								"lightness": 10
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#dedede"
							},
							{
								"lightness": 21
							}
						]
					},
					{
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"visibility": "on"
							},
							{
								"color": "#ffffff"
							},
							{
								"lightness": 16
							}
						]
					},
					{
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"saturation": 36
							},
							{
								"color": "#333333"
							},
							{
								"lightness": 40
							}
						]
					},
					{
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#f2f2f2"
							},
							{
								"lightness": 19
							}
						]
					},
					{
						"featureType": "administrative",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#fefefe"
							},
							{
								"lightness": 20
							}
						]
					},
					{
						"featureType": "administrative",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#fefefe"
							},
							{
								"lightness": 17
							},
							{
								"weight": 1.2
							}
						]
					}
				]
			}
		},
		markersConfig: {
			icon: require('~/assets/img/map-marker.svg'),
			iconMain: require('~/assets/img/map-marker-main.svg')
		},
		poiList: [
			{
				id: 0,
				title: "Rome",
				main: true,
				info: "Rome is the capital city of Italy and a special comune (named Comune di Roma Capitale). Rome also serves as the capital of the Lazio region. With 2,872,800 residents in 1,285 km2 (496.1 sq mi),[1] it is also the country's most populated comune. It is the fourth-most populous city in the European Union by population within city limits. It is the centre of the Metropolitan City of Rome, which has a population of 4.3 million residents.[2] Rome is located in the central-western portion of the Italian Peninsula, within Lazio (Latium), along the shores of the Tiber. The Vatican City is an independent country inside the city boundaries of Rome, the only existing example of a country within a city: for this reason Rome has been often defined as capital of two states.[3][4]<br>Rome's history spans 28 centuries. While Roman mythology dates the founding of Rome at around 753 BC, the site has been inhabited for much longer, making it one of the oldest continuously occupied sites in Europe.[5] The city's early population originated from a mix of Latins, Etruscans, and Sabines. Eventually, the city successively became the capital of the Roman Kingdom, the Roman Republic and the Roman Empire, and is regarded as the birthplace of Western civilisation and by some as the first ever metropolis.[6] It was first called The Eternal City (Latin: Urbs Aeterna; Italian: La Citt\\u00E0 Eterna) by the Roman poet Tibullus in the 1st century BC, and the expression was also taken up by Ovid, Virgil, and Livy.[7][8] Rome is also called the \\\"Caput Mundi\\\" (Capital of the World). After the fall of the Western Empire, which marked the beginning of the Middle Ages, Rome slowly fell under the political control of the Papacy, which had settled in the city since the 1st century AD, until in the 8th century it became the capital of the Papal States, which lasted until 1870. Beginning with the Renaissance, almost all the popes since Nicholas V (1447-1455) pursued over four hundred years a coherent architectural and urban programme aimed at making the city the artistic and cultural centre of the world.[9] In this way, Rome became first one of the major centres of the Italian Renaissance,[10] and then the birthplace of both the Baroque style and Neoclassicism. Famous artists, painters, sculptors and architects made Rome the centre of their activity, creating masterpieces throughout the city. In 1871, Rome became the capital of the Kingdom of Italy, which, in 1946, became the Italian Republic.<br>Rome has the status of a global city.[11][12][13] In 2016, Rome ranked as the 14th-most-visited city in the world, 3rd most visited in the European Union, and the most popular tourist attraction in Italy.[14] Its historic centre is listed by UNESCO as a World Heritage Site.[15] Monuments and museums such as the Vatican Museums and the Colosseum are among the world's most visited tourist destinations with both locations receiving millions of tourists a year, and the city hosted the 1960 Summer Olympics. Rome is the seat of several specialized agencies of the United Nations, such as the Food and Agriculture Organization (FAO), the World Food Programme (WFP) and the International Fund for Agricultural Development (IFAD). The city hosts the headquarters of many international business companies, such as Eni, Enel, TIM, Leonardo S.p.A., and national and international banks such as Unicredit and BNL. Its business district, called EUR, is the base of many companies involved in the oil industry, the pharmaceutical industry, and financial services. Rome is also an important fashion and design centre thanks to renowned international brands centered in the city. Rome's Cinecittà Studios have been the set of many Academy Award-winning movies.",
				position: {
					lat: 41.9027835,
					lng: 12.4963655
				},
				link: {
					url: 'https://en.wikipedia.org/wiki/Rome',
					text: 'Wikipedia'
				}
			},
			{
				id: 1,
				"title": "Romes Colosseum",
				"address": "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
				position: {
					lat: 41.8902102,
					lng: 12.4922309
				},
				link: {
					url: 'https://en.wikipedia.org/wiki/Colosseum',
					text: 'Wikipedia'
				}
			},
			{
				id: 2,
				title: "St. Peter's Basilica",
				address: "Piazza San Pietro, 00120 Città del Vaticano, Vatican City",
				position: {
					lat: 41.9021667,
					lng: 12.4539367
				},
				link: {
					url: 'https://en.wikipedia.org/wiki/St._Peter%27s_Basilica',
					text: 'Wikipedia'
				}
			},
			{
				id: 3,
				title: "Pantheon",
				address: "Piazza della Rotonda, 00186 Roma RM, Italy",
				position: {
					lat: 41.8986108,
					lng: 12.4768729
				},
				link: {
					url: 'https://en.wikipedia.org/wiki/Pantheon,_Rome',
					text: 'Wikipedia'
				}
			},
			{
				id: 4,
				title: "Vatican Museums",
				address: "Viale Vaticano, 00165 Roma RM, Italy",
				position: {
					lat: 41.9064878,
					lng: 12.4536413
				},
				link: {
					url: 'https://en.wikipedia.org/wiki/Vatican_Museums',
					text: 'Wikipedia'
				}
			},
			{
				id: 5,
				title: "Trevi Fountain",
				address: "Piazza di Trevi, 00187 Roma RM, Italy",
				position: {
					lat: 41.9009569,
					lng: 12.4832944
				},
				link: {
					url: 'https://en.wikipedia.org/wiki/Trevi_Fountain',
					text: 'Wikipedia'
				}
			},
			{
				id: 6,
				title: "Spanish Steps",
				address: "Piazza di Spagna, 00187 Roma RM, Italy",
				position: {
					lat: 41.90599,
					lng: 12.482775,
				},
				link: {
					url: 'https://en.wikipedia.org/wiki/Spanish_Steps',
					text: 'Wikipedia'
				}
			},
			{
				id: 7,
				title: "Roman Forum",
				address: "Via della Salara Vecchia, 5/6, 00186 Roma RM, Italy",
				position: {
					lat: 41.8924623,
					lng: 12.485325
				},
				link: {
					url: 'https://en.wikipedia.org/wiki/Roman_Forum',
					text: 'Wikipedia'
				}
			},
			{
				id: 8,
				title: "Castel Sant'Angelo",
				address: "Lungotevere Castello, 50, 00193 Roma RM, Italy",
				position: {
					lat: 41.9030632,
					lng: 12.466276
				},
				link: {
					url: 'https://en.wikipedia.org/wiki/Castel_Sant%27Angelo',
					text: 'Wikipedia'
				}
			},
			{
				id: 9,
				title: "Piazza Navona",
				address: "Piazza Navona, 00186 Roma RM, Italy",
				position: {
					lat: 41.8991632,
					lng: 12.4730739
				},
				link: {
					url: 'https://en.wikipedia.org/wiki/Piazza_Navona',
					text: 'Wikipedia'
				}
			},
			{
				id: 10,
				title: "Campo de' Fiori",
				address: "Piazza Campo de' Fiori, 00186 Roma RM, Italy",
				position: {
					lat: 41.8955854,
					lng: 12.4721632
				},
				link: {
					url: 'https://en.wikipedia.org/wiki/Piazza_Navona',
					text: 'Wikipedia'
				}
			},
			{
				id: 11,
				title: "Saint Peter's Square",
				address: "Piazza San Pietro, 00120 Città del Vaticano, Vatican City",
				position: {
					lat: 41.902218,
					lng: 12.456796
				},
				link: {
					url: 'https://en.wikipedia.org/wiki/St._Peter%27s_Square',
					text: 'Wikipedia'
				}
			},
			{
				id: 12,
				title: "Basilica di Santa Maria Maggiore",
				address: "Piazza di S. Maria Maggiore, 42, 00100 Roma RM, Italy",
				position: {
					lat: 41.8975986,
					lng: 12.4984084
				},
				link: {
					url: 'https://en.wikipedia.org/wiki/Santa_Maria_Maggiore',
					text: 'Wikipedia'
				}
			}
		],
		currentMarker: {},
		currentMarkerIndex: null,
		currentMarkerObject: {},
		isWindowOpen: false
	}),
	mounted () {
		this.$store.commit('setPageFixed', true);
		this.$nextTick(() => {
			// fit all markers
			this.fitBounds();
		})
	},
	beforeDestroy () {
		this.$store.commit('setPageFixed', false);
	},
	methods: {
		toggleInfoWindow (m, index) {
			this.currentMarkerObject = this.$refs['mObj_' + (index + 1)][0].$markerObject;
			if (this.currentMarkerIndex === index) {
			 	this.isWindowOpen = !this.isWindowOpen;
				this.currentMarker = {};
			} else {
				this.currentMarkerIndex = index;
				this.currentMarker = m;
				this.map.center = m.position;
			 	this.isWindowOpen = true;
			}
			// hide offcanvas on small devices
			if(scMq.mediumMax()) {
				this.$refs.offcanvas.hide();
			}
		},
		fitBounds () {
			return this.$refs.gMap.$mapPromise.then(() => {
				const size = this.poiList.length;
				if (size > 1) {
					const bounds = new google.maps.LatLngBounds();
					this.poiList.forEach((marker) => {
						bounds.extend({ lat: marker.position.lat, lng: marker.position.lng});
					});
					this.$refs.gMap.fitBounds(bounds);
				}
			});
		},
		onInfoWindowClose () {
			this.currentMarker = {};
			this.isWindowOpen = false
		}
	}
}
</script>
