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
                        <h1 class="sc-top-bar-title uk-display-inline">Attributlista</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard :key="render">
                    <ScCardBody>
                        <div class="uk-padding-small actionpanel">
                            <div class="uk-margin-medium-bottom uk-width-1-1">
                              <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                              <client-only>
                                <Select2
                                    id="select-shopOptionsList"
                                    v-model="shopId"
                                    :options="shopOptionsList"
                                    :settings="{ 'width': '100%', 'placeholder': 'Välj shop', 'closeOnSelect': true }"
                                >
                                </Select2>
                              </client-only>
                              </div>
                            </div>
                            <div class="uk-margin-medium-bottom uk-width-1-1">
                              <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                              <client-only>
                                <Select2
                                    id="select-producttypes"
                                    v-model="productType"
                                    :options="producttypes"
                                    :settings="{ 'width': '100%', 'placeholder': 'Välj produkttyp', 'closeOnSelect': true }"
                                >
                                </Select2>
                              </client-only>
                              </div>
                            </div>
                            <div class="uk-flex uk-flex-around uk-margin-medium-bottom">
                              <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="getAttributeList()">Hämta
                              </button>
                            </div>
                        </div>
                    </ScCardBody>
                </ScCard>

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
                                    <th
                                        v-for="ah in attributeHeaders"
                                        :key="ah.AttributeId"><img width="50" height="50" :src="ah.ImageName"><br>
                                        {{ ah.Name }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="article in articleList"
                                    :key="article.Id"
                                    :class="!article.HasAttributes?'uk-alert-danger':''">
                                    <td class="uk-preserve-width">
                                        <img id="articlelightbox" :src="article.ImageName" style="width:50px;height:50px; cursor:pointer;" width="50" height="50" @click="getArticleImages(article.ArticleId)"/>
                                    </td>
                                    <td>
                                        {{ article.ArticleName }}
                                    </td>
                                    <td 
                                        v-for="al in article.AttributeList"
                                        :key="al.AttributeId"
                                        class="uk-text-center">
                                        <span>
                                            <input 
                                                type="checkbox" 
                                                :checked="al.IsSelected"
                                                v-model="al.IsSelected"
                                                :value="al.IsSelected"
                                                v-on:input="al.IsSelected=!al.IsSelected;updateAttributes(article)"
                                            /><br>
                                            <span style="font-size:10px">{{ al.Name }}</span>
                                        </span>
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
          attributeHeaders: [],
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
        async updateAttributes(m){
            let _this = this
                _this.$store.dispatch('setBusyOn')
                try {
                    const [ response ] = await Promise.all([
                        this.$axios.$post('/webapi/Attribute/UpdateArticleAttribute', m)
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
        async getAttributeList() {
                let _this = this
        _this.$store.dispatch('setBusyOn')
            await this.$axios.$get('/webapi/Attribute/GetArticleListByProductType?shopId=' + _this.shopId +'&productTypeId=' + _this.productType)
            .then(function (attrib) {
                _this.articleList = attrib.ArticleList
                _this.attributeHeaders = attrib.AttributeList
                _this.$store.dispatch('setBusyOff')
            }
        )
        .catch(function (error) {
            console.log(error)
            _this.$store.dispatch('setBusyOff')
        })
        },
        async getArticleImages(articleid) {
            let _this = this
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$get('/webapi/Article/GetArticleImages?articleId=' + articleid)
            .then(function (articleimages) {
                const articleImages = articleimages.map(({ Url }) => ({ source: Url }))
                _this.$store.dispatch('setBusyOff')

                const panel = UIkit.lightboxPanel({
                    items: articleImages
                })

                panel.show()

            })
            .catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
            })
        },
    },
    async fetch () {
        this.$store.dispatch('setBusyOn')
        try {
            const [ shops, producttypes ] = await Promise.all([
                this.$axios.$get('/webapi/Shop/GetShopList'),
                this.$axios.$get('/webapi/Attribute/GetAttributeListForProductTypes')
            ])
            this.shopOptionsList = shops.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
            this.producttypes = producttypes.map(({ ProductTypeId, Name }) => ({ id: ProductTypeId, text: Name }))
            if (this.$route.query.shopid || this.$route.query.producttype) {
                if (this.$route.query.shopid) {
                    this.shopId = this.$route.query.shopid
                }
                if (this.$route.query.producttype) {
                    this.productType = this.$route.query.producttype
                }
                this.getAttributeList()
            }
        this.$store.dispatch('setBusyOff')
        } catch (err) {
            console.log(err)
            this.$store.dispatch('setBusyOff')
        }
    },
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