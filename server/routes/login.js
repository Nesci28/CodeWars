const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Database
const db = require('monk')(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URL}`,
);
loginsDB = db.get('logins');
profileDB = db.get('profile');
sessionsDB = db.get('sessions');

router.get('/session', async (req, res) => {
  res.send(req.session);
});

router.get('/login/:username/:password', async (req, res) => {
  const { username, password } = req.params;
  let data = await loginsDB.findOne({
    username,
  });
  if (!data) {
    data = { message: 'Wrong credentials', code: 401 };
  } else {
    if (!bcrypt.compareSync(password, data.password)) {
      data = { message: 'Wrong credentials', code: 401 };
    } else {
      let gold = await profileDB.findOne({ username });
      gold = gold.gold;
      data = {
        admin: data.admin,
        gold,
      };
      req.session.username = username;
      req.session.isAuthenticated = true;
      req.session.admin = data.admin;
      req.session.gold = gold;
      data = { message: 'Logged in', code: 200, data, session: req.session };
    }
    res.json({
      data,
    });
  }
});

function passwordConvert(password) {
  let salt = bcrypt.genSaltSync(10);
  return (hash = bcrypt.hashSync(password, salt));
}

router.get('/signup/:username/:password', async (req, res) => {
  let { username, password } = req.params;
  let data = await loginsDB.find({
    username,
  });
  if (data.length === 0) {
    password = passwordConvert(password);
    loginsDB.insert({ username, password });
    profileDB.insert({
      username,
      '7Kyu': [],
      '6Kyu': [],
      '5Kyu': [],
      '4Kyu': [],
      '3Kyu': [],
      '2Kyu': [],
      '1Kyu': [],
      score: 0,
    });
    data = { message: 'Account created', code: 200 };
  } else {
    data = { message: 'Username is already taken', code: 403 };
  }
  res.json({
    data,
  });
});

router.get('/logout', async (req, res) => {
  if (req.session.isAuthenticated) {
    const username = req.session.username.toLowerCase();
    await sessionsDB.remove({ 'session.username': username });
  }
  req.session.destroy();
  req.session = null;
  res.json({ message: 'destroyed!', code: 200 });
});

module.exports = router;
