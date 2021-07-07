<template>
    <client-only>
        <div v-if="$fetchState.pending">
            <div id="sc-page-wrapper">
                {{ showPageOverlaySpinner() }}
            </div>
        </div>
        <div v-else>
            <div id="sc-page-wrapper">
                {{ hidePageOverlaySpinner() }}
                <div id="sc-page-top-bar" class="sc-top-bar">
                    <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                        <div class="uk-flex-1">
                            <h1 class="sc-top-bar-title uk-display-inline">Försäljning per dygnets timmar</h1>
                        </div>
                    </div>
                </div>
                <div id="sc-page-content">
                        <ScCard class="uk-margin-medium-bottom">
                            <ScCardBody v-if="statsByHour" class="sc-chart-chartjs">
                                <ChartJsLine chart-id="cjsLineChartData" :data="cjsLineChartData" :options="lineChart.options"></ChartJsLine>
                            </ScCardBody>
                        </ScCard>
                </div>
            </div>
        </div>
    </client-only>
</template>

<script>
    import { scColors } from '~/assets/js/utils';
    import ChartJsLine from '~/components/chartjs/Line'
    export default {
        components: {
            ChartJsLine,
        },
        data () {
            return {
                statsByHour: [],
                color: (process.client) ? Chart.helpers.color : '#fff',
            }
        },
        computed: {
            cjsLineChartData () {
                return {
                    labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                    datasets: [
                    {
                        label: this.statsByHour[0].ShopName,
                        steppedLine: false,
                        lineTension: 0.3,
                        backgroundColor: scColors.multi[0],
                        borderColor: scColors.multi[0],
                        data: this.statsByHour[0].ItemList,
                        fill: false,
                    },
                    {
                        label: this.statsByHour[1].ShopName,
                        steppedLine: false,
                        lineTension: 0.3,
                        backgroundColor: scColors.multi[1],
                        borderColor: scColors.multi[1],
                        data: this.statsByHour[1].ItemList,
                        fill: false,
                    },
                    {
                        label: this.statsByHour[2].ShopName,
                        steppedLine: false,
                        lineTension: 0.3,
                        backgroundColor: scColors.multi[2],
                        borderColor: scColors.multi[2],
                        data: this.statsByHour[2].ItemList,
                        fill: false,
                    },
                    {
                        label: this.statsByHour[3].ShopName,
                        steppedLine: false,
                        lineTension: 0.3,
                        backgroundColor: scColors.multi[3],
                        borderColor: scColors.multi[3],
                        data: this.statsByHour[3].ItemList,
                        fill: false,
                    },
                    {
                        label: this.statsByHour[4].ShopName,
                        steppedLine: false,
                        lineTension: 0.3,
                        backgroundColor: scColors.multi[4],
                        borderColor: scColors.multi[4],
                        data: this.statsByHour[4].ItemList,
                        fill: false,
                    },
                    ]
                }
            },
            lineChart () {
                return {
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        title: {
                            display: false,
                            text: 'Månadsförsäljning'
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: false,
                                    labelString: 'Månad'
                                }
                            }],
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: false,
                                    labelString: 'Summa'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                    callback: (value) => {
                                        return Intl.NumberFormat().format((value)) + ' %';
                                    },
                                }
                            }]
                        },
                    }
                }
            },
        },
        methods: {
            hidePageOverlaySpinner () {
                this.$store.commit('toggleProgressOverlay', false);
                this.$store.commit('togglePageOverlay', false)
            },
            showPageOverlaySpinner () {
                this.$store.commit('toggleProgressOverlay', true);
                this.$store.commit('togglePageOverlay', true)
            },
        },
        async fetch () {
            try {
                const [ statsbyhour ] = await Promise.all([
                    this.$axios.$get('/webapi/Stats/GetStatsByHour'),
                ])
                this.statsByHour = statsbyhour
            } catch (err) {
                console.log(err);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>