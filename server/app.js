const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('tiny'));

// CORS
app.use(cors());

// Routes
app.use('/api/v1/auth', require('./routes/login.js'));
app.use('/api/v1/profile', require('./routes/profile.js'));
app.use('/api/v1/leaderboard', require('./routes/leaderboard.js'));
app.use('/api/v1/kata', require('./routes/katas.js'));

// Starting the App
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
