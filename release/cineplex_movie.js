function processOneTitle() {
    var ratings = [
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
    var movieHeader = $('.movie-header');
    var movieName = movieHeader.find('.movie-title').text();
    movieHeader.find('.movie-title').after(ratings);
    getMovieLinks(movieName, function (err, r) {
        movieHeader.find('.ratings .imdb .score').html(r.imdbHTML);
        movieHeader.find('.ratings .tomatometer .score').html(r.tomatoHTML);
    });
}
function main() {
    processOneTitle();
}
main();
function getMovieLinks(movieName, cb) {
    movieName = movieName.split('- An IMAX 3D Experience')[0].trim();
    movieName = movieName.split('– An IMAX 3D Experience')[0].trim();
    var omdbParams = {
        t: movieName,
        r: 'json',
        tomatoes: true
    };
    var omdbParamsStr = $.param(omdbParams);
    var omdbUrl = 'http://www.omdbapi.com/?' + omdbParamsStr;
    var r = {
        imdbHTML: 'N/A',
        tomatoHTML: 'N/A'
    };
    $.ajax(omdbUrl, {
        cache: false,
        dataType: 'json'
    })
        .done(function (response) {
        if (!response ||
            !response.Response ||
            response.Response.toLowerCase() !== 'true') {
            return r;
        }
        if (response.imdbID) {
            r.imdbHTML = "<a href=\"http://www.imdb.com/title/" + response.imdbID + "\">" + (isNaN(parseFloat(response.imdbRating)) ? 'Link' : response.imdbRating) + "</a>";
        }
        else {
            r.imdbHTML = 'N/A';
        }
        if (response.tomatoURL) {
            r.tomatoHTML = "<a href=\"" + response.tomatoURL + "\">" + (isNaN(parseFloat(response.tomatoMeter)) ? 'Link' : response.tomatoMeter) + "</a>";
        }
        else {
            r.tomatoHTML = 'N/A';
        }
        cb(null, r);
    })
        .fail(function () {
        cb(null, r);
    });
}
