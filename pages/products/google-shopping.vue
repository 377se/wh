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
                        <h1 class="sc-top-bar-title uk-display-inline">Google Shopping - supportersplace.se</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody>
                        <!-- TAB-CONTENT - Google Shopping -->
                        <div class="uk-overflow-auto">
                            <table class="uk-table uk-table-small uk-text-small uk-margin-remove"
                                style="border-collapse: separate;">
                                <thead>
                                    <tr class="uk-padding-remove-bottom">
                                        <th class="border-top border-bottom border-left border-right uk-text-small"
                                            style="text-align: right;">Id</th>
                                        <th class="border-top border-bottom border-left border-right uk-text-small"
                                            style="text-align: right;">Gtin</th>
                                        <th class="border-top border-bottom border-left border-right uk-text-small"
                                            style="text-align: right;">Title</th>
                                        <th class="border-top border-bottom border-left border-right uk-text-small"
                                            style="text-align: right;">Description</th>
                                        <th class="border-top border-bottom border-left uk-text-small"
                                            style="text-align: left;">Availability</th>
                                        <th class="border-top border-bottom border-left uk-text-small"
                                            style="text-align: left;">Brand</th>
                                        <th class="border-top border-bottom border-left uk-text-small"
                                            style="text-align: right;">Condition</th>
                                        <th class="border-top border-bottom border-left uk-text-small"
                                            style="text-align: right;">CustomLabel0</th>
                                        <th class="border-top border-bottom border-left border-right uk-text-small"
                                            style="text-align: right;">CustomLabel1</th>
                                        <th class="border-top border-bottom border-left border-right uk-text-small"
                                            style="text-align: right;">Image Link</th>
                                        <th class="border-top border-bottom border-left border-right uk-text-small"
                                            style="text-align: right;">Link</th>
                                        <th class="border-top border-bottom border-left border-right uk-text-small"
                                            style="text-align: right;">Product Type</th>
                                        <th class="border-top border-bottom border-left border-right uk-text-small"
                                            style="text-align: right;">SKU</th>
                                        <th class="border-top border-bottom border-left border-right uk-text-small"
                                            style="text-align: right;">Price</th>




                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in onDemand" :key="item.Id" class="uk-table-middle">
                                        <td class="border-bottom border-left border-right uk-preserve-width"
                                            style="text-align: left;">{{ item.Id }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width"
                                            style="text-align: left;">{{ item.Gtin }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width"
                                            style="text-align: left;">{{ item.Title }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width"
                                            style="text-align: left;">{{ item.Description }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width"
                                            style="text-align: left;">{{ item.Availability }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width"
                                            style="text-align: right;">{{ item.Brand }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width"
                                            style="text-align: right;">{{ item.Condition }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width"
                                            style="text-align: right;">{{ item.CustomLabel0 }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width"
                                            style="text-align: right;">{{ item.CustomLabel1 }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width"
                                            style="text-align: right;">{{ item.ImageLink }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width"
                                            style="text-align: right;">{{ item.Link }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width"
                                            style="text-align: right;">{{ item.ProductType }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width"
                                            style="text-align: right;">{{ item.Sku }}</td>
                                        <td class="border-bottom border-left border-right uk-preserve-width"
                                            style="text-align: right;">{{ item.Price }}</td>
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
                    this.$axios.$get('/webapi/google/GetGoogleContentData'),
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