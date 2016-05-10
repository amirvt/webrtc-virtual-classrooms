export default function loginAction(roomName, username, token) {
    console.log(roomName + ' ' + username);
    console.log("token: ");
    console.log(token);
    return {
        type: "LOGIN",
        roomName,
        username,
        token
    }
}