<template>
<div v-if="$fetchState.pending">
	<div id="sc-page-wrapper">
		{{ this.showPageOverlaySpinner() }}
	</div>
</div>
<div v-else>
 	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
				<div class="uk-flex-1">
					<h1 class="sc-top-bar-title uk-display-inline">Sök</h1>
				</div>
			</div>
		</div>
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
                <div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
                    <!-- SÖKKRITERIER -->
                    <div class="uk-width-1-4@m">
                        <ScCard>
                            <ScCardHeader separator>
                                <div class="uk-flex uk-flex-middle">
                                    <div class="uk-flex-1">
                                        <ScCardTitle>
                                            Sökkriterier
                                        </ScCardTitle>
                                    </div>
                                    <ScCardActions>

                                    </ScCardActions>
                                </div>
                            </ScCardHeader>
                            <ScCardContent>
                                <ScCardBody>
                                    <div class="uk-form-controls">
                                        <ul class="uk-list">
                                            <li v-for="criteria in searchCriteriaList" :key="criteria.Id">
                                                <PrettyRadio
                                                    v-model="criteriaShit.criteriaId"
                                                    :value="criteria.Id"
                                                    name="searchCriteriaButton"
                                                    class="p-radio"
                                                >
                                                    {{ criteria.Name }}
                                                </PrettyRadio>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="uk-margin">
                                        <ScInput v-model="criteriaShit.searchCriteria" state="fixed" mode="outline" v-on:blur="getSearchResult(criteriaShit)" extra-classes="uk-form-small">
                                            <label>Söksträng</label>
                                        </ScInput>
                                    </div>

                                </ScCardBody>
                            </ScCardContent>
                        </ScCard>
                    </div>
                    <!-- SÖKRESULTAT -->
                    <div class="uk-width-3-4@m">
                        <ScCard>
                            <ScCardHeader separator>
                                <div class="uk-flex uk-flex-middle">
                                    <div class="uk-flex-1">
                                        <ScCardTitle>
                                            Sökresultat
                                        </ScCardTitle>
                                    </div>
                                    <ScCardActions>
                                    </ScCardActions>
                                </div>
                            </ScCardHeader>
                            <ScCardContent>
                                <ScCardBody>
							        <div v-if="isSearchPerformed == true" class="uk-alert-success" data-uk-alert>
                                        Sökningen gav {{ numberOfHits }} träffar.
			                        </div>
                                    <VueGoodTable
                                        :columns="this.searchHeaders"
                                        :rows="this.searchList"
                                        style-class="vgt-table"
                                    >
                                        <template slot="table-row" slot-scope="props">
                                            <span v-if="props.column.field === 'ImageName'">
                                                <img :src="props.row.ImageName">
                                            </span>
                                            <span v-else-if="props.column.field === 'Column1'">
                                                <nuxt-link :to="props.row.Url">
                                                    {{ props.row.Column1 }}
                                                </nuxt-link>
                                            </span>
                                            <span v-else-if="props.column.field === 'Column2'">
                                                {{ props.row.Column2 }}
                                            </span>
                                            <span v-else>
                                                {{ props.row.Column3 }}
                                            </span>
                                        </template>
                                    </VueGoodTable>
                                </ScCardBody>
                            </ScCardContent>
                        </ScCard>
                    </div>
                </div>
				</ScCardBody>
			</ScCard>
		</div>
    </div>
</div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import ScInput from '~/components/Input'
import contentOverlay from '~/components/Overlay'
import PrettyRadio from 'pretty-checkbox-vue/radio';

export default {
	components: {
		ScInput,
		PrettyRadio,
		VueGoodTable,
		contentOverlay,
	},
	data () {
		return {
			criteriaShit: {
                searchCriteria: '',
			    criteriaId: 1,
            },
            searchCriteriaList: [],
			searchResult: [],
			searchList: [],
			searchHeaders: [],
            numberOfHits: null,
            isSearchPerformed: false,
		}
	},
	watch: {
	},
	mounted () {
        let initHeaders = {
        "Column0": null,
        "Column1": "",
        "Column2": "",
        "Column3": ""
        }
        this.searchHeaders = this.buildHeaderObject(initHeaders)
	},
	computed: {
	},
	methods: {
		showPageOverlaySpinner () {
			this.$store.commit('togglePageOverlay', true)
			this.$store.commit('toggleProgressOverlay', true);
			setTimeout(() => {
				this.$store.commit('toggleProgressOverlay', false);
				setTimeout(() => {
					this.$store.commit('togglePageOverlay', false)
				})
			}, 500)
		},
        async getSearchResult(criteriaShit) {
            let _this = this
            _this.isLoading = true
            await this.$axios.$post('/webapi/Search/PostSearch', _this.criteriaShit )
            .then(function (response) {
                if(response.Message !== ''){
                    _this.showPageOverlaySpinner()
                    _this.searchResult = response
                    _this.searchList = response.SearchList
                    _this.searchHeaders = _this.buildHeaderObject(response.Headers)
                    _this.numberOfHits = response.NumberOfHits
                    _this.isSearchPerformed = true
                    _this.isLoading = false
                } else {

                }
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        buildHeaderObject (fetchedHeaders) {
            let headerObject = [
				{
					label: '',
					field: 'ImageName',
					sortable: false,
                    type: 'string',
                    thClass: 'uk-text-left vgt-th',
					tdClass: 'uk-text-nowrap uk-text-left',
                    width: '60px',
				},
				{
					label: '',
					field: 'Column1',
					sortable: false,
                    type: 'string',
                    thClass: 'uk-text-left vgt-th',
					tdClass: 'uk-text-nowrap uk-text-left',
                    width: 'auto',
				},
				{
					label: '',
					field: 'Column2',
					sortable: false,
                    type: 'string',
                    thClass: 'uk-text-left vgt-th',
					tdClass: 'uk-text-nowrap uk-text-left',
                    width: 'auto',
				},
				{
					label: '',
					field: 'Column3',
					sortable: false,
                    type: 'string',
                    thClass: 'uk-text-left vgt-th',
					tdClass: 'uk-text-nowrap uk-text-left',
                    width: 'auto',
				},
			]

            let idx = 0
            headerObject.forEach(column => {
                let value = 'Column' + idx
                if (column.field === value ) {
                    column.label = fetchedHeaders[value]
                }
                idx++
            })

            return headerObject
        },
	},
	async fetch () {
		try {
			const [searchCriteriaList] = await Promise.all([
				this.$axios.$get('/webapi/Search/GetSearchCriteriaList'),
      		])
			this.searchCriteriaList = searchCriteriaList
		} catch (err) {
      		console.log(err);
		}
    },
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
    table.vgt-table {
        font-size: 0.75rem;
    }
    table.vgt-table td {
        vertical-align: middle;
        border-right: 1px solid #dcdfe6;
        padding: .35em .65em .35em .65em;
    }
    .vgt-th {
        font-size: 0.6rem;
    }
	.vgt-table th.vgt-row-header {
        font-size: 0.7rem;
	}
	.uk-input {
		height: 30px;
		border-radius: 0;
		color: rgba(0, 0, 0, 0.87);
		background-color: #fff;
		padding: 8px 8px 7px;
		font-size: 0.75rem;
	}
</style>
