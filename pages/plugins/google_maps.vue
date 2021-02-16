<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@l uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Markers
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<GmapMap
									:center="map1.center"
									:zoom="map1.zoom"
									:options="map1.options"
									class="sc-gmap"
								>
									<GmapMarker
										v-for="m in markers"
										:key="m.id"
										:position="m.position"
										:title="m.title"
										:clickable="true"
										:icon="markerIcon"
									/>
								</GmapMap>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Route
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<GmapMap
									ref="map2"
									:center="map2.center"
									:zoom="map2.zoom"
									:options="map2.options"
									class="sc-gmap"
									@tilesloaded="setRoute"
								>
								</GmapMap>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Styled
						</ScCardTitle>
						<ScCardBody class="sc-padding-remove">
							<client-only>
								<GmapMap
									:center="map3.center"
									:zoom="map3.zoom"
									:options="map3.options"
									class="sc-gmap"
								>
								</GmapMap>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<div class="uk-flex uk-flex-middle sc-padding sc-padding-medium-ends">
							<ScCardTitle class="uk-width-1-3">
								Autocomplete
							</ScCardTitle>
							<div class="uk-flex-1 uk-margin-left">
								<client-only>
									<GmapAutocomplete :value="autocompleteVal"
										placeholder="Find location"
										:select-first-on-enter="true"
										class="uk-input uk-form-small"
										@place_changed="setPlace"
									>
									</GmapAutocomplete>
								</client-only>
							</div>
						</div>
						<ScCardBody class="sc-padding sc-padding-remove-top">
							<client-only>
								<GmapMap
									:center="map4.center"
									:zoom="map4.zoom"
									:options="map4.options"
									class="sc-gmap"
								>
								</GmapMap>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
if(process.client) {
	require('~/plugins/gmaps')
}

export default {
	name: 'PluginsGoogleMaps',
	data: () => ({
		map1: {
			center: {
				lat: 41.9027835,
				lng: 12.4963655
			},
			zoom: 13
		},
		map2: {
			center: {
				lat: 41.9027835,
				lng: 12.4963655
			},
			zoom: 13
		},
		map3: {
			center: {
				lat: 41.9027835,
				lng: 12.4963655
			},
			zoom: 10,
			options: {
				styles: [
					{
						"featureType": "administrative",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#444444"
							}
						]
					},
					{
						"featureType": "landscape",
						"elementType": "all",
						"stylers": [
							{
								"color": "#f2f2f2"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "all",
						"stylers": [
							{
								"saturation": -100
							},
							{
								"lightness": 45
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "simplified"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "all",
						"stylers": [
							{
								"color": "#46bcec"
							},
							{
								"visibility": "on"
							}
						]
					}
				]
			}
		},
		map4: {
			center: {
				lat: 41.9027835,
				lng: 12.4963655
			},
			zoom: 13
		},
		markerIcon: require('~/assets/img/map-marker-main.svg'),
		markers: [
			{
				id: 1,
				title: 'Romes Colosseum',
				position: {
					lat: 41.8902102,
					lng: 12.4922309
				}
			},
			{
				id: 2,
				title: 'Pantheon',
				position: {
					lat: 41.8986108,
					lng: 12.4768729
				}
			}
		],
		origin: [41.8902102, 12.4922309],
		destination: [41.8991632, 12.4730739],
		autocompleteVal: 'Rome',
		map2Ref: null
	}),
	methods: {
		getRoute () {
			var self = this;
			this.directionsService = new google.maps.DirectionsService();
			this.directionsDisplay = new google.maps.DirectionsRenderer({
				polylineOptions: {
					strokeColor: "#4527A0"
				}
			});
			this.directionsDisplay.setMap(this.$refs.map2.$mapObject);
			self.directionsService.route({
				origin: { lat: this.origin[0], lng: this.origin[1] },
				destination: { lat: this.destination[0], lng: this.destination[1] },
				travelMode: 'DRIVING'
			}, function (response, status) {
				if (status === 'OK') {
					self.directionsDisplay.setDirections(response)
				} else {
					console.log('Directions request failed due to ' + status)
				}
			})
		},
		setPlace (place) {
			if(place) {
				this.map4.center.lat = place.geometry.location.lat();
				this.map4.center.lng = place.geometry.location.lng();
			}
		},
		setRoute () {
			this.$refs.map2.$mapPromise.then(() => {
				this.getRoute()
			})
		}
	}
}
</script>
