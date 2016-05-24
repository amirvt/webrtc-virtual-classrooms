import {connect} from 'react-redux'
import createScreenCamAction from '../actions/createScreenCamAction'
import VideoBox from './VideoBox.jsx'
import {StreamType} from '../consts'
import {ScreenCamAction} from "../actions/actions";

const mapStateToProps = (state) => {
    return {
        videoMode: state.screenCamMode,
        username: state.loginReducer.username
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatchRecv: () => dispatch(createScreenCamAction(ScreenCamAction.RECV)),
        dispatchOff: () => dispatch(createScreenCamAction(ScreenCamAction.OFF))
    }
};

const videoAttributes = {
    videoType: StreamType.SCREEN_CAST,
    videoTag: "screen-cast",
    panelTitle: "Screen Grab",
    streamProps: {
        video: false,
        audio: false,
        data: false,
        screen: true
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, videoAttributes)
};

const ScreenCamBox = connect(mapStateToProps, mapDispatchToProps, mergeProps)(VideoBox);

export default ScreenCamBox;