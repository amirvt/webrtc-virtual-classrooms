
Meteor.methods({
    broadcastPresenter(meeting, user, sdpOffer) {
        return "server-presenter"
    },
    'Meetings.viewer'(sdpOffer){
        return 'viewer'
    },
    broadcastOnIceCandidate(meeting, user, candidate) {
        return "server - ice"
    },
    'Meetings.stop'(){
        return 'stop'
    }
});