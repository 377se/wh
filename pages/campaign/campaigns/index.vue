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
                        <h1 class="sc-top-bar-title uk-display-inline">Kampanjöversikt</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <!-- ACTIVE CAMPAIGNS -->
                <ScCard v-if="campaignList" class="uk-card-small uk-margin-medium-top">
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
                                        <td class="border-bottom border-left" style="text-align: left; ">{{ campaign.ShopName }}</td>
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
        </div>

        <!-- CAMPAIGN-EDIT MODAL -->
        <div v-if="campaignBeingEdited" id="campaign-edit-modal" class="uk-modal-full uk-modal" data-uk-modal>
            <div class="uk-modal-header basket-ribbon uk-animation-slide-right">
                <!-- sticky -->
                <h4 class="uk-modal-title" style="color:#fff; line-height:1; margin:3px 0 0 12px; padding:10px;">Redigera kampanj</h4>
                <button
                    class="uk-offcanvas-close uk-icon uk-close"
                    style="color:#fff;top:14px;right:12px;"
                    type="button"
                    uk-close
                    uk-toggle="target: #campaign-edit-modal"/>
            </div>
            <div class="uk-modal-dialog uk-modal-body uk-overflow-auto uk-animation-slide-right" uk-overflow-auto="" style="padding:20px;height:100vh;background:#ffffff;">

                <div class="uk-width-1-1 uk-flex uk-flex-middle">
                    <img class="uk-margin-small-right" :src="campaignBeingEdited.ImageName">
                    <h3 class="uk-margin-remove"><strong>{{ campaignBeingEdited.Name }}</strong></h3>
                </div>
                <div v-if="!campaignBeingEdited.IsActive" class="uk-label uk-label-danger uk-border-rounded uk-margin-medium-top uk-margin-large-bottom">
                    Denna kampanj är inaktiv
                </div>
                <div v-else class="uk-label uk-label-success uk-border-rounded uk-margin-medium-top uk-margin-large-bottom">
                    Denna kampanj är aktiv
                </div>

                <div class="uk-grid uk-child-width-1-1 uk-child-width-1-2@s" uk-grid>

                    <!-- FORM -->

                    <div>
                        <!-- KampanjId -->
                        <div class="uk-margin">
                            <ScInput v-model="campaignBeingEdited.CampaignId" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                                <label>KampanjId</label>
                            </ScInput>
                        </div>
                        <!-- Minsta ordersumma -->
                        <div class="uk-margin">
                            <ScInput v-model="campaignBeingEdited.MinOrderSum" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                                <label>Minsta ordersumma</label>
                            </ScInput>
                        </div>
                        <!-- Triggersumma -->
                        <div class="uk-margin">
                            <ScInput v-model="campaignBeingEdited.TriggerSum" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                                <label>Triggersumma</label>
                            </ScInput>
                        </div>
                        <!-- Kickback-summa -->
                        <div class="uk-margin">
                            <ScInput v-model="campaignBeingEdited.TriggerSum" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                                <label>Kickback-summa</label>
                            </ScInput>
                        </div>
                        <!-- Startdatum -->
                        <div class="uk-margin">
                            <ScInput v-model="campaignBeingEdited.FromDate" v-flatpickr="{ 'locale': Swedish, enableTime: true, enableSeconds: true }" placeholder="Välj startdatum..." state="fixed" mode="outline" extra-classes="uk-form-small">
                                <label>Startdatum</label>
                            </ScInput>
                        </div>
                        <!-- Slutdatum -->
                        <div class="uk-margin">
                            <ScInput v-model="campaignBeingEdited.ValidThru" v-flatpickr="{ 'locale': Swedish, enableTime: true, enableSeconds: true }" placeholder="Välj slutdatum..." state="fixed" mode="outline" extra-classes="uk-form-small">
                                <label>Slutdatum</label>
                            </ScInput>
                        </div>
                        <!-- Produkttyp -->
                        <div v-if="productTypeList.length != 0" class="uk-margin-medium-top">
                            <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                <label class="uk-text-small">Produkttyp</label>
                                <ul class="uk-list uk-textarea">
                                    <li v-for="product in productTypeList" :key="product.Id" class="uk-text-small" style="padding: 3px 3px 3px 2px">
                                        <PrettyCheck v-model="product.IsSelected" class="p-icon">
                                            <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">{{ product.Name }}</span>
                                        </PrettyCheck>
                                    </li>
                                </ul>
                            </div>
                        </div>


                    </div>


                    <!-- INFO-TEXT -->

                    <div v-if="campaignBeingEdited.CampaignTypeId === 1">
                        <div class="uk-text-small"><strong>Information</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Fri frakt</div>
                        <div class="uk-text-small"><strong>Minsta ordersumma</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Lägsta ordersumman (SEK) som ska aktivera kampanjen.</div>
                        <div class="uk-text-small"><strong>Triggersumma</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Den summa som börjar trigga information till kunden i stil med "Du har bara x kronor kvar till fri frakt"</div>
                        <div class="uk-text-small"><strong>Kickbacksumma</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Ej aktiv för denna kampanjtyp</div>
                        <div class="uk-text-small"><strong>Start- och slutdatum</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Format: 2017-04-17 23:59:00</div>
                        <div class="uk-text-small"><strong>Språk</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Välj språk där denna kampanj ska vara aktiv</div>
                    </div>
                    <div v-if="campaignBeingEdited.CampaignTypeId === 2">
                        <div class="uk-text-small"><strong>Information</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">En klassisk "ta 3 produkter, betala för 2". Den billigaste produkten blir gratis.</div>
                        <div class="uk-text-small"><strong>Minsta ordersumma</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Ej aktiv för denna kampanjtyp</div>
                        <div class="uk-text-small"><strong>Triggersumma</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Ej aktiv för denna kampanjtyp</div>
                        <div class="uk-text-small"><strong>Kickbacksumma</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Ej aktiv för denna kampanjtyp</div>
                        <div class="uk-text-small"><strong>Start- och slutdatum</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Format: 2017-04-17 23:59:00</div>
                        <div class="uk-text-small"><strong>Produkttyp</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Här klickar du i den/de produkttyper vars produkter ska triggas av 3 för 2-erbjudandet</div>
                        <div class="uk-text-small"><strong>Språk</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Välj språk där denna kampanj ska vara aktiv</div>
                    </div>
                    <div v-if="campaignBeingEdited.CampaignTypeId === 3">
                        <div class="uk-text-small"><strong>Information</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">När kunden passerat en triggersumma läggs en frivara i varukorgen.</div>
                        <div class="uk-text-small"><strong>Minsta ordersumma</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Minsta ordersumma för att trigga gratisprodukt</div>
                        <div class="uk-text-small"><strong>Start- och slutdatum</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Format: 2017-04-17 23:59:00</div>
                        <div class="uk-text-small"><strong>Koppla artikel</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Här väljer du den artikel som ska bli "frivara" när ordersumman uppnåtts.</div>
                        <div class="uk-text-small"><strong>Språk</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Välj språk där denna kampanj ska vara aktiv</div>
                    </div>
                    <div v-if="campaignBeingEdited.CampaignTypeId === 4">
                        <div class="uk-text-small"><strong>Information</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">En kraftigt nedsatt vara om kunden överstiger ett visst belopp. När kunden passerat en triggersumma ska man upplysas om detta erbjudande.</div>
                        <div class="uk-text-small"><strong>Minsta ordersumma</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Den summa som ska trigga kampanjen</div>
                        <div class="uk-text-small"><strong>Triggersumma</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Den summa som börjar trigga information till kunden i stil med "Du kan nu köpa produkten X för Y kr."</div>
                        <div class="uk-text-small"><strong>Start- och slutdatum</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Format: 2017-04-17 23:59:00</div>
                        <div class="uk-text-small"><strong>Koppla artikel</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Här väljer du den artikel som ska erbjudas när ordersumman uppnåtts.</div>
                        <div class="uk-text-small"><strong>Språk</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Välj språk där denna kampanj ska vara aktiv</div>
                    </div>
                    <div v-if="campaignBeingEdited.CampaignTypeId === 5">
                        <div class="uk-text-small"><strong>Information</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">En kraftigt nedsatt vara X om kunden köper produkt Y.</div>
                        <div class="uk-text-small"><strong>Triggerartikel</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Här väljer du den artikel som ska trigga ett specialpris på en annan produkt.</div>
                        <div class="uk-text-small"><strong>Koppla artikel</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Här väljer du den artikel som ska erbjudas.</div>
                        <div class="uk-text-small"><strong>Språk</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Välj språk där denna kampanj ska vara aktiv</div>
                    </div>
                    <div v-if="campaignBeingEdited.CampaignTypeId === 6">
                        <div class="uk-text-small"><strong>Information</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Handlar man en specifik produkt ska det ge kickback i form av coins på kontot.</div>
                        <div class="uk-text-small"><strong>Kickback-summa</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Det värde som ska sättas in på kundens konto vid köp av triggerprodukt.</div>
                        <div class="uk-text-small"><strong>Start- och slutdatum</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Format: 2017-04-17 23:59:00</div>
                        <div class="uk-text-small"><strong>Triggerartikel</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Här väljer du den artikel som ska trigga cashback. Fler artiklar kan väljas som trigger.</div>
                        <div class="uk-text-small"><strong>Språk</strong></div>
                        <div class="uk-text-small uk-margin-small-bottom">Välj språk där denna kampanj ska vara aktiv</div>
                    </div>

                </div>

                <Rawdisplayer :value="campaignBeingEdited" />
                <Rawdisplayer :value="productTypeList" />
            </div>
        </div>

    </div>
