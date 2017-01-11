
let nameYearElem = $('.title_wrapper h1');
let movieName = nameYearElem.text();
let year = nameYearElem.find('#titleYear').text();
movieName = movieName.replace(year, '');
movieName = movieName.replace(/\&nbsp\;/g, '');
movieName = movieName.trim();

let ratings = [
	'<div class="ratings">',
		'<div class="rating tomatometer">',
			'<div class="icon">&nbsp;</div>',
			'<div class="score">23</div>',
		'</div>',
	'</div>'
].join('');

$('.ratings_wrapper .imdbRating').after(ratings);

getMovieLinks(movieName, (err, r) => {
	// movieHeader.find('.ratings .imdb .score').html(r.imdbHTML);
	// movieHeader.find('.ratings .tomatometer .score').html(r.tomatoHTML);
});

