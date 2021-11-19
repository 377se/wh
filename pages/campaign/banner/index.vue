<template>
    <div>
        <div id="sc-page-wrapper">
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
                                </div>
							</div>
						</div>
                        <div v-if="domainId" class="uk-flex">
                            <!-- BANNERS -->
                            <div class="uk-width-2-3 uk-overflow-auto" style="max-height:800px;">
                                <table class="uk-margin-remove-bottom uk-table uk-table-small uk-table-middle uk-text-small border-top" style="border-collapse: separate;">
                                    <thead>
                                        <tr>
                                            <th class="sticky-headers border-bottom border-left uk-text-small" style="width:46%;"><strong>Namn</strong></th>
                                            <th class="sticky-headers border-bottom border-left uk-text-center uk-text-small" style="width:13%;"><strong>Start</strong></th>
                                            <th class="sticky-headers border-bottom border-left uk-text-center uk-text-small" style="width:13%;"><strong>Slut</strong></th>
                                            <th class="sticky-headers border-bottom border-left uk-text-center uk-text-small" style="width:10%;"><strong>Dagar kvar</strong></th>
                                            <th class="sticky-headers border-bottom border-left uk-text-center uk-text-middle" style="width:10%;" colspan="2">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="banner in bannerList" :key="banner.BannerId" class="uk-table-middle">
                                            <td @click="getBannerToEdit(banner.BannerId)" class="border-bottom border-left uk-width-auto cursor-pointer link-color">{{ banner.Description }}</td>
                                            <td class="border-bottom border-left uk-width-auto uk-text-center">{{ banner.StartDate }}
                                            </td>
                                            <td class="border-bottom border-left uk-width-auto uk-text-center">{{ banner.ValidThru }}
                                            </td>
                                            <td class="border-bottom border-left uk-width-auto uk-text-center">{{ banner.DaysLeft }}
                                            </td>
                                            <td class="border-bottom border-left uk-text-center">
                                                <div class="wastebasket" @click="deleteBanner(banner.BannerId)"> <!-- TA BORT BANNER -->
                                                <i class="mdi mdi-delete-forever md-color-red-600 sc-icon-28"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- EDIT BANNER -->
                            <div class="uk-width-1-3 uk-card uk-padding-small uk-margin-medium-left md-bg-grey-200">
                                <div class="uk-flex uk-flex-between">
                                    <h3 v-if="currentBannerObject.BannerId == 0" class="uk-card-title uk-padding-remove-vertical uk-padding-remove-horizontal">Skapa banner</h3>
                                    <h3 v-else class="uk-card-title uk-padding-remove-vertical uk-padding-remove-horizontal">Redigera banner</h3>
                                </div>
                                <div v-if="currentBannerObject.BannerId != 0" class="uk-margin">
                                <!-- BILD -->
                                    <img :src="currentBannerObject.ImageName">
                                    <div class="uk-padding-small uk-padding-remove-horizontal">
                                        <FileUpload 
                                        :bannerId="currentBannerObject.BannerId"
                                        :bannerImage="this.bannerImage"
                                        @updateBannerImage="getBannerToEdit(currentBannerObject.BannerId)"
                                        />
                                    </div>
                                </div>
                                <Alert
                                    :errorlist="errors"
                                    message=""
                                    :alertClass="'uk-alert-danger'"
                                    id=1
                                />
                                <!-- Description -->
                                <div class="uk-margin">
                                    <ScInput v-model="currentBannerObject.Description" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Namn</label>
                                    </ScInput>
                                </div>
                                <!-- URL -->
                                <div v-if="currentBannerObject.BannerId != 0" class="uk-margin">
                                    <ScInput v-model="currentBannerObject.Url" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Url</label>
                                    </ScInput>
                                </div>
                                <!-- Startdatum -->
                                <div v-if="currentBannerObject.BannerId != 0" class="uk-margin">
                                    <ScInput v-model="currentBannerObject.StartDate" v-flatpickr="{ 'locale': Swedish }" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Startdatum</label>
                                    </ScInput>
                                </div>
                                <!-- Slutdatum -->
                                <div v-if="currentBannerObject.BannerId != 0" class="uk-margin">
                                    <ScInput v-model="currentBannerObject.ValidThru" v-flatpickr="{ 'locale': Swedish }" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Slutdatum</label>
                                    </ScInput>
                                </div>
                                <!-- Aktiv -->
                                <div v-if="currentBannerObject.BannerId != 0" class="uk-margin uk-width-1-1">
                                    <div>
                                        <ul class="uk-list uk-margin-remove-top">
                                            <li class="uk-text-small">
                                                <PrettyCheck v-model="currentBannerObject.IsActive" class="p-icon">
                                                    <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Aktiv?</span>
                                                </PrettyCheck>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                    <div class="uk-flex uk-flex-around uk-margin-medium-bottom">
                                        <div v-if="currentBannerObject.BannerId == 0">
                                            <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="createBanner()">SKAPA&nbsp;BANNER
                                            </button>
                                        </div>
                                        <div v-else>
                                            <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateBanner()">
                                                UPPDATERA
                                            </button>
                                        </div>
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
import PrettyCheck from 'pretty-checkbox-vue/check'
import FileUpload from '~/components/FileUploadBanner'
import { Swedish } from "flatpickr/dist/l10n/sv.js"
if(process.client) {
	require('~/plugins/flatpickr');
}

