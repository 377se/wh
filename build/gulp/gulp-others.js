module.exports = function (gulp, plugins) {
	const modules = {};
	// mdi fonts to base64
	modules.mdiToBase64 = function (done) {
		gulp.src(['node_modules/@mdi/font/fonts/materialdesignicons-webfont.woff2', 'node_modules/@mdi/font/fonts/materialdesignicons-webfont.woff'])
			.pipe(plugins.inlineFonts({ name: 'Material Design Icons' }))
			.pipe(plugins.rename('mdi_base64.css'))
			.pipe(gulp.dest('static/fonts/'));
		done();
	};
	return modules;
};
