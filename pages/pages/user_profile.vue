<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-flex uk-flex-center">
				<div class="uk-width-4-5@l">
					<div class="uk-grid" data-uk-grid>
						<div class="uk-width-1-4@l">
							<client-only>
								<ScCard v-sc-sticky="sideMenu">
									<ScCardBody>
										<div class="uk-text-center">
											<div class="uk-flex uk-flex-center uk-margin-bottom">
												<ScUploader :image="require('~/assets/img/avatars/avatar_01.png')" />
											</div>
											<ScCardTitle>
												{{ user.name }}
											</ScCardTitle>
											<span class="sc-color-secondary uk-text-small">
												{{ user.company }}
											</span>
										</div>
										<ul class="uk-list uk-list-divider">
											<li class="sc-list-group">
												<div class="sc-list-addon">
													<i class="mdi mdi-email"></i>
												</div>
												<div class="sc-list-body">
													<div class="sc-list-body-inner">
														{{ user.email }}
													</div>
												</div>
											</li>
											<li class="sc-list-group">
												<div class="sc-list-addon">
													<i class="mdi mdi-phone"></i>
												</div>
												<div class="sc-list-body">
													{{ user.phone }}
												</div>
											</li>
											<li class="sc-list-group">
												<div class="sc-list-addon">
													<i class="mdi mdi-office-building"></i>
												</div>
												<div class="sc-list-body">
													{{ user.company }}
												</div>
											</li>
											<li class="sc-list-group">
												<div class="sc-list-addon">
													<i class="mdi mdi-link"></i>
												</div>
												<div class="sc-list-body">
													<a :href="user.www" class="sc-link">
														{{ user.www }}
													</a>
												</div>
											</li>
										</ul>
									</ScCardBody>
								</ScCard>
							</client-only>
						</div>
						<div class="uk-width-expand@l">
							<ScCard>
								<ScCardBody>
									<div class="uk-child-width-1-4@m uk-text-center uk-grid" data-uk-grid>
										<div v-for="stat in stats" :key="stat.id">
											<div class="sc-round sc-padding md-bg-grey-100">
												<h2 class="uk-margin-remove" :class="['md-color-' + stat.color + '-500']">
													{{ stat.number }}
												</h2>
												<p class="sc-color-secondary uk-margin-remove">
													{{ stat.cat }}
												</p>
											</div>
										</div>
									</div>
									<h4 class="uk-heading-line uk-margin-large-top">
										<span>Friends</span>
									</h4>
									<div class="uk-flex uk-flex-wrap uk-grid-medium uk-grid" data-uk-grid>
										<div v-for="friend in friends" :key="friend.id">
											<a href="javascript:void(0)">
												<ScAvatar :avatar-id="friend.avatar" :status="friend.status"></ScAvatar>
											</a>
										</div>
									</div>
									<h4 class="uk-heading-line uk-margin-large-top">
										<span>Comments</span>
									</h4>
									<div class="sc-round md-bg-grey-50 sc-padding">
										<ul class="uk-list uk-list-divider uk-margin-bottom sc-list-align">
											<li v-for="comment in comments" :key="comment.id" class="sc-list-group">
												<div class="sc-list-body">
													<p class="uk-margin-remove uk-text-small uk-text-meta">
														{{ comment.date }}
													</p>
													<a href="javascript:void(0)" class="sc-link uk-text-large uk-text-truncate uk-display-block">
														{{ comment.title }}
													</a>
													<p class="uk-margin-remove uk-text-wrap">
														{{ comment.content }}
													</p>
												</div>
											</li>
										</ul>
										<button class="sc-button sc-button-small">
											More comments
										</button>
									</div>
									<h4 class="uk-heading-line uk-margin-large-top">
										<span>Timeline</span>
									</h4>
									<div class="sc-timeline">
										<div v-for="item in timeline" :key="item.id" class="sc-timeline-item">
											<div class="sc-timeline-date">
												{{ item.dateAlt1 }}
											</div>
											<div v-if="item.icon !== ''" class="sc-timeline-icon" :class="[item.colorAlt1]">
												<i :class="['mdi', item.icon]"></i>
											</div>
											<div :class="['sc-timeline-body', item.extraClass]">
												<h4 class="sc-timeline-header">
													{{ item.title | capitalize }}
													<span v-if="item.category">
														in
														<a v-if="item.titleLink !== ''" :href="item.titleLink">
															{{ item.category | capitalize }}
														</a>
														<span v-if="item.titleLink === ''">
															{{ item.category | capitalize }}
														</span>
														category
													</span>
													<span v-if="item.user">
														<a v-if="item.user !== ''" :href="item.titleLink">
															{{ item.user | capitalize }}
														</a>
														<span v-if="item.titleLink === ''">
															{{ item.category | capitalize }}
														</span>
														<span v-if="item.tasks.length">
															have completed 4 tasks
														</span>
													</span>
												</h4>
												<span v-if="item.meta" class="sc-timeline-meta">
													23 comments; 14 pingbacks
												</span>
												<hr v-if="(item.images.length || item.content !== '') && !item.tasks.length">
												<div v-if="item.images.length || item.content !== '' || item.tasks.length" class="sc-timeline-content">
													<p v-if="item.content !== '' " class="uk-margin-remove">
														{{ item.content }}
													</p>
													<ul v-if="item.images" class="sc-list-images uk-list uk-list-inline">
														<li v-for="image in item.images" :key="image">
															<ScPhoto :image-id="image" size="md"></ScPhoto>
														</li>
													</ul>
													<ul v-if="item.tasks.length" class="sc-list-shadow uk-margin-top">
														<li v-for="task in item.tasks" :key="task.id">
															<a href="javascript:void(0)">
																{{ task.title }}
															</a>
															<p v-if="task.loggedTime !== '' " class="sc-list-secondary-text uk-text-small">
																Loged time: {{ task.loggedTime }}
															</p>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<h4 class="uk-heading-line uk-margin-large-top">
										<span>Notes</span>
									</h4>
									<p>{{ user.note }}</p>
								</ScCardBody>
							</ScCard>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="sc-fab-page-wrapper">
			<a href="javascript:void(0)" class="sc-fab sc-fab-secondary sc-fab-large">
				<i class="mdi mdi-pencil"></i>
			</a>
		</div>
	</div>
