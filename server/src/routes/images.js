import express from 'express';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });  
let router = express.Router();

router.get('/ping', (req, res) => {
  res.json({message: 'pong'});
});

router.get('/check', requireAuth, (req, res) => {
  res.json({message: 'this requires valid token'});
});

export default router;