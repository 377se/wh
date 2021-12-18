<template>
  <div class="delivery-note-container">
    <div class="uk-padding-small no-print uk-flex uk-flex-right" style="visibility: hidden; height: 0px;"><a v-print="printDeliverynotes" href="javascript:void(0)" class="sc-actions-icon mdi mdi mdi-printer" ref="printButton"></a></div>
    <div v-if="orders" id="all-delivery-notes" class="all-delivery-notes">
        <!-- PLOCKLISTA -->
        <div v-if="isPrintPickingList" class="delivery-note" style="clear: both; page-break-after: always;">
            <h2>Plocklista</h2>
            <table class="items">
                <thead>
                    <tr>
                        <th style="width: 80px; text-align: left;">Hyllplats</th>
                        <th style="width: 80px; text-align: left;"></th>
                        <th style="width: 100px; text-align: left;">Artikelnummer</th>
                        <th style="width: 60px; text-align: center;">Antal</th>
                        <th style="width: 80px; text-align: center;">Storlek</th>
                        <th style="width: 200px; text-align: left;">Produktnamn</th>
                    </tr>
                </thead>
                <tbody>
                        <tr v-for="(article, index) in orderInfo.PickingList" :key="index" style="border-bottom: 1px solid #000">
                            <td style="width: 80px; text-align: left;">{{ article.Shelf }}</td>
                            <td style="width: 80px; text-align: left;"><img class="productImage" :src="article.ImageName" alt="Product image"></td>
                            <td style="width: 100px; text-align: left;">{{ article.ArticleNumber }}</td>
                            <td style="width: 60px; text-align: center;">{{ article.Quantity }}</td>
                            <td style="width: 80px; text-align: center;">{{ article.SizeDisplay }}</td>
                            <td style="width: 200px; text-align: left;">
                                {{ article.TeamName }}<br>
                                {{ article.ArticleName }}<br>
                                {{ article.BrandName }}
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>

      <!-- FÖLJESEDLAR -->
      <div v-for="deliveryNote in orderInfo.OrderList" :key="deliveryNote.OrderDetails.OrderId" class="delivery-note" style="clear: both; page-break-after: always;">
      <div class="uk-padding-small no-print uk-flex uk-flex-right"><a v-print="printDeliverynotes" href="javascript:void(0)" class="sc-actions-icon mdi mdi mdi-printer"></a></div>
      <div class="identity">
          <div class="logo">
          <img
              class="image"
              :src="deliveryNote.ImageName"
              alt="logo"
          />
          </div>
          <div class="address">
          {{ deliveryNote.Dictionary.ReturnCompany }}<br />
          {{ deliveryNote.Dictionary.ReturnAddress }}
          </div>
      </div>
      <div class="customer">
          <div class="customer-title">
          {{ deliveryNote.Dictionary.Customer }}<br />
          {{ deliveryNote.OrderDetails.Address.FirstName }} {{ deliveryNote.OrderDetails.Address.LastName }}<br />
          {{ deliveryNote.OrderDetails.Address.Address1 }}<br />
          {{ deliveryNote.OrderDetails.Address.PostalCode }} {{ deliveryNote.OrderDetails.Address.City }}<br />
          {{ deliveryNote.OrderDetails.Address.Country }}<br />
          {{ deliveryNote.OrderDetails.Address.Mobile }}<br />
          </div>
      </div>
      <div class="orderdetails">
          <div class="header">{{ deliveryNote.Dictionary.Title }}</div>
          <table class="meta">
          <tbody>
              <tr>
              <td class="meta-head">{{ deliveryNote.Dictionary.OrderNumber }}</td>
              <td><span style="font-weight: bold;">{{ deliveryNote.OrderDetails.OrderId }}</span></td>
              </tr>
              <tr>
              <td class="meta-head">{{ deliveryNote.Dictionary.OrderDate }}</td>
              <td class="date">{{ deliveryNote.OrderDetails.OrderDate }}</td>
              </tr>
              <tr>
              <td class="meta-head">{{ deliveryNote.Dictionary.PaymentMethod }}</td>
              <td>
                  <div class="due">{{ deliveryNote.OrderDetails.PaymentMethod }}</div>
              </td>
              </tr>
          </tbody>
          </table>
      </div>
      <div style="clear: both"></div>
      <div>
          <table class="items">
          <thead>
              <tr>
              <th></th>
              <th></th>
              <th>{{ deliveryNote.Dictionary.ArticleNumber }}</th>
              <th style="text-align: center;">HP</th>
              <th style="text-align: center;">{{ deliveryNote.Dictionary.Color }}</th>
              <th style="text-align: center;">{{ deliveryNote.Dictionary.Size }}</th>
              <th style="text-align: center;">{{ deliveryNote.Dictionary.Quantity }}</th>
              <th style="text-align: right;">{{ deliveryNote.Dictionary.UnitPrice }} ({{ deliveryNote.OrderDetails.Currency }})</th>
              <th style="text-align: right;">{{ deliveryNote.Dictionary.OrderTotal }} ({{ deliveryNote.OrderDetails.Currency }})</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="article in deliveryNote.OrderContent.OrderItemList" :key="article.ItemId" class="item-row">
                <td>
                    <img
                    class="productImage"
                    :src="article.ImageName"
                    alt="Product image"
                    />
                </td>
                <td class="description">
                    <span class="articleCategory">{{ article.TeamName }}</span>
                    {{ article.ProductName }}<br />
                    {{ article.AddonValue ? article.AddonValue : '' }}<br v-if="article.AddonValue">
                    {{ article.BrandName }}
                </td>
                <td class="item-name">{{ article.ArticleNumber }}</td>
                <td class="qty">{{ article.Shelf }}</td>
                <td class="qty">{{ article.Color }}</td>
                <td class="qty">{{ article.SizeDisplay }}</td>
                <td class="qty">{{ article.Quantity }}</td>
                <td class="cost">{{ deliveryNote.OrderDetails.Currency }} {{ article.PriceToPay }}</td>
                <td class="price">{{ deliveryNote.OrderDetails.Currency }} {{ article.PriceToPay }}</td>
              </tr>
          </tbody>
          <tfoot>
              <tr class="blank">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td
                  colspan="2"
                  class="total-line"
                  style="border-top: 1px solid #000; padding-top: 15px;"
              >
                  {{ deliveryNote.Dictionary.OrderTotal }}
              </td>
              <td
                  class="total-value"
                  style="border-top: 1px solid #000; padding-top: 10px;"
              >
                  <div
                  style="text-align: right; padding-top: 5px;"
                  class="subtotal"
                  >
                  {{ deliveryNote.OrderContent.OrderSummary.OrderSum }}
                  </div>
              </td>
              </tr>
              <tr class="blank">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colspan="2" class="total-line">{{ deliveryNote.Dictionary.ShippingAndHandling }}</td>
              <td class="total-value">
                  <div style="text-align: right">{{ deliveryNote.OrderContent.OrderSummary.ShippingAndHandling }}</div>
              </td>
              </tr>
              <tr class="blank">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colspan="2" class="total-line">{{ deliveryNote.Dictionary.Vat }}</td>
              <td class="total-value paid" style="text-align: right">
                  {{ deliveryNote.OrderContent.OrderSummary.Vat }}
              </td>
              </tr>
              <tr class="blank">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colspan="2" class="total-line">
                  <span style="font-weight: bold;">{{ deliveryNote.Dictionary.OrderTotal }}</span>
              </td>
              <td class="total-value">
                  <div class="total" style="font-weight: bold; text-align: right;">
                  {{ deliveryNote.OrderContent.OrderSummary.Total }}
                  </div>
              </td>
              </tr>
          </tfoot>
          </table>
          <div class="terms">
            <p>
                <strong style="background-color: initial;">{{ deliveryNote.Dictionary.KlarnaTitle }}</strong><br>
                {{ deliveryNote.Dictionary.KlarnaInfo }}
            </p>

            <p>
                <strong>{{ deliveryNote.Dictionary.ReturnTitle }}</strong><br>
                {{ deliveryNote.Dictionary.ReturnInfo }}<br><br><br>
                 {{ deliveryNote.Dictionary.ReturnCompany }}<br>
                {{ deliveryNote.Dictionary.ReturnAddress }}
            </p>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import print from '~/plugins/directives/vue-print-nb'

