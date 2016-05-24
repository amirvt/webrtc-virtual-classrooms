import { Meteor } from 'meteor/meteor';

import '../imports/startup/server/index'

Meteor.startup(() => {
    // SSLProxy({
    //     port: 3001,
    //     ssl: {
    //         key: Assets.getText("server.key"),
    //         cert: Assets.getText("server.crt")
    //     }
    // });
    Future = Npm.require('fibers/future');
});
