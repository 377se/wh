<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<div>
						Name: {{ user.name }}
					</div>
					<div class="uk-margin-small-top uk-margin-bottom">
						Email: {{ user.email }}
					</div>
					<a class="sc-button sc-button-default sc-button-outline" href="javascript:void(0)" @click="$auth.logout()">
						Logout
					</a>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
export default {
	async asyncData ({ params, $axios }) {
		const user = await await $axios.$get('/api/user')
		return { user }
	},
	data: () => ({
		user: {}
	})
}
</script>