export default {
    props:{
        orders: {
            type: Array,
            default: () => [],
            required: true
        },
        isUnifaunTrue: {
            type: Boolean,
            default: () => false,
            required: true
        },
        isPrintPickingList: {
            type: Boolean,
            default: () => false,
            required: true
        },
        isDirectPrintout: {
            type: Boolean,
            default: () => true,
            required: false
        },
    },
    watch: {
    },
    directives: { print },
    data: () => ({
        printDeliverynotes: {
                id: "all-delivery-notes",
            },
        orderInfo: {},
        articleCount: true,
    }),
    mounted () {
    },
    methods: {
      async getPrintout() {
          let _this = this
          _this.$store.dispatch('setBusyOn')
          await this.$axios.$get('/webapi/OrderPrint/GetPrintout?orderlist=' + this.orders + '&createUnifaunXml=' + this.isUnifaunTrue )
          .then(function (orderinfo) {
              _this.orderInfo = orderinfo
          })
          .then(function () {
              if (_this.isDirectPrintout === true) {
                  const elem = _this.$refs.printButton
                  elem.click()
                  _this.$emit('finishedprinting')
              }
              _this.$store.dispatch('setBusyOff')
          }
          )
          .catch(function (error) {
              console.log(error)
              _this.$store.dispatch('setBusyOff')
          })
      },
    },
}
</script>

