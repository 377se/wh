<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<div class="uk-flex uk-height-1-1">
			<div id="sc-page-content">
				<div class="sc-js-sticky-parent">
					<client-only>
						<ScCard
							v-box-gradient="selectedUser.colors"
							v-sc-sticky="stickyUserCard"
							class="sc-light sc-card-user-profile"
						>
							<div class="sc-card-user-profile-body">
								<transition name="scale-up" mode="out-in">
									<ScAvatar :key="selectedUser.id" :avatar-id="selectedUser.avatar" size="md" class="uk-margin-right"></ScAvatar>
								</transition>
								<div>
									<transition name="slide-bottom-medium" mode="out-in">
										<ScCardTitle :key="selectedUser.id">
											{{ selectedUser.fName }} {{ selectedUser.lName }}
										</ScCardTitle>
									</transition>
									<transition name="slide-bottom-medium" mode="out-in">
										<div :key="selectedUser.id" class="sc-color-secondary uk-flex uk-flex-middle">
											{{ selectedUser.company }}
										</div>
									</transition>
								</div>
							</div>
							<ScCardActions class="uk-visible@m">
								<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-pencil"></a>
								<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-message-outline"></a>
								<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-information-outline"></a>
							</ScCardActions>
						</ScCard>
					</client-only>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							Address
						</ScCardTitle>
						<client-only>
							<GmapMap
								:center="gmaps.center"
								:zoom="gmaps.zoom"
								class="sc-gmap"
							>
								<GmapMarker
									v-for="m in gmaps.markers"
									:key="m.id"
									:position="m.position"
									:clickable="true"
									@click="center=m.position"
								/>
							</GmapMap>
						</client-only>
						<ScCardBody>
							<address>
								<span>{{ selectedUser.address }}</span><br>
								<span>{{ selectedUser.city }}</span><br>
								<span>{{ selectedUser.country }}</span>
							</address>
						</ScCardBody>
					</ScCard>
				</div>
				<div class="uk-child-width-1-2@l uk-grid uk-margin-top" data-uk-grid>
					<div>
						<ScCard>
							<ScCardBody>
								<h5 class="uk-heading-line">
									<span>Personal informations</span>
								</h5>
								<ul class="uk-list uk-list-divider">
									<li class="sc-list-group">
										<div class="sc-list-addon">
											<i class="mdi mdi-email"></i>
										</div>
										<div class="sc-list-body">
											<div class="sc-list-body-inner">
												{{ selectedUser.email }}
											</div>
										</div>
									</li>
									<li class="sc-list-group">
										<div class="sc-list-addon">
											<i class="mdi mdi-phone"></i>
										</div>
										<div class="sc-list-body">
											{{ selectedUser.phone }}
										</div>
									</li>
									<li class="sc-list-group">
										<div class="sc-list-addon">
											<i class="mdi mdi-office-building"></i>
										</div>
										<div class="sc-list-body">
											{{ selectedUser.company }}
										</div>
									</li>
									<li class="sc-list-group">
										<div class="sc-list-addon">
											<i class="mdi mdi-earth"></i>
										</div>
										<div class="sc-list-body">
											<span>{{ selectedUser.address }}</span>
											<span class="sc-list-secondary-text">
												{{ selectedUser.city }}
											</span>
										</div>
									</li>
								</ul>
							</ScCardBody>
						</ScCard>
					</div>
					<div>
						<ScCard>
							<ScCardBody>
								<h5 class="uk-heading-line">
									<span>Timeline</span>
								</h5>
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
					</div>
				</div>
			</div>
			<div id="sc-page-aside" class="sc-page-aside-large md-bg-white sc-padding-remove uk-visible@m">
				<div class="sc-page-aside-header md-bg-grey-100 sc-border-bottom sc-padding">
					<ScInput v-model="findUser" placeholder="Find user..." mode="outline"></ScInput>
				</div>
				<div class="sc-page-aside-body sc-padding-remove" data-sc-scrollbar>
					<ul class="uk-list uk-list-divider sc-list-clickable sc-padding-medium">
						<li v-for="user in filteredUsers"
							:key="user.id"
							class="sc-list-group"
							:class="{'uk-active' : selectedUser.id === user.id}"
							@click="changeUser(user)"
						>
							<div class="sc-list-addon">
								<div class="sc-avatar-wrapper sc-avatar-wrapper-sm">
									<ScAvatar :avatar-id="user.avatar" class="sc-avatar"></ScAvatar>
								</div>
							</div>
							<div class="sc-list-body">
								<div>
									<span class="sc-js-list-fName">
										{{ user.fName }}
									</span>
									<span class="sc-js-list-lName">
										{{ user.lName }}
									</span>
								</div>
								<div class="sc-list-secondary-text sc-js-list-company">
									{{ user.company }}
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<client-only>
			<ScOffcanvas>
				<div class="sc-page-aside-body" data-sc-scrollbar>
					<ul class="uk-list uk-list-divider sc-list-clickable">
						<li v-for="user in users" :key="user.id" class="sc-list-group">
							<div class="sc-list-addon">
								<div class="sc-avatar-wrapper sc-avatar-wrapper-sm">
									<ScAvatar :avatar-id="randAvatar()" class="sc-avatar"></ScAvatar>
								</div>
							</div>
							<div class="sc-list-body">
								<div>
									<span class="sc-js-list-fName">
										{{ user.fName }}
									</span>
									<span class="sc-js-list-lName">
										{{ user.lName }}
									</span>
								</div>
								<div class="sc-list-secondary-text sc-js-list-company">
									{{ user.company }}
								</div>
							</div>
						</li>
					</ul>
				</div>
			</ScOffcanvas>
		</client-only>
	</div>
