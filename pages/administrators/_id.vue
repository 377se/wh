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
                                    <div class="uk-flex uk-flex-between">
                                        {{ adminDetails.Firstname }} {{ adminDetails.Lastname }}
                                        <button @click="$router.go(-1)" class="sc-button sc-button-mini">
                                            TILLBAKA TILL ADMINLISTA
                                        </button>
                                    </div>
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
                    <div v-if="adminDetails.HasAdminPermission" class="uk-width-1-2">
                        <ScCard>
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Menyrättigheter
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody>
                                <div class="menu-container">
                                    <ul class="menu">
                                        <li v-for="level_0 in menuPermissions" :key="level_0.MenuId">
                                            <PrettyCheck v-model="level_0.HasPermission" class="p-icon" @change="updateMenuPermissions(level_0)">
                                                <i slot="extra" class="icon mdi mdi-check"></i>
                                                <label>{{ level_0.Name }}</label>
                                            </PrettyCheck>
                                            <ul class="menu" v-if="level_0.SubItemList">
                                                <li v-for="level_1 in level_0.SubItemList" :key="level_1.MenuId">
                                                <PrettyCheck v-model="level_1.HasPermission" class="p-icon" @change="updateMenuPermissions(level_1)">
                                                <i slot="extra" class="icon mdi mdi-check"></i>
                                                <label>{{ level_1.Name }}</label>
                                                </PrettyCheck>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
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
            menuPermissions: null,
        }
    },
    computed: {
    },
    watch: {
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
		async updateMenuPermissions(item) {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Menu/PostUpdateMenuPermission?adminId='  + this.$route.params.id, item)
			.then(function (menupermissions) {
                _this.menuPermissions = menupermissions
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
            const [ admindetails, menupermissions ] = await Promise.all([
                this.$axios.$get('/webapi/Admin/GetAdminDetails?adminId=' + this.$route.params.id),
                this.$axios.$get('/webapi/Menu/GetMenuPermission?adminId=' + this.$route.params.id),
            ])
            this.adminDetails = admindetails
            this.menuPermissions = menupermissions
        } catch (err) {
            console.log(err);
        }
    },
}
</script>

<style lang="scss" scoped>
    .menu-container {
        margin-left: -30px;
    }
    .menu {
        list-style: none;
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
    .pretty .state label {
        text-indent: 0.5em;
    }

</style>