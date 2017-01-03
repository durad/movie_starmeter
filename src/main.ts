
function processOneTitle(title: string) {
	let ratings = [
		'<div class="ratings">',
			'<p class="rating imdb">IMDB score: ',
				'<span class="score"></span>',
			'</p>',
			'<p class="rating tomatometer">Tomatometer: ',
				'<span class="score"></score>',
			'</p>',
			// '<p class="rating metacritic">Metascore: ',
			// 	'<span class="score"></score>',
			// '</p>',
		'</div>'].join('');

	$(title).find('.movie-showtimes-details').append(ratings);

	let movieName = $(title).find('.showtime-card--title meta[itemprop="name"]').attr('content');
	movieName = movieName.split('- An IMAX 3D Experience')[0].trim();
	movieName = movieName.split('– An IMAX 3D Experience')[0].trim();

	let omdbParams = {
		t: movieName,
		// y: (new Date()).getFullYear(),
		r: 'json',
		tomatoes: true
	};

	let omdbParamsStr = $.param(omdbParams);
	let omdbUrl = 'http://www.omdbapi.com/?' + omdbParamsStr;

	let jqxhr = $.ajax(omdbUrl, {
			cache: false,
			dataType: 'json'
		})
		.done(function(response) {
			// TODO: handle no response
			if (response.Response.toLowerCase() !== 'true') return;

			let imdbHref = `<a href="http://www.imdb.com/title/${response.imdbID}">${response.imdbRating}</a>`;
			let tomatoHref = `<a href="${response.tomatoURL}">${response.tomatoMeter}</a>`;

			$(title).find('.movie-showtimes-details .ratings .imdb .score').html(imdbHref);
			$(title).find('.movie-showtimes-details .ratings .tomatometer .score').html(tomatoHref);
			// $(title).find('.movie-showtimes-details .ratings .metacritic .score').text(response.Metascore);
		})
		.fail(function() {
			// TODO: handle fail
		});

}

function main() {
	_.each($('.movie-showtime-header'), processOneTitle);
}

main();
