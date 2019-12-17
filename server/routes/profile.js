const express = require('express');
const router = express.Router();

// Database
const db = require('monk')(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URL}`,
);
profileDB = db.get('profile');

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  let data = await profileDB.findOne({
    username,
  });
  if (!data) {
    data = { message: 'Profile not found', code: 404 };
  } else {
    delete data._id;
    data = { message: '', code: 200, profileData: data };
  }
  res.json({
    data,
  });
});

router.get('/leaderboard', async (req, res) => {
  let data = await profileDB.find({});
  if (!data) {
    data = { message: 'Information not found', code: 404 };
  } else {
    data = { message: '', code: 200, profileData: data };
  }
  res.json({
    data,
  });
});

module.exports = router;
