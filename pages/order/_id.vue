<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
            {{ showPageOverlaySpinner() }}
        </div>
    </div>
    <div v-else>
        <div id="sc-page-wrapper">
            <div id="sc-page-top-bar" class="sc-top-bar">
                <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                    <div class="uk-flex-1">
                        <h1 class="sc-top-bar-title uk-display-inline">Order # {{ this.order.OrderId }}</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody>
                        {{ order }}
                    </ScCardBody>
                </ScCard>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
		return {
            errors: null,
            order: {},
        }
    },
    watch: {

    },
	mounted: function () {

    },
    computed: {

    },
    methods: {
        async getMethod() {
			let _this = this
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/Address/GetCountries')
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.hidePageOverlaySpinner()
                        _this.$store.commit('setAlertVisible', 4)
                    } else {
                        _this.hidePageOverlaySpinner()
                        _this.$store.commit('setAlertHidden', 4)
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
            const [ order ] = await Promise.all([
                this.$axios.$get('/webapi/Order/GetOrder?orderId=' + this.$route.params.id),
            ])
            this.order = order
        } catch (err) {
            console.log(err);
        }
    },
}
</script>

<style lang="scss" scoped>

</style>