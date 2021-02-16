<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content" class="uk-height-1-1 uk-flex uk-flex-center sc-page-over-header">
			<div class="uk-width-5-6@l">
				<ScCard class="sc-chat-card uk-height-1-1">
					<div class="uk-grid-divider uk-grid-collapse uk-height-1-1 uk-grid" data-uk-grid data-uk-height-match="target: > div > div > .uk-card-header">
						<div v-for="room in chatRooms(activeRoom)"
							:key="room.id"
							class="uk-flex-1 uk-height-1-1 uk-width-expand"
						>
							<div class="uk-flex uk-flex-column uk-height-1-1 md-bg-grey-200">
								<ScCardHeader class="sc-chat-header sc-padding sc-padding-medium-ends">
									<div class="uk-flex uk-flex-middle">
										<div class="uk-flex-1">
											<ScCardTitle>
												{{ room.title }}
											</ScCardTitle>
											<ul class="sc-chat-user-list-inline">
												<li v-for="user in room.users" :key="user">
													<a href="javascript:void(0)">
														<span class="sc-user-status" :class="[userStatus(user)]"></span>
														<strong v-if="user === 0">
															{{ userName(user) }}
														</strong>
														<span v-else>
															{{ userName(user) }}
														</span>
													</a>
												</li>
											</ul>
										</div>
										<div class="sc-actions uk-margin-remove">
											<div class="sc-dropdown">
												<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-dots-vertical"></a>
												<div class="uk-width-small uk-dropdown" data-uk-dropdown="mode:click">
													<ul class="uk-nav uk-dropdown-nav">
														<li>
															<a href="javascript:void(0)">
																Info
															</a>
														</li>
														<li>
															<a href="javascript:void(0)">
																Settings
															</a>
														</li>
														<li>
															<a href="javascript:void(0)">
																Clear chat
															</a>
														</li>
														<li class="uk-nav-divider"></li>
														<li>
															<a href="javascript:void(0)" class="md-color-red-500">
																Close
															</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</ScCardHeader>
								<ScCardBody id="sc-chat-wrapper" class="sc-padding-remove">
									<TransitionGroup id="sc-chat" name="fadeUp" tag="div" class="sc-chat-body sc-light">
										<div
											v-for="group in room.groups"
											:key="group.id"
											class="sc-chat-messages-wrapper"
											:class="{ 'my': group.own }"
										>
											<template v-if="users[group.user].avatar">
												<a href="javascript:void(0)" class="sc-chat-message-avatar">
													<img
														v-rjs="userAvatar(group.user, true)"
														class="sc-avatar"
														:src="userAvatar(group.user)"
														alt=""
													>
												</a>
												<TransitionGroup name="fadeUp" tag="ul" class="sc-chat-messages">
													<li v-for="message in group.messages" :key="message.id">
														<p v-if="message.content" class="sc-chat-message-content">
															{{ message.content }}
														</p>
														<time v-if="message.time !== ''">
															{{ message.time }}
														</time>
													</li>
												</TransitionGroup>
											</template>
											<div v-else>
												<div v-if="!group.own" class="sc-chat-message-username">
													<a href="javascript:void(0)">
														{{ userName(group.user) }}
													</a>
												</div>
												<TransitionGroup name="fadeUp" tag="ul" class="sc-chat-messages">
													<li v-for="message in group.messages" :key="message.id">
														<p v-if="message.content" class="sc-chat-message-content">
															{{ message.content }}
														</p>
														<time v-if="message.time !== ''">
															{{ message.time }}
														</time>
													</li>
												</TransitionGroup>
											</div>
										</div>
									</TransitionGroup>
								</ScCardBody>
								<div class="sc-chat-user-input uk-flex uk-flex-middle">
									<div class="uk-flex-1">
										<ScInput
											v-model.trim="lastMessage.message"
											placeholder="Write something..."
											mode="outline"
											@keyup.native.enter="sendMessage"
										>
										</ScInput>
									</div>
									<a
										href="javascript:void(0)"
										class="mdi mdi-send sc-icon-square uk-margin-left"
										@click.prevent="sendMessage"
									>
									</a>
								</div>
							</div>
						</div>
						<div class="uk-width-1-3@m uk-width-1-3@l uk-width-1-4@xl uk-height-1-1 sc-column-transition uk-visible@l" :class="{'sc-column-collapsed': columnCollapsed, 'sc-js-el-transform': columnTransform}">
							<div class="uk-flex uk-flex-column uk-height-1-1">
								<ScCardHeader class="uk-flex uk-flex-middle sc-border-bottom">
									<div class="uk-flex-1 sc-js-el-hide">
										<ScCardTitle class="sc-actions-match">
											Users / Rooms
										</ScCardTitle>
									</div>
									<client-only>
										<ColumnToggle
											show-icon="mdi-account-multiple"
											hide-title="Hide users"
											show-title="Show users"
											:collapsed="columnCollapsed"
											@columnCollapsing="onColumnCollapsing"
											@columnShown="onColumnToggle"
											@columnHidden="onColumnToggle"
										></ColumnToggle>
									</client-only>
									<ScCardActions class="sc-js-el-hide">
										<div class="sc-dropdown">
											<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-dots-vertical"></a>
											<div class="uk-width-small uk-dropdown" data-uk-dropdown="mode:click">
												<ul class="uk-nav uk-dropdown-nav">
													<li>
														<a href="javascript:void(0)">
															Settings
														</a>
													</li>
													<li>
														<a href="javascript:void(0)">
															New chat group
														</a>
													</li>
													<li class="uk-nav-divider"></li>
													<li>
														<a href="javascript:void(0)">
															Add User
														</a>
													</li>
													<li>
														<a href="javascript:void(0)">
															Search User
														</a>
													</li>
												</ul>
											</div>
										</div>
									</ScCardActions>
								</ScCardHeader>
								<ScCardBody class="sc-js-el-hide uk-flex uk-flex-1 uk-flex-column uk-height-1-1">
									<div class="uk-margin-top">
										<h5 class="uk-margin-remove">
											Users ({{ users.length }})
										</h5>
										<ul class="uk-list uk-list-divider  uk-margin-small-top sc-list-clickable sc-list-align">
											<li v-for="user in users" :key="user.id" class="sc-list-group uk-visible-toggle" tabindex="-1">
												<div class="sc-list-addon">
													<div class="sc-avatar-wrapper">
														<span class="sc-user-status" :class="[user.status]"></span>
														<img
															v-if="user.avatar"
															v-rjs="userAvatar(user.avatar, true)"
															:src="userAvatar(user.avatar)"
															class="sc-avatar"
															alt=""
														>
														<img v-else class="sc-avatar" alt="">
													</div>
												</div>
												<div class="sc-list-body">
													<div class="uk-flex uk-flex-middle">
														<div class="uk-width-expand">
															{{ user.firstName }} {{ user.lastName }}
															<div class="sc-list-secondary-text">
																{{ user.moodMessage }}
															</div>
														</div>
														<div class="uk-width-auto">
															<ul class="uk-hidden-hover uk-flex uk-flex-middle sc-padding-remove-left uk-margin-small-left">
																<li><a href="#" class="sc-actions-icon mdi mdi-pencil-outline icon sc-icon-24 sc-icon-square"></a></li>
																<li>
																	<a href="#" class="sc-actions-icon mdi mdi-dots-vertical icon sc-icon-24 sc-icon-square"></a>
																	<div class="uk-dropdown-small uk-dropdown" data-uk-dropdown>
																		<ul class="uk-nav uk-dropdown-nav sc-padding-remove-left">
																			<li>
																				<a href="javascript:void(0)">
																					Item
																				</a>
																			</li>
																			<li>
																				<a href="javascript:void(0)">
																					Item
																				</a>
																			</li>
																		</ul>
																	</div>
																</li>
															</ul>
														</div>
													</div>
												</div>
											</li>
										</ul>
									</div>
									<div>
										<h5 class="uk-margin-remove">
											Rooms ({{ rooms.length }})
										</h5>
										<ul class="uk-subnav uk-subnav-pill uk-flex uk-flex-column uk-margin-small-top">
											<li v-for="room in rooms"
												:key="room.id"
												class="uk-margin-small-top"
												:class="{ 'uk-active': activeRoom === room.name}"
												@click="changeRoom(room.name)"
											>
												<a href="javascript:void(0)" class="uk-flex uk-flex-middle">
													<span class="uk-flex-1">
														{{ room.title }}
													</span>
													<span class="uk-margin-small-left uk-text-small">
														({{ room.users.length }} users)
													</span>
												</a>
											</li>
										</ul>
									</div>
								</ScCardBody>
							</div>
						</div>
					</div>
				</ScCard>
			</div>
		</div>
		<client-only>
			<ScOffcanvas>
				<h5 class="uk-margin-remove">
					Users ({{ users.length }})
				</h5>
				<ul class="uk-list uk-list-divider uk-margin-small-top sc-list-clickable sc-list-align">
					<li v-for="user in users" :key="user.id" class="sc-list-group">
						<div class="sc-list-addon">
							<div class="sc-avatar-wrapper">
								<span class="sc-user-status" :class="[user.status]"></span>
								<img
									v-if="user.avatar"
									v-rjs="userAvatar(user.avatar, true)"
									:src="userAvatar(user.avatar)"
									class="sc-avatar"
									alt=""
								>
								<img v-else class="sc-avatar" alt="">
							</div>
						</div>
						<div class="sc-list-body">
							{{ user.firstName }} {{ user.lastName }}
							<div class="sc-list-secondary-text">
								{{ user.moodMessage }}
							</div>
						</div>
					</li>
				</ul>
			</ScOffcanvas>
		</client-only>
	</div>
