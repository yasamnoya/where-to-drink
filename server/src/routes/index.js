const router = require('express').Router();
const { hasLoggedIn } = require('../middlewares/auth');

router.get('/', (req, res) => {
  res.send('homepage');
});

router.get('/private', hasLoggedIn, (req, res) => {
  res.send('private');
});

router.use('/users', require('./user.route'));
router.use('/bars', require('./bars.route'));

module.exports = router;
