// import {N} from '../imports/licode/nuve'
var N = require('../licode/nuve.js');
import {Meteor} from 'meteor/meteor'

//TODO better validation



Meteor.methods({
    'getOrCreateRoom'(roomName, userName, role) {
        if(!roomName || !userName || !role)
            throw error("incorrect parameters");
        
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
                }, (e) => {future.throw(e)})
            } else {
                N.API.createRoom(roomName, function(room) {
                    N.API.createToken(room._id, userName, role, function(token) {
                        future["return"](token)
                    }, (e) => {future.throw(e)})
                }, (e) => {future.throw(e)})
            }
        }, (e) => {future.throw(e)});

        let result = future.wait();
        console.log(result);
        return result;

    }
});