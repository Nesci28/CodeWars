const express = require('express');
const router = express.Router();

// Database
const db = require('monk')(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URL}`,
);
katasDB = db.get('katas');
reviewsDB = db.get('reviews');

router.get('/kata/:id', async (req, res) => {
  let data;
  if (req.session.admin) {
    const { id } = req.params;
    data = await katasDB.findOne({ id });
    if (!data) {
      data = { message: 'No Kata found', code: 404 };
    } else {
      delete data._id;
      data = { message: '', code: 200, kata: data };
    }
  } else {
    data = {
      message: 'Stop doing what the F%^& you are doing NOW!',
      code: 403,
    };
  }
  res.json({
    data,
  });
});

module.exports = router;
