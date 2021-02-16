<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ul id="sc-contact-list" class="uk-child-width-1-1 uk-child-width-1-2@m uk-child-width-1-3@l uk-grid" data-uk-grid>
				<li v-for="(user, index) in users" :key="user.id">
					<ScCard hover>
						<ScCardBody class="sc-padding-remove">
							<div class="uk-grid-divider uk-grid-collapse" data-uk-grid>
								<div class="uk-width-1-3@l uk-flex uk-flex-middle uk-flex-center" :class="{ 'md-bg-light-green-700' : index === 2, 'md-bg-pink-700' : index === 6}">
									<div class="sc-padding-medium uk-text-center">
										<ScAvatar :avatar-id="randAvatar()" size="md" :extra-class="avatarClass(index)"></ScAvatar>
										<p class="sc-text-semibold uk-margin uk-margin-remove-bottom" :class="{ 'md-color-white' : index === 2 || index === 6}">
											{{ user.fName }}
											{{ user.lName }}
										</p>
										<p class="uk-margin-remove sc-color-secondary uk-text-medium" :class="{ 'md-color-white' : index === 2 || index === 6}">
											{{ user.company }}
										</p>
									</div>
								</div>
								<div class="uk-width-2-3@l">
									<div class="sc-padding-medium">
										<ul class="uk-list uk-list-divider">
											<li class="sc-list-group">
												<div class="sc-list-addon">
													<i class="mdi mdi-phone"></i>
												</div>
												<div class="sc-list-body">
													<p class="uk-margin-remove sc-text-semibold">
														{{ user.phone }}
													</p>
													<span class="sc-list-secondary-text">
														Lorem ipsum dolor sit.
													</span>
												</div>
											</li>
											<li class="sc-list-group">
												<div class="sc-list-addon">
													<i class="mdi mdi-email"></i>
												</div>
												<div class="sc-list-body">
													<p class="uk-margin-remove">
														{{ user.email }}
													</p>
												</div>
											</li>
											<li class="sc-list-group">
												<div class="sc-list-addon">
													<i class="mdi mdi-office-building"></i>
												</div>
												<div class="sc-list-body">
													<p class="uk-margin-remove uk-text-wrap">
														{{ user.address }}
													</p>
												</div>
											</li>
											<li class="sc-list-group">
												<div class="sc-list-addon">
													<i class="mdi mdi-information-outline"></i>
												</div>
												<div class="sc-list-body">
													<p class="uk-margin-remove uk-text-wrap">
														{{ user.info }}
													</p>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { scHelpers, scFakeData } from "~/assets/js/utils";
const { uniqueID } = scHelpers;
const { first, last, email, phone, address, city, company, sentence } = scFakeData;

import ScAvatar from '~/components/Avatar'

require('~/plugins/jquery');
const chance = require('chance').Chance();
if(process.client) {
	require('~/assets/js/vendor/jquery-listnav');
}

export default {
	name: 'PagesContactList',
	components: {
		ScAvatar
	},
	computed: {
		users () {
			let users = [];
			for (let i = 0; i < 60; i++) {
				users.push({
					id: uniqueID(),
					fName: first(),
					lName: last(),
					phone: phone(),
					email: email(),
					address: address() + ', ' + city(),
					company: company(),
					info: sentence({ words: 10 })
				})
			}
			return users;
		}
	},
	mounted () {
		setTimeout(() => {
			const $contactList = $("#sc-contact-list");
			$contactList.listnav({
				noMatchText: 'No matching contacts',
				onAfterFilter (letter) {
					console.log('Letter changed to ' + letter);
					UIkit.update($contactList);
				}
			});
		}, 100)
	},
	methods: {
		randAvatar () {
			return Math.floor(Math.random() * 10) + 1;
		},
		avatarClass (index) {
			return index === 2 || index === 6 ? 'sc-border' : '';
		}
	}
}
</script>

<style lang="scss">
	@import "~scss/plugins/listnav";
</style>
