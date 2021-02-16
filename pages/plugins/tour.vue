<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<button id="sc-tour-restart" class="sc-button sc-button-primary" @click="startTour">
						Restart tour
					</button>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardBody>
					<h5 class="uk-margin-medium">
						Highlighting a Single Element – Without Popover
					</h5>
					<div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
						<div>
							<div id="sc-tour-singleEl-noPopover">
								<button class="sc-button sc-button-primary" @click="highlightEl">
									Show
								</button>
								<pre v-highlightjs><code>this.highlightDriver = new Driver({
	opacity: 0.6,
	closeBtnText: ''
});

@click="highlightEl"

highlightEl () {
	this.highlightDriver.highlight('#sc-tour-singleEl-noPopover');
}</code></pre>
							</div>
						</div>
						<div>
							<div ref="input-a" class="uk-margin-small sc-tour-singleEl-noPopover">
								<ScInput v-model="tourInputA" @focus="focusEl('input-a')">
									<label>Focus any of the input</label>
								</ScInput>
							</div>
							<div ref="input-b" class="uk-margin-small sc-tour-singleEl-noPopover">
								<ScInput v-model="tourInputB" @focus="focusEl('input-b')">
									<label>Focus any of the input</label>
								</ScInput>
							</div>
							<div ref="input-c" class="uk-margin-small sc-tour-singleEl-noPopover">
								<ScInput v-model="tourInputC" @focus="focusEl('input-c')">
									<label>Focus any of the input</label>
								</ScInput>
							</div>
							<div ref="input-d" class="uk-margin-small sc-tour-singleEl-noPopover">
								<ScInput v-model="tourInputD" @focus="focusEl('input-d')">
									<label>Focus any of the input</label>
								</ScInput>
							</div>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardBody>
					<div class="uk-child-width-1-2@m" data-uk-grid="">
						<div>
							<h5 class="uk-margin-large">
								Highlighting a Single Element – With Popover
							</h5>
							<div>
								<button class="sc-button sc-button-primary" @click="popoverEl">
									Show
								</button>
								<pre v-highlightjs><code>this.popoverDriver = new Driver({
	opacity: 0.6,
	closeBtnText: ''
});

 @click="popoverEl"

 popoverEl (e) {
	this.popoverDriver.highlight({
		element: e.target.closest("div"),
		popover: {
			title: 'Title for the Popover',
			description: 'Description for highlighted element',
			position: 'top'
		}
	})
}</code></pre>
							</div>
						</div>
						<div>
							<h5 class="uk-margin-large">
								Popover Positioning
							</h5>
							<div>
								<div class="sc-padding-small uk-display-inline-block">
									<button class="sc-button" @click="popoverElPos($event, 'left')">
										Left
									</button>
								</div>
								<div class="sc-padding-small uk-display-inline-block">
									<button class="sc-button" @click="popoverElPos($event, 'left-center')">
										Left Center
									</button>
								</div>
								<div class="sc-padding-small uk-display-inline-block">
									<button class="sc-button" @click="popoverElPos($event, 'left-bottom')">
										Left Bottom
									</button>
								</div>
							</div>
							<div class="uk-margin-small-top">
								<div class="sc-padding-small uk-display-inline-block">
									<button class="sc-button" @click="popoverElPos($event, 'top')">
										Top
									</button>
								</div>
								<div class="sc-padding-small uk-display-inline-block">
									<button class="sc-button" @click="popoverElPos($event, 'top-center')">
										Top Center
									</button>
								</div>
								<div class="sc-padding-small uk-display-inline-block">
									<button class="sc-button" @click="popoverElPos($event, 'top-right')">
										Top Right
									</button>
								</div>
							</div>
							<div class="uk-margin-small-top">
								<div class="sc-padding-small uk-display-inline-block">
									<button class="sc-button" @click="popoverElPos($event, 'right')">
										Right
									</button>
								</div>
								<div class="sc-padding-small uk-display-inline-block">
									<button class="sc-button" @click="popoverElPos($event, 'right-center')">
										Right Center
									</button>
								</div>
								<div class="sc-padding-small uk-display-inline-block">
									<button class="sc-button" @click="popoverElPos($event, 'right-bottom')">
										Right Bottom
									</button>
								</div>
							</div>
							<div class="uk-margin-small-top">
								<div class="sc-padding-small uk-display-inline-block">
									<button class="sc-button" @click="popoverElPos($event, 'bottom')">
										Bottom
									</button>
								</div>
								<div class="sc-padding-small uk-display-inline-block">
									<button class="sc-button" @click="popoverElPos($event, 'bottom-center')">
										Bottom Center
									</button>
								</div>
								<div class="sc-padding-small uk-display-inline-block">
									<button class="sc-button" @click="popoverElPos($event, 'bottom-right')">
										Bottom Right
									</button>
								</div>
							</div>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
