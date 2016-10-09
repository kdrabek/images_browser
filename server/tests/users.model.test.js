import { expect } from 'chai';
import User from '../src/models/user';


describe('test User model', function(){

  beforeEach(function(done){
    User.remove({email: 'test_model@user.com'}, function(err){
      if (err)
        console.log(err);
      done(err);
    });
  })

  it('should create a model', function(done){
    let user = new User({email: 'test_model@user.com', password: 'password'});
    user.validate((err) => {
      expect(err).not.to.exist;
      done();
    })

  });

  it('should raise validation error with missing email', function(done){
    let user = new User({password: 'password'});
    
    user.validate(function(err){
      expect(err.errors.email).to.exist;
      done();
    })
  });

});