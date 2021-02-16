<template>
	<div class="uk-flex uk-flex-column uk-height-1-1">
		<div class="uk-card-body uk-flex-1">
			<div class="uk-margin-medium-bottom sc-padding-left sc-padding-right">
				<p class="sc-text-semibold uk-margin-remove-bottom">
					Invoice number:
				</p>
				<ScInput v-model="invoice.number" placeholder="in format: xxx/xxxxxx/year"></ScInput>
			</div>
			<div class="md-bg-grey-100 sc-padding">
				<div class="uk-grid" data-uk-grid>
					<div class="uk-width-1-3@l">
						<p class="sc-text-semibold">
							Issue date:
						</p>
						<ScInput v-model="invoice.date" v-flatpickr></ScInput>
					</div>
					<div class="uk-width-2-3@l">
						<p class="sc-text-semibold">
							Due date:
						</p>
						<div class="uk-flex sc-padding-small-top">
							<div class="uk-margin-right">
								<PrettyRadio v-model="invoice.dueDate" value="7" class="p-radio" name="p-radio-group">
									7 days
								</PrettyRadio>
							</div>
							<div class="uk-margin-right">
								<PrettyRadio v-model="invoice.dueDate" value="14" class="p-radio" name="p-radio-group">
									14 days
								</PrettyRadio>
							</div>
							<div>
								<PrettyRadio v-model="invoice.dueDate" value="21" class="p-radio" name="p-radio-group">
									21 days
								</PrettyRadio>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="sc-padding">
				<div class="uk-child-width-1-2@l uk-grid uk-grid-divider" data-uk-grid>
					<div>
						<p class="sc-text-semibold">
							From:
						</p>
						<div class="uk-margin-medium-bottom">
							<ScInput v-model="invoice.from.company">
								<label>Company Name</label>
							</ScInput>
						</div>
						<div class="uk-margin-medium-bottom">
							<ScInput v-model="invoice.from.address1">
								<label>Address 1</label>
							</ScInput>
						</div>
						<div>
							<ScInput v-model="invoice.from.address2">
								<label>Address 2</label>
							</ScInput>
						</div>
					</div>
					<div>
						<p class="sc-text-semibold">
							To:
						</p>
						<div class="uk-margin-medium-bottom">
							<ScInput v-model="invoice.to.company">
								<label>Company Name</label>
							</ScInput>
						</div>
						<div class="uk-margin-medium-bottom">
							<ScInput v-model="invoice.to.address1">
								<label>Address 1</label>
							</ScInput>
						</div>
						<div>
							<ScInput v-model="invoice.to.address2">
								<label>Address 2</label>
							</ScInput>
						</div>
					</div>
				</div>
			</div>
			<div class="sc-padding md-bg-grey-100">
				<p class="sc-text-semibold uk-margin-remove">
					Items:
				</p>
				<div v-for="(item, index) in invoice.items" :key="item.id" class="uk-flex uk-flex-middle uk-margin-medium-top sc-padding-medium-top sc-border-top">
					<div class="uk-flex-bottom uk-grid-small uk-grid uk-flex-1 " data-uk-grid>
						<div class="uk-width-2-5@l">
							<ScInput v-model="item.description" extra-classes="uk-form-small">
								<label class="uk-label-small">Description</label>
							</ScInput>
						</div>
						<div class="uk-width-1-5@l">
							<ScInput v-model="item.quantity" extra-classes="uk-form-small">
								<label class="uk-label-small">Quantity</label>
							</ScInput>
						</div>
						<div class="uk-width-1-5@l">
							<ScInput v-model="item.rate" extra-classes="uk-form-small">
								<span class="uk-form-icon"><i class="mdi mdi-currency-usd"></i></span>
								<label class="uk-label-small">Rate</label>
							</ScInput>
						</div>
						<div class="uk-width-1-5@l">
							<ScInput v-model="item.amount" extra-classes="uk-form-small" :read-only="true" :disabled="true">
								<label class="uk-label-small">Amount</label>
							</ScInput>
						</div>
					</div>
					<div class="uk-margin-left">
						<a v-if="invoice.items.length === (index + 1)" href="javascript:void(0)" class="sc-button sc-button-icon sc-button-outline sc-button-outline-square sc-button-outline-primary" @click="addItem($event)">
							<i class="mdi mdi-plus"></i>
						</a>
						<a v-if="invoice.items.length !== (index + 1)" href="javascript:void(0)" class="sc-button sc-button-icon sc-button-outline sc-button-outline-square sc-button-outline-danger" @click="removeItem($event,item.id)">
							<i class="mdi mdi-trash-can-outline"></i>
						</a>
					</div>
				</div>
			</div>
			<div class="sc-padding">
				<p class="sc-text-semibold">
					Notes:
				</p>
				<ScTextarea v-model="invoice.notes" placeholder="Notes - any relevant information not already covered"></ScTextarea>
			</div>
		</div>
		<div class="sc-padding-medium-ends sc-padding sc-border-top">
			<button class="sc-button sc-button-primary">
				Save Invoice
			</button>
		</div>
	</div>
</template>

<script>
import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'
import PrettyRadio from 'pretty-checkbox-vue/radio';

if(process.client) {
	require('~/plugins/flatpickr');
}

export default {
	name: 'PagesInvoicesNew',
	components: {
		ScInput,
		ScTextarea,
		PrettyRadio
	},
	data: () => ({
		invoice: {
			number: '',
			date: '',
			dueDate: '',
			from: {
				company: '',
				address1: '',
				address2: ''
			},
			to: {
				company: '',
				address1: '',
				address2: ''
			},
			items: [
				{
					id: uniqueID(),
					description: '',
					quantity: '',
					rate: '',
					amount: '$0.00'
				}
			],
			notes: ''
		},
		prettyRadioGroupItems: {
			a: 'item 1',
			b: 'item 2',
			c: 'item 3',
		}
	}),
	watch: {
		'invoice.items': {
			handler: function (val, oldVal) {
				val.forEach(function (obj) {
					if(obj.quantity && obj.rate) {
						obj.amount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(obj.quantity * obj.rate)
					}
				})
			},
			deep: true
		}
	},
	methods: {
		addItem () {
			this.invoice.items.push({
				id: uniqueID(),
				description: '',
				quantity: '',
				rate: '',
				amount: '$0.00'
			})
		},
		removeItem (e, id) {
			e.preventDefault();
			var index = this.invoice.items.map(function (item) {
				return item.id
			}).indexOf(id);
			console.log(index)
			if (index || index === 0) {
				this.invoice.items.splice(index, 1);
			}
		}
	}
}
</script>
