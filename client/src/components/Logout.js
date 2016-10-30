import React from 'react';
import { browserHistory } from 'react-router'

export default class Logout extends React.Component {

  render() {
    this.setState({authenticated: false});
    localStorage.removeItem('token');
    browserHistory.push('/');
    return null;
  }
};
