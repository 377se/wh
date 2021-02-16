<template>
	<div
		class="sc-input-wrapper"
		:class="{
			'sc-input-wrapper-outline': mode === 'outline',
			'sc-input-wrapper-disabled': disabled,
			'sc-input-wrapper-danger': errorState,
			'sc-input-wrapper-success': successState,
			'sc-input-filled': value !== '' || state === 'fixed',
			'sc-input-focus': txtFocused
		}"
	>
		<slot></slot>
		<textarea
			:id="id"
			ref="textarea"
			v-autosize
			:name="name"
			:value="value"
			:placeholder="placeholder"
			:rows="rows"
			:class="['uk-textarea', 'sc-vue-input', modeClass, dangerClass, successClass, extraClasses]"
			:disabled="disabled"
			:readonly="readOnly"
			@focus="txtFocus"
			@blur="txtBlur"
			@change="txtChange"
			@input="$emit('input', $event.target.value)"
			@keyup="txtKeyUp"
		>
		</textarea>
		<span v-if="mode !== 'outline'" class="sc-input-bar"></span>
	</div>
</template>

<script>
var autosize = require('autosize');
export default {
	name: 'ScTextarea',
	directives: {
		autosize: {
			bind (el, binding, vnode) {
				if(vnode.context.$props.autosize) {
					vnode.context.$nextTick(() => {
						autosize(el);
					})
				}
			},
			componentUpdated (el, binding, vnode) {
				if(vnode.context.$props.autosize) {
					autosize.update(el)
				}
			},
			unbind (el) {
				autosize.destroy(el)
			}
		}
	},
	props: {
		id: {
			type: String,
			default: null,
		},
		name: {
			type: String,
			default: ''
		},
		value: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readOnly: {
			type: Boolean,
			default: false
		},
		mode: {
			type: String,
			default: ''
		},
		state: {
			type: String,
			default: ''
		},
		extraClasses: {
			type: String,
			default: ''
		},
		successState: {
			type: Boolean,
			default: false
		},
		errorState: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: null
		},
		rows: {
			type: Number,
			default: 5
		},
		cols: {
			type: Number,
			default: 10
		},
		autosize: {
			type: Boolean,
			default: false
		},
		ukTooltip: {
			type: Object,
			default: null
		},
		focus: {
			type: Function,
			default: null
		},
		blur: {
			type: Function,
			default: null
		},
		change: {
			type: Function,
			default: null
		},
		keyUp: {
			type: Function,
			default: null
		},
		validator: {
			type: Object,
			default: null
		}
	},
	data: () => ({
		txtFocused: false
	}),
	computed: {
		modeClass () {
			return this.$props.mode === 'outline' ? 'sc-textarea-outline' : ''
		},
		dangerClass () {
			return this.$props.errorState ? 'uk-form-danger' : ''
		},
		successClass () {
			return this.$props.successState ? 'uk-form-success' : ''
		}
	},
	mounted () {
		var self = this;
		if(this.ukTooltip) {
			UIkit.tooltip(self.$refs.teaxtarea, self.ukTooltip);
		}
	},
	methods: {
		txtBlur () {
			this.txtFocused = false;
			if(this.blur) {
				this.blur();
			}
			if(this.validator) {
				this.validator.$touch();
			}
			this.$emit('blur');
		},
		txtFocus () {
			this.txtFocused = true;
			if(this.focus) {
				this.focus();
			}
			this.$emit('focus');
		},
		txtChange () {
			if(this.change) {
				this.change();
			}
			this.$emit('change');
		},
		txtKeyUp () {
			if(this.keyUp) {
				this.keyUp()
			}
			this.$emit('keyUp');
		}
	}
}
</script>
