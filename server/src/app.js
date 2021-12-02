const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('./config/passport');
const session = require('./config/session');
const router = require('./routes');

const app = express();

app.use(morgan('common'));

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

module.exports = app;
