// import {N} from '../imports/licode/nuve'
var N = require('../licode/nuve.js');
import {Meteor} from 'meteor/meteor'

const errorCallback = (e) => console.log(e);

Meteor.methods({
    'getOrCreateRoom'(roomName, userName, role) {

        var future = new Future();

        N.API.getRooms(function(roomList) {
            let rooms = JSON.parse(roomList);
            let room = rooms.find((room) => room.name === roomName);
            if (room) {
                console.log(roomName);
                console.log(userName);
                console.log(role);
                N.API.createToken(room._id, userName, role, function(token) {

                    future["return"](token)
                }, (e) => console.log("Error1: " + e));
            } else {
                N.API.createRoom(roomName, function(room) {
                    N.API.createToken(room._id, userName, role, function(token) {
                        future["return"](token)
                    }, (e) => console.log("Error2: " + e));
                }, (e) => console.log("Error3: " + e));
            }
        }, (e) => console.log("Error4: " + e));

        let res =  future.wait();
        console.log(res);

        return res;

    }
});