export default {
    components: {
		ScInput,
		PrettyCheck,
		Alert,
		FileUpload,
        Swedish,
		Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            domainId: null,
            domainList: null,
            domainOptionsList: null,
            bannerList: null,
            currentBannerObject: null,
            bannerImage: null,
            isNewBanner: false,
    		errors: null,
    		Swedish,
        }
    },
	watch: {
		domainId: function () {
			this.bannerList = []
			this.getBannerListByDomainId(this.domainId)
		}
	},
	mounted () {
        this.getDomainList()
    },
    methods: {
		async getBannerListByDomainId() {
			this.$store.dispatch('setBusyOn')
			await this.$axios.$get('/webapi/Banner/GetBannerListByDomainId?domainId=' + this.domainId )
			.then( bannerlist => {
				this.bannerList = bannerlist
                this.currentBannerObject.DomainId = this.domainId
				this.$store.dispatch('setBusyOff')
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
		async getDomainList() {
			this.$store.dispatch('setBusyOn')
			await this.$axios.$get('/webapi/Metadata/GetDomainList')
			.then( domainlist => {
				this.domainList = domainlist
				this.domainOptionsList = domainlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
				this.$store.dispatch('setBusyOff')
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
        async getBannerToEdit(bannerId) {
			let _this = this
            _this.isNewBanner = false
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$get('/webapi/Banner/GetBannerById?bannerId=' + bannerId)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.currentBannerObject = response
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
        async deleteBanner(bannerId) {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/Banner/PostDelete?bannerId=' + bannerId)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.bannerList = response
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
        async updateBanner() {
			let _this = this
            _this.isNewBanner = true
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/Banner/PostUpdate', _this.currentBannerObject )
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.errors = response.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.$store.commit('setAlertHidden', 1)
                        _this.getBannerListByDomainId(_this.domainId)
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
        async getEmptyBanner() {
			let _this = this
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$get('/webapi/Banner/GetEmptyObject')
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.currentBannerObject = response
                        _this.currentBannerObject.DomainId = _this.domainId
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
        async createBanner() {
			let _this = this
            _this.isNewBanner = true
            _this.$store.commit('setAlertHidden', 1)
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/Banner/PostCreate', _this.currentBannerObject)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.errors = response.ErrorList
                        _this.$store.dispatch('setBusyOff')
                        _this.$store.commit('setAlertVisible', 1)
                    } else {
                        _this.currentBannerObject = response
                        _this.$store.dispatch('setBusyOff')
                        _this.getBannerListByDomainId()
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
            const [ emptybannerobject ] = await Promise.all([
                this.$axios.$get('/webapi/Banner/GetEmptyObject'),
            ])
            this.emptyBannerObject = emptybannerobject
            this.currentBannerObject = emptybannerobject
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
    .wastebasket, .editicon, .addicon, .closeicon {
		cursor: pointer;
	}
    .cursor-pointer {
        cursor: pointer;
    }
    .link-color {
        color: #0088CC;
    }
</style>
