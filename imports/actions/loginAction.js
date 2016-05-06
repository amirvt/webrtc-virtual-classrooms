export default function loginAction(roomName, username) {
    console.log(roomName + ' ' + username);
    return {
        type: "LOGIN",
        roomName,
        username

    }
}