</template>

<script>
import { scHelpers, scFakeData } from "~/assets/js/utils";
const { uniqueID } = scHelpers;
const { first, last, sentence, phone, company, email } = scFakeData;

import ScPhoto from '~/components/Photo'
import ScAvatar from '~/components/Avatar'
import ScUploader from '~/components/Uploader'

import sticky from '~/plugins/stickyKit'
import moment from '~/plugins/moment'

export default {
	name: 'PagesUserProfile',
	components: {
		ScPhoto,
		ScAvatar,
		ScUploader
	},
	data: () => ({
		sideMenu: {
			media: 'largeMin',
			options: {
				'offset_top': 'inPlace'
			},
			on: {
				'sticky_kit:stick' (e) {
					// console.log("has stuck!", e.target);
				},
				'sticky_kit:unstick' (e) {
					// console.log("has unstuck!", e.target);
				},
			}
		}
	}),
	computed: {
		user () {
			return {
				id: uniqueID(),
				name: first() + ' ' + last(),
				phone: phone(),
				email: email(),
				company: company(),
				note: sentence({ words: 100 }),
				www: 'https://tzdthemes.com'
			}
		},
		stats () {
			return [
				{
					id: 1,
					number: '34 845',
					cat: 'Followers',
					color: 'green'
				},
				{
					id: 2,
					number: '2 410',
					cat: 'Following',
					color: 'green'
				},
				{
					id: 3,
					number: '148',
					cat: 'Stories',
					color: 'green'
				},
				{
					id: 4,
					number: '31',
					cat: 'Posts',
					color: 'red'
				}
			]
		},
		friends () {
			return [
				{
					id: 1,
					avatar: 2,
					status: 'online'
				},
				{
					id: 2,
					avatar: 3,
					status: 'offline'
				},
				{
					id: 3,
					avatar: 4,
					status: 'away'
				},
				{
					id: 4,
					avatar: 5,
					status: 'busy'
				}
			]
		},
		timeline () {
			return [
				{
					id: 1,
					date: this.$moment().format('DD MMM'),
					dateAlt1: this.$moment().format('ddd'),
					dateAlt2: this.$moment().format('MMM YYYY'),
					icon: 'mdi-image',
					iconAvatar: 5,
					iconColor: '',
					color: 'md-bg-red-500 sc-light',
					colorAlt1: 'md-bg-purple-500 sc-light',
					title: 'New Album',
					titleLink: '',
					user: '',
					meta: '',
					category: '',
					content: '',
					images: [1, 6, 7, 5, 4],
					tasks: [],
					extraClass: 'sc-timeline-body-border'
				},
				{
					id: 2,
					date: this.$moment().subtract(1, 'day').format('DD MMM'),
					dateAlt1: this.$moment().subtract(1, 'day').format('ddd'),
					dateAlt2: this.$moment().subtract(1, 'month').format('MMM YYYY'),
					icon: 'mdi-file-document',
					iconAvatar: '',
					iconColor: 'md-color-green-800 sc-icon-32',
					color: 'md-bg-green-500 sc-light',
					colorAlt1: 'md-bg-amber-500 sc-light',
					title: 'New posts',
					titleLink: 'javascript:void(0)',
					user: '',
					meta: '23 comments; 14 pingbacks',
					category: 'travel',
					content: 'Velit aut sit ab blanditiis sint ut tenetur repellendus deleniti quisquam reiciendis maiores sit sed adipisci consequatur et autem eos repellendus.',
					images: [],
					tasks: [],
					extraClass: 'sc-timeline-body-border'
				},
				{
					id: 3,
					date: this.$moment().subtract(2, 'day').format('DD MMM'),
					dateAlt1: this.$moment().subtract(2, 'day').format('ddd'),
					dateAlt2: this.$moment().subtract(2, 'month').format('MMM YYYY'),
					icon: 'mdi-comment',
					iconAvatar: '',
					iconColor: 'md-color-red-800 sc-icon-32',
					color: 'md-bg-light-blue-500 sc-light',
					colorAlt1: 'md-bg-light-green-500 sc-light',
					title: '14 new commments',
					titleLink: '',
					user: '',
					meta: '',
					category: '',
					content: '',
					images: [],
					tasks: [],
					extraClass: 'uk-box-shadow-small'
				},
				{
					id: 4,
					date: this.$moment().subtract(4, 'day').format('DD MMM'),
					dateAlt1: this.$moment().subtract(4, 'day').format('ddd'),
					dateAlt2: this.$moment().subtract(4, 'months').format('MMM YYYY'),
					icon: 'mdi-calendar-check',
					iconAvatar: 3,
					iconColor: '',
					color: 'md-bg-amber-500 sc-light',
					colorAlt1: 'md-bg-cyan-500 sc-light',
					title: 'User',
					titleLink: 'javascript:void(0)',
					user: 'Kiana Hettinger',
					meta: '',
					category: '',
					content: '',
					images: [],
					tasks: [
						{
							title: 'Neque magnam modi.',
							loggedTime: '2h 21m'
						},
						{
							title: 'Id assumenda soluta quos.',
							loggedTime: ''
						},
						{
							title: 'Id laudantium consequuntur provident magnam.',
							loggedTime: ''
						},
						{
							title: 'Quae qui ipsam et repudiandae.',
							loggedTime: ''
						}
					],
					extraClass: 'md-bg-grey-100'
				}
			]
		},
		comments () {
			return [
				{
					id: uniqueID(),
					date: this.$moment().subtract(2, 'day').subtract(Math.floor(Math.random() * 12) + 1, 'hours').format('DD/MM/YYYY HH:mm'),
					title: sentence({ words: 10 }),
					content: sentence({ words: 20 }),
				},
				{
					id: uniqueID(),
					date: this.$moment().subtract(3, 'day').subtract(Math.floor(Math.random() * 12) + 1, 'hours').format('DD/MM/YYYY HH:mm'),
					title: sentence({ words: 10 }),
					content: sentence({ words: 60 }),
				},
				{
					id: uniqueID(),
					date: this.$moment().subtract(6, 'day').subtract(Math.floor(Math.random() * 12) + 1, 'hours').format('DD/MM/YYYY HH:mm'),
					title: sentence({ words: 10 }),
					content: sentence({ words: 80 }),
				},
				{
					id: uniqueID(),
					date: this.$moment().subtract(8, 'day').subtract(Math.floor(Math.random() * 12) + 1, 'hours').format('DD/MM/YYYY HH:mm'),
					title: sentence({ words: 10 }),
					content: sentence({ words: 40 }),
				}
			]
		}

	}
}
</script>
