<template>
    <div>

            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody>
                        <h2 class="uk-margin-medium-botten">Återställ lösenord</h2>
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
</template>

<script>
    import ScInput from '~/components/Input'
    import Alert from '~/components/Alert'

    export default {
        layout: 'auth-admin',
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
                    this.$axios.$get('/webapi/Account/GetEmptyResetObject?guid=' + this.$route.query.guid),
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