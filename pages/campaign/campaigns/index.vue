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
                        <h1 class="sc-top-bar-title uk-display-inline">Kampanjöversikt</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <div class="uk-grid uk-grid-medium" uk-grid uk-margin>
                    <div class="uk-width-1-1 uk-width-2-3@m">
                        <!-- ACTIVE CAMPAIGNS -->
                        <ScCard v-if="campaignList" class="uk-card-small">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    <div class="uk-flex uk-flex-left uk-flex-middle">
                                        <i class="mdi mdi-star md-color-green-600 uk-margin-small-right"></i>
                                        <div>Aktiva kampanjer</div>
                                    </div>
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto" style="max-height:600px;">
                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove" style="border-collapse: separate;">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 20%;">Shop</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 30%;">Kampanjtyp</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 15%;">Start</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 15%;">Slut</th>
                                                <th class="sticky-headers border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 20%;">Dagar kvar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="campaign in campaignList.filter(campaign => campaign.IsActive)" :key="campaign.CampaignId" class="uk-table-middle">
                                                <td class="border-bottom border-left cursor-pointer" style="color: #048ACD; text-align: left; " @click="getCampaignById(campaign.CampaignId)">{{ campaign.ShopName }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ campaign.Name }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ campaign.FromDate }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ campaign.ValidThru }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ campaign.DaysLeft }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ScCardBody>
                        </ScCard>
                        <!-- INACTIVE CAMPAIGNS -->
                        <ScCard v-if="campaignList" class="uk-card-small uk-margin-medium-top">
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    <div class="uk-flex uk-flex-left uk-flex-middle">
                                        <i class="mdi mdi-close-octagon md-color-red-600 uk-margin-small-right"></i>
                                        <div>Inaktiva kampanjer</div>
                                    </div>
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="uk-overflow-auto" style="max-height:600px;">
                                    <table class="uk-table uk-table-small uk-text-small uk-margin-remove" style="border-collapse: separate;">
                                        <thead>
                                            <tr class="uk-padding-remove-bottom">
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 20%;">Shop</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 30%;">Kampanjtyp</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 15%;">Start</th>
                                                <th class="sticky-headers border-top border-bottom border-left uk-text-small" style="text-align: left; width: 15%;">Slut</th>
                                                <th class="sticky-headers border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 20%;">Dagar kvar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="campaign in campaignList.filter(campaign => !campaign.IsActive)" :key="campaign.CampaignId" class="uk-table-middle">
                                                <td class="border-bottom border-left cursor-pointer" style="color: #048ACD; text-align: left; " @click="getCampaignById(campaign.CampaignId)">{{ campaign.ShopName }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ campaign.Name }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ campaign.FromDate }}</td>
                                                <td class="border-bottom border-left" style="text-align: left; ">{{ campaign.ValidThru }}</td>
                                                <td class="border-bottom border-left border-right" style="text-align: left; ">{{ campaign.DaysLeft }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <div class="uk-width-1-1 uk-width-1-3@m uk-flex-first uk-flex-last@m" uk-margin>
                    <ScCard>
                        <ScCardHeader separator>
                            <ScCardTitle v-if="currentCampaignObject.CampaignId != 0">
                                Redigera kampanj
                            </ScCardTitle>
                            <ScCardTitle v-else>
                                Skapa ny kampanj
                            </ScCardTitle>
                        </ScCardHeader>
                        <ScCardBody>
                            <div class="uk-width-1-1">
                                <Alert
                                    :errorlist="errors"
                                    :alertClass="'uk-alert-danger'"
                                    id=1
                                />
                                <div class="uk-width-1-1 uk-flex uk-flex-middle">
                                    <img class="uk-margin-small-right" :src="currentCampaignObject.ImageName">
                                    <h4 class="uk-margin-remove"><strong>{{ currentCampaignObject.Name }}</strong></h4>
                                </div>
                                <div v-if="currentCampaignObject.CampaignId != 0">
                                    <div v-if="!currentCampaignObject.IsActive" class="uk-label uk-label-danger uk-border-rounded uk-margin-medium-top uk-margin-small-bottom">
                                        Denna kampanj är inaktiv
                                    </div>
                                    <div v-else class="uk-label uk-label-success uk-border-rounded uk-margin-medium-top uk-margin-small-bottom">
                                        Denna kampanj är aktiv
                                    </div>
                                </div>

                                    <div>
                                        <!-- Shop -->
                                        <div v-if="currentCampaignObject.CampaignId == 0" class="uk-margin uk-width-1-1 uk-margin-medium-top">
                                            <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                <label class="select-label" for="select-shopList">Shop</label>
                                                <client-only>
                                                    <Select2
                                                        id="select-shopList"
                                                        v-model.number="currentCampaignObject.ShopId"
                                                        :options="shopList"
                                                        :settings="{ 'width': '100%', 'closeOnSelect': true }"
                                                    >
                                                    </Select2>
                                                </client-only>
                                            </div>
                                        </div>
                                        <!-- Kampanjtyp -->
                                        <div v-if="currentCampaignObject.CampaignId == 0" class="uk-margin uk-width-1-1 uk-margin-medium-top">
                                            <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                <label class="select-label" for="select-campaignList">Kampanjtyp</label>
                                                <client-only>
                                                    <Select2
                                                        id="select-campaignList"
                                                        v-model.number="currentCampaignObject.CampaignTypeId"
                                                        :options="currentCampaignObject.CampaignTypeList.map(({ CampaignTypeId, Name }) => ({ id: CampaignTypeId, text: Name }))"
                                                        :settings="{ 'width': '100%', 'closeOnSelect': true }"
                                                    >
                                                    </Select2>
                                                </client-only>
                                            </div>
                                        </div>
                                        <!-- Startdatum -->
                                        <div v-if="currentCampaignObject.CampaignId != 0" class="uk-margin-large-top">
                                            <ScInput v-model="currentCampaignObject.FromDate" v-flatpickr="{ 'locale': Swedish, enableTime: true, enableSeconds: true }" placeholder="Välj startdatum..." state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Startdatum</label>
                                            </ScInput>
                                        </div>
                                        <!-- Slutdatum -->
                                        <div v-if="currentCampaignObject.CampaignId != 0" class="uk-margin">
                                            <ScInput v-model="currentCampaignObject.ValidThru" v-flatpickr="{ 'locale': Swedish, enableTime: true, enableSeconds: true }" placeholder="Välj slutdatum..." state="fixed" mode="outline" extra-classes="uk-form-small">
                                                <label>Slutdatum</label>
                                            </ScInput>
                                        </div>
                                        <!-- Minsta ordersumma -->
                                        <div v-if="currentCampaignObject.CampaignId != 0" class="uk-margin">
                                            <div v-if="currentCampaignObject.CampaignTypeId == 3">
                                                <ScInput v-model="currentCampaignObject.MinOrderSum" state="fixed" mode="outline"  extra-classes="uk-form-small">
                                                    <label>Minsta ordersumma</label>
                                                </ScInput>
                                            </div>
                                        </div>
                                        <!-- Produkttyp -->
                                        <div v-if="currentCampaignObject.CampaignId != 0" class="uk-width-1-1 uk-margin-medium-top">
                                            <div v-if="currentCampaignObject.CampaignTypeId == 2">
                                                <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                    <label class="select-label" for="select-team">Produkttyp</label>
                                                    <client-only>
                                                        <Select2
                                                            id="select-leagueList"
                                                            v-model.number="currentCampaignObject.ProductTypeId"
                                                            :options="productTypeList"
                                                            :settings="{ 'width': '100%', 'closeOnSelect': true }"
                                                        >
                                                        </Select2>
                                                    </client-only>
                                                </div>
                                            </div>
                                        </div>
                                    <!-- ArtikelNr -->
                                    <div v-if="currentCampaignObject.CampaignId != 0" class="uk-margin-medium-top">
                                        <div class="uk-margin">
                                            <ScInput v-model="currentCampaignObject.ArticleInfo.ArticleNumber" state="fixed" mode="outline" extra-classes="uk-form-small" v-on:blur="getArticleDetails(currentCampaignObject.ArticleInfo.ArticleNumber)">
                                                <label>ArtikelNr</label>
                                            </ScInput>
                                        </div>
                                        <div v-if="currentCampaignObject.ArticleInfo.ArticleId" class="uk-flex">
                                            <div class="uk-margin-small-right uk-width-1-4">
                                                <img :src="currentCampaignObject.ArticleInfo.ImageName">
                                            </div>
                                            <div :class="{ 'uk-width-3-4': !errors }">
                                                <!-- Produktnamn -->
                                                <div class="uk-margin-medium-bottom">
                                                    <ScInput v-model="currentCampaignObject.ArticleInfo.ArticleName" state="fixed" mode="outline" extra-classes="uk-form-small" disabled>
                                                        <label>Produktnamn</label>
                                                    </ScInput>
                                                </div>
                                                <!-- Pris -->
                                                <div class="uk-margin-medium-bottom">
                                                    <ScInput v-model="currentCampaignObject.ArticleInfo.Price" state="fixed" mode="outline" extra-classes="uk-form-small" placeholder="Skriv in pris">
                                                        <label>Pris</label>
                                                    </ScInput>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        <!-- Aktiv? -->
                                        <div v-if="currentCampaignObject.CampaignId != 0" class="uk-margin-small-top uk-margin-medium-bottom">
                                            <PrettyCheck v-model="currentCampaignObject.IsActive" class="p-icon">
                                                <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Aktiv?</span>
                                            </PrettyCheck>
                                        </div>

                                    </div>

                                    <!-- INFO-TEXTER -->

                                    <div class="uk-margin-medium-bottom">
                                        <div v-if="currentCampaignObject.CampaignId != 0">
                                            <div v-if="currentCampaignObject.CampaignTypeId == 2">
                                                <div class="uk-text-small"><strong>Information</strong></div>
                                                <div class="uk-text-small uk-margin-small-bottom">En klassisk "ta 3 produkter, betala för 2". Den billigaste produkten blir gratis.</div>
                                                <div class="uk-text-small"><strong>Start- och slutdatum</strong></div>
                                                <div class="uk-text-small uk-margin-small-bottom">Format: 2017-04-17 23:59:00</div>
                                                <div class="uk-text-small"><strong>Produkttyp</strong></div>
                                                <div class="uk-text-small uk-margin-small-bottom">Här klickar du i den/de produkttyper vars produkter ska triggas av 3 för 2-erbjudandet</div>
                                            </div>
                                        </div>
                                        <div v-if="currentCampaignObject.CampaignId != 0">
                                            <div v-if="currentCampaignObject.CampaignTypeId == 3">
                                                <div class="uk-text-small"><strong>Information</strong></div>
                                                <div class="uk-text-small uk-margin-small-bottom">När kunden passerat en minimisumma läggs en frivara i varukorgen.</div>
                                                <div class="uk-text-small"><strong>Minsta ordersumma</strong></div>
                                                <div class="uk-text-small uk-margin-small-bottom">Minsta ordersumma för att trigga gratisprodukt</div>
                                                <div class="uk-text-small"><strong>Start- och slutdatum</strong></div>
                                                <div class="uk-text-small uk-margin-small-bottom">Format: 2017-04-17 23:59:00</div>
                                                <div class="uk-text-small"><strong>Koppla artikel</strong></div>
                                                <div class="uk-text-small uk-margin-small-bottom">Här väljer du den artikel som ska bli "frivara" när ordersumman uppnåtts.</div>
                                            </div>
                                        </div>
                                    </div>


                                <!-- <Rawdisplayer :value="currentCampaignObject" /> -->
                                <!-- <Rawdisplayer :value="productTypeList" /> -->



                                <div class="uk-flex uk-flex-around">
                                    <div v-if="currentCampaignObject.CampaignId == 0">
                                        <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="createCampaign()">NY&nbsp;KAMPANJ
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateCampaign()">
                                            UPPDATERA
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
    </div>
</template>

<script>
import Alert from '~/components/Alert'
import Rawdisplayer from '~/components/rawdisplayer'
import ScInput from '~/components/Input'
import { Swedish } from "flatpickr/dist/l10n/sv.js"
import PrettyCheck from 'pretty-checkbox-vue/check'
import PrettyRadio from 'pretty-checkbox-vue/radio';

if(process.client) {
	require('~/plugins/flatpickr');
}

export default {
	components: {
        Alert,
		Rawdisplayer,
		ScInput,
        Select2: process.client ? () => import('~/components/Select2') : null,
		PrettyCheck,
		PrettyRadio,
		Swedish,
	},
    data() {
        return {
            errors: null,
            message: null,
            emptyCampaignObject: null,
            currentCampaignObject: null,
            campaignList: null,
            productTypeList: null,
            shopList: null,
            Swedish,
        }
    },
    methods: {
        async getCampaignById(campaignid) {
            let _this = this
            _this.currentCampaignObject = _this.emptyCampaignObject
            try {
                const [ currentcampaign ] = await Promise.all([
                    this.$axios.$get('/webapi/Campaign/GetCampaignById?campaignId=' + campaignid ),
            ])
			    _this.currentCampaignObject = currentcampaign
            } catch (err) {
                console.log(err);
            }
		},
        async createCampaign() {
            let _this = this
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Campaign/CreateCampaign', _this.currentCampaignObject)
            .then(function (createdcampaign) {
                if (createdcampaign.ErrorList != null) {
                    _this.errors = createdcampaign.ErrorList
                    _this.$store.commit('setAlertVisible', 1)
                    _this.$store.dispatch('setBusyOff')
                } else {
                    _this.currentCampaignObject = createdcampaign
                    _this.campaignList.unshift(createdcampaign)
                    UIkit.modal.dialog('<p class="uk-modal-body">Kampanjen har skapats!</p>')
                    _this.$store.dispatch('setBusyOff')
                }
            })
            .catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
            })
        },
        async updateCampaign() {
            let _this = this
            _this.errors = null
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/Campaign/UpdateCampaign', _this.currentCampaignObject)
            .then(function (updatedcampaign) {
                if (updatedcampaign.ErrorList != null) {
                    _this.errors = updatedcampaign.ErrorList
                    _this.$store.commit('setAlertVisible', 1)
                    _this.$store.dispatch('setBusyOff')
                } else {
                    _this.currentCampaignObject = updatedcampaign
                    UIkit.modal.dialog('<p class="uk-modal-body">Kampanjen har uppdaterats!</p>')
                    _this.$store.dispatch('setBusyOff')
                }
            })
            .catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
            })
        },
        async getArticleDetails(articlenumber) {
			let _this = this
            _this.errors = null
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$get('/webapi/Article/GetArticleDetailsByArticleNumber?articleNumber=' + articlenumber)
			.then(function (foundarticle) {
                try {
                    if (foundarticle.ErrorList != null ) {
                        _this.errors = foundarticle.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.currentCampaignObject.ArticleInfo.ArticleId = foundarticle.ArticleId
                        _this.currentCampaignObject.ArticleInfo.ArticleNumber = foundarticle.ArticleNumber
                        _this.currentCampaignObject.ArticleInfo.ArticleName = foundarticle.ProductName
                        _this.currentCampaignObject.ArticleInfo.ImageName = foundarticle.ProductImage
                        _this.currentCampaignObject.ArticleInfo.Url = foundarticle.Url
                        _this.currentCampaignObject.ArticleInfo.Price = foundarticle.Price
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
        this.$store.dispatch('setBusyOn')
        try {
            const [ emptycampaignobject, campaignlist, producttypelist, shoplist ] = await Promise.all([
                this.$axios.$get('/webapi/Campaign/GetEmptyCampaign'),
                this.$axios.$get('/webapi/Campaign/GetCampaignList'),
                this.$axios.$get('/webapi/Metadata/GetProductTypeList'),
                this.$axios.$get('/webapi/Shop/GetShopList'),
            ])
            this.emptyCampaignObject = emptycampaignobject
            this.currentCampaignObject = emptycampaignobject
            this.campaignList = campaignlist
            this.productTypeList = producttypelist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            this.shopList = shoplist.map(({ ShopId, ShopName }) => ({ id: ShopId, text: ShopName }))
            this.$store.dispatch('setBusyOff')
        } catch (err) {
            console.log(err);
        }
    }
}
</script>

<style lang="scss" scoped>
	@import '~scss/vue/_pretty_checkboxes';
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
	.uk-modal-full {
		background: rgba(0, 0, 0, 0.6);
	}
	.uk-modal-dialog, .uk-modal-header {
		margin-left: auto;
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
    .cursor-pointer {
		cursor: pointer;
	}
</style>