import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';

export default (
    // <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/settings' component={Settings} />
        </Switch>
    // </BrowserRouter>
)
