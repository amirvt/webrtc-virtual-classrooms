import {BROADCAST} from './actions'
export default function TurnVideoBroadcast(type) {
    switch (type) {
        case "ON": return {type: BROADCAST.START_VIDEO};
        case "RECEIVING": return {type: BROADCAST.RECEIVING};
        case "OFF": 
        default: return {type: BROADCAST.TURN_OFF}; 
    }
}