import React, {Component} from 'react'
import {connect} from 'react-redux'
import startBroadcast from '../actions/startBroadcast'

import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import RaisedButton from 'material-ui/lib/raised-button'
import VideoCam from 'material-ui/lib/svg-icons/av/videocam';
import VideoCamOff from 'material-ui/lib/svg-icons/av/videocam-off';
import ScreenShare from 'material-ui/lib/svg-icons/communication/screen-share';
import StopScreenShare from 'material-ui/lib/svg-icons/communication/stop-screen-share';

const mapStateToProps = state => {
    return {
        broadcastMode: state.broadcastMode
    }
};

class MyToolBar extends Component {
    
    handleVideoCamTouchTap(event) {
        event.preventDefault();
        this.props.dispatch(startBroadcast())
    }

    render() {
        const {broadcastMode} = this.props;
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true} float="left">
                    {broadcastMode === "OFF" ?
                        <RaisedButton icon={<VideoCam/>} primary={true}
                                      onMouseUp={this.handleVideoCamTouchTap.bind(this)}/>
                        :
                        <RaisedButton icon={<VideoCamOff/>} primary={true}/>
                    }
                    {broadcastMode === "OFF" ?
                        <RaisedButton icon={<ScreenShare/>} primary={true}/>
                        :
                        <RaisedButton icon={<StopScreenShare/>} primary={true}/>
                    }
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

export default connect(mapStateToProps)(MyToolBar);