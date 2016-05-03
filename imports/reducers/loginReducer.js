/**
 * @return {null}
 */
export default function LoginReducer(state = {}, action = {}) {
    switch (action.type) {
        case "LOGIN":
            return action.user;
        default:
            return null;
    }
}