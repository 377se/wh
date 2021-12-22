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
                        <img :src="this.orderInfo.ImageName" alt="Produktbild" class="uk-margin-medium-right">
                        <h1 class="sc-top-bar-title uk-display-inline">Order # {{ this.orderInfo.OrderId }}</h1>
                    </div>
                </div>
            </div>
            <div id="sc-page-content">
                <ScCard>
                    <ScCardBody>
                        <!-- TAB-HEADLINES -->
                        <ul data-uk-tab>
                            <li class="uk-active">
                                <a href="javascript:void(0)">
                                    ORDERINFORMATION
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    ORDERHÄNDELSER
                                </a>
                            </li>
                        </ul>
                        <!-- TAB-CONTENT -->
                        <ul class="uk-switcher tabevents">
                            <li id="orderinfo" class="uk-active">
                                <!-- ORDERINFORMATION -->
                                <ScCard>
                                    <ScCardHeader separator>
                                        <!-- AKTIVERINGSFEL -->
                                        <div v-if="activationError.OrderId != 0" class="uk-alert-danger uk-padding-small uk-border-rounded uk-margin-medium-bottom">
                                            <h2 style="color:#fff; margin-bottom:0px;">{{ activationError.Title }}</h2>
                                            <div>{{ activationError.Description }}</div>
                                            <button class="sc-button sc-button-default uk-margin-small-top" type="button" @click="setOrderAsProcessed">
                                                JAG HAR HANTERAT ORDERN
                                            </button>
                                        </div>
                                        <div class="uk-flex uk-flex-middle uk-flex-wrap">
                                            <div class="uk-flex-1">
                                                <ScCardTitle>
                                                    Orderinformation
                                                </ScCardTitle>
                                            </div>
                                            <div class="uk-padding-small uk-padding-remove-horizontal">
                                                <div class="uk-flex uk-flex-left uk-flex-wrap uk-width-1-1">
                                                    <button v-waves.button.light class="sc-button sc-button-primary sc-button-mini uk-margin-medium-right uk-margin-small-top uk-margin-remove-top@s" @click.prevent="getPrintout">
                                                        SKRIV UT
                                                    </button>
                                                    <button v-if="orderInfo.StatusId == 2" v-waves.button.light class="sc-button sc-button-primary sc-button-mini uk-margin-medium-right uk-margin-small-top uk-margin-remove-top@s" @click.prevent="setOrderAsDeliveredByOrderId()">
                                                        SÄTT SOM LEVERERAD
                                                    </button>
                                                    <button v-waves.button.light class="sc-button sc-button-primary sc-button-mini uk-margin-small-top uk-margin-remove-top@s" @click.prevent="getEmptyEmailObject()">
                                                        MAILA KUND
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </ScCardHeader>
                                    <ScCardBody :key="render" class="uk-padding-remove">
                                        <div class="uk-flex uk-overflow-auto">
                                            <table :class="{'uk-width-1-1 uk-width-2-3@m': adressEditorVisible }" class="uk-card uk-box-shadow-small uk-table uk-table-small uk-text-small uk-margin-remove-bottom">
                                                <tbody>
                                                    <tr>
                                                        <td class="border-bottom border-right uk-width-1-5"><strong>Kund</strong></td>
                                                        <td class="border-bottom uk-width-4-5">
                                                            <div class="uk-flex uk-flex-between">
                                                                <div>
                                                                    <div>{{ orderInfo.Address.FirstName }} {{ orderInfo.Address.LastName}}</div>
                                                                    <div>{{ orderInfo.Address.Address1 }}</div>
                                                                    <div>{{ orderInfo.Address.PostalCode }} {{ orderInfo.Address.City}}</div>
                                                                    <div>{{ orderInfo.Address.Country }}</div>
                                                                    <div>{{ orderInfo.Address.Email }}</div>
                                                                    <div>{{ orderInfo.Address.Mobile }}</div>
                                                                </div>
                                                                <div class="editicon" @click="getAdressToEdit(orderInfo.Address.AddressId)"> <!-- EDITERA ADDRESS -->
                                                                    <i class="mdi mdi-file-edit md-color-green-600"></i>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border-bottom border-right uk-width-1-5"><strong>Orderdatum</strong></td>
                                                        <td class="border-bottom uk-width-4-5">{{ orderInfo.OrderDate }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border-bottom border-right uk-width-1-5"><strong>Betalningsmetod</strong></td>
                                                        <td class="border-bottom uk-width-4-5">{{ orderInfo.PaymentMethod }}, {{ orderInfo.Currency }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border-bottom border-right uk-width-1-5"><strong>Voucherkod</strong></td>
                                                        <td class="border-bottom uk-width-4-5">
                                                            <button v-if="orderInfo.VoucherId == 0" class="sc-button sc-button-small sc-button-icon sc-button-primary uk-margin-small-left" type="button" @click.prevent="showVoucherModal">
                                                                Aktivera voucher
                                                            </button>
                                                            <div v-if="orderInfo.VoucherId > 0" class="uk-badge md-bg-blue-600">{{ orderInfo.Voucher }}</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border-bottom border-right uk-width-1-5"><strong>Merchant-id</strong></td>
                                                        <td class="border-bottom uk-width-4-5">
                                                            <ScInput v-model="orderInfo.AccountId" state="fixed" mode="outline" extra-classes="uk-form-small" :disabled="accountIdHasData"></ScInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border-bottom border-right uk-width-1-5"><strong>Klarna-Id</strong></td>
                                                        <td class="border-bottom uk-width-4-5">
                                                            <ScInput v-model="orderInfo.KlarnaPurchaseId" state="fixed" mode="outline" extra-classes="uk-form-small" :disabled="klarnaPurchaseIdHasData"></ScInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border-bottom border-right uk-width-1-5"><strong>Trackingnummer</strong></td>
                                                        <td class="border-bottom uk-width-4-5">
                                                            <div class="uk-height-1-1 uk-flex uk-flex-middle"><a :href="orderInfo.TrackingNumber" target="_new">Visa tracking <i class="mdi mdi-open-in-new sc-icon-18"></i></a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border-bottom border-right uk-width-1-5"><strong>Leveransdatum</strong></td>
                                                        <td class="border-bottom uk-width-4-5">{{ orderInfo.ShippingDate }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border-bottom border-right uk-width-1-5"><strong>Följesedel</strong></td>
                                                        <td class="border-bottom uk-width-4-5">{{ orderInfo.HasBeenPrinted ? 'Utskriven' : 'Ej utskriven' }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border-bottom border-right uk-width-1-5"><strong>Status</strong></td>
                                                        <td class="border-bottom uk-width-4-5">
                                                            <div class="uk-width-1-1">
                                                                <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                                <client-only>
                                                                    <Select2
                                                                        id="select-statusList"
                                                                        v-model="orderInfo.StatusId"
                                                                        :options="orderInfo.StatusList.map(({ Id, Name }) => ({ id: Id, text: Name }))"
                                                                        :settings="{ 'width': '100%', 'closeOnSelect': true }"
                                                                        :disabled="orderInfo.StatusId == -1"
                                                                    >
                                                                    </Select2>
                                                                </client-only>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border-right border-bottom uk-width-1-5"><strong>Kommentar</strong></td>
                                                        <td class="uk-width-4-5 border-bottom">
                                                            <textarea v-model="orderInfo.Comment" rows="7" cols="80" class="uk-width-1-1 uk-text-small"></textarea>
                                                        </td>
                                                    </tr>
                                                    <tr v-if="orderInfo.ParentOrderUrl">
                                                        <td class="border-bottom border-right uk-width-1-5"><strong>Ursprungsorder</strong></td>
                                                        <td class="border-bottom uk-width-4-5"><nuxt-link :to="orderInfo.ParentOrderUrl ? orderInfo.ParentOrderUrl : '/'">{{ orderInfo.ParentOrderId }}</nuxt-link></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td class="uk-align-right">
                                                            <button v-waves.button.light class="sc-button sc-button-primary uk-margin-medium-right uk-margin-small-top uk-margin-remove-top@s" @click="updateOrder()">
                                                                SPARA
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- EDIT ADRESS -->
                                            <div v-if="adressEditorVisible" :class="{'uk-width-1-3': adressEditorVisible }" class="uk-card uk-padding-small uk-margin-medium-left md-bg-grey-200">
                                                <div class="uk-flex uk-flex-between">
                                                    <h3 class="uk-card-title uk-padding-remove-vertical uk-padding-remove-horizontal">Editera address</h3>
                                                    <span class="closeicon" @click="adressEditorVisible = false"><i class="mdi mdi-close-circle md-color-grey-600"></i></span>
                                                </div>
                                                <!-- För- och efternamn -->
                                                <div class="uk-margin">
                                                    <div class="uk-flex uk-flex-between">
                                                        <ScInput v-model="adressItem.FirstName" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                            <label>Förnamn</label>
                                                        </ScInput>
                                                        <ScInput v-model="adressItem.LastName" state="fixed" mode="outline" extra-classes="uk-form-small uk-margin-small-left">
                                                            <label>Efternamn</label>
                                                        </ScInput>
                                                    </div>
                                                </div>
                                                <!-- Gatuaddress -->
                                                <div class="uk-margin">
                                                    <ScInput v-model="adressItem.Address1" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                        <label>Gatuaddress</label>
                                                    </ScInput>
                                                </div>
                                            <!-- Postadress -->
                                                <div class="uk-margin">
                                                    <div class="uk-flex uk-flex-between">
                                                        <ScInput v-model="adressItem.PostalCode" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                            <label>Postnummer</label>
                                                        </ScInput>
                                                        <ScInput v-model="adressItem.City" state="fixed" mode="outline" extra-classes="uk-form-small uk-margin-small-left">
                                                            <label>Stad</label>
                                                        </ScInput>
                                                    </div>
                                                </div>
                                                <!-- Land -->
                                                <div class="uk-margin-medium-bottom uk-width-1-1">
                                                    <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                    <label class="select-label" for="select-countryList">Land</label>
                                                    <client-only>
                                                        <Select2
                                                            id="select-countryList"
                                                            v-model="adressItem.CountryId"
                                                            :options="countries.map(({ CountryId, Name }) => ({ id: CountryId, text: Name }))"
                                                            :settings="{ 'width': '100%', 'closeOnSelect': true,  'allowClear': true }"
                                                        >
                                                        </Select2>
                                                    </client-only>
                                                    </div>
                                                </div>
                                                <!-- Email -->
                                                <div class="uk-margin">
                                                    <ScInput v-model="adressItem.Email" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                        <label>Email</label>
                                                    </ScInput>
                                                </div>
                                                <!-- Mobile -->
                                                <div class="uk-margin">
                                                    <ScInput v-model="adressItem.Mobile" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                        <label>Mobil</label>
                                                    </ScInput>
                                                </div>
                                                <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateAdress()">
                                                    UPPDATERA
                                                </button>
                                            </div>
                                        </div>
                                    </ScCardBody>
                                </ScCard>
                            </li>
                            <li id="orderevents">
                                <!-- ORDERHÄNDELSER -->
                                <ScCard>
                                    <ScCardHeader separator>
                                        <ScCardTitle>
                                            Orderhändelser
                                        </ScCardTitle>
                                    </ScCardHeader>
                                    <ScCardBody>
                                        <div class="uk-overflow-auto">
                                            <table class="uk-table uk-table-small uk-text-small uk-margin-remove paymentproviderlist">
                                                <thead>
                                                    <tr class="uk-padding-remove-bottom">
                                                        <th class="border-top border-bottom border-left uk-text-small" style="text-align: left; width: 20%;">Tid</th>
                                                        <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 20%;">Händelse</th>
                                                        <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 20%;">Värde</th>
                                                        <th class="border-top border-bottom border-left border-right uk-text-small" style="text-align: left; width: 20%;">Admin</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="orderevent in orderLog" :key="orderevent.Id" class="uk-table-middle">
                                                        <td class="border-bottom border-left uk-overflow-hidden" style="text-align: left; ">{{ orderevent.CreatedDate }}</td>
                                                        <td class="border-bottom border-left border-right" style="text-align: left; ">{{ orderevent.Description }}</td>
                                                        <td class="border-bottom border-left border-right" style="text-align: left; ">{{ orderevent.Value }}</td>
                                                        <td class="border-bottom border-left border-right" style="text-align: left; ">{{ orderevent.Admin }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </ScCardBody>
                                </ScCard>
                            </li>
                        </ul>
                    </ScCardBody>
                </ScCard>
                <!-- ORDERINNEHÅLL -->
                <ScCard class="uk-margin-medium-top" :key="render">
                    <ScCardHeader separator>
                        <div class="uk-flex uk-flex-middle">
                            <div class="uk-width-1-3">
                                <ScCardTitle>
                                     {{ 'Orderinnehåll - ' + orderProcessTypeList.find(type => type.Id == paymentTypeId).Name }}
                                </ScCardTitle>
                            </div>
                            <div class="uk-width-1-3 uk-text-center">
                                <button v-if="paymentTypeId == 8" v-waves.button.light class="sc-button sc-button-primary" @click.prevent="processOrder()">
                                    SKAPA BYTE
                                </button>
                                <button v-else-if="paymentTypeId == 7" v-waves.button.light class="sc-button sc-button-primary" @click.prevent="processOrder()">
                                    SKAPA RETUR
                                </button>
                                <button v-else-if="paymentTypeId == 9" v-waves.button.light class="sc-button sc-button-primary" @click.prevent="processOrder()">
                                    SKAPA RESTNOTERING
                                </button>
                            </div>
                            <div class="uk-width-1-3 uk-margin-small-top">
                                <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                    <label class="select-label" for="select-orderProcessTypeList">Välj redigeringsläge</label>
                                    <client-only>
                                        <Select2
                                            id="select-orderProcessTypeList"
                                            v-model="paymentTypeId"
                                            :options="orderProcessTypeList.map(({ Id, Name }) => ({ id: Id, text: Name }))"
                                            :settings="{ 'width': '100%', 'closeOnSelect': true }"
                                        >
                                        </Select2>
                                    </client-only>
                                </div>
                             </div>
                        </div>
                    </ScCardHeader>
                    <ScCardBody>
                         <div class="uk-flex">
                             <!-- ORDERINNEHÅLL -->
                            <div class="uk-width-1-1 uk-overflow-auto" :class="{'uk-width-2-3': updateEditorVisible || addEditorVisible }">
                                <table class="uk-margin-remove-bottom uk-table uk-table-small uk-text-small" :key="render">
                                    <thead>
                                        <tr>
                                            <td v-if="paymentTypeId != 0" class="border-top border-bottom border-left"></td>
                                            <td class="border-bottom border-left border-top"></td>
                                            <td class="border-bottom border-left border-top"></td>
                                            <td class="border-bottom border-right border-left border-top"></td>
                                            <td class="border-bottom border-right border-top"><strong>Produkt</strong></td>
                                            <td class="border-bottom border-right border-top"><strong>Artikelnummer</strong></td>
                                            <td class="border-bottom border-right border-top uk-text-center"><strong>Storlek</strong></td>
                                            <td class="border-bottom border-right border-top uk-text-center"><strong>Antal</strong></td>
                                            <td class="border-bottom uk-text-right border-top border-right"><strong>Pris</strong></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="orderItemInList in orderContent.OrderItemList" :key="orderItemInList.ItemId" class="uk-table-middle">
                                            <td v-if="paymentTypeId != 0" class="border-bottom border-left border-right uk-text-center">
                                                <PrettyCheck v-model="orderItemInList.IsSelected" class="p-icon uk-align-center">
                                                    <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small"></span>
                                                </PrettyCheck>
                                            </td>
                                            <td class="border-bottom border-right border-left uk-text-center">
                                                <div class="editicon" @click="getItemToEdit(orderItemInList.ItemId)"> <!-- EDITERA PRODUKT -->
                                                    <i class="mdi mdi-file-edit md-color-green-600"></i>
                                                                            </div>
                                            </td>
                                            <td class="border-bottom border-right uk-text-center">
                                                <div class="wastebasket" @click="deleteItem(orderItemInList.ItemId)"> <!-- TA BORT PRODUKT -->
                                                                                <i class="mdi mdi-delete-forever md-color-red-600 sc-icon-28"></i>
                                                                            </div>
                                            </td>
                                            <td class="border-bottom border-right image-column-width"><img :src="orderItemInList.ImageName"></td>
                                            <td class="border-bottom border-right uk-width-auto">
                                                <nuxt-link :to="orderItemInList.Url">
                                                    <div>{{ orderItemInList.TeamName }}</div>
                                                    <div>{{ orderItemInList.ProductName }}</div>
                                                    <div>{{ orderItemInList.AddonValue }}</div>
                                                </nuxt-link>
                                            </td>
                                            <td class="border-bottom border-right uk-width-auto">{{ orderItemInList.ArticleNumber }}</td>
                                            <td class="border-bottom border-right uk-width-auto uk-text-center">
                                                <div v-if="paymentTypeId == 8">
                                                    <client-only>
                                                        <Select2
                                                            :id="'select-sizeList-' + orderItemInList.ArticleNumber"
                                                            v-model="orderItemInList.SizeId"
                                                            :options="orderItemInList.StockList.map(({ StockId, SizeDisplay }) => ({ id: StockId, text: SizeDisplay }))"
                                                            :settings="{ 'width': '100%', 'closeOnSelect': true }"
                                                        >
                                                        </Select2>
                                                    </client-only>
                                                </div>
                                                <div v-else>
                                                    {{ orderItemInList.SizeDisplay }}
                                                </div>
                                            </td>
                                            <td class="border-bottom border-right uk-width-auto uk-text-center">{{ orderItemInList.Quantity }}</td>
                                            <td class="border-bottom border-right uk-width-auto uk-text-right">{{ orderInfo.Currency == 'EUR' ? orderItemInList.PriceToPay.toFixed(2) : orderItemInList.PriceToPay | thousandsDelimiter }} {{ orderInfo.Currency }}</td>
                                        </tr>
                                        <tr class="uk-table-middle">
                                            <td v-if="paymentTypeId != 0"></td>
                                            <td class="border-bottom border-right border-left uk-text-center" :class="{'border-left': paymentTypeId != 0 }">
                                                <div @click="startAddItem()"><i class="addicon mdi mdi-plus-circle-outline md-color-green-600"></i></div> <!-- LÄGG TILL PRODUKT -->
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td class="border-right"></td>
                                            <td class="border-bottom border-right uk-width-auto uk-text-right" colspan="2">Ordersumma</td>
                                            <td class="border-bottom border-right uk-width-auto uk-text-right">{{ orderInfo.Currency == 'EUR' ? orderContent.OrderSummary.OrderSum.toFixed(2) : orderContent.OrderSummary.OrderSum | thousandsDelimiter }} {{ orderInfo.Currency }}</td>
                                        </tr>
                                        <tr class="uk-table-middle">
                                            <td v-if="paymentTypeId != 0"></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td class="border-right"></td>
                                            <td class="border-bottom border-right uk-width-auto uk-text-right" colspan="2">
                                                <div>Frakt & hantering</div>
                                            </td>
                                            <td class="border-bottom border-right uk-text-right">
                                                <div class="uk-flex uk-flex-middle">
                                                    <ScInput v-model="orderContent.OrderSummary.ShippingAndHandling" @focus="isShippingFocused = true" state="fixed" mode="outline" extra-classes="uk-form-small uk-text-right">
                                                    <!-- <ScInput v-model="orderContent.OrderSummary.ShippingAndHandling" state="fixed" mode="outline" extra-classes="uk-form-small uk-text-right"> -->
                                                    </ScInput>
                                                    <div>&nbsp;{{ orderInfo.Currency }}</div>
                                                </div>
                                                <div v-show="isShippingFocused" class="uk-text-right uk-margin-small-top">
                                                    <div>
                                                        (Beloppet skall alltid anges i SEK)
                                                    </div>
                                                    <button @click="updateOrderContent" v-waves.button.light class="sc-button sc-button-primary sc-button-mini uk-margin-small-top">UPPDATERA</button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="uk-table-middle">
                                            <td v-if="paymentTypeId != 0"></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td class="border-right"></td>
                                            <td class="border-bottom border-right uk-width-auto uk-text-right" colspan="2"><strong>Totalt</strong></td>
                                            <td class="border-bottom border-right uk-width-auto uk-text-right"><strong>{{ orderInfo.Currency == 'EUR' ? orderContent.OrderSummary.Total.toFixed(2) : orderContent.OrderSummary.Total | thousandsDelimiter }} {{ orderInfo.Currency }}</strong></td>
                                        </tr>
                                        <tr class="uk-table-middle">
                                            <td v-if="paymentTypeId != 0"></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td class="border-right"></td>
                                            <td class="border-bottom border-right uk-width-auto uk-text-right" colspan="2">Varav moms</td>
                                            <td class="border-bottom border-right uk-width-auto uk-text-right">{{ orderInfo.Currency == 'EUR' ? orderContent.OrderSummary.Vat.toFixed(2) : orderContent.OrderSummary.Vat | thousandsDelimiter }} {{ orderInfo.Currency }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="uk-grid-small uk-padding-small uk-padding-remove-horizontal" uk-grid>
                                    <div class="uk-flex uk-flex-right uk-width-1-1">
                                        <button v-if="paymentTypeId == 0" v-waves.button.light class="sc-button sc-button-primary sc-button-mini uk-margin-medium-right" @click.prevent="sendOrderConfirmation()">
                                            SKICKA ORDERBEKRÄFTELSE
                                        </button>
                                        <!-- <button v-if="paymentTypeId == 0" v-waves.button.light class="sc-button sc-button-primary sc-button-mini uk-margin-medium-right" @click.prevent="$router.push('/deliverynote/' + orderInfo.OrderId)">
                                            VISA FÖLJESEDEL
                                        </button> -->
                                        <button v-if="paymentTypeId == 0" v-waves.button.light class="sc-button sc-button-primary sc-button-mini" @click.prevent="deductMemberDiscount()">
                                            TILLDELA MEDLEMSRABATT
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- EDIT ORDERITEM -->
                            <transition name="slide">
                                <div v-if="updateEditorVisible" :class="{'uk-width-1-3': updateEditorVisible }" class="uk-card uk-padding-small uk-margin-medium-left md-bg-grey-200">
                                    <div class="uk-flex uk-flex-between">
                                        <h3 class="uk-card-title uk-padding-remove-vertical uk-padding-remove-horizontal">Editera produkt</h3>
                                        <span class="closeicon" @click="updateEditorVisible = false"><i class="mdi mdi-close-circle md-color-grey-600"></i></span>
                                    </div>
                                    <div v-if="orderItem.ErrorList != null" class="uk-badge">Produkten är slutsåld!</div>
                                    <!-- Pris -->
                                    <div class="uk-margin">
                                        <ScInput v-model="orderItem.Price" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            <label>Pris</label>
                                        </ScInput>
                                    </div>
                                    <!-- Storlek -->
                                    <div v-if="orderItem.StockList.length !== 1" class="uk-margin-medium-bottom uk-width-1-1">
                                        <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                        <label class="select-label" for="select-sizeOptionsList">Storlek</label>
                                        <client-only>
                                            <Select2
                                                id="select-sizeOptionsList"
                                                v-model="orderItem.StockId"
                                                :options="orderItem.StockList.map(({ StockId, SizeDisplay }) => ({ id: StockId, text: SizeDisplay }))"
                                                :settings="{ 'width': '100%', 'closeOnSelect': true }"
                                                :disabled="orderItem.ErrorList != null"
                                            >
                                            </Select2>
                                        </client-only>
                                        </div>
                                    </div>
                                    <!-- Tryck -->
                                    <div v-if="orderItem.HasPrint == true" class="uk-flex">
                                        <div class="uk-width-1-2 uk-margin-small-right">
                                            <!-- Tryck - Namn -->
                                            <div class="uk-margin-medium-bottom">
                                                <ScInput v-model="orderItem.PrintOptionList[0].Value" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                    <label>Tryck - Namn</label>
                                                </ScInput>
                                            </div>
                                            <!-- Tryck - Nummer -->
                                            <div class="uk-margin-medium-bottom">
                                                <ScInput v-model="orderItem.PrintOptionList[1].Value" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                    <label>Tryck - Nummer</label>
                                                </ScInput>
                                            </div>
                                            <!-- Tryck - Patch -->
                                            <div class="uk-margin-medium-bottom">
                                                <PrettyCheck v-model="orderItem.PrintOptionList[2].IsChecked" class="p-icon">
                                                    <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Tryck - Patch</span>
                                                </PrettyCheck>
                                            </div>
                                        </div>
                                        <div class="uk-width-1-2">
                                            <!-- Pris -->
                                            <div class="uk-margin-medium-bottom">
                                                <ScInput v-model="orderItem.PrintOptionList[0].Price" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                    <label>Pris</label>
                                                </ScInput>
                                            </div>
                                            <!-- Pris -->
                                            <div class="uk-margin-medium-bottom">
                                                <ScInput v-model="orderItem.PrintOptionList[1].Price" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                    <label>Pris</label>
                                                </ScInput>
                                            </div>
                                            <!-- Pris -->
                                            <div class="uk-margin-medium-bottom">
                                                <ScInput v-model="orderItem.PrintOptionList[2].Price" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                    <label>Pris</label>
                                                </ScInput>
                                            </div>
                                        </div>
                                    </div>
                                    <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="updateItem()">
                                        UPPDATERA
                                    </button>
                                </div>
                            </transition>
                            <!-- ADD ORDERITEM -->
                            <transition name="slide">
                                <div v-if="addEditorVisible" :class="{'uk-width-1-3': addEditorVisible }" class="uk-card uk-padding-small uk-margin-medium-left md-bg-grey-200">
                                    <div class="uk-flex uk-flex-between">
                                        <h3 class="uk-card-title uk-padding-remove-vertical uk-padding-remove-horizontal">Lägg till produkt</h3>
                                        <span class="closeicon" @click="addEditorVisible = false"><i class="mdi mdi-close-circle md-color-grey-600"></i></span>
                                    </div>
                                    <!-- ArtikelNr -->
                                    <div class="uk-margin">
                                        <ScInput v-model="articleNumber" state="fixed" mode="outline" extra-classes="uk-form-small" v-on:blur="getArticleDetails(articleNumber)">
                                            <label>ArtikelNr</label>
                                        </ScInput>
                                    </div>
                                    <div v-if="articleDetails" class="uk-flex">
                                        <div class="uk-margin-small-right uk-width-1-4">
                                            <img :src="articleDetails.ProductImage">
                                        </div>
                                        <div :class="{ 'uk-width-3-4': !errors }">
                                            <!-- Produktnamn -->
                                            <div class="uk-margin-medium-bottom">
                                                <ScInput v-model="articleDetails.ProductName" state="fixed" mode="outline" extra-classes="uk-form-small" disabled>
                                                    <label>Produktnamn</label>
                                                </ScInput>
                                            </div>
                                            <!-- Storlek -->
                                            <div class="uk-margin-medium-bottom uk-width-1-1">
                                                <div class="sc-input-wrapper sc-input-wrapper-outline sc-input-filled">
                                                <label class="select-label" for="select-paymentOptionsList">Storlek</label>
                                                <client-only>
                                                    <Select2
                                                        id="select-sizeOptionsList"
                                                        v-model="articleDetails.StockId"
                                                        :options="sizeOptionsList"
                                                        :settings="{ 'width': '100%', 'placeholder': 'Välj storlek', 'closeOnSelect': true }"
                                                    >
                                                    </Select2>
                                                </client-only>
                                                </div>
                                            </div>
                                            <!-- Pris -->
                                            <div class="uk-margin-medium-bottom">
                                                <ScInput v-model="articleDetails.Price" state="fixed" mode="outline" extra-classes="uk-form-small" placeholder="Skriv in pris">
                                                    <label>Pris</label>
                                                </ScInput>
                                            </div>
                                            <!-- Tryck -->
                                            <div v-if="articleDetails.HasPrint" class="uk-flex">
                                                <div class="uk-width-1-2 uk-margin-small-right">
                                                    <!-- Tryck - Namn -->
                                                    <div class="uk-margin-medium-bottom">
                                                        <ScInput v-model="articleDetails.PrintOptionList[0].Value" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                            <label>Tryck - Namn</label>
                                                        </ScInput>
                                                    </div>
                                                    <!-- Tryck - Nummer -->
                                                    <div class="uk-margin-medium-bottom">
                                                        <ScInput v-model="articleDetails.PrintOptionList[1].Value" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                            <label>Tryck - Nummer</label>
                                                        </ScInput>
                                                    </div>
                                                    <!-- Tryck - Patch -->
                                                    <div class="uk-margin-medium-bottom">
                                                        <PrettyCheck v-model="articleDetails.PrintOptionList[2].IsChecked" class="p-icon">
                                                            <i slot="extra" class="icon mdi mdi-check"></i><span class="uk-text-small">Tryck - Patch</span>
                                                        </PrettyCheck>
                                                    </div>
                                                </div>
                                                <div class="uk-width-1-2">
                                                    <!-- Pris -->
                                                    <div class="uk-margin-medium-bottom">
                                                        <ScInput v-model="articleDetails.PrintOptionList[0].Price" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                            <label>Pris</label>
                                                        </ScInput>
                                                    </div>
                                                    <!-- Pris -->
                                                    <div class="uk-margin-medium-bottom">
                                                        <ScInput v-model="articleDetails.PrintOptionList[1].Price" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                            <label>Pris</label>
                                                        </ScInput>
                                                    </div>
                                                    <!-- Pris -->
                                                    <div class="uk-margin-medium-bottom">
                                                        <ScInput v-model="articleDetails.PrintOptionList[2].Price" state="fixed" mode="outline" extra-classes="uk-form-small">
                                                            <label>Pris</label>
                                                        </ScInput>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="errors" class="uk-alert-danger uk-padding-small uk-border-rounded uk-margin-medium-bottom">
                                                {{ errors[0].Value }}
                                            </div>
                                            <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="addItem(orderInfo.OrderId)">
                                                LÄGG TILL PRODUKT
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </ScCardBody>
                </ScCard>
            </div>
            <div style="visibility: hidden; height: 0px; overflow: hidden;">
                <Deliverynotes  :orders="[orderInfo.OrderId]" :isUnifaunTrue="true" :isPrintPickingList="false" ref="form" />
            </div>
        </div>

        <!-- MAIL-EDITOR -->
        <div id="mail-editor" class="uk-modal-full uk-modal" data-uk-modal>
            <div>
                <div class="uk-modal-header basket-ribbon uk-animation-slide-right">
                    <!-- sticky -->
                    <h4 class="uk-modal-title" style="color:#fff; line-height:1; margin:3px 0 0 12px; padding:10px;">Skicka mail till kund</h4>
                    <button
                        class="uk-offcanvas-close uk-icon uk-close"
                        style="color:#fff;top:14px;right:12px;"
                        type="button"
                        uk-close
                        uk-toggle="target: #mail-editor"/>
                </div>
                <div v-if="emptyEmail != null" class="uk-modal-dialog uk-modal-body uk-overflow-auto uk-animation-slide-right" style="padding:0px;height:100vh;background:#ffffff;">
                    <div class="uk-width-1-1" uk-margin>
                        <ScCard class="uk-card-small">
                                <ScCardBody class="uk-height-1-1">
                                    <div class="uk-width-1-1 uk-padding-small">
                                        <Alert
                                            :errorlist="errors"
                                            :alertClass="'uk-alert-danger'"
                                            id=1
                                        />
                                        <!-- Titel -->
                                        <div class="uk-margin">
                                            <ScInput v-model="emptyEmail.Title" state="fixed" mode="outline"  extra-classes="uk-form-small">
                                                <label>Titel</label>
                                            </ScInput>
                                        </div>
                                        <div class="uk-margin editor-styles">
                                            <client-only>
                                                <ckeditor v-model="emptyEmail.Text" :editor="editor" :config="editorConfig"></ckeditor>
                                            </client-only>
                                            <!-- <ScTextarea v-model="emptyEmail.Text" :rows="30" state="fixed" mode="outline" extra-classes="uk-form-small">
                                            </ScTextarea> -->
                                        </div>
                                        <button v-waves.button.light class="sc-button sc-button-primary uk-margin-medium-right" @click.prevent="sendOrderMail()">
                                            SKICKA
                                        </button>
                                    </div>
                                </ScCardBody>
                        </ScCard>
                    </div>
                </div>
            </div>
        </div>

			<!-- VOUCHER MODAL -->
			<div id="voucher-modal" class="uk-modal-full uk-modal" data-uk-modal>
				<div class="uk-modal-header basket-ribbon uk-animation-slide-right">
					<!-- sticky -->
					<h4 class="uk-modal-title" style="color:#fff; line-height:1; margin:3px 0 0 12px; padding:10px;">Aktivera voucher</h4>
					<button
						class="uk-offcanvas-close uk-icon uk-close"
						style="color:#fff;top:14px;right:12px;"
						type="button"
						uk-close
						uk-toggle="target: #voucher-modal"/>
				</div>
				<div class="uk-modal-dialog uk-modal-body uk-overflow-auto uk-animation-slide-right" uk-overflow-auto="" style="padding:0px;height:100vh;background:#ffffff;">


                        <div class="uk-margin-small-left uk-margin-small-right">
                            <Alert
                                :errorlist="errors"
                                :alertClass="'uk-alert-danger'"
                                id=2
                            />
                        </div>

					<div v-if="!errors" class="uk-width-1-1 uk-overflow-auto">
						<table class="border-all uk-card uk-box-shadow-small uk-margin-remove-bottom uk-table uk-table-small uk-table-middle uk-text-small">
							<thead>
								<tr>
									<td class="border-bottom border-right uk-text-left" style="width:180px;"><strong>Skapad</strong></td>
									<td class="border-bottom border-right uk-text-left" style="width:80px;"><strong>Kod</strong></td>
									<td class="border-bottom border-right uk-text-left" style="width:130px;"><strong>Shop</strong></td>
									<td class="border-bottom border-right uk-text-left" style="width:50px;"><strong>Värde</strong></td>
									<td class="border-bottom border-right uk-text-left" style="width:50px;"><strong>Antal</strong></td>
									<td class="border-bottom border-right uk-text-left" style="width:50px;"><strong>Kvar</strong></td>
									<td class="border-bottom border-right uk-text-left" style="width:180px;"><strong>Gilt. t.o.m</strong></td>
                                    <td class="border-bottom border-right uk-text-left" style="width:80px;"></td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="voucher in voucherList.ItemList" :key="voucher.VoucherId" class="uk-table-middle">
									<td class="border-bottom border-right uk-width-auto uk-text-left"><div>{{ voucher.CreatedDate }}</div></td>
									<td class="border-bottom border-right uk-width-auto uk-text-left"><div>{{ voucher.VoucherCode }}</div></td>
									<td class="border-bottom border-right uk-width-auto uk-text-left"><div>{{ voucher.ShopName }}</div></td>
									<td class="border-bottom border-right uk-width-auto uk-text-left"><div>{{ voucher.Value }}</div></td>
									<td class="border-bottom border-right uk-width-auto uk-text-left"><div>{{ voucher.InitialAmount }}</div></td>
									<td class="border-bottom border-right uk-width-auto uk-text-left"><div>{{ voucher.ItemsLeft }}</div></td>
									<td class="border-bottom border-right uk-width-auto uk-text-left"><div>{{ voucher.ValidThru }}</div></td>
									<td class="border-bottom border-right uk-text-left">
                                        <button class="sc-button sc-button-mini sc-button-icon sc-button-primary uk-margin-small-left" type="button" @click.prevent="deductVoucherDiscount(voucher.VoucherId, voucher.Value)">
                                            Aktivera
                                        </button>
                                    </td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

    </div>
</template>

<script>
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'
import Alert from '~/components/Alert'
import PrettyCheck from 'pretty-checkbox-vue/check'
import Deliverynotes from '~/components/Deliverynotes'
import Print from '~/plugins/directives/vue-print-nb/printarea.js'
if(process.client) {
	require('~/plugins/ckeditor');
}

export default {
    components: {
		ScInput,
		ScTextarea,
		PrettyCheck,
		Deliverynotes,
		Alert,
		Select2: process.client ? () => import('~/components/Select2') : null,
    },
    data () {
		return {
            errors: null,
            message: null,
            render: false,
            isShippingFocused: false,
            adressEditorVisible: false,
            updateEditorVisible: false,
            addEditorVisible: false,
            orderProcessTypeList: [],
            paymentTypeId: 0,
            orderInfo: {},
            activationError: null,
            klarnaPurchaseIdHasData: null,
            accountIdHasData: null,
            emptyEmail: {},
            editorConfig: {
                toolbar: [ 'bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList' ],
            },
            orderContent: {},
            orderLog: [],
            orderContentInitial: {},
            orderItem: null,
            adressItem: null,
            articleNumber: null,
            articleDetails: null,
            sizeOptionsList: [],
            countries: [],
            showDeliveryNote: false,
            voucherList: [],
        }
    },
    watch: {

    },
    created () {
        },
	mounted () {
        this.$nextTick(() => {
            let _this = this
            // GET ORDEREVENTS WHEN TAB IS CLICKED
            UIkit.util.on(document, 'beforeshow', function (event, area) {
                event.target.id == 'orderevents' ? _this.getOrderLog() : ''
            })
        })
    },
    computed: {
		editor () {
			return process.client ? require('@ckeditor/ckeditor5-build-classic') : null
		},
    },
    methods: {
        getPrintout() {
            this.showDeliveryNote = true
            this.$refs.form.getPrintout()
        },
        async deleteItem(itemId) {
			let _this = this
            await UIkit.modal.confirm('Vill du verkligen radera orderraden?', { labels: { ok: 'Yeah', cancel: 'Nope' } }).then(function () {
                _this.$store.dispatch('setBusyOn')
                _this.$axios.$post('/webapi/OrderHandling/PostDeleteItem?itemId=' + itemId)
                .then(function (response) {
                    try {
                        if (response.ErrorList != null ) {
                            _this.$store.dispatch('setBusyOff')
                        } else {
                            _this.orderContent = response
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
            }, function () {
				_this.$store.dispatch('setBusyOff')
			})
		},
        printDeliveryNotes(id) {
            this.showDeliveryNote = true
            setTimeout(() => {
                new Print({
                    ids: id, // * Partial printing must pass in id
                    standard: '', // Document type, default is html5, optional html5, loose, strict
                    extraHead: '', // Additional tags attached to the head tag, separated by commas
                    extraCss: '', // Additional CSS, separated by multiple commas
                    popTitle: '', // iframe title
                    endCallback () { // Callback event after printing
                        this.showDeliveryNote = false
                    }
                })
                setTimeout(() => {
                    this.showDeliveryNote = false
                }, 100);
            }, 500)
        },
        startAddItem() {
            this.addEditorVisible = true
            this.updateEditorVisible = false
        },
        async addItem(orderId) {
			let _this = this
            _this.errors = null
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/OrderHandling/PostAddItem?orderId=' + orderId, _this.articleDetails)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.errors = response.ErrorList
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.orderContent = response
                        _this.addEditorVisible = false
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
        async updateItem() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/OrderHandling/PostUpdateItem', _this.orderItem )
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.orderContent = response
                        _this.updateEditorVisible = false
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
        async updateOrder() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/OrderHandling/PostUpdateOrder', _this.orderInfo )
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.orderInfo = response
                        _this.orderInfo.KlarnaPurchaseId != null
                        ? _this.klarnaPurchaseIdHasData = true
                        : _this.klarnaPurchaseIdHasData = false
                        _this.orderInfo.AccountId != null
                        ? _this.accountIdHasData = true
                        : _this.accountIdHasData = false
                        _this.render = !_this.render
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
        async updateOrderContent() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/OrderHandling/UpdateOrderContent', _this.orderContent )
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.orderContent = response
                        _this.render = !_this.render
                        _this.$store.dispatch('setBusyOff')
                        _this.isShippingFocused = false
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
        async processOrder() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/OrderHandling/PostProcessOrder?paymentTypeId=' + _this.paymentTypeId, _this.orderContent )
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.orderContent = _this.orderContentInitial
                        _this.orderContent.OrderItemList.forEach(item => { item.IsSelected = false })
                        _this.paymentTypeId = 0
                        _this.$store.dispatch('setBusyOff')
                        _this.$router.push('/order/' + response.OrderId)
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
        async updateAdress() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/Address/PostUpdateAddress?orderId=' + _this.orderInfo.OrderId, _this.adressItem )
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.orderInfo = response
                        _this.adressEditorVisible = false
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
        async sendOrderConfirmation() {
			let _this = this
			_this.message = null
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/OrderHandling/PostSendOrderConfirmation?orderId=' + _this.orderInfo.OrderId )
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
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
        async deductMemberDiscount() {
			let _this = this
			_this.message = null
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/OrderHandling/DeductMemberDiscount?orderId=' + _this.orderInfo.OrderId )
			.then(function (response) {
                try {
                    if (response.Message != '' ) {
                        UIkit.modal.dialog('<p class="uk-modal-body">' + response.Message + '</p>')
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
        async setOrderAsDeliveredByOrderId() {
			let _this = this
			_this.message = null
            _this.$store.dispatch('setBusyOn')
            await this.$axios.$post('/webapi/OrderHandling/SetOrderAsDeliveredByOrderId?orderId=' + _this.orderInfo.OrderId )
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.orderInfo = response
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
        async getItemToEdit(itemId) {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$get('/webapi/OrderHandling/GetOrderItem?itemId=' + itemId)
			.then(function (response) {
                try {
                    _this.orderItem = response
                    _this.updateEditorVisible = true
                    _this.addEditorVisible = false
                    _this.$store.dispatch('setBusyOff')
                } catch(err) {
                    console.log(err)
                }
			})
			.catch(function (error) {
                console.log(error)
                _this.$store.dispatch('setBusyOff')
			})
		},
        async getAdressToEdit(adressId) {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$get('/webapi/Address/GetAddress?addressId=' + adressId)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.adressItem = response
                        _this.adressEditorVisible = true
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
        async getArticleDetails(articleId) {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$get('/webapi/Article/GetArticleDetailsByArticleNumber?articleNumber=' + articleId)
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        _this.articleDetails = response
                        _this.articleDetails.ShopId = _this.orderInfo.ShopId
                        _this.sizeOptionsList = response.StockList.map(({ StockId, SizeDisplay }) => ({ id: StockId, text: SizeDisplay }))
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
        async getOrderLog() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
            try {
                const orderlog = await this.$axios.$get('/webapi/Log/GetOrderLog?orderId=' + this.$route.params.id)
                if (orderlog.ErrorList != null ) {
                    _this.errors = orderlog.ErrorList
                    _this.$store.dispatch('setBusyOff')
                } else {
                    _this.orderLog = orderlog
                    _this.$store.dispatch('setBusyOff')
                }
            } catch(err) {
                console.log(err)
            }
		},
        async getEmptyEmailObject() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
            try {
                const emptyemail = await this.$axios.$get('/webapi/OrderHandling/GetEmptyEmailObject?orderId=' + this.$route.params.id)
                if (emptyemail.ErrorList != null ) {
                    _this.errors = emptyemail.ErrorList
                    _this.$store.dispatch('setBusyOff')
                } else {
                    _this.emptyEmail = emptyemail
                    _this.emptyEmail.Text = ''
                    _this.$store.dispatch('setBusyOff')
                    UIkit.modal('#mail-editor').show()
                }
            } catch(err) {
                console.log(err)
            }
		},
        async sendOrderMail() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
            _this.$store.commit('setAlertHidden', 1)
            await this.$axios.$post('/webapi/OrderHandling/SendOrderMail', _this.emptyEmail )
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.errors = response.ErrorList
                        _this.$store.commit('setAlertVisible', 1)
                        _this.$store.dispatch('setBusyOff')
                    } else {
                        UIkit.modal.dialog('<p class="uk-modal-body">Ditt mail har skickats!</p>')
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
        async setOrderAsProcessed() {
			let _this = this
            _this.$store.dispatch('setBusyOn')
			await this.$axios.$post('/webapi/OrderHandling/SetOrderAsProcessedById', _this.activationError)
			.then(function (orderinfo) {
                if (orderinfo.ActivationError.OrderId != 0 ) {
                    _this.activationError = orderinfo.ActivationError
                    _this.$store.dispatch('setBusyOff')
                } else {
                    _this.activationError = orderinfo.ActivationError
                    _this.orderInfo = orderinfo
                    _this.render = !_this.render
                    _this.$store.dispatch('setBusyOff')
                }
			})
			.catch(function (error) {
                console.log('Error i catch: ', error)
                _this.$store.dispatch('setBusyOff')
			})
		},
        async showVoucherModal() {
			let _this = this
            _this.$store.commit('setAlertHidden', 2)
            _this.$store.dispatch('setBusyOn')
            try {
                const voucherlist = await this.$axios.$post('/webapi/Voucher/VoucherListByOrder', _this.orderInfo)
                if (voucherlist.ErrorList != null ) {
                    _this.errors = voucherlist.ErrorList
                    _this.$store.dispatch('setBusyOff')
                    _this.$store.commit('setAlertVisible', 2)
                    UIkit.modal('#voucher-modal').show()
                } else {
                    _this.voucherList = voucherlist
                    _this.$store.dispatch('setBusyOff')
                    UIkit.modal('#voucher-modal').show()
                }
            } catch(err) {
                console.log(err)
            }
		},
        async deductVoucherDiscount(voucherid, discountvalue) {
			let _this = this
			_this.message = null
			_this.errors = null
            _this.$store.commit('setAlertHidden', 2)
            _this.$store.dispatch('setBusyOn')
            _this.voucherList.VoucherId = voucherid
            _this.voucherList.Discount = discountvalue
			await this.$axios.$post('/webapi/Voucher/deductVoucherDiscount', _this.voucherList )
			.then(function (response) {
                try {
                    if (response.ErrorList != null ) {
                        _this.errors = response.ErrorList
                        _this.$store.dispatch('setBusyOff')
                        _this.$store.commit('setAlertVisible', 2)
                    } else {
                        _this.$fetch()
                        _this.$store.dispatch('setBusyOff')
                        UIkit.modal.dialog('<p class="uk-modal-body">Voucher är aktiverad!</p>')
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
        try {
            this.$store.dispatch('setBusyOn')
            const [ orderInfo, orderContent, countries, orderProcessTypeList ] = await Promise.all([
                this.$axios.$get('/webapi/Order/GetOrder?orderId=' + this.$route.params.id),
                this.$axios.$get('/webapi/Order/GetOrderContent?orderId=' + this.$route.params.id),
                this.$axios.$get('/webapi/Address/GetCountries'),
                this.$axios.$get('/webapi/Utility/GetOrderProcessTypeList'),
            ])
            this.orderInfo = orderInfo
            this.activationError = orderInfo.ActivationError
            this.orderContent = orderContent
            this.orderContentInitial = orderContent
            this.countries = countries
            this.orderProcessTypeList = orderProcessTypeList

            this.orderInfo.KlarnaPurchaseId != null
            ? this.klarnaPurchaseIdHasData = true
            : this.klarnaPurchaseIdHasData = false
            this.orderInfo.AccountId != null
            ? this.accountIdHasData = true
            : this.accountIdHasData = false

            this.$store.dispatch('setBusyOff')
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
    .image-column-width {
        width: 50px;
    }
    .wastebasket, .editicon, .addicon, .closeicon {
		cursor: pointer;
	}
    .slide-enter-active {
        transition: all 0.8s;
    }
    .slide-leave-active {
        transition: all 0.5s;
    }
    .slide-enter, .slide-leave-to {
        transform: translateX(300%);
    }

    // MAIL-EDITOR
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