</template>

<script>
import Rawdisplayer from '~/components/rawdisplayer'
import ScInput from '~/components/Input'
import { Swedish } from "flatpickr/dist/l10n/sv.js"
import PrettyCheck from 'pretty-checkbox-vue/check'

if(process.client) {
	require('~/plugins/flatpickr');
}

export default {
	components: {
		Rawdisplayer,
		ScInput,
		PrettyCheck,
		Swedish,
	},
    data() {
        return {
            campaignList: null,
            campaignBeingEdited: null,
            productTypeList: null,
            Swedish,
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
        async getCampaignById(campaignid) {
            let _this = this
            _this.campaignBeingEdited = []
            _this.productTypeList = []
            try {
                const [ campaignbeingedited ] = await Promise.all([
                    this.$axios.$get('/webapi/Campaign/GetCampaignById?campaignId=' + campaignid ),
            ])
			    _this.campaignBeingEdited = campaignbeingedited
                campaignbeingedited.CampaignTypeId === 2 ? _this.getProductTypeList() : null
            } catch (err) {
                console.log(err);
            }
            setTimeout(() => {
                UIkit.modal('#campaign-edit-modal').show()
            }, 200)
		},
        async getProductTypeList() {
            let _this = this
            try {
                const [ producttypelist ] = await Promise.all([
                    this.$axios.$get('/webapi/Metadata/GetProductTypeList' ),
            ])
			    _this.productTypeList = producttypelist
            } catch (err) {
                console.log(err);
            }
		},
    },
    async fetch () {
        try {
            const [ campaignlist ] = await Promise.all([
                this.$axios.$get('/webapi/Campaign/GetCampaignList'),
            ])
            this.campaignList = campaignlist
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
        top: 0px; /* Don't forget this, required for the stickiness */
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