import React, {Component} from 'react'
import {connect} from 'react-redux'
import Panel from './misc/Panel.jsx'

// import {Erizo} from '../licode/erizo'
//let Erizo = require('../licode/erizo.js')
const mapStateToProps = (state) => {
    return {
        broadcastMode: state.broadcastMode,
        // roomName: state.loginReducer.roomName,
        // username: state.loginReducer.username
    }
};

//let broadcastStream;
// let room;

class VideoBox extends Component {

    constructor(props) {
        super(props);
        this.room = {ayy: 'ayy'};
        this.broadcastStream = undefined;
    }

    componentDidUpdate() {
        if (this.props.broadcastMode === "VIDEO") {
            this.broadcastStream = Erizo.Stream({
                audio: true,
                video: true,
                data: false,
                attributes: {
                    name: 'broadcastStream'
                }
            });
            this.broadcastStream.init();
            this.broadcastStream.addEventListener('access-accepted', () => {
                this.broadcastStream.play('video', {crop: false})
            });
            this.broadcastStream.addEventListener('access-denied', () => {
                alert('Access to webcam and microphone rejected')
            });

            this.room.publish(this.broadcastStream);

        }
    }

    subscribeToStreams(streams) {
        for (stream of streams) {
            if (this.broadcastStream !== undefined) {
                if (this.broadcastStream.getID() !== stream.getID()) {
                    this.room.subscribe(stream);
                }
            } else {
                this.room.subscribe(stream);
            }

        }
    }

    render() {
        console.log("username: " + this.props.username);
        console.log("roomName: " + this.props.roomName);
        Meteor.call('getOrCreateRoom', this.props.roomName, this.props.username, "presenter", (error, token) => {
            // console.log(token);
            // this.props.setToken(token);
            this.room = Erizo.Room({token});

            this.room.addEventListener("room-connected", roomEvent => {
                console.log("Connected!");
                //room.publish(localChatStream) //TODO
                this.subscribeToStreams(roomEvent.streams);
            });

            this.room.addEventListener('stream-subscribed', streamEvent => {
                let stream = streamEvent.stream;
                stream.play('video');
            });

            this.room.addEventListener('stream-added', streamEvent => {
                let streams = [];
                streams.push(streamEvent.stream);
                this.subscribeToStreams(streams);
            });

            this.room.addEventListener('stream-removed', streamEvent => {
                let stream = streamEvent.stream;
                if (stream.elementID === 'video') {
                    //Do something about video element, maybe?
                }
            });

            this.room.connect();
        });

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

export default connect(mapStateToProps)(VideoBox)