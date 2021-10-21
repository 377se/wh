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
                    class="uk-margin-top">
                    <ScCardBody>
                        <VueGoodTable
                            v-if="attributeList.length>0"
                            :columns="columns"
                            :rows="attributeList"
                            style-class="vgt-table"
                            :search-options="{ 
                                enabled: false,
                                trigger: 'enter',
                            }"
                            :pagination-options="{
                                enabled: true,
                                mode: 'pages',
                                perPage: 50,
                                position: 'top',
                                perPageDropdown: [10, 20, 30, 40, 50],
                                dropdownAllowAll: true,
                                setCurrentPage: 1,
                                nextLabel: 'nästa',
                                prevLabel: 'föregående',
                                rowsPerPageLabel: 'Produkter per sida',
                                ofLabel: 'av',
                                pageLabel: 'sida', // for 'pages' mode
                                allLabel: 'Alla',
                            }"
                        >
                        <div class="uk-label uk-label-success uk-margin-small-right" slot="table-actions">
                            {{ attributeList.length }}
                        </div>
                            <template slot="table-row" slot-scope="props">
                                <img v-if="props.column.field === 'ImageName'" :src="props.row.ImageName">
                                <span v-if="props.column.field === 'ArticleName'">
                                    {{ props.row.ArticleName }}
                                </span>
                                <div 
                                    v-if="props.column.field === 'AttributeList'"
                                    class="uk-flex uk-flex-top">
                                    <span
                                        v-for="attrib in props.row.AttributeList"
                                        :key="attrib.AttributeId"
                                        class="uk-margin-right-small">
                                        <input 
                                            type="checkbox" 
                                            :checked="attrib.IsSelected"
                                            v-model="attrib.IsSelected"
                                            :value="attrib.IsSelected"
                                            v-on:input="attrib.IsSelected=!attrib.IsSelected;updateAttributes(props.row)"
                                        />
                                        <br>
                                        <img :src="attrib.ImageName"><br>
                                        {{ attrib.Name }}
                                    </span>
                                </div>
                                
                            </template>
                        </VueGoodTable>
                    </ScCardBody>
                </ScCard>
            </div>
        </div>

    </div>
</template>

<script>
import Alert from '~/components/Alert'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'

export default {
	components: {
		Alert,
        VueGoodTable,
		Select2: process.client ? () => import('~/components/Select2') : null
    },
    data () {
		return {
          attributeList: [],
          producttypes: [],
          shopId: null,
          productType: null,
          errors: null,
          message: '',
          render: false,
        }
    },
    computed: {
		columns () {
			return [
                {
					label: '',
					field: 'ImageName',
					sortable: false,
					tdClass: 'uk-text-center uk-text-nowrap',
                    width: '33px',
				},
                {
					label: 'Produktnamn',
					field: 'ArticleName',
					sortable: true,
					type: 'string',
					filterOptions: {
						enabled: true
					},
                    width: '25%',
				},
				{
					label: 'Attribut',
					field: 'AttributeList',
					sortable: false,
					type: 'array',
					filterOptions: {
						enabled: true
					},
                    width: '20%',
				}
			]
		},
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
        .then(function (attributelist) {
            _this.attributeList = attributelist.ArticleList
            _this.$store.dispatch('setBusyOff')
        }
      )
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
    .hide {
        display: none;
    }
    .actionpanel {
        background-color: #fff;
    }
    .orderlist {
        table-layout: fixed;
    }
    .sticky-down-right {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1;
    }
</style>