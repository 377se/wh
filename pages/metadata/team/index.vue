<template>
    <div v-if="$fetchState.pending">
        <div id="sc-page-wrapper">
            {{ showPageOverlaySpinner() }}
        </div>
    </div>
    <div v-else id="sc-page-wrapper">
        {{ hidePageOverlaySpinner() }}
        <div id="sc-page-top-bar" class="sc-top-bar">
            <div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
                <div class="uk-flex-1">
                    <h1 class="sc-top-bar-title">
                        Metadata - Lag
                    </h1>
                </div>
            </div>
        </div>
        <div id="sc-page-content">
            <div class="uk-grid uk-grid-medium" uk-grid uk-margin>
                <div class="uk-width-1-1 uk-width-2-3@m">
                    <ScCard>
                        <ScCardHeader separator>
                            <ScCardTitle>
                                Laglista
                            </ScCardTitle>
                        </ScCardHeader>
                        <ScCardBody>
                            <VueGoodTable
                                :key="render"
                                :columns="columns"
                                :rows="teamListMeta"
                                style-class="vgt-table"
                                :search-options="{
                                    enabled: false,
                                    trigger: 'enter',
                                }"
                                :pagination-options="{
                                    enabled: true,
                                    mode: 'pages',
                                    perPage: 50,
                                    position: 'top',
                                    perPageDropdown: [10, 20, 30, 40, 50],
                                    dropdownAllowAll: true,
                                    setCurrentPage: 1,
                                    nextLabel: 'nästa',
                                    prevLabel: 'föregående',
                                    rowsPerPageLabel: 'Antal per sida',
                                    ofLabel: 'av',
                                    pageLabel: 'sida', // for 'pages' mode
                                    allLabel: 'Alla',
                                }"
                            >
                                <template slot="table-row" slot-scope="props">
                                    <img v-if="props.column.field === 'ImageName'" :src="props.row.ImageName">
                                    <span v-if="props.column.field === 'Name'">
                                        <div class="cursor-pointer link-color" @click="getTeamToEdit(props.row.Id)">{{ props.row.Name }}</div>
                                    </span>
                                    <span v-else-if="props.column.field === 'League'">
                                        {{ props.row.League }}
                                    </span>
                                </template>
                            </VueGoodTable>
                        </ScCardBody>
                    </ScCard>
                </div>
                <div class="uk-width-1-1 uk-width-1-3@m uk-flex-first uk-flex-last@m" uk-margin>
                    <ScCard>
                        <ScCardHeader separator>
                            <ScCardTitle>
                                Redigera lag
                            </ScCardTitle>
                        </ScCardHeader>
                        <ScCardBody>
                            <div class="uk-width-1-1">
                                <Alert
                                    :errorlist="errors"
                                    :alertClass="'uk-alert-danger'"
                                    id=1
                                />
                                <!-- Namn -->
                                <div class="uk-margin-medium-bottom">
                                    <ScInput v-model="currentTeamObject.Name" state="fixed" mode="outline" extra-classes="uk-form-small">
                                        <label>Namn</label>
                                    </ScInput>
                                </div>
                                <!-- Liga -->
                                <div class="uk-margin-medium-bottom sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                    <label class="select-label" for="select-sizeOptionsList">Liga</label>
                                    <client-only>
                                        <Select2
                                            id="select-leagueList"
                                            v-model="currentTeamObject.LeagueId"
                                            :options="leagueList"
                                            :settings="{ 'width': '100%', 'closeOnSelect': true }"
                                        >
                                        </Select2>
                                    </client-only>
                                </div>
                                <!-- BILDUPPLADDNING -->
                                <template v-if="currentTeamObject.Id">
                                    <img :src="currentTeamObject.ImageName">
                                    <div class="uk-padding-small uk-padding-remove-horizontal">
                                        <FileUpload
                                            :teamId="currentTeamObject.Id"
                                            :teamImage="this.teamImage"
                                            @updateTeamImage="getTeamToEdit(currentTeamObject.Id)"
                                        />
                                    </div>
                                </template>
                                <div class="uk-flex uk-flex-around">
                                    <div>
                                        <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="createTeam()">SKAPA
                                        </button>
                                    </div>
                                    <div v-if="currentTeamObject.Id">
                                        <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateTeam()">
                                            UPPDATERA
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </ScCardBody>
                    </ScCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'vue-good-table/dist/vue-good-table.css'
    import { VueGoodTable } from 'vue-good-table'
    import ScInput from '~/components/Input'
    import Alert from '~/components/Alert'
    import FileUpload from '~/components/FileUploadTeamImage'

    export default {
        components: {
    		Alert,
    		ScInput,
    		FileUpload,
            VueGoodTable,
            Select2: process.client ? () => import('~/components/Select2') : null,
        },
        data () {
            return {
                errors: null,
                message: null,
                render: false,
                leagueList: [],
                teamListMeta: [],
                emptyTeamObject: {},
                currentTeamObject: {},
                teamImage: null,
            }
        },
        computed: {
            columns () {
                return [
                    {
                        label: '',
                        field: 'ImageName',
                        sortable: false,
                        tdClass: 'uk-text-center uk-text-nowrap',
                        width: '33px',
                    },
                    {
                        label: 'Lag',
                        field: 'Name',
                        sortable: true,
                        type: 'string',
                        filterOptions: {
                            enabled: true
                        },
                        width: '45%',
                    },
                    {
                        label: 'Liga',
                        field: 'League',
                        sortable: true,
                        type: 'string',
                        filterOptions: {
                            enabled: true
                        },
                        width: '45%',
                    },
                ]
            },
        },
        methods: {
            async createTeam() {
                let _this = this
                _this.currentTeamObject = _this.emptyTeamObject
                _this.$store.commit('setAlertHidden', 1)
                _this.showPageOverlaySpinner()
                await this.$axios.$post('/webapi/Metadata/CreateTeam', _this.currentTeamObject)
                .then(function (res) {
                    if (res.ErrorList != null) {
                        _this.errors = res.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.hidePageOverlaySpinner()
                    } else {
                        _this.currentTeamObject = res
                        _this.hidePageOverlaySpinner()
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    _this.hidePageOverlaySpinner()
                })
            },
            async updateTeam() {
                let _this = this
                _this.showPageOverlaySpinner()
                // update team
                await this.$axios.$post('/webapi/Metadata/UpdateTeam', _this.currentTeamObject )
                .then(function (response) {
                    try {
                        if (response.ErrorList != null ) {
                            _this.errors = response.ErrorList
                            _this.$store.commit('setAlertVisible', 1)
                            _this.hidePageOverlaySpinner()
                        } else {
                            _this.$store.commit('setAlertHidden', 1)
                            // Update teamlist
                            _this.teamListMeta.forEach((team, index) => {
                                if (team.Id == _this.currentTeamObject.Id) {
                                    _this.teamListMeta[index] = _this.currentTeamObject
                                }
                            })
                            // re-render table
                            _this.render = !_this.render
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
            async getTeamToEdit(teamId) {
                let _this = this
                _this.$store.commit('setAlertHidden', 1)
                _this.showPageOverlaySpinner()
                await this.$axios.$get('/webapi/Metadata/GetTeamById?teamId=' + teamId)
                .then(function (response) {
                    try {
                        if (response.ErrorList != null ) {
                            _this.hidePageOverlaySpinner()
                        } else {
                            _this.currentTeamObject = response
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
                const [ leaguelist, teamlistmeta, emptyteamobject ] = await Promise.all([
                    this.$axios.$get('/webapi/metadata/GetLeagueList'),
                    this.$axios.$get('/webapi/Metadata/GetTeamListMeta'),
                    this.$axios.$get('/webapi/Metadata/GetEmptyTeamObject'),
                ])
                this.leagueList = leaguelist.map(({ Id, Name }) => ({ id: Id, text: Name }))
                this.teamListMeta = teamlistmeta
                this.emptyTeamObject = emptyteamobject
                this.currentTeamObject = emptyteamobject
            } catch (err) {
                console.log(err);
            }
        },
    }
</script>

<style lang="scss" scoped>
    table.vgt-table {
        font-size: 0.75rem;
    }
    table.vgt-table td {
        vertical-align: middle;
        border-right: 1px solid #dcdfe6;
        padding: .3em .75em .3em .75em;
    }
	table.vgt-table th {
        font-size: 0.6rem;
    }
	.vgt-inner-wrap .footer__row-count__label {
        font-size: 0.6rem;
    }
    .cursor-pointer {
        cursor: pointer;
    }
    .link-color {
        color: #0088CC;
    }
</style>