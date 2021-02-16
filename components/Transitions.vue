<template>
	<component :is="componentType"
		:tag="tag"
		v-bind="$attrs"
		class="sc-velocity-animation"
		:class="[extraClass]"
		v-on="hooks"
	>
		<slot></slot>
	</component>
</template>

<script>
import { scVars, scDom } from '~/assets/js/utils'
const { css, offset, style } = scDom;

require('~/plugins/velocity.client.js');

export default {
	name: 'ScTransition',
	props: {
		name: {
			type: String,
			default: ''
		},
		css: {
			type: Boolean,
			default: false
		},
		duration: {
			type: [Number, Object],
			default: 280
		},
		speed: {
			type: [Number, Object],
			default: 5
		},
		group: Boolean,
		tag: {
			type: String,
			default: 'div'
		},
		origin: {
			type: String,
			default: ''
		},
		stagger: Boolean,
		preserveHeight: Boolean,
		disableMinHeight: Boolean,
		afterEnter: {
			type: Function,
			default: null
		},
		afterLeave: {
			type: Function,
			default: null
		},
		afterLeaveAll: {
			type: Function,
			default: null
		}
	},
	data: () => ({
		extraClass: false,
		minHeight: 0,
		transformLeave: false,
		baseDelay: 0
	}),
	computed: {
		transformIn () {
			let transform = {};
			switch(this.name) {
			case 'fade':
				transform = {
					opacity: [1, 0]
				};
				break;
			case 'slideBottom':
				transform = {
					opacity: [1, 0],
					translateY: [0, 50],
					translateZ: 0
				};
				break;
			case 'scaleDown':
				transform = {
					opacity: [1, 0],
					scale: [1, 1.8],
					translateZ: 0
				};
				break;
			case 'scaleUp':
				transform = {
					opacity: [1, 0],
					scale: [1, 0.25],
					translateZ: 0
				};
				break;
			case 'slideUp':
				transform = 'slideDown';
				break;
			default:
				transform = {
					scale: [1, 0],
					opacity: [1, 0]
				}
			}
			return transform;
		},
		transformOut () {
			let transform = {};
			switch(this.name) {
			case 'fade':
				transform = {
					opacity: [0, 1]
				};
				break;
			case 'slideBottom':
				transform = {
					opacity: [0, 1],
					translateY: [-50, 0],
					translateZ: 0
				};
				break;
			case 'scaleDown':
				transform = {
					opacity: [0, 1],
					scale: [1.1, 1],
					translateZ: 0
				};
				break;
			case 'scaleUp':
				transform = {
					opacity: [0, 1],
					scale: [0.25, 1],
					translateZ: 0
				};
				break;
			case 'slideUp':
				transform = 'slideUp';
				break;
			default:
				transform = {
					scale: [0, 1],
					opacity: [0, 1],
					translateZ: 0
				}
			}
			return transform;
		},
		time () {
			return this.speed * this.duration
		},
		componentType () {
			return this.group ? 'transition-group' : 'transition'
		},
		hooks () {
			return {
				beforeEnter: this.beforeEnter,
				enter: this.enter,
				afterEnter: this.afterEnterHook,
				beforeLeave: this.beforeLeave,
				leave: this.leave,
				afterLeave: this.afterLeaveHook
			}
		}
	},
	methods: {
		delay (el) {
			let calculatedOffset = offset(el, true).left * 0.8 + offset(el, true).top;
			if(this.preserveHeight) {
				const oldHeight = this.minHeight;
				this.$el.style.minHeight = 0;
				calculatedOffset = offset(el, true).left * 0.8 + offset(el, true).top;
				this.$el.style.minHeight = `${oldHeight}px`;
			}
			const delay = parseFloat((calculatedOffset / this.time) * 1400).toFixed(2);
			if(parseFloat(delay) !== 0.00 && !this.baseDelay) {
				this.baseDelay = delay;
			}
			return delay;
		},
		beforeEnter (el) {},
		enter (el, done) {
			if(!this.css) {
				const self = this;

				this.setCommonStyles(el);

				el.style.visibility = 'hidden';

				velocity(el, self.transformIn, {
					delay: this.group ? self.delay(el) : 0,
					duration: self.duration,
					easing: scVars.easingSwiftOut,
					begin () {
						el.style.visibility = '';
					},
					complete () {
						self.cleanUpStyles(el);
						done();
					}
				})
			}

		},
		afterEnterHook (el) {
			if(!this.css) {
				if(!el.nextSibling) {
					const $el =  this.$el;
					if((this.minHeight !== $el.clientHeight) && this.name !== 'slideUp' && !this.disableMinHeight) {
						this.minHeight = $el.clientHeight;
						$el.style.minHeight = `${$el.clientHeight}px`;
					}
				}
			}
			if(this.afterEnter) {
				afterEnter();
			}
			this.transformLeave = false;
		},
		leave (el, done) {
			if(!this.css) {
				const self = this;

				this.setCommonStyles(el);

				css(el, {
					left: `${offset(el, true).left - style(el, 'margin-left').replace('px', '')}px`,
					top: `${offset(el, true).top - style(el, 'margin-top').replace('px', '')}px`
				});

				velocity(el, self.transformOut, {
					delay: this.group ? self.delay(el) : 0,
					duration: self.duration,
					easing: scVars.easingSwiftOut,
					begin () {},
					complete () {
						self.cleanUpStyles(el);
						done();
					}
				});


			}
		},
		cleanUpStyles (el) {
			css(el, {
				transformOrigin: '',
				transition: '',
				opacity: '',
				transform: '',
				position: '',
				left: '',
				top: ''
			});
			if(this.name === 'slideUp') {
				el.style.minHeight = '';
				if(el.style.display === 'block') {
					el.style.display = '';
				}
			}
		},
		setCommonStyles (el) {
			// disable element transition
			el.style.transition = 'none';
			if (this.origin) {
				el.style.transformOrigin = this.origin
			}
		},
		beforeLeave (el) {
			if(!this.css) {
				this.extraClass = 'transition-leave';
			}
		},
		afterLeaveHook (el) {
			if(!this.css && !this.transformLeave) {
				this.transformLeave = true;
				setTimeout(() => {
					if(!this.preserveHeight && this.$el.style) {
						this.minHeight = 0;
						this.$el.style.minHeight = '';
					}
					this.extraClass = '';
					if(this.afterLeaveAll) {
						this.afterLeaveAll();
					}
				}, this.duration + (this.$el.children.length * this.baseDelay));
			}
			if(this.afterLeave) {
				this.afterLeave();
			}
		}
	}
}
</script>

<style>
	.transition-leave {
		position: relative;
	}
	.sc-velocity-animation .v-leave-to {
		position: absolute;
	}
</style>
