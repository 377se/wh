<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@l uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Raised buttons
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-grid-small uk-width-auto uk-grid" data-uk-grid>
								<div>
									<a v-waves.button class="sc-button" href="javascript:void(0)">
										Default
									</a>
								</div>
								<div>
									<a v-waves.button.light class="sc-button sc-button-primary" href="javascript:void(0)">
										Primary
									</a>
								</div>
								<div>
									<a v-waves.button.light class="sc-button sc-button-secondary" href="javascript:void(0)">
										Secondary
									</a>
								</div>
								<div>
									<a v-waves.button.light class="sc-button sc-button-warning" href="javascript:void(0)">
										Warning
									</a>
								</div>
								<div>
									<a v-waves.button.light class="sc-button sc-button-success" href="javascript:void(0)">
										Success
									</a>
								</div>
								<div>
									<a v-waves.button.light class="sc-button sc-button-danger" href="javascript:void(0)">
										Danger
									</a>
								</div>
								<div>
									<a class="sc-button sc-button-disabled" href="javascript:void(0)">
										Disabled
									</a>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							Flat buttons
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-grid-small uk-width-auto uk-grid" data-uk-grid>
								<div>
									<a v-waves.button class="sc-button sc-button-default sc-button-flat" href="javascript:void(0)">
										Default
									</a>
								</div>
								<div>
									<a v-waves.button.primary class="sc-button sc-button-flat sc-button-flat-primary" href="javascript:void(0)">
										Primary
									</a>
								</div>
								<div>
									<a v-waves.button.warning class="sc-button sc-button-flat sc-button-flat-warning" href="javascript:void(0)">
										Warning
									</a>
								</div>
								<div>
									<a v-waves.button.success class="sc-button sc-button-flat sc-button-flat-success" href="javascript:void(0)">
										Success
									</a>
								</div>
								<div>
									<a v-waves.button.danger class="sc-button sc-button-flat sc-button-flat-danger" href="javascript:void(0)">
										Danger
									</a>
								</div>
								<div>
									<a class="sc-button sc-button-default sc-button-flat sc-button-disabled" href="javascript:void(0)">
										Disabled
									</a>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							Outline buttons
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-grid-small uk-width-auto uk-grid" data-uk-grid>
								<div>
									<a v-waves.button class="sc-button sc-button-default sc-button-outline" href="javascript:void(0)">
										Default
									</a>
								</div>
								<div>
									<a v-waves.button.primary class="sc-button sc-button-outline sc-button-outline-primary" href="javascript:void(0)">
										Primary
									</a>
								</div>
								<div>
									<a v-waves.button.warning class="sc-button sc-button-outline sc-button-outline-warning" href="javascript:void(0)">
										Warning
									</a>
								</div>
								<div>
									<a v-waves.button.success class="sc-button sc-button-outline sc-button-outline-success" href="javascript:void(0)">
										Success
									</a>
								</div>
								<div>
									<a v-waves.button.danger class="sc-button sc-button-outline sc-button-outline-danger" href="javascript:void(0)">
										Danger
									</a>
								</div>
								<div>
									<a class="sc-button sc-button-default sc-button-outline sc-button-disabled" href="javascript:void(0)">
										Disabled
									</a>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							Custom Colors
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-grid-small uk-width-auto uk-grid" data-uk-grid>
								<div>
									<a v-waves.button.light class="sc-button sc-button-custom md-bg-purple-600" href="javascript:void(0)">
										Purple
									</a>
								</div>
								<div>
									<a v-waves.button.light class="sc-button sc-button-custom md-bg-blue-grey-600" href="javascript:void(0)">
										Blue Grey
									</a>
								</div>
								<div>
									<a v-waves.button.light class="sc-button sc-button-custom md-bg-lime-600" href="javascript:void(0)">
										Lime
									</a>
								</div>
								<div>
									<a v-waves.button.light class="sc-button sc-button-custom md-bg-brown-600" href="javascript:void(0)">
										Brown
									</a>
								</div>
								<div>
									<a v-waves.button.light class="sc-button sc-button-custom md-bg-grey-600" href="javascript:void(0)">
										Grey
									</a>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							Icons
						</ScCardTitle>
						<ScCardBody>
							<div>
								<div class="uk-width-auto uk-flex-middle uk-grid-medium uk-grid" data-uk-grid>
									<div>
										<button class="sc-button sc-button-flex">
											<span data-uk-icon="icon: sign-in" class="uk-margin-small-right"></span>
											Sign In
										</button>
									</div>
									<div>
										<button class="sc-button sc-button-flex sc-button-red">
											<span class="md-color-orange-600 uk-margin-small-right" data-uk-icon="icon: settings"></span>
											Settings
										</button>
									</div>
									<div>
										<button class="sc-button sc-button-flex">
											<i class="mdi mdi-chart-areaspline uk-margin-small-right"></i>
											Charts
										</button>
									</div>
								</div>
							</div>
							<hr>
							<div>
								<div class="uk-width-auto uk-flex-middle uk-grid-medium uk-grid" data-uk-grid>
									<div>
										<button class="sc-button sc-button-icon">
											<span data-uk-icon="icon: sign-in"></span>
										</button>
									</div>
									<div>
										<button class="sc-button sc-button-icon sc-button-red">
											<span class="md-color-orange-600" data-uk-icon="icon: settings"></span>
										</button>
									</div>
									<div>
										<button class="sc-button sc-button-icon sc-button-green">
											<span data-uk-icon="icon: server"></span>
										</button>
									</div>
									<div>
										<button class="sc-button sc-button-icon sc-button-mini">
											<span data-uk-icon="icon: more; ratio: 0.50"></span>
										</button>
									</div>
									<div>
										<button class="sc-button sc-button-default sc-button-icon sc-button-outline sc-button-small">
											<span data-uk-icon="icon: plus; ratio: 0.60"></span>
										</button>
									</div>
									<div>
										<button class="sc-button sc-button-default sc-button-icon sc-button-outline sc-button-flat sc-button-large">
											<span data-uk-icon="icon: question; ratio: 1.3"></span>
										</button>
									</div>
								</div>
							</div>
							<hr>
							<div>
								<div class="uk-width-auto uk-grid-medium uk-flex-middle uk-grid" data-uk-grid>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-icon md-bg-green-400">
											<i class="mdi mdi-phone-bluetooth md-color-white"></i>
										</a>
									</div>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-icon">
											<i class="mdi md-color-light-blue-600 mdi-account-alert"></i>
										</a>
									</div>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-icon">
											<i class="md-color-red-600 mdi mdi-sale"></i>
										</a>
									</div>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-icon sc-button-mini">
											<i class="mdi mdi-chart-arc"></i>
										</a>
									</div>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-icon sc-button-large">
											<i class="mdi mdi-comment"></i>
										</a>
									</div>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							UIkit buttons
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-grid-small uk-width-auto uk-grid" data-uk-grid>
								<div>
									<button class="uk-button uk-button-default">
										Default
									</button>
								</div>
								<div>
									<button class="uk-button uk-button-primary">
										Primary
									</button>
								</div>
								<div>
									<button class="uk-button uk-button-secondary">
										Secondary
									</button>
								</div>
								<div>
									<button class="uk-button uk-button-danger">
										Danger
									</button>
								</div>
							</div>
							<hr>
							<div class="uk-grid-small uk-width-auto uk-grid" data-uk-grid>
								<div>
									<button class="uk-button uk-button-text">
										.uk-button-text
									</button>
								</div>
								<div>
									<button class="uk-button uk-button-link">
										.uk-button-link
									</button>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Size modifiers
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-grid-small uk-width-auto uk-grid" data-uk-grid>
								<div>
									<button class="sc-button sc-button-mini">
										Mini button
									</button>
								</div>
								<div>
									<button class="sc-button sc-button-flat sc-button-flat-success sc-button-mini">
										Mini button
									</button>
								</div>
								<div>
									<button class="sc-button sc-button-outline sc-button-outline-danger sc-button-mini">
										Mini button
									</button>
								</div>
							</div>
							<div class="uk-grid-small uk-width-auto uk-margin-top uk-grid" data-uk-grid>
								<div>
									<button class="sc-button sc-button-small">
										Small button
									</button>
								</div>
								<div>
									<button class="sc-button sc-button-flat sc-button-flat-success sc-button-small">
										Small button
									</button>
								</div>
								<div>
									<button class="sc-button sc-button-outline sc-button-outline-danger sc-button-small">
										Small button
									</button>
								</div>
							</div>
							<div class="uk-grid-small uk-width-auto uk-margin-top uk-grid" data-uk-grid>
								<div>
									<button class="sc-button sc-button-large">
										Large button
									</button>
								</div>
								<div>
									<button class="sc-button sc-button-flat sc-button-flat-success sc-button-large">
										Large button
									</button>
								</div>
								<div>
									<button class="sc-button sc-button-outline sc-button-outline-danger sc-button-large">
										Large button
									</button>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							Width modifiers
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-margin">
								<button v-waves.button.light class="sc-button sc-button-primary uk-width-1-3">
									.uk-width-1-3
								</button>
							</div>
							<div class="uk-margin">
								<button v-waves.button.light class="sc-button sc-button-primary uk-width-1-2">
									.uk-width-1-2
								</button>
							</div>
							<button v-waves.button.light class="sc-button sc-button-primary uk-width-1-1">
								.uk-width-1-1
							</button>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							Button Group
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-margin">
								<div class="uk-button-group">
									<button class="sc-button">
										Button
									</button>
									<button class="sc-button">
										Button
									</button>
									<button class="sc-button uk-active">
										Button
									</button>
								</div>
							</div>
							<div class="uk-margin">
								<div class="uk-button-group">
									<button class="sc-button sc-button-secondary">
										Button
									</button>
									<button class="sc-button sc-button-secondary">
										Button
									</button>
									<button class="sc-button sc-button-secondary">
										Button
									</button>
								</div>
							</div>
							<div class="uk-margin">
								<div class="uk-button-group sc-button-group-outline">
									<button class="sc-button sc-button-default sc-button-outline">
										Button
									</button>
									<button class="sc-button sc-button-default sc-button-outline uk-active">
										Button
									</button>
									<button class="sc-button sc-button-default sc-button-outline">
										Button
									</button>
								</div>
							</div>
							<div>
								<div class="uk-button-group">
									<button class="sc-button">
										Dropdown
									</button>
									<div class="uk-inline">
										<button class="sc-button sc-button-icon">
											<i class="mdi mdi-chevron-down"></i>
										</button>
										<div data-uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true;">
											<ul class="uk-nav uk-dropdown-nav">
												<li class="uk-active">
													<a href="javascript:void(0)">
														Active
													</a>
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
												<li class="uk-nav-header">
													Header
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
												<li class="uk-nav-divider"></li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							Buttons Helpers
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-child-width-auto@m uk-grid" data-uk-grid>
								<div>
									<transition name="scale-up">
										<!-- eslint-disable-next-line vue/no-v-html -->
										<button v-show="btnReplacedContent" class="sc-button sc-button-flex" @click.prevent="buttonReplaceContent()" v-html="btnContent"></button>
									</transition>
									<span class="uk-form-help-block uk-margin-remove-left">
										Replace text
									</span>
								</div>
								<div>
									<button class="sc-button" :class="{'sc-button-progress': btn1Loading}" :disabled="btn1LoadingEnd" @click.prevent="showBtn1Loading()">
										<span v-if="!btn1LoadingEnd">Click Me</span>
										<ScProgressCircular v-else></ScProgressCircular>
									</button>
									<span class="uk-form-help-block uk-margin-remove-left">
										Loading effect
									</span>
								</div>
								<div>
									<button class="sc-button sc-button-primary" :class="{'sc-button-progress': btn2Loading}" :disabled="btn2LoadingEnd" @click.prevent="showBtn2Loading()">
										<span v-if="!btn2LoadingEnd">Click Me</span>
										<ScProgressCircular v-else light></ScProgressCircular>
									</button>
									<span class="uk-form-help-block uk-margin-remove-left">
										Loading effect (light)
									</span>
								</div>
								<div>
									<button class="sc-button" :class="{'sc-button-progress-overlay': btn3LoadingEnd}" :disabled="btn3LoadingEnd" @click.prevent="showBtn3Loading()">
										<span>Click Me</span>
										<transition name="scale-up">
											<span v-show="btn3Loading" class="sc-button-progress-layer">
												<ScProgressCircular></ScProgressCircular>
											</span>
										</transition>
									</button>
									<span class="uk-form-help-block uk-margin-remove-left">
										Loading effect (overlay)
									</span>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							Social Buttons
						</ScCardTitle>
						<ScCardBody>
							<div>
								<div class="uk-width-auto uk-grid-medium uk-grid" data-uk-grid>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-facebook sc-button-social">
											<i class="mdi mdi-facebook"></i>
										</a>
									</div>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-twitter sc-button-social">
											<i class="mdi mdi-twitter"></i>
										</a>
									</div>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-gplus sc-button-social">
											<i class="mdi mdi-google-plus"></i>
										</a>
									</div>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-twitch sc-button-social">
											<i class="mdi mdi-twitch"></i>
										</a>
									</div>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-youtube sc-button-social">
											<i class="mdi mdi-youtube"></i>
										</a>
									</div>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-linkedin sc-button-social">
											<i class="mdi mdi-linkedin"></i>
										</a>
									</div>
								</div>
							</div>
							<div class="uk-margin-medium-top">
								<div class="uk-grid-medium uk-width-auto uk-grid" data-uk-grid>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-facebook sc-button-social">
											<span>Sign in with</span><i class="mdi mdi-facebook"></i>
										</a>
									</div>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-twitter sc-button-social">
											<span>Sign in with</span><i class="mdi mdi-twitter"></i>
										</a>
									</div>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-gplus sc-button-social">
											<span>Sign in with</span><i class="mdi mdi-google-plus"></i>
										</a>
									</div>
									<div>
										<a href="javascript:void(0)" class="sc-button sc-button-youtube sc-button-social">
											<span>Watch it on</span><i class="mdi mdi-youtube"></i>
										</a>
									</div>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ScProgressCircular } from '~/components/progress'

