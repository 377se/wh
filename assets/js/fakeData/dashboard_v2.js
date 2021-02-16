import { uniqueID } from "~/assets/js/scutum_common";
const chance = require('chance').Chance();

const dashboardOrders = [
	{
		id: uniqueID(),
		name: 'Samsung 128GB 100MB/s (U3) MicroSD',
		price: '19.99',
		status: 'sent',
		user: chance.name(),
		quantity: Math.floor(Math.random() * 3) + 1
	},
	{
		id: uniqueID(),
		name: 'Nintendo Switch – Neon Red and Neon Blue Joy-Con',
		price: '299.00',
		status: 'canceled',
		user: chance.name(),
		quantity: Math.floor(Math.random() * 3) + 1
	},
	{
		id: uniqueID(),
		name: 'Oral-B Black Pro 1000 Power Rechargeable Electric Toothbrush',
		price: '39.94',
		status: 'pending',
		user: chance.name(),
		quantity: Math.floor(Math.random() * 3) + 1
	},
	{
		id: uniqueID(),
		name: 'iRobot Roomba 960 Robot Vacuum with Wi-Fi Connectivity',
		price: '314.30',
		status: 'pending',
		user: chance.name(),
		quantity: Math.floor(Math.random() * 3) + 1
	},
	{
		id: uniqueID(),
		name: 'Fujitsu ScanSnap iX500 Color Duplex Desk Scanner for Mac and PC',
		price: '404.95',
		status: 'sent',
		user: chance.name(),
		quantity: Math.floor(Math.random() * 3) + 1
	},
	{
		id: uniqueID(),
		name: 'Samsung Galaxy Watch (46mm) Silver (Bluetooth)',
		price: '349.99',
		status: 'on hold',
		user: chance.name(),
		quantity: Math.floor(Math.random() * 3) + 1
	},
	{
		id: uniqueID(),
		name: 'Sonos Play:1 – Compact Wireless Home Smart Speaker for Streaming Music',
		price: '149.00',
		status: 'on hold',
		user: chance.name(),
		quantity: Math.floor(Math.random() * 3) + 1
	},
	{
		id: uniqueID(),
		name: 'Fitbit Charge 3 Fitness Activity Tracker',
		price: '149.95',
		status: 'canceled',
		user: chance.name(),
		quantity: Math.floor(Math.random() * 3) + 1
	},
	{
		id: uniqueID(),
		name: 'Dyson Cyclone V10 Absolute Lightweight Cordless Stick Vacuum Cleaner',
		price: '527.94',
		status: 'pending',
		user: chance.name(),
		quantity: Math.floor(Math.random() * 3) + 1
	},
	{
		id: uniqueID(),
		name: 'Logitech Harmony Elite Remote Control',
		price: '184.99',
		status: 'sent',
		user: chance.name(),
		quantity: Math.floor(Math.random() * 3) + 1
	}
];

console.log(JSON.stringify(dashboardOrders));

export const orders = dashboardOrders;
