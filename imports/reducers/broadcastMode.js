import {BROADCAST} from '../actions/actions'
/**
 * @return {string}
 */
export default function broadcastMode(state = 'OFF', action){
    switch (action.type) {
        case BROADCAST.START_VIDEO:
            return 'ON';
        case BROADCAST.TURN_OFF:
        default:
            return 'OFF';
    }
}