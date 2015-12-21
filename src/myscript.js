
// function processOneTitle(title, titleIndex) {
// 	$(title).find('.movie-showtimes-details').append('<div class="ratings"><p class="imdb">IMDB score: <span class="score"></span></p><p class="metacritic">Metascore: <span class="score"></score></p><p class="tomatometer">Tomatometer: <span class="score"></score></p></div>');

// 	var movieName = $(title).find('.showtime-card--title meta[itemprop="name"]').attr('content');
// 	movieName = movieName.replace(/ - An IMAX 3D Experience®$/i, '');

// 	var omdbParams = { t: movieName, y: (new Date()).getFullYear(), r: 'json', tomatoes: true };
// 	var omdbParamsStr = $.param(omdbParams);
// 	var omdbUrl = 'http://www.omdbapi.com/?' + omdbParamsStr;
// // if (titleIndex > 2) return;

// 	var jqxhr = $.ajax(omdbUrl, {
// 			cache: false,
// 			dataType: 'json'
// 		})
// 		.done(function(response) {
// 			// TODO: handle no response
// 			if (response.Response.toLowerCase() !== 'true') return;
// // console.log(response);

// 			$(title).find('.movie-showtimes-details .ratings .imdb .score').text(response.imdbRating);
// 			$(title).find('.movie-showtimes-details .ratings .metacritic .score').text(response.Metascore);
// 			$(title).find('.movie-showtimes-details .ratings .tomatometer .score').text(response.tomatoMeter);
// 		})
// 		.fail(function() {
// 			// TODO: handle fail
// 		});

// }

// function main() {
// 	// _.each($('.movie-showtime-header'), processOneTitle);
// }

// main();

var onLivereload = function(path, options) {
	console.log(path, options);
}

// $(document).ready(function() {
// 	console.log(111);
// 	// document.write('<script src="http://localhost:35729/livereload.js?snipver=1"></' + 'script>');
// 	console.log(222);
// });



// console.log('000');

// setTimeout(function() {
// 	console.log(111);
// 	$('body').append('<script src="http://localhost:35729/livereload.js?snipver=1"></' + 'script>');
// 	console.log(222);
// }, 5000);


chrome.webRequest.onBeforeRequest.addListener(hook, {urls: ['file://localhost/reload*']});

function hook(details) {
	console.log('reloading all dev extensions');
	chrome.management.getAll(function(extensions){
		for(var i in extensions){
			extension = extensions[i];
			if (extension.installType == 'development' && extension.enabled && extension.name != 'Reload Extension') {
				chrome.management.setEnabled(extension.id, false, function(){
					chrome.management.setEnabled(extension.id, true);
				});
			}
		}
	});

	chrome.tabs.remove(details.tabId);
}
