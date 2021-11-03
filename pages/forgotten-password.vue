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
					    <h1 class="sc-top-bar-title uk-display-inline">Glömt lösenordet?</h1>
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
                        <Alert
                            :errorlist="errors"
                            message="Återställningslänk har mailats till dig!"
                            :alertClass="'uk-alert-success'"
                            id=2
                        />
                        <!-- Email -->
                        <div class="uk-margin-medium-top uk-margin-medium-bottom">
                            <ScInput v-model="email" state="fixed" mode="outline" extra-classes="uk-form-small" placeholder="Skriv in din email">
                                <label>Email</label>
                            </ScInput>
                        </div>
                        <button v-waves.button.light class="sc-button sc-button-primary uk-margin-small-top" @click="getResetLink">
                            SKICKA ÅTERSTÄLLNINGSINFORMATION
                        </button>
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
                email: null,
            }
        },
        methods: {
            async getResetLink() {
                let _this = this
                _this.$store.commit('setAlertHidden', 1)
                _this.$store.commit('setAlertHidden', 2)
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$get('/webapi/Account/GetResetLink?email=' + _this.email)
                .then(function (resetinfo) {
                    if (resetinfo.ErrorList != null) {
                        _this.errors = resetinfo.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.$store.dispatch('setBusyOff')
                        _this.$store.commit('setAlertVisible', 2)
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    _this.$store.dispatch('setBusyOff')
                })
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>