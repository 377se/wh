<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-4@l uk-child-width-1-2@m" data-uk-grid>
				<div>
					<ScCard>
						<a href="javascript:void(0)" class="uk-display-block uk-text-center sc-padding-medium uk-position-relative">
							<i class="mdi mdi-bullhorn sc-color-primary sc-icon-28 uk-display-inline-block"></i>
							<h4 class="uk-margin-remove">
								Announcements
							</h4>
							<span class="uk-badge md-bg-purple-600 uk-position-absolute uk-position-top-right uk-margin-small-top uk-margin-small-right">
								24
							</span>
						</a>
					</ScCard>
				</div>
				<div>
					<ScCard class="md-bg-indigo-700">
						<a href="javascript:void(0)" class="uk-display-block uk-text-center sc-padding-medium uk-position-relative">
							<i class="mdi mdi-forum-outline sc-light sc-icon-28 uk-display-inline-block"></i>
							<h4 class="uk-margin-remove sc-light">
								General
							</h4>
							<span class="uk-badge md-bg-white sc-color-primary uk-position-absolute uk-position-top-right uk-margin-small-top uk-margin-small-right">
								12
							</span>
						</a>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<a href="javascript:void(0)" class="uk-display-block uk-text-center sc-padding-medium uk-position-relative">
							<i class="mdi mdi-bug sc-color-primary sc-icon-28 uk-display-inline-block"></i>
							<h4 class="uk-margin-remove">
								Bugs
							</h4>
							<span class="uk-badge md-bg-red-600 uk-position-absolute uk-position-top-right uk-margin-small-top uk-margin-small-right">
								46
							</span>
						</a>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<a href="javascript:void(0)" class="uk-display-block uk-text-center sc-padding-medium uk-position-relative">
							<i class="mdi mdi-thought-bubble-outline sc-color-primary sc-icon-28 uk-display-inline-block"></i>
							<h4 class="uk-margin-remove">
								Off Topic
							</h4>
							<span class="uk-badge md-bg-light-green-600 uk-position-absolute uk-position-top-right uk-margin-small-top uk-margin-small-right">
								118
							</span>
						</a>
					</ScCard>
				</div>
			</div>
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-4-5@l">
					<ScCard>
						<ScCardBody>
							<h3 class="uk-margin-small-bottom">
								Frequently Asked Questions
							</h3>
							<p class="sc-color-secondary uk-margin-remove">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, tenetur!
							</p>
							<ul class="uk-accordion-alt uk-margin-large-top" data-uk-accordion>
								<li v-for="(post, index) in faq" :key="post.id">
									<h3 class="uk-accordion-title">
										<span class="uk-text-muted uk-margin-small-right">
											{{ (index + 1) }}
										</span>
										{{ post.title }}
									</h3>
									<div class="uk-accordion-content">
										<div class="uk-grid-medium" data-uk-grid>
											<div class="uk-width-expand@m">
												{{ post.content }}
											</div>
										</div>
									</div>
								</li>
							</ul>
						</ScCardBody>
					</ScCard>
				</div>
				<div class="uk-width-1-5@l">
					<h4 class="uk-heading-line">
						<span>Categories</span>
					</h4>
					<ul class="uk-list uk-list-divider uk-margin-remove">
						<li class="sc-list-group">
							<div class="sc-list-addon">
								<i class="mdi mdi-headphones"></i>
							</div>
							<div class="sc-list-body">
								<a class="uk-flex-column sc-flex-items-left">
									<span class="sc-text-semibold">
										Category 1
									</span>
									<span class="sc-list-secondary-text">
										Lorem ipsum dolor sit.
									</span>
								</a>
							</div>
						</li>
						<li class="sc-list-group">
							<div class="sc-list-addon">
								<i class="mdi mdi-tag-heart"></i>
							</div>
							<div class="sc-list-body">
								<a href="javascript:void(0)" class="uk-flex-column sc-flex-items-left">
									<span class="sc-text-semibold">
										Category 2
									</span>
									<span class="sc-list-secondary-text">
										Lorem ipsum dolor sit.
									</span>
								</a>
							</div>
						</li>
						<li class="sc-list-group">
							<div class="sc-list-addon">
								<i class="mdi mdi-mushroom"></i>
							</div>
							<div class="sc-list-body">
								<a href="javascript:void(0)" class="uk-flex-column sc-flex-items-left">
									<span class="sc-text-semibold">
										Category 3
									</span>
									<span class="sc-list-secondary-text">
										Lorem ipsum dolor sit.
									</span>
								</a>
							</div>
						</li>
						<li class="sc-list-group">
							<div class="sc-list-addon">
								<i class="mdi mdi-access-point"></i>
							</div>
							<div class="sc-list-body">
								<a href="javascript:void(0)" class="uk-flex-column sc-flex-items-left">
									<span class="sc-text-semibold">
										Category 4
									</span>
									<span class="sc-list-secondary-text">
										Lorem ipsum dolor sit.
									</span>
								</a>
							</div>
						</li>
						<li class="sc-list-group">
							<div class="sc-list-addon">
								<i class="mdi mdi-cake"></i>
							</div>
							<div class="sc-list-body">
								<a href="javascript:void(0)" class="uk-flex-column sc-flex-items-left">
									<span class="sc-text-semibold">
										Category 5
									</span>
									<span class="sc-list-secondary-text">
										Lorem ipsum dolor sit.
									</span>
								</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { scHelpers, scFakeData } from "~/assets/js/utils";
const { uniqueID } = scHelpers;
const { sentence } = scFakeData;

const chance = require('chance').Chance();

export default {
	name: 'PagesHelpFaq',
	computed: {
		faq () {
			let posts = [];
			for (let i = 0; i < 12; i++) {
				posts.push({
					id: uniqueID(),
					title: sentence({ words: 10}),
					content: sentence({ words: 100})
				})
			}
			return posts;
		}
	}
}
</script>
