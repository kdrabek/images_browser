import React from 'react';
import client from 'superagent';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      images: []
    };
  }
  componentDidMount(){
    let authenticated = localStorage.getItem('token') === null ? false : true;
    this.setState({authenticated: authenticated});
    let self = this;
    if (authenticated) {
      let userid = localStorage.getItem('userid');
      client
      .get(`http://localhost:3000/api/${userid}`)
      .set('Authorization', localStorage.getItem('token'))
      .end(function(err, res){
          self.setState({images: res.body.message});
      });
    }
  }

  render() {
    return (
      <div>
      {this.state.images.map((image, index) => (
        <p>Hello, {image.url}</p>
      ))}
      </div>
    );
  }
};
