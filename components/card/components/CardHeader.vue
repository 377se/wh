<template>
	<div class="uk-card-header" :class="{'sc-card-header-separator': separator}">
		<slot></slot>
	</div>
</template>

<script>
import { scDom } from '~/assets/js/utils'
const { height, hasClass } = scDom;
export default {
	props: {
		separator: Boolean
	},
	mounted () {
		if(this.separator) {
			if(hasClass(this.$parent.$el, 'uk-card')) {
				this.$parent.$emit('cardHeaderMounted', height(this.$el) / 2)
			}
		}
	}
}
</script>
