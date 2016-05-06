import {SET_TOKEN} from '../actions/actions'
export default function roomTokenReducer(state = "", action ) {
    if (action.type === SET_TOKEN) {
        return action.token
    } else
        return state
}