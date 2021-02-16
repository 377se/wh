<template>
	<div v-if="message" class="sc-message-card sc-message-expanded-single">
		<transition name="fadeUp" appear @enter="delayTransition($event, 140)">
			<div class="uk-flex uk-flex-middle sc-message-head uk-grid-collapse" data-uk-grid>
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
				<div class="sc-message-date">
					{{ message.date | moment("ddd, MMM Do HH:mm") }}
				</div>
			</div>
		</transition>
		<transition name="fadeUp" appear @enter="delayTransition($event, 300)">
			<div class="sc-message-content">
				<p>{{ message.content }}</p>
			</div>
		</transition>
		<div class="sc-message-footer">
			<transition name="fadeUp" appear @enter="delayTransition($event, 450)">
				<div>
					<span class="uk-display-block uk-margin-small-bottom uk-text-muted uk-text-medium uk-margin-small-left">
						Attachments:
					</span>
					<ul class="sc-message-attachments">
						<li class="sc-flex-no-shrink">
							<div class="sc-attachment">
								<a href="javascript:void(0)">file1.png <span>(241KB)</span></a><a href="javascript:void(0)" class="mdi mdi-close sc-attachment-remove"></a>
							</div>
						</li>
						<li class="sc-flex-no-shrink">
							<div class="sc-attachment">
								<a href="javascript:void(0)">file2.pdf <span>(1240KB)</span></a><a href="javascript:void(0)" class="mdi mdi-close sc-attachment-remove"></a>
							</div>
						</li>
					</ul>
				</div>
			</transition>
			<transition name="fadeUp" appear @enter="delayTransition($event, 600)">
				<div class="sc-message-reply uk-visible@m">
					<div>
						<client-only>
							<Select2
								v-model="replay.to"
								:options="emails"
								:settings="{ 'width': '100%', 'placeholder': 'Insert valid email address...', 'tags': true, 'tokenSeparators': [',',' '], 'createTag': 'emailAddress' }"
								multiple
							></Select2>
						</client-only>
					</div>
					<ScTextarea
						v-model="replay.message"
						:cols="30"
						:rows="4"
						placeholder="Reply message..."
						extra-classes="uk-margin-top"
					>
					</ScTextarea>
					<div class="uk-margin-small-top">
						<button class="sc-button sc-button-primary">
							Send
						</button>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import ScTextarea from '~/components/Textarea'
import moment from '~/plugins/moment'

export default {
	name: 'PagesMailboxId',
	components: {
		Select2: process.client ? () => import('~/components/Select2') : null,
		ScTextarea
	},
	validate ({ params }) {
		return ( typeof params.id !== 'undefined')
	},
	data: () => ({
		replay: {
			to: [],
		}
	}),
	head () {
		return {
			'title': 'Scutum Admin - pages/mailbox/ - ' + this.$route.params.id
		}
	},
	computed: {
		message () {
			let id = this.$route.params.id;
			let message = this.$parent.messages.filter(k => {
				return k.id === id;
			});
			return message[0];
		},
		emails () {
			return [
				{ id: '0', text: this.message.sender },
				{ id: '1', text: 'ldare@gmail.com'},
				{ id: '2', text: 'jonathon.mueller@yundt.com'},
				{ id: '3', text: 'icummings@gmail.com'}
			]
		},
		id () {
			return this.$route.params.id
		}
	},
	created () {
		// if no message found back to mailbox
		if(!this.message) {
			this.$router.push({ name: 'pages-mailbox' });
		}
		// select sender email address (select2)
		this.replay.to.push(0)
	},
	mounted () {
		this.$parent.showMessages = false;
	},
	methods: {
		delayTransition (el, delay) {
			el.style.transitionDelay = delay + "ms";
		}
	}
}
</script>
