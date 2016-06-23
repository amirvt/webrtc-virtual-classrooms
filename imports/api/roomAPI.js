// import {N} from '../imports/licode/nuve'
var N = require('../licode/nuve.js');
import {Meteor} from 'meteor/meteor'
import {Rooms} from './shapesApi'


Meteor.methods({
    'getOrCreateRoom'(roomName, userName, role) {
        new SimpleSchema({
            roomName: {type: String},
            userName: {type: String},
            role: {type: String}
        }).validate({roomName, userName, role});

        var future = new Future();

        N.API.getRooms(function (roomList) {
            let rooms = JSON.parse(roomList);
            let room = rooms.find((room) => room.name === roomName);
            if (room) {
                N.API.createToken(room._id, userName, role, function (token) {
                    future["return"](token)
                }, (e) => {
                    future.throw(e)
                })
            } else {
                N.API.createRoom(roomName, function (room) {
                    N.API.createToken(room._id, userName, role, function (token) {
                        future["return"](token)
                    }, (e) => {
                        future.throw(e)
                    })
                }, (e) => {
                    future.throw(e)
                })
            }
        }, (e) => {
            future.throw(e)
        });

        let result = future.wait();
        console.log(result);
        return result;

    }
});

export const resetRoom = new ValidatedMethod({
    name: "room.delete",

    //TODO needs validation
    validate:
    new SimpleSchema({
        roomId: {type: String}
    }).validator(),



    run({roomName}) {
        //TODO UNSAFE anybody can delete a room

        N.API.getRooms(function(roomList) {
            let rooms = JSON.parse(roomList);
            let room = rooms.find(room => room.name === roomName);
            if (!room) {
                throw new Meteor.Error();
            }
            N.API.deleteRoom(room._id, () => {
                Rooms.remove({roomName})
            })
        }, () => {throw new Meteor.Error ('no such room')});


    }
});