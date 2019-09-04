import React from 'react';
import { Route } from 'react-router-dom';
import AuthWrapper from './auth-wrapper';

function authenticated(Component) {
  return props => (
    <AuthWrapper {...props} >
      <Component />
    </AuthWrapper>
  );
}

const PrivateRoute = props => (
  <Route {...props} component={null} render={authenticated(props.component)} />
);


export default PrivateRoute;
