import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios'

import './index.css';

import * as serviceWorker from './serviceWorker';

import App from './pages/Main/App';
import Login from './pages/Auth/Login';

axios.defaults.baseURL = "https://asia-east2-rakuentuor.cloudfunctions.net/api"

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route
        path="/app"
        render={props => {
          return <App {...props} />;
        }}
      />
      <Route
        path="/login"
        render={props => {
          return <Login {...props} />;
        }}
      />
      <Redirect to="/login" />
    </Switch>
  </Router>,
document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
