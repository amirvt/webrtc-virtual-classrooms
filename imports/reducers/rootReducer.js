import {combineReducers} from 'redux';
import broadcastMode from './broadcastMode';
import loginReducer from './loginReducer'

const rootReducer = combineReducers({
    broadcastMode,
    loginReducer
});

export default rootReducer;
