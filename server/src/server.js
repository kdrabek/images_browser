import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import {Strategy} from 'passport-local';

import config from './config/development';

import User from './models/user';

import imagesRouter from './routes/images';
import usersRouter from './routes/users';

const localStrategy = Strategy;
const app = express();

mongoose.connect(config.database);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api', imagesRouter);
app.use('/auth', usersRouter);


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (config.env === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({message: err.message, error: err});
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({message: err.message});
});

app.listen(config.port, function () {
  console.log(`Application is running on port ${config.port}`);
});

export default app;