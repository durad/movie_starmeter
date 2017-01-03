
function processOneTitle(title: string) {
	let ratings = [
		'<div class="ratings">',
			'<p class="rating imdb">IMDB score: ',
				'<span class="score"></span>',
			'</p>',
			'<p class="rating tomatometer">Tomatometer: ',
				'<span class="score"></score>',
			'</p>',
		'</div>'].join('');

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
