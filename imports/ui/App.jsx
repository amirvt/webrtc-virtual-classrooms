import React, {Component, PropTypes} from 'react'
import {Meteor} from 'meteor/meteor'

import UserList from './UserList'
import WebCamBox from './WebCamBox.jsx'
import ChatBox from './ChatBox'
import MyToolBar from './MyToolBar'
import Login from './Login.jsx'
import {StreamType} from '../consts'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {Responsive, WidthProvider} from 'react-grid-layout';
import {BROADCAST} from "../actions/actions";
import setVideoBroadcast from "../actions/setVideoBroadcast";

var ReactGridLayout = require('react-grid-layout');
const RGL = WidthProvider(ReactGridLayout);


import {connect} from 'react-redux';
import MyMuiTheme from '../MyMuiTheme'

let mapStateToProps = (state) => {
    return {
        roomName: state.loginReducer.roomName,
        username: state.loginReducer.username,
        token: state.loginReducer.token
    }
};

let _room;
class App extends Component {


    getChildContext() {
        var newMuiTheme = getMuiTheme();
        //newMuiTheme.isRtl = true;
        return {
            muiTheme: newMuiTheme
        };
    }

    subscribeToStreams(room, streams) {
        for (stream of streams) {
            let attributes = stream.getAttributes();
            switch (attributes.type) {
                case StreamType.VIDEO:
                    if (attributes.user !== this.props.username) {
                        room.subscribe(stream)
                    }
                    break;
                case StreamType.CHAT:
                    if (attributes.user !== this.props.username) {
                        room.subscribe(stream)
                    }
                    break;
                default:
                    console.error('incorrect room type: ' + attributes.type);
                    break;
            }
        }
    }


    render() {
        if (!this.props.username || !this.props.roomName) {
            return <Login/>
        }
        this.setupRoom();

        var layout = [
            {i: 'ul', x: 0, y: 0, w: 4, h: 6},
            {i: 'vb', x: 0, y: 6, w: 4, h: 6},
            {i: 'sb', x: 4, y: 0, w: 4, h: 12},
            {i: 'cb', x: 8, y: 0, w: 4, h: 12}
        ];


        return (
            <div >
                <MyToolBar/>
                <RGL className="layout" layout={layout}
                     cols={12} rowHeight={50} width={1200}
                     isDraggable={false} isResizable={false}>
                    <div key={"ul"} style={{backgroundColor: "grey"}}>
                        <UserList/>
                    </div>
                    <div key={"vb"} style={{backgroundColor: "grey"}}>
                        <WebCamBox room={_room}/>
                    </div>
                    <div key={"cb"} style={{backgroundColor: "grey"}}>
                        <ChatBox room={_room} username={this.props.username}/>
                    </div>
                    <div key={"sb"} style={{backgroundColor: "grey"}}>

                    </div>
                </RGL>
            </div>
        )
    }

    setupRoom() {
        _room = Erizo.Room({token: this.props.token});
        _room.connect();

        _room.addEventListener("room-connected", roomEvent => {
            this.subscribeToStreams(_room, roomEvent.streams);
        });

        _room.addEventListener('stream-added', streamEvent => {
            let streams = [];
            streams.push(streamEvent.stream);
            this.subscribeToStreams(_room, streams);
        });

        _room.addEventListener('stream-removed', streamEvent => {
            let stream = streamEvent.stream;
            if (stream.getAttributes().type === StreamType.VIDEO) {
                stream.stop();
                this.props.dispatch(setVideoBroadcast(BROADCAST.TURN_OFF))
            }
        });
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default connect(mapStateToProps)(App)