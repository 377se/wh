/*
* Fake Data (based on chance.js)
* */

const chance = require('chance').Chance();

// address
export function address (options) {
	return chance.address(options)
}

// city
export function city (options) {
	return chance.city(options)
}

// company
export function company (options) {
	return chance.company(options)
}

// email
export function email (options) {
	return chance.email(options)
}

// first
export function first (options) {
	return chance.first(options)
}

// floating
export function floating (options) {
	return chance.floating(options)
}

// last
export function last (options) {
	return chance.last(options)
}

// sentence
export function n (options) {
	return chance.n(options)
}

// name
export function name (options) {
	return chance.name(options)
}

// phone
export function phone (options) {
	return chance.phone(options)
}

// sentence
export function sentence (options) {
	return chance.sentence(options)
}

export default {
	address,
	city,
	company,
	email,
	first,
	floating,
	last,
	n,
	name,
	phone,
	sentence
}
