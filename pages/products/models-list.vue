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
                        <h1 class="sc-top-bar-title uk-display-inline">Modell-lista</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard
                    v-if="articleList.length>0"
                    class="uk-margin-top">
                    <div class="uk-label uk-label-success uk-margin-small-right" slot="table-actions">
                        {{ articleList.length }}
                    </div>
                    <div class="uk-overflow-auto">
                        <table 
                            class="attribute-list-table uk-table uk-table-divider"
                            style="position:relative">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Produktnamn</th>
                                    <th>ArtikelId</th>
                                    <th>Lag</th>
                                    <th>Modell</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="article in articleList"
                                    :key="article.Id"
                                    >
                                    <td class="uk-preserve-width">
                                        <nuxt-link
                                            :to="article.Url"
                                            class="uk-link-reset">
                                            <img 
                                                :src="article.ImageName"
                                                style="width:50px;height:50px;"
                                                width="50"
                                                height="50"/>
                                        </nuxt-link>
                                    </td>
                                    <td>
                                        <nuxt-link
                                            :to="article.Url"
                                            class="uk-link-reset">
                                            {{ article.ArticleName }}
                                        </nuxt-link>
                                    </td>
                                    <td>
                                        {{ article.ArticleId }}
                                    </td>
                                    <td style="white-space:nowrap">
                                        {{ article.TeamName }}
                                    </td>
                                    <td>
                                        <select
                                            v-model="article.ModelId"
                                            class="uk-select"
                                            @change="updateModels(article)"
                                            style="min-width:200px;">
                                            <option
                                                value="0">Ingen modell vald</option>
                                            <option
                                                v-for="m in modelsList"
                                                :key="m.Id"
                                                :value="m.Id">
                                                {{ m.Name }}
                                            </option>
                                        </select>
                                    </td>  
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </ScCard>
            </div>
        </div>

    </div>
</template>

<script>
import Alert from '~/components/Alert'

export default {
	components: {
		Alert,
		Select2: process.client ? () => import('~/components/Select2') : null
    },
    data () {
		return {
          articleList: [],
          modelsList: [],
          producttypes: [],
          shopId: null,
          productType: null,
          errors: null,
          message: '',
          render: false,
        }
    },
    mounted() {
        if (!this.loaded) this.$fetch()
    },
    methods: {
        async updateModels(m){
            let _this = this
                _this.$store.dispatch('setBusyOn')
                try {
                    const [ response ] = await Promise.all([
                        this.$axios.$post('/webapi/Model/UpdateArticleModel', m)
                    ])
                    if(response.ErrorList != null) {
                        _this.$store.dispatch('setBusyOff')
                        console.log('Something fucked up!')
                    } else {
                        console.log("Something didn't fuck up!")
                    }
                    _this.$store.dispatch('setBusyOff')
                } catch (error) {
                    console.log(error)
                }
        },
    },
    async fetch () {
        this.$store.dispatch('setBusyOn')
        try {
            const [ models ] = await Promise.all([
                this.$axios.$get('/webapi/Model/GetModelList')
            ])
            this.articleList = models.ItemList
            this.modelsList = models.ModelTypeList
            this.$store.dispatch('setBusyOff')
        } catch (err) {
            console.log(err)
            this.$store.dispatch('setBusyOff')
        }
    }
}
</script>

<style lang="scss" scoped>
    table thead,
    table tfoot {
    position: sticky;
    top:0;
    }
    .uk-alert-danger{
        background: rgba(198, 40, 40, 0.4) !important;
    }
    

</style>