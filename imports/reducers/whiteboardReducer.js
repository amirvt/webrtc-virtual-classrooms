import {WhiteboardAction} from '../actions/actionTypes'
/**
 * @return {string}
 */
export default function (state = 'OFF', action){
    switch (action.type) {

        case WhiteboardAction.START:
            return 'ON';
        case WhiteboardAction.RECV:
            return 'RECV';
        case WhiteboardAction.OFF:
            return 'OFF';
        default:
            return state;

    }
}