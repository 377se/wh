<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
        </div>
    </div>
    <div v-else id="sc-page-wrapper">
        <div id="sc-page-top-bar" class="sc-top-bar">
            <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                <div class="uk-flex-1">
                    <h1 class="sc-top-bar-title">
                        Metadata - Ursprungsland
                    </h1>
                </div>
            </div>
        </div>
        <div id="sc-page-content">

                <div class="uk-width-1-1">
                    <ScCard class="uk-card-small">
                        <ScCardHeader separator>
                            <ScCardTitle>
                                Lista med ursprungsländer
                            </ScCardTitle>
                        </ScCardHeader>
                        <ScCardBody>
                            <div class="uk-overflow-auto">
                                <table :ref="render" class="uk-table uk-table-small uk-text-small uk-margin-remove paymentproviderlist" style="border-collapse: separate;">
                                    <thead>
                                        <tr class="uk-padding-remove-bottom">
                                            <th class="border-top border-bottom border-left uk-text-small" style="text-align: center; width: 20px;"></th>
                                            <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 95%px;">Land</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(landoforigin, index) in landOfOriginList" :key="index" class="uk-table-middle">
                                            <td class="border-bottom border-left">
                                                <PrettyCheck v-model="landoforigin.IsSelected" class="p-icon" @change="updateLandOfOrigin(landoforigin)">
                                                    <i slot="extra" class="icon mdi mdi-check"></i>
                                                </PrettyCheck>
                                            </td>
                                            <td class="border-bottom border-left border-right" style="text-align: left;">{{ landoforigin.Name }}</td>
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
    import Alert from '~/components/Alert'
    import PrettyCheck from 'pretty-checkbox-vue/check'

    export default {
        components: {
    		Alert,
    		PrettyCheck,
        },
        data () {
            return {
                errors: null,
                message: null,
                render: false,
                landOfOriginList: null,
                countryList: [],
            }
        },
        methods: {
            async updateLandOfOrigin(landoforigin) {
                let _this = this
                _this.$store.dispatch('setBusyOn')
                await this.$axios.$post('/webapi/Metadata/UpdateLandOfOrigin', landoforigin)
                .then(function (landoforigin) {
                    _this.landOfOriginList = landoforigin
                    _this.$store.dispatch('setBusyOff')
                })
                .catch(function (error) {
                    console.log(error)
                    _this.$store.dispatch('setBusyOff')
                })
            },
        },
        async fetch () {
            this.$store.dispatch('setBusyOn')
            try {
                const [ landoforiginlist, countrylist ] = await Promise.all([
                    this.$axios.$get('/webapi/Metadata/GetLandOfOriginList'),
				    this.$axios.$get('/webapi/Metadata/GetCountryList'),
                ])
                this.landOfOriginList = landoforiginlist
    			this.countryList = countrylist.map(({ Id, Name }) => ({ id: Id, text: Name }))
            } catch (err) {
                console.log(err);
            }
            this.$store.dispatch('setBusyOff')
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
    .cursor-pointer {
        cursor: pointer;
    }
</style>