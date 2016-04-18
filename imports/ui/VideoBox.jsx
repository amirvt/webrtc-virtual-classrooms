import React, {Component} from 'react'
import {connect} from 'react-redux'
import Panel from './misc/Panel.jsx'
import kurentoUtils from 'kurento-utils'
const mapStateToProps = (state) => {
    return {
        broadcastMode: state.broadcastMode
    }
};

let videoTag;

const  presenter = () => {
    let options =  {
        localVideo: videoTag,
        onicecandidate: onIceCandidate
    };

    webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, (error) => {
        if(error) alert(error);

        //this.generateOffer(onOfferPresenter);
    });
};

function onIceCandidate(candidate) {
    //console.log('Local candidate' + JSON.stringify(candidate));

    // var message = {
    //     id : 'onIceCandidate',
    //     candidate : candidate
    // };
    // sendMessage(message);
}

class VideoBox extends Component {
    componentDidUpdate() {
        if(this.props.broadcastMode === "VIDEO") {
            presenter()
        }
    }

    render(){
        return (
            <Panel title={this.props.broadcastMode === "VIDEO" ? "WEBCAM ON" : "WEBCAM OFF"}>
                <video id="video"
                       autoPlay
                       width="640px"
                       height="480px"
                       ref={node => {videoTag = node}}
                />
            </Panel>
        )
    }
}

export default connect(mapStateToProps)(VideoBox)