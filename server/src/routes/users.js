import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import User from '../models/user';
const env = process.env.NODE_ENV || 'development';
const config = require('../config/' + env)

const requireLogin = passport.authenticate('local');
let router = express.Router();

function generateToken(user) {
  return jwt.sign(user, config.secret, {expiresIn: 10080});
}

// to not generate token based on full user object
function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email,
  }
}

router.post('/register', (req, res) => {
  console.log(req.body);
  User.register(
    new User({email: req.body.email}), req.body.password, function(err, user){
    if (err)
      res.json({error: err})
    requireLogin(req, res, () => {
      let userInfo = setUserInfo(user);
      res.status(200).json({
        status: 'SUCCESS',
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      });
    });
  })
});

router.post('/login', requireLogin, (req, res) => {
  let userInfo = setUserInfo(req.user);
  res.status(200).json({
    status: 'SUCCESS',
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
});

router.post('/logout', requireLogin, (req, res) => {
  // logout should clear the token
  req.logout();
  res.status(200).json({
    status: 'SUCCESS'
  });
});

export default router;
