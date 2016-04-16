import React, {Component} from 'react'

import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import RaisedButton from 'material-ui/lib/raised-button'

let onIceCandidate = (candidate) => {
    console.log('Local Candidate' + JSON.stringify(candidate));
    var message = {
        id: 'onIceCandidate',
        candidate: candidate
    }
    //TODO sendMessage
}

class MyToolBar extends Component {
    getInitialState(){
        return {
            webRtcPeer: false
        }
    }

    handleShareVideo(){
        if(!this.state.webRtcPeer) {
            //TODO showSpinner

            var options = {
                //TODO localVideo: video,
                onicecandidate: onicecandidate
            }
        }
    }

    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true} float="left">
                    <RaisedButton label="Share Video" primary={true} onMouseUp={this.handleShareVideo.bind(this)}/>
                    <RaisedButton label="Watch Video" primary={true} />
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

export default MyToolBar;