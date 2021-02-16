<template>
	<div id="sc-page-wrapper">
		<client-only>
			<div id="sc-page-top-bar" class="sc-top-bar" data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium">
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
						Animations
					</h1>
					<div class="uk-width-1-2 uk-width-1-3@s uk-width-1-5@m">
						<client-only>
							<Select2
								v-model="animationDuration"
								:options="durations"
								:settings="{ 'width': '100%', 'minimumResultsForSearch': -1, 'placeholder': 'Select duration...' }"
								@change="changeDuration($event)"
							></Select2>
						</client-only>
					</div>
				</div>
			</div>
		</client-only>
		<div id="sc-page-content" class="uk-flex uk-flex-center">
			<div class="uk-width-2-3@l">
				<div :class="{'sc-animation-slow': animationSlow, 'sc-animation-fast': animationFast, 'sc-animation-very-slow': animationVerySlow}">
					<div class="uk-child-width-1-2 uk-child-width-1-6@s uk-grid-match uk-grid-medium uk-grid" data-uk-grid>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-fade">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Fade
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-scale-up">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Scale Up
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-scale-down">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Scale Down
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-shake">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Shake
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-left">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Left
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-top">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Top
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-bottom">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Bottom
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-right">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Right
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-left-small">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Left Small
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-top-small">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Top Small
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-bottom-small">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Bottom Small
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-right-small">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Right Small
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-left-medium">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Left Medium
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-top-medium">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Top Medium
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-bottom-medium">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Bottom Medium
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-right-medium">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Right Medium
									</p>
								</ScCardBody>
							</ScCard>
						</div>
					</div>
				</div>
				<pre v-highlightjs><code>&lt;div class=&quot;uk-animation-fade&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-scale-up&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-scale-down&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-shake&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-left&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-top&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-bottom&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-right&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-left-small&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-top-small&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-bottom-small&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-right-small&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-left-medium&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-top-medium&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-bottom-medium&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-right-medium&quot;&gt;&lt;/div&gt;
</code></pre>
				<h5 class="uk-margin-medium-top">
					Reverse modifier
				</h5>
				<div :class="{'sc-animation-slow': animationSlow, 'sc-animation-fast': animationFast, 'sc-animation-very-slow': animationVerySlow}">
					<div class="uk-child-width-1-2 uk-child-width-1-6@s uk-grid-match sc-js-animations-grid uk-grid-medium uk-grid" data-uk-grid>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-fade uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Fade
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-scale-up uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Scale Up
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-scale-down uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Scale Down
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-shake uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Shake
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-left uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Left
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-top uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Top
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-bottom uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Bottom
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-right uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Right
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-left-small uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Left Small
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-top-small uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Top Small
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-bottom-small uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Bottom Small
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-right-small uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Right Small
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-left-medium uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Left Medium
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-top-medium uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Top Medium
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-bottom-medium uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Bottom Medium
									</p>
								</ScCardBody>
							</ScCard>
						</div>
						<div class="uk-animation-toggle">
							<ScCard class="uk-flex uk-height-small uk-flex-middle uk-flex-center uk-animation-slide-right-medium uk-animation-reverse">
								<ScCardBody>
									<p class="uk-text-center uk-text-medium">
										Slide Right Medium
									</p>
								</ScCardBody>
							</ScCard>
						</div>
					</div>
				</div>
				<pre v-highlightjs><code>&lt;div class=&quot;uk-animation-fade uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-scale-up uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-scale-down uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-shake uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-left uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-top uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-bottom uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-right uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-left-small uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-top-small uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-bottom-small uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-right-small uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-left-medium uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-top-medium uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-bottom-medium uk-animation-reverse&quot;&gt;&lt;/div&gt;
&lt;div class=&quot;uk-animation-slide-right-medium uk-animation-reverse&quot;&gt;&lt;/div&gt;
</code></pre>
			</div>
		</div>
	</div>
</template>

<script>
require('~/plugins/highlight');

export default {
	name: 'ComponentsAnimations',
	components: {
		Select2: process.client ? () => import('~/components/Select2') : null
	},
	data: () => ({
		animationDuration: '',
		animationFast: false,
		animationSlow: false,
		animationVerySlow: false,
		durations: [
			{
				id: 'animation-default',
				text: 'Default'
			},
			{
				id: 'animation-fast',
				text: 'Fast'
			},
			{
				id: 'animation-slow',
				text: 'Slow'
			},
			{
				id: 'animation-very-slow',
				text: 'Very Slow'
			}
		]
	}),
	methods: {
		changeDuration (val) {
			this.animationFast = false;
			this.animationSlow = false;
			this.animationVerySlow = false;
			if(val === 'animation-fast') {
				this.animationFast = true;
			}
			if(val === 'animation-slow') {
				this.animationSlow = true;
			}
			if(val === 'animation-very-slow') {
				this.animationVerySlow = true;
			}
		}
	}
}
</script>
