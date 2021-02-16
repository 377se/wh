<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-3@l">
					<ScCard>
						<ScCardBody>
							<p class="sc-text-semibold uk-text-uppercase uk-heading-line">
								<span>Click To Edit</span>
							</p>
							<transition name="slide-bottom-medium" mode="out-in">
								<div v-if="userEditActive" key="userPreview">
									<div class="sc-round sc-border uk-margin sc-padding">
										<div class="uk-margin">
											<ScInput v-model="userTemp.firstName">
												<label>First Name</label>
											</ScInput>
										</div>
										<div class="uk-margin">
											<ScInput v-model="userTemp.lastName">
												<label>Last Name</label>
											</ScInput>
										</div>
										<div class="uk-margin">
											<ScInput v-model="userTemp.email">
												<label>Email address</label>
											</ScInput>
										</div>
										<div class="uk-margin">
											<ScInput v-model="userTemp.company">
												<label>Company</label>
											</ScInput>
										</div>
										<div class="uk-margin">
											<PrettyCheck v-model="userTemp.active" class="p-icon">
												<i slot="extra" class="icon mdi mdi-check"></i>
												User active
											</PrettyCheck>
										</div>
									</div>
								</div>
								<div v-else key="userForm">
									<div class="sc-round sc-border uk-margin sc-padding">
										<div class="uk-margin-small">
											<strong>First Name</strong>: {{ user.firstName }}
										</div>
										<div class="uk-margin-small">
											<strong>Last Name</strong>: {{ user.lastName }}
										</div>
										<div class="uk-margin-small">
											<strong>Email</strong>: {{ user.email }}
										</div>
										<div class="uk-margin-small">
											<strong>Company</strong>: {{ user.company }}
										</div>
										<div v-if="user.active">
											<span class="uk-label uk-label-success">
												Active
											</span>
										</div>
										<div v-else>
											<span class="uk-label md-bg-grey-500">
												Inactive
											</span>
										</div>
									</div>
								</div>
							</transition>
							<div class="uk-margin-top uk-flex uk-flex-middle">
								<transition name="fade" mode="out-in">
									<button v-if="!userEditActive" class="sc-button sc-button-primary" @click.prevent="editUser()">
										Edit User
									</button>
									<div v-else>
										<button class="sc-button sc-button-primary" @click.prevent="saveUserData()">
											Save
										</button>
										<button class="sc-button sc-button-flat-danger sc-button-flat uk-margin-small-left" @click.prevent="cancelEdit()">
											Cancel
										</button>
									</div>
								</transition>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardBody>
							<p class="sc-text-semibold uk-text-uppercase uk-heading-line">
								<span>Lazy loading</span>
							</p>
							<transition name="scale-up" mode="out-in">
								<div v-if="!imageLoading" key="randomImage" class="uk-text-center">
									<img v-if="imageLoaded" :src="randomImage" class="sc-round uk-height-medium" alt="">
								</div>
								<div v-else key="randomImageProgress" class="uk-flex uk-flex-center uk-flex-middle" :class="{'uk-height-medium': imageLoaded}">
									<ScProgressCircular v-if="imageLoaded" size="md"></ScProgressCircular>
								</div>
							</transition>
							<div class="uk-margin uk-flex uk-flex-middle">
								<button class="sc-button sc-button-primary" @click.prevent="loadRandomImage()">
									Load Random Image
								</button>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardBody>
							<div class="uk-flex uk-flex-middle uk-margin-bottom">
								<div class="uk-flex-1">
									<p class="sc-text-semibold uk-text-uppercase uk-heading-line uk-margin-remove sc-padding-small-ends">
										<span>Sortable List save order</span>
									</p>
								</div>
							</div>
							<div id="sc-sortable" data-uk-sortable>
								<div v-for="item in sortableOrder" :key="item.id" class="uk-margin-small sc-round" :data-id="item.id">
									<div class="sc-padding-small md-bg-blue-50 md-color-blue-800 sc-round">
										{{ item.title }} {{ item.position }}
									</div>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
				<div class="uk-width-2-3@l">
					<ScCard>
						<ScCardBody>
							<p class="sc-text-semibold uk-text-uppercase uk-heading-line">
								<span>Deleting A Table Row</span>
							</p>
							<div class="uk-overflow-auto">
								<table class="uk-table uk-table-striped uk-table-small uk-table-middle">
									<thead>
										<tr>
											<th>Name</th>
											<th>Email</th>
											<th>Status</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="t1User in table1Users" :key="t1User.id">
											<td>{{ t1User.name }}</td>
											<td>{{ t1User.email }}</td>
											<td>{{ t1User.status }}</td>
											<td class="uk-table-shrink">
												<a href="javascript:void(0)" class="mdi mdi-trash-can-outline sc-icon-square" @click.prevent="removeRow($event, t1User)"></a>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardBody>
							<p class="sc-text-semibold uk-text-uppercase uk-heading-line">
								<span>Click To Load</span>
							</p>
							<div class="uk-overflow-auto">
								<table class="uk-table uk-table-divider">
									<thead>
										<tr>
											<th class="uk-table-shrink"></th>
											<th>Name</th>
											<th>Company</th>
											<th>Email</th>
											<th>Phone</th>
										</tr>
									</thead>
									<TransitionGroup tag="tbody"
										:css="false"
										@before-enter="beforeEnter"
										@enter="enter"
										@leave="leave"
									>
										<tr v-for="(t2User, index) in table2Users" :key="t2User.id" :data-index="index">
											<td>{{ index + 1 }}.</td>
											<td class="uk-text-nowrap">
												{{ t2User.fName }} {{ t2User.lName }}
											</td>
											<td class="uk-text-nowrap">
												{{ t2User.company }}
											</td>
											<td>{{ t2User.email }}</td>
											<td class="uk-text-nowrap">
												{{ t2User.phone }}
											</td>
										</tr>
									</TransitionGroup>
								</table>
							</div>
							<div v-if="loadOffset !== jsonUsersLength" class="uk-flex uk-flex-middle uk-margin-top">
								<button class="sc-button sc-button-primary" @click.prevent="loadMoreUsers()">
									Load More Users &hellip;
								</button>
								<span v-show="addUserLoading" class="sc-spinner sc-spinner-small ic-indicator uk-margin-small-left"></span>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { scHelpers, scVars, scFakeData } from "~/assets/js/utils";
