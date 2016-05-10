import React, {Component} from 'react'
import {connect} from 'react-redux'
import setVideoBroadcast from '../actions/setVideoBroadcast'

import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import IconButton from 'material-ui/lib/raised-button'
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
        const {broadcastMode, dispatch} = this.props;
        if (broadcastMode === "OFF")
            dispatch(setVideoBroadcast("ON"));
        else if (broadcastMode === "ON")
            dispatch(setVideoBroadcast("OFF"));
    }

    render() {
        const {broadcastMode} = this.props;
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true} float="left">
                    {broadcastMode === "OFF" ?
                        <IconButton onMouseUp={this.handleVideoCamTouchTap.bind(this)}>
                            <VideoCam/>
                        </IconButton>
                        :
                        <IconButton onMouseUp={this.handleVideoCamTouchTap.bind(this)}>
                            <VideoCamOff/>
                        </IconButton>
                    }
                    {broadcastMode === "OFF" ?
                        <IconButton >
                            <ScreenShare/>
                        </IconButton>
                        :
                        <IconButton>
                            <StopScreenShare/>
                        </IconButton>
                    }
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

export default connect(mapStateToProps)(MyToolBar);