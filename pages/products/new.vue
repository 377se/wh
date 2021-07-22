<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
            {{ this.showPageOverlaySpinner() }}
        </div>
    </div>
    <div v-else>
        <div id="sc-page-wrapper">
            {{ hidePageOverlaySpinner() }}
            <div id="sc-page-top-bar" class="sc-top-bar">
                <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                    <div class="uk-flex-1">
                        <h1 class="sc-top-bar-title uk-display-inline">Skapa ny produkt</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody>
                        <!-- TAB-HEADLINES - CREATE NEW PRODUCT -->
                        <ul data-uk-tab>
                            <li class="uk-active">
                                <a href="javascript:void(0)">
                                    Skapa ny produkt
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    Kopiera befintlig produkt
                                </a>
                            </li>
                        </ul>
                        <!-- TAB-CONTENT - TOPSELLING -->
					    <ul class="uk-switcher">
                            <!-- SKAPA NY PRODUKT -->
                            <li class="uk-active">
                                <Alert
                                    :errorlist="this.errors ? this.errors : []"
                                    :message="this.message ? this.message : ''"
                                    :alertClass="'uk-alert-danger'"
                                    id=1
                                />
                                <!-- Produktnamn -->
                                <div class="uk-margin-large-top">
                                    <ScInput v-model="currentArticle.ProductName" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Produktnamn</label>
                                    </ScInput>
                                </div>
                                <!-- Storlekstyp -->
                                <div class="uk-margin uk-width-1-1">
                                    <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                        <label class="select-label" for="select-team">Storlekstyp</label>
                                        <client-only>
                                            <Select2
                                                id="select-sizetypeid"
                                                v-model="currentArticle.SizeTypeId"
                                                :options="sizeTypeList"
                                                :settings="{ 'width': '100%', 'placeholder': 'Välj storlekstyp', 'closeOnSelect': true,  'allowClear': true }"
                                            >
                                            </Select2>
                                        </client-only>
                                    </div>
                                </div>
                                <!-- Kombinationsprodukt -->
                                <div class="uk-margin uk-width-1-1">
                                    <div>
                                        <ul class="uk-list uk-margin-remove-top">
                                            <li class="uk-text-small" style="padding: 3px 3px 3px 2px">
                                                <PrettyCheck v-model="currentArticle.IsCombinedProduct" class="p-icon">
                                                    <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Kombinationsprodukt</span>
                                                </PrettyCheck>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <button @click="postCreateArticle" class="uk-button uk-button-primary uk-align-left">SKAPA PRODUKT</button>
                            </li>
                            <!-- KOPIERA BEFINTLIG PRODUKT -->
                            <li>
                                <Alert
                                    :errorlist="this.errors ? this.errors : []"
                                    :message="this.message ? this.message : ''"
                                    :alertClass="'uk-alert-danger'"
                                    id=2
                                />
                                <!-- <p>{{currentCopyArticle}}</p> -->
                                <!-- Produkt som skall kopieras (ArtikelNr) -->
                                <div class="uk-margin">
                                    <ScInput v-model="searchedArticleNumber" state="fixed" mode="outline" extra-classes="uk-form-small" v-on:blur="getArticleDetailsByArticleNumber()">
                                        <label>Produkt som skall kopieras (ArtikelNr)</label>
                                    </ScInput>
                                </div>
                                <!-- Produkt som skall kopieras (Produktnamn) -->
                                <div class="uk-margin">
                                    <ScInput v-model="foundCopyArticle.ProductName" state="fixed" mode="outline" extra-classes="uk-form-small" disabled>
                                        <label>Produkt som skall kopieras (Produktnamn)</label>
                                    </ScInput>
                                </div>

                                <div>

                                    <img :src="foundCopyArticle.ProductImage">

                                    <!-- LAG -->
                                    <div class="uk-margin uk-width-1-1">
                                        <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                            <label class="select-label" for="select-team">Lag</label>
                                            <client-only>
                                                <Select2
                                                    id="select-team"
                                                    v-model.number="currentCopyArticle.TeamId"
                                                    :options="teamList"
                                                    :settings="{ 'width': '100%', 'placeholder': 'Välj lag', 'closeOnSelect': true,  'allowClear': true }"
                                                >
                                                </Select2>
                                            </client-only>
                                        </div>
                                    </div>
                                    <!-- Produktnamn -->
                                    <div class="uk-margin-medium-bottom">
                                        <ScInput v-model="currentCopyArticle.ArticleName" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Produktnamn</label>
                                        </ScInput>
                                    </div>
                                    <!-- Artikelnummer -->
                                    <div class="uk-margin-medium-bottom">
                                        <ScInput v-model="currentCopyArticle.ArticleNumber" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Artikelnummer</label>
                                        </ScInput>
                                    </div>
                                </div>

                                <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="postCopyArticle">
                                    KOPIERA PRODUKT
                                </button>
                            </li>
                        </ul>
                    </ScCardBody>
                </ScCard>
            </div>
        </div>
    </div>
