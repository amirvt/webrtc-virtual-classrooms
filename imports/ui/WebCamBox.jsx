import {connect} from 'react-redux'
import createWebCamAction from '../actions/createWebCamAction'
import VideoBox from './VideoBox.jsx'
import {StreamType} from '../consts'
import {WebCamAction} from "../actions/actionTypes";

const mapStateToProps = (state) => {
    return {
        videoMode: state.webCamMode,
        username: state.loginReducer.username
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatchRecv: () => dispatch(createWebCamAction(WebCamAction.RECV)),
        dispatchOff: () => dispatch(createWebCamAction(WebCamAction.OFF))
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