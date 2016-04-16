import React from 'react'
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';


import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
    render(<App/>, document.getElementById('render-target'));

    let ws = new WebSocket('wss://' + location.host + 'one2many');
    let video;
    let webRtcPerr;

});
