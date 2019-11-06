import { SUCCESS_REGISTER, FAIL_REGISTER, SUCCESS_LOGIN, FAIL_LOGIN, SET_ERROR, CLEAR_ERROR, LOG_OUT, SET_USER, AUTH_ERROR } from '../types';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
        userAuth: true,
        errors: null
      }
    case SUCCESS_REGISTER:
    case SUCCESS_LOGIN:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        userAuth: true,
        errors: null
      }
    case FAIL_REGISTER:
    case FAIL_LOGIN:
    case LOG_OUT:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        userAuth: null,
        errors: payload
      }
    case SET_ERROR:
      return {
        ...state,
        errors: payload
      }
    case CLEAR_ERROR:
      return {
        ...state,
        errors: null
      }
    default:
      return state;
  }
}