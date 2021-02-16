<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-flex-center" data-uk-grid>
				<div class="uk-width-2-3@l">
					<ScCard>
						<ScCardBody>
							<div class="sc-timeline sc-timeline-center">
								<div v-for="item in timeline" :key="item.id" class="sc-timeline-item">
									<div class="sc-timeline-date">
										{{ item.date }}
									</div>
									<div v-if="item.icon !== ''" class="sc-timeline-icon" :class="[item.color]">
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
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardBody>
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
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardBody>
							<div class="sc-timeline sc-timeline-right">
								<div v-for="item in timeline" :key="item.id" class="sc-timeline-item">
									<div class="sc-timeline-date">
										{{ item.dateAlt2 }}
									</div>
									<div v-if="item.icon !== ''" class="sc-timeline-icon">
										<i v-if="!item.iconAvatar" :class="['mdi', item.icon, item.iconColor]"></i>
										<ScAvatar v-if="item.iconAvatar" :avatar-id="item.iconAvatar"></ScAvatar>
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
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ScPhoto from '~/components/Photo'
import ScAvatar from '~/components/Avatar'
import moment from '~/plugins/moment'

export default {
	name: 'ComponentsTimeline',
	components: {
		ScPhoto,
		ScAvatar
	},
	computed: {
		timeline ()  {
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
		}
	}
}
</script>
