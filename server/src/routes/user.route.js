const router = require('express').Router();
const passport = require('passport');
const { hasLoggedIn } = require('../middlewares/auth');
const { User } = require('../models');

router.get('/me', hasLoggedIn, async (req, res) => {
  try {
    const user = await User.find({ _id: req.user._id });
    res.send(user);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/logout', hasLoggedIn, (req, res) => {
  req.logOut();
  res.redirect(`${process.env.FRONTEND_URL}/`);
});

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login` }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/`);
  },
);

router.get(
  '/facebook',
  passport.authenticate('facebook'),
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: `${process.env.FRONTEND_URL}/login` }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.FRONTEND_URL}/`);
  },
);

module.exports = router;
