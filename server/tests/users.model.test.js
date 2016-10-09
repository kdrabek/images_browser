import mongoose from 'mongoose';
import { expect } from 'chai';
import config from '../src/config/test';
import User from '../src/models/user';


describe('test User model', function(){

  afterEach(function(done){
    User.remove({}, function(err){
      if (err)
        console.log(err);

      done(err);
    });
  })

  it('should create a model', function(done){
    let user = new User({email: 'test@email.com', password: 'password'});
    user.save();

    expect(user.email).equals('test@email.com');
    expect(user.password).equals('password');
    done();
  });

  it('should raise validation error with missing email', function(done){
    let user = new User({password: 'password'});
    
    user.validate(function(err){
      expect(err.errors.email).to.exist;
      done();
    })
  });

  it('should raise validation error with missing password', function(done){
    let user = new User({email: 'test@email.com'});
    
    user.validate(function(err){
      expect(err.errors.password).to.exist;
      done();
    })
  });

});