<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-flex uk-flex-center">
				<div class="uk-width-4-5@l">
					<div class="uk-grid" data-uk-grid>
						<div class="uk-width-1-4@m uk-width-1-5@l">
							<div v-sc-sticky="sideMenu">
								<ul class="uk-subnav uk-subnav-pill uk-flex-column" data-uk-switcher="connect: .sc-settings-container; animation: uk-animation-slide-bottom-small; swiping: false">
									<li class="uk-active">
										<a href="javascript:void(0)">
											<span class="uk-flex uk-flex-middle uk-text-medium sc-text-semibold">
												<i class="mdi mdi-cogs uk-margin-medium-right"></i>Basic Settings
											</span>
										</a>
									</li>
									<li>
										<a href="javascript:void(0)">
											<span class="uk-flex uk-flex-middle uk-text-medium sc-text-semibold">
												<i class="mdi mdi-account-group uk-margin-medium-right"></i>Users
											</span>
										</a>
									</li>
									<li>
										<a href="javascript:void(0)">
											<span class="uk-flex uk-flex-middle uk-text-medium sc-text-semibold">
												<i class="mdi mdi-brush uk-margin-medium-right"></i>Appearance
											</span>
										</a>
									</li>
									<li>
										<a href="javascript:void(0)">
											<span class="uk-flex uk-flex-middle uk-text-medium sc-text-semibold">
												<i class="mdi mdi-puzzle-outline uk-margin-medium-right"></i>Plugins
											</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div class="uk-width-3-4@m">
							<ul class="uk-switcher sc-settings-container">
								<li>
									<ScCard>
										<ScCardHeader class="uk-flex uk-flex-middle sc-theme-bg-dark sc-light" separator>
											<div class="uk-flex-1">
												<ScCardTitle>
													Settings
												</ScCardTitle>
												<ScCardMeta>
													Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, nulla.
												</ScCardMeta>
											</div>
											<div>
												<button class="sc-button">
													Save
												</button>
											</div>
										</ScCardHeader>
										<ScCardBody>
											<div>
												<div class="uk-flex-middle uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary" for="settings-page-online">
															Page Online
														</label>
													</div>
													<div class="uk-width-expand uk-flex uk-flex-middle">
														<PrettyCheck id="settings-page-online" v-model="settings.basic.pageOnline" class="p-switch"></PrettyCheck>
													</div>
												</div>
											</div>
											<div class="uk-margin-top">
												<div class="uk-flex-middle uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary" for="settings-page-title">
															Page Title
														</label>
													</div>
													<div class="uk-width-expand">
														<ScInput id="settings-page-title" v-model="settings.basic.pageTitle"></ScInput>
													</div>
												</div>
											</div>
											<div class="uk-margin-top">
												<div class="uk-flex-middle uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary" for="settings-page-slogan">
															Page Slogan
														</label>
													</div>
													<div class="uk-width-expand">
														<ScInput id="settings-page-slogan" v-model="settings.basic.pageSlogan"></ScInput>
													</div>
												</div>
											</div>
											<div class="uk-margin-top">
												<div class="uk-grid-small uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary uk-margin-small-top uk-display-inline-block" for="settings-page-description">
															Description
														</label>
													</div>
													<div class="uk-width-expand">
														<ScTextarea id="settings-page-description" v-model="settings.basic.pageDescription" :cols="20" :rows="4"></ScTextarea>
													</div>
												</div>
											</div>
											<div class="uk-margin-top">
												<div class="uk-grid-small uk-flex-middle uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary" for="settings-page-keywords">
															Keywords
														</label>
													</div>
													<div class="uk-width-expand">
														<client-only>
															<Select2
																id="settings-page-keywords"
																v-model="settings.basic.pageKeywords"
																:options="keywords"
																:settings="{ 'width': '100%', 'placeholder': 'Select keywords...', 'tags': true, 'tokenSeparators': [',',' '] }"
																multiple
															></Select2>
														</client-only>
													</div>
												</div>
											</div>
											<div class="uk-margin">
												<div class="uk-grid-small uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary uk-margin-small-top uk-display-inline-block" for="settings-page-www">
															Website's address
														</label>
													</div>
													<div class="uk-width-expand">
														<ScInput id="settings-page-www" v-model="settings.basic.websiteAddress" placeholder="https://"></ScInput>
													</div>
												</div>
											</div>
											<div class="uk-margin-medium">
												<div class="uk-grid-small uk-flex-middle uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary" for="settings-page-lang">
															Allow access from
														</label>
													</div>
													<div class="uk-width-expand">
														<client-only>
															<Select2
																id="settings-page-lang"
																v-model="settings.basic.accessAllow"
																:options="countries"
																:settings="{ 'width': '100%', 'placeholder': 'Select countries...', 'templateResult': 'formatCountryResult', 'templateSelection': 'formatCountrySelection' }"
																multiple
															></Select2>
														</client-only>
													</div>
												</div>
											</div>
											<div class="uk-margin-medium">
												<div class="uk-grid-small uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary uk-display-inline-block" for="settings-page-www">
															Use SSL
														</label>
													</div>
													<div class="uk-width-expand">
														<span class="uk-margin-right">
															<PrettyRadio v-model="settings.basic.SSL" value="yes" class="p-radio" name="use-ssl">
																Yes
															</PrettyRadio>
														</span>
														<span>
															<PrettyRadio v-model="settings.basic.SSL" value="no" class="p-radio" name="use-ssl">
																No
															</PrettyRadio>
														</span>
													</div>
												</div>
											</div>
										</ScCardBody>
									</ScCard>
								</li>
								<li>
									<ScCard>
										<ScCardHeader class="uk-flex uk-flex-middle sc-theme-bg-dark sc-light" separator>
											<div class="uk-flex-1">
												<ScCardTitle>
													Users
												</ScCardTitle>
												<ScCardMeta>
													Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, nulla.
												</ScCardMeta>
											</div>
											<div>
												<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-trash-can-outline sc-icon-square sc-light"></a>
											</div>
										</ScCardHeader>
										<ScCardBody>
											<div class="uk-overflow-auto">
												<table class="uk-table uk-table-divider">
													<thead>
														<tr>
															<th>
																<div class="uk-flex">
																	<PrettyCheck v-model="userTable.checkAll"
																		class="p-icon"
																		:indeterminate.sync="userTable.checkAllInd"
																		@change="toggleAllUsers($event)"
																	>
																		<i slot="extra" class="icon mdi mdi-check"></i>
																		<i slot="indeterminate-extra" class="icon mdi mdi-minus"></i>
																		<label slot="indeterminate-label"></label>
																	</PrettyCheck>
																</div>
															</th>
															<th>User Name</th>
															<th>Email</th>
															<th>Phone Number</th>
															<th>Status</th>
															<th>Actions</th>
														</tr>
													</thead>
													<tbody>
														<tr v-for="user in settings.users" :key="user.id" class="uk-table-middle">
															<td class="uk-table-shrink">
																<div class="uk-flex">
																	<PrettyCheck v-model="user.selected" class="p-icon" @change="toggleUser($event)">
																		<i slot="extra" class="icon mdi mdi-check"></i>
																	</PrettyCheck>
																</div>
															</td>
															<td class="sc-text-semibold uk-text-nowrap">
																{{ user.fName }} {{ user.lName }}
															</td>
															<td>{{ user.email }}</td>
															<td class="uk-text-nowrap">
																{{ user.phone }}
															</td>
															<td class="uk-table-shrink">
																<span v-if="user.status === 'active'" class="uk-label uk-label-success">
																	{{ user.status }}
																</span>
																<span v-if="user.status === 'disabled'" class="uk-label uk-label-danger">
																	{{ user.status }}
																</span>
															</td>
															<td class="uk-text-nowrap uk-table-shrink">
																<a href="javascript:void(0)" class="mdi mdi-pencil sc-icon-square"></a>
																<a href="javascript:void(0)" class="mdi mdi-trash-can-outline sc-icon-square"></a>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</ScCardBody>
									</ScCard>
								</li>
								<li>
									<ScCard>
										<ScCardHeader class="uk-flex uk-flex-middle sc-theme-bg-dark sc-light" separator>
											<div class="uk-flex-1">
												<ScCardTitle>
													Appearance
												</ScCardTitle>
												<ScCardMeta>
													Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, nulla.
												</ScCardMeta>
											</div>
											<div>
												<button class="sc-button">
													Save
												</button>
											</div>
										</ScCardHeader>
										<ScCardBody>
											<div>
												<div class="uk-flex-middle uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary" for="settings-page-appearance-scheme">
															Color Scheme
														</label>
													</div>
													<div class="uk-width-1-4@l uk-width-1-2@m">
														<client-only>
															<Select2
																id="settings-page-appearance-scheme"
																v-model="settings.apperance.colorScheme"
																:options="apperanceScheme"
																:settings="{ 'width': '100%', 'placeholder': 'Select color scheme...', 'minimumResultsForSearch': -1, 'allowClear': true }"
															></Select2>
														</client-only>
													</div>
												</div>
											</div>
											<div class="uk-margin">
												<div class="uk-flex-middle uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary" for="settings-page-appearance-layout">
															Layout
														</label>
													</div>
													<div class="uk-width-1-4@l uk-width-1-2@m">
														<client-only>
															<Select2
																id="settings-page-appearance-layout"
																v-model="settings.apperance.layout"
																:options="apperanceLayout"
																:settings="{ 'width': '100%', 'placeholder': 'Select layout...', 'minimumResultsForSearch': -1, 'allowClear': true }"
															></Select2>
														</client-only>
													</div>
												</div>
											</div>
											<div class="uk-margin-medium">
												<div class="uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary uk-display-inline-block">
															Sticky Header
														</label>
													</div>
													<div class="uk-width-expand@m">
														<span class="uk-margin-right">
															<PrettyRadio v-model="settings.apperance.stickyHeader" value="yes" class="p-radio" name="sticky-header">
																Yes
															</PrettyRadio>
														</span>
														<span>
															<PrettyRadio v-model="settings.apperance.stickyHeader" value="no" class="p-radio" name="sticky-header">
																No
															</PrettyRadio>
														</span>
													</div>
												</div>
											</div>
											<div class="uk-margin-medium">
												<div class="uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary uk-display-inline-block" for="settings-page-appearance-fonts">
															Global Font
														</label>
													</div>
													<div class="uk-width-1-2@m">
														<client-only>
															<Select2
																id="settings-page-appearance-fonts"
																v-model="settings.apperance.fontFamily"
																:options="apperanceFonts"
																:settings="{ 'width': '100%', 'placeholder': 'Select font family...', 'minimumResultsForSearch': -1, 'allowClear': true }"
															></Select2>
														</client-only>
													</div>
												</div>
											</div>
											<h5 class="uk-heading-line uk-margin-large-top">
												<span>Colors</span>
											</h5>
											<div>
												<div class="uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary uk-display-inline-block">
															Primary
														</label>
													</div>
													<div class="uk-width-1-2@m">
														<client-only>
															<ScColorpicker v-model="settings.apperance.colorPrimary"
																size="large"
															></ScColorpicker>
														</client-only>
														<span class="uk-form-help-block uk-margin-remove-left uk-margin-mini-top">
															Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, ullam.
														</span>
													</div>
												</div>
											</div>
											<div class="uk-margin-top">
												<div class="uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary uk-display-inline-block">
															Secondary
														</label>
													</div>
													<div class="uk-width-1-2@m">
														<client-only>
															<ScColorpicker v-model="settings.apperance.colorSecondary"
																size="large"
															></ScColorpicker>
														</client-only>
														<span class="uk-form-help-block uk-margin-remove-left uk-margin-mini-top">
															Lorem ipsum dolor sit amet, ullam.
														</span>
													</div>
												</div>
											</div>
											<div class="uk-margin-top">
												<div class="uk-grid" data-uk-grid>
													<div class="uk-width-1-4@m">
														<label class="sc-color-secondary uk-display-inline-block">
															Links
														</label>
													</div>
													<div class="uk-width-1-2@m">
														<client-only>
															<ScColorpicker v-model="settings.apperance.colorLinks"
																size="large"
																:pallete="['#5e35b1', '#689f38', '#1e88e5', '#e53935']"
															></ScColorpicker>
														</client-only>
														<span class="uk-form-help-block uk-margin-remove-left uk-margin-mini-top">
															Lorem ipsum dolor sit amet.
														</span>
													</div>
												</div>
											</div>
										</ScCardBody>
									</ScCard>
								</li>
								<li>
									<ScCard>
										<ScCardHeader class="uk-flex uk-flex-middle sc-theme-bg-dark sc-light" separator>
											<div class="uk-flex-1">
												<ScCardTitle>
													Plugins
												</ScCardTitle>
												<ScCardMeta>
													Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, nulla.
												</ScCardMeta>
											</div>
											<div>
												<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-trash-can-outline sc-icon-square sc-light"></a>
											</div>
										</ScCardHeader>
										<ScCardBody>
											<div class="uk-overflow-auto">
												<table class="uk-table uk-table-divider">
													<thead>
														<tr>
															<th>
																<div class="uk-flex">
																	<PrettyCheck v-model="pluginTable.checkAll"
																		class="p-icon"
																		:indeterminate.sync="pluginTable.checkAllInd"
																		@change="toggleAllPlugins($event)"
																	>
																		<i slot="extra" class="icon mdi mdi-check"></i>
																		<i slot="indeterminate-extra" class="icon mdi mdi-minus"></i>
																		<label slot="indeterminate-label"></label>
																	</PrettyCheck>
																</div>
															</th>
															<th>Name</th>
															<th>Version</th>
															<th>Description</th>
															<th>Status</th>
															<th>Actions</th>
														</tr>
													</thead>
													<tbody>
														<tr v-for="plugin in settings.plugins" :key="plugin.id" class="uk-table-middle">
															<td class="uk-table-shrink">
																<div class="uk-flex">
																	<PrettyCheck v-model="plugin.selected" class="p-icon" @change="togglePlugin($event)">
																		<i slot="extra" class="icon mdi mdi-check"></i>
																	</PrettyCheck>
																</div>
															</td>
															<td class="sc-text-semibold uk-text-nowrap">
																{{ plugin.name }}
															</td>
															<td class="uk-text-nowrap uk-table-shrink">
																{{ plugin.version }}
															</td>
															<td class="uk-text-nowrap">
																{{ plugin.description }}
															</td>
															<td class="uk-table-shrink">
																<span v-if="plugin.status === 'active'" class="uk-label uk-label-success">
																	{{ plugin.status }}
																</span>
																<span v-if="plugin.status === 'disabled'" class="uk-label md-bg-grey-500">
																	{{ plugin.status }}
																</span>
															</td>
															<td class="uk-text-nowrap uk-table-shrink">
																<a href="javascript:void(0)"
																	class="mdi sc-icon-square"
																	:data-uk-tooltip="plugin.status === 'active' ? 'Deactivate' : 'Activate'"
																	:class="{ 'md-color-green-600' : plugin.status === 'active', 'mdi-toggle-switch': plugin.status === 'active', 'mdi-toggle-switch-off': plugin.status === 'disabled' }"
																	@click.prevent="togglePluginStatus(plugin)"
																></a>
																<a href="javascript:void(0)" class="mdi mdi-trash-can-outline sc-icon-square"></a>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</ScCardBody>
									</ScCard>
								</li>
							</ul>
							<pre>{{ settings | json }}</pre>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { scHelpers, scFakeData } from "~/assets/js/utils";
