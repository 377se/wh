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
                        1892-klubben
                    </h1>
                </div>
            </div>
        </div>
        <div id="sc-page-content">
            <div class="uk-grid uk-grid-medium" uk-grid uk-margin>
                <div class="uk-width-1-1 uk-width-2-3@m">
                    <ScCard>
                        <ScCardHeader separator>
                            <div class="uk-flex uk-flex-between">
                                <ScCardTitle>
                                    Företag
                                </ScCardTitle>
                            </div>
                        </ScCardHeader>
                        <ScCardBody>
                            <VueGoodTable
                                :key="render"
                                :columns="columns"
                                :rows="businessList"
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
                                    <span v-if="props.column.field === 'CompanyInvoiceId'">
                                        {{ props.row.CompanyInvoiceId }}
                                    </span>
                                    <span v-if="props.column.field === 'Name'">
                                        <div class="cursor-pointer link-color" @click="get1892Details(props.row.CompanyInvoiceId)">{{ props.row.Name }}</div>
                                    </span>
                                    <span v-else-if="props.column.field === 'CreatedDate'">
                                        {{ props.row.CreatedDate }}
                                    </span>
                                </template>
                            </VueGoodTable>
                        </ScCardBody>
                    </ScCard>
                </div>
            </div>
        </div>
  
        <!-- DETAILS MODAL -->
        <div id="edit-1892-modal" class="uk-modal-full uk-modal uk-overflow-hidden" data-uk-modal>
  
          <div class="uk-modal-header basket-ribbon uk-animation-slide-right">
              <h4 class="uk-modal-title" style="color:#000; line-height:1; margin:0px 0 0 12px; padding:16px 0 0 0;">Redigera 1892-medlem</h4>
              <button
                  class="uk-offcanvas-close uk-icon uk-close"
                  style="color:#000;top:14px;right:12px;"
                  type="button"
                  uk-close
                  uk-toggle="target: #edit-1892-modal"/>
          </div>
          <div class="uk-modal-dialog uk-modal-body uk-overflow-auto uk-animation-slide-right" style="padding:20px 20px; background:#ffffff; height:calc(100% - 50px);">
  
              <!-- TAB-HEADLINES - ADMINDETAILS MODAL -->
              <ul uk-tab>
                  <li class="uk-active">
                      <a href="javascript:void(0)">
                          INFORMATION
                      </a>
                  </li>
              </ul>
              <!-- TAB-CONTENT - 1892DETAILS MODAL -->
              <ul class="uk-switcher">
                <!-- INSTÄLLNINGAR -->
                <li v-if="current1892Object" class="uk-active">
  
                    <!-- REDIGERA 1892-MEDLEM -->
  
  
                    <Alert
                        :errorlist="this.errors ? this.errors : null"
                        :alertClass="'uk-alert-danger'"
                        id=1
                    />
                    <Alert
                        :message="this.message ? this.message : null"
                        :alertClass="'uk-alert-success'"
                        id=2
                    />
                    <!-- Image 
                    <div class="uk-margin">
                        <img :src="editedAdmin.ImageName"/>
                        <div class="uk-padding-small uk-padding-remove-horizontal">
                            <FileUpload
                            :adminId="editedAdmin.AdminId"
                            @updateAvatar="getAdminDetails(editedAdmin.AdminId)"
                            />
                        </div>
                    </div>
                    -->
                    <!-- Id -->
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.CompanyInvoiceId" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                            <label>Id</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.OrganizationNumber" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                            <label>Organisationsnummer</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.Name" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                            <label>Namn</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.Address" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                            <label>Adress</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.PostalCode" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                            <label>Postnummer</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.City" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                            <label>Stad</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.ContactPerson" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                            <label>Kontaktperson</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.Phone" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                            <label>Telefon</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.Email" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                            <label>Email</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.CreatedDate" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                            <label>Skapad</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.ExpirationDate" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                            <label>Expiration Date</label>
                        </ScInput>
                    </div>
                    <!--button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateAdmin()">
                        UPPDATERA
                    </button-->
                </li>
              </ul>
  
          </div>
  
        </div>
    </div>
  </template>
  
  <script>
    import 'vue-good-table/dist/vue-good-table.css'
    import { VueGoodTable } from 'vue-good-table'
    import ScInput from '~/components/Input'
    import Alert from '~/components/Alert'
  
    export default {
        components: {
        Alert,
        ScInput,
        VueGoodTable,
        Select2: process.client ? () => import('~/components/Select2') : null,
        },
        data () {
            return {
                errors: null,
                message: null,
                render: false,
                businessList: [],
                current1892Object: null
            }
        },
        computed: {
            columns () {
                return [
                  { 
                        label: 'Id',
                        field: 'CompanyInvoiceId',
                        sortable: false,
                        type: 'string',
                        filterOptions: {
                            enabled: false
                        },
                        width: '10%',
                    },
                    {
                        label: 'Namn',
                        field: 'Name',
                        sortable: true,
                        type: 'string',
                        filterOptions: {
                            enabled: true
                        },
                        width: '40%',
                    },
                    {
                        label: 'Skapad',
                        field: 'CreatedDate',
                        sortable: true,
                        type: 'string',
                        filterOptions: {
                            enabled: true
                        },
                        width: '40%',
                    },
                ]
            },
        },
        methods: {
          async get1892Details(id) {
              let _this = this
              _this.$store.commit('setAlertHidden', 1)
              _this.$store.dispatch('setBusyOn')
              await this.$axios.$get('/webapi/CompanyInvoice/Get?id=' + id)
              .then(function (response) {
                  try {
                      if (response.ErrorList != null ) {
                          _this.$store.dispatch('setBusyOff')
                      } else {
                          _this.current1892Object = response
                          setTimeout(() => {
                              UIkit.modal('#edit-1892-modal').show()
                          }, 400);
                          _this.$store.dispatch('setBusyOff')
                      }
                  } catch(err) {
                      console.log(err)
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
            try {
                const [ businesslist ] = await Promise.all([
                    this.$axios.$get('/webapi/CompanyInvoice/GetAll'),
                ])
                this.businessList = businesslist
                this.$store.dispatch('setBusyOff')
            } catch (err) {
                console.log(err);
                this.$store.dispatch('setBusyOff')
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
    .cursor-pointer {
        cursor: pointer;
    }
    .link-color {
        color: #0088CC;
    }
  </style>