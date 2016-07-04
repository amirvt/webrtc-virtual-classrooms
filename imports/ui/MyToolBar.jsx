import React, {Component} from 'react'
import {connect} from 'react-redux'
import createWebCamAction from '../actions/createWebCamAction'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton'
import VideoCam from 'material-ui/svg-icons/av/videocam';
import VideoCamOff from 'material-ui/svg-icons/av/videocam-off';
import ScreenShare from 'material-ui/svg-icons/communication/screen-share';
import StopScreenShare from 'material-ui/svg-icons/communication/stop-screen-share';
import {WebCamAction} from "../actions/actionTypes";
import createScreenCamAction from "../actions/createScreenCamAction";
import {ScreenCamAction} from "../actions/actionTypes";
import {WhiteboardAction} from "../actions/actionTypes";
import SlideShow from 'material-ui/svg-icons/image/slideshow'
import FileUpload from 'material-ui/svg-icons/file/file-upload'

const mapStateToProps = state => {
    return {
        webCamMode: state.webCamMode,
        screenCamMode: state.screenCamMode,
        whiteboardMode: state.whiteboardMode
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

    handleWhiteboardTouchTap(event) {
        event.preventDefault();
        const {whiteboardMode, dispatch} = this.props;
        if (whiteboardMode === "OFF")
            dispatch({type: WhiteboardAction.START});
        else if (whiteboardMode === "ON")
            dispatch({type: WhiteboardAction.OFF});
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

    presentationButton() {
        switch (this.props.whiteboardMode) {
            case "OFF":
                return (
                    <IconButton tooltip="start presentation" onTouchTap={this.handleWhiteboardTouchTap.bind(this)}>
                        <SlideShow  />
                    </IconButton> );
            case "ON":
                return (
                    <IconButton onTouchTap={this.handleWhiteboardTouchTap.bind(this)}>
                        <SlideShow  />
                    </IconButton>);
            case "RECV":
            default:
                return (
                    <IconButton disabled={true}>
                        <SlideShow  />
                    </IconButton> );
        }
    }


    _fileUploaded(event){
        var file = this.files[0];
        var reader = new window.FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event, text) => {

        };
        var chunkLength = 1000;
    }


    uploadButton() {
        return (
            <span>
                <IconButton
                    label="Upload file"
                    onTouchTap={() => {
                        this._fileInput.click();
                    }}>
                    <FileUpload/>
                </IconButton>
                <input
                    ref={(node) => {this._fileInput = node}}
                    type="file"
                    style={{"display" : "none"}}
                    onChange={this._fileUploaded.bind(this)}/>
            </span>
        )
    }


    render() {

        return (
            <Toolbar>
                <ToolbarGroup firstChild={true} float="left">
                    {this.webCamButton()}
                    {this.screenShareButton()}
                    {this.presentationButton()}
                    {this.uploadButton()}
                </ToolbarGroup>
            </Toolbar>
        )
    }


}

export default connect(mapStateToProps)(MyToolBar);