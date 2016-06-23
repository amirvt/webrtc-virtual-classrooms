import {combineReducers} from 'redux';
import webCamMode from './videoCamReducer';
import screenCamMode from './screenCamReducer'
import loginReducer from './loginReducer'
import whiteboardMode from './whiteboardReducer'

const rootReducer = combineReducers({
    webCamMode,
    screenCamMode,
    loginReducer,
    whiteboardMode
});

export default rootReducer;
