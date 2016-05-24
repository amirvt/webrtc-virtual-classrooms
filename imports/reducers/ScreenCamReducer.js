import {ScreenCamAction} from "../actions/actions";
export default function(state = "OFF", action) {
    switch(action.type) {
        case ScreenCamAction.START:
            return "ON";
        case ScreenCamAction.RECV:
            return "RECV";
        case ScreenCamAction.OFF:
        default:
            return "OFF";
    }
}

