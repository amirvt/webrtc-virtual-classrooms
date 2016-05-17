//import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {BROADCAST} from '../actions/actions'
import setVideoBroadcast from '../actions/setVideoBroadcast'
import VideoBox from './VideoBox.jsx'
import {StreamType} from '../consts'

const mapStateToProps = (state) => {
    return {
        broadcastMode: state.broadcastMode,
        username: state.loginReducer.username
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setBroadcast: (mode) => dispatch(setVideoBroadcast(mode))
    }
};

const videoAttributes = {
    videoType: StreamType.VIDEO,
    videoTag: "video",
    panelTitle: "Web Cam",
    streamProps: {
        video: true,
        audio: true,
        data: false,
        screen: false
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, videoAttributes)
};

const WebCamBox = connect(mapStateToProps, mapDispatchToProps, mergeProps)(VideoBox);

export default WebCamBox;