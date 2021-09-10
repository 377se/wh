<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
        </div>
    </div>
    <div v-else>
        <div id="sc-page-wrapper">
            <div id="sc-page-top-bar" class="sc-top-bar">
                <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
					<h1 class="sc-top-bar-title uk-display-inline">Administratörer</h1>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody class="uk-padding-remove uk-text-small" separator>
                        <div class="uk-overflow-auto" style="max-height:900px;">
                            <table class="uk-card uk-table uk-table-small uk-table-middle uk-text-small uk-margin-remove-bottom" style="border-collapse: separate;">
                                <thead>
                                    <th style="width: 55px;" class="sticky-headers border-bottom"></th>
                                    <th style="width: 200px;" class="sticky-headers border-bottom border-left">Namn</th>
                                    <th style="width: 200px;" class="sticky-headers border-bottom border-left">Användarnamn</th>
                                    <th style="width: 200px;" class="sticky-headers border-bottom border-left">Email</th>
                                    <th style="width: 200px;" class="sticky-headers border-bottom border-left">Senast inloggad</th>
                                    <th style="width: 55px;" class="sticky-headers border-bottom border-left uk-text-center">Aktiv</th>
                                </thead>
                                <tbody>
                                    <tr v-for="admin in adminList" :key="admin.AdminId">
                                        <td style="width: 55px;" class="border-bottom">
                                            <img class="uk-preserve-width" :src="admin.ImageName">
                                        </td>
                                        <td style="width: 200px;" class="border-bottom border-left">
                                            <nuxt-link :to="admin.Url">{{ admin.Firstname }} {{ admin.Lastname}}</nuxt-link>
                                        </td>
                                        <td style="width: 200px;" class="border-bottom border-left">
                                            {{ admin.Username }}
                                        </td>
                                        <td style="width: 200px;" class="border-bottom border-left">
                                            {{ admin.Email }}
                                        </td>
                                        <td style="width: 200px;" class="border-bottom border-left">
                                            {{ admin.LoginDate }}
                                        </td>
                                        <td style="width: 55px;" class="border-bottom border-left uk-text-center">
                                            <div :class="{'uk-badge md-bg-green-600': admin.Active === 1, 'uk-badge md-bg-red-600': admin.Active === 0 }"><i v-if="admin.Active" class="mdi mdi-checkbox-marked-circle md-color-green-600"></i><i v-else class="mdi mdi-close-circle-outline md-color-red-600"></i></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </ScCardBody>
                </ScCard>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	components: {
    },
    data () {
		return {
            adminList: [],
        }
    },
    methods: {
    },
    async fetch () {
        this.$store.dispatch('setBusyOn')
        try {
            const [ adminlist ] = await Promise.all([
                this.$axios.$get('/webapi/Admin/GetAdminList'),
            ])
            this.adminList = adminlist
            this.$store.dispatch('setBusyOff')
        } catch (err) {
            console.log(err);
            this.$store.dispatch('setBusyOff')
        }
    },
}
</script>

<style lang="scss" scoped>
    .sticky-headers {
        background: white;
        position: sticky;
        top: 0px; /* Don't forget this, required for the stickiness */
    }
    .row {
        height: 50px;
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
</style>