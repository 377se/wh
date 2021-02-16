<template>
	<h5 class="uk-flex uk-flex-middle md-color-grey-500 uk-height-1-1 uk-flex-center">
		Open invoice from the list.
	</h5>
</template>

<script>
import { scMq } from '~/assets/js/utils';

export default {
	name: 'PagesInvoicesIndex',
	data: () => ({
		notify: null
	}),
	mounted () {
		// show notification
		this.notify = UIkit.notification('<span class="md-color-red-400 mdi mdi-alert-outline uk-margin-small-right"></span> There are 3 unpaid invoices', {
			pos: scMq.mediumMin() ? 'bottom-left' : 'top-center'
		});
	},
	beforeDestroy () {
		// close notification
		this.notify.close(true);
	}
}
</script>
