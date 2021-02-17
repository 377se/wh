import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

export const menuEntries = [
	{
		id: uniqueID(),
		title: "Hem",
		icon: "mdi mdi-home",
		page: "/"
	},
];

// get all titles
// const titles = [];
// function deepFind (key, list) {
// 	list.forEach((entry) => {
// 		if(entry[key]) {
// 			titles.push(entry[key])
// 		}
// 		if(entry.submenu) {
// 			deepFind('title', entry.submenu)
// 		}
// 	})
// };
// deepFind('title', menuEntries);
// console.log(titles);
