<template>
	<div v-if="issue" id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
				<div class="uk-flex-1">
					<h1 class="sc-top-bar-title">
						{{ issue.title }}
					</h1>
					<span class="uk-text-muted">
						<nuxt-link to="/pages/issues/list">scutum</nuxt-link> > {{ issue.issueId }}
					</span>
				</div>
				<div class="sc-actions uk-margin-left uk-visible@s">
					<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-pencil-outline"></a>
					<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-printer"></a>
					<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-dots-vertical"></a>
				</div>
			</div>
		</div>
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<div class="uk-grid uk-grid-divider uk-grid" data-uk-grid>
						<div class="uk-width-3-4@l">
							<div class="uk-flex uk-flex-wrap" data-uk-margin>
								<button class="sc-button sc-button-flex uk-margin-small-right">
									<i class="mdi mdi-pencil-outline uk-margin-small-right"></i>
									Edit
								</button>
								<div class="uk-button-group uk-margin-small-right uk-visible@m">
									<button class="sc-button">
										Assign
									</button>
									<button class="sc-button">
										Start Progress
									</button>
									<button class="sc-button">
										Close Issue
									</button>
								</div>
								<button class="sc-button sc-button-flex">
									Log Time
								</button>
							</div>
							<hr>
							<section>
								<span class="sc-color-secondary">Description:</span>
								<div class="uk-margin-small-top">
									{{ issue.description }}
								</div>
							</section>
							<hr>
							<section>
								<span class="sc-color-secondary">Comments:</span><br>
								<ul class="uk-comment-list uk-margin-small-top">
									<li>
										<article class="uk-comment uk-visible-toggle" tabindex="-1">
											<header class="uk-comment-header uk-position-relative">
												<h4 class="uk-comment-title uk-margin-remove">
													<a class="uk-link-reset" href="javascript:void(0)">Glenna Reichert</a>
												</h4>
												<p class="uk-comment-meta">
													<a class="uk-link-reset" href="javascript:void(0)">2 days ago</a>
												</p>
												<div class="uk-position-top-right uk-margin-small-top uk-margin-small-right uk-hidden-hover">
													<a class="uk-link-muted" href="javascript:void(0)">Reply</a>
												</div>
											</header>
											<div class="uk-comment-body">
												<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
											</div>
										</article>
										<ul>
											<li>
												<article class="uk-comment uk-visible-toggle" tabindex="-1">
													<header class="uk-comment-header uk-position-relative">
														<h4 class="uk-comment-title uk-margin-remove">
															<a class="uk-link-reset" href="javascript:void(0)">Clementina DuBuque</a>
														</h4>
														<p class="uk-comment-meta">
															<a class="uk-link-reset" href="javascript:void(0)">1 days ago</a>
														</p>
														<div class="uk-position-top-right uk-margin-small-top uk-margin-small-right uk-hidden-hover">
															<a class="uk-link-muted" href="javascript:void(0)">Reply</a>
														</div>
													</header>
													<div class="uk-comment-body">
														<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
													</div>
												</article>
											</li>
										</ul>
									</li>
									<li>
										<article class="uk-comment uk-visible-toggle" tabindex="-1">
											<header class="uk-comment-header uk-position-relative">
												<h4 class="uk-comment-title uk-margin-remove">
													<a class="uk-link-reset" href="javascript:void(0)">John Doe</a>
												</h4>
												<p class="uk-comment-meta">
													<a class="uk-link-reset" href="javascript:void(0)">4 days ago</a>
												</p>
												<div class="uk-position-top-right uk-margin-small-top uk-margin-small-right uk-hidden-hover">
													<a class="uk-link-muted" href="javascript:void(0)">Reply</a>
												</div>
											</header>
											<div class="uk-comment-body">
												<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
											</div>
										</article>
									</li>
								</ul>
								<button class="sc-button sc-button-default sc-button-small sc-button-outline">
									Add Comment
								</button>
							</section>
						</div>
						<div class="uk-width-1-4@l">
							<span class="sc-color-secondary">Details</span>
							<ul class="uk-list uk-list-divider uk-margin-small-top">
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-information-outline"></i>
									</div>
									<div class="sc-list-body">
										<div>
											<span class="sc-color-secondary uk-margin-small-right">Status:</span>
											<span class="uk-label uk-label-outline">{{ issue.status }}</span>
										</div>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-star-outline"></i>
									</div>
									<div class="sc-list-body">
										<div>
											<span class="sc-color-secondary uk-margin-small-right">Priority:</span>
											<span class="uk-label" :class="[priorityLabel(issue.priority)]"> {{ issue.priority }}</span>
										</div>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<ScAvatar :avatar-id="5"></ScAvatar>
									</div>
									<div class="sc-list-body">
										<span class="sc-text-semibold">{{ issue.user }}</span>
										<span class="sc-color-secondary">Assignee</span>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-clock-outline"></i>
									</div>
									<div class="sc-list-body">
										{{ issue.created }}
										<span class="sc-color-secondary">Created</span>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-progress-clock"></i>
									</div>
									<div class="sc-list-body">
										{{ issue.modified }}
										<span class="sc-color-secondary">Modified</span>
									</div>
								</li>
							</ul>
							<hr>
							<span class="sc-color-secondary">Time Tracking</span>
							<ul class="uk-list uk-margin-small-top">
								<li>
									<ScProgressLinear class="uk-width-1-1" size="md">
										<template #label>
											<ScProgressLabel class="uk-text-left">
												Estimated: 4d
											</ScProgressLabel>
										</template>
										<ScProgressBar :value="100" color="md-bg-light-green-600"></ScProgressBar>
									</ScProgressLinear>
								</li>
								<li>
									<ScProgressLinear class="uk-width-1-1" size="md">
										<template #label>
											<ScProgressLabel class="uk-text-left">
												Logged: 1d
											</ScProgressLabel>
										</template>
										<ScProgressBar :value="25" color="md-bg-orange-800"></ScProgressBar>
									</ScProgressLinear>
								</li>
							</ul>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
import ScAvatar from '~/components/Avatar'
import { ScProgressLinear, ScProgressBar, ScProgressLabel } from '~/components/progress'

export default {
	name: 'PagesIssuesDetailsId',
	components: {
		ScAvatar,
		ScProgressLinear,
		ScProgressBar,
		ScProgressLabel
	},
	computed: {
		issue () {
			return this.$store.getters['issues/issue'](this.$route.params.id)[0]
		}
	},
	methods: {
		priorityLabel (priority) {
			let priorityClass = null;
			switch (priority) {
			case 'minor':
				priorityClass = 'uk-label-success';
				break;
			case 'major':
				priorityClass = '';
				break;
			case 'critical':
				priorityClass = 'uk-label-warning';
				break;
			case 'blocker':
				priorityClass = 'uk-label-danger';
				break;
			default:
			}
			return priorityClass;
		},
	}
}
</script>
