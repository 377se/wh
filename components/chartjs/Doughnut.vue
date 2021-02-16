<script>
import { Doughnut } from 'vue-chartjs'
export default {
	name: 'ChartJsDoughnut',
	extends: Doughnut,
	props: {
		data: {
			type: Object,
			default () { return {} }
		},
		options: {
			type: Object,
			default () { return {} }
		}
	},
	mounted () {
		this.renderChart(this.data, this.options)
	}
}
</script>
