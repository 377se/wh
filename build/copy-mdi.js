var ncp = require('ncp').ncp;

ncp.limit = 16;

ncp('./node_modules/@mdi/font/css', './static/fonts/mdi/css', function (err) {
	if (err) {
		return console.error(err);
	}
	console.log('Copying MDI Stylesheet complete!');
});

ncp('./node_modules/@mdi/font/fonts', './static/fonts/mdi/fonts', function (err) {
	if (err) {
		return console.error(err);
	}
	console.log('Copying MDI Fonts complete!');
});
