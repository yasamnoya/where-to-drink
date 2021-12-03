const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../models');

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/users/google/callback`,
  },
  (async (accessToken, refreshToken, profile, cb) => {
    let user;
    try {
      user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          username: profile.displayName,
          avatarUrl: profile.photos[0].value,
        });
        await user.save();
      }
      return cb(null, user);
    } catch (e) {
      console.log(e);
      cb(e, null);
    }
  }),
));

passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/users/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'email'],
  },
  (async (accessToken, refreshToken, profile, cb) => {
    let user;
    try {
      user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        user = new User({
          facebookId: profile.id,
          username: profile.displayName,
          avatarUrl: profile.photos[0].value,
        });
        await user.save();
      }
      return cb(null, user);
    } catch (e) {
      console.log(e);
      cb(e, null);
    }
  }),
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
