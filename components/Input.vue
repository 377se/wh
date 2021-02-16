<template>
	<div
		class="sc-input-wrapper"
		:class="{
			'sc-input-wrapper-outline': mode === 'outline',
			'sc-input-wrapper-disabled': disabled,
			'sc-input-wrapper-danger': errorState,
			'sc-input-wrapper-success': successState,
			'sc-input-filled': value !== '' || state === 'fixed',
			'sc-input-focus': inputFocused
		}"
	>
		<slot name="icon"></slot>
		<slot></slot>
		<input
			:id="id"
			ref="input"
			:name="name"
			:placeholder="placeholder"
			:type="type"
			:value="value"
			:class="['uk-input', 'sc-vue-input', modeClass, inputErrorClass, inputSuccessClass, extraClasses]"
			:disabled="disabled"
			:readonly="readOnly"
			@focus="inputFocus"
			@blur="inputBlur"
			@change="inputChange"
			@input="$emit('input', $event.target.value)"
			@keyup="inputKeyUp"
		>
		<span v-if="mode !== 'outline'" class="sc-input-bar"></span>
		<slot name="help-inline"></slot>
	</div>
</template>

<script>
export default {
	name: 'ScInput',
	props: {
		id: {
			type: String,
			default: null,
		},
		name: {
			type: String,
			default: null
		},
		type: {
			type: String,
			default: 'text'
		},
		value: {
			type: [String, Object],
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
		inputFocused: false
	}),
	computed: {
		modeClass () {
			return this.$props.mode === 'outline' ? 'sc-input-outline' : ''
		},
		inputErrorClass () {
			return this.$props.errorState ? 'uk-form-danger' : ''
		},
		inputSuccessClass () {
			return this.$props.successState ? 'uk-form-success' : ''
		}
	},
	mounted () {
		var self = this;
		if(self.ukTooltip) {
			UIkit.tooltip(self.$refs.input, self.ukTooltip);
		}
	},
	methods: {
		inputBlur () {
			this.inputFocused = false;
			if(this.blur) {
				this.blur();
			}
			if(this.validator) {
				this.validator.$touch();
			}
			this.$emit('blur');
		},
		inputFocus () {
			this.inputFocused = true;
			if(this.focus) {
				this.focus();
			}
			this.$emit('focus');
		},
		inputChange () {
			if(this.change) {
				this.change();
			}
			this.$emit('change');
		},
		inputKeyUp () {
			if(this.keyUp) {
				this.keyUp();
			}
			this.$emit('keyUp');
		}
	}
}
</script>
