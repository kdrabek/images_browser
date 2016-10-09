import mongoose from 'mongoose';
import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../src/server';
import User from '../src/models/user';
import Image from '../src/models/image';

import { 
  validTestImage, testImageMissingOptionalValues, testUserData
} from './factories';


chai.use(chaiHttp);


describe('API routes - unauthenticaed user', function(){

  it('raises 401', function(done){
    chai.request(app)
    .get('/api/test-user')
    .end((err, res) => {
      expect(res).to.have.status(401);
      done();
    });
  });

});


describe('API routes - aunthenticated user', function(){

  before(function(done){
    User.register(
      new User({email: 'test_user@email.com'}), 'password', (err, user) => {
        if (err)
          console.log("An error occured: " + err);
        chai.request(app)
        .post('/auth/login')
        .send({email: 'test_user@email.com', password: 'password'})
        .end((err, res) => { 
          this.token = res.body.token;
          this.owner = res.body.user._id;
          done(err);
        });   
      }
    );
  }); 

  beforeEach(function(done){
    let image = new Image(validTestImage())
    image.owner = this.owner;
    image.save((err) =>{ 
      if (err) 
        console.log(err)

      this.image_id = image.id;
      done();
    });
  });

  afterEach(function(done){
    Image.remove({}, function(err){
      if (err) { console.log(err) }    
      done();  
    });
  });

  after(function(done){
    User.remove({email: 'test_user@email.com'}, function(err){
      if (err) { console.log(err) } 
      done();
    });
  });

  it('returns images', function(done){
    chai.request(app)
    .get('/api/' + this.owner)
    .set('Authorization', this.token)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.keys('status', 'message');
      expect(res.body.status).equal('SUCCESS');
      expect(res.body.message).to.be.instanceOf(Array);
      expect(res.body.message).to.have.lengthOf(1);
      done();
    });
  });

  it('creates image', function(done){
    let postData = validTestImage();
    chai.request(app)
    .post('/api/' + this.owner)
    .send(validTestImage(this.owner))
    .set('Authorization', this.token)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.keys('status', 'message');
      expect(res.body.status).equal('SUCCESS');
      expect(res.body.message).equal('Image saved.');
      done();
    });
  });

  it('returns single image', function(done){
    let testImageData = validTestImage()
    chai.request(app)
    .get(`/api/${this.owner}/${this.image_id}`)
    .set('Authorization', this.token)
    .end((err, res) => {
      let image = res.body.message[0]
      expect(res).to.have.status(200);
      expect(res.body).to.have.keys('status', 'message');
      expect(res.body.status).equal('SUCCESS');
      expect(res.body.message).to.be.instanceOf(Array);
      
      expect(image._id).equals(this.image_id.toString());
      expect(image.owner).equals(this.owner);
      expect(image.title).equals(testImageData.title);
      expect(image.stars).equals(testImageData.stars);
      expect(image.url).equals(testImageData.url);
      expect(image.tag).equals(testImageData.tag);
      
      done();
    });
  });

  it('returns images with given tag', function(done){
    let testImageData = validTestImage()
    chai.request(app)
    .get(`/api/${this.owner}/tag/test-tag`)
    .set('Authorization', this.token)
    .end((err, res) => {
      let image = res.body.message[0]
      expect(res).to.have.status(200);
      expect(res.body).to.have.keys('status', 'message');
      expect(res.body.status).equal('SUCCESS');
      expect(res.body.message).to.be.instanceOf(Array);
      
      expect(image.owner).equals(this.owner);
      expect(image.title).equals(testImageData.title);
      expect(image.stars).equals(testImageData.stars);
      expect(image.url).equals(testImageData.url);
      expect(image.tag).equals(testImageData.tag);
      
      done();
    });
  });

  it('updates image', function(done){
    let putData = {
      title: 'updated title',
      tag: 'new-tag',
      stars: 4
    };
    chai.request(app)
    .put(`/api/${this.owner}/${this.image_id}`)
    .send(putData)
    .set('Authorization', this.token)
    .end((err, res) => {
      done();
      expect(res).to.have.status(200);
      expect(res.body).to.have.keys('status', 'message');
      expect(res.body.status).equal('SUCCESS');
      expect(res.body.message).equal('Image updated.');
    });
  });

  it('deletes image with given id', function(done){
    Image.findOne({_id: this.image_id}, function(err, image){
      expect(image).to.not.be.null;
    });

    chai.request(app)
    .delete(`/api/${this.owner}/${this.image_id}`)
    .set('Authorization', this.token)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.keys('status', 'message');
      expect(res.body.status).equal('SUCCESS');
      expect(res.body.message).equal('Image deleted.');

      Image.findOne({_id: this.image_id}, function(err, image){
        expect(image).to.be.null;
        done();
      });
    });
  });
  
});