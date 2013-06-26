var LocalStrategy = require('passport-local').Strategy
  , passwordUtils = require('./passwords.js');

module.exports = function(params) {
  var passport = params.passport
    , users = require('../data/users.js')(params.db);

  // authentication strategy -
  // function provided to strategy constructor is called on POST /login (when passport.authenticate() called)

  var localStrategy = new LocalStrategy({ passReqToCallback: true }, function(req, identifier, password, done) {
    users.authenticateLogin(identifier, password, function(err, user, authenticator) {
      if (!user) return done(err, false, { message: 'Login failed.' });
      // retain authenticator (derived key) here to save into cookie session
      // and check upon subsequent access
      req.session.authenticator = authenticator;
      return done(err, user);
    });
  });

  passport.use(localStrategy);

  // serialize user to and from session
  passport.serializeUser(function(user, done) {
    done(null, { name: user.username });
  });

  passport.deserializeUser(function(sessionUser, done) {
    users.get(sessionUser.name, function(err, user) {
      done(err, user);
    });
  });

};