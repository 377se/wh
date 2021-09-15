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
                        <!-- TAB-HEADLINES - TOPSELLING -->
                        <ul data-uk-tab>
                            <li class="uk-active">
                                <a href="javascript:void(0)">
                                    {{ topSelling[0].Name }}
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    {{ topSelling[1].Name }}
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    {{ topSelling[2].Name }}
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    {{ topSelling[3].Name }}
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    {{ topSelling[4].Name }}
                                </a>
                            </li>
                        </ul>
                        <!-- TAB-CONTENT - TOPSELLING -->
					    <ul class="uk-switcher">
                            <li v-for="(shop, index) in topSelling" :key="index">
                                <div class="uk-overflow-auto">
                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove" style="border-collapse: separate;">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 50px;"></th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 38%;">{{ index == 1 || index == 2 ? 'Produkt' : 'Lag' }}</th>
                                                <th class="border-top border-bottom border-left uk-text-small" style="text-align: right; width: 20%;">{{ index == 1 || index == 2 ? 'Antal' : 'Antal produkter' }}</th>
                                                <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: right; width: 38%;">Totalt ex. moms</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in shop.ItemList" :key="item.Id" class="uk-table-middle">
                                                <td class="border-bottom border-left border-right uk-preserve-width" style="text-align: left;"><img :src="item.Image"></td>
                                                <td v-if="index == 1 || index == 2" class="border-bottom border-left border-right" style="text-align: left; ">{{ item.Name }}</td>
                                                <td v-else class="border-bottom border-left border-right" style="text-align: left; ">{{ item.Team }}</td>
                                                <td class="border-bottom border-left" style="text-align: right; ">{{ item.NumberOfItems | thousandsDelimiter }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: right; ">{{ Math.round(item.Value) | thousandsDelimiter }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        </ul>
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
                topSelling: [],
            }
        },
        methods: {
        },
        async fetch () {
            this.$store.dispatch('setBusyOn')
            try {
                const [topselling] = await Promise.all([
                    this.$axios.$get('/webapi/Stats/GetTopSelling'),
                ])
                this.topSelling = topselling
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