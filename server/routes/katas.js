const express = require('express');
const router = express.Router();

// Database
const db = require('monk')(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URL}`,
);
katasDB = db.get('katas');

router.get('/cat/:level', async (req, res) => {
  const { id } = req.params;
  let data = await katasDB.findOne({
    id,
  });
  if (!data) {
    data = { message: 'Kata not found', code: 404 };
  } else {
    delete data._id;
    data = { message: '', code: 200, profileData: data };
  }
  res.json({
    data,
  });
});

router.get('/:id', async (req, res) => {
  const { level } = req.params;
  let data = await katasDB.find({ level });
  if (!data) {
    data = { message: 'No Kata found', code: 404 };
  } else {
    data = { message: '', code: 200, profileData: data };
  }
  res.json({
    data,
  });
});

router.post('/upload', async (req, res) => {
  const kata = req.body;
  const data = await katasDB.insert({ kata });
  res.json({
    data,
  });
});

router.post('/', async (req, res) => {
  const kata = req.body;
  const data = await katasDB.insert({ kata });
  res.json({
    data,
  });
});

module.exports = router;
