<template>
	<span class="sc-avatar-initials" :class="[bg, color, avatarSize]">
		{{ initials | toUppercase }}
	</span>
</template>

<script>
export default {
	name: 'ScAvatarInitials',
	props: {
		initials: {
			type: String,
			default: '',
			required: true
		},
		size: {
			type: String,
			default: ''
		},
		bg: {
			type: String,
			default: ''
		},
		color: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: ''
		}
	},
	computed: {
		avatarSize () {
			return this.size !== '' ? 'sc-avatar-initials-' + this.size : ''
		}
	}
}
</script>
