import {BROADCAST} from '../actions/actions'
/**
 * @return {string}
 */
export default function broadcastMode(state = 'OFF', action={}){
    console.log("!!!state: " + state)
    switch (action.type) {
        case BROADCAST.START_VIDEO:
            return 'VIDEO';
        case BROADCAST.TURN_OFF:
        default:
            return 'OFF';
    }
}