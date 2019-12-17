const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

// Middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('tiny'));

// CORS
app.use(cors({ origin: ['http://localhost:4200'], credentials: true }));

// Session store
const store = new MongoDBStore({
  uri: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URL}`,
  collection: 'sessions',
});
// Express session
let sess = {
  secret: `${process.env.COOKIE_SECRET}`,
  store: store,
  cookie: {
    expires: Date.now() + 3600000 * 24 * 30,
    maxAge: 1 * 60 * 60 * 24 * 30 * 1000,
    httpOnly: false,
    secure: true,
  },
  resave: false,
  unset: 'destroy',
  saveUninitialized: false,
};
if (app.get('env') === 'development') {
  sess.cookie.secure = false;
}
app.use(session(sess));

// Routes
app.use('/api/v1/auth', require('./routes/login.js'));
app.use('/api/v1/profile', require('./routes/profile.js'));
app.use('/api/v1/leaderboard', require('./routes/leaderboard.js'));
app.use('/api/v1/admin', require('./routes/admin.js'));
app.use('/api/v1/kata', require('./routes/katas/katasController.js'));

// Starting the App
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