</template>

<script>
    import ScInput from '~/components/Input'
    import PrettyCheck from 'pretty-checkbox-vue/check'
    import Alert from '~/components/Alert'
    export default {
        components: {
            ScInput,
            Select2: process.client ? () => import('~/components/Select2') : null,
            PrettyCheck,
            Alert,
        },
        data () {
            return {
                emptyArticle: {},
                currentArticle: {},
                emptyCopyArticle: {},
                currentCopyArticle: {},
                foundCopyArticle: {},
                sizeTypeList: [],
                teamList: [],
                errors: '',
                message: '',
                searchedArticleNumber: '',
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
            async postCreateArticle() {
                let _this = this
                _this.$store.commit('setAlertHidden', 1)
                _this.showPageOverlaySpinner()
                _this.errors = null
                await this.$axios.$post('/webapi/Article/PostCreateArticle', _this.currentArticle)
                .then(function (currentarticle) {
                    try {
                        if (currentarticle.ErrorList != null ) {
                            _this.errors = currentarticle.ErrorList
                            _this.$store.commit('setAlertVisible', 1)
                        } else {
                            _this.currentArticle = currentarticle
                            _this.hidePageOverlaySpinner()
                            _this.$router.push(currentarticle.Url)
                        }
                    } catch(err) {
                        console.log(err)
                    }
                    _this.hidePageOverlaySpinner()
                })
                .catch(function (error) {
                    console.log(error)
                    _this.hidePageOverlaySpinner()
                })
            },
            async postCopyArticle() {
                let _this = this
                _this.showPageOverlaySpinner()
                _this.errors = null
                _this.$store.commit('setAlertHidden', 2)
                await this.$axios.$post('/webapi/Article/PostCopyArticle', _this.currentCopyArticle)
                .then(function (currentcopyarticle) {
                    try {
                        if (currentcopyarticle.ErrorList != null ) {
                            _this.errors = currentcopyarticle.ErrorList
                            _this.$store.commit('setAlertVisible', 2)
                        } else {
                            _this.hidePageOverlaySpinner()
                            _this.$router.push(currentcopyarticle.Url)
                        }
                    } catch(err) {
                        console.log(err)
                    }
                    _this.hidePageOverlaySpinner()
                })
                .catch(function (error) {
                    console.log(error)
                    _this.hidePageOverlaySpinner()
                })
            },
            async getArticleDetailsByArticleNumber() {
                let _this = this
                _this.showPageOverlaySpinner()
                await this.$axios.$get('/webapi/Article/GetArticleDetailsByArticleNumber?articleNumber=' + _this.searchedArticleNumber)
                .then(function (response) {
                    _this.foundCopyArticle = response
                    _this.currentCopyArticle.ArticleId = response.ArticleId
                    try {
                        if ( response.ErrorList != null ) {
                            _this.errors = response.ErrorList
                            _this.hidePageOverlaySpinner()
                        } else {
                            _this.hidePageOverlaySpinner()
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
        },
        async fetch () {
            try {
                const [emptyarticle, emptycopyarticle, sizetypelist, teamlist ] = await Promise.all([
                    this.$axios.$get('/webapi/Article/GetArticleCreate'),
                    this.$axios.$get('/webapi/Article/GetArticleCopy'),
                    this.$axios.$get('/webapi/Metadata/GetSizeTypeList'),
                    this.$axios.$get('/webapi/Metadata/GetTeamList'),
                ])
                this.emptyArticle = emptyarticle
                this.currentArticle = emptyarticle
                this.emptyCopyArticle = emptycopyarticle
                this.currentCopyArticle = emptycopyarticle
                this.sizeTypeList = sizetypelist.map(({ Id, Name }) => ({ id: Id, text: Name }))
                this.teamList = teamlist.map(({ Id, Name }) => ({ id: Id, text: Name }))
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