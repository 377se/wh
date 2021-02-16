'use strict';
const src = {
	uikit: [
		// uikit core
		'node_modules/uikit/dist/js/uikit.js',
		// uikit icons
		'node_modules/uikit/dist/js/uikit-icons.js',
		// uikit components
		// "node_modules/uikit/dist/js/components/countdown.js",
		// "node_modules/uikit/dist/js/components/filter.js",
		// "node_modules/uikit/dist/js/components/lightbox.js",
		// "node_modules/uikit/dist/js/components/notification.js",
		// "node_modules/uikit/dist/js/components/slider.js",
		// "node_modules/uikit/dist/js/components/sortable.js",
		// "node_modules/uikit/dist/js/components/tooltip.js",
		// "node_modules/uikit/dist/js/components/upload.js",
		// uikit customizations
		'static/vendor/uikit.custom.js'
	]
};

module.exports = function (gulp, plugins, onError) {
	const modules = {};
	modules.uikit = function (done) {
		gulp
			.src(src.uikit)
			.pipe(
				plugins.plumber({
					errorHandler: onError
				})
			)
			.pipe(plugins.concat('uikit.js'))
			.pipe(gulp.dest('static/vendor/'))
			.pipe(
				plugins.uglify({
					mangle: true
				})
			)
			.pipe(plugins.rename('uikit.min.js'))
			.pipe(gulp.dest('static/vendor/'));
		done();
	};
	modules.minify = function (done) {
		gulp
			.src([
				'assets/js/views/**/*.js',
				'assets/js/vendor/**/*.js',
				'!assets/js/**/*.min.js'
			])
			.pipe(
				plugins.plumber({
					errorHandler: onError
				})
			)
			.pipe(
				plugins.uglify({
					mangle: true
				})
			)
			.pipe(
				plugins.rename({
					extname: '.min.js'
				})
			)
			.pipe(
				gulp.dest(function (file) {
					return file.base
				})
			);
		done();
	};
	return modules
};
