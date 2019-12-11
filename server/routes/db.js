const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Database
const db = require('monk')(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URL}`,
);
loginsDB = db.get('logins');

router.get('/login/:username/:password', async (req, res) => {
  const { username, password } = req.params;
  let data = await loginsDB.findOne({
    username,
  });
  if (data.length === 0) {
    data = { message: 'Wrong credentials', code: 401 };
  } else {
    if (!bcrypt.compareSync(password, data.password)) {
      data = { message: 'Wrong credentials', code: 401 };
    } else {
      data = { message: 'Logged in', code: 200 };
    }
  }
  res.json({
    data,
  });
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
    data = { message: 'Account created', code: 200 };
  } else {
    data = { message: 'Username is already taken', code: 403 };
  }
  res.json({
    data,
  });
});

module.exports = router;
