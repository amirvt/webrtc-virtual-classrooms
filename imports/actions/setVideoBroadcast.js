import {BROADCAST} from './actions'
export default function TurnVideoBroadcast(type) {
    return {
        type: type === "ON" ? BROADCAST.START_VIDEO : BROADCAST.TURN_OFF
    }
}