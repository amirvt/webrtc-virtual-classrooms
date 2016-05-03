import React, {Component} from 'react'
import {connect} from 'react-redux'
import Panel from './misc/Panel.jsx'

// import {Erizo} from '../licode/erizo'
//let Erizo = require('../licode/erizo.js')
const mapStateToProps = (state) => {
    return {
        broadcastMode: state.broadcastMode,
        user: state.user
    }
};


class VideoBox extends Component {
    componentDidUpdate() {
        if (this.props.broadcastMode === "VIDEO") {
            let broadcastStream = Erizo.Stream({
                audio: true,
                video: true,
                data: false,
                attributes: {
                    name: 'broadcastStream'
                }
            });
            broadcastStream.init();
            broadcastStream.addEventListener('access-accepted', () => {
                broadcastStream.play('video', {crop: false})
            });
            broadcastStream.addEventListener('access-denied', () => {
                alert('Access to webcam and microphone rejected')
            })

        }
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

export default connect(mapStateToProps)(VideoBox)