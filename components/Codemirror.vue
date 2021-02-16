<template>
	<div class="vue-codemirror" :class="{ merge }">
		<div v-if="merge" ref="mergeview"></div>
		<textarea v-else ref="textarea" :name="name" :placeholder="placeholder"></textarea>
		<slot></slot>
	</div>
</template>

<script>
// lib
import _CodeMirror from 'codemirror'
const CodeMirror = window.CodeMirror || _CodeMirror

// pollfill
if (typeof Object.assign != 'function') {
	Object.defineProperty(Object, 'assign', {
		value (target, varArgs) {
			if (target == null) {
				throw new TypeError('Cannot convert undefined or null to object')
			}
			const to = Object(target)
			for (let index = 1; index < arguments.length; index++) {
				const nextSource = arguments[index]
				if (nextSource != null) {
					for (const nextKey in nextSource) {
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey]
						}
					}
				}
			}
			return to
		},
		writable: true,
		configurable: true
	})
}

// export
export default {
	name: 'Codemirror',
	props: {
		code:  {
			type: String,
			default: ''
		},
		value: {
			type: String,
			default: ''
		},
		marker: {
			type: String,
			default: () => {}
		},
		unseenLines: {
			type: Array,
			default: () => []
		},
		name: {
			type: String,
			default: 'codemirror'
		},
		placeholder: {
			type: String,
			default: ''
		},
		merge: {
			type: Boolean,
			default: false
		},
		options: {
			type: Object,
			default: () => ({})
		},
		events: {
			type: Array,
			default: () => ([])
		},
		globalOptions: {
			type: Object,
			default: () => ({})
		},
		globalEvents: {
			type: Array,
			default: () => ([])
		}
	},
	data: function () {
		return {
			content: '',
			codemirror: null,
			cminstance: null,
			localOptions: JSON.parse(JSON.stringify(this.options))
		}
	},
	watch: {
		options: {
			deep: true,
			handler (options) {
				this.localOptions = JSON.parse(JSON.stringify(this.options))
				for (const key in options) {
					this.cminstance.setOption(key, options[key])
				}
			}
		},
		merge () {
			this.$nextTick(this.switchMerge)
		},
		code (newVal) {
			this.handerCodeChange(newVal)
		},
		value (newVal) {
			this.handerCodeChange(newVal)
		},
	},
	mounted () {
		this.initialize()
	},
	beforeDestroy () {
		this.destroy()
	},
	methods: {
		initialize () {
			const cmOptions = Object.assign({}, this.globalOptions, this.localOptions);
			if (this.merge) {
				this.codemirror = CodeMirror.MergeView(this.$refs.mergeview, cmOptions);
				this.cminstance = this.codemirror.edit
			} else {
				this.codemirror = CodeMirror.fromTextArea(this.$refs.textarea, cmOptions);
				this.cminstance = this.codemirror;
				this.cminstance.setValue(this.code || this.value || this.content)
			}
			this.cminstance.on('change', cm => {
				this.content = cm.getValue()
				if (this.$emit) {
					this.$emit('input', this.content)
				}
			});
			const tmpEvents = {};
			const allEvents = [
				'scroll',
				'changes',
				'beforeChange',
				'cursorActivity',
				'keyHandled',
				'inputRead',
				'electricInput',
				'beforeSelectionChange',
				'viewportChange',
				'swapDoc',
				'gutterClick',
				'gutterContextMenu',
				'focus',
				'blur',
				'refresh',
				'optionChange',
				'scrollCursorIntoView',
				'update'
			]
				.concat(this.events)
				.concat(this.globalEvents)
				.filter(e => (!tmpEvents[e] && (tmpEvents[e] = true)))
				.forEach(event => {
					this.cminstance.on(event, (...args) => {
						this.$emit(event, ...args)
						const lowerCaseEvent = event.replace(/([A-Z])/g, '-$1').toLowerCase()
						if (lowerCaseEvent !== event) {
							this.$emit(lowerCaseEvent, ...args)
						}
					})
				});

			this.$emit('ready', this.codemirror);
			this.unseenLineMarkers();
			// prevents funky dynamic rendering
			this.refresh()
		},
		refresh () {
			this.$nextTick(() => {
				this.cminstance.refresh()
			})
		},
		destroy () {
			// garbage cleanup
			const element = this.cminstance.doc.cm.getWrapperElement()
			element && element.remove && element.remove()
		},
		handerCodeChange (newVal) {
			const cm_value = this.cminstance.getValue()
			if (newVal !== cm_value) {
				const scrollInfo = this.cminstance.getScrollInfo()
				this.cminstance.setValue(newVal)
				this.content = newVal
				this.cminstance.scrollTo(scrollInfo.left, scrollInfo.top)
			}
			this.unseenLineMarkers()
		},
		unseenLineMarkers () {
			if (this.unseenLines !== undefined && this.marker !== undefined) {
				this.unseenLines.forEach(line => {
					const info = this.cminstance.lineInfo(line)
					this.cminstance.setGutterMarker(line, 'breakpoints', info.gutterMarkers ? null : this.marker())
				})
			}
		},
		switchMerge () {
			// Save current values
			const history = this.cminstance.doc.history
			const cleanGeneration = this.cminstance.doc.cleanGeneration
			this.localOptions.value = this.cminstance.getValue()

			this.destroy()
			this.initialize()

			// Restore values
			this.cminstance.doc.history = history
			this.cminstance.doc.cleanGeneration = cleanGeneration
		}
	}
}
</script>
