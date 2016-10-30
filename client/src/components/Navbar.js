import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
  render() {
    let authenticated = localStorage.getItem('token') === null ? false : true;
    console.log(authenticated);
    return (
      <div>
      { authenticated ? (<Link to={'/logout'}>Logout</Link>) : (<Link to={'/login'}>Login</Link>)}
      </div>
    );
  }
};
