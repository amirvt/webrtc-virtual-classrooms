import React from 'react'
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

Meteor.startup(() => {
    injectTapEventPlugin();
    render(renderRoutes(), document.getElementById('render-target'));
});

