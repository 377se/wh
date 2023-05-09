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
	/*
	** Headers of the page
	*/
	head: {
		htmlAttrs: {
			lang: 'en'
		},
		title: '377 Warehouse',
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
			{ src: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist ) + '/vendor/uikit.min.js'},
			{ src: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist ) + '/redactorx/redactorx.min.js'},
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' :  '/' + dist ) + '/favicon.ico'},
			{ rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/vendor/uikit.min.js', as: 'script' },
			{ rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/roboto_base64.css', as: 'style' },
			{ rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/sourceCodePro_base64.css', as: 'style' },
			{ rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/mdi/css/materialdesignicons.css', as: 'style' },
			{ rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/pe-laundry-icons/css/pe-laundry-icons.css', as: 'style' },
			{ rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/pe-laundry-icons/css/helper.css', as: 'style' },
			/// fonts
			{ rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/roboto_base64.css' },
			{ rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/sourceCodePro_base64.css' },
			{ rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/mdi/css/materialdesignicons.css' },
			{ rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/pe-laundry-icons/css/pe-laundry-icons.css' },
			{ rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/pe-laundry-icons/css/helper.css' },
			//Redactor
			{ rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/redactorx/redactorx.css' }
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
		{ src: '~/plugins/axios.js' },
		{ src: '~/plugins/components.global.js' },
		{ src: '~/plugins/directives.client.js' },
		{ src: '~/plugins/filters.js' },
		{ src: '~/plugins/mixins.client.js' },
		{ src: '~/plugins/waves.client.js' },
		{ src: '~/plugins/retina.client.js' },
		{ src: '~/plugins/vueVisible.client.js' },
		{ src: '~/plugins/vue-excel-xlsx.client.js' },
		{ src: '~/plugins/vue-xlsx.client.js' },
	],
	router: {
		middleware: ['redirect'],
		base: process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '/' : '/' + dist
	},
	modules: [
		'cookie-universal-nuxt',
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
	},
	axios: {
		proxy: true
	  },
	  proxy: {
		'/webapi': {
		  target: process.env.NODE_ENV !== 'production'?'https://api.377.se':'https://api.377.se'
		},
		'/companyinvoice': {
			target: process.env.NODE_ENV !== 'production'?'https://api-company.lfc.se':'https://api-company.lfc.se'
		}
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
