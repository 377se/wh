<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-alert-warning uk-alert" data-uk-alert>
				To use this feature you need to run this example on LOCALHOST or use HTTPS protocol.
			</div>
			<ScCard>
				<ScCardBody>
					<button class="sc-button sc-button-primary" @click="sendNotification">
						Send notification
					</button>
					<button class="sc-button sc-button-primary uk-margin-left" @click="sendAnotherNotification">
						Send another notification
					</button>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
import push from 'push.js'

export default {
	name: 'PluginsPushNotifications',
	methods: {
		sendNotification () {
			push.create("Hello from Scutum template.", {
				body: "How's it hangin'?",
				icon: require('~/assets/img/avatars/avatar_05_md@2x.png'),
				timeout: 8000,
				onClick () {
					window.focus();
					this.close();
				}
			});
		},
		sendAnotherNotification () {
			push.create("Hello, this is a simple notification :)");
		}
	}
}
</script>
