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
					    <h1 class="sc-top-bar-title uk-display-inline">Administratörer</h1>
				    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <div class="uk-grid-column-medium" uk-grid>
                    <div class="uk-width-1-2">
                        <ScCard>
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    {{ adminDetails.Firstname }} {{ adminDetails.Lastname }}
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <!-- Image -->
                                <div class="uk-margin">
                                    <img :src="adminDetails.ImageName"/>
                                    <div class="uk-padding-small uk-padding-remove-horizontal">
                                        <FileUpload 
                                        :adminId="adminDetails.AdminId"
                                        @updateAvatar="$fetch()"
                                        />
                                    </div>
                                </div>
                                <!-- AdminId -->
                                <div class="uk-margin">
                                    <ScInput v-model="adminDetails.AdminId" state="fixed" mode="outline" v-on:blur="updateAdminDetails()" extra-classes="uk-form-small" disabled>
                                        <label>AdminId</label>
                                    </ScInput>
                                </div>
                                <!-- Senast inloggad -->
                                <div class="uk-margin">
                                    <ScInput v-model="adminDetails.LoginDate" state="fixed" mode="outline" v-on:blur="updateAdminDetails()" extra-classes="uk-form-small" disabled>
                                        <label>Senast inloggad</label>
                                    </ScInput>
                                </div>
                                <!-- Förnamn -->
                                <div class="uk-margin">
                                    <ScInput v-model="adminDetails.Firstname" state="fixed" mode="outline" v-on:blur="updateAdminDetails()" extra-classes="uk-form-small">
                                        <label>Förnamn</label>
                                    </ScInput>
                                </div>
                                <!-- Efternamn -->
                                <div class="uk-margin">
                                    <ScInput v-model="adminDetails.Lastname" state="fixed" mode="outline" v-on:blur="updateAdminDetails()" extra-classes="uk-form-small">
                                        <label>Efternamn</label>
                                    </ScInput>
                                </div>
                                <!-- Användarnamn -->
                                <div class="uk-margin">
                                    <ScInput v-model="adminDetails.Username" state="fixed" mode="outline" v-on:blur="updateAdminDetails()" extra-classes="uk-form-small">
                                        <label>Användarnamn</label>
                                    </ScInput>
                                </div>
                                <!-- Email -->
                                <div class="uk-margin">
                                    <ScInput v-model="adminDetails.Email" state="fixed" mode="outline" v-on:blur="updateAdminDetails()" extra-classes="uk-form-small">
                                        <label>Email</label>
                                    </ScInput>
                                </div>
                                <!-- Aktiv -->
                                <div class="uk-margin uk-width-1-1">
                                    <div class="">
                                        <ul class="uk-list uk-margin-remove-top">
                                            <li class="uk-text-small" style="padding: 3px 3px 3px 2px">
                                                <PrettyCheck v-model="adminDetails.Active" class="p-icon" @change="updateAdminDetails()">
                                                    <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Aktiv</span>
                                                </PrettyCheck>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <div class="uk-width-1-2">
                        <ScCard>
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Menyrättigheter
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                
                            </ScCardBody>
                        </ScCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ScInput from '~/components/Input'
import PrettyCheck from 'pretty-checkbox-vue/check'
import FileUpload from '~/components/FileUploadUserAvatar'

export default {
    components: {
		ScInput,
		PrettyCheck,
		FileUpload,
    },
    data () {
		return {
            adminDetails: null,
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
		async updateAdminDetails() {
			let _this = this
			_this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Admin/PostUpdateAdminDetails', _this.adminDetails)
			.then(function (admindetails) {
                _this.adminDetails = admindetails
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
            const [ admindetails ] = await Promise.all([
                this.$axios.$get('/webapi/Admin/GetAdminDetails?adminId=' + this.$route.params.id),
            ])
            this.adminDetails = admindetails
        } catch (err) {
            console.log(err);
        }
    },
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

</style>