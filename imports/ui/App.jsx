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
        username: state.loginReducer.username
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

    render() {
        if(!this.props.username || !this.props.roomName) {
            return <Login/>
        }
        
        return (

            <div>
                <MyToolBar/>
                <VideoBox roomName={this.props.roomName} username={this.props.username}/>
                <UserList/>
                <ChatBox/>
            </div>
        )
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default connect( mapStateToProps, mapDispatchToProps)(App)