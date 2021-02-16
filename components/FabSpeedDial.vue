<template>
	<div
		:class="[
			{'sc-fab-speed-dial-horizontal': fabAlignment === 'horizontal'},
			{'sc-fab-speed-dial-hover': fabEvent === 'hover'},
			{'sc-fab-speed-dial-active': fabActive}
		]"
		class="sc-fab-speed-dial"
		@mouseenter="onMouseEnter()"
		@mouseleave="onMouseLeave()"
		@click="onClick()"
	>
		<slot></slot>
		<transition-group
			name="staggered-scale"
			tag="div"
			class="sc-fab-wrapper-inner"
			@enter="enter"
			@leave="leave"
		>
			<div
				v-for="(fab, index) in fabsArray"
				:key="fab.id"
				:data-index="index"
				style="opacity: 0; transform: scaleX(0.2) scaleY(0.2)"
			>
				<a v-if="fab.href" :href="fab.href" class="sc-fab" :class="[fab.class]">
					<i class="mdi" :class="[fab.icon]"></i>
				</a>
				<nuxt-link v-if="fab.to" :to="fab.to" class="sc-fab" :class="[fab.class]">
					<i class="mdi" :class="[fab.icon]"></i>
				</nuxt-link>
			</div>
		</transition-group>
	</div>
</template>

<script>
import _ from "lodash";
require('~/plugins/velocity.client.js');
import { scVars } from '~/assets/js/utils'

export default {
	name: 'ScFabSpeedDial',
	props: {
		fabs: {
			type: Array,
			default: () => [],
			required: true
		},
		fabAlignment: {
			type: String,
			default: 'vertical',
			validator: function (value) {
				return ['horizontal', 'vertical'].indexOf(value) !== -1
			}
		},
		fabEvent: {
			type: String,
			default: 'click',
			validator: function (value) {
				return ['click', 'hover'].indexOf(value) !== -1
			}
		}
	},
	data: () => ({
		fabsArray: [],
		fabActive: false,
		animDuration: 80,
	}),
	methods: {
		'onMouseEnter' () {
			if(this.fabEvent === 'click') {
				return
			}
			this.fabActive = true;
			this.fabsArray = this.fabs;
		},
		'onMouseLeave' () {
			if(this.fabEvent === 'click') {
				return
			}
			this.fabActive = false;
			this.fabsArray = [];
		},
		'onClick' () {
			if(this.fabEvent === 'hover') {
				return
			}
			if (!_.isEmpty(this.fabsArray)) {
				this.fabsArray = [];
			} else {
				this.fabsArray = this.fabs;
			}
			this.fabActive = !this.fabActive;
		},
		enter: function (el, done) {
			var self = this;
			if(el) {
				const i = el.dataset.index;
				velocity(
					el,
					{
						opacity: 1,
						scaleX: [1, 0.2],
						scaleY: [1, 0.2]
					},
					{
						delay: parseInt(i) * (self.animDuration/2),
						duration: self.animDuration,
						complete: done,
						easing: scVars.easingSwiftOut
					}
				)
			}
		},
		leave: function (el, done) {
			var self = this;
			if(el) {
				const i = el.dataset.index;
				velocity(
					el,
					{
						opacity: 0,
						scaleX: 0.2,
						scaleY: 0.2
					},
					{
						delay: (self.fabs.length - parseInt(i)) * (self.animDuration/2),
						duration: self.animDuration,
						complete: done,
						easing: scVars.easingSwiftOut
					}
				)
			}
		}
	}
}
</script>
