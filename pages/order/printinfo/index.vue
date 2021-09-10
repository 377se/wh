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
					    <h1 class="sc-top-bar-title uk-display-inline">Tryckinformation</h1>
				    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <div class="uk-grid-column-medium" uk-grid>
                    <div class="uk-width-1-2">
                        <ScCard>
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Lista med tryckinformation
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody class="uk-padding-remove uk-text-small" separator>
                                <div class="uk-flex">
                                    <div class="uk-width-1-6 border-bottom">
                                        <div class="uk-margin-small-left">Antal</div>
                                    </div>
                                    <div class="uk-width-5-6 border-left border-bottom">
                                        <div class="uk-margin-small-left">Värde</div>
                                    </div>
                                </div>
                                <div v-for="item in printInfo.PrintList" :key="item.Value" >
                                    <div class="uk-flex">
                                        <div class="uk-width-1-6 border-bottom">
                                            <div class="uk-margin-small-left">{{ item.NumberOfItems }}</div>
                                        </div>
                                        <div class="uk-width-5-6 border-left border-bottom">
                                            <div class="uk-margin-small-left">{{ item.Value }}</div>
                                        </div>
                                    </div>
                                </div>
                            </ScCardBody>
                        </ScCard>
                    </div>
                    <div class="uk-width-1-2">
                        <ScCard>
                            <ScCardHeader separator>
                                <ScCardTitle>
                                    Bokstäver/siffror
                                </ScCardTitle>
                            </ScCardHeader>
                            <ScCardBody class="uk-padding-remove uk-text-small" separator>
                                <div class="uk-flex">
                                    <div class="uk-width-1-6 border-bottom">
                                        <div class="uk-margin-small-left">Bokstav/siffra</div>
                                    </div>
                                    <div class="uk-width-5-6 border-left border-bottom">
                                        <div class="uk-margin-small-left">Antal</div>
                                    </div>
                                </div>
                                <div v-for="item in printInfo.LetterList" :key="item.Value" >
                                    <div class="uk-flex">
                                        <div class="uk-width-1-6 border-bottom">
                                            <div class="uk-margin-small-left">{{ item.NumberOfItems }}</div>
                                        </div>
                                        <div class="uk-width-5-6 border-left border-bottom">
                                            <div class="uk-margin-small-left">{{ item.Value }}</div>
                                        </div>
                                    </div>
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
export default {
    data () {
		return {
            printInfo: null,
        }
    },
    methods: {
    },
    async fetch () {
        this.$store.dispatch('setBusyOn')
        try {
            const [ printinfo ] = await Promise.all([
                this.$axios.$get('/webapi/Order/GetNameAndNumberInformation'),
            ])
            this.printInfo = printinfo
            this.$store.dispatch('setBusyOff')
        } catch (err) {
            console.log(err);
            this.$store.dispatch('setBusyOff')
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