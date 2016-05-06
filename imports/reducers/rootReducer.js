import {combineReducers} from 'redux';
import broadcastMode from './broadcastMode';
import loginReducer from './loginReducer'
import roomToken from './roomTokenReducer';

const rootReducer = combineReducers({
    broadcastMode,
    loginReducer,
    roomToken
});

export default rootReducer;
