const express = require('express');
const router = express.Router();

// Database
const db = require('monk')(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URL}`,
);
profileDB = db.get('profile');

router.get('/', async (req, res) => {
  let data = await profileDB.find({});
  if (!data) {
    data = { message: 'Information not found', code: 404 };
  } else {
    const result = [];
    data.forEach(profile => {
      result.push({ username: profile.username, score: profile.score });
    });
    data = { message: '', code: 200, leaderboard: result };
  }
  res.json({
    data,
  });
});

module.exports = router;
