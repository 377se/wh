<template>
  <div class="delivery-note-container">
    <div id="delivery-note-single" class="delivery-note" style="clear: both; page-break-after: always;">
    <div class="uk-padding-small no-print uk-flex uk-flex-right"><a v-print="printDeliverynote" href="javascript:void(0)" class="sc-actions-icon mdi mdi mdi-printer"></a></div>
    <div class="identity">
        <div class="logo">
        <img
            class="image"
            src="//res.cloudinary.com/supportersplace/image/fetch/w_270,f_auto/http://static.supportersplace.se/img/mail/samdodds_300.png"
            alt="logo"
        />
        </div>
        <div class="address">
        377 Sport AB / Sam Dodds<br />
        Skärholmen, Stockholm, Sweden
        </div>
    </div>
    <div class="customer">
        <div class="customer-title">
        Kund<br />
        Hansi Fellbrink<br />
        Hellbergsgatan 38<br />
        85631 SUNDSVALL<br />
        SWEDEN<br />
        0703356961<br />
        </div>
    </div>
    <div class="orderdetails">
        <div class="header">Följesedel</div>
        <table class="meta">
        <tbody>
            <tr>
            <td class="meta-head">Ordernummer</td>
            <td><span style="font-weight: bold;">370390</span></td>
            </tr>
            <tr>
            <td class="meta-head">Orderdatum</td>
            <td class="date">2021-04-01</td>
            </tr>
            <tr>
            <td class="meta-head">Betalningmetod</td>
            <td>
                <div class="due">Give away</div>
            </td>
            </tr>
        </tbody>
        </table>
    </div>
    <div style="clear: both"></div>
    <div class="order">
        <table class="items">
        <thead>
            <tr>
            <th></th>
            <th></th>
            <th>Artikelnummer</th>
            <th style="text-align: center;">HP</th>
            <th style="text-align: center;">Färg</th>
            <th style="text-align: center;">Storlek</th>
            <th style="text-align: center;">Antal</th>
            <th style="text-align: right;">Pris/st (SEK)</th>
            <th style="text-align: right;">Totalt (SEK)</th>
            </tr>
        </thead>
        <tbody>
            <tr class="item-row">
            <td>
                <img
                class="productImage"
                src="//res.cloudinary.com/supportersplace/image/fetch/w_50,f_auto/https://static.supportersplace.se/product/adidas-home-jersey-2017-18-5418-1.jpg"
                alt="Product image"
                />
            </td>
            <td class="description">
                <span class="articleCategory">Manchester United</span>
                Home Jersey 2017/18<br />
                Adidas
            </td>
            <td class="item-name">BS1214</td>
            <td class="qty">J8</td>
            <td class="qty">Röd</td>
            <td class="qty">2XL</td>
            <td class="qty">1</td>
            <td class="cost">90,00 SEK</td>
            <td class="price">90,00 SEK</td>
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
                Summa
            </td>
            <td
                class="total-value"
                style="border-top: 1px solid #000; padding-top: 10px;"
            >
                <div
                style="text-align: right; padding-top: 5px;"
                class="subtotal"
                >
                90,00 SEK
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
            <td colspan="2" class="total-line">Frakt &amp; hantering</td>
            <td class="total-value">
                <div style="text-align: right">0,00 SEK</div>
            </td>
            </tr>
            <tr class="blank">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colspan="2" class="total-line">Inklusive moms</td>
            <td class="total-value paid" style="text-align: right">
                18,00 SEK
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
                <span style="font-weight: bold;">Ordersumma</span>
            </td>
            <td class="total-value">
                <div class="total" style="font-weight: bold; text-align: right;">
                90,00 SEK
                </div>
            </td>
            </tr>
        </tfoot>
        </table>
    </div>
    </div>
  </div>
</template>

<script>
import print from '~/plugins/directives/vue-print-nb'

export default {
    directives: { print },
	data: () => ({
        printDeliverynote: {
			id: "delivery-note-single",
			popTitle: 'Följesedel'
		}
	}),
    methods: {
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
            this.showPageOverlaySpinner()
            const [ orderInfo ] = await Promise.all([
                this.$axios.$get('/webapi/OrderPrint/GetPrintout?orderlist=370408&createUnifaunXml=false' + this.$route.params.id),
            ])
            this.orderInfo = orderInfo
            this.hidePageOverlaySpinner()
        } catch (err) {
            console.log(err);
        }
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
    margin: 60px 0 0 50px;
}

.delivery-note {
  width: 900px;
  margin: 0 auto;
  padding: 0 50px;
  background-color: #fff;
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
.terms p {
  text-align: left;
  margin: 0 0 20px 0;
  background: #f5f5f5;
  padding: 20px;
}
.terms h5 {
  margin-top: 20px;
  text-transform: uppercase;
  font: 13px Helvetica, Sans-Serif;
  font-weight: bold;
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
