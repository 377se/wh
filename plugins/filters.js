import Vue from 'vue'
import numeral from 'numeral';
import 'numeral/locales/fr';

Vue.filter("toUppercase", function (value, format) {
	if(!value) {
		return
	}
	return value.toUpperCase();
});

Vue.filter("capitalize", function (value, format) {
	if (!value && value !== 0) return;
	return value.replace(/\b\w/g, l => l.toUpperCase());
});

Vue.filter("formatNumber", function (value, format) {
	if(!value) {
		return
	}
	if (format === '0 0') {
		return numeral(value).format('0,0').replace(/,/g, ' ')
	}
	return numeral(value).format(format);
});

Vue.filter("randomizeNumber", function (value, min, max) {
	if(!value) {
		return
	}
	return Math.floor(Math.random() * max) + min
});

Vue.filter('stripHTML', function (value) {
	if(!value) {
		return
	}
	return value.replace(/<(?:.|\n)*?>/gm, '');
});

Vue.filter('truncate', function (text, length, clamp) {
	text = text || '';
	clamp = clamp || '...';
	length = length || 50;
	if (text.length <= length) return text;
	var tcText = text.slice(0, length - clamp.length);
	var last = tcText.length - 1;
	while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1;
	last = last || length - clamp.length;
	tcText =  tcText.slice(0, last);
	return tcText + clamp;
});

Vue.filter("formatCurrency", function (value, currency) {
	if(!value) {
		return
	}
	if (currency === 'USD') {
		numeral.locale('en');
		return numeral(value).format('$0,0.00')
	}
	if (currency === 'EUR') {
		numeral.locale('fr');
		return numeral(value).format('0,0.00 $')
	}
	return numeral(value);
});

Vue.filter('initials', function (value) {
	if(!value) {
		return
	}
	var initials = value.match(/\b\w/g) || [];
	return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
});

Vue.filter('json', function (value) {
	if(!value) {
		return
	}
	return JSON.stringify(value, null, 2);
});

Vue.filter('hashCCnumber', function (value) {
	if(!value) {
		return
	}
	return value.replace(/[^0-9]+/g, '').replace(/[0-9](?=([0-9]{4}))/g, '*');
});

