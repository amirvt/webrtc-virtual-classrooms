import {SET_TOKEN} from './actions'
export default function setRoomTokenAction(token) {
    return {
        type: SET_TOKEN,
        token
    }
}