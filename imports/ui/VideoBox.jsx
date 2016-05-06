import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import Panel from './misc/Panel.jsx'

// import {Erizo} from '../licode/erizo'
//let Erizo = require('../licode/erizo.js')
const mapStateToProps = (state) => {
    return {
        broadcastMode: state.broadcastMode,
        // roomName: state.loginReducer.roomName,
         username: state.loginReducer.username
    }
};

//let broadcastStream;
// let room;

class VideoBox extends Component {

    constructor(props) {
        super(props);
        this.broadcastStream = undefined;
    }

    componentDidUpdate() {
        if (this.props.broadcastMode === "VIDEO") {
            this.startBroadcastingWebCam();

        }
    }

    startBroadcastingWebCam() {
        this.broadcastStream = Erizo.Stream({
            audio: true,
            video: true,
            data: false,
            attributes: {
                type: 'broadcastStream',
                user: this.props.username
            }
        });
        this.broadcastStream.init();
        this.broadcastStream.addEventListener('access-accepted', () => {
            this.broadcastStream.play('video', {crop: false})
        });
        this.broadcastStream.addEventListener('access-denied', () => {
            alert('Access to web cam and microphone rejected')
        });
        // console.log("room::")
        // console.log(this.props.room);
        this.props.room.publish(this.broadcastStream);
    }


    render() {


        return (
            <Panel title={this.props.broadcastMode === "VIDEO" ? "WEBCAM ON" : "WEBCAM OFF"}>
                <div id="video"
                     style={{width:"640px",
                       height:"480px"}}
                ></div>
            </Panel>
        )
    }
}

VideoBox.PropType = {
    room: PropTypes.object
};

export default connect(mapStateToProps)(VideoBox)