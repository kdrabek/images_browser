export function validTestImage(){
  return {
    owner: 'some-id', 
    title: 'test-title', 
    stars: 3, 
    url: 'http://fake.url.to.image', 
    tag: 'test-tag'
  }
};

export function testImageMissingOptionalValues(){
  return {
    owner: 'some-id', 
    title: 'test-title', 
    url: 'http://fake.url.to.image', 
  }
};

export function testUserData(){
  return {
    email: 'test_user@email.com',
    password: 'password'
  }
};