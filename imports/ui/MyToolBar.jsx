import React, {Component} from 'react'
import {connect} from 'react-redux'
import createWebCamAction from '../actions/createWebCamAction'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton'
import VideoCam from 'material-ui/svg-icons/av/videocam';
import VideoCamOff from 'material-ui/svg-icons/av/videocam-off';
import ScreenShare from 'material-ui/svg-icons/communication/screen-share';
import StopScreenShare from 'material-ui/svg-icons/communication/stop-screen-share';
import {WebCamAction} from "../actions/actions";
import createScreenCamAction from "../actions/createScreenCamAction";
import {ScreenCamAction} from "../actions/actions";

const mapStateToProps = state => {
    return {
        webCamMode: state.webCamMode,
        screenCamMode: state.screenCamMode
    }
};

class MyToolBar extends Component {

    handleWebCamTouchTap(event) {
        event.preventDefault();
        const {webCamMode, dispatch} = this.props;
        if (webCamMode === "OFF")
            dispatch(createWebCamAction(WebCamAction.START));
        else if (webCamMode === "ON")
            dispatch(createWebCamAction(WebCamAction.OFF));
    }

    handleScreenCamTouchTap(event) {
        event.preventDefault();
        const {screenCamMode, dispatch} = this.props;
        if (screenCamMode === "OFF")
            dispatch(createScreenCamAction(ScreenCamAction.START));
        else if (screenCamMode === "ON")
            dispatch(createScreenCamAction(ScreenCamAction.OFF));
    }

    webCamButton() {
        switch (this.props.webCamMode) {
            case "OFF":
                return (
                    <IconButton tooltip="start broadcasting video" onTouchTap={this.handleWebCamTouchTap.bind(this)}>
                        <VideoCam  />
                    </IconButton> );
            case "ON":
                return (
                    <IconButton tooltip="stop broadcasting video" onTouchTap={this.handleWebCamTouchTap.bind(this)}>
                        <VideoCamOff  />
                    </IconButton>);
            case "RECV":
            default:
                return (
                    <IconButton disabled={true}>
                        <VideoCam  />
                    </IconButton> );
        }

    }

    screenShareButton() {
        switch (this.props.screenCamMode) {
            case "OFF":
                return (
                    <IconButton tooltip="screen grab" onTouchTap={this.handleScreenCamTouchTap.bind(this)}>
                        <ScreenShare  />
                    </IconButton> );
            case "ON":
                return (
                    <IconButton onTouchTap={this.handleScreenCamTouchTap.bind(this)}>
                        <StopScreenShare  />
                    </IconButton>);
            case "RECV":
            default:
                return (
                    <IconButton disabled={true}>
                        <ScreenShare  />
                    </IconButton> );
        }
    }

    render() {

        return (
            <Toolbar>
                <ToolbarGroup firstChild={true} float="left">
                    {this.webCamButton()}
                    {this.screenShareButton()}
                </ToolbarGroup>
            </Toolbar>
        )
    }

}

export default connect(mapStateToProps)(MyToolBar);