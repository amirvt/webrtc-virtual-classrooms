import {combineReducers} from 'redux';
import webCamMode from './videoCamReducer';
import screenCamMode from './screenCamReducer'
import loginReducer from './loginReducer'
import whiteboardMode from './whiteboardReducer'
import users from './userReducer'

const rootReducer = combineReducers({
    webCamMode,
    screenCamMode,
    loginReducer,
    whiteboardMode,
    users
});

export default rootReducer;
