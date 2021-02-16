<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<div class="uk-child-width-1-5@l uk-child-width-1-3@m uk-grid-divider uk-grid" data-uk-grid>
						<div>
							<p class="uk-text-large">
								Default
							</p>
							<button class="sc-button" @click="showNotification(notification.default)">
								Click
							</button>
						</div>
						<div>
							<p class="uk-text-large">
								Persistent
							</p>
							<button class="sc-button" @click="showNotification(notification.persistent, false, false, true)">
								Click
							</button>
						</div>
						<div>
							<p class="uk-text-large">
								With icon
							</p>
							<button class="sc-button" @click="showNotification(notification.withIcon)">
								Click
							</button>
						</div>
						<div>
							<p class="uk-text-large">
								Long text
							</p>
							<button class="sc-button" @click="showNotification(notification.long)">
								Click
							</button>
						</div>
						<div>
							<p class="uk-text-large">
								With link
							</p>
							<button class="sc-button" @click="showNotification(notification.withLink)">
								Click
							</button>
						</div>
					</div>
					<h4 class="uk-margin-large-top uk-heading-line">
						<span>Posititions</span>
					</h4>
					<div class="uk-child-width-auto@m uk-grid-divider" data-uk-grid>
						<div>
							<button class="sc-button" @click="showNotification(notification.default, 'top-left')">
								Top Left
							</button>
						</div>
						<div>
							<button class="sc-button" @click="showNotification(notification.default, 'top-center')">
								Top Center
							</button>
						</div>
						<div>
							<button class="sc-button" @click="showNotification(notification.default, 'top-right')">
								Top Right
							</button>
						</div>
						<div>
							<button class="sc-button" @click="showNotification(notification.default, 'bottom-left')">
								Bottom Left
							</button>
						</div>
						<div>
							<button class="sc-button" @click="showNotification(notification.default, 'bottom-center')">
								Bottom Center
							</button>
						</div>
						<div>
							<button class="sc-button" @click="showNotification(notification.default, 'bottom-right')">
								Bottom Right
							</button>
						</div>
					</div>
					<h4 class="uk-margin-large-top uk-heading-line">
						<span>Status</span>
					</h4>
					<div class="uk-child-width-auto@m uk-grid-divider" data-uk-grid>
						<div>
							<button class="sc-button" @click="showNotification(notification.default, false, 'primary')">
								Primary
							</button>
						</div>
						<div>
							<button class="sc-button" @click="showNotification(notification.default, false, 'success')">
								Success
							</button>
						</div>
						<div>
							<button class="sc-button" @click="showNotification(notification.default, false, 'danger')">
								Danger
							</button>
						</div>
						<div>
							<button class="sc-button" @click="showNotification(notification.default, false, 'warning')">
								Warning
							</button>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ComponentsNotifications',
	data: () => ({
		notification: {
			default: 'My message',
			persistent: 'My persistent message',
			withIcon: '<div class="uk-flex uk-flex-middle"><i class="mdi mdi-check-all uk-margin-right md-color-light-green-400"></i>Message</div>',
			long: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, labore laudantium eaque obcaecati',
			withLink: '<div class="uk-flex uk-flex-middle"><span class="uk-flex-1">Message deleted!</span><a href="javascript:void(0)" class="md-color-amber-500 uk-margin-small-left">undo</a></div>'
		}
	}),
	methods: {
		showNotification (text, pos, status, persistent) {
			var config = {};
			config.timeout = persistent ? !persistent : 3000;
			if(status) {
				config.status = status;
			}
			if(pos) {
				config.pos = pos;
			}
			UIkit.notification(text, config);
		}
	}
}
</script>
