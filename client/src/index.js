import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import App from './components/App.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';
import Home from './components/Home.js';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path='/' component={Home} />
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout}/>
    </Route>
  </Router>,
  document.getElementById('main')
);
