// import {setSnapshot} from '../api/shapesApi'

import {Meteor} from 'meteor/meteor'

export const setSnapshotAction = (roomName, slideNumber, snapShot) => {
    return () => {
        Meteor.call('shapes.setSnapshot', {roomName, slideNumber, snapShot}, (err, res) => {
            if (err) {
                //TODO dispatch error
            } else {
                console.log(res);
            }
        })
    }
};