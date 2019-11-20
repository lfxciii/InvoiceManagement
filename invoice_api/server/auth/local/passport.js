var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
    function (email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }, function (err, user) {
        if (err) return done(err);

        if (!user) {
          user = new User({
            name: email,
            email: email,
            role: 'user',
            username: email,
            provider: 'local',
            password: password
          });
          user.save(function (err) {
            if (err) return done(err);
            done(err, user);
          });
        }
        else {
          return done(null, user);
        }
      });
    }
  ));
};