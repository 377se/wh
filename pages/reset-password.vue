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
					    <h1 class="sc-top-bar-title uk-display-inline">Återställ lösenord</h1>
				    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody>
                        <Alert
                            :errorlist="errors"
                            message=""
                            :alertClass="'uk-alert-danger'"
                            id=1
                        />
                        <div v-if="emptyResetObject">
                            <!-- Nytt lösenord -->
                            <div class="uk-margin">
                                <ScInput v-model="emptyResetObject.Password" type="password" state="fixed" mode="outline" extra-classes="uk-form-small">
                                    <label>Nytt lösenord</label>
                                </ScInput>
                            </div>
                            <!-- Repetera lösenord -->
                            <div class="uk-margin">
                                <ScInput v-model="emptyResetObject.RepeatPassword" type="password" state="fixed" mode="outline" extra-classes="uk-form-small">
                                    <label>Repetera lösenord</label>
                                </ScInput>
                            </div>
                            <button v-waves.button.light class="sc-button sc-button-primary uk-margin-small-top" @click="updatePassword">
                                UPPDATERA
                            </button>
                        </div>
                    </ScCardBody>
                </ScCard>
            </div>
        </div>
    </div>
</template>

<script>
    import ScInput from '~/components/Input'
    import Alert from '~/components/Alert'

    export default {
        components: {
            Alert,
		    ScInput,
        },
        data() {
            return {
                errors: null,
                emptyResetObject: null,
            }
        },
        methods: {
            async updatePassword() {
                let _this = this
                _this.$store.commit('setAlertHidden', 1)
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$post('/webapi/Account/ResetPassword', _this.emptyResetObject)
                .then(function (updatedpassword) {
                    if (updatedpassword.ErrorList != null) {
                        _this.errors = updatedpassword.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.$store.dispatch('setBusyOff')
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
            this.$store.commit('setAlertHidden', 1)
            try {
                const [ emptyresetobject ] = await Promise.all([
                    this.$axios.$get('/webapi/Account/GetEmptyResetObject?guid=' + this.$route.params.guid),
                ])
                    if (emptyresetobject.ErrorList != null) {
                        this.errors = emptyresetobject.ErrorList
                        this.$store.commit('setAlertVisible', 1)
                        this.$store.dispatch('setBusyOff')
                    } else {
                        this.emptyResetObject = emptyresetobject
                        this.$store.dispatch('setBusyOff')
                    }
            } catch (err) {
                console.log(err);
                this.$store.dispatch('setBusyOff')
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>