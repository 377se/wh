<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<h1>Idle timeout</h1>
					<hr>
					<p class="uk-margin-remove">
						Keep your mouse and keyboard still!
					</p>
					<p class="uk-margin-remove">
						This plugin will display a modal to the user after 5 seconds of idleness.
					</p>
				</ScCardBody>
			</ScCard>
			<div id="idle-modal" data-uk-modal>
				<div class="uk-modal-dialog">
					<div class="uk-modal-body">
						<h3 class="uk-modal-title">
							Your session is about to expire!
						</h3>
						<hr>
						<p class="uk-margin-remove">
							You've been inactive for a while. For your security, we'll log you out automatically.
						</p>
						<p class="uk-margin-remove">
							Click "Stay Online" to continue your session.
						</p>
						<p>
							Your session will expire in
							<span id="sc-session-timer" class="sc-text-semibold md-color-red-600">
								{{ timeleft }}
							</span>
							second(s).
						</p>
					</div>
					<div class="uk-modal-footer uk-text-right">
						<button type="button" class="sc-button sc-button-default sc-button-flat uk-modal-close" @click="clearTimer">
							Stay Online
						</button>
						<button type="button" class="sc-button sc-button-outline sc-button-outline-primary uk-margin-small-left" @click="logout">
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
if(process.client) {
	require('~/plugins/idleTimeout');
}

export default {
	name: 'PluginsIdleTimeout',
	data: () => ({
		timeleft: 30,
		warningTimer: null
	}),
	onIdle () {
		UIkit.modal('#idle-modal').show();
		this.countDown()
	},
	onActive () {
	},
	methods: {
		countDown () {
			this.warningTimer = setInterval(() => {
				this.timeleft -= 1;
				if(this.timeleft <= 0) {
					this.logout()
				}
			}, 1000);
		},
		clearTimer () {
			clearInterval(this.warningTimer);
			UIkit.modal('#idle-modal').hide();
			this.timeleft = 30;
		},
		logout () {
			this.clearTimer();
			this.$router.push({
				path: '/login_page'
			})
		}
	}
}
</script>
