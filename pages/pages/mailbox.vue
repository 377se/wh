<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-aside uk-visible@l"></div>
			<div class="sc-top-bar-content uk-flex-1">
				<PrettyCheck v-if="$route.name === 'pages-mailbox'"
					v-model="mailbox.checkAll"
					class="p-icon"
					:indeterminate.sync="mailbox.checkAllInd"
					@change="toggleAllMessages($event)"
				>
					<i slot="extra" class="icon mdi mdi-check"></i>
					<i slot="indeterminate-extra" class="icon mdi mdi-minus"></i>
					<label slot="indeterminate-label"></label>
				</PrettyCheck>
				<div v-if="$route.name !== 'pages-mailbox-compose'" class="sc-actions" :class="{'uk-margin-medium-left': $route.name === 'pages-mailbox'}">
					<a v-if="$route.name === 'pages-mailbox-message-id'"
						v-waves.block
						href="javascript:void(0)"
						class="sc-actions-icon"
						data-uk-tooltip
						title="Close message"
						@click="closeMessage($event)"
					>
						<i class="mdi mdi-arrow-left"></i>
					</a>
					<a v-if="$route.name === 'pages-mailbox'"
						v-waves.block
						href="javascript:void(0)"
						class="sc-actions-icon"
						data-uk-tooltip
						title="Reply"
					>
						<i class="mdi mdi-reply"></i>
					</a>
					<a v-waves.block
						href="javascript:void(0)"
						class="sc-actions-icon"
						data-uk-tooltip
						title="Archive"
					>
						<i class="mdi mdi-archive"></i>
					</a>
					<a v-waves.block
						href="javascript:void(0)"
						class="sc-actions-icon sc-js-block-wave"
						data-uk-tooltip
						title="Delete"
					>
						<i class="mdi mdi-delete-outline"></i>
					</a>
				</div>
			</div>
		</div>
		<div id="sc-page-wrapper-inner" class="uk-flex">
			<div id="sc-page-aside" class="uk-visible@m">
				<div class="sc-page-aside-body">
					<button v-show="$route.name !== 'pages-mailbox-compose'" class="sc-button sc-button-block sc-button-danger" @click="composeMessage">
						Compose
					</button>
					<ul v-show="$route.name === 'pages-mailbox'" class="uk-margin-top uk-accordion" data-uk-accordion="multiple: true">
						<li class="uk-open">
							<a class="uk-accordion-title" href="javascript:void(0)">
								Folders
							</a>
							<div class="uk-accordion-content">
								<ul class="uk-list">
									<li>
										<a href="javascript:void(0)">
											<i class="mdi mdi-inbox uk-margin-small-right"></i>Inbox (24)
										</a>
									</li>
									<li>
										<a href="javascript:void(0)">
											<i class="mdi mdi-inbox-arrow-up uk-margin-small-right"></i>Sent
										</a>
									</li>
									<li>
										<a href="javascript:void(0)">
											<i class="mdi mdi-block-helper uk-margin-small-right sc-icon-22"></i>Spam
										</a>
									</li>
									<li>
										<a href="javascript:void(0)">
											<i class="mdi mdi-delete uk-margin-small-right"></i>Trash
										</a>
									</li>
								</ul>
							</div>
						</li>
						<li class="uk-open">
							<a class="uk-accordion-title" href="javascript:void(0)">
								Tags
							</a>
							<div class="uk-accordion-content">
								<ul class="uk-list">
									<li data-uk-filter-control class="sc-js-filter-clear">
										<a href="javascript:void(0)">
											<span class="sc-color-label md-bg-white sc-color-label-clear"></span>All Folders
										</a>
									</li>
									<li v-for="tag in tags" :key="tag.name" :data-uk-filter-control="'filter: .' + tagName(tag.name)">
										<a href="javascript:void(0)">
											<span class="sc-color-label" :class="[ tag.color ]"></span>
											{{ tag.name }}
										</a>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div id="sc-page-content" class="sc-padding-remove uk-height-1-1">
				<nuxt-child :key="$route.path"></nuxt-child>
				<ul class="sc-js-message-filter" hidden></ul>
			</div>
		</div>
		<client-only>
			<ScOffcanvas v-if="$route.name === 'pages-mailbox'" :key="mailboxOffcanvas">
				<p class="uk-text-large uk-margin-small">
					Folders
				</p>
				<ul class="uk-list uk-margin-remove sc-list-align">
					<li><a href="javascript:void(0)"><i class="mdi mdi-inbox uk-margin-small-right"></i>Inbox (24)</a></li>
					<li><a href="javascript:void(0)"><i class="mdi mdi-inbox-arrow-up uk-margin-small-right"></i>Sent</a></li>
					<li><a href="javascript:void(0)"><i class="mdi mdi-block-helper uk-margin-small-right sc-icon-22"></i>Spam</a></li>
					<li><a href="javascript:void(0)"><i class="mdi mdi-delete uk-margin-small-right"></i>Trash</a></li>
				</ul>
			</ScOffcanvas>
		</client-only>
		<div v-if="$route.name === 'pages-mailbox'" class="sc-fab-page-wrapper uk-hidden@l">
			<a href="javascript:void(0)" class="sc-fab sc-fab-large sc-fab-danger" @click="composeMessage"><i class="mdi mdi-plus"></i></a>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import PrettyCheck from 'pretty-checkbox-vue/check';