export default {
	name: 'ComponentsButtons',
	components: {
		ScProgressCircular
	},
	data: () => ({
		btnReplacedContent: true,
		btnContent: 'Click Me',
		btn1Loading: false,
		btn2Loading: false,
		btn1LoadingEnd: false,
		btn2LoadingEnd: false,
		btn3Loading: false,
		btn3LoadingEnd: false
	}),
	methods: {
		showBtn1Loading () {
			this.btn1Loading = true;
			this.btn1LoadingEnd = true;
			setTimeout(() => {
				this.btn1Loading = false;
				setTimeout(() => {
					this.btn1LoadingEnd = false;
				}, 300)
			}, 1000)
		},
		showBtn2Loading () {
			this.btn2Loading = true;
			this.btn2LoadingEnd = true;
			setTimeout(() => {
				this.btn2Loading = false;
				setTimeout(() => {
					this.btn2LoadingEnd = false;
				}, 300)
			}, 1000)
		},
		showBtn3Loading () {
			this.btn3Loading = true;
			this.btn3LoadingEnd = true;
			setTimeout(() => {
				this.btn3Loading = false;
				setTimeout(() => {
					this.btn3LoadingEnd = false;
				}, 300)
			}, 1000)
		},
		buttonReplaceContent () {
			this.btnReplacedContent = false;
			setTimeout(() => {
				this.btnContent = 'New replaced text <i class="mdi mdi-emoticon-happy-outline uk-margin-small-left"></i>';
				this.btnReplacedContent = true;
			}, 1200)
		}
	}
}
</script>
