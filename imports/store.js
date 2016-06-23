import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger'
import rootReducer from './reducers/rootReducer';

const loggerMiddleware = createLogger();

const Store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk, loggerMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f);

export default Store;
