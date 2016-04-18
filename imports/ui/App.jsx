import React, {Component, PropTypes} from 'react'

import UserList from './UserList'
import VideoBox from './VideoBox'
import ChatBox from './ChatBox'
import MyToolBar from './MyToolBar'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import Store from '../store';
import {Provider} from 'react-redux'
import * as Color from 'material-ui/lib/styles/colors'
import MyMuiTheme from '../MyMuiTheme'

class App extends Component {
    getChildContext() {
        var newMuiTheme = getMuiTheme();
        //newMuiTheme.isRtl = true;
        return {
            muiTheme: newMuiTheme
        };
    }

    render() {
        return (
            <Provider store={Store}>
                <div>
                    <MyToolBar/>
                    <VideoBox/>
                    <UserList/>
                    <ChatBox/>
                </div>
            </Provider>
        )
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default App