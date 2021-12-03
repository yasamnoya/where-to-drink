const router = require('express').Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const result = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${process.env.YELP_TOKEN}`,
      },
      params: {
        ...req.query,
        term: 'bar',
        // locale: 'zh_TW',
        radius: 10000,
        limit: 50,
        sort_by: 'distance',
      },
    });
    res.send(result.data);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
