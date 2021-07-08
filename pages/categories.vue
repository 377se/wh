<template>
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
					    <img v-if="shopId" :src="shops.find(({ ShopId }) => ShopId === parseInt(this.shopId)).ImageName" class="uk-margin-medium-right"><h1 class="sc-top-bar-title uk-display-inline">Kategorier/Meny</h1>
				    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody>
                        <div class="uk-margin-medium-bottom uk-width-1-1">
                            <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                            <client-only>
                                <Select2
                                    id="select-shopOptionsList"
                                    v-model="shopId"
                                    :options="shopOptionsList"
                                    :settings="{ 'width': '100%', 'placeholder': 'Välj shop för att jobba med kategorier/meny', 'closeOnSelect': true }"
                                    @select="getMenuByShopId"
                                >
                                </Select2>
                            </client-only>
                            </div>
                        </div>
                        <div class="uk-grid uk-grid-column-medium" uk-grid>
                            <div v-if="currentMenu" class="uk-width-1-1" :class="{'uk-width-1-2' : editMenuItem }">
                                <ScCard>
                                    <ScCardBody>
                                        <!-- NYTT MENYVAL -->
                                        <div v-if="shopId" class="uk-margin">
                                            <ScInput v-model="newMenuItemContainer.Name" state="fixed" mode="outline" v-on:blur="addMenuItem()" extra-classes="uk-form-small" placeholder="Namnge ditt nya menyval och tryck tab">
                                                <label>Lägg till nytt menyval</label>
                                            </ScInput>
                                        </div>
                                        <!-- VISA HEL MENY -->
                                        <nesteddraggable :SubItemList="currentMenu" />
                                        <!-- <rawdisplayer :value="currentMenu" /> -->
                                    </ScCardBody>
                                </ScCard>
                            </div>
                            <div v-if="editMenuItem" class="uk-width-1-1" :class="{'uk-width-1-2' : editMenuItem }">
                                <ScCard>
                                    <ScCardHeader separator>
                                        <ScCardTitle>
                                            <img style="width: 50px; margin-right: 5px;" :src="editMenuItem.ImageName"> {{ editMenuItem.SeoList[0].Name }}
                                        </ScCardTitle>
                                    </ScCardHeader>
                                    <ScCardBody>
                                        <!-- TAB-HEADLINES - MENU/CATEGORIES -->
                                        <ul data-uk-tab>
                                            <li class="uk-active">
                                                <a href="javascript:void(0)">
                                                    SEO
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)">
                                                    Artiklar
                                                </a>
                                            </li>
                                        </ul>
                                        <!-- TAB-CONTENT - MENU/CATEGORIES -->
                                        <ul class="uk-switcher">
                                            <li>
                                                <!-- BILDUPPLADDNING -->
                                                <img :src="editMenuItem.ImageName">
												<div class="uk-padding-small uk-padding-remove-horizontal">
													<FileUpload
													:categoryId="editMenuItem.CategoryId"
													:menuImage="this.menuImage"
													@updateMenuImage="getMenuItemById(editMenuItem.CategoryId)"
													/>
												</div>
                                                <!-- Sortering -->
                                                <div class="uk-margin-medium-bottom uk-margin-medium-top uk-width-1-1">
                                                    <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                    <label class="select-label" for="select-sortingListOptionsList">Sorteringsordning</label>
                                                    <client-only>
                                                        <Select2
                                                            id="select-sortingListOptionsList"
                                                            v-model="editMenuItem.DefaultSorting"
                                                            :options="editMenuItem.SortingList.map(({ Id, Name }) => ({ id: Id, text: Name }))"
                                                            :settings="{ 'width': '100%', 'placeholder': 'Välj sorteringsordning', 'closeOnSelect': true }"
                                                            @select="updateMenuItem"
                                                        >
                                                        </Select2>
                                                    </client-only>
                                                    </div>
                                                </div>
                                                <!-- Dold publikt -->
                                                <div class="uk-margin uk-width-1-1">
                                                    <div class="">
                                                        <ul class="uk-list uk-margin-remove-top">
                                                            <li class="uk-text-small" style="padding: 3px 3px 3px 2px">
                                                                <PrettyCheck v-model="editMenuItem.IsHiddenInPublic" class="p-icon" @change="updateMenuItem()">
                                                                    <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Dold publikt</span>
                                                                </PrettyCheck>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <!-- SEO & ARTIKLAR -->
                                                <div v-for="(seoItem, index) in editMenuItem.SeoList" :key="seoItem.CategoryDescriptionId">
                                                    <hr>
                                                    <img :src="seoItem.FlagImage"> {{ seoItem.Language }}
                                                    <!-- Namn -->
                                                    <div class="uk-margin">
                                                        <ScInput v-model="seoItem.Name" state="fixed" mode="outline" v-on:blur="updateMenuItem()" extra-classes="uk-form-small">
                                                            <label>Namn</label>
                                                        </ScInput>
                                                    </div>
                                                    <!-- Meta-title -->
                                                    <div class="uk-margin">
                                                        <ScTextarea v-model="seoItem.MetaTitle" :rows="2" placeholder="" state="fixed" mode="outline" @blur="updateMenuItem()" extra-classes="uk-form-small uk-text-small">
                                                            <label>Meta-title</label>
                                                        </ScTextarea>
                                                    </div>
                                                    <!-- Meta-description -->
                                                    <div class="uk-margin">
                                                        <ScTextarea v-model="seoItem.MetaDescription" :rows="2" placeholder="" state="fixed" mode="outline" @blur="updateMenuItem()" extra-classes="uk-form-small uk-text-small">
                                                            <label>Meta-description</label>
                                                        </ScTextarea>
                                                    </div>
                                                    <!-- Meta-keywords -->
                                                    <div class="uk-margin">
                                                        <ScInput v-model="seoItem.MetaKeywords" state="fixed" mode="outline" v-on:blur="updateMenuItem()" extra-classes="uk-form-small">
                                                            <label>Meta-keywords</label>
                                                        </ScInput>
                                                    </div>
                                                    <!-- SEO-titel -->
                                                    <div class="uk-margin">
                                                        <ScInput v-model="seoItem.SeoTitle" state="fixed" mode="outline" v-on:blur="updateMenuItem()" extra-classes="uk-form-small">
                                                            <label>SEO-titel</label>
                                                        </ScInput>
                                                    </div>
                                                    <!-- SEO-subtitel -->
                                                    <div class="uk-margin">
                                                        <ScInput v-model="seoItem.SeoSubTitle" state="fixed" mode="outline" v-on:blur="updateMenuItem()" extra-classes="uk-form-small">
                                                            <label>SEO-subtitel</label>
                                                        </ScInput>
                                                    </div>
                                                    <!-- SEO-beskrivning -->
                                                    <div class="uk-margin">
                                                        <ScTextarea v-model="seoItem.SeoText" :rows="6" placeholder="" state="fixed" mode="outline" @blur="updateMenuItem()" extra-classes="uk-form-small uk-text-small">
                                                            <label>SEO-beskrivning</label>
                                                        </ScTextarea>
                                                    </div>
                                                    <!-- Dölj -->
                                                    <div class="uk-margin uk-width-1-1">
                                                        <div class="">
                                                            <ul class="uk-list uk-margin-remove-top">
                                                                <li class="uk-text-small" style="padding: 3px 3px 3px 2px">
                                                                    <PrettyCheck v-model="seoItem.IsHidden" class="p-icon" @change="updateMenuItem()">
                                                                        <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Dölj</span>
                                                                    </PrettyCheck>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <hr v-if="index+1 < editMenuItem.SeoList.length">
                                                </div>
                                            </li>
                                            <li>
                                                <!-- ARTIKLAR / DRAG & DROP -->
                                                <draggable tag="div" v-model="articleImages" @start="drag = true" @end="drag = false" @change="updateImageSorting" v-bind="dragOptions">
                                                    <transition-group type="transition" :name="!drag ? 'flip-list' : null" class="uk-flex uk-flex-wrap">
                                                        <div class="uk-width-1-6 sc-round" v-for="image in articleImages" :key="image.ArticleId">
                                                            <div class="sc-padding-small uk-position-relative">
                                                                <nuxt-link :to="image.Url"><img :src="image.ImageName"></nuxt-link>
                                                            </div>
                                                        </div>
                                                    </transition-group>
                                                </draggable>
                                            </li>
                                        </ul>
                                    </ScCardBody>
                                </ScCard>
                            </div>
                        </div>
                    </ScCardBody>
                </ScCard>
            </div>
        </div>
    </div>
