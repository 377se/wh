<script>
import { Line } from 'vue-chartjs'
export default {
	name: 'ChartJsLine',
	extends: Line,
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
