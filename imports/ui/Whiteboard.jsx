import LC from 'literallycanvas'
import React, {Component} from 'react'
import {setSnapshotAction} from '../actions/actions'
import subscribe from 'react-meteor-subscribe';
import {createContainer} from 'meteor/react-meteor-data'
import {Shapes} from '../api/shapesApi'

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
        console.log("wb rendered");
        let {mode, roomName, username, dispatchSnapshotAction, subscriptions} = this.props ;
        if (this._lc) {
            this._drawChangeCallbackUnSubscribe();
            if (mode == "ON") {
                this._drawChangeCallbackUnSubscribe = this._lc.on('drawingChange', () => {
                    dispatchSnapshotAction(roomName, 1, JSON.stringify(this._lc.getSnapshot()));
                })
            } else if (subscriptions.roomSnapshots) {
                let shapeCursor = Shapes.find({roomName, slideNumber: 1});
                shapeCursor.observeChanges({
                    added: (id, fields) => {
                        console.log("added");
                        this._lc.loadSnapshot(JSON.parse(fields.snapShot));
                    },
                    changed: (id, fields) => {
                        console.log("changed");
                        this._lc.loadSnapshot(JSON.parse(fields.snapShot));
                    }
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

let mapSubsToProps = props => ({
    roomSnapshots: [props.roomName]
});


// let x =  connect(mapStateToProps, mapDispatchToProps)(Whiteboard)
// export default createContainer(() => {
//     let handle = Meteor.subscribe('roomSnapshots', this.props.roomName);
//     return {
//         snapshotReady: handle.ready
//     }
// }, x);

export default connect(mapStateToProps, mapDispatchToProps)(subscribe(mapSubsToProps)(Whiteboard))