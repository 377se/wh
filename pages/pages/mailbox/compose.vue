<template>
	<div class="uk-height-1-1">
		<transition name="scale-up" appear>
			<div class="sc-message-compose sc-message-compose-single">
				<div class="uk-flex uk-height-1-1 sc-message-compose-wrapper">
					<div class="uk-width-expand uk-flex uk-flex-column">
						<div class="sc-message-head">
							<client-only>
								<Select2
									v-model="message.to"
									:options="emails"
									:settings="{ 'width': '100%', 'placeholder': 'Insert valid email address...', 'tags': true, 'tokenSeparators': [',',' '], 'createTag': 'emailAddress' }"
									multiple
								></Select2>
							</client-only>
							<div class="uk-margin-top">
								<ScInput v-model="message.subject">
									<label>Subject</label>
								</ScInput>
							</div>
						</div>
						<div class="sc-message-body">
							<ScTextarea
								v-model="message.content"
								:cols="30"
								:rows="4"
							>
								<label>Message</label>
							</ScTextarea>
						</div>
						<div class="sc-message-footer uk-margin-top">
							<div>
								<span class="uk-display-block uk-margin-small-bottom uk-text-muted uk-text-medium">Attachments:</span>
								<ul class="sc-message-attachments">
									<li class="sc-flex-no-shrink">
										<div class="sc-attachment">
											<a href="#">file1.png <span>(241KB)</span></a><a href="#" class="mdi mdi-close sc-attachment-remove"></a>
										</div>
									</li>
									<li class="sc-flex-no-shrink">
										<div class="sc-attachment">
											<a href="#">file2.pdf <span>(1240KB)</span></a><a href="#" class="mdi mdi-close sc-attachment-remove"></a>
										</div>
									</li>
								</ul>
							</div>
							<hr>
							<div>
								<button class="sc-button sc-button-primary">
									Send
								</button>
							</div>
						</div>
					</div>
					<div>
						<a href="javascript:void(0)" class="uk-margin-left mdi mdi-close sc-icon-square" @click="backToMailbox($event)"></a>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'

export default {
	name: 'PagesMailboxCompose',
	components: {
		Select2: process.client ? () => import('~/components/Select2') : null,
		ScInput,
		ScTextarea
	},
	data: () => ({
		message: {
			to: [],
			subject: '',
			content: ''
		},
		emails: [
			{ id: '1', text: 'ldare@gmail.com'},
			{ id: '2', text: 'jonathon.mueller@yundt.com'},
			{ id: '3', text: 'icummings@gmail.com'}
		]
	}),
	methods: {
		backToMailbox (e) {
			e.preventDefault();
			this.$router.push({ name: 'pages-mailbox' });
		}
	}
}
</script>
