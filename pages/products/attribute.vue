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
                        <h1 class="sc-top-bar-title uk-display-inline">Attribut</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <div class="uk-grid uk-grid-medium" uk-grid uk-margin>
                    <!-- LISTA -->
                    <div class="uk-width-1-1 uk-width-3-4@m">
                        <ScCard class="uk-card-small" :ref="render">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Lista med attribut
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto">
                                    <div v-for="(producttype, index) in attributeList" :key="index">
                                        <table class="uk-table uk-table-small uk-text-small uk-margin-remove" style="border-collapse: separate;">
                                            <thead v-if="index == 0">
                                                <tr>
                                                    <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="width:47%; text-align: left;">Attribut</th>
                                                    <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="width:47%; text-align: left;">Antal</th>
                                                    <th class="sticky-headers border-top border-bottom border-right uk-text-small" style="width:40px; text-align: center;"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td colspan="3" class="uk-text-small border-bottom border-left border-right">
                                                        {{ producttype.Name }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="uk-padding-remove">
                                                        <table class="uk-table uk-table-small uk-text-small uk-margin-remove attributelist uk-width-1-1" style="border-collapse: separate;">
                                                            <tr v-for="(attribute, index) in producttype.ItemList" :key="index" class="uk-table-middle">
                                                                <td class="cursor-pointer link-color border-left border-bottom" style="width:49%;" @click="getAttributeById(attribute.AttributeId)"><span style="padding-left: 15px;">{{ attribute.Name }}</span></td>
                                                                <td class="cursor-pointer link-color border-left border-bottom" style="width:49%;" @click="openAttributeAssignedProductsModal(attribute.AttributeId)">{{ attribute.NumberOfItems }}</td>
                                                                <td class="border-left border-bottom border-right wastebasket" style="width:30px; text-align: center;"><i v-if="attribute.NumberOfItems == 0" @click="removeAttribute(attribute)" class="mdi mdi-delete-forever md-color-red-600 sc-icon-22" style="line-height:0; vertical-align: middle;"></i></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <!-- EDITOR ATTRIBUT -->
                    <div class="uk-width-1-1 uk-width-1-4@m uk-flex-first uk-flex-last@m" uk-margin>
                        <ScCard class="uk-card-small">
                            <ScCardHeader separator>
                            <ScCardTitle v-if="currentAttributeObject.AttributeId != 0">
                                Redigera attribut
                            </ScCardTitle>
                            <ScCardTitle v-else>
                                Nytt attribut
                            </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div>
                                    <Alert
                                        :errorlist="this.errors ? this.errors : []"
                                        :message="this.message ? this.message : ''"
                                        :alertClass="'uk-alert-danger'"
                                        id=1
                                    />

                                    <template v-if="currentAttributeObject.AttributeId">
                                        <!-- Bild -->
                                        <img :src="currentAttributeObject.ImageName">
                                        <!-- BILDUPPLADDNING -->
                                        <div class="uk-padding-small uk-padding-remove-horizontal">
                                            <FileUpload
                                                :attributeId="currentAttributeObject.AttributeId"
                                                :attributeImage="this.attributeImage"
                                                @updateAttributeImage="getAttributeById(currentAttributeObject.AttributeId)"
                                            />
                                        </div>
                                    </template>
                                    <!-- Namn -->
                                    <div class="uk-margin-medium-bottom uk-margin-medium-top">
                                        <ScInput v-model="currentAttributeObject.Name" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Namn</label>
                                        </ScInput>
                                    </div>
                                    <!-- Produkttyp -->
                                    <div class="uk-margin-medium-top uk-margin-large-bottom uk-width-1-1">
                                        <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                        <label class="select-label" for="select-producttype">Produkttyp</label>
                                        <client-only>
                                            <Select2
                                                id="select-producttype"
                                                v-model="currentAttributeObject.ProductTypeId"
                                                :options="productTypeList"
                                                :settings="{ 'width': '100%', 'placeholder': 'Välj produkttyp...', 'closeOnSelect': true, 'allowClear': true }"
                                            >
                                                <option v-if="isLoading = false" :value="articleDetails.ProductTypeId">{{ productTypeInfo.find(x => x.id === articleDetails.ProductTypeId).text }}</option>
                                            </Select2>
                                        </client-only>
                                        </div>
                                    </div>
                                    <!-- Översättningar -->
                                    <div v-for="language in currentAttributeObject.MetaList" :key="language.AttributeMetaId" class="uk-margin-large-bottom uk-margin-small-top">
                                        <ScInput v-model="language.Name" state="fixed" mode="outline" extra-classes="uk-form-small" class="uk-margin-medium-bottom">
                                            <label><img :src="language.FlagImage">&nbsp;&nbsp;{{ language.Language }}</label>
                                        </ScInput>
                                        <ScTextarea v-model="language.Description" :rows="2" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Beskrivning</label>
                                        </ScTextarea>
                                    </div>
                                    <div class="uk-flex uk-flex-around uk-margin-medium-bottom">
                                        <div v-if="currentAttributeObject.AttributeId == 0">
                                            <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="createAttribute()">SKAPA
                                            </button>
                                        </div>
                                        <div v-else>
                                            <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateAttribute()">
                                                UPPDATERA
                                            </button>
                                            <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="currentAttributeObject = emptyAttributeObject">
                                                RENSA
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                </div>
            </div>
        </div>


		<!-- ATTRIBUT-ASSIGNED PRODUCTS MODAL -->
		<div id="attribute-assigned-products-modal" class="uk-modal-full uk-modal" data-uk-modal>

			<div class="uk-modal-header basket-ribbon uk-animation-slide-right">
				<!-- sticky -->
				<h4 class="uk-modal-title" style="color:#fff; line-height:1; margin:3px 0 0 12px; padding:10px;">Artikellista per attribut</h4>
				<button
					class="uk-offcanvas-close uk-icon uk-close"
					style="color:#fff;top:14px;right:12px;"
					type="button"
					uk-close
					uk-toggle="target: #attribute-assigned-products-modal"/>
			</div>
			<div class="uk-modal-dialog uk-modal-body uk-overflow-auto uk-animation-slide-right" style="padding:0px;height:100vh;background:#ffffff;">
				<Alert
					:errorlist="errors"
					message=""
					:alertClass="'uk-alert-danger'"
					id=1
					class="uk-margin-small-left uk-margin-small-right"
				/>

				<div class="uk-overflow-auto">
					<div>
						<table class="uk-table uk-table-small uk-table-middle uk-text-small uk-margin-remove borde-all" style="border-collapse: separate;">
							<thead>
                                <th class="border-bottom border-left border-right uk-text-center"><div class="uk-badge md-bg-green-600">{{ articleListByAttributeId ? articleListByAttributeId.length : '' }}</div></th>
                                <th class="border-bottom border-right"></th>
							</thead>
							<tbody>
								<tr v-for="(article, index) in articleListByAttributeId" :key="index">
                                    <td class="border-bottom border-right uk-width-auto" style="width: 60px;"><img :src="article.ImageName"></td>
                                    <td class="border-bottom border-right uk-width-auto uk-text-left cursor-pointer link-color" style="width: 90%;" @click="closeAttributeAssignedProductsModal(article.Url)">
                                            <div>{{ article.TeamName | toUppercase }}</div>
                                            <div>{{ article.ArticleName }}</div>
                                    </td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			</div>
		</div>


    </div>
</template>

<script>
import Alert from '~/components/Alert'
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'
import { replaceUpdatedObjectInArrayOfObjects } from '~/utils.js'
import draggable from 'vuedraggable'
import FileUpload from '~/components/FileUploadAttributeImage'

export default {
	components: {
		Alert,
		ScInput,
		ScTextarea,
		draggable,
    	FileUpload,
        Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            errors: null,
            message: '',
            render: false,
            emptyAttributeObject: {},
            currentAttributeObject: {},
            attributeList: [],
            productTypeList: [],
            attributeById: [],
            attributeImage: null,
            articleListByAttributeId: null,
        }
    },
    computed: {
        sortedItemList: function() {
            return this.currentAttributeObject.ItemList.sort((p1,p2) => {
                if(p2['IsSelected'] < p1['IsSelected']) return -1; if(p2['IsSelected'] > p1['IsSelected']) return 1;
                return 0
            })
        }
    },
    watch: {
    },
    methods: {
        async openAttributeAssignedProductsModal(attributeid) {
            let _this = this
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$get('/webapi/Article/GetArticleListByAttributeId?attributeId=' + attributeid)
            .then(function (articlelistbyattributeid) {
                try {
                    if (articlelistbyattributeid.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.articleListByAttributeId = articlelistbyattributeid
                        _this.$store.dispatch('setBusyOff')
                    }
                } catch(err) {
                    console.log(err)
                }
            })
            .catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
            })

            UIkit.modal('#attribute-assigned-products-modal').show()
        },
        closeAttributeAssignedProductsModal(url) {
            UIkit.modal('#attribute-assigned-products-modal').hide()
            setTimeout(() => {
                this.$router.push(url)
            }, 500)
        },
        async createAttribute() {
            let _this = this
            _this.currentAttributeObject = _this.emptyAttributeObject
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Attribute/CreateAttribute', _this.currentAttributeObject)
            .then(function (res) {
                if (res.ErrorList != null) {
                    _this.errors = res.ErrorList
                    _this.$store.commit('setAlertVisible', 1)
                    _this.$store.dispatch('setBusyOff')
                } else {
                    _this.currentAttributeObject = res
                    UIkit.modal.dialog('<p class="uk-modal-body">Attributet har skapats!</p>')
                    _this.$fetch()
                    _this.$store.dispatch('setBusyOff')
                }
            })
            .catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
            })
        },
        async updateAttribute() {
            let _this = this
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Attribute/UpdateAttribute', _this.currentAttributeObject )
            .then(function (updatedattribute) {
                try {
                    if (updatedattribute.ErrorList != null ) {
                        _this.errors = updatedattribute.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.$store.commit('setAlertHidden', 1)
                        _this.$store.dispatch('setBusyOff')
                        _this.$fetch()
                    }
                } catch(err) {
                    console.log(err)
                }
            })
            .catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
            })
        },
        async removeAttribute(attribute) {
            let _this = this
			await UIkit.modal.confirm('Vill du verkligen radera attributet?', { labels: { ok: 'Yeah', cancel: 'Nope' } }).then(function () {
                _this.$store.dispatch('setBusyOn')
                _this.$axios.$post('/webapi/Attribute/RemoveAttribute', attribute )
                .then(function (attributelist) {
                    try {
                        if (attributelist.ErrorList != null ) {
                            _this.errors = attributelist.ErrorList
                            _this.$store.commit('setAlertVisible', 1)
                            _this.$store.dispatch('setBusyOff')
                        } else {
                            _this.$store.commit('setAlertHidden', 1)
                            _this.$store.dispatch('setBusyOff')
                            _this.attributeList = attributelist
                            _this.render = !_this.render
                        }
                    } catch(err) {
                        console.log(err)
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    _this.$store.dispatch('setBusyOff')
                })
			}, function () {
				_this.$store.dispatch('setBusyOff')
			})
        },
        async getAttributeById(attributeid) {
            let _this = this
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$get('/webapi/Attribute/GetAttributeById?id=' + attributeid)
            .then(function (attribute) {
                try {
                    if (attribute.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.currentAttributeObject = attribute
                        _this.$store.dispatch('setBusyOff')
                    }
                } catch(err) {
                    console.log(err)
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
            const [ emptyattributeobject, attributelist, producttypes ] = await Promise.all([
                this.$axios.$get('/webapi/Attribute/GetEmptyAttributeObject'),
                this.$axios.$get('/webapi/Attribute/GetAttributeList'),
				this.$axios.$get('/webapi/Metadata/GetProductTypeList'),
            ])
            this.emptyAttributeObject = emptyattributeobject
            this.currentAttributeObject = emptyattributeobject
            this.attributeList = attributelist
			this.productTypeList = producttypes.map(({ Id, Name }) => ({ id: Id, text: Name }))
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
    .attributelist {
        table-layout: fixed;
    }
    .summary {
        font-size: 200%;
        font-weight: 700;
        line-height: 1;
    }
    .cursor-pointer {
        cursor: pointer;
    }
    .link-color {
        color: #0088CC;
    }
    .selected {
        background-color: #000;
        color: #fff;
    }
    .wastebasket {
		cursor: pointer;
	}
	.uk-offcanvas-bar {
		color:#333;
	}
	.uk-modal-full {
		background: rgba(0, 0, 0, 0.6);
	}
	.uk-modal-dialog, .uk-modal-header {
		margin-left: auto !important;
		width:55vw !important;
		max-width: 800px !important;
			@media only screen and (max-width: 600px) {
				width:85vw !important;
				max-width: 800px !important;
			}
	}
	.uk-modal-header {
		min-height: 50px;
		height: auto;
		padding: 0px;
	}
	.basket-ribbon{
		background: #00838F;
	}

</style>