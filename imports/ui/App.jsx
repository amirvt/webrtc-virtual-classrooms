import React, {Component, PropTypes} from 'react'

import UserList from './UserList'
import VideoBox from './VideoBox'
import ChatBox from './ChatBox'
import MyToolBar from './MyToolBar'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
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

export default App