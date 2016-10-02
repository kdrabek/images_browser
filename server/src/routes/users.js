import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import config from '../config/development';
import User from '../models/user';

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
  User.register(
    new User({email: req.body.email}), req.body.password, function(err, user){
    if (err) 
      res.json({error: err})
    requireLogin(req, res, () => {
      console.log(user);
      let userInfo = setUserInfo(user); 
      res.status(200).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });
    }); 
  })
});

router.post('/login', requireLogin, (req, res) => {
  res.json({
    status: 'SUCCESS', message: `Hello ${req.user.email}`
  });
});

router.post('/logout', requireLogin, (req, res) => {
  req.logout();
  res.json({
    status: 'SUCCESS'
  });
});

export default router;