</template>
<script>
import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

import ScAvatar from '~/components/Avatar'
import ScPhoto from '~/components/Photo'
import ScInput from '~/components/Input'

require('~/plugins/stickyKit');

import moment from '~/plugins/moment'
const chance = require('chance').Chance();

if(process.client) {
	require('~/plugins/gmaps')
}

export default {
	name: 'PagesContactListSingle',
	components: {
		ScAvatar,
		ScPhoto,
		ScInput,
		ScOffcanvas: process.client ? () => import('~/components/Offcanvas') : null
	},
	data: () => ({
		users: [
			{
				id: "0MfWPD7Q",
				fName: "Lillie",
				lName: "Bird",
				company: "Reader's Digest Association Inc.",
				avatar: 9,
				colors: ['#7B1FA2', '#4527A0']
			}, {
				id: "THEqYNkT",
				fName: "Louis",
				lName: "Mazzuoli",
				company: "C. H. Robinson Worldwide Inc.",
				avatar: 5,
				colors: ['#4b6cb7', '#182848']
			}, {
				id: "T7Uymkr2",
				fName: "Micheal",
				lName: "Fiaschi",
				company: "Praxair Inc",
				avatar: 1,
				colors: ['#d53369', '#cbad6d']
			}, {
				id: "ycGS7pDn",
				fName: "Tony",
				lName: "Mallet",
				company: "Farmland Industries Inc.",
				avatar: 1,
				colors: ['#C04848', '#480048']
			}, {
				id: "N3HDfC4u",
				fName: "Barry",
				lName: "Magrini",
				company: "American Power Conversion Corporation",
				avatar: 6
			}, {
				id: "iQgU6k1-",
				fName: "Maude",
				lName: "Stewart",
				company: "R.R. Donnelley & Sons Company",
				avatar: 6
			}, {
				id: "KV5qnJaJ",
				fName: "Jose",
				lName: "Castagnoli",
				company: "Premcor Inc.",
				avatar: 4
			}, {
				id: "n4a6YJc1",
				fName: "Mike",
				lName: "Fossati",
				company: "Fortune Brands Inc.",
				avatar: 9
			}, {
				id: "x8_eQ0Fg",
				fName: "Violet",
				lName: "Bonciani",
				company: "Reliant Energy Inc.",
				avatar: 5
			}, {
				id: "Zda95NqE",
				fName: "Milton",
				lName: "Degl'Innocenti",
				company: "Siebel Systems Inc",
				avatar: 3
			}, {
				id: "NcLmV3y_",
				fName: "Keith",
				lName: "Floyd",
				company: "La-Z-Boy Inc.",
				avatar: 4
			}, {
				id: "oAOhDH2a",
				fName: "Micheal",
				lName: "Soto",
				company: "Veritas Software Corporation",
				avatar: 9
			}, {
				id: "Rnlimm6r",
				fName: "Jay",
				lName: "Fleury",
				company: "Atmos Energy Corporation",
				avatar: 5
			}, {
				id: "-j28hXMM",
				fName: "Nellie",
				lName: "Hart",
				company: "A.G. Edwards Inc.",
				avatar: 7
			}, {
				id: "2YuLPMVA",
				fName: "Minnie",
				lName: "Frullini",
				company: "Lennox International Inc.",
				avatar: 3
			}, {
				id: "4xOobRbr",
				fName: "Randy",
				lName: "Cheli",
				company: "EOG Resources, Inc.",
				avatar: 1
			}, {
				id: "8ihEQQNx",
				fName: "Leon",
				lName: "Hoekstra",
				company: "Enterprise Products Partners L.P.",
				avatar: 4
			}, {
				id: "LuA86WWJ",
				fName: "Olive",
				lName: "Pratellesi",
				company: "Texas Instruments Incorporated",
				avatar: 7
			}, {
				id: "72U7hNsr",
				fName: "Bill",
				lName: "Bonanni",
				company: "Apache Corporation",
				avatar: 1
			}, {
				id: "6PEZpApZ",
				fName: "Evelyn",
				lName: "Zhou",
				company: "Guidant Corporation",
				avatar: 1
			}, {
				id: "Eet9U621",
				fName: "Tom",
				lName: "Jaspers",
				company: "Safeway Inc",
				avatar: 9
			}, {
				id: "TXHFOVgA",
				fName: "Frank",
				lName: "Torres",
				company: "Popular Inc",
				avatar: 4
			}, {
				id: "AM-EYLCh",
				fName: "Lou",
				lName: "Meyer",
				company: "USG Corporation",
				avatar: 6
			}, {
				id: "ji60wt49",
				fName: "Gabriel",
				lName: "Wolf",
				company: "Nordstrom Inc",
				avatar: 2
			}, {
				id: "-CZKvqqs",
				fName: "Millie",
				lName: "Sakai",
				company: "Thomas & Betts Corporation",
				avatar: 5
			}, {
				id: "XMtSviO9",
				fName: "Georgie",
				lName: "Rossetti",
				company: "Universal Forest Products Inc",
				avatar: 9
			}, {
				id: "g_vK9Vqe",
				fName: "Alta",
				lName: "Gabbrielli",
				company: "Motorola Inc.",
				avatar: 10
			}, {
				id: "KWrQR5VU",
				fName: "Ollie",
				lName: "Franklin",
				company: "Newell Rubbermaid Inc",
				avatar: 7
			}, {
				id: "KOF4GFiB",
				fName: "Susie",
				lName: "Taylor",
				company: "Solutia Inc",
				avatar: 4
			}, {
				id: "Sj9kBFMw",
				fName: "Henrietta",
				lName: "Renzi",
				company: "The Goodyear Tire & Rubber Company",
				avatar: 7
			}, {
				id: "LGHphSaE",
				fName: "Adeline",
				lName: "Blok",
				company: "J.B. Hunt Transport Services Inc.",
				avatar: 9
			}, {
				id: "e97CVd3X",
				fName: "Jacob",
				lName: "Stokes",
				company: "Georgia-Pacific Corporation",
				avatar: 7
			}
		],
		selectedUser: {
			id: "0MfWPD7Q",
			avatar: 9,
			fName: "Lillie",
			lName: "Bird",
			company: "Reader's Digest Association Inc.",
			address: "624 Jekbe Boulevard",
			email: "pava@ec.tt",
			phone: "(837) 398-7632",
			city: "Rewnenew",
			country: "Isle of Man",
			colors: '#7B1FA2, #4527A0'
		},
		stickyUserCard: {
			media: 'mediumMin',
			options: {
				'container': '#sc-page-content',
			},
			on: {
				'sticky_kit:stick' (e) {
					// /console.log("has stuck!", e.target);
				},
				'sticky_kit:unstick' (e) {
					// console.log("has unstuck!", e.target);
				},
			}
		},
		gmaps: {
			center: {
				lat: 32.67,
				lng: -16.9421801
			},
			zoom: 12,
			markers: [
				{
					id: 1,
					position: {
						lat: 32.6600766,
						lng: -16.9421801
					},
					title: 'Madeira'
				}
			]
		},
		findUser: '',
		defaultColors: '#7B1FA2, #4527A0'
	}),
	computed: {
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
		filteredUsers () {
			return this.users.filter(user => {
				return user.fName.toLowerCase().includes(this.findUser.toLowerCase())
					|| user.lName.toLowerCase().includes(this.findUser.toLowerCase())
					|| user.company.toLowerCase().includes(this.findUser.toLowerCase())
			})
		}
	},
	mounted () {
		this.$store.commit('setPageFixed', true);
	},
	beforeDestroy () {
		this.$store.commit('setPageFixed', false);
	},
	methods: {
		randAvatar () {
			return Math.floor(Math.random() * 10) + 1;
		},
		changeUser (user) {
			this.selectedUser.id = user.id;
			this.selectedUser.avatar = user.avatar;
			this.selectedUser.fName = user.fName;
			this.selectedUser.lName = user.lName;
			this.selectedUser.company = user.company;
			if (user.colors) {
				this.selectedUser.colors = user.colors;
			} else {
				this.selectedUser.colors = this.defaultColors;
			}
		}
	}
}
</script>
