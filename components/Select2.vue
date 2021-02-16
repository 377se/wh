<template>
	<div
		:class="{
			'select2-wrapper-danger': errorState,
			'select2-wrapper-success': successState
		}"
	>
		<select :id="id" class="form-control" :placeholder="placeholder" :disabled="disabled">
			<slot></slot>
		</select>
	</div>
</template>

<script>
import { scValidation } from '~/assets/js/utils';

require('~/plugins/jquery');
require('select2');
require('select2/dist/css/select2.min.css');

export default {
	name: 'Select2',
	model: {
		event: 'change',
		prop: 'value'
	},
	props: {
		id: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		options: {
			type: Array,
			default: () => []
		},
		disabled: {
			type: Boolean,
			default: false
		},
		settings: {
			type: Object,
			default: () => {}
		},
		multiple: {
			type: Boolean,
			'default': false
		},
		value: {
			type: [String, Array],
			default: null
		},
		successState: {
			type: Boolean,
			default: false
		},
		errorState: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		select2: null,
	}),
	computed: {
		userSettings () {
			var config = {};
			const self = this;
			Object.keys(this.settings).forEach(function (k) {
				if (k === 'createTag' && self.settings[k] === 'emailAddress') {
					config[k] = function (params) { return !scValidation.emailAddress(params.term) ? null : { id: params.term, text: params.term } };
				}
				// country flags
				else if (k === 'templateResult' && self.settings[k] === 'formatCountryResult') {
					config[k] = function (country) {
						if (!country.id) { return country.text; }
						return $('<span class="select2-search__flags"><span class="flag flag-' + country.id.toLowerCase() + '"></span><span>' + country.text + '</span>');
					}
				}
				else if (k === 'templateSelection' && self.settings[k] === 'formatCountrySelection') {
					config[k] = function (data, container) {
						if (!data.id) { return data.text; }
						return $('<span class="select2-selection__flag"><span class="flag flag-' + data.id.toLowerCase() + '"></span><span>' + data.text + '</span>');
					}
				}
				else {
					config[k] = self.settings[k]
				}
			});
			// if(!self.oldSettings || (JSON.stringify(this.oldSettings) !== JSON.stringify(config))) {
			// 	self.oldSettings = config;
			// }
			return config
		}
	},
	watch: {
		options (val) {
			this.setOption(val);
		},
		value (val) {
			this.setValue(val);
		}
	},
	mounted () {
		this.select2 = $(this.$el)
			.find('select')
			.select2({
				...this.userSettings,
				data: this.options,
				multiple: this.multiple
			})
			.on('select2:select select2:unselect', ev => {
				this.$emit('change', this.select2.val());
				this.$emit('select', ev['params']['data']);
			})
			.on('select2:open', ev => {
				var $dropdown = $('.select2-dropdown');
				if ($dropdown.hasClass('select2-dropdown--above')) {
					$dropdown.removeClass('uk-animation-slide-top-small').addClass("uk-animation-slide-bottom-small");
				} else {
					$dropdown.removeClass('uk-animation-slide-bottom-small').addClass("uk-animation-slide-top-small");
				}
			});
		this.setValue(this.value);
	},
	beforeDestroy () {
		this.select2.select2('destroy');
		this.$el.style.height = '45px';
		this.$el.style.visibility = 'hidden';
	},
	methods: {
		setOption (val = []) {
			this.select2.empty();
			this.select2.select2({
				...this.userSettings,
				data: val
			});
			this.setValue(this.value);
		},
		setValue (val) {
			if (val instanceof Array) {
				this.select2.val([...val]);
			} else {
				this.select2.val([val]);
			}
			this.select2.trigger('change');
		}
	}
};
</script>
<style lang="scss">
	@import '../assets/scss/plugins/select2.scss';
</style>
