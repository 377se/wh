<template>
	<div
		ref="card"
		class="uk-card"
		:class="[
			cardClass,
			cardFullScreenClass,
			cardFullScreenAnimateClass,
			{'sc-card-loading': loading},
			{'sc-card-minimized': collapsed},
			{'uk-card-hover': hover}
		]"
	>
		<slot></slot>
		<div v-if="loading" class="sc-progress-card" :style="progressStyle">
			<ScProgressCircular size="lg"></ScProgressCircular>
		</div>
	</div>
</template>

<script>
import { scVars, scDom } from '~/assets/js/utils'
const { css, width, height, offset } = scDom;

import { ScProgressCircular } from '~/components/progress'

require('~/plugins/velocity.client.js');

export default {
	name: 'ScCard',
	components: {
		ScProgressCircular
	},
	props: {
		cardTitle: {
			type: String,
			default: null
		},
		cardClass: {
			type: String,
			default: ''
		},
		fullScreen: Boolean,
		fullScreenCallback: {
			type: Function,
			default: null
		},
		loading: Boolean,
		collapsed: Boolean,
		hover: Boolean
	},
	data: () => ({
		// cardCollapseClass: null,
		cardLoadingClass: null,
		cardFullScreenClass: null,
		cardFullScreenAnimateClass: null,
		progressStyle: {
			marginTop: '0'
		}

	}),
	watch: {
		// 'loading' (newVal) {
		// 	this.cardLoadingClass = newVal ? 'sc-card-loading' : null;
		// },
		'fullScreen' (newVal) {
			this.fullScreenToggle(newVal)
		}
	},
	created () {
		this.$on('cardHeaderMounted', (val) => {
			this.progressStyle = {
				marginTop: `${val}px`
			}
		})
	},
	mounted () {},
	methods: {
		fullScreenToggle (enter) {
			const self = this;
			const $card = this.$refs.card;

			const card = {
				'width': `${width($card)}px`,
				'height': `${height($card)}px`,
				'left': `${offset($card).left}px`,
				'top': `${offset($card).top}px`
			};

			if (enter) {

				this.cardFullScreenClass = 'sc-card-fs-active';
				this.cardFullScreenAnimateClass = 'sc-card-fs-animate';

				// set card dimensions
				css($card, {
					width: card.width,
					height: card.height,
					left: card.left,
					top: card.top
				});

				// disable page scrollbars
				this.pageScrollbarDisable();

				// insert placeholder
				const placeholder = document.createElement("div");
				placeholder.setAttribute("id", "sc-card-fs-placeholder");
				placeholder.style.height = card.height;
				$card.parentNode.insertBefore(placeholder, $card.nextSibling);

				// animate card
				velocity($card, {
					top: 0,
					left: 0,
					width: '100%',
					height: '100%'
				}, {
					delay: 280,
					duration: 560,
					easing: scVars.easingSwiftOut,
					begin () {
					},
					complete () {
						// show card content
						self.cardFullScreenAnimateClass = null;
						if(self.fullScreenCallback) {
							setTimeout(() => {
								self.fullScreenCallback();
							}, 50)
						}
					}
				});
			} else {
				const $placeholder = document.getElementById('sc-card-fs-placeholder');

				// placeholder dimensions
				var placeholder = {
					'width': width($placeholder),
					'height': height($placeholder),
					'offset': offset($placeholder)
				};

				// hide card content
				self.cardFullScreenAnimateClass = 'sc-card-fs-animate';


				// animate
				velocity($card, {
					top: placeholder.offset.top,
					left: placeholder.offset.left,
					height: placeholder.height,
					width: placeholder.width
				}, {
					delay: 280,
					duration: 560,
					easing: scVars.easingSwiftOut,
					begin () {
						// enable page scrollbars
						self.pageScrollbarEnable();
					},
					complete () {
						// remove fullscreen class
						self.cardFullScreenAnimateClass = null;
						// show content
						self.cardFullScreenClass = null;
						// remove placeholder
						$placeholder.parentNode.removeChild($placeholder);
						// cleanup
						css($card, {
							width: '',
							height: '',
							left: '',
							top: ''
						});
						// trigger callback
						if(self.fullScreenCallback) {
							setTimeout(() => {
								self.fullScreenCallback();
							}, 50)
						}
					}
				});
			}
		}
	}
}
</script>