import { scMq } from '~/assets/js/utils';
import ScInput from '~/components/Input'

require('~/plugins/jquery');
require('~/plugins/highlight');

require('driver.js/dist/driver.min.css');

export default {
	name: 'PluginsTour',
	components: {
		ScInput
	},
	data: () => ({
		tour: null,
		highlightDriver: null,
		focusDriver: null,
		popoverDriver: null,
		popoverPosDriver: null,
		tourInputA: '',
		tourInputB: '',
		tourInputC: '',
		tourInputD: ''
	}),
	mounted () {
		this.$nextTick(() => {
			const Driver = require('driver.js');
			// page tour
			this.tour = new Driver({
				opacity: 0.6,
				padding: 0,
				allowClose: false,
				closeBtnText: '',
				nextBtnText: 'Next',
				prevBtnText: 'Previous'
			});
			// define the steps
			var steps = scMq.mediumMax()
				? [
					{
						element: '#sc-header',
						popover: {
							title: 'Main Header',
							description: 'Here is the main header.',
							position: 'bottom-center',
							offset: 0
						}
					},
					{
						element: '#sc-sidebar-main-toggle',
						popover: {
							title: 'Main Sidebar',
							description: 'Here you can toggle main sidebar.',
							position: 'bottom-left',
							offset: -8
						}
					},
					{
						element: '#sc-search-main-toggle-mobile',
						popover: {
							title: 'Main Search',
							description: 'Here you can toggle search form.',
							position: 'bottom-right',
							offset: 24
						}
					},
					{
						element: '#sc-tour-restart',
						popover: {
							title: 'Restart tour',
							description: 'Here you can restart tour.',
							position: 'bottom-left',
							offset: 0
						}
					}
				]
				: [
					{
						element: '#sc-header',
						popover: {
							title: 'Main Header',
							description: 'Here is the main header.',
							position: 'bottom-center',
							offset: 16
						}
					},
					{
						element: '#sc-sidebar-main',
						popover: {
							title: 'Main Sidebar',
							description: 'Here is the main sidebar with the main menu.',
							position: 'right',
							offset: 8
						}
					},
					{
						element: '#sc-js-fullscreen-toggle',
						popover: {
							title: 'Fullscreen toggle',
							description: 'Here you can toggle fullscreen mode.',
							position: 'bottom-right',
							offset: 8
						}
					},
					{
						element: '#sc-tour-restart',
						popover: {
							title: 'Restart tour',
							description: 'Here you can restart tour.',
							position: 'bottom-left',
							offset: 8
						}
					}
				];
			this.tour.defineSteps(steps);
			setTimeout(() => {
				// start the tour
				this.tour.start();
			}, 200);

			// highlight
			this.highlightDriver = new Driver({
				opacity: 0.6,
				closeBtnText: ''
			});

			// focus
			this.focusDriver = new Driver({
				opacity: 0.6,
				closeBtnText: ''
			});

			// popover
			this.popoverDriver = new Driver({
				opacity: 0.6,
				closeBtnText: ''
			});

			// popover position
			this.popoverPosDriver = new Driver({
				opacity: 0.6,
				padding: 0,
				closeBtnText: ''
			});
		});
	},
	methods: {
		startTour () {
			this.tour.start(0);
		},
		highlightEl () {
			this.highlightDriver.highlight('#sc-tour-singleEl-noPopover');
		},
		focusEl (el) {
			this.focusDriver.highlight(this.$refs[el]);
		},
		popoverEl (e) {
			this.popoverDriver.highlight({
				element: e.target.closest("div"),
				popover: {
					title: 'Title for the Popover',
					description: 'Description for highlighted element',
					position: 'top'
				}
			})
		},
		popoverElPos (e, pos) {
			this.popoverPosDriver.highlight({
				element: e.target.closest('div'),
				popover: {
					title: 'Title for the Popover',
					description: 'Description for popover.',
					position: pos
				}
			});
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/plugins/driver';
</style>