const { uniqueID } = scHelpers;
const { first, last, phone, email, sentence, floating } = scFakeData;

const countries = require('~/data/common/countries.json');

import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'
import PrettyCheck from 'pretty-checkbox-vue/check';
import PrettyRadio from 'pretty-checkbox-vue/radio';
import ScColorpicker from '~/components/Colorpicker'

import sticky from '~/plugins/stickyKit'

require('~/assets/icons/flags/flags.css');

export default {
	name: 'PagesSettings',
	components: {
		Select2: process.client ? () => import('~/components/Select2') : null,
		ScInput,
		ScTextarea,
		PrettyCheck,
		PrettyRadio,
		ScColorpicker
	},
	data: () => ({
		settings: {
			basic: {
				pageOnline: true,
				pageTitle: 'Scutum Admin Template',
				pageKeywords: [1, 2],
				accessAllow: ['US', 'CN', 'BR', 'PL', 'ES', 'IN'],
				SSL: ''
			},
			users: [],
			apperance: {
				colorScheme: '',
				layout: '',
				stickyHeader: 'no',
				fontFamily: '',
				colorPrimary: '',
				colorSecondary: '',
				colorLinks: '#1e88e5'
			},
			plugins: []
		},
		keywords: [
			{ id: 1, text: 'Admin template' },
			{ id: 2, text: 'UIkit' },
			{ id: 3, text: 'Multipurpose' },
			{ id: 4, text: 'VueJS' }
		],
		userTable: {
			checkAll: false,
			checkAllInd: false
		},
		pluginTable: {
			checkAll: false,
			checkAllInd: false
		},
		apperanceScheme: [
			{ id: 1, text: 'Light' },
			{ id: 2, text: 'Dark' },
		],
		apperanceLayout: [
			{ id: 1, text: 'Default' },
			{ id: 2, text: 'Blog' },
			{ id: 2, text: 'Portfolio' }
		],
		apperanceFonts: [
			{ id: 1, text: 'Roboto, sans-serif' },
			{ id: 2, text: 'Helvetica, sans-serif' },
			{ id: 3, text: 'Trebuchet MS, sans-serif' },
			{ id: 4, text: 'Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif' }
		],
		sideMenu: {
			media: 'mediumMin',
			options: {
				'offset_top': 'inPlace'
			},
			on: {
				'sticky_kit:stick' (e) {
					// console.log("has stuck!", e.target);
				},
				'sticky_kit:unstick' (e) {
					// console.log("has unstuck!", e.target);
				},
			}
		}
	}),
	computed: {
		tempUsers () {
			let statuses = ['active', 'disabled'];
			let users = [];
			for (let i = 0; i < 8; i++) {
				users.push({
					id: uniqueID(),
					fName: first(),
					lName: last(),
					phone: phone(),
					email: email(),
					status: statuses[Math.floor(Math.random()*statuses.length)],
					selected: false
				})
			}
			return users;
		},
		tempPlugins () {
			let statuses = ['active', 'disabled'];
			let plugins = [];
			for (let i = 0; i < 6; i++) {
				plugins.push({
					id: uniqueID(),
					name: 'Plugin Name ' + (i + 1),
					version: 'ver. ' + floating({ min: 1, max: 4, fixed: 1 }),
					description: sentence({ words: 20 }),
					status: statuses[Math.floor(Math.random()*statuses.length)],
					selected: false
				})
			}
			return plugins;
		},
		countries () {
			return countries.map(function (obj) {
				obj.id = obj.id || obj.code;
				obj.text = obj.text || obj.name;
				return obj;
			});
		}
	},
	mounted () {
		this.$nextTick(() => {
			this.tempUsers.forEach(obj => {
				this.settings.users.push(obj)
			});
			this.tempPlugins.forEach(obj => {
				this.settings.plugins.push(obj)
			});
		})
	},
	methods: {
		toggleAllUsers (state) {
			this.settings.users.forEach((k, index) => {
				this.settings.users[index].selected = state
			});
		},
		toggleUser (value) {
			let users = this.settings.users.map((k) => {
				return k.selected
			});
			let someChecked = users.some(cb => cb === true);
			let allChecked = users.every(cb => cb === true);
			if (allChecked) {
				this.userTable.checkAll = true;
				this.userTable.checkAllInd = false
			} else if (someChecked) {
				this.userTable.checkAllInd = true
			} else {
				this.userTable.checkAll = false;
				this.userTable.checkAllInd = false
			}
		},
		toggleAllPlugins (state) {
			this.settings.plugins.forEach((k, index) => {
				this.settings.plugins[index].selected = state
			});
		},
		togglePlugin (value) {
			let plugins = this.settings.plugins.map((k) => {
				return k.selected
			});
			let someChecked = plugins.some(cb => cb === true);
			let allChecked = plugins.every(cb => cb === true);
			if (allChecked) {
				this.pluginTable.checkAll = true;
				this.pluginTable.checkAllInd = false
			} else if (someChecked) {
				this.pluginTable.checkAllInd = true
			} else {
				this.pluginTable.checkAll = false;
				this.pluginTable.checkAllInd = false
			}
		},
		togglePluginStatus (plugin) {
			let status = plugin.status;
			if(status === 'active') {
				plugin.status = 'disabled'
			}
			if(status === 'disabled') {
				plugin.status = 'active'
			}
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
