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
					    <h1 class="sc-top-bar-title uk-display-inline">Banner</h1>
				    </div>
                </div>
            </div>
	        <div id="sc-page-content">
				<ScCard>
					<ScCardBody>
						<div class="uk-flex uk-margin-medium-bottom">
							<div class="uk-margin-medium-bottom uk-width-1-1">
								<div class="uk-flex uk-flex-middle">
                                    <div class="uk-width-5-6 uk-margin-medium-right sc-input-wrapper sc-input-wrapper-outline sc-input-filled uk-position-z-index">
                                        <client-only>
                                            <Select2
                                                id="select-domainlist"
                                                v-model="domainId"
                                                :options="domainOptionsList"
                                                :settings="{ 'width': '100%', 'placeholder': 'Välj domän', 'closeOnSelect': true }"
                                            >
                                            </Select2>
                                        </client-only>
                                    </div>
                                    <div class="uk-width-1-6 uk-flex uk-flex-middle" @click="startCreateBanner()">
                                        <i class="addicon mdi mdi-plus-circle-outline md-color-green-600 uk-margin-small-right"></i>
                                        <span class="addicon uk-text-middle" @click="startCreateBanner()">Skapa ny banner</span> <!-- SKAPA NY BANNER -->
                                    </div>
                                </div>
							</div>
						</div>
                        <div class="uk-flex">
                            <!-- BANNERS -->
                            <div class="uk-width-1-1" :class="{'uk-width-2-3': updateEditorVisible || addEditorVisible }">
                                <table class="bannerlist uk-card uk-box-shadow-small uk-margin-remove-bottom uk-table uk-table-small uk-text-small">
                                    <thead>
                                        <tr>
                                            <td class="border-bottom border-right" style="width:54%;"><strong>Namn</strong></td>
                                            <td class="border-bottom border-right uk-text-center" style="width:13%;"><strong>Start</strong></td>
                                            <td class="border-bottom border-right uk-text-center" style="width:13%;"><strong>Slut</strong></td>
                                            <td class="border-bottom border-right uk-text-center" style="width:10%;"><strong>Dagar kvar</strong></td>
                                            <td class="border-bottom uk-text-center uk-text-middle" style="width:10%;" colspan="2">
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="banner in bannerList" :key="banner.BannerId" class="uk-table-middle">
                                            <td class="border-bottom border-right uk-width-auto">{{ banner.Description }}</td>
                                            <td class="border-bottom border-right uk-width-auto uk-text-center">{{ banner.StartDate }}
                                            </td>
                                            <td class="border-bottom border-right uk-width-auto uk-text-center">{{ banner.ValidThru }}
                                            </td>
                                            <td class="border-bottom border-right uk-width-auto uk-text-center">{{ banner.DaysLeft }}
                                            </td>
                                            <td class="border-bottom border-right uk-text-center">
                                                <div class="editicon" @click="getBannerToEdit(banner.BannerId)"> <!-- EDITERA BANNER -->
                                                <i class="mdi mdi-file-edit md-color-green-600"></i>
                                                </div>
                                            </td>
                                            <td class="border-bottom border-right uk-text-center">
                                                <div class="wastebasket" @click="deleteBanner(banner.BannerId)"> <!-- TA BORT BANNER -->
                                                <i class="mdi mdi-delete-forever md-color-red-600 sc-icon-28"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- EDIT BANNER -->
                            <div v-if="updateEditorVisible" :class="{'uk-width-1-3': updateEditorVisible }" class="uk-card uk-padding-small uk-margin-medium-left">
                                <div class="uk-flex uk-flex-between">
                                    <h3 class="uk-card-title uk-padding-remove-vertical uk-padding-remove-horizontal">Editera banner</h3>
                                    <span class="closeicon" @click="updateEditorVisible = false"><i class="mdi mdi-close-circle md-color-grey-600"></i></span>
                                </div>
                                <div>
                                    <img :src="bannerItem.ImageName">
                                </div>
                                <!-- Description -->
                                <div class="uk-margin">
                                    <ScInput v-model="bannerItem.Description" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Description</label>
                                    </ScInput>
                                </div>
                                <!-- URL -->
                                <div class="uk-margin">
                                    <ScInput v-model="bannerItem.Url" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Url</label>
                                    </ScInput>
                                </div>
                                <!-- Startdatum -->
                                <div class="uk-margin">
                                    <ScInput v-model="bannerItem.StartDate" v-flatpickr="{ 'locale': Swedish }" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Startdatum</label>
                                    </ScInput>
                                </div>
                                <!-- Slutdatum -->
                                <div class="uk-margin">
                                    <ScInput v-model="bannerItem.ValidThru" v-flatpickr="{ 'locale': Swedish }" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Slutdatum</label>
                                    </ScInput>
                                </div>
                                <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateBanner()">
                                    UPPDATERA
                                </button>
                            </div>
                            <!-- ADD ORDERITEM -->
                            <div v-if="addEditorVisible" :class="{'uk-width-1-3': addEditorVisible }" class="uk-card uk-padding-small uk-margin-medium-left">
                                <div class="uk-flex uk-flex-between">
                                    <h3 class="uk-card-title uk-padding-remove-vertical uk-padding-remove-horizontal">Skapa ny banner</h3>
                                    <span class="closeicon" @click="addEditorVisible = false"><i class="mdi mdi-close-circle md-color-grey-600"></i></span>
                                </div>
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
import { Swedish } from "flatpickr/dist/l10n/sv.js"
if(process.client) {
	require('~/plugins/flatpickr');
}

