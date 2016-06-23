import LC from 'literallycanvas'
import React, {Component} from 'react'
import {setSnapshotAction} from '../actions/actions'
import subscribe from 'react-meteor-subscribe';

let mapSubsToProps = props => ({
    roomSnapshots: [props.roomName]
});

const mapDispatchToProps = dispatch => {
    return {
        dispatchSnapshotAction: (roomName, slideNumber, snapshot) => dispatch(setSnapshotAction(roomName, slideNumber, snapshot))
    }
};

const mapStateToProps = (state) => {
    return {
        mode: state.whiteboardMode,
        username: state.loginReducer.username,
        roomName: state.loginReducer.roomName
    }
};


import {connect} from 'react-redux'

class Whiteboard extends Component {
    constructor(props) {
        super(props);
        this._drawChangeCallbackUnSubscribe = () => {};
    }


    render() {
        let {mode, roomName, username, dispatchSnapshotAction} = this.props ;
        if (this._lc) {
            this._drawChangeCallbackUnSubscribe();
            if (mode == "ON") {
                this._drawChangeCallbackUnSubscribe = this._lc.on('drawingChange', () => {
                    dispatchSnapshotAction(roomName, 1, JSON.stringify(this._lc.getSnapshot()));
                })
            }
        }
        return <LC.LiterallyCanvasReactComponent
            imageURLPrefix="/lc/img"
            onInit={lc => {this._lc = lc; }
            }
        />

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard)