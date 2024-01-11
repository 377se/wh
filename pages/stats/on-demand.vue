<template>
     <div v-if="$fetchState.pending">
            <div id="sc-page-wrapper">
            </div>
    </div>
    <div v-else>
        <div id="sc-page-wrapper">
            <div id="sc-page-top-bar" class="sc-top-bar">
                <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                    <div class="uk-flex-1">
                        <h1 class="sc-top-bar-title uk-display-inline">Bäst säljande senaste 7 dagarna</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody>
                        <!-- TAB-CONTENT - ON DEMAND -->
                        <div class="uk-overflow-auto">
                            <table class="uk-table uk-table-small uk-text-small uk-margin-remove" style="border-collapse: separate;">
                                <thead>
                                    <tr class="uk-padding-remove-bottom">
                                        <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 10%;">Orderdatum</th>
                                        <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 28%;">Produkt</th>
                                        <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 20%;">Artikelnummer</th>
                                        <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 20%;">Storlek</th>
                                        <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 28%;">Antal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in onDemand" :key="item.ArticleNumber" class="uk-table-middle">
                                        <td class="border-bottom border-left border-right uk-preserve-width" style="text-align: left;">{{ item.OrderDate }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width" style="text-align: left;">{{ item.ProductName }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width" style="text-align: left;">{{ item.ArticleNumber }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width" style="text-align: left;">{{ item.SizeDisplay }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width" style="text-align: left;">{{ item.NumberOfItems }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </ScCardBody>
                </ScCard>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                onDemand: [],
            }
        },
        methods: {
        },
        async fetch () {
            this.$store.dispatch('setBusyOn')
            try {
                const [onDemand] = await Promise.all([
                    this.$axios.$get('/webapi/Stats/GetTopSelling'),
                ])
                this.onDemand = onDemand
                this.$store.dispatch('setBusyOff')
            } catch (err) {
                console.log(err);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .border-all {
        border: 1px solid #ccc;
    }
    .border-left {
        border-left: 1px solid #ccc;
    }
    .border-right {
        border-right: 1px solid #ccc;
    }
    .border-top {
        border-top: 1px solid #ccc;
    }
    .border-bottom {
        border-bottom: 1px solid #ccc;
    }
</style>