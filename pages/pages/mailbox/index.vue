<template>
	<TransitionGroup
		v-if="showMessages"
		tag="ul"
		class="sc-list-messages sc-js-message-filter"
		appear
		:css="false"
		@before-enter="beforeEnter"
		@enter="enter"
		@leave="leave"
	>
		<li v-for="(message,index) in $parent.messages"
			:key="message.id"
			:data-index="index"
			:class="[message.unreaded ? 'sc-message-unreaded' : '', message.selected ? 'sc-item-checked' : '', $parent.tagName(message.tag)]"
		>
			<div class="sc-message-card" @click="$parent.showMessage($event, message)">
				<div class="uk-flex uk-flex-middle sc-message-head uk-grid-collapse" data-uk-grid>
					<div class="uk-flex uk-flex-middle uk-margin-right sc-js-el-hide">
						<PrettyCheck v-model="$parent.messageSelected[message.id]" :value="message.selected" class="p-icon" @change="$parent.toggleMessage($event, message)">
							<i slot="extra" class="icon mdi mdi-check"></i>
						</PrettyCheck>
					</div>
					<div class="uk-flex-1 uk-text-truncate">
						<h2 class="sc-message-title uk-text-truncate" :title="message.title">
							{{ message.title }}
						</h2>
						<span v-if="message.tag" class="uk-label uk-margin-small-right" :class="[$parent.messageTagColor(message.tag)]">
							{{ message.tag }}
						</span>
						<span class="uk-text-small uk-text-muted">
							{{ message.sender }}
						</span>
					</div>
					<div class="uk-visible@m">
						<div class="sc-message-date">
							{{ message.date | moment("ddd, MMM Do HH:mm") }}
						</div>
						<div class="sc-message-actions">
							<a href="javascript:void(0)" class="mdi mdi-delete sc-js-message-remove" data-uk-tooltip title="Remove"></a>
							<a href="javascript:void(0)" class="mdi mdi-archive" data-uk-tooltip title="Archive"></a>
							<a href="javascript:void(0)" class="mdi mdi-email-open" data-uk-tooltip title="Mark as read"></a>
						</div>
					</div>
					<div class="sc-js-el-show">
						<a href="javascript:void(0)" class="sc-message-close sc-js-message-close">
							<i class="mdi mdi-close"></i>
						</a>
					</div>
				</div>
			</div>
		</li>
	</TransitionGroup>
</template>

<script>
import { scVars, scDom } from '~/assets/js/utils'
const { addClass, removeClass } = scDom;

import PrettyCheck from 'pretty-checkbox-vue/check';
import moment from '~/plugins/moment'

export default {
	name: 'PagesMailboxIndex',
	components: {
		PrettyCheck
	},
	data: () => ({
		filter: null,
		showMessages: false
	}),
	watch: {
		showMessages (newVal, oldVal) {
			let $filterEl = document.getElementById('sc-page-wrapper');
			const self = this;
			if(newVal) {
				// initialize filters
				self.filter = UIkit.filter($filterEl, {
					'target': '.sc-js-message-filter'
				});
				// fires after the filter has been applied
				UIkit.util.on($filterEl, 'afterFilter', function () {
					let state = self.filter.getState();
					if (typeof state.filter[""] === 'undefined') {
						removeClass($filterEl, 'sc-filtered-items');
					} else {
						addClass($filterEl, 'sc-filtered-items');
					}
				});
			}
		}
	},
	mounted () {
		setTimeout(() => {
			this.showMessages = true;
		}, 320)
	},
	methods: {
		beforeEnter (el) {
			el.style.opacity = 0;
			addClass(el, 'sc-disable-transition');
		},
		enter (el, done) {
			velocity(el, {
				translateY: [0, '70%'],
				opacity: [1, 0]
			}, {
				delay: el.dataset.index * 50,
				easing: scVars.easingSwiftOut,
				duration: 320,
				complete () {
					removeClass(el, 'sc-disable-transition');
					done();
				}
			})
		},
		leave (el, done) {}
	}
}
</script>

<style lang="scss">
	@import '~scss/vue/pretty_checkboxes';
</style>
