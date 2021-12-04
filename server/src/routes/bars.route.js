const router = require('express').Router();
const axios = require('axios');
const { Going } = require('../models');

router.get('/', async (req, res) => {
  try {
    const yelpRes = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${process.env.YELP_TOKEN}`,
      },
      params: {
        ...req.query,
        term: 'bar',
        locale: 'zh_TW',
        radius: 10000,
        limit: 50,
        sort_by: 'distance',
      },
    });

    const barResults = yelpRes.data;
    const barIds = barResults.businesses.map((bar) => bar.id);
    const goings = await Going.find({ $in: { barId: barIds } }).populate('userId');
    barResults.businesses = barResults.businesses.map((bar) => {
      const goingsToTheBar = goings.filter((going) => going.barId === bar.id);
      const peopleGoing = goingsToTheBar.map((going) => going.userId);
      return {
        ...bar,
        peopleGoing,
      };
    });
    res.send(barResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/:barId', async (req, res) => {
  try {
    const result = await axios.get(`https://api.yelp.com/v3/businesses/${req.params.barId}`, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_TOKEN}`,
      },
      params: {
        locale: 'zh_TW',
      },
    });
    res.send(result.data);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
