require('~/plugins/jquery');
require('~/plugins/velocity.client.js');
window.moment = require('moment');
require('~/assets/js/vendor/jquery.kinetic');
require('~/assets/js/vendor/jquery-ui');
require('~/assets/js/vendor/jquery.gantt-chart');

import Chart from './Chart'

Chart.install = function (Vue) {
	Vue.component(Chart.name, Chart);
};

export default Chart;
