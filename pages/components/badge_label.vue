<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@l uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Badges
						</ScCardTitle>
						<ScCardBody>
							<div>
								<span class="uk-badge">
									28
								</span>
								<span class="uk-badge md-bg-red-600">
									152
								</span>
								<span class="uk-badge md-bg-green-600">
									336
								</span>
								<span class="uk-badge md-bg-orange-600">
									335
								</span>
								<span class="uk-badge md-bg-teal-600">
									390
								</span>
								<span class="uk-badge md-bg-blue-600">
									49
								</span>
								<span class="uk-badge md-bg-gray-600">
									390
								</span>
								<span class="uk-badge md-bg-purple-600">
									316
								</span>
								<span class="uk-badge md-bg-indigo-600">
									398
								</span>
							</div>
							<pre v-highlightjs><code>&lt;span class=&quot;uk-badge&quot;&gt;28&lt;/span&gt;
&lt;span class=&quot;uk-badge md-bg-red-600&quot;&gt;152&lt;/span&gt;
&lt;span class=&quot;uk-badge md-bg-green-600&quot;&gt;336&lt;/span&gt;
&lt;span class=&quot;uk-badge md-bg-orange-600&quot;&gt;335&lt;/span&gt;
&lt;span class=&quot;uk-badge md-bg-teal-600&quot;&gt;390&lt;/span&gt;
&lt;span class=&quot;uk-badge md-bg-blue-600&quot;&gt;49&lt;/span&gt;
&lt;span class=&quot;uk-badge md-bg-gray-600&quot;&gt;390&lt;/span&gt;
&lt;span class=&quot;uk-badge md-bg-purple-600&quot;&gt;316&lt;/span&gt;
&lt;span class=&quot;uk-badge md-bg-indigo-600&quot;&gt;398&lt;/span&gt;</code></pre>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Labels
						</ScCardTitle>
						<ScCardBody>
							<div>
								<span class="uk-label">
									Default
								</span>
								<span class="uk-label uk-label-success">
									Success
								</span>
								<span class="uk-label uk-label-warning">
									Warning
								</span>
								<span class="uk-label uk-label-danger">
									Danger
								</span>
								<span class="uk-label uk-label-outline">
									Outline
								</span>
							</div>
							<pre v-highlightjs><code>&lt;span class=&quot;uk-label&quot;&gt;Default&lt;/span&gt;
&lt;span class=&quot;uk-label uk-label-success&quot;&gt;Success&lt;/span&gt;
&lt;span class=&quot;uk-label uk-label-warning&quot;&gt;Warning&lt;/span&gt;
&lt;span class=&quot;uk-label uk-label-danger&quot;&gt;Danger&lt;/span&gt;
&lt;span class=&quot;uk-label uk-label-outline&quot;&gt;Outline&lt;/span&gt;</code></pre>
							<hr>
							<div>
								<span class="uk-label md-bg-orange-600">
									.md-bg-orange-600
								</span>
								<span class="uk-label md-bg-indigo-600">
									.md-bg-indigo-600
								</span>
								<span class="uk-label md-bg-green-600">
									.md-bg-green-600
								</span>
								<span class="uk-label md-bg-cyan-600">
									.md-bg-cyan-600
								</span>
								<span class="uk-label md-bg-pink-600">
									.md-bg-pink-600
								</span>
								<span class="uk-label md-bg-grey-600">
									.md-bg-grey-600
								</span>
								<span class="uk-label md-bg-light-blue-100 sc-color-primary">
									.md-bg-light-blue-100
								</span>
								<span class="uk-label md-bg-green-100 sc-color-primary">
									.md-bg-green-100
								</span>
							</div>
							<pre v-highlightjs><code>&lt;span class=&quot;uk-label md-bg-orange-600&quot;&gt;.md-bg-orange-600&lt;/span&gt;
&lt;span class=&quot;uk-label md-bg-indigo-600&quot;&gt;.md-bg-indigo-600&lt;/span&gt;
&lt;span class=&quot;uk-label md-bg-green-600&quot;&gt;.md-bg-green-600&lt;/span&gt;
&lt;span class=&quot;uk-label md-bg-cyan-600&quot;&gt;.md-bg-cyan-600&lt;/span&gt;
&lt;span class=&quot;uk-label md-bg-pink-600&quot;&gt;.md-bg-pink-600&lt;/span&gt;
&lt;span class=&quot;uk-label md-bg-grey-600&quot;&gt;.md-bg-grey-600&lt;/span&gt;
&lt;span class=&quot;uk-label md-bg-light-blue-100 sc-color-primary&quot;&gt;.md-bg-light-blue-100&lt;/span&gt;
&lt;span class=&quot;uk-label md-bg-green-100 sc-color-primary&quot;&gt;.md-bg-green-100&lt;/span&gt;</code></pre>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
require('~/plugins/highlight');

export default {
	name: 'ComponentsBadgeLabel',
}
</script>
