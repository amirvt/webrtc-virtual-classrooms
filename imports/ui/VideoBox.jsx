import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import Panel from './misc/Panel.jsx'

const mapStateToProps = (state) => {
    return {
        broadcastMode: state.broadcastMode,
        username: state.loginReducer.username
    }
};

let broadcastStream;

class VideoBox extends Component {

    constructor(props) {
        super(props);
        this.addBroadcastListener()
    }

    componentDidUpdate() {
        if (this.props.broadcastMode === "ON") {
            this.startBroadcastingWebCam();
        }
    }

    startBroadcastingWebCam() {
        broadcastStream = Erizo.Stream({
            audio: true,
            video: true,
            data: false,
            attributes: {
                type: 'broadcastStream',
                user: this.props.username
            }
        });
        broadcastStream.init();
        broadcastStream.addEventListener('access-accepted', () => {
            broadcastStream.play('video', {crop: true})
        });
        broadcastStream.addEventListener('access-denied', () => {
            alert('Access to web cam and microphone rejected')
        });

        this.props.room.publish(broadcastStream);
    }


    addBroadcastListener() {
        this.props.room.addEventListener('stream-subscribed', streamEvent => {
            let stream = streamEvent.stream;
            let attributes = stream.getAttributes();
            if (attributes.type == 'broadcastStream')
                stream.play('video', {crop: true});
        });
    }

    render() {
        return (
            <Panel title="Video" >
                <div id="video" style={{height: "80%"}}></div>
            </Panel>
        )
    }
}

VideoBox.propTypes = {
    room: PropTypes.object
};

export default connect(mapStateToProps)(VideoBox)