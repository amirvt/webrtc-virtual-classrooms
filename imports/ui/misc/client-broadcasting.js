function presenterResponse(message) {
    if (message.response != 'accepted') {
        var errorMsg = message.message ? message.message : 'Unknow error';
        console.warn('Call not accepted for the following reason: ' + errorMsg);
        dispose();
    } else {
        webRtcPeer.processAnswer(message.sdpAnswer);
    }
}

function viewerResponse(message) {
    if (message.response != 'accepted') {
        var errorMsg = message.message ? message.message : 'Unknow error';
        console.warn('Call not accepted for the following reason: ' + errorMsg);
        dispose();
    } else {
        webRtcPeer.processAnswer(message.sdpAnswer);
    }
}

function presenter() {
    if (!webRtcPeer) {
        showSpinner(video);

        var options = {
            localVideo: video,
            onicecandidate : onIceCandidate
        }

        webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function(error) {
            if(error) return onError(error);
            console.log("!!!!!!!!!!!!!!!!")
            console.log(this)
            console.log(this.generateOffer)
            this.generateOffer(onOfferPresenter);
        });
    }
}

function onOfferPresenter(error, offerSdp) {
    if (error) return onError(error);

    var message = {
        id : 'presenter',
        sdpOffer : offerSdp
    };
    sendMessage(message);
}

function viewer() {
    if (!webRtcPeer) {
        showSpinner(video);

        var options = {
            remoteVideo: video,
            onicecandidate : onIceCandidate
        }

        webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function(error) {
            if(error) return onError(error);

            this.generateOffer(onOfferViewer);
        });
    }
}

function onOfferViewer(error, offerSdp) {
    if (error) return onError(error)

    var message = {
        id : 'viewer',
        sdpOffer : offerSdp
    }
    sendMessage(message);
}

function onIceCandidate(candidate) {
    console.log('Local candidate' + JSON.stringify(candidate));

    var message = {
        id : 'onIceCandidate',
        candidate : candidate
    }
    sendMessage(message);
}

function stop() {
    if (webRtcPeer) {
        var message = {
            id : 'stop'
        }
        sendMessage(message);
        dispose();
    }
}

function dispose() {
    if (webRtcPeer) {
        webRtcPeer.dispose();
        webRtcPeer = null;
    }
    hideSpinner(video);
}

function sendMessage(message) {
    var jsonMessage = JSON.stringify(message);
    console.log('Senging message: ' + jsonMessage);
    ws.send(jsonMessage);
}

function showSpinner() {
    for (var i = 0; i < arguments.length; i++) {
        arguments[i].poster = './img/transparent-1px.png';
        arguments[i].style.background = 'center transparent url("./img/spinner.gif") no-repeat';
    }
}

function hideSpinner() {
    for (var i = 0; i < arguments.length; i++) {
        arguments[i].src = '';
        arguments[i].poster = './img/webrtc.png';
        arguments[i].style.background = '';
    }
}