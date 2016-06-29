import LC from 'literallycanvas'
import React, {Component} from 'react'
import {setSnapshotAction} from '../actions/actions'
import subscribe from 'react-meteor-subscribe';
import {createContainer} from 'meteor/react-meteor-data'
import {Shapes} from '../api/shapesApi'

const mapDispatchToProps = dispatch => {
    return {
        dispatchSnapshotAction: (username, roomName, slideNumber, snapshot) => dispatch(setSnapshotAction(username, roomName, slideNumber, snapshot))
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
        this._drawChangeCallbackUnSubscribe = () => {
        };
    }

    canvasUnSub(){
        this._drawChangeCallbackUnSubscribe();
    }
    canvasSub(props){
        let {mode, roomName, username, dispatchSnapshotAction, subscriptions} = props;
        this._drawChangeCallbackUnSubscribe = this._lc.on('drawingChange', () => {
            dispatchSnapshotAction(username, roomName, 1, JSON.stringify(this._lc.getSnapshot()));
        });
    }

    render() {
        console.log("wb rendered");

        //TODO this is a ruddy mess
        let {roomName, username} = this.props;
        if (this._lc) {
            this.canvasUnSub();
            this.canvasSub(this.props);
            let shapeCursor = Shapes.find({roomName, slideNumber: 1});
            shapeCursor.observeChanges({
                added: (id, fields) => {
                    console.log("added");
                    this.canvasUnSub();
                    this._lc.loadSnapshot(JSON.parse(fields.snapShot));
                    this.canvasSub(this.props);
                },
                changed: (id, fields) => {
                    console.log("changed");
                    if (fields.username !== username) {
                        this.canvasUnSub();
                        this._lc.loadSnapshot(JSON.parse(fields.snapShot));
                        this.canvasSub(this.props)
                    }

                }
            })

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