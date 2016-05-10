import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import setVideoBroadcast from '../actions/setVideoBroadcast'

import Panel from './misc/Panel.jsx'

const mapStateToProps = (state) => {
    return {
        broadcastMode: state.broadcastMode,
        username: state.loginReducer.username
    }
};

let _broadcastStream;

class VideoBox extends Component {

    constructor(props) {
        super(props);
        this.addBroadcastListener()
    }

    componentDidUpdate() {
        if (this.props.broadcastMode === "ON") {
            this.startBroadcastingWebCam();
        } else if(this.props.broadcastMode === "OFF" && _broadcastStream) {
            _broadcastStream.stop();
            this.props.room.unpublish(_broadcastStream, (result, error) => {
                _broadcastStream.close();
                _broadcastStream = null;
            })
        }
    }

    startBroadcastingWebCam() {
        _broadcastStream = Erizo.Stream({
            audio: true,
            video: true,
            data: false,
            attributes: {
                type: 'broadcastStream',
                user: this.props.username
            }
        });
        _broadcastStream.init();
        _broadcastStream.addEventListener('access-accepted', () => {
            _broadcastStream.play('video', {crop: true})
        });
        _broadcastStream.addEventListener('access-denied', () => {
            this.props.dispatch(setVideoBroadcast("OFF"))
        });

        this.props.room.publish(_broadcastStream);
    }


    addBroadcastListener() {
        this.props.room.addEventListener('stream-subscribed', streamEvent => {
            let stream = streamEvent.stream;
            let attributes = stream.getAttributes();
            if (attributes.type == 'broadcastStream') {
                stream.play('video', {crop: true});
                this.props.dispatch(setVideoBroadcast('RECEIVING'))
            }
                
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