function processOneTitle(title) {
    var ratings = [
        '<div class="ratings">',
        '<p class="rating imdb">IMDB score: ',
        '<span class="score"></span>',
        '</p>',
        '<p class="rating tomatometer">Tomatometer: ',
        '<span class="score"></score>',
        '</p>',
        '</div>'].join('');
    $(title).find('.movie-showtimes-details').append(ratings);
    var movieName = $(title).find('.showtime-card--title meta[itemprop="name"]').attr('content');
    getMovieLinks(movieName, function (err, r) {
        $(title).find('.movie-showtimes-details .ratings .imdb .score').html(r.imdbHTML);
        $(title).find('.movie-showtimes-details .ratings .tomatometer .score').html(r.tomatoHTML);
    });
}
function main() {
    _.each($('.movie-showtime-header'), processOneTitle);
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
