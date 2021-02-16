<script>
import { Bar } from 'vue-chartjs'
export default {
	name: 'ChartJsBar',
	extends: Bar,
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
