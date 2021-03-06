var apiClient;

module.exports = function(app, api) {
  apiClient = api;

  app.get('/genres', genreSearchPage);
  app.get('/genres/:genre', genreSearchResults);
};

function genreSearchPage(req, res, next) {
  var genreQuery = req.query.genre;

  if (genreQuery && genreQuery.trim()) {
    return getStoriesForGenre(res, next, genreQuery);
  }

  apiClient.get('/genres', function(err, cReq, cRes, genres) {
    if (err) return next(err);
    res.render('genres', { genres: genres });
  });
}

function genreSearchResults(req, res, next) {
  var genre = req.params.genre;
  getStoriesForGenre(res, next, genre);
}

function getStoriesForGenre(res, next, genre) {
  var encodedGenre = encodeURIComponent(genre.trim());

  if (!encodedGenre) {
    res.render('404');
  }

  apiClient.get('/genres/' + encodedGenre + '/stories', function(err, cReq, cRes, stories) {
    if (err) return next(err);
    res.render('genres', { stories: stories, searchTerm: genre });
  });
}
