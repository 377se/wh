export default function ({ route, redirect }) {
	if (route.path === '/') {
		redirect('/dashboard/v1')
	}
	if (route.path === '/forms' || route.path === '/forms/') {
		redirect('/forms/regular_elements')
	}
	if (route.path === '/forms/advanced_elements' || route.path === '/forms/advanced_elements/') {
		redirect('/forms/advanced_elements/checkbox_radio')
	}
	if (route.path === '/forms/examples' || route.path === '/forms/examples/') {
		redirect('/forms/examples/advertising_evaluation_form')
	}
	if (route.path === '/forms/wysiwyg' || route.path === '/forms/wysiwyg/') {
		redirect('/forms/wysiwyg/quill')
	}
	if (route.path === '/components' || route.path === '/components/') {
		redirect('/components/accordion')
	}
	if (route.path === '/pages' || route.path === '/pages/') {
		redirect('/pages/blank')
	}
	if (route.path === '/plugins' || route.path === '/plugins/') {
		redirect('/plugins/ajax')
	}
	if (route.path === '/pages/mailbox/message' || route.path === '/pages/mailbox/message/') {
		redirect('/pages/mailbox')
	}
	if (route.path === '/pages/issues' || route.path === '/pages/issues/') {
		redirect('/pages/issues/list')
	}
	if (route.path === '/pages/issues/details' || route.path === '/pages/issues/details/') {
		redirect('/pages/issues/details/kLRh2kWI')
	}
}
