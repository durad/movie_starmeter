
function processOneTitle(title: string) {
	let ratings = [
		'<div class="ratings">',
			'<div class="rating imdb">',
				'<div class="icon">&nbsp;</div>',
				'<div class="title">IMDB score:&nbsp;</div>',
				'<div class="score"></div>',
			'</div>',
			'<div class="rating tomatometer">',
				'<div class="icon">&nbsp;</div>',
				'<div class="title">Tomatometer:&nbsp;</div>',
				'<div class="score"></div>',
			'</div>',
		'</div>'
	].join('');

	$(title).find('.movie-showtimes-details').append(ratings);
	let movieName = $(title).find('.showtime-card--title meta[itemprop="name"]').attr('content');

	getMovieLinks(movieName, (err, r) => {
		$(title).find('.movie-showtimes-details .ratings .imdb .score').html(r.imdbHTML);
		$(title).find('.movie-showtimes-details .ratings .tomatometer .score').html(r.tomatoHTML);
	});

}

function main() {
	_.each($('.movie-showtime-header'), processOneTitle);
}

main();
