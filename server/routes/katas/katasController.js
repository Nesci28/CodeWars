const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const service = require('./katasService.js');
const katasService = new service();

// Database
const db = require('monk')(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URL}`,
);
katasDB = db.get('katas');
profileDB = db.get('profile');

router.get('/cat/:level/:username', async (req, res) => {
  const { level, username } = req.params;
  let data;
  if (req.session.username === username) {
    data = await katasDB.find({
      level,
    });
    if (!data) {
      data = { message: 'Katas not found', code: 404 };
    } else {
      let profile = await profileDB.findOne({ username });
      if (profile) {
        profile = profile[`${level}Kyu`];
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
  } else {
    data = { message: 'You are not logged in!', code: 200 };
  }
  res.json({
    data,
  });
});

router.get('/', async (req, res) => {
  data = await katasDB.find({});
  if (!data) {
    data = { message: 'No Kata found', code: 404 };
  } else {
    const katas = [];
    data.forEach(kata => {
      katas.push({
        id: kata.id,
        title: kata.title,
        level: kata.level,
      });
    });
    data = { message: '', code: 200, katas: katas };
  }
  res.json({
    data,
  });
});

router.get('/:id/:username', async (req, res) => {
  let data;
  const { id, username } = req.params;
  if (req.session.username === username) {
    const kata = await katasDB.findOne({ id });
    const profile = await profileDB.findOne({
      username,
    });
    let show1 = false;
    let show2 = false;
    profile[`${kata.level}Kyu`].forEach(kata => {
      if (kata.id === id) {
        if (kata.hint1) show1 = true;
        if (kata.hint2) show2 = true;
      }
    });
    data = await katasDB.findOne({ id });
    if (!data) {
      data = { message: 'No Kata found', code: 404 };
    } else {
      delete data._id;
      delete data.answers;
      if (!show1) {
        delete data.hint1;
      }
      if (!show2) {
        delete data.hint2;
      }
      data = { message: '', code: 200, kata: data };
    }
  } else {
    data = { message: 'You are not logged in!', code: 200 };
  }
  res.json({
    data,
  });
});

router.post('/unlock', async (req, res) => {
  const { id, n, username } = req.body;
  if (req.session.username === username) {
    let gold = await profileDB.findOne({ username });
    gold = gold.gold;
    const kata = await katasDB.findOne({ id });
    const hintValue = kata[`price${n}`];
    if (hintValue > gold) {
      data = { message: 'Not enough gold', code: 403 };
    } else {
      await profileDB.findOneAndUpdate(
        {
          username,
          [`${kata.level}Kyu.id`]: id,
        },
        {
          $inc: {
            gold: -hintValue,
          },
          $set: {
            [`${kata.level}Kyu.$.hint${n}`]: kata[`hint${n}`],
          },
        },
      );
      data = { message: '', code: 200, hint: kata[`hint${n}`] };
    }
  } else {
    data = { message: 'You are not logged in!', code: 200 };
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
  const { id, answer, code, username } = req.body;
  const kata = await katasDB.findOne({ id });
  const level = kata.level;
  const title = kata.title;
  const kataAnswer = kata.answers['1'].answer;
  let data = {};
  if (kataAnswer === answer) {
    data.message = 'Congratulation';
    data.code = 200;
    await katasService.updateProfile(id, answer, code, username, title, level);
    await katasService.updateReviews(id, answer, code, username, level);
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
