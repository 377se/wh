import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

export const menuEntries = [
	{
		section_title: "Applications"
	},
	{
		id: uniqueID(),
		title: "Chat",
		icon: "mdi mdi-message-outline",
		page: "/pages/chat"
	},
	{
		id: uniqueID(),
		title: "Invoices",
		icon: "mdi mdi-receipt",
		page: "/pages/invoices"
	},
	{
		id: uniqueID(),
		title: "Mailbox",
		icon: "mdi mdi-email-outline",
		page: "/pages/mailbox"
	},
	{
		id: uniqueID(),
		title: "Task Board",
		icon: "mdi mdi-calendar-text",
		page: "/pages/task_board"
	},
	{
		id: uniqueID(),
		title: "Notes",
		icon: "mdi mdi-note-outline",
		page: "/pages/notes"
	},
	{
		section_title: "Menu"
	},
	{
		id: uniqueID(),
		title: "Dashboards",
		page: "/dashboard",
		icon: "mdi mdi-view-dashboard-variant",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Dashboard 1",
				page: "/dashboard/v1"
			},
			{
				id: uniqueID(),
				title: "Dashboard 2",
				page: "/dashboard/v2"
			}
		]
	},
	{
		id: uniqueID(),
		title: "Forms",
		page: "/forms",
		icon: "mdi mdi-format-line-style",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Regular Elements",
				page: "/forms/regular_elements"
			},
			{
				id: uniqueID(),
				title: "Advanced Elements",
				page: "/forms/advanced_elements",
				isOpen: false,
				submenu: [
					{
						id: uniqueID(),
						title: "Checkboxes, Radio Buttons",
						page: "/forms/advanced_elements/checkbox_radio"
					},
					{
						id: uniqueID(),
						title: "Color Picker",
						page: "/forms/advanced_elements/color_picker"
					},
					{
						id: uniqueID(),
						title: "Date Picker",
						page: "/forms/advanced_elements/date_picker"
					},
					{
						id: uniqueID(),
						title: "Date Range Picker",
						page: "/forms/advanced_elements/date_range_picker"
					},
					{
						id: uniqueID(),
						title: "Input Mask",
						page: "/forms/advanced_elements/inputmask"
					},
					{
						id: uniqueID(),
						title: "Multiselect",
						page: "/forms/advanced_elements/multiselect"
					},
					{
						id: uniqueID(),
						title: "Range Slider",
						page: "/forms/advanced_elements/range_slider"
					},
					{
						id: uniqueID(),
						title: "Rating",
						page: "/forms/advanced_elements/rating"
					},
					{
						id: uniqueID(),
						title: "Select 2",
						page: "/forms/advanced_elements/select2"
					},
					{
						id: uniqueID(),
						title: "Switches",
						page: "/forms/advanced_elements/switches"
					},
					{
						id: uniqueID(),
						title: "Time Picker",
						page: "/forms/advanced_elements/time_picker"
					}
				]
			},
			{
				id: uniqueID(),
				title: "Dynamic Fields",
				page: "/forms/dynamic_fields"
			},
			{
				id: uniqueID(),
				title: "Validation",
				page: "/forms/validation"
			},
			{
				id: uniqueID(),
				title: "Form Examples",
				page: "/forms/examples/",
				isOpen: false,
				level: 1,
				submenu: [
					{
						id: uniqueID(),
						title: "Advertising Evaluation Form",
						page: "/forms/examples/advertising_evaluation_form"
					},
					{
						id: uniqueID(),
						title: "Booking Form",
						page: "/forms/examples/booking_form"
					},
					{
						id: uniqueID(),
						title: "Car Rental Form",
						page: "/forms/examples/car_rental_form"
					},
					{
						id: uniqueID(),
						title: "Checkout Form",
						page: "/forms/examples/checkout_form"
					},
					{
						id: uniqueID(),
						title: "Contact Forms",
						page: "/forms/examples/contact_forms"
					},
					{
						id: uniqueID(),
						title: "Job Application Form",
						page: "/forms/examples/job_application_form"
					},
					{
						id: uniqueID(),
						title: "Medical History Form",
						page: "/forms/examples/medical_history_form"
					},
					{
						id: uniqueID(),
						title: "Registration Form",
						page: "/forms/examples/registration_form"
					},
					{
						id: uniqueID(),
						title: "Rental Application Form",
						page: "/forms/examples/rental_application_form"
					},
					{
						id: uniqueID(),
						title: "Transaction Feedback Form",
						page: "/forms/examples/transaction_feedback_form"
					}
				]
			},
			{
				id: uniqueID(),
				title: "Wizard",
				page: "/forms/wizard"
			},
			{
				section_title: "WYSIWYG Editors"
			},
			{
				id: uniqueID(),
				title: "CKEditor",
				page: "/forms/wysiwyg/ckeditor"
			},
			{
				id: uniqueID(),
				title: "Quill",
				page: "/forms/wysiwyg/quill"
			}
		]
	},
	{
		id: uniqueID(),
		title: "Components",
		page: "/components",
		icon: "mdi mdi-puzzle",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Accordion",
				page: "/components/accordion"
			},
			{
				id: uniqueID(),
				title: "Alert",
				page: "/components/alert"
			},
			{
				id: uniqueID(),
				title: "Animations",
				page: "/components/animations",
			},
			{
				id: uniqueID(),
				title: "Avatars",
				page: "/components/avatars"
			},
			{
				id: uniqueID(),
				title: "Badge, Label",
				page: "/components/badge_label"
			},
			{
				id: uniqueID(),
				title: "Base",
				page: "/components/base"
			},
			{
				id: uniqueID(),
				title: "Breadcrumb",
				page: "/components/breadcrumb"
			},
			{
				id: uniqueID(),
				title: "Buttons",
				page: "/components/buttons"
			},
			{
				id: uniqueID(),
				title: "FAB Buttons",
				page: "/components/fab_buttons"
			},
			{
				id: uniqueID(),
				title: "Cards",
				page: "/components/cards"
			},
			{
				id: uniqueID(),
				title: "Color Palette",
				page: "/components/color_palette"
			},
			{
				id: uniqueID(),
				title: "Drop/Dropdowns",
				page: "/components/drop_dropdowns"
			},
			{
				id: uniqueID(),
				title: "Filters",
				page: "/components/filters"
			},
			{
				id: uniqueID(),
				title: "Footer",
				page: "/components/footer"
			},
			{
				id: uniqueID(),
				title: "Fancy Footer",
				page: "/components/fancy_footer",
				tag: "new"
			},
			{
				id: uniqueID(),
				title: "Grid",
				page: "/components/grid"
			},
			{
				id: uniqueID(),
				title: "Height",
				page: "/components/height"
			},
			{
				id: uniqueID(),
				title: "Icons",
				page: "/components/icons"
			},
			{
				id: uniqueID(),
				title: "Lists",
				page: "/components/lists"
			},
			{
				id: uniqueID(),
				title: "Masonry",
				page: "/components/masonry"
			},
			{
				id: uniqueID(),
				title: "Modals/Dialogs",
				page: "/components/modals_dialogs"
			},
			{
				id: uniqueID(),
				title: "Notifications",
				page: "/components/notifications"
			},
			{
				id: uniqueID(),
				title: "Overlay",
				page: "/components/overlay"
			},
			{
				id: uniqueID(),
				title: "Pagination",
				page: "/components/pagination"
			},
			{
				id: uniqueID(),
				title: "Scrollable",
				page: "/components/scrollable"
			},
			{
				id: uniqueID(),
				title: "Progress/Spinners",
				page: "/components/progress_spinners"
			},
			{
				id: uniqueID(),
				title: "Slider",
				page: "/components/slider"
			},
			{
				id: uniqueID(),
				title: "Sortable",
				page: "/components/sortable"
			},
			{
				id: uniqueID(),
				title: "Swipe List",
				page: "/components/swipe_list",
				tag: "new"
			},
			{
				id: uniqueID(),
				title: "Tables",
				page: "/components/tables"
			},
			{
				id: uniqueID(),
				title: "Tabs",
				page: "/components/tabs"
			},
			{
				id: uniqueID(),
				title: "Timeline",
				page: "/components/timeline"
			},
			{
				id: uniqueID(),
				title: "Toolbar",
				page: "/components/toolbar"
			},
			{
				id: uniqueID(),
				title: "Tooltips",
				page: "/components/tooltips"
			},
			{
				id: uniqueID(),
				title: "Transitions",
				page: "/components/transitions"
			},
			{
				id: uniqueID(),
				title: "Width",
				page: "/components/width"
			}
		]
	},
	{
		id: uniqueID(),
		title: "Pages",
		page: "/pages",
		icon: "mdi mdi-application",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Blank",
				page: "/pages/blank"
			},
			{
				id: uniqueID(),
				title: "Blank (expanded header)",
				page: "/pages/blank_header_expanded"
			},
			{
				id: uniqueID(),
				title: "Contact List",
				page: "/pages/contact_list"
			},
			{
				id: uniqueID(),
				title: "Contact List (single)",
				page: "/pages/contact_list_single"
			},
			{
				id: uniqueID(),
				title: "Data Visualization",
				page: "/pages/data_visualization"
			},
			{
				id: uniqueID(),
				title: "404 Error Page",
				page: "/url_to_test_404_error"
			},
			{
				id: uniqueID(),
				title: "Gallery",
				page: "/pages/gallery"
			},
			{
				id: uniqueID(),
				title: "Help/Faq",
				page: "/pages/help_faq"
			},
			{
				id: uniqueID(),
				title: "New Invoice",
				page: "/pages/invoices/new"
			},
			{
				section_title: "Issue Tracker"
			},
			{
				id: uniqueID(),
				title: "List View",
				page: "/pages/issues/list"
			},
			{
				id: uniqueID(),
				title: "Issue Details",
				page: "/pages/issues/details"
			},
			{
				separator: true
			},
			{
				id: uniqueID(),
				title: "Login Page",
				page: "/login_page"
			},
			{
				id: uniqueID(),
				title: "POI listing",
				page: "/pages/poi_listing"
			},
			{
				id: uniqueID(),
				title: "Pricing Tables",
				page: "/pages/pricing_tables"
			},
			{
				id: uniqueID(),
				title: "Settings",
				page: "/pages/settings"
			},
			{
				id: uniqueID(),
				title: "User Profile",
				page: "/pages/user_profile"
			}
		]
	},
	{
		id: uniqueID(),
		title: "Plugins",
		page: "/plugins",
		icon: "mdi mdi-power-plug",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Ajax",
				page: "/plugins/ajax"
			},
			{
				id: uniqueID(),
				title: "Calendar",
				page: "/plugins/calendar"
			},
			{
				id: uniqueID(),
				title: "Calendar/Events",
				page: "/plugins/calendar_events",
				tag: "new"
			},
			{
				id: uniqueID(),
				title: "Charts",
				page: "/plugins/charts"
			},
			{
				id: uniqueID(),
				title: "Code Editor",
				page: "/plugins/code_editor"
			},
			{
				id: uniqueID(),
				title: "Data Grid",
				page: "/plugins/data_grid"
			},
			{
				id: uniqueID(),
				title: "Datatables",
				page: "/plugins/datatables"
			},
			{
				id: uniqueID(),
				title: "Diff Tool",
				page: "/plugins/diff_tool"
			},
			{
				id: uniqueID(),
				title: "Gantt Chart",
				page: "/plugins/gantt_chart"
			},
			{
				id: uniqueID(),
				title: "Google Maps",
				page: "/plugins/google_maps"
			},
			{
				id: uniqueID(),
				title: "Idle Timeout",
				page: "/plugins/idle_timeout"
			},
			{
				id: uniqueID(),
				title: "Image Cropper",
				page: "/plugins/image_cropper"
			},
			{
				id: uniqueID(),
				title: "Push Notifications",
				page: "/plugins/push_notifications"
			},
			{
				id: uniqueID(),
				title: "Tour",
				page: "/plugins/tour"
			},
			{
				id: uniqueID(),
				title: "Tree",
				page: "/plugins/tree"
			},
			{
				id: uniqueID(),
				title: "Vector Maps",
				page: "/plugins/vector_maps"
			},
			{
				id: uniqueID(),
				title: "Vue Good Table",
				page: "/plugins/vue_good_table"
			}
		]
	},
	{
		id: uniqueID(),
		title: "Layout",
		page: "/layout",
		icon: "mdi mdi-view-compact-outline",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Top Menu",
				page: "/layout/top_menu"
			},
			{
				id: uniqueID(),
				title: "Mini Sidebar",
				page: "/layout/mini_sidebar"
			},
			{
				id: uniqueID(),
				title: "Offcanvas Sidebar",
				page: "/layout/offcanvas_sidebar",
				tag: "new"
			}
		]
	},
	{
		id: uniqueID(),
		title: "Multi level",
		page: "",
		icon: "mdi mdi-format-line-weight",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Submenu 1",
				page: ""
			},
			{
				id: uniqueID(),
				title: "Submenu 2",
				page: "",
				isOpen: false,
				level: 1,
				submenu: [
					{
						id: uniqueID(),
						title: "Submenu 2.1",
						page: ""
					},
					{
						id: uniqueID(),
						title: "Submenu 2.2",
						page: "",
						isOpen: false,
						level: 2,
						submenu: [
							{
								id: uniqueID(),
								title: "Submenu 2.2.1",
								page: ""
							},
							{
								id: uniqueID(),
								title: "Submenu 2.2.2",
								page: ""
							},
							{
								id: uniqueID(),
								title: "Submenu 2.2.3",
								page: ""
							}
						]
					},
					{
						id: uniqueID(),
						title: "Submenu 2.3",
						page: ""
					},
					{
						id: uniqueID(),
						title: "Submenu 2.4",
						page: ""
					}
				]
			},
			{
				id: uniqueID(),
				title: "Submenu 3",
				page: ""
			},
			{
				id: uniqueID(),
				title: "Submenu 4",
				page: "",
				isOpen: false,
				level: 1,
				submenu: [
					{
						id: uniqueID(),
						title: "Submenu 4.1",
						page: ""
					},
					{
						id: uniqueID(),
						title: "Submenu 4.2",
						page: ""
					},
					{
						id: uniqueID(),
						title: "Submenu 4.3",
						page: ""
					}
				]
			}
		]
	}
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
