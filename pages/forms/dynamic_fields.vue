<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-flex-center uk-grid" data-uk-grid>
				<div class="uk-width-2-3@l">
					<ScCard>
						<form action="">
							<div v-for="(item, index) in dynamicFields" :key="item.id" class="sc-padding sc-form-section" :class="{'md-bg-grey-100' : index % 2}">
								<h4 class="uk-margin uk-heading-line">
									<span>{{ item.firstName }} {{ item.lastName }}</span>
								</h4>
								<div class="uk-grid-match uk-grid" data-uk-grid>
									<div class="uk-width-expand@m">
										<div class="uk-child-width-1-2@m uk-flex uk-flex-bottom uk-grid" data-uk-grid>
											<div>
												<ScInput v-model="item.firstName">
													<label>First Name</label>
												</ScInput>
											</div>
											<div>
												<ScInput v-model="item.lastName">
													<label>Last Name</label>
												</ScInput>
											</div>
										</div>
										<div class="uk-child-width-1-3@m uk-flex uk-flex-middle" data-uk-grid>
											<div>
												<ScInput v-model="item.email" v-input-mask="{ 'alias': 'email' }">
													<label>Email</label>
												</ScInput>
											</div>
											<div>
												<ScInput v-model="item.phoneNumber">
													<label>Phone Number</label>
												</ScInput>
											</div>
											<div>
												<PrettyCheck v-model="item.registerUser" class="p-switch">
													Register User
												</PrettyCheck>
											</div>
										</div>
									</div>
									<div class="uk-width-auto@m uk-flex-middle">
										<a v-if="dynamicFields.length === (index + 1)" href="javascript:void(0)" class="sc-button sc-button-icon sc-button-outline sc-button-outline-square sc-button-outline-primary" @click="addUser($event)">
											<i class="mdi mdi-plus"></i>
										</a>
										<a v-if="dynamicFields.length !== (index + 1)" href="javascript:void(0)" class="sc-button sc-button-icon sc-button-outline sc-button-outline-square sc-button-outline-danger" @click="removeUser($event,item.id)">
											<i class="mdi mdi-trash-can-outline"></i>
										</a>
									</div>
								</div>
							</div>
							<div class="sc-padding">
								<button class="sc-button">
									Submit
								</button>
							</div>
						</form>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

import ScInput from '~/components/Input'
import PrettyCheck from 'pretty-checkbox-vue/check';
if(process.client) {
	require('~/plugins/inputmask')
}

export default {
	name: 'FormsDynamicFields',
	components: {
		ScInput,
		PrettyCheck
	},
	data: () => ({
		dynamicFields: [
			{
				id: uniqueID(),
				firstName: '',
				lastName: '',
				email: '',
				phoneNumber: '',
				registerUser: false
			}
		]
	}),
	methods: {
		addUser (e) {
			e.preventDefault();
			this.dynamicFields.push({
				id: uniqueID(),
				firstName: '',
				lastName: '',
				email: '',
				phoneNumber: '',
				registerUser: false
			})
		},
		removeUser (e, id) {
			e.preventDefault();
			var index = this.dynamicFields.map(function (item) {
				return item.id
			}).indexOf(id);
			this.dynamicFields.splice(index, 1);
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