const { first, last, email } = scFakeData;
const { uniqueID, isHiRes } = scHelpers;

const jsonUsers = require('~/data/common/users.json');
import _ from 'lodash';
import ScInput from '~/components/Input'
import PrettyCheck from 'pretty-checkbox-vue/check';
import { ScProgressCircular } from '~/components/progress'

require('~/plugins/velocity.client.js');

export default {
	name: 'PluginsAjax',
	components: {
		ScInput,
		PrettyCheck,
		ScProgressCircular
	},
	data: () => ({
		userEditActive: false,
		editUserTransition: false,
		user: {
			firstName: 'Elijah',
			lastName: 'Vincent',
			email: 'jethidket@bub.sv',
			company: 'UnitedHealth Group Incorporated',
			active: true
		},
		userTemp: {},
		imageLoaded: false,
		imageLoading: false,
		randomImage: require('~/assets/img/blank.gif'),
		sortableProccessing: false,
		sortable: [
			{
				id: 0,
				title: '1. Lorem ipsum dolor sit amet.',
				position: 0
			},
			{
				id: 1,
				title: '2. Lorem ipsum dolor sit amet.',
				position: 1
			},
			{
				id: 2,
				title: '3. Lorem ipsum dolor sit amet.',
				position: 2
			},
			{
				id: 3,
				title: '4. Lorem ipsum dolor sit amet.',
				position: 3
			}
		],
		table1Users: [],
		table2Users: [],
		loadOffset: 0,
		usersLimit: 15,
		jsonUsersLength: jsonUsers.length,
		addUserLoading: false
	}),
	computed: {
		sortableOrder () {
			return _.orderBy(this.sortable, 'position')
		},
		tempTable1Users () {
			let statuses = ['Active', 'Disabled'];
			let users = [];
			for (let i = 0; i < 6; i++) {
				users.push({
					id: uniqueID(),
					name: first() + ' ' + last(),
					email: email(),
					status: statuses[Math.floor(Math.random()*statuses.length)]
				})
			}
			return users;
		}
	},
	mounted () {
		this.$nextTick(() => {
			const self = this;
			// save sortable order
			UIkit.util.on('#sc-sortable', 'stop', function (data) {
				let list = data.srcElement.children;
				for (let i = 0; i < list.length; i++) {
					let item = self.sortable.filter(obj => {
						return obj.id == list[i].dataset.id
					});
					item[0].position = i;
				}
				UIkit.notification('New Order Saved.');
			});
			// push users from tempTable1
			this.tempTable1Users.forEach(obj => {
				this.table1Users.push(obj)
			});
			// push users from jsonUsers
			for (let i = this.loadOffset; i < this.usersLimit; i++) {
				this.table2Users.push(jsonUsers[i])
			}
			this.loadOffset += this.usersLimit;
		})
	},
	methods: {
		editUser () {
			Object.keys(this.user).map((k, index) => {
				this.$set(this.userTemp, k, this.user[k])
			});
			this.userEditActive = !this.userEditActive;
		},
		cancelEdit () {
			this.userTemp = {};
			this.userEditActive = !this.userEditActive;
		},
		saveUserData () {
			Object.keys(this.userTemp).forEach((k, index) => {
				this.user[k] = this.userTemp[k];
			});
			this.userTemp = {};
			this.userEditActive = !this.userEditActive;
		},
		loadRandomImage () {
			this.imageLoading = true;
			this.imageLoaded = true;
			let photos = [
				'ray-hennessy-763310-unsplash', 'daria-kopylova-766667-unsplash', 'casey-horner-768005-unsplash', 'urban-sanden-768851-unsplash', 'steve-roe-763192-unsplash',
				'wynand-van-poortvliet-761831-unsplash', 'rodion-kutsaev-760882-unsplash', 'san-fermin-pamplona-navarra-768251-unsplash', 'shane-young-768821-unsplash',
				'avantgarde-concept-763896-unsplash', 'eiliv-aceron-765897-unsplash', 'pietro-mattia-764559-unsplash', 'rachel-park-366508-unsplash',
				'alex-guillaume-769172-unsplash', 'ciaran-o-brien-769402-unsplash', 'paula-brustur-766878-unsplash', 'briana-tozour-756151-unsplash'
			];
			let image = photos[Math.floor(Math.random()*photos.length)];
			setTimeout(() => {
				this.randomImage = isHiRes ? require('~/assets/img/photos/' + image + '_md@2x.jpg') : require('~/assets/img/photos/' + image + '_md.jpg');
				this.imageLoading = false;
			}, 1000);
		},
		removeRow (e, row) {
			const self = this;
			let index = this.table1Users.map(function (item) {
				return item.id
			}).indexOf(row.id);
			UIkit.modal.confirm('<p class="uk-text-large">Do you really want to delete <strong>'+ row.name +'</strong>?</p>', {
				'escClose': false,
				'labels': {
					'cancel': 'Cancel',
					'ok': 'Delete'
				}
			}).then(function () {
				e.target.closest('tr').classList.add("uk-animation-reverse", "uk-animation-slide-right");
				setTimeout(() => {
					self.table1Users.splice(index, 1);
				}, 300);
			}, function () {
				console.log('Rejected.')
			});
		},
		loadMoreUsers () {
			this.addUserLoading = true;
			setTimeout(() => {
				let limit =  this.loadOffset + this.usersLimit <= this.jsonUsersLength ? this.loadOffset + this.usersLimit : this.jsonUsersLength;
				for (let i = this.loadOffset; i < limit; i++) {
					this.table2Users.push(jsonUsers[i])
				}
				if(limit === this.jsonUsersLength) {
					this.loadOffset = this.jsonUsersLength;
				} else {
					this.loadOffset += this.usersLimit;
				}
				this.addUserLoading = false;
			}, 500);
		},
		beforeEnter (el) {
			el.style.opacity = 0;
		},
		enter (el, done) {
			const index = el.dataset.index < this.usersLimit ? el.dataset.index : el.dataset.index - (this.loadOffset - this.usersLimit);
			const delay = index * 60;
			if(this.loadOffset > this.usersLimit) {
				setTimeout(() => {
					// scroll to bottom
					window.scrollTo(0, document.body.scrollHeight);
				}, 10);
			}
			setTimeout(() => {
				velocity(el, {
					translateX: [0, '-10%'],
					opacity: [1, 0]
				}, {
					easing: scVars.easingSwiftOut,
					duration: 140,
					complete: done
				})
			}, delay)
		},
		leave (el, done) {}
	}
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>


