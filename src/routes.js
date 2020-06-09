import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';
import OneDay from './components/OneDay/OneDay';
import SearchCustomer from './components/SearchCustomer/SearchCustomer';
import Waitlist from './components/Waitlist/Waitlist';

export default (
    <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/oneday/:id' component={OneDay} />
        <Route exact path='/search' component={SearchCustomer} />
        <Route exact path='/waitlist' component={Waitlist} />
    </Switch>
)