</template>

<script>
import { scHelpers, scFakeData } from "~/assets/js/utils";
const { uniqueID } = scHelpers;
const { first, last, sentence } = scFakeData;

import ScInput from '~/components/Input'

const chance = require('chance').Chance();
import moment from '~/plugins/moment'

import ColumnToggle from '~/components/ColumnToggle';
import ScOffcanvas from '~/components/Offcanvas';

export default {
	name: 'PagesChat',
	components: {
		ScInput,
		ColumnToggle,
		ScOffcanvas
	},
	data: () => ({
		myUser: {
			id: 0,
			firstName: 'Mark',
			lastName: 'Fisher',
			avatar: 0,
			status: 'online',
			moodMessage: 'Happy :)'
		},
		activeRoom: 'room_0',
		lastMessage: {
			id: null,
			date: '',
			message: ''
		},
		rooms: [
			{
				id: uniqueID(),
				name: 'room_0',
				title: 'General',
				users: [0, 1, 2, 5, 8],
				groups: [
					{
						id: uniqueID(),
						own: true,
						user: 0,
						messages: [
							{
								id: uniqueID(10),
								content: 'Ei tota maluisset ius. Sea ne partiendo assentior adolescens. Iisque accusam ex vel, mea ferri lorem menandri eu',
								time: '10:21'
							}
						]
					},
					{
						id: uniqueID(),
						own: false,
						user: 1,
						messages: [
							{
								id: uniqueID(10),
								content: 'Aliquid deserunt excepturi fugiat fugit incidunt neque officiis quae quidem sapiente',
								time: '10:23'
							}
						]
					},
					{
						id: uniqueID(),
						own: false,
						user: 5,
						messages: [
							{
								id: uniqueID(10),
								content: 'Splendide forensibus ut ius. Solum nominavi adipiscing eam et, ius falli phaedrum ut. Has mandamus salutandi scriptorem ne. Usu et illum quaerendum mediocritatem',
								time: '10:24'
							}
						]
					},
					{
						id: uniqueID(),
						own: true,
						user: 0,
						messages: [
							{
								id: uniqueID(10),
								content: 'Primis gubergren ex mel, te aperiam suscipit efficiantur mel',
								time: '10:34'
							}
						]
					}
				]
			},
			{
				id: uniqueID(),
				name: 'room_1',
				title: 'Designers',
				users: [0, 2, 5, 7],
				groups: [
					{
						id: uniqueID(),
						own: false,
						user: 2,
						messages: [
							{
								id: uniqueID(10),
								content: 'Ei tota maluisset ius. Sea ne partiendo assentior adolescens. Iisque accusam ex vel, mea ferri lorem menandri eu',
								time: '19:41'
							}
						]
					},
					{
						id: uniqueID(),
						own: true,
						user: 0,
						messages: [
							{
								id: uniqueID(10),
								content: 'Sea ne partiendo assentior adolescens. Iisque accusam ex vel ;)',
								time: '19:58'
							}
						]
					},
					{
						id: uniqueID(),
						own: false,
						user: 7,
						messages: [
							{
								id: uniqueID(10),
								content: 'Aliquid deserunt excepturi fugiat fugit incidunt neque officiis quae quidem sapiente',
								time: '19:55'
							}
						]
					},

				]
			}
		],
		statuses: ['online', 'offline', 'busy', 'away'],
		columnCollapsed: false,
		columnTransform: false
	}),
	computed: {
		users () {
			let users = [];
			for (let i = 1; i <= 10; i++) {
				let _user = {
					id: uniqueID(),
					firstName: first(),
					lastName: last(),
					status: this.statuses[Math.floor(Math.random()*this.statuses.length)],
					moodMessage: sentence({words:4})
				};
				if(i !== 2 && i !== 5) {
					_user.avatar = i
				}
				users.push(_user)
			}
			return users;
		}
	},
	mounted () {
		this.$store.commit('setCardFixed', true);
		this.$store.commit('setHeaderExpanded', true);
		let group = {
			id: uniqueID(),
			own: false,
			user: 8,
			messages: [
				{
					id: uniqueID(10),
					content: 'His persius assentior intellegebat ea. Modo quaeque ad vim. Ut has nostro recusabo. Nihil mandamus adversarium cum eu, an his assum virtute, vix an vide altera adolescens. Delectus volutpat assentior ne quo, cum an aliquam iracundia. Mei ei nobis molestiae, an doctus debitis interesset sea. Est ut enim dolor, vidisse propriae vis no :)',
					time: '10:43'
				}
			]
		};
		setTimeout(() => {
			this.rooms[0].groups.push(group);
		}, 2000);
	},
	beforeDestroy () {
		this.$store.commit('setCardFixed', false);
		this.$store.commit('setHeaderExpanded', false);
	},
	methods: {
		chatRooms (room) {
			return this.rooms.filter(obj => {
				return obj.name === room;
			})
		},
		userAvatar (number, retina) {
			let avatar = (number == 0) ? 'default' : ('0' + number);
			if(retina) {
				return require('~/assets/img/avatars/avatar_' + avatar + '_sm@2x.png');
			} else {
				return require('~/assets/img/avatars/avatar_' + avatar + '_sm.png');
			}
		},
		userStatus (user) {
			if(user == 0) {
				return this.myUser.status
			} else {
				return this.users[user].status
			}
		},
		userName (user) {
			if(user == 0) {
				return this.myUser.firstName
			} else {
				return this.users[user].firstName
			}
		},
		changeRoom (room) {
			this.activeRoom = room;
			setTimeout(() => {
				document.getElementById('sc-chat-wrapper').scrollTop = document.getElementById('sc-chat').scrollHeight;
			}, 80);
		},
		sendMessage () {
			if(this.lastMessage.message !== '') {
				let self = this;
				let now = self.$moment().format('HH:mm');
				let room = this.rooms.filter(obj => {
					return obj.name === this.activeRoom
				});
				if(this.lastMessage.date !== now) {
					let id = uniqueID();
					if(room.length) {
						room[0].groups.push({
							id: id,
							own: true,
							user: 0,
							messages: [
								{
									id: uniqueID(10),
									content: this.lastMessage.message,
									time: now
								}
							]
						});
						this.lastMessage.id = id;
					}
				} else {
					let group = room[0].groups.filter(obj => {
						return obj.id === this.lastMessage.id;
					});
					if(group.length) {
						group[0].messages.push({
							id: uniqueID(10),
							content: this.lastMessage.message,
							time: ''
						})
					}
				}
				setTimeout(() => {
					document.getElementById('sc-chat-wrapper').scrollTop = document.getElementById('sc-chat').scrollHeight;
				}, 10);
				this.lastMessage.date = now;
				this.lastMessage.message = '';
			}
		},
		onColumnCollapsing (value) {
			this.columnCollapsed = value;
			this.columnTransform = true;
		},
		onColumnToggle () {
			this.columnTransform = false
		}
	}
}
</script>

<style lang="scss">
	@import "~scss/common/md_colors";
	@import "~scss/common/variables_mixins";
	@import "~scss/pages/chat";
</style>


