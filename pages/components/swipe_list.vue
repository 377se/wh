<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<SwipeList
					ref="list"
					class="sc-list-swiped"
					:disabled="!enabled"
					:items="listA"
					item-key="id"
					@swipeout:click="itemClick"
				>
					<template #default="{ item }">
						<div>
							<span class="sc-text-semibold">
								{{ item.user }} ({{ item.email }})
							</span>
							<p class="uk-margin-remove">
								{{ item.text }}
							</p>
						</div>
					</template>
					<template #left="{ item, close }">
						<div class="swipeout-action md-bg-red-800 md-color-white" title="remove" @click="remove('listA', item)">
							<i class="mdi mdi-trash-can"></i>
						</div>
						<div class="swipeout-action md-bg-grey-100 uk-margin-right" @click="close">
							<i class="mdi mdi-close"></i>
						</div>
					</template>
					<template #right="{}">
						<div class="swipeout-action md-bg-blue-800 md-color-white">
							<i class="mdi mdi-heart"></i>
						</div>
						<div class="swipeout-action md-bg-green-800 md-color-white">
							<i class="mdi mdi-archive"></i>
						</div>
					</template>
					<template #empty>
						<div>
							list is empty ( filtered or just empty )
						</div>
					</template>
				</SwipeList>
			</ScCard>
			<ScCard class="uk-margin-top">
				<SwipeList
					ref="list"
					class="sc-list-swiped"
					:disabled="!enabled"
					:items="listB"
					item-key="id"
					@swipeout:click="itemClick"
				>
					<template #default="{ item }">
						<div>
							<span class="sc-text-semibold">
								{{ item.user }} ({{ item.email }})
							</span>
							<p class="uk-margin-remove">
								{{ item.text }}
							</p>
						</div>
					</template>
					<template #left="{ item, close }">
						<div class="swipeout-action md-color-red-800 sc-padding-left sc-padding-right" title="remove" @click="remove('listB', item)">
							<i class="mdi mdi-trash-can"></i>
						</div>
						<div class="swipeout-action sc-padding-left sc-padding-right" @click="close">
							<i class="mdi mdi-close"></i>
						</div>
					</template>
					<template #right="{}">
						<div class="swipeout-action md-color-green-800 sc-padding-left sc-padding-right">
							<i class="mdi mdi-thumb-up"></i>
						</div>
					</template>
					<template #empty>
						<div>
							list is empty ( filtered or just empty )
						</div>
					</template>
				</SwipeList>
			</ScCard>
		</div>
	</div>
</template>

<script>
import { SwipeList } from 'vue-swipe-actions';
require('vue-swipe-actions/dist/vue-swipe-actions.css')

export default {
	name: 'ComponentsSwipeList',
	components: {
		SwipeList
	},
	data () {
		return {
			enabled: true,
			listA: [
				{
					id: 0,
					user: 'Liana Kerluke',
					email: 'alize.kuvalis@gmail.com',
					text: 'Ipsam aut commodi quibusdam.'
				},
				{
					id: 1,
					user: 'Emelia D\'Amore',
					email: 'hbruen@yahoo.com',
					text: 'Nihil omnis natus mollitia adipisci deleniti exercitationem.'
				},
				{
					id: 2,
					user: 'Robbie Kub',
					email: 'neal.hodkiewicz@gmail.com',
					text: 'Et rerum quam eligendi mollitia consequuntur.'
				},
				{
					id: 3,
					user: 'Tara Ratke',
					email: 'kreiger.elian@frami.net',
					text: 'Hic voluptatem quod eveniet magnam.'
				},
				{
					id: 4,
					user: 'Enoch Pagac',
					email: 'samantha.torphy@blick.com',
					text: 'Ut neque doloribus officia autem.'
				}
			],
			listB: [
				{
					id: 0,
					user: 'Liana Kerluke',
					email: 'alize.kuvalis@gmail.com',
					text: 'Ipsam aut commodi quibusdam.'
				},
				{
					id: 1,
					user: 'Emelia D\'Amore',
					email: 'hbruen@yahoo.com',
					text: 'Nihil omnis natus mollitia adipisci deleniti exercitationem.'
				},
				{
					id: 2,
					user: 'Robbie Kub',
					email: 'neal.hodkiewicz@gmail.com',
					text: 'Et rerum quam eligendi mollitia consequuntur.'
				},
				{
					id: 3,
					user: 'Tara Ratke',
					email: 'kreiger.elian@frami.net',
					text: 'Hic voluptatem quod eveniet magnam.'
				},
				{
					id: 4,
					user: 'Enoch Pagac',
					email: 'samantha.torphy@blick.com',
					text: 'Ut neque doloribus officia autem.'
				}
			]
		};
	},
	methods: {
		remove (list, item) {
			this[list] = this[list].filter(i => i !== item);
		},
		itemClick (e) {
			console.log(e, "item click");
		}
	}
};
</script>

<style lang="scss">
	@import "~@/assets/scss/plugins/swipeOut";
</style>
