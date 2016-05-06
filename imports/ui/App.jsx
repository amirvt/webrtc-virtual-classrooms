import React, {Component, PropTypes} from 'react'
import {Meteor} from 'meteor/meteor'

import UserList from './UserList'
import VideoBox from './VideoBox'
import ChatBox from './ChatBox'
import MyToolBar from './MyToolBar'
import Login from './Login.jsx'

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'

import setRoomTokenAction from '../actions/setRoomTokenAction'

import {connect} from 'react-redux';
import * as Color from 'material-ui/lib/styles/colors'
import MyMuiTheme from '../MyMuiTheme'

let mapStateToProps = (state) => {
    return {
        roomName: state.loginReducer.roomName,
        username: state.loginReducer.username,
        token: state.loginReducer.token
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => {
            dispatch(setRoomTokenAction(token))
        }
    }
};


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
            console.log(attributes);
            switch (attributes.type) {
                case "broadcastStream":
                    if (attributes.user !== this.props.username) {
                        room.subscribe(stream)
                    }
                    break;
                default:
                    break;
            }
        }
    }


    render() {
        if (!this.props.username || !this.props.roomName) {
            return <Login/>
        }


        // console.log(token);
        // this.props.setToken(token); //TODO delete token action and reducer
        let room = Erizo.Room({token: this.props.token});
        room.connect();

        room.addEventListener("room-connected", roomEvent => {
            this.subscribeToStreams(room, roomEvent.streams);
        });

        room.addEventListener('stream-subscribed', streamEvent => {
            let stream = streamEvent.stream;
            let attributes = stream.getAttributes();
            switch(attributes.type) {
                case 'broadcastStream':
                    stream.play('video');
                    break;
                default:
                    console.log("Stream type " + attributes.type + " is incorrect.")
                    break;
            }
        });

        room.addEventListener('stream-added', streamEvent => {
            let streams = [];
            streams.push(streamEvent.stream);
            this.subscribeToStreams(room, streams);
        });

        room.addEventListener('stream-removed', streamEvent => {
            let stream = streamEvent.stream;
            if (stream.elementID === 'video') {
                //Do something about video element, maybe?
            }
        });

        console.log("before render");
        console.log(room);
        return (

            <div>
                <MyToolBar/>
                <VideoBox room={room}/>
                <UserList/>
                <ChatBox/>
            </div>
        )
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(App)