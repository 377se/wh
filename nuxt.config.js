/* options */

const mode = 'universal'; // universal/spa
const serveFromSubFolder = false;

/* options end */

const pkg = require('./package');
const path = require('path');

let dist = '';
if(mode === 'universal') {
	dist = 'scutum-universal'
} else {
	dist = 'scutum-spa'
}

module.exports = {
	ssr: mode === 'universal',
	target: 'static',
	/*
	** Headers of the page
	*/
	head: {
		htmlAttrs: {
			lang: 'en'
		},
		title: 'Scutum Admin',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				hid: 'description',
				name: 'description',
				content: pkg.description
			}
		],
		script: [
			{ src: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist ) + '/vendor/uikit.min.js'}
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' :  '/' + dist ) + '/favicon.ico'},
			{ rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/vendor/uikit.min.js', as: 'script' },
			{ rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/roboto_base64.css', as: 'style' },
			{ rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/sourceCodePro_base64.css', as: 'style' },
			{ rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/mdi/css/materialdesignicons.css', as: 'style' },
			/// fonts
			{ rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/roboto_base64.css' },
			{ rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/sourceCodePro_base64.css' },
			{ rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/mdi/css/materialdesignicons.css' }
		]
	},
	/*
	** Customize the progress-bar
	*/
	loading: {
		color: 'rgba(0,0,0,.8)'
	},
	/*
	** Customize the loading-indicator
	** only in spa mode
	*/
	loadingIndicator: {
		color: '#00838f',
		background: 'white'
	},
	/*
	** Global CSS
	*/
	css: [
		'uikit/dist/css/uikit.css'
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		{ src: '~/plugins/components.global.js' },
		{ src: '~/plugins/directives.client.js' },
		{ src: '~/plugins/filters.js' },
		{ src: '~/plugins/mixins.client.js' },
		{ src: '~/plugins/waves.client.js' },
		{ src: '~/plugins/retina.client.js' },
		{ src: '~/plugins/vueVisible.client.js' }
	],
	router: {
		middleware: ['redirect'],
		base: process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '/' : '/' + dist
	},
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/google-analytics',
		[
			'nuxt-i18n', {
				defaultLocale: 'en',
				locales: [
					{
						code: 'en',
						file: 'en-US.js',
						name: 'English'
					},
					{
						code: 'es',
						file: 'es-ES.js',
						name: 'Español'
					},
					{
						code: 'fr',
						file: 'fr-FR.js',
						name: 'Français'
					}
				],
				lazy: true,
				langDir: 'lang/',
				strategy: 'no_prefix',
				vueI18n: {
					fallbackLocale: 'en'
				},
				vuex: {
					syncLocale: true
				}
			}
		]
		// '@nuxtjs/webpack-profile'
	],
	googleAnalytics: {
		id: (mode === 'universal') ? 'UA-136690566-3' : 'UA-136690566-4',
		// disable for development
		dev: process.env.NODE_ENV !== 'production'
	},
	/*
	** The server Property
	** https://nuxtjs.org/api/configuration-server
	*/
	// server: {
	// 	port: 3104, // default: 3000
	// 	timing: false,
	// 	https: {
	// 		key: fs.readFileSync(path.resolve(__dirname, '.https/server.key')),
	// 		cert: fs.readFileSync(path.resolve(__dirname, '.https/server.crt'))
	// 	}
	// },
	generate: {
		dir: dist,
		// dynamic routes
		routes: [
			"/pages/mailbox/message/m8ggvZIAaUOf",
			"/pages/mailbox/message/ghXOYFGJzpRo",
			"/pages/mailbox/message/iQx7OwuSjbwq",
			"/pages/mailbox/message/66f66sWJB6ad",
			"/pages/mailbox/message/ZcbfQqO0aXrx",
			"/pages/mailbox/message/KIRkhYT_bkbk",
			"/pages/mailbox/message/hvQVkUYLEoOj",
			"/pages/mailbox/message/Cm1iK7-KhNaS",
			"/pages/mailbox/message/cWt-Ji7_xdik",
			"/pages/mailbox/message/YUTCwpXoMvCZ",
			"/pages/mailbox/message/2pcPASaudgjQ",
			"/pages/mailbox/message/F5w6_M67hq60",
			"/pages/mailbox/message/F2zHmPeGoKJI",
			"/pages/mailbox/message/byFI6sCw91AY",
			"/pages/mailbox/message/EO0T_GY1gwyd",
			"/pages/mailbox/message/Czv1xDJKXo2Z",
			"/pages/mailbox/message/mNDPPH_6_4k9",
			"/pages/mailbox/message/95beJ_Y2yIfc",
			"/pages/mailbox/message/SsqwPr1-65Gq",
			"/pages/mailbox/message/steVqR-XWCq2",
			"/pages/mailbox/message/ZX2JADL4z0sU",
			"/pages/mailbox/message/UW9tu43TNHfn",
			"/pages/mailbox/message/gAI2kVERal0p",
			"/pages/mailbox/message/cKspRUX_B9Jg",
			"/pages/mailbox/message/Cl3bt9A2ZlKV",
			"/pages/invoices/99a6ebbc-ab55-3354-83d2-a9bf9a402ff6",
			"/pages/invoices/c35492c0-1359-3a50-a827-4a7db54e29fc",
			"/pages/invoices/320a9171-9e92-3406-ba1f-0e686d914f73",
			"/pages/invoices/939b7e44-03d6-3513-b66c-fd8f7f370a03",
			"/pages/invoices/0035f098-4283-3cb8-a5c1-988517331dfb",
			"/pages/invoices/04eef1ca-e6db-32f6-be3a-f8779698cf65",
			"/pages/invoices/5d085ecf-777d-3ded-9fbb-7bf8a2393196",
			"/pages/invoices/a8d12525-731b-3628-bb56-6076dadbb97d",
			"/pages/invoices/c38e8f77-889c-3d6f-8812-e52d2f769982",
			"/pages/invoices/975cf334-3b27-3248-931f-ae07b6dbd585",
			"/pages/invoices/93580474-0f21-3ade-882c-440c83605ab5",
			"/pages/invoices/73bb3070-cebd-3264-b8ef-70d2dbd0d65f",
			"/pages/invoices/2998fb13-0dbc-3859-8593-3e293754ec14",
			"/pages/invoices/c7bf6b47-0911-35d3-a34e-a457f32abc71",
			"/pages/invoices/6b1a69c3-09f2-32c9-baf0-03f2b8879599",
			"/pages/invoices/428abfef-430e-3887-9b1e-cc9abefa6691",
			"/pages/invoices/ace6f975-95ed-3815-9382-b085b77f6d6a",
			"/pages/invoices/1fc7b051-e70a-3019-84d5-bbe36a56f96d",
			"/pages/invoices/c8087fef-0ec6-3edf-9520-582ed5c4648c",
			"/pages/invoices/0b38dd86-e25a-383c-a63e-0f9b4c1b8817",
			"/pages/issues/details/kLRh2kWI",
			"/pages/issues/details/y2wreodu",
			"/pages/issues/details/CZr09MS4",
			"/pages/issues/details/UXxqacSB",
			"/pages/issues/details/HUddfu5a",
			"/pages/issues/details/RzSipnnk",
			"/pages/issues/details/ybdxsnAJ",
			"/pages/issues/details/yjJ1MrCO",
			"/pages/issues/details/DdBZ_1zY",
			"/pages/issues/details/dcrj3eL_",
			"/pages/issues/details/kI7s1Yr7",
			"/pages/issues/details/Vv6-69Uf",
			"/pages/issues/details/c9rF5nXC",
			"/pages/issues/details/IGSNb1qp",
			"/pages/issues/details/d2UlxlK3",
			"/pages/issues/details/YlGLXKQi",
			"/pages/issues/details/j4nPR_kG",
			"/pages/issues/details/gywuZD9t",
			"/pages/issues/details/WuY96lDT",
			"/pages/issues/details/NgZVneUD",
			"/pages/issues/details/Gjqvve6y",
			"/pages/issues/details/t-poX6U2",
			"/pages/issues/details/jeTwVeOg",
			"/pages/issues/details/N7tGsc8W"
		]
	},
	/*
	** Build configuration
	*/
	build: {
		// analyze: true,
		progress: true,
		babel: {
			plugins: [
				"@babel/plugin-syntax-dynamic-import",
				"@babel/plugin-transform-spread"
			],
			ignore: [
				"node_modules",
				"assets/js/vendor"
			]
		},
		extend (config, ctx) {
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push(
					// Run ESLint on save
					{
						enforce: 'pre',
						test: /\.(js|vue)$/,
						loader: 'eslint-loader',
						exclude: /(node_modules)/
					}
				);
			}
			// aliases
			config.resolve.alias['scss'] = path.resolve(__dirname, './assets/scss');
			// adjust path when serving app from sub-folder
			if (!ctx.isDev && serveFromSubFolder) {
				config.output.publicPath = '/' + dist + '/_nuxt/';
			}
			return config;
		}
	}
};
