import React, {Component, PropTypes} from 'react'

import Panel from './misc/Panel.jsx'



class VideoBox extends Component {

    constructor(props) {
        super(props);
        this.addBroadcastListener();
        this._broadcastStream = null;
    }

    componentDidUpdate() {
        this.handleVideoModeProps();
    }

    handleVideoModeProps() {
        debugger;
        if (this.props.videoMode === "ON") {
            this.startBroadcastingVideo();
        } else if (this.props.videoMode === "OFF" && this._broadcastSream) {
                this._broadcastSream.stop();
                this._broadcastSream.close();
                this._broadcastSream = null;
        }
    }

    startBroadcastingVideo() {
        const {videoTag, videoType, streamProps, username} = this.props;

        this._broadcastSream = Erizo.Stream({
            ...streamProps,
            attributes: {
                type: videoType,
                user: username
            }
        });
        this._broadcastSream.init();
        this._broadcastSream.addEventListener('access-accepted', () => {
            this._broadcastSream.play(videoTag, {crop: true});
            //TODO should this go inside access-accepted callback?
            this.props.room.publish(this._broadcastSream);
        });
        this._broadcastSream.addEventListener('access-denied', (event) => {
            alert("access denied");
            console.log(event);
            this.props.dispatchOff()
        });


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