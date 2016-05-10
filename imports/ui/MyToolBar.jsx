import React, {Component} from 'react'
import {connect} from 'react-redux'
import setVideoBroadcast from '../actions/setVideoBroadcast'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton'
import VideoCam from 'material-ui/svg-icons/av/videocam';
import VideoCamOff from 'material-ui/svg-icons/av/videocam-off';
import ScreenShare from 'material-ui/svg-icons/communication/screen-share';
import StopScreenShare from 'material-ui/svg-icons/communication/stop-screen-share';

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

    videoCamButton() {
        return this.props.broadcastMode === "OFF" ?
            (<IconButton tooltip="start broadcasting video"  onTouchTap={this.handleVideoCamTouchTap.bind(this)}>
                <VideoCam  />
            </IconButton>) :
            (<IconButton tooltip="stop broadcasting video"  onTouchTap={this.handleVideoCamTouchTap.bind(this)}>
                <VideoCamOff  />
            </IconButton>);
    }
    screenShareButton() {
        return this.props.broadcastMode === "OFF" ?
            (<IconButton><ScreenShare/></IconButton>) :
            (<IconButton><StopScreenShare/></IconButton>)
    }

    render() {

        return (
            <Toolbar>
                <ToolbarGroup firstChild={true} float="left">
                    {this.videoCamButton()}
                    {this.screenShareButton()}
                </ToolbarGroup>
            </Toolbar>
        )
    }

}

export default connect(mapStateToProps)(MyToolBar);