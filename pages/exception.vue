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
						<h1 class="sc-top-bar-title">
							Loggar
						</h1>
					</div>
				</div>
			</div>
			<div id="sc-page-content">
				<ScCard>
					<ScCardBody>
						<div class="uk-flex uk-margin-medium-bottom">
							<div class="uk-margin-medium-bottom uk-width-1-1">
								<div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled uk-position-z-index">
								<client-only>
									<Select2
										id="select-domainOptionsList"
										v-model="domainId"
										:options="domainOptionsList"
										:settings="{ 'width': '100%', 'placeholder': 'Välj domän', 'closeOnSelect': true }"
									>
									</Select2>
								</client-only>
								</div>
							</div>
							<button v-if="domainId != null" v-waves.button.light class="uk-margin-medium-left sc-button sc-button-primary" @click.prevent="deleteExceptionsByDomainId()">
								RADERA
							</button>
						</div>
						<Alert
							:message="message"
							:alertClass="'uk-alert-success'"
							id=1
						/>
						<div class="uk-card uk-box-shadow-small">
							<VueGoodTable
								:columns="columns"
								:rows="logs"
								style-class="vgt-table"
								:search-options="{ enabled: false }"
								:pagination-options="{
									enabled: false,
									mode: 'pages',
									perPage: 30,
									position: 'top',
									perPageDropdown: [10, 20, 30, 40, 50],
									dropdownAllowAll: false,
									setCurrentPage: 1,
									nextLabel: 'nästa',
									prevLabel: 'föregående',
									rowsPerPageLabel: 'Rader per sida',
									ofLabel: 'av',
									pageLabel: 'sida',
									allLabel: 'Alla',
								}"
							>
							<div class="uk-label uk-label-success uk-margin-small-right" slot="table-actions">
								{{ this.logs.length }}
							</div>
								<template slot="table-row" slot-scope="props">
									<span v-if="props.column.field === 'CreatedDate'">
										{{ props.row.CreatedDate }}
									</span>
									<span v-else-if="props.column.field === 'Method'">
										{{ props.row.Method }}
									</span>
									<span v-else-if="props.column.field === 'Message'">
										{{ props.row.Message }}
									</span>
									<span v-else-if="props.column.field === 'show-more'">
										<button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="getExceptionDetails(props.row.ErrorId)" href="#modal-moreinfo" data-uk-toggle>
											MER
										</button>
									</span>
								</template>
							</VueGoodTable>
						</div>
						<!-- MER INFO -->
						<div v-if="exceptionDetails != null" id="modal-moreinfo" class="uk-modal" data-uk-modal>
							<div class="uk-modal-dialog">
								<button class="uk-modal-close-default" type="button" data-uk-close></button>
								<div class="uk-modal-header">
									<h2 class="uk-modal-title">
										Exceptioninfo
									</h2>
								</div>
								<div class="uk-modal-body" data-uk-overflow-auto>
									<table class="uk-card uk-table uk-table-small uk-text-small uk-margin-remove-bottom">
										<tbody>
											<tr>
												<td class="border-bottom border-right uk-width-1-5"><strong>Tidpunkt</strong>
												</td>
												<td class="border-bottom uk-width-4-5">{{ exceptionDetails.CreatedDate }}
												</td>
											</tr>
											<tr>
												<td class="border-bottom border-right uk-width-1-5"><strong>Meddelande</strong>
												</td>
												<td class="border-bottom uk-width-4-5">{{ exceptionDetails.Message }}
												</td>
											</tr>
											<tr>
												<td class="border-bottom border-right uk-width-1-5"><strong>Metod</strong>
												</td>
												<td class="border-bottom uk-width-4-5">{{ exceptionDetails.Method }}
												</td>
											</tr>
											<tr>
												<td class="border-bottom border-right uk-width-1-5"><strong>StackTrace</strong>
												</td>
												<td class="border-bottom uk-width-4-5">{{ exceptionDetails.StackTrace }}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
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
import Alert from '~/components/Alert'
export default {
	components: {
		VueGoodTable,
		Select2: process.client ? () => import('~/components/Select2') : null,
		Alert,
	},
	data () {
		return {
			logs: [],
			domainList: [],
			domainOptionsList: [],
			domainId: null,
			exceptionDetails: {},
			showMoreVisible: false,
			errors: null,
			message: null,
		}
    },
	computed: {
		columns () {
			return [
				{
					label: 'Tidpunkt',
					field: 'CreatedDate',
					sortable: false,
					filterOptions: {
						enabled: false
					},
                    type: 'string',
                    thClass: 'uk-text-left',
					tdClass: 'uk-text-nowrap uk-text-left',
                    width: '6%',
				},
				{
					label: 'Metod',
					field: 'Method',
					sortable: false,
					type: 'string',
					filterOptions: {
						enabled: false
					},
                    width: '45%',
				},
				{
					label: 'Meddelande',
					field: 'Message',
					sortable: false,
					type: 'string',
					filterOptions: {
						enabled: false
					},
                    width: '45%',
				},
				{
					label: '',
					field: 'show-more',
                    width: '4%',
					sortable: false,
				},
			]
		},
	},
	methods: {
		async getExceptionsByDomain(domainId) {
			{{ this.$store.dispatch('setBusyOn') }}
			this.$store.commit('setAlertHidden', 1)
			await this.$axios.$get('/webapi/Exception/GetExceptionsByDomainId?domainId=' + this.domainId )
			.then( logs => {
				this.logs = logs
				{{ this.$store.dispatch('setBusyOff') }}
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
		async getExceptionDetails(errorId) {
			this.exceptionDetails = {}
			{{ this.$store.dispatch('setBusyOn') }}
			await this.$axios.$get('/webapi/Exception/GetExceptionDetails?ErrorId=' + errorId )
			.then( exceptionDetails => {
				this.exceptionDetails = exceptionDetails
				{{ this.$store.dispatch('setBusyOff') }}
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
		async getDomainList() {
			{{ this.$store.dispatch('setBusyOn') }}
			await this.$axios.$get('/webapi/Exception/GetDomainList')
			.then( domainList => {
				this.domainList = domainList
				this.domainOptionsList = domainList.map(({ DomainId, DomainName }) => ({ id: DomainId, text: DomainName }))
				{{ this.$store.dispatch('setBusyOff') }}
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
		async deleteExceptionsByDomainId(domainId) {
			{{ this.$store.dispatch('setBusyOn') }}
			await this.$axios.$post('/webapi/Exception/PostDeleteExceptionsByDomainId?domainId=' + this.domainId )
			.then( response => {
				this.message = response.Message
				this.$store.commit('setAlertVisible', 1)
				this.logs = []
				this.getDomainList()
				{{ this.$store.dispatch('setBusyOff') }}
			})
			.catch(function (error) {
				console.log(error)
			})
    	},
	},
	mounted() {

	},
	watch: {
		domainId: function () {
			this.logs = []
			this.getExceptionsByDomain(this.domainId)
		}
	},
	async fetch () {
		this.$store.dispatch('setBusyOn')
        try {
            this.getDomainList()
			this.$store.dispatch('setBusyOff')
        } catch (err) {
            console.log(err);
			this.$store.dispatch('setBusyOff')
        }
    },
}
</script>

<style lang="scss">
    table.vgt-table {
        font-size: 0.75rem;
    }
    table.vgt-table td {
        vertical-align: top;
        border-right: 1px solid #dcdfe6;
        padding: .3em .75em .3em .75em;
    }
	table.vgt-table th {
        font-size: 0.6rem;
    }
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