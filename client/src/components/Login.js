import React from 'react';
import client from 'superagent';
import { browserHistory } from 'react-router';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    client
    .post('http://localhost:3000/auth/login')
    .send(this.state)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end(function(err, res){
      console.log(res.body.token);
      localStorage.setItem("token", res.body.token);
      browserHistory.push('/');
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h2>Please sign in</h2>
        <input type="email" name="email" placeholder="Email address"
          value={this.state.email} onChange={this.handleEmailChange.bind(this)} required />
        <br />
        <input type="password" name="password" placeholder="Password"
          value={this.state.password} onChange={this.handlePasswordChange.bind(this)} required />
        <br />
        <button type="submit">Sign in</button>
      </form>
    );
  }
};
