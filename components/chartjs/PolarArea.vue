<script>
import { PolarArea } from 'vue-chartjs'
export default {
	name: 'ChartJsPolarArea',
	extends: PolarArea,
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
