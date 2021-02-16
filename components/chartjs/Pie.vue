<script>
import { Pie } from 'vue-chartjs'
export default {
	name: 'ChartJsPie',
	extends: Pie,
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
