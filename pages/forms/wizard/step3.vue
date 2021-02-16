<template>
	<div class="sc-padding">
		<h4 class="uk-heading-line">
			<span>Billing Information</span>
		</h4>
		<address>
			<strong class="uk-margin-small-bottom uk-display-inline-block">
				{{ data.userTitle }}. {{ data.firstName }} {{ data.lastName }}
			</strong><br>
			<span class="uk-text-muted uk-text-small">
				email:
			</span> {{ data.email }}<br>
			<span v-if="data.phoneNumber !== ''">
				<span class="uk-text-muted uk-text-small">
					phone number:
				</span> {{ data.phoneNumber }}<br>
			</span>
			<span v-if="data.company !== ''">
				<span class="uk-text-muted uk-text-small">
					company:
				</span> {{ data.company }}<br>
			</span>
			<span v-if="data.companyID !== ''">
				<span class="uk-text-muted uk-text-small">
					company ID:
				</span> {{ data.companyID }}<br>
			</span>
		</address>
		<p class="sc-text-semibold uk-margin-small-bottom">
			Addresses:
		</p>
		<div class="uk-child-width-auto@m uk-grid-divider" data-uk-grid>
			<div v-for="address in data.addresses" :key="address.id">
				<address>
					<span v-if="address.billingAddress">
						{{ address.billingAddress }}<br>
					</span>
					<span v-if="address.zipCode">
						{{ address.zipCode }}<br>
					</span>
					<span v-if="address.city">
						{{ getCity(address.city) }}<br>
					</span>
					<span v-if="address.country">
						{{ getCountry(address.country) }}
					</span>
				</address>
			</div>
		</div>

		<h4 class="uk-heading-line uk-margin-medium-top">
			<span>Payment</span>
		</h4>
		<div class="uk-grid-small" data-uk-grid>
			<div class="uk-width-1-5@m uk-text-muted">
				Type
			</div>
			<div class="uk-width-3-5@m sc-text-semibold">
				{{ data.paymentMethod.name }}
				<span v-if="data.paymentMethod.ccType && data.paymentMethod.name === 'Credit Card'">
					( {{ data.paymentMethod.ccType | toUppercase }} )
				</span>
			</div>
		</div>
		<div v-if="data.paymentMethod.name === 'Credit Card'" class="uk-grid-small" data-uk-grid>
			<div class="uk-width-1-5@m uk-text-muted">
				Number
			</div>
			<div class="uk-width-3-5@m">
				{{ data.paymentMethod.ccNumber | hashCCnumber }}
			</div>
		</div>
		<div v-if="data.paymentMethod.name === 'Credit Card'" class="uk-grid-small" data-uk-grid>
			<div class="uk-width-1-5@m uk-text-muted">
				Expires
			</div>
			<div class="uk-width-3-5@m">
				{{ data.paymentMethod.ccDate }}
			</div>
		</div>
		<div v-if="data.paymentMethod.name === 'Credit Card'" class="uk-grid-small" data-uk-grid>
			<div class="uk-width-1-5@m uk-text-muted">
				Card Holder
			</div>
			<div class="uk-width-3-5@m">
				{{ data.paymentMethod.ccHolder }}
			</div>
		</div>
		<div v-if="data.paymentMethod.name === 'Paypal'" class="uk-grid-small" data-uk-grid>
			<div class="uk-width-1-5@m uk-text-muted">
				Account Name
			</div>
			<div class="uk-width-3-5@m">
				{{ data.paymentMethod.ppAccount }}
			</div>
		</div>
		<div v-if="data.paymentMethod.name === 'Amazon'" class="uk-grid-small" data-uk-grid>
			<div class="uk-width-1-5@m uk-text-muted">
				Account Name
			</div>
			<div class="uk-width-3-5@m">
				{{ data.paymentMethod.amazonAccount }}
			</div>
		</div>
		<div v-if="data.paymentMethod.name === 'Skrill'" class="uk-grid-small" data-uk-grid>
			<div class="uk-width-1-5@m uk-text-muted">
				Account Name
			</div>
			<div class="uk-width-3-5@m">
				{{ data.paymentMethod.skrillAccount }}
			</div>
		</div>
		<h4 class="uk-heading-line uk-margin-medium-top">
			<span>Products</span>
		</h4>
		<div class="uk-overflow-auto">
			<table class="uk-table uk-table-striped uk-table-small">
				<thead>
					<tr>
						<th>Product Name</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="uk-text-nowrap">
							Lorem ipsum dolor sit amet, consectetur.
						</td>
						<td>4</td>
						<td>$100</td>
						<td>$400</td>
					</tr>
					<tr>
						<td>Lorem ipsum dolor sit amet, consectetur.</td>
						<td>4</td>
						<td>$100</td>
						<td>$400</td>
					</tr>
					<tr>
						<td>Lorem ipsum dolor sit amet, consectetur.</td>
						<td>4</td>
						<td>$100</td>
						<td>$400</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
const usCities = require('~/data/common/us_cities.json');
const countries = require('~/data/common/countries.json');

export default {
	name: 'FormsWizardStep3',
	props: {
		data: {
			type: Object,
			default: () => {}
		}
	},
	methods: {
		getCity (id) {
			var result = usCities.filter(obj => {
				return obj.rank === id
			});
			return result[0].city;
		},
		getCountry (code) {
			var result = countries.filter(obj => {
				return obj.code === code
			});
			return result[0].name;
		}
	}
}
</script>
