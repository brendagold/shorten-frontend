import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// import EventsPage from './pages/EventsPage';
import Register from './pages/Register';
import { SecuredRoute } from './securedroutes';
import Main from './components/main';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <SecuredRoute path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
