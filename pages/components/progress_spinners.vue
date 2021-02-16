<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@l uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Circular Progress
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-child-width-auto uk-grid-margin uk-flex-middle uk-grid" data-uk-grid>
								<div>
									<ScProgressCircular size="sm"></ScProgressCircular>
								</div>
								<div>
									<ScProgressCircular></ScProgressCircular>
								</div>
								<div>
									<ScProgressCircular size="lg"></ScProgressCircular>
								</div>
								<div>
									<ScProgressCircular size="sm" color="secondary"></ScProgressCircular>
								</div>
								<div>
									<ScProgressCircular color="secondary"></ScProgressCircular>
								</div>
								<div>
									<ScProgressCircular size="lg" color="secondary"></ScProgressCircular>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							UIkit Spinners
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-child-width-auto uk-grid-margin uk-flex-middle uk-grid" data-uk-grid>
								<div>
									<div data-uk-spinner="ratio: 0.6"></div>
								</div>
								<div>
									<div data-uk-spinner></div>
								</div>
								<div>
									<div data-uk-spinner="ratio: 3"></div>
								</div>
								<div>
									<div class="md-color-red-600" data-uk-spinner="ratio: 2"></div>
								</div>
								<div>
									<div class="md-color-blue-600" data-uk-spinner="ratio: 2"></div>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top uk-position-relative">
						<ScCardTitle>
							Overlay Spinners/Progress
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-height-medium uk-flex-bottom uk-flex">
								<div class="uk-child-width-auto@m uk-grid-margin uk-grid-medium uk-grid" data-uk-grid>
									<div>
										<button class="sc-button" @click="toggleRootOverlay()">
											Toggle Root Overlay
										</button>
									</div>
									<div>
										<button class="sc-button" @click="cardProgress = !cardProgress">
											Toggle Card Overlay
										</button>
									</div>
								</div>
							</div>
						</ScCardBody>
						<ScProgressOverlay :active="cardProgress"></ScProgressOverlay>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Linear Progress
						</ScCardTitle>
						<ScCardBody>
							<p class="sc-color-secondary uk-margin-small">
								Default
							</p>
							<ScProgressLinear>
								<ScProgressBar color="sc-theme-complementary-bg" :value="62"></ScProgressBar>
							</ScProgressLinear>
							<hr>
							<p class="sc-color-secondary uk-margin-small">
								Medium
							</p>
							<ScProgressLinear size="md">
								<ScProgressBar :value="21" color="md-bg-red-400"></ScProgressBar>
							</ScProgressLinear>
							<hr>
							<p class="sc-color-secondary uk-margin-small">
								Large
							</p>
							<ScProgressLinear size="lg">
								<ScProgressBar :value="21" color="md-bg-red-400"></ScProgressBar>
							</ScProgressLinear>
							<hr>
							<p class="sc-color-secondary uk-margin-small">
								Group
							</p>
							<div class="uk-margin-large-top">
								<ScProgressLinear group>
									<ScProgressBar :value="progressGroup.bar1" color="md-bg-red-400">
										<ScProgressLabel>
											{{ progressGroup.bar1 }}%
										</ScProgressLabel>
									</ScProgressBar>
									<ScProgressBar :value="progressGroup.bar2" color="md-bg-amber-400">
										<ScProgressLabel>
											{{ progressGroup.bar2 }}%
										</ScProgressLabel>
									</ScProgressBar>
									<ScProgressBar :value="progressGroup.bar3" color="md-bg-light-green-400">
										<ScProgressLabel>
											{{ progressGroup.bar3 }}%
										</ScProgressLabel>
									</ScProgressBar>
								</ScProgressLinear>
							</div>
							<hr>
							<div class="uk-margin-large-top">
								<ScProgressLinear>
									<template #label>
										<ScProgressLabel>
											Progress Label
										</ScProgressLabel>
									</template>
									<ScProgressBar :value="28" color="md-bg-light-blue-800"></ScProgressBar>
								</ScProgressLinear>
							</div>
							<hr>
							<p class="sc-color-secondary uk-margin-small">
								Indeterminate
							</p>
							<ScProgressLinear indeterminate>
								<ScProgressBar color="md-bg-light-blue-800"></ScProgressBar>
							</ScProgressLinear>
							<hr>
							<p class="sc-color-secondary uk-margin-small">
								Dynamic progress
							</p>
							<ScProgressLinear size="md">
								<ScProgressBar :value="dynamicVal" :color="dynamicColor"></ScProgressBar>
							</ScProgressLinear>
						</ScCardBody>
					</ScCard>
					<ScCard>
						<ScCardTitle>
							UIkit Progress
						</ScCardTitle>
						<ScCardBody>
							<progress class="uk-progress" value="10" max="100"></progress>
							<hr>
							<progress ref="uikitProgress" class="uk-progress" value="10" max="100"></progress>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ScProgressLinear, ScProgressBar, ScProgressLabel, ScProgressCircular, ScProgressOverlay } from '~/components/progress'

export default {
	name: 'ComponentsProgressSpinners',
	components: {
		ScProgressLinear,
		ScProgressBar,
		ScProgressLabel,
		ScProgressCircular,
		ScProgressOverlay
	},
	data: () => ({
		rootProgress: false,
		cardProgress: false,
		progressGroup: {
			bar1: 14,
			bar2: 25,
			bar3: 31
		},
		dynamicVal: 12,
		dynamicColor: 'md-bg-red-400'
	}),
	mounted () {
		const animate = setInterval(() => {
			var rand = Math.floor(Math.random() * 10) + 5;
			if ((this.dynamicVal + rand) >= 33) {
				this.dynamicColor = 'md-bg-amber-400';
				this.dynamicVal = this.dynamicVal + rand;
			}
			if ((this.dynamicVal + rand) >= 66) {
				this.dynamicColor = 'md-bg-green-400';
				this.dynamicVal = this.dynamicVal + rand;
			}
			if ((this.dynamicVal + rand) >= 100) {
				this.dynamicVal = 100;
				clearInterval(animate);
			} else {
				this.dynamicVal = this.dynamicVal + rand;
			}
		}, 1200);
		// UIkit progress
		const $UIkitBar = this.$refs.uikitProgress;
		var UIkitanimate = setInterval(() => {
			$UIkitBar.value += 10;
			if ($UIkitBar.value >= $UIkitBar.max) {
				clearInterval(UIkitanimate);
			}
		}, 1000);
	},
	methods: {
		toggleRootOverlay () {
			this.$store.commit('toggleProgressOverlay', !this.rootProgress);
			this.rootProgress = !this.rootProgress;
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/common/variables_mixins';
	@import '~scss/components/progress';
</style>
