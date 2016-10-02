import express from 'express';
import passport from 'passport';
import User from '../models/user';

const requireLogin = passport.authenticate('local');

let router = express.Router();

router.post('/register', (req, res) => {
  User.register(
    new User({email: req.body.email}), req.body.password, function(err, user){
    if (err) 
      res.json({error: err})
    requireLogin(req, res, () => { 
      res.json({
        status: 'SUCCESS', user: user
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