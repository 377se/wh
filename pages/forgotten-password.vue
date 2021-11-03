<template>
    <div id="sc-page-content">
        <ScCard>
            <ScCardBody>
                <h2 class="uk-margin-medium-botten">Glömt lösenordet?</h2>
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
                    </ScInput>
                </div>
                <button v-waves.button.light class="sc-button sc-button-primary uk-margin-small-top" @click="getResetLink">
                    SKICKA ÅTERSTÄLLNINGSINFORMATION
                </button>
            </ScCardBody>
        </ScCard>
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