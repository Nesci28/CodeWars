const express = require('express');
const router = express.Router();
const uuid = require('uuid');

// Database
const db = require('monk')(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URL}`,
);
katasDB = db.get('katas');
profileDB = db.get('profile');

router.get('/cat/:level/:username', async (req, res) => {
  const { level, username } = req.params;
  let data = await katasDB.find({
    level,
  });
  if (!data) {
    data = { message: 'Katas not found', code: 404 };
  } else {
    let profile = await profileDB.findOne({ username });
    if (profile) {
      profile = profile[`${level}Kyu`];
      console.log('profile :', profile);
    }
    data.forEach(kata => {
      const profileKata = profile.filter(e => e.id === kata.id);
      if (profileKata.length > 0) {
        kata.done = true;
        kata.date = profileKata[0].date;
        kata.starting = profileKata[0].starting;
        kata.answer = profileKata[0].answer;
      } else {
        kata.done = false;
      }
      delete kata.level;
      delete kata.answers;
      delete kata.starting;
      delete kata.tests;
    });
    data = { message: '', code: 200, katas: data };
  }
  res.json({
    data,
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let data = await katasDB.findOne({ id });
  if (!data) {
    data = { message: 'No Kata found', code: 404 };
  } else {
    delete data._id;
    delete data.answers;
    data = { message: '', code: 200, kata: data };
  }
  res.json({
    data,
  });
});

router.post('/upload', async (req, res) => {
  const kata = req.body;
  kata.id = uuid.v4();
  const data = await katasDB.insert({ kata });
  res.json({
    data,
  });
});

router.post('/answer', async (req, res) => {
  const { id, answer, code, username, level } = req.body;
  let kataAnswer = await katasDB.findOne({ id });
  kataAnswer = kataAnswer.answers['1'].answer;
  let data = {};
  if (kataAnswer === answer) {
    data.message = 'Congratulation';
    data.code = 200;
    // Save to profile
    const obj = {
      id,
      answer,
      code,
    };
    console.log('id :', id);
    let profile = await profileDB.findOneAndUpdate(
      { username, [`${level}Kyu.id`]: id },
      { $set: { [`${level}Kyu`]: { id, answer, code } } },
    );
    console.log('profile :', profile);
    // if (profile.length > 0) {

    // }
    // await profileDB.replaceOne({ username, [`${level}Kyu`]: id }, { obj });
  } else {
    data.message = 'Better luck next try';
    data.code = 403;
  }
  res.json({ data });
});

router.post('/', async (req, res) => {
  const kata = req.body;
  const data = await katasDB.insert({
    title: kata.title,
    level: kata.level,
    language: kata.language,
    description: kata.description,
    starting: kata.starting,
    tests: kata.tests,
    answers: kata.answers,
  });
  res.json({
    data,
  });
});

module.exports = router;