export default {
    components: {
		ScInput,
		Alert,
        Swedish,
		Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            emptyBannerObject: null,
            domainId: null,
            domainList: null,
            domainOptionsList: null,
            bannerList: null,
            bannerItem: null,
            updateEditorVisible: false,
            addEditorVisible: false,
    		Swedish,
        }
    },
	watch: {
		domainId: function () {
			this.bannerList = []
			this.getBannerListByDomainId(this.domainId)
		}
	},
    methods: {
		async getBannerListByDomainId() {
			{{ this.showPageOverlaySpinner() }}
			await this.$axios.$get('/webapi/Banner/GetBannerListByDomainId?domainId=' + this.domainId )
			.then( bannerlist => {
				this.bannerList = bannerlist
				{{ this.hidePageOverlaySpinner() }}
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
		async getDomainList() {
			{{ this.showPageOverlaySpinner() }}
			await this.$axios.$get('/webapi/Metadata/GetDomainList')
			.then( domainlist => {
				this.domainList = domainlist
				this.domainOptionsList = domainlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
				{{ this.hidePageOverlaySpinner() }}
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
        async getBannerToEdit(bannerId) {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/Banner/GetBanner?bannerId=' + bannerId)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                    } else {
                        _this.bannerItem = response
                        _this.updateEditorVisible = true
                        _this.addEditorVisible = false
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
        async deleteBanner(bannerId) {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Banner/PostDelete?bannerId=' + bannerId)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                    } else {
                        _this.bannerList = response
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
        async updateBanner() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Banner/PostUpdate', _this.bannerItem )
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                    } else {
                        _this.getBannerListByDomainId(_this.domainId)
                        _this.updateEditorVisible = false
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
        hidePageOverlaySpinner () {
            this.$store.commit('toggleProgressOverlay', false);
            this.$store.commit('togglePageOverlay', false)
        },
        showPageOverlaySpinner () {
            this.$store.commit('toggleProgressOverlay', true);
            this.$store.commit('togglePageOverlay', true)
        },
    },
    async fetch () {
        try {
            const [ emptybannerobject ] = await Promise.all([
                this.$axios.$get('/webapi/Banner/GetEmptyObject'),
                this.getDomainList(),
            ])
            this.emptyBannerObject = emptybannerobject
        } catch (err) {
            console.log(err);
        }
    },
}
</script>

<style lang="scss" scoped>
    .bannerlist {
        line-height: 1;
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
    .wastebasket, .editicon, .addicon, .closeicon {
		cursor: pointer;
	}
</style>
