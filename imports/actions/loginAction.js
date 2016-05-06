export default function loginAction(roomName, username, token) {
    console.log(roomName + ' ' + username);
    return {
        type: "LOGIN",
        roomName,
        username,
        token
    }
}