export default function loginAction(meetingId, userId) {
    return {
        type: "LOGIN",
        user: {
            meetingId,
            userId
        }
    }
}