<style lang="scss" scoped>

@media print {
    .no-print, .no-print * {
        display: none !important;
    }
}

.delivery-note-container {
    margin: 0px 0 0 0px;
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
    font-weight:400;
}

.all-delivery-notes {
  width: 950px;
  margin: 0 auto;
}

.delivery-note {
  margin: 0 0 50px 0;
  padding: 50px 50px;
  background-color: #fff;
}

@media print {
  .delivery-note {
    margin: 30px 20px 60px 20px  !important;
    padding: 0;
  }
  .all-delivery-notes {
    margin-bottom: 60px !important;
  }
}


div,
textarea {
  border: 0;
  font: 13px;
  line-height: 18px;
  overflow: hidden;
  resize: none;
}
table {
  border-collapse: collapse;
  line-height: 13px;
}
table td,
table th {
  border: 0;
  padding: 10px;
}

.header {
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 700;
  height: 55px;
  text-align: right;
  padding-top: 25px;
  margin-bottom: 25px;
  color: #333;
  font-size: 30px;
  text-transform: uppercase;
}

.address {
  margin-bottom: 30px;
}
.orderdetails {
  width: 40%;
  float: right;
}
.customer {
  width: 30%;
  float: left;
}
.identity {
  width: 30%;
  float: left;
}
.textemail {
  width: 55%;
  float: left;
}

.logo {
  text-align: left;
  margin-top: 0px;
  margin-bottom: 30px;
}
.customer-title {
  padding-top: 105px;
}

.meta {
  margin-bottom: 28px;
  width: 350px;
  float: right;
}
.meta td {
  text-align: right;
  border: 0;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  padding-top: 12px;
}
.meta td.meta-head {
  text-align: left;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
}

.items {
  clear: both;
  width: 100%;
  margin: 30px 0 30px 0;
  border: 0;
}
.items tbody {
  height: auto;
}
.items th {
  background: #333;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8em;
  text-align: left;
  color: #fff;
}

@media print {
    .items th {
        background: #333 !important;
        -webkit-print-color-adjust: exact;
        color: #fff !important;
        font-size: 10px;
    }
    .items tr {
        font-size: 12px;
    }
}

.items tr.item-row td {
  border: 0;
  vertical-align: middle;
  border-bottom: 1px solid #ccc;
}
.items tr.blank td {
  border: 0;
}
tr.item-row,
tr.blank {
  height: 30px;
}
tr.blank.spread {
  height: auto;
}

.items td.total-line {
  border: 0;
  border-bottom: 1px solid #ccc !important;
  padding: 14px 10px 10px 0px;
}
.items td.total-value {
  border: 0;
  border-bottom: 1px solid #ccc !important;
  padding: 14px 10px 10px 0px;
}

.product_category {
  font-weight: 700;
  font-size: 0.8em;
  text-transform: uppercase;
}

.items th {
  text-transform: uppercase;
}

.qty {
  text-align: center;
}
.cost,
.price {
  text-align: right;
}

.articleCategory {
  text-transform: uppercase;
  display: block;
  font-weight: bold;
}
</style>
