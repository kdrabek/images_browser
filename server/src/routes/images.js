import express from 'express';
import passport from 'passport';

import Image from '../models/image';
import User from '../models/user'

const requireAuth = passport.authenticate('jwt', { session: false });  
let router = express.Router();


router.get('/:owner', requireAuth, function(req, res, next){
  Image.find(
    {'owner': req.params.owner}, 
    function(err, images){
      return res.json({'status': 'SUCCESS', 'message': images});
    }
  );
});


router.post('/:owner', requireAuth, function(req, res){
  let image = new Image({
    owner: req.params.owner,
    title: req.body.title,
    url: req.body.url,
    tag: req.body.tag || null,
    stars: req.body.stars || 0
  });

  image.save(function(err){
    if(!err)
      return res.json({'status': 'SUCCESS', 'message': 'Image saved.'});
  })
});


router.get('/:owner/tag/:tag', requireAuth, function(req, res, next){
  Image.find(
    {'owner': req.params.owner, 'tag': req.params.tag}, 
    function(err, images){
      return res.json({'status': 'SUCCESS', 'message': images});
  });
});


router.get('/:owner/:image_id', requireAuth, function(req, res, next){
  Image.findOne(
    {'owner': req.params.owner, '_id': req.params.image_id}, 
    function(err, image){
      return res.json({'status': 'SUCCESS', 'message': [image]});
  });
});


router.delete('/:owner/:image_id', requireAuth, function(req, res){
  let query = {'owner': req.params.owner, '_id': req.params.image_id};
  Image.remove(
    query, function(err, image){
      if (!err)
        return res.json({'status': 'SUCCESS', 'message': 'Image deleted.'});
    });
});

router.put('/:owner/:image_id', requireAuth, function(req, res){
  let query = {'owner': req.params.owner, '_id': req.params.image_id};
  Image.findOne(query, function(err, image){
    if (image){
      image.title = image.title || req.body.title;
      image.url = image.url || req.body.url;
      image.tag = image.tag || req.body.tag;
      image.stars = image.stars || req.body.stars;
      
      image.save(function(err, updatedImage){
        if (updatedImage)
          return res.json({'status': 'SUCCESS', 'message': 'Image updated.'});
      });  
    }
  });
});

export default router;