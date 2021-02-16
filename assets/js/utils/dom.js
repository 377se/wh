export function offset (el, relative) {
	if (el === window) {
		return { top: 0, left: 0 }
	}
	if (!relative) {
		const { top, left } = el.getBoundingClientRect();
		return { top, left }
	} else {
		const relativePos = {};
		const childrenPos = el.getBoundingClientRect();
		const parentPos = el.parentNode.getBoundingClientRect();

		relativePos.top = childrenPos.top - parentPos.top;
		relativePos.left = childrenPos.left - parentPos.left;

		const { top, left } = relativePos;
		return { top, left }
	}
}

export function style (el, property) {
	return window.getComputedStyle(el).getPropertyValue(property)
}

export function height (el) {
	return el === window
		? window.innerHeight
		: el.getBoundingClientRect().height
}

export function width (el) {
	return el === window
		? window.innerWidth
		: el.getBoundingClientRect().width
}

export function css (element, css) {
	let style = element.style;

	Object.keys(css).forEach(prop => {
		style[prop] = css[prop]
	})
}

export function cssBatch (elements, style) {
	elements.forEach(el => css(el, style))
}

export function ready (fn) {
	if (typeof fn !== 'function') {
		return
	}

	if (document.readyState !== 'loading') {
		return fn()
	}

	document.addEventListener('DOMContentLoaded', fn, false)
}

export function hasClass(el, className) {
	if (el.classList) {
		return el.classList.contains(className)
	} else {
		return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
	}
}

export function addClass (el, className) {
	if (el.classList) {
		el.classList.add(className);
	} else if (!hasClass(el, className)) {
		el.className += " " + className
	}
}

export function removeClass (el, className) {
	if (el.classList) {
		el.classList.remove(className);
	} else if (hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		el.className=el.className.replace(reg, ' ')
	}
}


// https://clubmate.fi/jquerys-closest-function-and-pure-javascript-alternatives/
export function closest (el, fn) {
	return el && (fn(el) ? el : closest(el.parentNode, fn));
}

export default {
	offset,
	style,
	height,
	width,
	css,
	cssBatch,
	ready,
	closest,
	hasClass,
	addClass,
	removeClass
}
