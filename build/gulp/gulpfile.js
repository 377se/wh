/*
*  Scutum Admin Template
*  Automated tasks ( gulp 4,  http://gulpjs.com/ )
*/
'use strict';

const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[-.]/
});
const chalk = require('chalk');
const chalk_error = chalk.bold.red;
const onError = function (err) {
	console.log(chalk_error(err))
};

// gulp tasks
const _js = require('./build/gulp-js.js')(gulp, plugins, onError);
const _others = require('./build/gulp-others.js')(gulp, plugins);

// -------------------- JS TASKS ------------------
gulp.task('js:uikit', _js.uikit); // custom build of UIkit JS

// -------------------- OTHERS TASKS ---------------
// mdi font to base64
gulp.task('others:mdiToBase64', _others.mdiToBase64);

// process all other tasks
const othersAll = gulp.parallel(
	'others:mdiToBase64'
);
gulp.task('others:all', othersAll, () => {
	return new Promise(function (resolve, reject) {
		othersAll.on('finish', resolve).on('error', reject)
	})
});

// -------------------- DEFAULT TASK ----------------------
gulp.task('default', gulp.series('js:uikit', 'others:all'));
