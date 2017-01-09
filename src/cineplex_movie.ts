

function processOneTitle() {
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

	let movieHeader = $('.movie-header');
	let movieName = movieHeader.find('.movie-title').text();
	movieHeader.find('.movie-title').after(ratings);

console.log(movieName);

	getMovieLinks(movieName, (err, r) => {
		movieHeader.find('.ratings .imdb .score').html(r.imdbHTML);
		movieHeader.find('.ratings .tomatometer .score').html(r.tomatoHTML);
	});
}

function main() {
	processOneTitle();
}

main();
