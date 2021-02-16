import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyC2FodI8g-iCz1KHRFE7_4r8MFLA7Zbyhk',
		libraries: 'places'
	}
});
