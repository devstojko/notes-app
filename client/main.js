import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { onAuthChange, routes } from '../imports/routes/routes';
import '../imports/startup/simple-schema-cnfg'

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated)
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
