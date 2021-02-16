<template>
	<div class="uk-card-footer" :class="{'sc-card-footer-separator': separator}">
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		separator: Boolean
	}
}
</script>
