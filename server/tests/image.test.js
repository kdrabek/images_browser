import { expect } from 'chai';
import Image from '../src/models/image';

import { 
  validTestImage, 
  testImageMissingOptionalValues 
} from './factories';


describe('test Image model', function(){

  it('should create a model', function(done){
    let testImage = new Image(validTestImage());
    testImage.save();

    expect(testImage.title).equals(validTestImage().title);
    expect(testImage.owner).equals(validTestImage().owner);
    expect(testImage.stars).equals(validTestImage().stars);
    expect(testImage.url).equals(validTestImage().url);
    expect(testImage.tag).equals(validTestImage().tag);
    done();
  });

  it('should use default values', function(done){
    let testImage = new Image(testImageMissingOptionalValues());
    testImage.save();

    expect(testImage.stars).equals(0);
    expect(testImage.tag).equals(null);
    done();
  });

  it('should raise validation error with missing title', function(done){
    let testData = validTestImage();
    delete testData.title;
    let testImage = new Image(testData);
    
    testImage.validate(function(err){
      expect(err.errors.title).to.exist;
      done();
    })
  });

  it('should raise validation error with missing owner', function(done){
    let testData = validTestImage();
    delete testData.owner;
    let testImage = new Image(testData);
    
    testImage.validate(function(err){
      expect(err.errors.owner).to.exist;
      done();
    })
  });

  it('should raise validation error with missing url', function(done){
    let testData = validTestImage();
    delete testData.url;
    let testImage = new Image(testData);
    
    testImage.validate(function(err){
      expect(err.errors.url).to.exist;
      done();
    })
  });

});