import {setSnapshot} from '../api/shapesApi'

export const setSnapshotAction = (roomName, slideNumber, snapShot) => {
    console.log({roomName, slideNumber, snapShot});
    return () => {
        console.log(setSnapshot);
        setSnapshot.call({roomName, slideNumber, snapShot}, (err, res) => {
            if (err) {
                //TODO dispatch error
            } else {
                console.log(res);
            }
        })
    }
};