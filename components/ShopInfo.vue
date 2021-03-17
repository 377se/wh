<template>
	<div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
        <div>
            <ScCard :full-screen="cardPricesFullScreen">
                <ScCardHeader separator>
                    <div class="uk-flex uk-flex-middle">
                        <div class="uk-flex-1">
                            <ScCardTitle>
                                Priser
                            </ScCardTitle>
                        </div>
                        <ScCardActions>
                            <a
                                href="javascript:void(0)"
                                class="sc-actions-icon mdi mdi-fullscreen"
                                :class="{'mdi-fullscreen' : !cardPricesFullScreen, 'mdi-fullscreen-exit' : cardPricesFullScreen }"
                                @click.prevent="cardPricesFullScreen = !cardPricesFullScreen"
                            ></a>
                        </ScCardActions>
                    </div>
                </ScCardHeader>
                <ScCardContent>
                    <ScCardBody>
                        Priser
                    </ScCardBody>
                </ScCardContent>
            </ScCard>
            <ScCard class="uk-margin-medium-top" :full-screen="cardDescriptionFullScreen">
                <ScCardHeader separator>
                    <div class="uk-flex uk-flex-middle">
                        <div class="uk-flex-1">
                            <ScCardTitle>
                                Produktbeskrivning
                            </ScCardTitle>
                        </div>
                        <ScCardActions>
                            <a
                                href="javascript:void(0)"
                                class="sc-actions-icon mdi mdi-fullscreen"
                                :class="{'mdi-fullscreen' : !cardDescriptionFullScreen, 'mdi-fullscreen-exit' : cardDescriptionFullScreen }"
                                @click.prevent="cardDescriptionFullScreen = !cardDescriptionFullScreen"
                            ></a>
                        </ScCardActions>
                    </div>
                </ScCardHeader>
                <ScCardContent>
                    <ScCardBody>
                        Produktbeskrivning
                    </ScCardBody>
                </ScCardContent>
            </ScCard>
        </div>
        <div>
            <ScCard :full-screen="cardMenuFullScreen">
                <ScCardHeader separator>
                    <div class="uk-flex uk-flex-middle">
                        <div class="uk-flex-1">
                            <ScCardTitle>
                                Välj menyplacering
                            </ScCardTitle>
                        </div>
                        <ScCardActions>
                            <a
                                href="javascript:void(0)"
                                class="sc-actions-icon mdi mdi-fullscreen"
                                :class="{'mdi-fullscreen' : !cardMenuFullScreen, 'mdi-fullscreen-exit' : cardMenuFullScreen }"
                                @click.prevent="cardMenuFullScreen = !cardMenuFullScreen"
                            ></a>
                        </ScCardActions>
                    </div>
                </ScCardHeader>
                <ScCardContent>
                    <ScCardBody>
                        <ul class="uk-padding-remove-left">
							<li  class="uk-list uk-list-collapse" v-for="menuitem in menuInfo" :key="menuitem.CategoryId">
								{{ menuitem.Name }}
                                <ul v-if="menuitem.HasChildren">
                                    <li class="uk-list uk-list-collapse" v-for="childMenuItem in menuitem.SubItemList" :key="childMenuItem.CategoryId">
                                        <PrettyCheck v-model="childMenuItem.IsSelected" class="p-icon" @change="updateMenuInfo()">
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck>
                                        <span :class="{ 'uk-text-danger': childMenuItem.IsHiddenInPublic }">
                                            {{ childMenuItem.Name }}
                                        </span>
                                    </li>
                                </ul>
  							</li>
                        </ul>
                    </ScCardBody>
                </ScCardContent>
            </ScCard>
        </div>
  </div>
</template>

<script>
import PrettyCheck from 'pretty-checkbox-vue/check'
import contentOverlay from '~/components/Overlay'

export default {
	components: {
		PrettyCheck,
		contentOverlay,
    },
    props: {
		shopId: {
			type: Number,
			default: () => 0
		},
		articleId: {
			type: Number,
			default: () => 0
		},
	},
	data: () => ({
        cardPricesFullScreen: false,
        cardDescriptionFullScreen: false,
        cardMenuFullScreen: false,
		shopInfo: [],
		menuInfo: [],
		isLoading: true,
		contentOverlayActive: false,
	}),
	methods: {
        async updateMenuInfo() {
			let _this = this
			_this.isLoading = true
			await this.$axios.$post('/webapi/Menu/PostUpdateMenuByShop?shopId=' + _this.shopId + '&articleId=' + _this.articleId, _this.menuInfo)
			.then(function (response) {
				if(response.Message !== ''){
					_this.showPageOverlaySpinner()
					_this.isLoading = false
				} else {

        		}
			})
			.catch(function (error) {
				console.log(error)
			})
		},
		showPageOverlaySpinner () {
			this.$store.commit('togglePageOverlay', true)
			this.$store.commit('toggleProgressOverlay', true);
			setTimeout(() => {
				this.$store.commit('toggleProgressOverlay', false);
				setTimeout(() => {
					this.$store.commit('togglePageOverlay', false)
				})
			}, 500)
		},
	},
	async fetch () {
		try {
			const [shopInfo, menuInfo] = await Promise.all([
				this.$axios.$get('/webapi/Article/GetArticleDescription?shopId=' + this.shopId + '&articleId=' + this.articleId),
				this.$axios.$get('/webapi/Menu/GetMenuByShop?shopId=' + this.shopId + '&articleId=' + this.articleId),
      		])
			this.shopInfo = shopInfo
			this.menuInfo = menuInfo
		} catch (err) {
      		console.log(err);
		}
    },
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
