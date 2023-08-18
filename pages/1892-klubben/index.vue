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
                                    <span v-if="props.column.field === 'companyInvoiceId'">
                                        {{ props.row.companyInvoiceId }}
                                    </span>
                                    <span v-if="props.column.field === 'name'">
                                        <div class="cursor-pointer link-color" @click="get1892Details(props.row.companyInvoiceId)">{{ props.row.name }}</div>
                                    </span>
                                    <span v-else-if="props.column.field === 'createdDate'">
                                        {{ props.row.createdDate }}
                                    </span>
                                    <span v-else-if="props.column.field === 'payment'">
                                        {{ props.row.payment }}
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
              <h4 class="uk-modal-title" style="color:#fff; line-height:1; margin:0px 0 0 12px; padding:16px 0 0 0;">Redigera 1892-medlem</h4>
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
                    <div>
                        <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="toggleActive(current1892Object.companyInvoiceId,current1892Object.payment?false:true)">
                        <span v-if="current1892Object.payment">Inaktivera</span>
                        <span v-else>Aktivera</span>
                    </button>
                    </div>
                    <!-- Id -->
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.companyInvoiceId" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                            <label>Id</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.organizationNumber" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                            <label>Organisationsnummer</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.name" state="fixed" mode="outline"  extra-classes="uk-form-small">
                            <label>Namn</label>
                        </ScInput>
                    </div>
                    <div
                      v-if="current1892Object.companyLogo"
                      class="uk-width-1-1">
                      <img
                          :src="'https://res.cloudinary.com/supportersplace/image/upload/w_250,fl_lossy,f_auto,fl_progressive/files_lfc_nu/lfc-company-logos/'+current1892Object.companyLogo" />
                    </div>
                    <div class="uk-width-1-1">
                        <ScInput state="fixed" mode="outline"  :placeholder="file ? file.name : 'Du har inte valt en fil!'" extra-classes="uk-form-small" disabled>
                            <label>Logotyp</label>
                        </ScInput>
                    </div>
                    <form class="uk-width-1-1">
                        <fieldset class="uk-fieldset">
                            <div class="uk-margin uk-flex">
                                <div uk-form-custom>
                                    <div class="uk-flex uk-flex-nowrap">
                                        <input ref="file" type="file" id="file" @change="updateImage()"/>
                                    </div>
                                    <button class="sc-button sc-button sc-button-mini uk-margin-small-left" type="button" tabindex="-1">VÄLJ FIL</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                    <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="uploadImage()">
                        UPPDATERA LOGO
                    </button>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.address" state="fixed" mode="outline"  extra-classes="uk-form-small">
                            <label>Adress</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.postalCode" state="fixed" mode="outline"  extra-classes="uk-form-small">
                            <label>Postnummer</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.city" state="fixed" mode="outline"  extra-classes="uk-form-small">
                            <label>Stad</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.contactPerson" state="fixed" mode="outline"  extra-classes="uk-form-small">
                            <label>Kontaktperson</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.phone" state="fixed" mode="outline"  extra-classes="uk-form-small">
                            <label>Telefon</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.email" state="fixed" mode="outline"  extra-classes="uk-form-small">
                            <label>Email</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.website" state="fixed" mode="outline"  extra-classes="uk-form-small">
                            <label>Website</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                      <label>Företagsinformation</label>
                      <client-only>
                      <Redactorx v-model="current1892Object.companyInformation" :config="configOptions" />
                      </client-only>
                    </div>
                    <div class="uk-margin">
                      <ScTextarea :rows="3" v-model="current1892Object.extra" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                            <label>Extra</label>
                      </ScTextarea>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.createdDate" state="fixed" mode="outline"  extra-classes="uk-form-small">
                            <label>Skapad</label>
                        </ScInput>
                    </div>
                    <div class="uk-margin">
                        <ScInput v-model="current1892Object.expirationDate" state="fixed" mode="outline"  extra-classes="uk-form-small">
                            <label>Expiration Date</label>
                        </ScInput>
                    </div>
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
                    <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateCompany()">
                        UPPDATERA
                    </button>
                </li>
              </ul>
  
          </div>
  
        </div>
    </div>
  </template>
  
  <script>
    import 'vue-good-table/dist/vue-good-table.css'
    import Redactorx from '~/components/RedactorX'
    import { VueGoodTable } from 'vue-good-table'
    import ScInput from '~/components/Input'
    import ScTextarea from '~/components/Textarea'
    import Alert from '~/components/Alert'
  
    export default {
        components: {
        Redactorx,
        Alert,
        ScInput,
        ScTextarea,
        VueGoodTable,
        Select2: process.client ? () => import('~/components/Select2') : null,
        },
        data () {
            return {
              file: null,
              errors: null,
              message: null,
              render: false,
              businessList: [],
              current1892Object: null,
              configOptions: {
                  format: ['p', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol'],
                  quote: {
                  template: '<blockquote>Citat...</blockquote>'
                  },
                  toolbar: {
                  stickyTopOffset: 50
                  },
                  context: true,
                  embed: {
                  script: true,
                  checkbox: false,
                  },
              },
            }
        },
        computed: {
            columns () {
                return [
                  { 
                        label: 'Id',
                        field: 'companyInvoiceId',
                        sortable: false,
                        type: 'string',
                        filterOptions: {
                            enabled: false
                        },
                        width: '10%',
                    },
                    {
                        label: 'Namn',
                        field: 'name',
                        sortable: true,
                        type: 'string',
                        filterOptions: {
                            enabled: true
                        },
                        width: '40%',
                    },
                    {
                        label: 'Skapad',
                        field: 'createdDate',
                        sortable: true,
                        type: 'string',
                        filterOptions: {
                            enabled: true
                        },
                        width: '40%',
                    },
                    {
                        label: 'Betalat',
                        field: 'payment',
                        sortable: true,
                        type: 'Boolean',
                        filterOptions: {
                            enabled: true
                        },
                        width: '10%',
                    },
                ]
            },
        },
        methods: {
          async updateImage(){
              this.file = this.$refs.file.files[0]
          },
          async uploadImage(){
              var _this = this
              let formData = new FormData()
              formData.append('file', _this.file);
              _this.$store.commit('setAlertHidden', 1)
              _this.$store.commit('setAlertHidden', 2)
              _this.errors = null
              _this.message = null
              _this.$store.dispatch('setBusyOn')
              await this.$axios.$post('/companyinvoice/UploadImage?id='+_this.current1892Object.companyInvoiceId, formData,  { headers: { 'Content-Type': 'multipart/form-data' }})
              .then(function (response) {
                  try {
                      if (response.ErrorList != null ) {
                          _this.errors = response.ErrorList
                          _this.$store.dispatch('setBusyOff')
                          _this.$store.commit('setAlertVisible', 1)
                      }
                      if (response.Message != null) {
                          _this.message = response.Message
                          _this.$store.dispatch('setBusyOff')
                          _this.$store.commit('setAlertVisible', 2)
                      }
                  } catch(err) {
                      console.log(err)
                  }
                  _this.$store.dispatch('setBusyOff')
                  _this.file = null
                  _this.get1892Details(_this.current1892Object.companyInvoiceId)
              })
              .catch(function (error) {
                  console.log(error)
                  _this.$store.dispatch('setBusyOff')
              })
          },
          async updateCompany(){
              let _this = this
              _this.$store.commit('setAlertHidden', 1)
              _this.$store.commit('setAlertHidden', 2)
              _this.errors = null
              _this.message = null
              _this.$store.dispatch('setBusyOn')
              await this.$axios.$put('/companyinvoice/update', _this.current1892Object)
              .then(function (response) {
                  try {
                      if (response.ErrorList != null ) {
                          _this.errors = response.ErrorList
                          _this.$store.dispatch('setBusyOff')
                          _this.$store.commit('setAlertVisible', 1)
                      }
                      if (response.Message != null) {
                          _this.message = response.Message
                          _this.$store.dispatch('setBusyOff')
                          _this.$store.commit('setAlertVisible', 2)
                      }
                  } catch(err) {
                      console.log(err)
                  }
                  _this.$store.dispatch('setBusyOff')
                  _this.get1892Details(_this.current1892Object.companyInvoiceId)
              })
              .catch(function (error) {
                  console.log(error)
                  _this.$store.dispatch('setBusyOff')
              })
          },
          async get1892Details(id) {
              this.current1892Object = null
              let _this = this
              _this.$store.commit('setAlertHidden', 1)
              _this.$store.dispatch('setBusyOn')
              await this.$axios.$get('/companyinvoice/'+ id)
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
          async toggleActive(id, b){
            let _this = this
              _this.$store.commit('setAlertHidden', 1)
              _this.$store.commit('setAlertHidden', 2)
              _this.errors = null
              _this.message = null
              _this.$store.dispatch('setBusyOn')
              await this.$axios.$put('/companyinvoice/update-payment', {
                'companyInvoiceId':id,
                'payment':b
              })
              .then(function (response) {
                  try {
                      if (response.ErrorList != null ) {
                          _this.errors = response.ErrorList
                          _this.$store.dispatch('setBusyOff')
                          _this.$store.commit('setAlertVisible', 1)
                      }
                      if (response.Message != null) {
                          _this.message = response.Message
                          _this.$store.dispatch('setBusyOff')
                          _this.$store.commit('setAlertVisible', 2)
                      }
                  } catch(err) {
                      console.log(err)
                  }
                  _this.$store.dispatch('setBusyOff')
                  _this.get1892Details(_this.current1892Object.companyInvoiceId)
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
                    this.$axios.$get('/companyinvoice/get-all'),
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