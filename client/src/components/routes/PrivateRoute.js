import React, { useContext } from 'react'
import {Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/authContext/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {
  const {userAuth } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props => !userAuth ? (<Redirect to='/login'/>) : (<Component {...props} />)}
    />
  )
}

export default PrivateRoute
