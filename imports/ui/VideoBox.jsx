import React, {Component} from 'react'
import Panel from './misc/Panel.jsx'

class VideoBox extends Component {
    render(){
        return (
            <Panel title="WebCam">
                <video id="video" autoplay width="640px" height="480px" ></video>
            </Panel>
        )
    }
}

export default VideoBox