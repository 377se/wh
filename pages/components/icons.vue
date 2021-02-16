<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard id="nav-mdi">
				<ScCardTitle class="md-color-grey-500">
					Material Design Icons
				</ScCardTitle>
				<ScCardBody>
					<div class="uk-grid-divider uk-grid" data-uk-grid>
						<div class="uk-width-1-3@l">
							<h5>Usage</h5>
							<div class="uk-child-width-auto uk-grid" data-uk-grid>
								<i class="mdi mdi-monitor-dashboard"></i>
								<i class="mdi mdi-account"></i>
								<i class="mdi mdi-book-open-variant"></i>
								<i class="mdi mdi-comment-processing-outline"></i>
							</div>
							<pre v-highlightjs><code>&lt;i class=&quot;mdi mdi-monitor-dashboard&quot;&gt;&lt;&#x2F;i&gt;
&lt;i class=&quot;mdi mdi-account&quot;&gt;&lt;&#x2F;i&gt;
&lt;i class=&quot;mdi mdi-book-open-variant&quot;&gt;&lt;&#x2F;i&gt;
&lt;i class=&quot;mdi mdi-comment-processing-outline&quot;&gt;&lt;&#x2F;i&gt;
</code></pre>
							<hr>
							<h5>Colors</h5>
							<div class="uk-child-width-auto uk-grid" data-uk-grid>
								<i class="mdi mdi-monitor-dashboard md-color-red-600"></i>
								<i class="mdi mdi-account md-color-light-green-600"></i>
								<i class="mdi mdi-book-open-variant md-color-indigo-600"></i>
								<i class="mdi mdi-comment-processing-outline md-color-cyan-600"></i>
							</div>
							<pre v-highlightjs><code>&lt;i class=&quot;mdi mdi-monitor-dashboard md-color-red-600&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;mdi mdi-account md-color-light-green-600&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;mdi mdi-book-open-variant md-color-indigo-600&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;mdi mdi-comment-processing-outline md-color-cyan-600&quot;&gt;&lt;/i&gt;</code></pre>
						</div>
						<div class="uk-width-2-3@l">
							<h5>Sizes</h5>
							<div class="uk-child-width-auto@s uk-grid uk-flex-middle" data-uk-grid>
								<i class="mdi mdi-heart-outline sc-icon-18"></i>
								<i class="mdi mdi-heart-outline sc-icon-20"></i>
								<i class="mdi mdi-heart-outline sc-icon-22"></i>
								<i class="mdi mdi-heart-outline sc-icon-24"></i>
								<i class="mdi mdi-heart-outline sc-icon-28"></i>
								<i class="mdi mdi-heart-outline sc-icon-32"></i>
								<i class="mdi mdi-heart-outline sc-icon-36"></i>
								<i class="mdi mdi-heart-outline sc-icon-48"></i>
							</div>
							<pre v-highlightjs><code>&lt;i class=&quot;mdi mdi-heart-outline sc-icon-18&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;mdi mdi-heart-outline sc-icon-20&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;mdi mdi-heart-outline sc-icon-22&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;mdi mdi-heart-outline sc-icon-24&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;mdi mdi-heart-outline sc-icon-28&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;mdi mdi-heart-outline sc-icon-32&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;mdi mdi-heart-outline sc-icon-36&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;mdi mdi-heart-outline sc-icon-48&quot;&gt;&lt;/i&gt;</code></pre>
							<hr>
							<h5>Modifiers</h5>
							<div class="uk-child-width-auto@s uk-grid-small uk-grid" data-uk-grid>
								<i class="mdi mdi-loading mdi-spin"></i>
								<i class="mdi mdi-account-alert-outline"></i>
								<i class="mdi mdi-account-alert-outline mdi-flip-h"></i>
								<i class="mdi mdi-account-alert-outline mdi-flip-v"></i>
								<i class="mdi mdi-account-alert-outline mdi-rotate-90"></i>
								<i class="mdi mdi-account-alert-outline mdi-rotate-225"></i>
							</div>
						</div>
					</div>
					<hr>
					<div id="sc-sticky-wrapper">
						<div class="uk-flex-middle uk-margin uk-grid" data-uk-grid>
							<div class="uk-flex-1">
								<h5 class="uk-margin-remove">
									Icons<span class="sc-sub-heading">
										Click on icon to get HTML code
									</span>
								</h5>
							</div>
							<div class="uk-width-1-3@s">
								<client-only>
									<div data-uk-sticky="offset: 64; bottom: #sc-sticky-wrapper" class="sc-el-sticky sc-round">
										<ScInput
											v-model="mdIconsSearch"
											:mode="'outline'"
											:type="'search'"
											:placeholder="'Search (min. 3 char) ...'"
										>
											<i class="mdi mdi-magnify uk-form-icon"></i>
											<a v-if="mdIconsSearch !== '' && mdIconsSearch.length > 2" href="javascript:void(0)" class="uk-form-icon uk-form-icon-flip" @click.prevent="clearSearch"><i class="mdi mdi-close"></i></a>
										</ScInput>
									</div>
								</client-only>
							</div>
						</div>
						<div class="uk-child-width-auto uk-flex uk-flex-wrap">
							<div v-for="icon in mdIcons" :key="icon.hex">
								<div v-show="icon.visible" v-clipboard-mdi="icon.name" class="uk-flex sc-js-mdi-code sc-el-clickable sc-el-hoverable sc-padding-medium uk-border-rounded" :title="icon.name +' '+ icon.hex">
									<i class="mdi" :class="'mdi-' + icon.name"></i>
								</div>
							</div>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
			<ScCard id="nav-uikitIcons" class="uk-margin-top">
				<ScCardTitle>
					UIKit icons
				</ScCardTitle>
				<ScCardBody>
					<h5>Usage</h5>
					<div class="uk-child-width-1-2@l uk-grid-divider uk-grid" data-uk-grid>
						<div data-uk-margin>
							<span data-uk-icon="icon: image"></span>
							<span data-uk-icon="icon: image; ratio: 1.5"></span>
							<span data-uk-icon="icon: image; ratio: 2"></span>
							<span data-uk-icon="icon: image; ratio: 3"></span>
							<span data-uk-icon="icon: image; ratio: 4"></span>
							<pre v-highlightjs><code>&lt;span uk-icon=&quot;icon: image&quot;&gt;&lt;/span&gt;
