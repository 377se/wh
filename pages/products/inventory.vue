<template>
    <div id="sc-page-wrapper">
        <div id="sc-page-top-bar" class="sc-top-bar">
            <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                <h1 class="sc-top-bar-title uk-display-inline">Inventeringslista</h1>
            </div>
        </div>
        <div id="sc-page-content">
        <!-- Lag -->
        <div class="uk-margin uk-width-1-1">
            <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
            <label class="select-label" for="select-team">Lag</label>
                <client-only>
                    <Select2
                        id="select-team"
                        v-model="teamId"
                        :options="teamListActiveArticles"
                        :settings="{ 'width': '100%', 'placeholder': 'Välj lag...', 'closeOnSelect': true }"
                        @select="getInventoryList"
                    >
                    </Select2>
                </client-only>
            </div>
        </div>

            <ScCard v-if="inventoryList != null">
                <ScCardBody :key="render">
                    <!-- TAB-HEADLINES -->
                    <ul data-uk-tab>
                        <li class="uk-active">
                            <a href="javascript:void(0)">
                                {{ inventoryList[0].Name }}
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">
                                {{ inventoryList[1].Name }}
                            </a>
                        </li>
                    </ul>
                    <!-- TAB-CONTENT -->
                    <ul class="uk-switcher">
                        <!-- TAB 1 -->
                        <li class="uk-active">
                            <div>
                                <ScCard>
                                    <ScCardContent>
                                        <ScCardBody>
                                            <div class="uk-overflow-auto" style="max-height:600px;">
                                                <table class="uk-table uk-table-small uk-text-small uk-margin-remove border-right" style="border-collapse: separate;">
                                                    <thead>
                                                        <tr class="uk-padding-remove-bottom">
                                                            <th class="sticky-headers border-top border-bottom border-left" style="text-align: center; width: 30px;"></th>
                                                            <th class="sticky-headers border-top border-bottom border-left" style="text-align: left; width: 105px; font-size:10px;">Produktnamn</th>
                                                            <th class="sticky-headers border-top border-bottom border-left" style="text-align: left; width: 105px; font-size:10px;">Lag</th>
                                                            <th class="sticky-headers border-top border-bottom border-left" style="text-align: left; width: 90px; font-size:10px;">Typ</th>
                                                            <th class="sticky-headers border-top border-bottom border-left" style="text-align: center; width: 40px; font-size:10px;">Inköpta</th>
                                                            <th class="sticky-headers border-top border-bottom border-left" style="text-align: center; width: 40px; font-size:10px;">Lagersaldo</th>
                                                            <th class="sticky-headers border-top border-bottom border-left" style="text-align: center; width: 40px; font-size:10px;">Sålda</th>
                                                            <th v-for="(heading, index) in inventoryList[0].HeaderList" :key="index" class="sticky-headers border-top border-bottom border-left" style="text-align: center; width: 20px; font-size:10px;">{{ heading }}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="article in inventoryList[0].ItemList" :key="article.ArticleId" class="uk-table-middle">
                                                            <td class="border-bottom border-left"><img :src="article.ImageName"></td>
                                                            <td class="border-bottom border-left cursor-pointer link-color"><nuxt-link :to="article.Url">{{ article.ProductName }}</nuxt-link></td>
                                                            <td class="border-bottom border-left">{{ article.TeamName }}</td>
                                                            <td class="border-bottom border-left">{{ article.ProductType }}</td>
                                                            <td class="border-bottom border-left" style="text-align: center;">{{ article.InitialAmount }}</td>
                                                            <td class="border-bottom border-left" style="text-align: center;">{{ article.ItemsInStock }}</td>
                                                            <td class="border-bottom border-left" style="text-align: center;">{{ article.ItemsSold }}</td>
                                                            <td v-for="(stock, index) in article.StockList" :key="index" class="border-bottom border-left" :class="{ redback: stock.ItemsInStock == 0 }" style="text-align: center;">{{ stock.ItemsInStock }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </ScCardBody>
                                    </ScCardContent>
                                </ScCard>
                            </div>
                        </li>
                        <!-- TAB 2 -->
                        <li class="uk-active">
                            <div>
                                <ScCard>
                                    <ScCardContent>
                                        <ScCardBody>
                                            <div class="uk-overflow-auto" style="max-height:600px;">
                                                <table class="uk-table uk-table-small uk-text-small uk-margin-remove border-right" style="border-collapse: separate;">
                                                    <thead>
                                                        <tr class="uk-padding-remove-bottom">
                                                            <th class="sticky-headers border-top border-bottom border-left" style="text-align: center; width: 30px;"></th>
                                                            <th class="sticky-headers border-top border-bottom border-left" style="text-align: left; width: 105px; font-size:10px;">Produktnamn</th>
                                                            <th class="sticky-headers border-top border-bottom border-left" style="text-align: left; width: 105px; font-size:10px;">Lag</th>
                                                            <th class="sticky-headers border-top border-bottom border-left" style="text-align: left; width: 105px; font-size:10px;">Typ</th>
                                                            <th class="sticky-headers border-top border-bottom border-left" style="text-align: left; width: 105px; font-size:10px;">Inköpta</th>
                                                            <th class="sticky-headers border-top border-bottom border-left" style="text-align: left; width: 105px; font-size:10px;">Lagersaldo</th>
                                                            <th class="sticky-headers border-top border-bottom border-left" style="text-align: left; width: 105px; font-size:10px;">Sålda</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="article in inventoryList[1].ItemList" :key="article.ArticleId" class="uk-table-middle">
                                                            <td class="border-bottom border-left"><img :src="article.ImageName"></td>
                                                            <td class="border-bottom border-left cursor-pointer link-color"><nuxt-link :to="article.Url">{{ article.ProductName }}</nuxt-link></td>
                                                            <td class="border-bottom border-left">{{ article.TeamName }}</td>
                                                            <td class="border-bottom border-left">{{ article.ProductType }}</td>
                                                            <td class="border-bottom border-left">{{ article.InitialAmount }}</td>
                                                            <td class="border-bottom border-left" :class="{ redback: article.ItemsInStock == 0 }">{{ article.ItemsInStock }}</td>
                                                            <td class="border-bottom border-left">{{ article.ItemsSold }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </ScCardBody>
                                    </ScCardContent>
                                </ScCard>
                            </div>
                        </li>
                    </ul>
                </ScCardBody>
            </ScCard>
        </div>
    </div>
</template>

<script>
    import ScInput from '~/components/Input'

    export default {
        components: {
            ScInput,
            Select2: process.client ? () => import('~/components/Select2') : null,
        },
        data () {
            return {
                errors: null,
                message: '',
                render: false,
                teamListActiveArticles: [],
                teamId: null,
                inventoryList: null,
            }
        },
        methods: {
            async getInventoryList() {
                let _this = this
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$get('/webapi/Inventory/GetInventoryList?teamId=' + _this.teamId)
                .then(function (inventorylist) {
                    if(inventorylist.ErrorList != null){
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.inventoryList = inventorylist
                        _this.$store.dispatch('setBusyOff')
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    _this.$store.dispatch('setBusyOff')
                })
            },
        },
        async fetch () {
            try {
                const [teamlistactivearticles, teams] = await Promise.all([
                    this.$axios.$get('/webapi/Metadata/GetTeamListActiveArticles'),

                ])
                this.teamListActiveArticles = teamlistactivearticles.map(({ Id, Name }) => ({ id: Id, text: Name }))
            } catch (err) {
                console.log(err);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .sticky-headers {
        background: white;
        position: sticky;
        top: 0px;
    }
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
    .redback {
        color: #fff;
        background-color: crimson;
    }
    .cursor-pointer {
        cursor: pointer;
    }
    .link-color {
        color: #0088CC;
    }
</style>