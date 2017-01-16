import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Home from './Home';
import { Router, Route, browserHistory } from 'react-router';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/home" component={Home} />
  </Router>,
  document.getElementById('root')
);
