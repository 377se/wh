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
                        <h1 class="sc-top-bar-title uk-display-inline">Taylor Football Souvenirs</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody>

                <!-- TAB-HEADLINES - TAYLOR -->
                <ul data-uk-tab>
                    <li class="uk-active">
                        <a href="javascript:void(0)">
                            SENASTE IMPORT
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            ARTIKELHISTORIK
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            ORDERHISTORIK
                        </a>
                    </li>
                </ul>
                <!-- TAB-CONTENT - TAYLOR -->
                <ul class="uk-switcher">
                    <!-- SENASTE IMPORT -->
                    <li>
                        <div class="uk-grid uk-grid-medium" uk-grid uk-margin :key="render">

                            <!-- LIST LATEST IMPORT -->
                            <div class="uk-width-1-1 uk-width-2-3@m">
                                <ScCard v-if="latestImport" class="uk-card-small">
                                    <ScCardHeader separator>
                                        <div class="uk-flex uk-flex-between uk-flex-bottom">
                                            <div>
                                                <ScCardTitle>Senaste import</ScCardTitle>
                                                <div class="uk-text-small">Admin: {{ latestImport.Admin }}</div>
                                                <div class="uk-text-small">Datum: {{ latestImport.CreatedDate }}</div>
                                                <div class="uk-text-small">Filnamn: {{ latestImport.FileName }}</div>
                                                <div class="uk-text-small">Antal: {{ latestImport.NumberOfItems }}</div>
                                            </div>
                                            <button :disabled="disabledOrderFileButton" v-waves.button.light class="sc-button sc-button-primary uk-flex-right" @click.prevent="uploadOrderDetails()">
                                                SKAPA ORDERFIL
                                            </button>
                                        </div>
                                    </ScCardHeader>
                                    <ScCardBody>
                                        <div class="uk-overflow-auto" style="max-height:800px;">
                                            <table v-if="latestImport" class="uk-table uk-table-small uk-table-striped uk-text-small uk-margin-remove" style="border-collapse: separate; table-layout: fixed;">
                                                <thead style="z-index: 10000">
                                                    <tr class="uk-padding-remove-bottom">
                                                        <th class="sticky-headers border-top border-bottom border-left uk-preserve-width" style="font-size: 11px; text-align: center; width: 50px;"></th>
                                                        <th class="sticky-headers border-top border-bottom border-left" style="font-size: 11px; text-align: left; width: 120px;">Produkt</th>
                                                        <th class="sticky-headers border-top border-bottom border-left" style="font-size: 11px; text-align: left; width: 110px;">Lag</th>
                                                        <th class="sticky-headers border-top border-bottom border-left" style="font-size: 11px; text-align: left; width: 100px;">Artikelnummer</th>
                                                        <th class="sticky-headers border-top border-bottom border-left" style="font-size: 11px; text-align: left; width: 80px;">Lagersaldo lev</th>
                                                        <th class="sticky-headers border-top border-bottom border-left" style="font-size: 11px; text-align: left; width: 60px;">Lagersaldo</th>
                                                        <th class="sticky-headers border-top border-bottom border-left" style="font-size: 11px; text-align: left; width: 50px;">Inköp</th>
                                                    </tr>
                                                    <tr>
                                                        <th class="sticky-headers-row2 border-bottom border-left"></th>
                                                        <th class="sticky-headers-row2 border-bottom border-left"></th>
                                                        <th class="sticky-headers-row2 border-bottom border-left" style="font-size: 11px; text-align: left;">
                                                            <ScInput v-model="teamName" state="fixed" mode="outline" placeholder="Filtrera på lag..." xtra-classes="uk-form-small">
                                                            </ScInput>
                                                        </th>
                                                        <th class="sticky-headers-row2 border-bottom border-left"></th>
                                                        <th class="sticky-headers-row2 border-bottom border-left"></th>
                                                        <th class="sticky-headers-row2 border-bottom border-left"></th>
                                                        <th class="sticky-headers-row2 border-bottom border-left"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="product in latestImport.ItemList.filter(item => { return teamName == '' ? true : item.TeamName != null ? item.TeamName.toLowerCase().includes(teamName.toLowerCase()) : false })" :key="product.ArticleId" class="uk-table-middle">
                                                        <td class="border-bottom border-left" style="text-align: center; "><img :src="product.ImageName"></td>
                                                        <td class="border-bottom border-left" style="text-align: left; ">{{ product.ProductName }}</td>
                                                        <td class="border-bottom border-left" style="text-align: left; ">{{ product.TeamName }}</td>
                                                        <td class="border-bottom border-left" style="text-align: left; ">{{ product.ProductCode }}</td>
                                                        <td class="border-bottom border-left" style="text-align: left; ">{{ product.CurrentStock }}</td>
                                                        <td class="border-bottom border-left" style="text-align: left; ">{{ product.ItemsInStock }}</td>
                                                        <td class="border-bottom border-left" style="text-align: left; ">
                                                            <ScInput v-model="product.Quantity" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                            </ScInput>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </ScCardBody>
                                </ScCard>
                            </div>

                            <!-- EDITOR -->
                            <div class="uk-width-1-1 uk-width-1-3@m uk-flex-first uk-flex-last@m" uk-margin>
                                <ScCard>
                                    <ScCardBody>
                                        <div class="uk-width-1-1 uk-text-center">
                                            <Alert
                                                :errorlist="errors"
                                                :alertClass="'uk-alert-danger'"
                                                id=1
                                            />
                                            <!-- UPPLADDNING ARTIKELLISTA -->
                                            <div class="uk-padding-small uk-padding-remove-horizontal">
                                                <FileUploader
                                                    postUrl="/webapi/Taylor/UploadArticleList"
                                                    actionButtonTitle="IMPORTERA ARTIKELLISTA"
                                                    :showRemoveFileButton="false"
                                                    fileChooserButtonTitle="VÄLJ FIL"
                                                    @postUpload="afterUploadProcessing"
                                                />
                                            </div>
                                            <!-- UPPLADDNING ORDERFIL -->
                                            <div class="uk-padding-small uk-padding-remove-horizontal">
                                                <FileUploader
                                                    postUrl="/webapi/Taylor/UploadOrderDetails"
                                                    actionButtonTitle="IMPORTERA ORDERFIL"
                                                    :showRemoveFileButton="false"
                                                    fileChooserButtonTitle="VÄLJ FIL"
                                                    @postUpload="afterUploadProcessing"
                                                />
                                            </div>
                                            <div class="uk-text-small uk-text-left uk-margin-large-top">
                                                <div><strong>Importera artikellista</strong></div>
                                                <div class="uk-margin-medium-bottom">Denna fil hämtas från Taylor och den innehåller alla produkter som finns inne för beställning i dagsläget (från deras lager) och dessa matchas mot vårt eget lagersaldo för motsvarande artikelnummer.</div>
                                                <div><strong>Importera order-fil</strong></div>
                                                <div>Denna csv-fil exporterar du från Taylor och trycker in i vårt system. Antingen uppdateras redan befintlig produkt eller så skapas en ny.</div>
                                            </div>


                                        </div>
                                    </ScCardBody>
                                </ScCard>
                            </div>
                        </div>
                    </li>
                    <!-- ARTIKELHISTORIK -->
                    <li id="articlehistory">
                        <div class="uk-grid uk-grid-medium" uk-grid uk-margin :key="render">

                            <!-- LISTA ARTIKELHISTORIK -->
                            <div class="uk-width-1-1 uk-width-2-3@m">
                                <ScCard v-if="articleHistory" class="uk-card-small">
                                    <ScCardHeader separator>
                                        <ScCardTitle>
                                            Artikelhistorik
                                        </ScCardTitle>
                                    </ScCardHeader>
                                    <ScCardBody>
                                        <div class="uk-overflow-auto" style="max-height:800px;">
                                            <table class="uk-table uk-table-small uk-table-striped uk-text-small uk-margin-remove" style="border-collapse: separate;">
                                                <thead style="z-index: 10000">
                                                    <tr class="uk-padding-remove-bottom">
                                                        <th class="sticky-headers border-top border-bottom border-left" style="font-size: 11px; text-align: left; width: 200px;">Datum</th>
                                                        <th class="sticky-headers border-top border-bottom border-left" style="font-size: 11px; text-align: left; width: 130px;">Filnamn</th>
                                                        <th class="sticky-headers border-top border-bottom border-left" style="font-size: 11px; text-align: left; width: 130px;">Antal</th>
                                                        <th class="sticky-headers border-top border-bottom border-left" style="font-size: 11px; text-align: left; width: 130px;">Admin</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="file in articleHistory" :key="file.TaylorId" class="uk-table-middle">
                                                        <td class="border-bottom border-left" style="text-align: left; ">{{ file.CreatedDate }}</td>
                                                        <td class="border-bottom border-left" style="text-align: left; ">{{ file.FileName }}</td>
                                                        <td class="border-bottom border-left" style="text-align: left; ">{{ file.NumberOfItems }}</td>
                                                        <td class="border-bottom border-left" style="text-align: left; ">{{ file.Admin }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </ScCardBody>
                                </ScCard>
                            </div>

                            <ScCard>
                                <ScCardBody>
                                    <div class="uk-width-1-1 uk-text-center">
                                        <Alert
                                            :errorlist="errors"
                                            :alertClass="'uk-alert-danger'"
                                            id=1
                                        />
                                        <!-- UPPLADDNING ARTIKELLISTA -->
                                        <div class="uk-padding-small uk-padding-remove-horizontal">
                                            <FileUploader
                                                postUrl="/webapi/Taylor/UploadArticleList"
                                                actionButtonTitle="IMPORTERA ARTIKELLISTA"
                                                :showRemoveFileButton="false"
                                                fileChooserButtonTitle="VÄLJ FIL"
                                                @postUpload="afterUploadProcessing"
                                            />
                                        </div>
                                        <!-- UPPLADDNING ORDERFIL -->
                                        <div class="uk-padding-small uk-padding-remove-horizontal">
                                            <FileUploader
                                                postUrl="/webapi/Taylor/UploadOrderDetails"
                                                actionButtonTitle="IMPORTERA ORDERFIL"
                                                :showRemoveFileButton="false"
                                                fileChooserButtonTitle="VÄLJ FIL"
                                                @postUpload="afterUploadProcessing"
                                            />
                                        </div>
                                        <div class="uk-text-small uk-text-left uk-margin-large-top">
                                            <div><strong>Importera artikellista</strong></div>
                                            <div class="uk-margin-medium-bottom">Denna fil hämtas från Taylor och den innehåller alla produkter som finns inne för beställning i dagsläget (från deras lager) och dessa matchas mot vårt eget lagersaldo för motsvarande artikelnummer.</div>
                                            <div><strong>Importera order-fil</strong></div>
                                            <div>Denna csv-fil exporterar du från Taylor och trycker in i vårt system. Antingen uppdateras redan befintlig produkt eller så skapas en ny.</div>
                                        </div>


                                    </div>
                                </ScCardBody>
                            </ScCard>

                        </div>
                    </li>
                    <!-- ORDERHISTORIK -->
                    <li id="orderhistory">

                    </li>
                </ul>
                    </ScCardBody>
                </ScCard>



            </div>
        </div>




        <!-- CSV-SAVE MODAL -->
        <div id="csv-modal" class="uk-modal-full uk-modal uk-overflow-hidden" data-uk-modal>

            <div class="uk-modal-header basket-ribbon uk-animation-slide-right">
                <!-- sticky -->
                <h4 class="uk-modal-title" style="color:#fff; line-height:1; margin:3px 0 0 12px; padding:10px;">Skapa orderunderlag</h4>
                <button
                    class="uk-offcanvas-close uk-icon uk-close"
                    style="color:#fff;top:14px;right:12px;"
                    type="button"
                    uk-close
                    uk-toggle="target: #csv-modal"/>
            </div>
            <div class="uk-modal-dialog uk-modal-body uk-overflow-auto uk-animation-slide-right" style="padding:0px; background:#ffffff; height:100%;">
                <div class="uk-width-1-1 uk-overflow-auto">
                    <div class="uk-flex uk-flex-around uk-flex-middle uk-padding-small">
                        <Alert
                            :errorlist="errors"
                            :alertClass="'uk-alert-danger'"
                            id=2
                        />
                        <button v-waves.button.light class="sc-button sc-button-primary" uk-toggle="target: #csv-modal">
                            AVBRYT
                        </button>
                        <a id="savecsv" v-waves.button.light class="sc-button sc-button-primary" @click="showCSVConfirm">
                            SPARA CSV
                        </a>
                    </div>
                    <table class="border-all uk-card uk-box-shadow-small uk-margin-remove-bottom uk-margin-remove-top uk-table uk-table-small uk-table-middle uk-text-small">
                        <thead>
                            <tr>
                                <td class="border-bottom border-right uk-text-left" style="width:200px;"><strong>Supplier</strong></td>
                                <td class="border-bottom border-right uk-text-left" style="width:160px;"><strong>Product Code</strong></td>
                                <td class="border-bottom border-right uk-text-left" style="width:180px;"><strong>Product Name</strong></td>
                                <td class="border-bottom border-right uk-text-left" style="width:30px;"><strong>Qty</strong></td>
                                <td class="border-bottom border-right uk-text-left" style="width:180px;"><strong>Current Stock</strong></td>
                                <td class="border-bottom border-right uk-text-left" style="width:180px;"><strong>EOR</strong></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in csvContent" :key="product.ArticleId" class="uk-table-middle">
                                <td class="border-bottom border-right uk-width-auto uk-text-left">{{ product.Supplier }}</td>
                                <td class="border-bottom border-right uk-width-auto uk-text-left">{{ product.ProductCode }}</td>
                                <td class="border-bottom border-right uk-width-auto uk-text-left">{{ product.ProductName }}</td>
                                <td class="border-bottom border-right uk-width-auto uk-text-left">{{ product.Quantity }}</td>
                                <td class="border-bottom border-right uk-width-auto uk-text-left">{{ product.CurrentStock }}</td>
                                <td class="border-bottom border-right uk-width-auto uk-text-left">{{ product.EOR }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>



    </div>
</template>

<script>
    import Alert from '~/components/Alert'
    import ScInput from '~/components/Input'
    import FileUploader from '~/components/FileUploader'

    export default {
        components: {
            Alert,
    		ScInput,
    		FileUploader,
        },
        data() {
            return {
                errors: null,
                message: null,
                render: false,
                latestImport: null,
                teamName: '',
                csvContent: null,
                csvIsPopulated: false,
                articleHistory: [],
                orderHistory: [],
            }
        },
        mounted () {
            this.$nextTick(() => {
                let _this = this
                // GET ARTICLEHISTORY WHEN TAB IS CLICKED
                UIkit.util.on(document, 'beforeshow', function (event, area) {
                    event.target.id == 'articlehistory' ? _this.getArticleHistory() : ''
                })
                // GET ORDERHISTORY WHEN TAB IS CLICKED
                UIkit.util.on(document, 'beforeshow', function (event, area) {
                    event.target.id == 'orderhistory' ? _this.getOrderHistory() : ''
                })
            })
        },
        computed: {
            disabledOrderFileButton() {
                return this.latestImport.ItemList.filter(item => { return item.Quantity != 0 }).length == 0
            }
        },
        methods: {
            async getArticleHistory() {
                let _this = this
                _this.$store.dispatch('setBusyOn')
                try {
                    const articlehistory = await this.$axios.$get('/webapi/Taylor/GetImportHistory')
                    if (articlehistory.ErrorList != null ) {
                        _this.errors = articlehistory.ErrorList
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.articleHistory = articlehistory
                        _this.$store.dispatch('setBusyOff')
                    }
                } catch(err) {
                    console.log(err)
                }
            },
            async getOrderHistory() {
                let _this = this
                _this.$store.dispatch('setBusyOn')
                try {
                    const orderhistory = await this.$axios.$get('/webapi/Taylor/GetOrderHistory')
                    if (orderhistory.ErrorList != null ) {
                        _this.errors = orderhistory.ErrorList
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.orderHistory = orderhistory
                        _this.$store.dispatch('setBusyOff')
                    }
                } catch(err) {
                    console.log(err)
                }
            },
            async uploadOrderDetails() {
                let _this = this

                let orderedItems = _this.latestImport.ItemList.filter(item => { return item.Quantity != 0 })

                const csvContent = "data:text/csv;charset=utf-8," + [
                    [
                        "Supplier",
                        "Product Code",
                        "Product Name",
                        "Qty",
                        "Current Stock",
                        "EOR"
                    ],
                        ...orderedItems.map(item => [
                            item.Supplier,
                            item.ProductCode,
                            item.ProductName,
                            item.Quantity,
                            item.CurrentStock,
                            item.EOR,
                    ])
                ]
                .map(e => e.join(",")).join("\n")

                _this.csvContent = orderedItems
                _this.csvIsPopulated = true
                let encodedUri = encodeURI(csvContent)
                let link = document.getElementById('savecsv')
                link.setAttribute("href", encodedUri)
                link.setAttribute("download", "TaylorOrder-" + this.todaysDate() + ".csv")
                UIkit.modal('#csv-modal').show()
            },
            afterUploadProcessing(response) {
                let _this = this
                _this.$store.commit('setAlertHidden', 1)
                if (response.ErrorList != null) {
                    _this.errors = response.ErrorList
                    _this.$store.commit('setAlertVisible', 1)
                } else {
                    UIkit.modal.dialog('<p class="uk-modal-body">Filen är importerad!</p>')
                }
            },
            showCSVConfirm() {
                this.csvIsPopulated ? UIkit.modal.dialog('<p class="uk-modal-body">CSV-fil är sparad!</p>') : null
                this.csvIsPopulated = false
            },
            todaysDate() {
                let myDate = new Date()
                let myDateString
                myDateString = myDate.getFullYear() + '-' + ('0' + (myDate.getMonth()+1)).slice(-2) + '-' + ('0' + myDate.getDate()).slice(-2)
                return myDateString
            },
        },
        async fetch () {
            this.$store.commit('setAlertHidden', 1)
            this.$store.commit('setAlertHidden', 2)
            this.$store.dispatch('setBusyOn')
            try {
                const [ latestimport ] = await Promise.all([
                    this.$axios.$get('/webapi/Taylor/GetLatestImport'),
                ])
                this.latestImport = latestimport
                this.$store.dispatch('setBusyOff')
            } catch (err) {
                console.log(err);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .sticky-headers {
        background: white;
        position: sticky;
        top: 0px;
        z-index: 10;
    }
    .sticky-headers-row2 {
        background: white;
        position: sticky;
        top: 34px;
        z-index: 10;
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
    .uk-modal-dialog, .uk-modal-header {
        margin-left: auto;
        width:55vw !important;
        max-width: 800px !important;
        @media only screen and (max-width: 600px) {
            width:85vw !important;
            max-width: 800px !important;
        }
	}
    .uk-modal-header {
		min-height: 50px;
		height: auto;
		padding: 0px;
	}
	.basket-ribbon{
		background: #00838F;
	}
</style>