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
                        <div class="uk-overflow-auto">
                            <table class="uk-table uk-table-small uk-text-small uk-margin-remove">
                                <thead>
                                    <tr class="uk-padding-remove-bottom">
                                        <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 20%;">Shop</th>
                                        <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 30%;">Kampanjtyp</th>
                                        <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 15%;">Start</th>
                                        <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 15%;">Slut</th>
                                        <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 20%;">Dagar kvar</th>
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
                        <div class="uk-overflow-auto">
                            <table class="uk-table uk-table-small uk-text-small uk-margin-remove">
                                <thead>
                                    <tr class="uk-padding-remove-bottom">
                                        <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 20%;">Shop</th>
                                        <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 30%;">Kampanjtyp</th>
                                        <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 15%;">Start</th>
                                        <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 15%;">Slut</th>
                                        <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 20%;">Dagar kvar</th>
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
            <div class="uk-modal-dialog uk-modal-body uk-overflow-auto uk-animation-slide-right" uk-overflow-auto="" style="padding:0px;height:100vh;background:#ffffff;">
                <Rawdisplayer :value="campaignBeingEdited" />
                <Rawdisplayer :value="productTypeList" />
            </div>
        </div>

    </div>
</template>

<script>
import Rawdisplayer from '~/components/rawdisplayer'

export default {
	components: {
		Rawdisplayer,
	},
    data() {
        return {
            campaignList: null,
            campaignBeingEdited: null,
            productTypeList: [],
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
            // _this.showPageOverlaySpinner()
            try {
                const [ campaignbeingedited ] = await Promise.all([
                    this.$axios.$get('/webapi/Campaign/GetCampaignById?campaignId=' + campaignid ),
            ])
			    _this.campaignBeingEdited = campaignbeingedited
                campaignbeingedited.CampaignTypeId === 2 ? _this.getProductTypeList() : null
                // _this.hidePageOverlaySpinner()
            } catch (err) {
                console.log(err);
            }
            setTimeout(() => {
                UIkit.modal('#campaign-edit-modal').show()
            }, 200)
		},
        async getProductTypeList() {
            let _this = this
            // _this.showPageOverlaySpinner()
            try {
                const [ producttypelist ] = await Promise.all([
                    this.$axios.$get('/webapi/Metadata/GetProductTypeList' ),
            ])
            // this.yearList = yearlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
			    _this.productTypeList = producttypelist
                // _this.hidePageOverlaySpinner()
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