<template xmlns:v-quill="http://www.w3.org/1999/xhtml">
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<client-only>
				<div v-quill:myQuillEditor="editorOption"
					class="quill-editor"
					:content="content"
					@change="onEditorChange($event)"
					@blur="onEditorBlur($event)"
					@focus="onEditorFocus($event)"
					@ready="onEditorReady($event)"
				>
				</div>
			</client-only>
			<ScCard class="uk-margin-top">
				<ScCardBody>
					<!-- eslint-disable-next-line vue/no-v-html -->
					<div v-html="content"></div>
				</ScCardBody>
			</ScCard>
			<pre class="uk-margin-top"><code>{{ content }}</code></pre>
		</div>
	</div>
</template>

<script>
if(process.client) {
	require('~/plugins/quill');
}
export default {
	name: 'FormsWysiwygQuill',
	data () {
		return {
			content: '<h1>Header</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consequuntur deleniti ducimus, eos fugit, mollitia neque praesentium quia quisquam quos sapiente voluptatem voluptatibus voluptatum. Assumenda consectetur deleniti doloremque fuga harum illum molestiae nisi possimus quidem vero. A accusantium alias aliquam animi cum doloremque eos est facilis illo, illum inventore ipsam itaque laboriosam maiores modi mollitia necessitatibus nemo non omnis perferendis quam quia, repellendus rerum vel veritatis voluptas voluptate?</p><p><a href="https://themeforest.com/" target="_blank">themeforest.com</a></p>',
			editorOption: {
				modules: {
					toolbar: [
						['bold', 'italic', 'underline', 'strike'],
						['blockquote', 'code-block'],
						[{ 'header': 1 }, { 'header': 2 }],
						[{ 'list': 'ordered' }, { 'list': 'bullet' }],
						[{ 'script': 'sub' }, { 'script': 'super' }],
						[{ 'indent': '-1' }, { 'indent': '+1' }],
						[{ 'direction': 'rtl' }],
						[{ 'size': ['small', false, 'large', 'huge'] }],
						[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
						[{ 'font': [] }],
						[{ 'color': [] }, { 'background': [] }],
						[{ 'align': [] }],
						['clean'],
						['link', 'image', 'video']
					],
					imageResize: true
				}
			}
		}
	},
	mounted () {
		console.log('app init, my quill instance object is:', this.myQuillEditor)
	},
	methods: {
		onEditorBlur (editor) {
			console.log('editor blur!', editor)
		},
		onEditorFocus (editor) {
			console.log('editor focus!', editor)
		},
		onEditorReady (editor) {
			console.log('editor ready!', editor)
		},
		onEditorChange (event) {
			console.log('editor change!', event.editor, event.html, event.text);
			this.content = event.html
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/common/variables_mixins';
	.ql-editor {
		min-height: 200px;
		max-height: 400px;
		overflow-y: auto;
	}
	.ql-container {
		font-family: "Roboto", Arial, Helvetica, sans-serif;
		font-size: 14px;
	}
	.ql-toolbar {
		background: #eee;
	}
	.ql-container {
		background: #fff;
	}
	.ql-editor h1,
	.ql-editor h2,
	.ql-editor h3,
	.ql-editor h4 {
		margin-bottom: 8px;
	}
	.ql-snow.ql-toolbar button,
	.ql-snow .ql-toolbar button {
		padding: 4px 8px;
		height: 26px;
		width: 34px;
		transition: all 140ms ease;
	}
	.ql-snow.ql-toolbar button:hover,
	.ql-snow .ql-toolbar button:hover,
	.ql-snow.ql-toolbar button:focus,
	.ql-snow .ql-toolbar button:focus,
	.ql-snow.ql-toolbar button.ql-active,
	.ql-snow .ql-toolbar button.ql-active,
	.ql-snow.ql-toolbar .ql-picker-label:hover,
	.ql-snow .ql-toolbar .ql-picker-label:hover,
	.ql-snow.ql-toolbar .ql-picker-label.ql-active,
	.ql-snow .ql-toolbar .ql-picker-label.ql-active {
		background: rgba(0,0,0,.05);
		border-radius: 3px;
	}
	.ql-snow .ql-tooltip {
		z-index: 2000;
		@include box-shadow(4);
		border-radius: $border-radius;
		border: none;
		padding: 8px 12px;
	}
</style>
