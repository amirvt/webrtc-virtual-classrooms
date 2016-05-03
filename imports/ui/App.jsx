import React, {Component, PropTypes} from 'react'

import UserList from './UserList'
import VideoBox from './VideoBox'
import ChatBox from './ChatBox'
import MyToolBar from './MyToolBar'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'

import loginAction from '../actions/loginAction'

import {connect} from 'react-redux';
import * as Color from 'material-ui/lib/styles/colors'
import MyMuiTheme from '../MyMuiTheme'

class App extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(
            loginAction(
                this.props.params.meetingId,
                this.props.params.userId
            )
        )
    }

    // componentDidMount () {
    //     function loadScript() {
    //         var script= document.createElement('script');
    //         script.type= 'text/javascript';
    //         script.src= '../licode/erizo.js';
    //         script.async = true;
    //         document.body.appendChild(script);
    //     }
    //     loadScript();
    // }
    getChildContext() {
        var newMuiTheme = getMuiTheme();
        //newMuiTheme.isRtl = true;
        return {
            muiTheme: newMuiTheme
        };
    }

    render() {
        return (

            <div>
                <MyToolBar/>
                <VideoBox/>
                <UserList/>
                <ChatBox/>
            </div>
        )
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default connect()(App)