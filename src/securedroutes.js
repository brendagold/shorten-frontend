import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const authentication = {
  isLoggedIn: false,
  onAuthentication() {
    this.isLoggedIn = true;
  },
  getLoginStatus() {
    return this.isLoggedIn;
  },
};

function SecuredRoute(props) {
  return (
    <Route
      path={props.path}
      render={(data) =>
        authentication.getLoginStatus() ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: '/login' }}></Redirect>
        )
      }
    ></Route>
  );
}

export { SecuredRoute, authentication };
