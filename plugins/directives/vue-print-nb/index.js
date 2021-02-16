import Print from './printarea.js';
/**
 * https://github.com/Power-kxLee/vue-print-nb
 * @file print
 * Command `v-print` prints the entire window by default
 * Pass in the parameter `v-print="'#id'"`, the parameter is the element ID that will be printed.
 */
export default {
	directiveName: 'print',
	bind (el, binding, vnode) {
		let vue = vnode.context;
		let closeBtn = true;
		let id = '';
		el.addEventListener('click', () => {
			vue.$nextTick(() => {
				if (typeof binding.value === 'string') {
					id = binding.value;
				} else if (typeof binding.value === 'object' && !!binding.value.id) {
					id = binding.value.id;
					let ids = id.replace(new RegExp("#", "g"), '');
					let elsdom = document.getElementById(ids);
					if (!elsdom) console.log("id in Error"), id = '';
				}
				// Partial printing
				if (id) {
					localPrint();
				} else {
					// Global printing
					window.print();
				}
			});

		});
		const localPrint = () => {
			if (closeBtn) {
				closeBtn = false;
				new Print({
					ids: id, // * Partial printing must pass in id
					standard: '', // Document type, default is html5, optional html5, loose, strict
					extraHead: binding.value.extraHead, // Additional tags attached to the head tag, separated by commas
					extraCss: binding.value.extraCss, // Additional CSS, separated by multiple commas
					popTitle: binding.value.popTitle, // iframe title
					endCallback () { // Callback event after printing
						closeBtn = true;
					}
				});
			}
		};
	}
};
