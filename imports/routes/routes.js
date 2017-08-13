import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Login from '../ui/Login';
import Singup from '../ui/Singup';
import NotFound from '../ui/NotFound';
import Dashboard from '../ui/Dashboard';

import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
const unauthenticatedPages = ['/', '/singup'];
const authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  // if on auth page and user login, redirect to /dashboard
  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
}

export const routes = (
  <Router history={history}>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (Meteor.userId() ? <Redirect to="/dashboard" /> : <Login />)}
      />
      <Route
        path="/singup"
        render={() => (Meteor.userId() ? <Redirect to="/dashboard" /> : <Singup />)}
      />
      <Route path="/dashboard" component={ Dashboard } />
      <Route component={ NotFound } />
    </Switch>
  </Router>
);