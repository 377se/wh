/**
 * Check if RTL mode is active
 * @returns {boolean}
 */
export function isRTL () {
	const getComputedStyle = window.getComputedStyle || function (element) {
		return element.currentStyle;
	};
	const html = document.documentElement;
	const style = getComputedStyle( html );
	return style.direction === 'rtl';
}
/**
 * Merge defaults with user options
 * @param defaults
 * @param options
 */
export function extend (defaults, options) {
	let extended = {};
	let prop;
	for (prop in defaults) {
		if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
			extended[prop] = defaults[prop];
		}
	}
	for (prop in options) {
		if (Object.prototype.hasOwnProperty.call(options, prop)) {
			extended[prop] = options[prop];
		}
	}
	return extended;
}
/**
 * Split an array into multiple sub array
 * @param arr
 * @param n
 * @returns {*}
 */
export function splitArr (arr, n) {
	return arr.reduce(function (a, i) {
		if (a[a.length - 1].length >= arr.length / n) {
			a.push([])
		}
		a[a.length - 1].push(i);
		return a;
	}, [[]])
}
/**
 * Generate unique ID ()
 * @param length
 * @returns {string}
 */
export function uniqueID (length) {
	let id = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
	const _length = length || 8;
	for (let i = 0; i < _length; i++) {
		id += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return id;
}
/**
 * Check if device has hi-res display
 * @returns {boolean}
 */
export function isHiRes () {
	const mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)";
	if (window.devicePixelRatio > 1) {
		return true;
	}
	return window.matchMedia && window.matchMedia(mediaQuery).matches;
}

export default {
	isRTL,
	extend,
	splitArr,
	uniqueID,
	isHiRes
}
