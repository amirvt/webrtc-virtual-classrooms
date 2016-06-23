import React, {Component, PropTypes} from 'react'

import UserList from './UserList'
import WebCamBox from './WebCamBox.jsx'
import ScreenCamBox from './ScreenCamBox'
import ChatBox from './ChatBox'
import MyToolBar from './MyToolBar'
import Login from './Login.jsx'
import {StreamType} from '../consts'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {WidthProvider} from 'react-grid-layout';
import {WebCamAction} from "../actions/actionTypes";
import createWebCamAction from "../actions/createWebCamAction";
import Whiteboard from './Whiteboard';
import {ScreenCamAction} from "../actions/actionTypes";
import {UserAction} from "../actions/actionTypes";

var ReactGridLayout = require('react-grid-layout');
const RGL = WidthProvider(ReactGridLayout);


import {connect} from 'react-redux';
//import MyMuiTheme from '../MyMuiTheme'

let mapStateToProps = (state) => {
    return {
        roomName: state.loginReducer.roomName,
        username: state.loginReducer.username,
        token: state.loginReducer.token
    }
};

let mapDispatchToProps = dispatch => ({
    addUser: username => dispatch({type: UserAction.ADD, user: {username}}),
    removeUser: username => dispatch({type: UserAction.REMOVE, user: {username}}),
    dispatch
});

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
            if (attributes.user !== this.props.username) {
                this.props.addUser( attributes.user);
                room.subscribe(stream)
            }
        }
    }

    render() {
        if (!this.props.username || !this.props.roomName) {
            console.log("no username or password");
            return <Login/>
        }
        this.setupRoom();

        var layout = [
            {i: 'ul', x: 0, y: 0, w: 4, h: 6},
            {i: 'wb', x: 0, y: 6, w: 4, h: 6},
            {i: 'sb', x: 4, y: 0, w: 4, h: 12},
            {i: 'cb', x: 8, y: 0, w: 4, h: 12}
        ];


        return (
            <div >
                <MyToolBar/>
                <RGL className="layout" layout={layout}
                     cols={12} rowHeight={50} width={1200}
                     isDraggable={false} isResizable={false}>
                    <div key={"ul"}>
                        <UserList/>
                    </div>
                    <div key={"wb"}>
                        <WebCamBox room={_room}/>
                    </div>
                    <div key={"cb"}>
                        <ChatBox room={_room} username={this.props.username}/>
                    </div>
                    <div key={"sb"}>
                        {/* <ScreenCamBox room={_room}/> */}
                        <Whiteboard  />
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
            //TODO generalize
            if (stream.getAttributes().type === StreamType.VIDEO) {
                stream.stop();
                this.props.dispatch(createWebCamAction(WebCamAction.OFF))
            } else if (stream.getAttributes().type === StreamType.SCREEN_CAST) {
                this.props.dispatch(createScreenCamAction(ScreenCamAction.OFF))
            } else if (stream.getAttributes().type === StreamType.CHAT) {
                this.props.removeUser(stream.getAttributes().user)
            }
        });
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(App)