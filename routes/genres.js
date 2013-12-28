var restify = require('restify');

var apiClient = restify.createJsonClient({
  url: 'https://localhost:8080'
});

module.exports = function(params) {
  var app = params.app;

  app.get('/genres', genreSearchPage);
  app.get('/genres/:genre', genreSearchResults);
};

function genreSearchPage(req, res) {
  var genreQuery = req.query.genre;
  if (genreQuery && (genreQuery = genreQuery.trim())) {
    return getStoriesForGenre(res, genreQuery);
  }
  apiClient.get('/genres', function(err, cReq, cRes, genres) {
    res.render('genres', { genres: genres });
  });
}

function genreSearchResults(req, res) {
  var genre = req.params.genre;
  getStoriesForGenre(res, genre);
}

function getStoriesForGenre(res, genre) {
  apiClient.get('/genres/' + genre + '/stories', function(err, cReq, cRes, stories) {
    res.render('genres', { stories: stories });
  });
}