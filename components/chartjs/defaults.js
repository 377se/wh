let Chart = {};
import { state } from '~/store'
if(process.client) {
	Chart = require('chart.js');
	Chart.defaults.global.defaultFontFamily = "'Roboto', 'Helvetica', 'Arial', sans-serif";
	Chart.defaults.global.defaultFontColor = "rgba(0,0,0,.87)";
	Chart.defaults.global.title.fontFamily = "'Roboto', 'Helvetica', 'Arial', sans-serif";
	Chart.defaults.global.title.fontColor = "rgba(0,0,0,.87)";
	Chart.defaults.global.title.fontSize = 14;
	Chart.defaults.global.title.fontStyle = '500';
	Chart.defaults.global.tooltips.titleMarginBottom = 10;
	Chart.defaults.global.tooltips.titleFontFamily = "'Roboto', 'Helvetica', 'Arial', sans-serif";
	Chart.defaults.global.tooltips.bodyFontFamily = "'Roboto', 'Helvetica', 'Arial', sans-serif";
	Chart.defaults.global.tooltips.footerFontFamily = "'Roboto', 'Helvetica', 'Arial', sans-serif";
	Chart.defaults.global.tooltips.cornerRadius = 4;
	Chart.defaults.global.tooltips.bodySpacing = 8;
	Chart.defaults.global.tooltips.caretSize = 4;
	Chart.defaults.global.tooltips.xPadding = 8;
	Chart.defaults.global.tooltips.yPadding = 8;
	Chart.defaults.global.legend.labels.boxWidth = 24;
	Chart.defaults.global.legend.labels.fontFamily = "'Roboto', 'Helvetica', 'Arial', sans-serif";
	Chart.defaults.global.legend.labels.fontColor = "rgba(0,0,0,.87)";
	if (state().vxAppTheme === 'theme-dark') {
		Chart.defaults.global.defaultFontColor = "rgba(255,255,255,.87)";
		Chart.defaults.global.title.fontColor = "rgba(255,255,255,.87)";
		Chart.defaults.global.legend.labels.fontColor = "rgba(255,255,255,.87)";
		Chart.defaults.scale.gridLines.color = "rgba(255,255,255,.2)";
	}
}

export default Chart
