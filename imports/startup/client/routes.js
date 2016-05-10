import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Store from '../../store';
import {Provider} from 'react-redux'

// route components
import App from '../../ui/App.jsx';
import Login from '../../ui/Login.jsx'
export const renderRoutes = () => (
    <Provider store={Store}>
        <Router history={browserHistory}>
            <Route path="/client" component={App}/>
            <Route path="/" component={App}/>
        </Router>
    </Provider>
);