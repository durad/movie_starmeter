
interface MovieInfo {
	imdbHTML: string;
	tomatoHTML: string;
}

function getMovieLinks(movieName: string, cb: (err: any, result: MovieInfo) => any) {
	movieName = movieName.split('- An IMAX 3D Experience')[0].trim();
	movieName = movieName.split('– An IMAX 3D Experience')[0].trim();

	let omdbParams = {
		t: movieName,
		r: 'json',
		tomatoes: true
	};

	let omdbParamsStr = $.param(omdbParams);
	let omdbUrl = 'http://www.omdbapi.com/?' + omdbParamsStr;

	let r: MovieInfo = {
		imdbHTML: 'N/A',
		tomatoHTML: 'N/A'
	};

	$.ajax(omdbUrl, {
		cache: false,
		dataType: 'json'
	})
	.done(function(response) {
		if (!response ||
			!response.Response ||
			response.Response.toLowerCase() !== 'true'
		) {
			return r;
		}

		if (response.imdbID) {
			r.imdbHTML = `<a href="http://www.imdb.com/title/${response.imdbID}">${isNaN(parseFloat(response.imdbRating)) ? 'Link' : response.imdbRating}</a>`;
		} else {
			r.imdbHTML = 'N/A';
		}

		if (response.tomatoURL) {
			r.tomatoHTML = `<a href="${response.tomatoURL}">${isNaN(parseFloat(response.tomatoMeter)) ? 'Link' : response.tomatoMeter}</a>`;
		} else {
			r.tomatoHTML = 'N/A';
		}

		cb(null, r);
	})
	.fail(function() {
		cb(null, r);
	});
}
