<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="sc-theme-dark-info uk-margin-bottom">
				Dark mode for the CKEditor rich text editor - <a href="https://ckeditor.com/cke4/addon/moono-dark">https://ckeditor.com/cke4/addon/moono-dark</a>
			</div>
			<client-only>
				<ckeditor v-model="editorData" :editor="editor" :config="editorConfig"></ckeditor>
			</client-only>
			<ScCard class="uk-margin-top">
				<ScCardBody>
					<!-- eslint-disable-next-line vue/no-v-html -->
					<div v-html="editorData"></div>
				</ScCardBody>
			</ScCard>
			<pre class="uk-margin-top"><code>{{ editorData }}</code></pre>
		</div>
	</div>
</template>

<script>
if(process.client) {
	require('~/plugins/ckeditor');
}
export default {
	name: 'FormsWysiwygCkeditor',
	data: () => ({
		editorData: '<h1>Header</h1>\n' +
			'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consequuntur deleniti ducimus, eos fugit, mollitia neque praesentium quia quisquam quos sapiente voluptatem voluptatibus voluptatum. Assumenda consectetur deleniti doloremque fuga harum illum molestiae nisi possimus quidem vero. A accusantium alias aliquam animi cum doloremque eos est facilis illo, illum inventore ipsam itaque laboriosam maiores modi mollitia necessitatibus nemo non omnis perferendis quam quia, repellendus rerum vel veritatis voluptas voluptate?</p>\n' +
			'<p><a href="https://themeforest.com">themeforest.com</a></p>',
		editorConfig: {}
	}),
	computed: {
		editor () {
			return process.client ? require('@ckeditor/ckeditor5-build-classic') : null
		}
	}
}
</script>
