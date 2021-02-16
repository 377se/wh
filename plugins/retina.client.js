import Vue from 'vue'
import VueRetina from './vue-retina'
const retina = require('~/assets/js/vendor/retina').retinajs || require('~/assets/js/vendor/retina');

Vue.use(VueRetina, {retina});
