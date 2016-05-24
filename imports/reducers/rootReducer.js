import {combineReducers} from 'redux';
import webCamMode from './videoCamReducer';
import screenCamMode from './screenCamReducer'
import loginReducer from './loginReducer'

const rootReducer = combineReducers({
    webCamMode,
    screenCamMode,
    loginReducer
});

export default rootReducer;