import { scDom } from '~/assets/js/utils';
const { closest } = scDom;

export default {
	name: 'PagesMailbox',
	components: {
		PrettyCheck,
		ScOffcanvas: process.client ? () => import('~/components/Offcanvas') : null
	},
	data: () => ({
		mailbox: {
			checkAll: false,
			checkAllInd: false,
		},
		messageSelected: {},
		showItems: false,
		mailboxOffcanvas: true
	}),
	computed: {
		...mapGetters({
			tags: 'mailbox/tags',
			messages: 'mailbox/messages',
			msgIDs: 'mailbox/messageIDs'
		})
	},
	mounted () {
		// set fixed page
		this.$store.commit('setPageFixed', true);
	},
	beforeDestroy () {
		// unset fixed page
		this.$store.commit('setPageFixed', false);
	},
	methods: {
		showMessage (e, message) {
			var excludedEl = closest(e.target, function (el) {
				return el.className ? el.className.includes('pretty') || el.className.includes('sc-message-actions') : null;
			});
			if (!excludedEl) {
				this.$router.push({ name: 'pages-mailbox-message-id', params: { id: message.id } });
				this.$store.commit('mailbox/markAsRead', message);
			}
		},
		closeMessage (e) {
			e.preventDefault();
			this.$router.push({ name: 'pages-mailbox' });
		},
		composeMessage () {
			this.$router.push({ name: 'pages-mailbox-compose' });
		},
		toggleAllMessages (state) {
			this.$store.commit('mailbox/toggleMessages', state);
			this.messages.forEach((k) => {
				this.messageSelected[k.id] = state
			});
		},
		toggleMessage (value, message) {
			let params = {
				id: message.id,
				value: value
			};
			this.$store.commit('mailbox/toggleMessage', params);
			let checkboxes = this.messages.map((k) => {
				return k.selected
			});
			let someChecked = checkboxes.some(cb => cb === true);
			let allChecked = checkboxes.every(cb => cb === true);
			if (allChecked) {
				this.mailbox.checkAll = true;
				this.mailbox.checkAllInd = false
			} else if (someChecked) {
				this.mailbox.checkAllInd = true
			} else {
				this.mailbox.checkAll = false;
				this.mailbox.checkAllInd = false
			}
		},
		messageTagColor (tag) {
			let _tag = this.tags.filter(obj => {
				return obj.name === tag;
			});
			return _tag[0].color;
		},
		tagName (name) {
			if(!name) {
				return
			}
			// lowercase + remove whitespaces
			return 'sc-js-tag-' + name.toLowerCase().replace(/ /g, '');
		}
	}
}
</script>
<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
	@import "~scss/common/md_colors";
	@import "~scss/common/variables_mixins";
	@import "~scss/pages/mailbox";
</style>
