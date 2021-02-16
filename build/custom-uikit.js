const fs = require('fs');
const concat = require('concat');
const minify = require('@node-minify/core');
const uglifyES = require('@node-minify/uglify-es');

const uikit = [
	// uikit core
	'node_modules/uikit/dist/js/uikit.js',
	// uikit icons
	'node_modules/uikit/dist/js/uikit-icons.js',
	// uikit customizations
	'static/vendor/uikit.custom.js'
];

concat(uikit).then(result => {
	// console.log(result)
	fs.writeFile('./static/vendor/uikit.js', result, function (err) {
		if (err) throw err;
		minify({
			compressor: uglifyES,
			input: './static/vendor/uikit.js',
			output: './static/vendor/uikit.min.js',
			callback: function (err, min) {}
		});
	});
});
