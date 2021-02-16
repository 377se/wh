<template>
	<footer id="sc-fancy-footer">
		<nav>
			<div class="sc-ff-wave-wrap">
				<svg version="1.1"
					class="sc-ff-wave"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 119 26"
					:style="waveStyle"
				>
					<path class="path" d="M120.8,26C98.1,26,86.4,0,60.4,0C35.9,0,21.1,26,0.5,26H120.8z" />
				</svg>
			</div>

			<ul ref="list" class="sc-ff-list" data-uk-switcher="connect: .sc-ff-switcher; animation: uk-animation-slide-top-medium">
				<li
					v-for="(item, index) in listItems"
					:key="item.id"
					:style="{'--item-bg': item.color}"
					:title="item.title"
					@click.prevent="toggleItem(item, index)"
				>
					<a href="javascript:void(0)">
						<i class="mdi" :class="[`mdi-${item.icon}`]"></i>
					</a>
				</li>
			</ul>
		</nav>
	</footer>
</template>

<script>
import { uniqueID } from '~/assets/js/utils/helpers'
import { offset, width } from '~/assets/js/utils/dom'

export default {
	data: () => ({
		listItems: [
			{
				id: uniqueID(),
				title: 'Home',
				color: '#3F51B5',
				icon: 'home',
				active: false
			},
			{
				id: uniqueID(),
				title: 'Profile',
				color: '#009688',
				icon: 'account',
				active: false
			},
			{
				id: uniqueID(),
				title: 'Email',
				color: '#FF9800',
				icon: 'email-outline',
				active: false
			},
			{
				id: uniqueID(),
				title: 'Files',
				color: '#9C27B0',
				icon: 'image-frame',
				active: false
			},
			{
				id: uniqueID(),
				title: 'Settings',
				color: '#00BCD4',
				icon: 'settings',
				active: false
			}
		],
		waveStyle: {
			left: 0
		}
	}),
	mounted () {
		this.alignWave(0)
	},
	methods: {
		toggleItem (item, index) {
			this.listItems.forEach(item => item.active = false)
			item.active = !item.active
			this.alignWave(index)
		},
		alignWave (index) {
			const item = this.$refs.list.childNodes[index]
			const itemWidth = width(item)
			const itemPosLeft = offset(item, true).left
			this.waveStyle.left = itemPosLeft.toFixed(2) - itemWidth/2 - 7
		}
	}
}
</script>

<style lang="scss">
	@import "~scss/common/variables_mixins";
	@import "~scss/partials/fancy_footer";
</style>
