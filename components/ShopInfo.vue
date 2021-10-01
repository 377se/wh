<template>
	<div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
        <!-- VÄNSTER KOLUMN -->
        <div>
            <!-- PRISER -->
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
                        <!-- Ordinarie utpris -->
                        <div class="uk-margin">
                            <ScInput v-model="shopInfo.Price" state="fixed" mode="outline" v-on:blur="updateArticleDescription()" extra-classes="uk-form-small">
                                <label>Ordinarie utpris</label>
                            </ScInput>
                        </div>
                        <div class="uk-margin">
                            <ScInput v-model="shopInfo.PriceOnSale" state="fixed" mode="outline" v-on:blur="updateArticleDescription()" extra-classes="uk-form-small">
                                <label>REA-pris</label>
                            </ScInput>
                        </div>
                        <!-- Rean t.o.m. -->
                        <div class="uk-margin">
                            <ScInput v-model="shopInfo.SaleValidThru" v-flatpickr="{ 'locale': Swedish }" placeholder="Rean t.o.m...." state="fixed" mode="outline" @input="updateArticleDescription()" extra-classes="uk-form-small">
                                <label>Rean t.o.m.</label>
                            </ScInput>
                        </div>
                        <!-- Outlet -->
                        <div class="uk-margin uk-width-1-1">
                            <div class="">
                                <ul class="uk-list uk-margin-remove-top">
                                    <li class="uk-text-small" style="padding: 3px 3px 3px 2px">
                                        <PrettyCheck v-model="shopInfo.Outlet" class="p-icon" @change="updateArticleDescription()">
                                            <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Outlet</span>
                                        </PrettyCheck>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </ScCardBody>
                </ScCardContent>
            </ScCard>
            <!-- PRODUKTBESKRIVNING -->
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
                        <div class="uk-margin" v-for="description in shopInfo.DescriptionList" :key="description.ArticleDescriptionId">
                            <ScTextarea v-model="description.Description" :rows="5" placeholder="" state="fixed" mode="outline" @blur="updateArticleDescription()" extra-classes="uk-form-small">
                                <label><img :src="description.FlagImage"> Beskrivning</label>
                            </ScTextarea>
                        </div>
                    </ScCardBody>
                </ScCardContent>
            </ScCard>
        </div>
        <!-- HÖGER KOLUMN -->
        <div>
            <!-- VÄLJ MENYPLACERING -->
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
                                <div class="uk-flex uk-flex-middle">
                                    <PrettyCheck v-if="!menuitem.IsDisabled" v-model="menuitem.IsSelected" class="p-icon" @change="updateMenuInfo(menuitem)">
                                        <i slot="extra" class="icon mdi mdi-check"></i>
                                    </PrettyCheck>
                                    <div :class="{'uk-margin-small-left' : !menuitem.IsDisabled }">{{ menuitem.Name }}</div>
                                </div>
                                <ul v-if="menuitem.HasChildren" class="uk-margin-small-bottom">
                                    <li class="uk-list uk-list-collapse" v-for="childMenuItem in menuitem.SubItemList" :key="childMenuItem.CategoryId">
                                        <PrettyCheck v-model="childMenuItem.IsSelected" class="p-icon" @change="updateMenuInfo(childMenuItem)">
											<i slot="extra" class="icon mdi mdi-check"></i>
                                            {{ childMenuItem.Name }}
										</PrettyCheck>
                                            <i v-if="childMenuItem.IsHiddenInPublic == true" class="mdi mdi-eye-off sc-icon-18" style="line-height: 0; margin-left:20px; padding-top:5px;"></i>
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
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'
import { Swedish } from "flatpickr/dist/l10n/sv.js"

if(process.client) {
	require('~/plugins/flatpickr');
}

export default {
	components: {
		ScInput,
		ScTextarea,
		PrettyCheck,
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
		Swedish,
	}),
    watch: {
    },
    methods: {
        async updateMenuInfo(childMenuItem) {
            let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/Menu/PostUpdateMenuByShop?shopId=' + _this.shopId + '&articleId=' + _this.articleId, childMenuItem)
			.then(function (response) {
                _this.$store.dispatch('setBusyOff')
			})
			.catch(function (error) {
				console.log(error)
			})
		},
		async updateArticleDescription() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/Article/PostUpdateArticleDescription', _this.shopInfo)
			.then(function (response) {
                _this.$store.dispatch('setBusyOff')
            })
			.catch(function (error) {
				console.log(error)
			})
		},
	},
	async fetch () {
        this.$store.dispatch('setBusyOn')
		try {
			const [shopInfo, menuInfo] = await Promise.all([
				this.$axios.$get('/webapi/Article/GetArticleDescription?shopId=' + this.shopId + '&articleId=' + this.articleId),
				this.$axios.$get('/webapi/Menu/GetMenuByShop?shopId=' + this.shopId + '&articleId=' + this.articleId),
      		])
			this.shopInfo = shopInfo
			this.menuInfo = menuInfo
            this.$store.dispatch('setBusyOff')
		} catch (err) {
      		console.log(err);
		}
    },
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
	.uk-input {
		height: 30px;
		border-radius: 0;
		color: rgba(0, 0, 0, 0.87);
		background-color: #fff;
		padding: 8px 8px 7px;
		font-size: 0.75rem;
	}
</style>
