import { Meteor } from 'meteor/meteor';

import '../imports/startup/server/index'

Meteor.startup(() => {
    Future = Npm.require('fibers/future');
});
