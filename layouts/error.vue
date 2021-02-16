<template>
	<div id="sc-page-wrapper" class="sc-error-page">
		<div class="uk-flex uk-flex-center uk-height-1-1">
			<div class="uk-width-1-2@l uk-width-2-3@m">
				<div v-if="error.statusCode === 404">
					<h1 class="sc-error-title sc-padding-large">
						<i class="mdi mdi-alert-outline"></i>
						ERROR 404
					</h1>
					<div class="sc-padding-large">
						<p v-if="!error.message">
							The requested URL <span class="md-color-red-800">
								{{ $route.path }}
							</span> was not found on this server.
						</p>
						<p v-else>
							{{ error.message }}
						</p>
						<nuxt-link to="/">
							Go to home page
						</nuxt-link>
					</div>
				</div>
				<div v-else-if="error.statusCode === 500">
					<h1 class="sc-error-title sc-padding-large">
						<i class="mdi mdi-alert-outline"></i>
						ERROR 500
					</h1>
					<div class="sc-padding-large">
						<p class="sc-text-semibold">
							Oops! Something went wrong&hellip;
						</p>
						<p>There was an error. Please try again later.</p>
						<nuxt-link to="/">
							Go to home page
						</nuxt-link>
					</div>
				</div>
				<div v-else>
					<h1 class="sc-error-title sc-padding-large">
						<i class="mdi mdi-alert-outline"></i>
						An error occurred
					</h1>
					<div class="sc-padding-large">
						<nuxt-link to="/">
							Go to home page
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		error : {
			type: Object,
			default: () => {}
		},
		statusCode: {
			type: String,
			default: '400'
		}
	}
}
</script>

<style lang="scss">
	@import "~scss/common/md_colors";
	@import "~scss/common/variables_mixins";
	#__nuxt,
	#__layout,
	#__layout > div {
		height: 100%;
	}
	.sc-error-page {
		@include font-size(18px);
		text-align: center;
		height: 100%;
		.sc-error-title {
			@include font-size(48px);
			margin: 0;
			overflow: hidden;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: 1px solid $border-color;
			.mdi {
				margin-right: 24px;
				&:before {
					font-size: 96px;
					line-height: 96px;
				}
			}
			@include respond-below(medium) {
				@include font-size(24px);
				.mdi {
					&:before {
						font-size: 64px;
						line-height: 64px;
					}
				}
			}
		}
	}
</style>
