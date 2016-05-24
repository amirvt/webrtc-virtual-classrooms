import React, {Component, PropTypes} from 'react'

import Panel from './misc/Panel.jsx'

let _broadcastStream;

class VideoBox extends Component {

    constructor(props) {
        super(props);
        this.addBroadcastListener()
    }

    componentDidUpdate() {
        this.handleVideoModeProps();
    }

    handleVideoModeProps() {
        if (this.props.videoMode === "ON") {
            this.startBroadcastingVideo();
        } else if (this.props.videoMode === "OFF" && _broadcastStream) {
            _broadcastStream.stop();
            this.props.room.unpublish(_broadcastStream, (result, error) => {
                if (!result)
                    throw new Error(e);
                _broadcastStream.close();
                _broadcastStream = null;
            })
        }
    }

    startBroadcastingVideo() {
        const {videoTag, videoType, streamProps, username} = this.props;

        _broadcastStream = Erizo.Stream({
            ...streamProps,
            attributes: {
                type: videoType,
                user: username
            }
        });
        _broadcastStream.init();
        _broadcastStream.addEventListener('access-accepted', () => {
            _broadcastStream.play(videoTag, {crop: true})
        });
        _broadcastStream.addEventListener('access-denied', (event) => {
            alert("access denied");
            console.log(event);
            this.props.dispatchOff()
        });

        this.props.room.publish(_broadcastStream);
    }


    addBroadcastListener() {
        const {videoType, videoTag, dispatchRecv, room} = this.props;
        room.addEventListener('stream-subscribed', streamEvent => {
            let stream = streamEvent.stream;
            let attributes = stream.getAttributes();
            if (attributes.type === videoType) {
                stream.play(videoTag, {crop: true});
                dispatchRecv();
            }
        });
    }

    render() {
        const {panelTitle, videoTag} = this.props;
        return (
            <Panel title={panelTitle}>
                <div id={videoTag} style={{height: "80%"}}></div>
            </Panel>
        )
    }
}

VideoBox.propTypes = {
    room: PropTypes.object,
    videoType: PropTypes.string,
    videoTag: PropTypes.string,
    panelTitle: PropTypes.string,
    streamProps: PropTypes.object
};

export default VideoBox