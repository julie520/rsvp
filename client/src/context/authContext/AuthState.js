import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from "./AuthReducer";
import { SUCCESS_REGISTER, FAIL_REGISTER, SUCCESS_LOGIN, FAIL_LOGIN, SET_ERROR, CLEAR_ERROR, LOG_OUT, SET_USER, AUTH_ERROR } from '../types';
import setToken from '../../utils/setToken';

const AuthState = (props) => {
  const initialState = {
    user: null,
    userAuth: null,
    errors: null
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const getUser = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    try {
      const res = await axios.get('/users');
      dispatch({
        type: SET_USER,
        payload: res.data
      })
    } catch (error) {
      console.error(error);
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data
      })
    }
  }

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

  const logout = () => {
    setToken();
    dispatch({
      type: LOG_OUT
    })
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
        user: state.user,
        userAuth: state.userAuth,
        errors: state.errors,
        getUser,
        registerUser,
        loginUser,
        logout,
        setError,
        clearError
    }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
