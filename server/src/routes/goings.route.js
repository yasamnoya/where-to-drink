const router = require('express').Router();
const { Going } = require('../models');
const { hasLoggedIn } = require('../middlewares/auth');

router.post('/', hasLoggedIn, async (req, res) => {
  try {
    const going = new Going({ userId: req.user._id, barId: req.body.barId });
    await going.save();
    res.send(going);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete('/:barId', hasLoggedIn, async (req, res) => {
  try {
    await Going.remove({ userId: req.user._id, barId: req.params.barId });
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
module.exports = router;