&lt;span uk-icon=&quot;icon: image; ratio: 1.5&quot;&gt;&lt;/span&gt;
&lt;span uk-icon=&quot;icon: image; ratio: 2&quot;&gt;&lt;/span&gt;
&lt;span uk-icon=&quot;icon: image; ratio: 3&quot;&gt;&lt;/span&gt;
&lt;span uk-icon=&quot;icon: image; ratio: 4&quot;&gt;&lt;/span&gt;</code></pre>
						</div>
						<div>
							<a href="javascript:void(0)" class="uk-icon-link" data-uk-icon="icon: copy; ratio: 1.5"></a>
							<a href="javascript:void(0)" class="uk-icon-link" data-uk-icon="icon: file-edit; ratio: 1.5"></a>
							<a href="javascript:void(0)" class="uk-icon-link" data-uk-icon="icon: trash; ratio: 1.5"></a>
							<pre v-highlightjs><code>&lt;a href=&quot;#&quot; class=&quot;uk-icon-link-right&quot; uk-icon=&quot;icon: copy; ratio: 1.5&quot;&gt;&lt;/a&gt;
&lt;a href=&quot;#&quot; class=&quot;uk-icon-link-right&quot; uk-icon=&quot;icon: file-edit; ratio: 1.5&quot;&gt;&lt;/a&gt;
&lt;a href=&quot;#&quot; class=&quot;uk-icon-link&quot; uk-icon=&quot;icon: trash; ratio: 1.5&quot;&gt;&lt;/a&gt;</code></pre>
						</div>
					</div>
					<hr>
					<h5>
						Icons<span class="sc-sub-heading">
							Click on icon to get HTML code
						</span>
					</h5>
					<div class="uk-child-width-auto uk-flex-wrap uk-grid" data-uk-grid>
						<div v-for="icon in UIkitIcons" :key="icon.name">
							<div v-clipboard-uikit="icon.name" class="sc-padding sc-el-clickable sc-el-hoverable uk-border-rounded" :title="icon.name">
								<span :data-uk-icon="'icon:' + icon.name + '; ratio: 1.4'"></span>
							</div>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
import UIkitIcons from '~/data/pages/uikit-icons.json'
import ScInput from '~/components/Input'
var ClipboardJS = require('clipboard');
require('~/plugins/highlight');

export default {
	name: 'ComponentsIcons',
	components: {
		ScInput
	},
	directives: {
		clipboardMdi: {
			inserted (el, binding) {
				var clipboardMdi = new ClipboardJS(el, {
					text (trigger) {
						return '<i class="mdi mdi-' + binding.value.trim() + '"></i>';
					}
				});
				clipboardMdi.on('success', function (e) {
					UIkit.notification({
						message: '<div class="uk-flex uk-flex-middle"><span class="uk-margin-right">' + e.text + '</span><span class="uk-flex-1 uk-text-center">copied to clipboard</span></div>',
						timeout: 5000
					});
				});
			}
		},
		clipboardUikit: {
			inserted (el, binding) {
				var clipboardUIkit = new ClipboardJS(el, {
					text (trigger) {
						return '<span data-uk-icon="' + binding.value + '"></span>';
					}
				});
				clipboardUIkit.on('success', function (e) {
					UIkit.notification({
						message: '<div class="uk-flex uk-flex-middle"><span class="uk-margin-right">' + e.text + '</span><span class="uk-flex-1 uk-text-center">copied to clipboard</span></div>',
						timeout: 5000
					});
				});
			}
		}
	},
	async asyncData () {
		let data = require('~/assets/js/utils/mdIcons.js').default;
		return { mdIcons: data }
	},
	data: () => ({
		UIkitIcons,
		mdIconsSearch: ''
	}),
	watch: {
		mdIconsSearch (val) {
			this.mdIcons.forEach(icon => {
				if (val !== '' && val.length > 2) {
					icon.visible = icon.name.toLowerCase().includes(val.toLowerCase());
				} else {
					icon.visible = true
				}
			})
		}
	},
	mounted () {
	  console.log(this.mdIcons);
	},
	methods: {
		clearSearch () {
			this.mdIconsSearch = '';
		}
	},
}
</script>
