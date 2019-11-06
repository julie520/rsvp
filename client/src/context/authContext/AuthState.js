import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from "./AuthReducer";
import { SUCCESS_REGISTER, FAIL_REGISTER, SUCCESS_LOGIN, FAIL_LOGIN, SET_ERROR, CLEAR_ERROR } from '../types';

const AuthState = (props) => {
  const initialState = {
    userAuth: null,
    errors: null
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // register user
  const registerUser = async(userData) => {
    const config = {
      header: { 'Content-type': 'application/json' }
    }
    try {
      const res = await axios.post('/users/register', userData, config);
      dispatch({
        type: SUCCESS_REGISTER,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: FAIL_REGISTER,
        payload: error.response.data
      });
    }
  }

  const loginUser = async(userData) => {
    const config = {
      header: { 'Content-type': 'application/json' }
    }
    try {
      const res = await axios.post('/users/login', userData, config);
      dispatch({
        type: SUCCESS_LOGIN,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: FAIL_LOGIN,
        payload: error.response.data
      });
    }
  }

  const setError = (error) => {
    dispatch({
      type: SET_ERROR,
      payload: error
    })
  }

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR
    })
  }

  return (
    <AuthContext.Provider
      value={{
        userAuth: state.userAuth,
        errors: state.errors,
        registerUser,
        loginUser,
        setError,
        clearError
    }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
