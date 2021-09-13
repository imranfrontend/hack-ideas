import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import fakeAuth from './FakeAuth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
        props => {
          if (fakeAuth.isAuthenticated === true) {
            return <Component {...rest} {...props} />
          } else {
            return <Redirect to={
              {
                pathname: '/',
                state: {
                  from: props.location
                }
              }
            } />
          }
        }
      } />
  )
}

export default ProtectedRoute;