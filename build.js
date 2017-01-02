
var path = require('path');

// var less = require('less');
// var chokidar = require('chokidar');
var livereload = require('livereload');
// var fsExtra = require('fs-extra');

// var isDevMode = (process.argv.indexOf('--dev') >= 0);
// // var isForcing = (process.argv.indexOf('--force') >= 0);

// var chokidarOptions = { persistent: true, ignoreInitial: true, usePolling: true, interval: 200 };

// function copyManifest() {
// 	fsExtra.copySync('./src/manifest.json', './debug/manifest.json');
// }

// if (isDevMode) {
	var livereloadServer = livereload.createServer({ exts: ['css', 'js', 'json'], debug: true, interval: 200 });
	livereloadServer.watch(path.join(__dirname, '/release'));

// 	chokidar
// 		.watch(path.join(__dirname, '/src/manifest.json'), chokidarOptions)
// 		.on('change', copyManifest)
// 		.on('add', copyManifest);

// 	chokidar
// 		.watch(path.join(__dirname, '/src/*.js'), chokidarOptions)
// 		.on('change', copyManifest)
// 		.on('add', copyManifest);
// }
