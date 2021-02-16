<template>
	<div class="uk-display-inline-block">
		<div v-if="status" class="sc-avatar-wrapper" :class="wrapperClass">
			<span class="sc-user-status" :class="status"></span>
			<img :src="avatarSrc" :alt="alt" class="sc-avatar" :class="extraClass">
		</div>
		<img
			v-if="!status"
			:src="avatarSrc"
			:alt="alt"
			class="sc-avatar"
			:class="extraClass"
		>
	</div>
</template>

<script>
export default {
	name: 'ScAvatar',
	props: {
		avatarId: {
			type: Number,
			default: 1,
			required: true
		},
		size: {
			type: String,
			default: 'sm'
		},
		alt: {
			type: String,
			default: ''
		},
		status: {
			type: String,
			default: null
		},
		extraClass: {
			type: String,
			default: ''
		}
	},
	computed: {
		'avatarSrc' () {
			return require('~/assets/img/avatars/avatar_0' + this.avatarId + (this.size === '_default' ? '' : '_' + this.size) + '.png')
		},
		'wrapperClass' () {
			return 'sc-avatar-wrapper-' + (this.size === '_default' ? '' : this.size)
		}
	}
}
</script>
