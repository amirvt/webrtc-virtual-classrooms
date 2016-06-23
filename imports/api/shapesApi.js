import {Mongo} from 'meteor/mongo';

export const Shapes = new Mongo.Collection('shapes');
Shapes.schema = new SimpleSchema({
    roomName: {type: String},
    slideNumber: {type: Number, defaultValue: 1},
    snapShot: {type: Object}
});
Shapes.attachSchema(Shapes.schema);
Shapes.publicFields = {roomName: 1, slideNumber: 1, snapShot: 1};


if (Meteor.isServer) {
    Meteor.publish('roomSnapshots', function (roomName) {
        new SimpleSchema({
            roomId: {type: String}
        }).validate({roomName});


        return Shapes.find({
            roomName
        }, {
            fields: Shapes.publicFields
        });

    });
}

export const setSnapshot = new ValidatedMethod({
    name: "shapes.setSnapShot",
    
    validate: new SimpleSchema({
        roomName: {type: String},
        slideNumber: {type: Number},
        snapShot: {type: Object}
    }).validator(),

    run({roomName, slideNumber, snapShot}) {
        console.log("!!!!!!!!!!!!!!");
        console.log(snapShot);
        doc = Shapes.findOne({roomName, slideNumber});

        const handleError = (err, res) => {
            
        };
        
        if (doc) {
            Collection.update({_id: doc._id}, {$set: {snapShot}}, handleError );
        } else {
            Collection.insert({ roomName, slideNumber, snapShot, handleError });
        }


    }
});