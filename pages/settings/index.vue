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
                        <h1 class="sc-top-bar-title uk-display-inline">Inställningar</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody>
                                <Alert
                                    :errorlist="this.errors ? this.errors : []"
                                    :message="this.message ? this.message : ''"
                                    :alertClass="'uk-alert-danger'"
                                    id=1
                                />
                                <Alert
                                    :errorlist="this.errors ? this.errors : []"
                                    :message="this.message ? this.message : ''"
                                    :alertClass="'uk-alert-success'"
                                    id=2
                                />
                                <div class="uk-margin-medium-bottom uk-width-1-1">
                                    <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                    <client-only>
                                        <Select2
                                            id="select-shopOptionsList"
                                            v-model="shopId"
                                            :options="shopList"
                                            :settings="{ 'width': '100%', 'placeholder': 'Välj shop för att redigera inställningar', 'closeOnSelect': true }"
                                            @select="getShopSettings"
                                        >
                                        </Select2>
                                    </client-only>
                                    </div>
                                </div>
                                <div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
                                    <div>
                                        <ScCard>
                                            <ScCardBody v-if="shopSettings">
                                                <button v-waves.button.light class="sc-button sc-button-primary" @click="releaseCache">
                                                    SLÄPP CACHE FÖR SHOP
                                                </button>
												<!-- ShopName -->
												<div class="uk-margin">
													<ScInput v-model="shopSettings.ShopName" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Shopnamn</label>
													</ScInput>
												</div>
												<!-- Prefix -->
												<div class="uk-margin">
													<ScInput v-model="shopSettings.Prefix" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Prefix</label>
													</ScInput>
												</div>
												<!-- Bas-url -->
												<div class="uk-margin">
													<ScInput v-model="shopSettings.BaseUrl" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Bas-url</label>
													</ScInput>
												</div>
												<!-- Epost -->
												<div class="uk-margin">
													<ScInput v-model="shopSettings.SupportEmail" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Epost</label>
													</ScInput>
												</div>
												<!-- Coins aktiva -->
												<div class="uk-margin uk-width-1-1">
                                                    <PrettyCheck v-model="shopSettings.Coins" class="p-icon">
                                                        <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Coins aktiva</span>
                                                    </PrettyCheck>
												</div>
												<!-- Coinsbenämning -->
												<div class="uk-margin">
													<ScInput v-model="shopSettings.CoinsName" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Coinsbenämning</label>
													</ScInput>
												</div>
												<!-- Medlemspriser -->
												<div class="uk-margin">
													<PrettyCheck v-model="shopSettings.MemberPrices" class="p-icon">
														<i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Medlemspriser</span>
													</PrettyCheck>
												</div>
												<!-- Medlemsrabatt -->
												<div class="uk-margin">
													<ScInput v-model="shopSettings.MemberDiscount" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Medlemsrabatt</label>
													</ScInput>
												</div>
												<!-- Tryckkostnad namn -->
												<div class="uk-margin">
													<ScInput v-model="shopSettings.PrintNamePrice" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Tryckkostnad namn</label>
													</ScInput>
												</div>
												<!-- Tryckkostnad nummer -->
												<div class="uk-margin">
													<ScInput v-model="shopSettings.PrintNumberPrice" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Tryckkostnad nummer</label>
													</ScInput>
												</div>
												<!-- Tryckkostnad patch -->
												<div class="uk-margin">
													<ScInput v-model="shopSettings.PrintPatchesPrice" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Tryckkostnad patch</label>
													</ScInput>
												</div>
												<!-- Storyblokversion -->
												<div class="uk-margin">
													<ScInput v-model="shopSettings.StoryblokCurrentVersion" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Storyblokversion</label>
													</ScInput>
												</div>
												<!-- Cloudflare ZoneId -->
												<div class="uk-margin">
													<ScInput v-model="shopSettings.CloudflareZoneId" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Cloudflare ZoneId</label>
													</ScInput>
												</div>
												<!-- Cloudflare Email -->
												<div class="uk-margin">
													<ScInput v-model="shopSettings.CloudflareEmail" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Cloudflare Email</label>
													</ScInput>
												</div>
												<!-- Cloudflare Key -->
												<div class="uk-margin">
													<ScInput v-model="shopSettings.CloudflareKey" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Cloudflare Key</label>
													</ScInput>
												</div>
												<!-- Cloudflare Bas-url -->
												<div class="uk-margin">
													<ScInput v-model="shopSettings.CloudflareBaseUrl" state="fixed" mode="outline"  extra-classes="uk-form-small">
														<label>Cloudflare Bas-url</label>
													</ScInput>
												</div>
                                                <button v-waves.button.light class="sc-button sc-button-primary" @click="updateShop">
                                                    UPPDATERA
                                                </button>
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
import ScInput from '~/components/Input'
import PrettyCheck from 'pretty-checkbox-vue/check'
import Alert from '~/components/Alert'

    export default {
        components: {
    		Alert,
    		ScInput,
    		PrettyCheck,
            Select2: process.client ? () => import('~/components/Select2') : null,
        },
        data() {
            return {
                errors: null,
                message: null,
                shopId: null,
                shopList: null,
                shopSettings: null,
            }
        },
        methods: {
            hidePageOverlaySpinner () {
                this.$store.commit('toggleProgressOverlay', false);
                this.$store.commit('togglePageOverlay', false)
            },
            showPageOverlaySpinner () {
                this.$store.commit('toggleProgressOverlay', true);
                this.$store.commit('togglePageOverlay', true)
            },
            async getShopSettings() {
                let _this = this
                _this.$store.commit('setAlertHidden', 1)
                _this.$store.commit('setAlertHidden', 2)
                _this.showPageOverlaySpinner()
                await this.$axios.$get('/webapi/Shop/GetShopSetting?shopId=' + _this.shopId)
                .then(function (shopsettings) {
                    try {
                        if (shopsettings.ErrorList != null ) {
                            _this.errors = shopsettings.ErrorList
                            _this.hidePageOverlaySpinner()
                            _this.$store.commit('setAlertVisible', 1)
                        } else {
                            if (shopsettings.Message != null ) {
                                _this.message = shopsettings.Message
                                _this.$store.commit('setAlertVisible', 2)
                            }
                            _this.shopSettings = shopsettings
                            _this.hidePageOverlaySpinner()
                        }
                    } catch(err) {
                        console.log(err)
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    _this.hidePageOverlaySpinner()
			    })
            },
            async updateShop() {
                let _this = this
                _this.errors = null
                _this.message = null
                _this.showPageOverlaySpinner()
                await this.$axios.$post('/webapi/Shop/UpdateShop', _this.shopSettings)
                .then(function (response) {
                    try {
                        if (response.ErrorList != null ) {
                            _this.errors = response.ErrorList
                            _this.hidePageOverlaySpinner()
                            _this.$store.commit('setAlertVisible', 1)
                        } else {
                            _this.message = response.Message
                            _this.shopSettings = shopsettings
                            _this.hidePageOverlaySpinner()
                            _this.$store.commit('setAlertVisible', 2)
                        }
                    } catch(err) {
                        _this.hidePageOverlaySpinner()
                        console.log(err)
                    }
                })
                .catch(function (error) {
                    _this.hidePageOverlaySpinner()
                    console.log(error)
                })
            },
            async releaseCache() {
                let _this = this
                _this.errors = null
                _this.message = null
                _this.showPageOverlaySpinner()
                await this.$axios.$post('/webapi/Cloudflare/ReleaseCache', _this.shopSettings)
                .then(function (response) {
                    try {
                        if (response.ErrorList != null ) {
                            _this.errors = response.ErrorList
                            _this.hidePageOverlaySpinner()
                            console.log(response)
                            _this.$store.commit('setAlertVisible', 1)
                        } else {
                            _this.message = response.Message
                            _this.hidePageOverlaySpinner()
                            _this.$store.commit('setAlertVisible', 2)
                        }
                    } catch(err) {
                        _this.hidePageOverlaySpinner()
                        console.log(err)
                    }
                })
                .catch(function (error) {
                    _this.hidePageOverlaySpinner()
                    console.log(error)
                })
            },
        },
        async fetch () {
            try {
                const [shoplist] = await Promise.all([
                    this.$axios.$get('/webapi/Shop/GetShopList'),
                ])
                this.shopList = shoplist.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
            } catch (err) {
                console.log(err);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>