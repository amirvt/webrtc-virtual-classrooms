import React, {Component} from 'react'
import {connect} from 'react-redux'
import Panel from './misc/Panel.jsx'
import kurentoUtils from 'kurento-utils'
import { Session } from 'meteor/session'
import {Meetings} from '../collections'

const mapStateToProps = (state) => {
    return {
        broadcastMode: state.broadcastMode
    }
};

let videoTag;

const  presenter = () => {
    console.log("clieent-presenter");
    let options =  {
        localVideo: videoTag,
        onicecandidate: onIceCandidate
    };

    webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,function(error) {
        if(error) alert(error);
        this.generateOffer(onOfferPresenter);
    });
};

const onOfferPresenter = (error, offerSdp) => {
    console.log("client-generate offer");
    if (error) return alert(error);
    Meteor.call("broadcastPresenter", Session.get('meeting'), Session.get('user'), offerSdp, (error, result) => {
        console.log(result);
    });
};

function onIceCandidate(candidate) {
    //console.log('Local candidate' + JSON.stringify(candidate));
    console.log("onIceCandidate");
    Meteor.call("broadcastOnIceCandidate", Session.get('meeting'), Session.get('user'), candidate, (error, result) => {
        console.log(result);
    });
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