<template>
	<div>
		<slot></slot>
	</div>
</template>

<script>
require('~/plugins/jquery');
import moment from '~/plugins/moment'
if(process.client) {
	require('~/assets/scss/plugins/daterangepicker.scss');
	require('~/assets/js/vendor/date-range-picker/src/jquery.daterangepicker');
}

export default {
	props: {
		value: {
			type: Array,
			default: () => []
		},
		config: {
			type: Object,
			default: () => {}
		}
	},
	data: () => ({
		dpData: null,
		format: 'DD-MM-YYYY',
		emitInput: true
	}),
	watch: {
		value (newVal) {
			if(newVal) {
				this.setRange(newVal);
			}
		}
	},
	mounted () {
		const self = this;
		let startDate = false;
		let endDate = false;
		self.$nextTick(() => {
			if(typeof this.config !== 'undefined') {
				if (this.config.hasOwnProperty('format')) {
					this.format = this.config.format
				}
			}
			let _config = {
				format: self.format,
				separator: '~',
				customArrowPrevSymbol: '<i class="mdi mdi-chevron-left"></i>',
				customArrowNextSymbol: '<i class="mdi mdi-chevron-right"></i>',
				startOfWeek: 'monday',
				customOpenAnimation (cb) {
					$(this).css({'transform': 'translateY(-20px)'}).fadeIn(280, cb).css({'transform': 'translateY(0)'});
				},
				customCloseAnimation (cb) {
					$(this).fadeOut(140, cb).css({'transform': 'translateY(-20px)'});
				}
			};
			const config = $.extend(_config, this.config);
			const input = this.$el.children[0].querySelector('input');
			$(input ? input : this.$el.children)
				.dateRangePicker(config)
				.on('datepicker-change', function (event, obj) {
					if(self.emitInput) {
						self.$emit('input', [self.$moment(obj.date1).format(self.format), self.$moment(obj.date2).format(self.format)])
					}
				})
				.on('datepicker-closed', function () {
					if(self.value.length > 1) {
						self.setRange(self.value);
					}
				});

			this.dpData = $(input ? input : this.$el.children).data('dateRangePicker');

			if(typeof this.value !== 'undefined') {
				this.setRange(this.value);
			}

			const $dpWrapper = $('.date-picker-wrapper');
			// style range input
			$dpWrapper.find('input[type="range"]').addClass('uk-range');
			// remove &nbsp; in shortcuts
			const $shortcuts  = $dpWrapper.find('.footer > .shortcuts');
			if($shortcuts.length)  {
				// $shortcuts.html().replace(/&nbsp;/g, '');
			}
		})
	},
	methods: {
		isValidRange (date1, date2) {
			console.log(date1)
			console.log(date2)
		},
		setRange (dates) {
			if (dates[0] && dates[1]) {
				const date1 = this.$moment(dates[0], this.format);
				const date2 = this.$moment(dates[1], this.format);
				if(date1.isAfter(date2)) {
					console.log(this.$moment(date1).format(this.format) +' is not after ' + this.$moment(date2).format(this.format) + '!')
					return;
				}
				this.emitInput = false;
				this.dpData.setDateRange(dates[0], dates[1]);
				this.emitInput = true;
			}
		}
	}
}
</script>