</template>

<script>
import Alert from '~/components/Alert'
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'
import PrettyCheck from 'pretty-checkbox-vue/check'
import FileUpload from '~/components/FileUploadMenus'
import draggable from 'vuedraggable'
import nesteddraggable from "~/components/nested"
import rawdisplayer from '~/components/rawdisplayer'
import _ from 'lodash'

export default {
    order: 15,
	components: {
		Alert,
        draggable,
        nesteddraggable,
        rawdisplayer,
		ScInput,
		ScTextarea,
		PrettyCheck,
		FileUpload,
		Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            shops: [],
            shopId: 0,
            shopOptionsList: [],
            currentMenu: [],
            testMenu: [
                {val1: 'val1'},
                {val2: 'val2'},
                {val3: 'val3'},
            ],
            newMenuItemContainer: {},
            editMenuItem: null,
            menuImage: null,
            articleImages: [],
            errors: null,
            message: '',
        }
    },
    watch: {
        categoryId (newCategoryId, oldCategoryId) {
            this.getMenuItemById(newCategoryId)
            this.getArticleImages(newCategoryId)
        },
        listUpdated () {
            this.sortMenu()
        }
    },
	mounted () {
	},
    computed: {
        categoryId () {
            return this.$store.getters.categoryIdState
        },
        listUpdated () {
            return this.$store.getters.listUpdatedState
        },
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            }
        }
    },
    methods: {
		async updateImageSorting() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Menu/PostSortArticlesByCategoryId?categoryId=' + _this.categoryId, _this.articleImages)
			.then(function (response) {
                _this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
		},
        async getArticleImages() {
            let _this = this
            _this.showPageOverlaySpinner()
            await this.$axios.$get('/webapi/Menu/GetArticleListByCategoryId?categoryId=' + _this.categoryId)
            .then(function (articleimages) {
                _this.articleImages = articleimages
                _this.hidePageOverlaySpinner()
            })
            .catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
            })
        },
        hidePageOverlaySpinner () {
            this.$store.commit('toggleProgressOverlay', false);
            this.$store.commit('togglePageOverlay', false)
        },
        showPageOverlaySpinner () {
            this.$store.commit('toggleProgressOverlay', true);
            this.$store.commit('togglePageOverlay', true)
        },
        async getMenuByShopId() {
			let _this = this
            _this.currentMenu = []
            _this.editMenuItem = null
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/Menu/GetMenuByShopId?shopId=' + _this.shopId)
			.then(function (menu) {
                _this.currentMenu = menu
                _this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
		},
        async sortMenu() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Menu/PostSortMenu?shopId=' + _this.shopId, _this.currentMenu)
			.then(function (menu) {
                _this.currentMenu = menu
                _this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
		},
        async getMenuItemById(categoryId) {
            let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/Menu/GetMenuItemById?categoryId=' + this.$store.getters.categoryIdState)
			.then(function (editmenuitem) {
                _this.editMenuItem = editmenuitem
                _this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
		},
        async updateMenuItem() {
            let _this = this
            _this.showPageOverlaySpinner()
            await this.$axios.$post('/webapi/Menu/PostUpdateMenuItem', _this.editMenuItem)
            .then(function (menu) {
                setTimeout(() => {
                    _this.getMenuByShopId(_this.shopId)
                }, 100)
                _this.hidePageOverlaySpinner()
            })
            .catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
            })
        },
        async addMenuItem() {
			let _this = this
            _this.newMenuItemContainer.shopId = _this.shopId
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Menu/PostAddMenuItem', _this.newMenuItemContainer)
			.then(function (response) {
                _this.getMenuByShopId()
                _this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
		},
    },
    async fetch () {
        try {
            const [ shops, menuItem ] = await Promise.all([
                this.$axios.$get('/webapi/Shop/GetShopList'),
                this.$axios.$get('/webapi/Menu/GetEmptyMenuItem'),
            ])
            this.shopOptionsList = shops.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
            this.shops = shops
            this.menuItem = menuItem
        } catch (err) {
            console.log(err);
        }
    },
}
</script>

<style lang="scss">
    .flip-list-move {
    transition: transform 0.5s;
    }
    .no-move {
    transition: transform 0s;
    }
    .ghost {
    opacity: 0.5;
    background: #c8ebfb;
    }
</style>