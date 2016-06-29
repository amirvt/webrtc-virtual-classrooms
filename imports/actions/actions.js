// import {setSnapshot} from '../api/shapesApi'

import {Meteor} from 'meteor/meteor'

export const setSnapshotAction = (username, roomName, slideNumber, snapShot) => {
    return () => {
        Meteor.call('shapes.setSnapshot', {username, roomName, slideNumber, snapShot}, (err, res) => {
            if (err) {
                //TODO dispatch error
            } else {
                console.log(res);
            }
        })
    }
};