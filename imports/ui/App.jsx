import React, {Component, PropTypes} from 'react'

import UserList from './UserList'
import VideoBox from './VideoBox'
import ChatBox from './ChatBox'
import MyToolBar from './MyToolBar'


class App extends Component {
    render() {
        return (
            <div>
                <MyToolBar/>
                <UserList/>
                <VideoBox/>
                <ChatBox/>
            </div>
        )
    }
}

export default App